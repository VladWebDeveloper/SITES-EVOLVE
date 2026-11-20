import {currentActor} from "@/lib/server/actor";
import {getDb} from "@/lib/server/db";
import {jsonError,rateLimited} from "@/lib/server/security";
export const runtime="nodejs";
export async function GET(){
 const actor=await currentActor();
 if(!actor)return jsonError("Sign in to export your personal information",401);
 if(rateLimited("privacy-export:"+actor.id,3,60_000))return jsonError("Try again later",429);
 const db=getDb();
 // Explicitly restrict every record to the requesting account. No other client
 // members, internal notes, invoices, documents or unrelated lead records.
 const [account,leads,bookings,messages,briefs,privacyRequests]=await Promise.all([
  db.user.findUnique({where:{id:actor.id},select:{name:true,email:true,role:true,createdAt:true}}),
  db.lead.findMany({where:{email:actor.email},select:{service:true,message:true,status:true,source:true,createdAt:true},take:400}),
  db.bookingRequest.findMany({where:{email:actor.email},select:{service:true,notes:true,status:true,preferredAt:true,createdAt:true},take:200}),
  db.ticketMessage.findMany({where:{authorId:actor.id},select:{body:true,createdAt:true},take:300}),
  db.clientBrief.findMany({where:{submittedById:actor.id},select:{title:true,business:true,goals:true,audience:true,inspiration:true,contentStatus:true,notes:true,createdAt:true},take:100}),
  db.privacyRequest.findMany({where:{userId:actor.id},select:{kind:true,status:true,createdAt:true,reviewedAt:true},take:50})
 ]);
 const data={exportedAt:new Date().toISOString(),source:"SITES EVOLVE personal data export",account,leads,bookings,authoredSupportMessages:messages,submittedBriefs:briefs,privacyRequests,notice:"This export covers account-linked personal records; ask the studio about records retained for legal or contractual obligations."};
 return new Response(JSON.stringify(data,null,2),{headers:{"Content-Type":"application/json; charset=utf-8","Content-Disposition":'attachment; filename="sites-evolve-personal-data.json"',"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
}
