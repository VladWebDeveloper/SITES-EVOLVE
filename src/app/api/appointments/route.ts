import {NextResponse} from "next/server";
import {z} from "zod";
import {databaseConfigured,getDb} from "@/lib/server/db";
import {isValidConsultationTime,studioDate} from "@/lib/booking-calendar";
import {calendarToken} from "@/lib/booking-token";
import {rateLimited,requesterKey,guardSize,jsonError} from "@/lib/server/security";
import {sendEmail,emitWorkflow} from "@/lib/server/notify";

export const runtime="nodejs";
const schema=z.object({
 name:z.string().trim().min(2).max(100),
 email:z.email().max(180),
 service:z.string().max(120).optional(),
 notes:z.string().trim().min(10).max(4000),
 preferredAt:z.iso.datetime(),
 website:z.string().max(200).optional().default("")
}).strict();

class SlotUnavailable extends Error {}
export async function POST(request:Request){
 if(guardSize(request))return jsonError("Request too large",413);
 if(rateLimited(requesterKey(request,"booking"),4,60_000))return jsonError("Please try again later",429);
 let data:z.infer<typeof schema>;
 try{data=schema.parse(await request.json())}catch{return jsonError("Invalid booking request",400)}
 if(data.website)return NextResponse.json({ok:true}); // honeypot
 if(!databaseConfigured())return jsonError("Booking calendar not configured",503);
 const date=new Date(data.preferredAt);
 if(!isValidConsultationTime(date))return jsonError("Select an available 30-minute slot at least two hours ahead",400);
 const db=getDb(),email=data.email.trim().toLowerCase();
 const recent=await db.bookingRequest.count({where:{email,createdAt:{gte:new Date(Date.now()-24*3600_000)}}});
 if(recent>=2)return jsonError("Maximum two bookings per email address per day",429);
 const block=await db.consultationBlock.findFirst({where:{startsAt:{lte:date},endsAt:{gt:date}},select:{id:true}});
 if(block)return jsonError("This time is unavailable. Choose another slot",409);
 let booking:{id:string;name:string;email:string;service:string|null;notes:string;preferredAt:Date|null};
 try{
  booking=await db.$transaction(async tx=>{
   const already=await tx.consultationSlot.findUnique({where:{startAt:date},select:{id:true}});
   if(already)throw new SlotUnavailable("Selected slot already reserved");
   const reserved=await tx.bookingRequest.create({data:{name:data.name,email,service:data.service||"Consultation",notes:data.notes,preferredAt:date,status:"CONFIRMED"}});
   await tx.consultationSlot.create({data:{startAt:date,bookingId:reserved.id}});
   return reserved;
  });
 }catch(error){
  if(error instanceof SlotUnavailable||(typeof error==="object"&&error!==null&&"code" in error&&error.code==="P2002"))
   return jsonError("This time has just been booked. Please choose another slot",409);
  console.error("Consultation calendar reservation failure",error instanceof Error?error.message:"unknown");
  return jsonError("Could not reserve the time. Please try again",503);
 }
 const dateText=studioDate(date);
 const mode=data.notes.match(/Preferred format: ([a-z_]+)/)?.[1]||"online";
 const instructions=mode==="phone"?"We will call the phone number you provide in the consultation.":mode==="in_person"?
  "The exact meeting place in Chișinău will be arranged by SITES EVOLVE.":"The online meeting will be coordinated via Telegram or WhatsApp.";
 const token=calendarToken(booking.id);
 const icsUrl=token?"https://sitesevolve.com/api/appointments/"+booking.id+"/calendar?token="+token:null;
 const message=[
  "SITES EVOLVE — Consultation confirmed",
  "Reference: "+booking.id,
  "Client: "+data.name,
  "Date/time (Europe/Chișinău): "+dateText,
  "Duration: 30 minutes",
  "Format: "+mode.replaceAll("_"," "),
  instructions,
  "Topic: "+(data.service||"Consultation"),
  "Your notes: "+data.notes,
  icsUrl?"Add this event to Google Calendar, Apple Calendar or Outlook by downloading the .ics file: "+icsUrl:"",
  "To change or cancel: sites.evolve7@gmail.com or +373 603 56 515.",
  "https://sitesevolve.com"
 ].filter(Boolean).join("\n");
 const officeMail=process.env.LEAD_TO_EMAIL||"sites.evolve7@gmail.com";
 const [clientEmailed,officeEmailed]=await Promise.all([
  sendEmail(email,"SITES EVOLVE — Your consultation is confirmed",message),
  sendEmail(officeMail,"SITES EVOLVE — New confirmed consultation",message+"\nClient email: "+email)
 ]);
 try{
  const staff=await db.user.findMany({where:{active:true,role:{in:["OWNER","STAFF"]}},select:{id:true}});
  if(staff.length)await db.notification.createMany({data:staff.map(u=>({userId:u.id,title:"Confirmed consultation: "+data.name+" / "+dateText,href:"/console/appointments"}))});
  await emitWorkflow({type:"consultation.confirmed",payload:{bookingId:booking.id,startsAt:date.toISOString(),mode}});
 }catch(error){console.warn("Consultation follow-up failed",error instanceof Error?error.message:"unknown")}
 return NextResponse.json({ok:true,confirmed:true,startsAt:date.toISOString(),timezone:"Europe/Chisinau",durationMinutes:30,icsUrl,emailSent:clientEmailed,studioNotified:officeEmailed},
  {status:201,headers:{"Cache-Control":"no-store"}});
}
