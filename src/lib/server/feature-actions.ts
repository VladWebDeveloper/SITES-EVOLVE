"use server";

import {revalidatePath} from "next/cache";
import {z} from "zod";
import {getDb} from "@/lib/server/db";
import {requireActor,requireStaff,requireClientAccess} from "@/lib/server/actor";

const cuid=z.string().regex(/^[a-z0-9]{15,50}$/);
const text=(form:FormData,key:string,min=1,max=4000)=>z.string().trim().min(min).max(max).parse(form.get(key));
const optional=(form:FormData,key:string,max=1000)=>z.string().trim().max(max).parse(String(form.get(key)||""))||null;
const revalidate=()=>{revalidatePath("/console");revalidatePath("/portal");};

export async function createCrmTask(form:FormData){
 const actor=await requireStaff();
 const title=text(form,"title",3,180),notes=optional(form,"notes",1200);
 const leadId=form.get("leadId")?cuid.parse(form.get("leadId")):null;
 if(leadId&&!await getDb().lead.findUnique({where:{id:leadId},select:{id:true}}))throw Error("Lead not found");
 const dueString=String(form.get("dueAt")||"");
 const dueAt=dueString?new Date(dueString+"T12:00:00Z"):null;
 if(dueAt&&(!Number.isFinite(dueAt.getTime())||dueAt.getTime()<Date.now()-365*86400000||dueAt.getTime()>Date.now()+3*365*86400000))throw Error("Invalid date");
 const task=await getDb().crmTask.create({data:{title,notes,leadId,dueAt,assignedToId:actor.id,priority:z.enum(["LOW","NORMAL","HIGH","URGENT"]).parse(form.get("priority"))}});
 await getDb().auditEvent.create({data:{userId:actor.id,action:"CREATE",entity:"CrmTask",entityId:task.id}});
 revalidate();
}
export async function setCrmTaskDone(form:FormData){
 const actor=await requireStaff(),id=cuid.parse(form.get("id")),done=z.enum(["true","false"]).parse(form.get("done"))==="true";
 const task=await getDb().crmTask.update({where:{id},data:{doneAt:done?new Date():null}});
 await getDb().auditEvent.create({data:{userId:actor.id,action:done?"COMPLETE":"REOPEN",entity:"CrmTask",entityId:task.id}});
 revalidate();
}
export async function submitClientBrief(form:FormData){
 const actor=await requireActor(),clientId=cuid.parse(form.get("clientId"));
 await requireClientAccess(clientId,actor);
 const data={
  clientId,submittedById:actor.id,
  title:text(form,"title",3,180),
  business:text(form,"business",5,1200),
  goals:text(form,"goals",10,3000),
  audience:optional(form,"audience",1200),
  inspiration:optional(form,"inspiration",1000),
  contentStatus:optional(form,"contentStatus",300),
  notes:optional(form,"notes",1800)
 };
 const created=await getDb().clientBrief.create({data});
 await getDb().auditEvent.create({data:{userId:actor.id,action:"SUBMIT",entity:"ClientBrief",entityId:created.id}});
 const staff=await getDb().user.findMany({where:{role:{in:["OWNER","STAFF"]},active:true},select:{id:true}});
 if(staff.length)await getDb().notification.createMany({data:staff.map(u=>({userId:u.id,title:"New client onboarding brief",href:"/console/briefs"}))});
 revalidate();
}
export async function requestDataDeletion(form:FormData){
 const actor=await requireActor();
 const note=optional(form,"note",800);
 const db=getDb();
 const existing=await db.privacyRequest.findFirst({where:{userId:actor.id,kind:"ERASURE",status:"PENDING"},select:{id:true}});
 if(existing)return;
 const item=await db.privacyRequest.create({data:{userId:actor.id,kind:"ERASURE",status:"PENDING",note}});
 await db.auditEvent.create({data:{userId:actor.id,action:"REQUEST_ERASURE",entity:"PrivacyRequest",entityId:item.id}});
 const staff=await db.user.findMany({where:{role:{in:["OWNER","STAFF"]},active:true},select:{id:true}});
 if(staff.length)await db.notification.createMany({data:staff.map(u=>({userId:u.id,title:"Personal data deletion request received",href:"/console/privacy"}))});
 revalidate();
}
export async function reviewPrivacyRequest(form:FormData){
 const actor=await requireStaff();
 const id=cuid.parse(form.get("id"));
 // Acknowledgement only: actual erasure requires identity, retention and dependency checks.
 const status=z.enum(["PENDING","REVIEWING","CLOSED"]).parse(form.get("status"));
 const db=getDb();
 const req=await db.privacyRequest.update({where:{id},data:{status,reviewedAt:status==="CLOSED"?new Date():null}});
 await db.auditEvent.create({data:{userId:actor.id,action:"REVIEW_"+status,entity:"PrivacyRequest",entityId:req.id}});
 await db.notification.create({data:{userId:req.userId,title:"Privacy request status: "+status,href:"/portal/privacy"}});
 revalidate();
}
export async function markAllNotificationsRead(){
 const actor=await requireActor();
 await getDb().notification.updateMany({where:{userId:actor.id,readAt:null},data:{readAt:new Date()}});
 revalidate();
}
