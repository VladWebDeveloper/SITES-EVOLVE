import {databaseConfigured,getDb} from "@/lib/server/db";
import {constantTimeEqual,jsonError} from "@/lib/server/security";
import {sendEmail} from "@/lib/server/notify";

export const runtime="nodejs";
export const dynamic="force-dynamic";

type Outstanding={id:string;name:string;email:string;kind:"lead"|"consultation";createdAt:Date};
function onceKey(item:Outstanding){return item.kind+":"+item.id}
export async function GET(request:Request){
 const expected=process.env.CRON_SECRET;
 if(!expected||!databaseConfigured())return jsonError("Workflow scheduler is not configured",503);
 if(!constantTimeEqual(request.headers.get("authorization")||"","Bearer "+expected))return jsonError("Forbidden",403);
 const db=getDb(),cutoff=new Date(Date.now()-24*3600*1000);
 const [leads,bookings,previous]=await Promise.all([
  db.lead.findMany({where:{status:"NEW",createdAt:{lte:cutoff}},orderBy:{createdAt:"asc"},take:100,select:{id:true,name:true,email:true,createdAt:true}}),
  db.bookingRequest.findMany({where:{status:"NEW",createdAt:{lte:cutoff}},orderBy:{createdAt:"asc"},take:100,select:{id:true,name:true,email:true,createdAt:true}}),
  db.automationEvent.findMany({where:{event:"request.reminder",status:"SENT"},orderBy:{createdAt:"desc"},take:2500,select:{payload:true}})
 ]);
 const already=new Set(previous.map(x=>{const v=x.payload;return v&&typeof v==="object"&&!Array.isArray(v)&&"key" in v&&typeof v.key==="string"?v.key:""}));
 const pending:Outstanding[]=[
  ...leads.map(x=>({...x,kind:"lead" as const})),
  ...bookings.map(x=>({...x,kind:"consultation" as const}))
 ].filter(x=>!already.has(onceKey(x)));
 if(pending.length===0)return Response.json({ok:true,notified:0},{headers:{"Cache-Control":"no-store"}});
 const mailTo=process.env.LEAD_TO_EMAIL||"contact@sitesevolve.com";
 const body=["SITES EVOLVE — outstanding CRM requests","These requests have remained NEW for at least 24 hours:","",...pending.map(x=>"- "+x.kind.toUpperCase()+": "+x.name+" ("+x.email+") — "+x.createdAt.toISOString()),"","Review: https://sitesevolve.com/console/leads","Consultations: https://sitesevolve.com/console/appointments","This reminder is sent once per request while it remains NEW."].join("\n");
 const delivered=await sendEmail(mailTo,"SITES EVOLVE — "+pending.length+" pending request(s) need review",body);
 if(!delivered)return jsonError("Unable to deliver CRM reminder",502);
 await db.automationEvent.createMany({data:pending.map(item=>({event:"request.reminder",status:"SENT",payload:{key:onceKey(item),kind:item.kind}}))});
 const staff=await db.user.findMany({where:{role:{in:["OWNER","STAFF"]},active:true},select:{id:true}});
 if(staff.length)await db.notification.createMany({data:staff.map(x=>({userId:x.id,title:pending.length+" pending CRM request(s) need review",href:"/console/leads"}))});
 return Response.json({ok:true,notified:pending.length},{headers:{"Cache-Control":"no-store"}});
}