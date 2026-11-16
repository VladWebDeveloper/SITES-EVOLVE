import {NextResponse} from "next/server";
import {z} from "zod";
import {databaseConfigured,getDb} from "@/lib/server/db";
import {rateLimited,requesterKey,guardSize,jsonError} from "@/lib/server/security";
import {sendEmail,emitWorkflow} from "@/lib/server/notify";
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(180),service:z.string().max(120).optional(),notes:z.string().trim().min(10).max(4000),preferredAt:z.iso.datetime().optional(),website:z.string().max(200).optional().default("")}).strict();
export async function POST(request:Request){
 if(guardSize(request))return jsonError("Request too large",413);
 if(rateLimited(requesterKey(request,"booking"),4,60000))return jsonError("Please try again later.",429);
 let data:z.infer<typeof schema>;try{data=schema.parse(await request.json());}catch{return jsonError("Invalid booking request.",400)}
 if(data.website)return NextResponse.json({ok:true});
 const date=data.preferredAt?new Date(data.preferredAt):null;
 if(date&&(date.getTime()<Date.now()+3600000||date.getTime()>Date.now()+365*86400000))return jsonError("Select a future time.",400);
 let stored=false;
 if(databaseConfigured()){try{await getDb().bookingRequest.create({data:{name:data.name,email:data.email.toLowerCase(),service:data.service,notes:data.notes,preferredAt:date}});stored=true;}catch{console.error("Booking database write failed");}}
 const content=["Name: "+data.name,"Email: "+data.email,"Service: "+(data.service||"Consultation"),"Preferred time: "+(date?.toISOString()||"Flexible"),"Notes: "+data.notes].join("\n");
 const sent=await sendEmail(process.env.LEAD_TO_EMAIL||"sites.evolve7@gmail.com","SITES EVOLVE — Consultation request",content,data.email);
 if(stored||sent){if(stored)void emitWorkflow({type:"booking.requested",payload:{name:data.name,email:data.email,preferredAt:date?.toISOString()}});return NextResponse.json({ok:true,confirmed:false,stored,sent});}
 return jsonError("Direct delivery is not configured.",503);
}
