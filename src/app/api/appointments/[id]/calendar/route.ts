import {getDb,databaseConfigured} from "@/lib/server/db";
import {validCalendarToken} from "@/lib/booking-token";
import {jsonError} from "@/lib/server/security";
export const runtime="nodejs";
const escapeIcs=(text:string)=>text.replace(/[\r\n]+/g," ").replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;").slice(0,240);
const utc=(date:Date)=>date.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 if(!/^[a-z0-9]{15,50}$/.test(id)||!validCalendarToken(id,new URL(request.url).searchParams.get("token")))
  return jsonError("Invalid calendar invitation",403);
 if(!databaseConfigured())return jsonError("Calendar unavailable",503);
 const booking=await getDb().bookingRequest.findUnique({where:{id},select:{status:true,preferredAt:true,service:true,notes:true}});
 if(!booking||booking.status!=="CONFIRMED"||!booking.preferredAt)return jsonError("This booking is no longer confirmed",404);
 const start=booking.preferredAt;
 const location=/Preferred format: in_person/.test(booking.notes)?"Chișinău (venue sent by studio)":/Preferred format: phone/.test(booking.notes)?"Telephone":"Telegram or WhatsApp (connection arranged with studio)";
 const body=[
  "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//SITES EVOLVE//Booking Calendar//RO","CALSCALE:GREGORIAN","METHOD:PUBLISH",
  "BEGIN:VEVENT","UID:"+id+"@sitesevolve.com","DTSTAMP:"+utc(new Date()),"DTSTART:"+utc(start),
  "DTEND:"+utc(new Date(start.getTime()+30*60_000)),
  "SUMMARY:"+escapeIcs("SITES EVOLVE — "+(booking.service||"Consultation")),
  "LOCATION:"+escapeIcs(location),
  "DESCRIPTION:"+escapeIcs("30-minute consultation; changes/cancellation: sites.evolve7@gmail.com"),
  "STATUS:CONFIRMED","END:VEVENT","END:VCALENDAR",""
 ].join("\r\n");
 return new Response(body,{headers:{"Content-Type":"text/calendar; charset=utf-8",
  "Content-Disposition":'attachment; filename="SITES-EVOLVE-consultation.ics"',
  "Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
}
