"use server";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {getDb} from "./db";
import {requireActor,requireStaff,requireClientAccess} from "./actor";
import {safeText} from "./format";
import {allowedExternalHttps} from "./security";
const id=z.string().min(15).max(50);
const email=z.email().max(180);
async function log(userId:string,action:string,entity:string,entityId:string){await getDb().auditEvent.create({data:{userId,action,entity,entityId}});}
function refresh(){revalidatePath("/console");revalidatePath("/portal");}
function requireValue(form:FormData,key:string,max=200,min=1){return z.string().trim().min(min).max(max).parse(form.get(key));}
function validId(form:FormData,key:string){return id.parse(form.get(key));}
function optional(form:FormData,key:string,max=4000){return safeText(form.get(key),max)||null;}

export async function createClient(form:FormData){
 const actor=await requireStaff();
 const name=requireValue(form,"name",150),clientEmail=optional(form,"email",180),phone=optional(form,"phone",50),industry=optional(form,"industry",100);
 const e=clientEmail?email.parse(clientEmail.toLowerCase()):null;
 const db=getDb();
 const client=await db.client.create({data:{name,email:e,phone,industry}});
 if(e){const user=await db.user.upsert({where:{email:e},update:{},create:{email:e,name,role:"CLIENT"}});await db.clientMember.upsert({where:{clientId_userId:{clientId:client.id,userId:user.id}},create:{clientId:client.id,userId:user.id},update:{}});}
 await log(actor.id,"CREATE","Client",client.id);refresh();
}
export async function inviteClient(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId"),e=email.parse(requireValue(form,"email",180).toLowerCase());
 const db=getDb();await db.client.findUniqueOrThrow({where:{id:clientId}});
 const user=await db.user.upsert({where:{email:e},update:{},create:{email:e,role:"CLIENT"}});
 await db.clientMember.upsert({where:{clientId_userId:{clientId,userId:user.id}},update:{},create:{clientId,userId:user.id}});
 await log(actor.id,"INVITE","Client",clientId);refresh();
}
export async function createLead(form:FormData){
 const actor=await requireStaff();
 const lead=await getDb().lead.create({data:{name:requireValue(form,"name",100),email:email.parse(requireValue(form,"email",180).toLowerCase()),service:requireValue(form,"service",100),message:requireValue(form,"message",4000),source:"staff"}});
 await log(actor.id,"CREATE","Lead",lead.id);refresh();
}
export async function setLeadStatus(form:FormData){
 const actor=await requireStaff(),leadId=validId(form,"id");
 const status=z.enum(["NEW","CONTACTED","QUALIFIED","PROPOSAL","WON","LOST"]).parse(form.get("status"));
 await getDb().lead.update({where:{id:leadId},data:{status}});await log(actor.id,"STATUS_"+status,"Lead",leadId);refresh();
}
export async function createProject(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId");
 const project=await getDb().project.create({data:{clientId,title:requireValue(form,"title",180),description:optional(form,"description",3000),dueAt:form.get("dueAt")?new Date(String(form.get("dueAt"))):null}});
 await log(actor.id,"CREATE","Project",project.id);refresh();
}
export async function setProjectStatus(form:FormData){
 const actor=await requireStaff(),projectId=validId(form,"id");
 const status=z.enum(["PLANNED","IN_PROGRESS","REVIEW","COMPLETED","ON_HOLD"]).parse(form.get("status"));
 await getDb().project.update({where:{id:projectId},data:{status}});await log(actor.id,"STATUS_"+status,"Project",projectId);refresh();
}
export async function createMilestone(form:FormData){
 const actor=await requireStaff(),projectId=validId(form,"projectId");
 const milestone=await getDb().milestone.create({data:{projectId,title:requireValue(form,"title",200),description:optional(form,"description",1000),status:"TODO"}});
 await log(actor.id,"CREATE","Milestone",milestone.id);refresh();
}
export async function setMilestoneStatus(form:FormData){
 const actor=await requireStaff(),milestoneId=validId(form,"id");
 const status=z.enum(["TODO","ACTIVE","REVIEW","DONE"]).parse(form.get("status"));
 await getDb().milestone.update({where:{id:milestoneId},data:{status}});await log(actor.id,"STATUS_"+status,"Milestone",milestoneId);refresh();
}
export async function approveMilestone(form:FormData){
 const actor=await requireActor(),milestoneId=validId(form,"id");
 const milestone=await getDb().milestone.findUniqueOrThrow({where:{id:milestoneId},include:{project:{select:{clientId:true}}}});
 await requireClientAccess(milestone.project.clientId,actor);
 if(milestone.status!=="REVIEW")throw new Error("Only milestones awaiting review can be approved.");
 await getDb().milestone.update({where:{id:milestoneId},data:{status:"DONE",approvedAt:new Date()}});
 await log(actor.id,"APPROVE","Milestone",milestoneId);refresh();
}
export async function createTicket(form:FormData){
 const actor=await requireActor(),clientId=validId(form,"clientId");
 await requireClientAccess(clientId,actor);
 const ticket=await getDb().ticket.create({data:{clientId,subject:requireValue(form,"subject",200),description:requireValue(form,"description",4000,10),priority:"NORMAL"}});
 await log(actor.id,"CREATE","Ticket",ticket.id);refresh();
}
export async function addTicketMessage(form:FormData){
 const actor=await requireActor(),ticketId=validId(form,"ticketId");
 const ticket=await getDb().ticket.findUniqueOrThrow({where:{id:ticketId},select:{clientId:true}});
 await requireClientAccess(ticket.clientId,actor);
 await getDb().ticketMessage.create({data:{ticketId,authorId:actor.id,body:requireValue(form,"body",4000,2),isInternal:false}});
 await log(actor.id,"REPLY","Ticket",ticketId);refresh();
}
export async function setTicketStatus(form:FormData){
 const actor=await requireStaff(),ticketId=validId(form,"id");
 const status=z.enum(["OPEN","IN_PROGRESS","RESOLVED","CLOSED"]).parse(form.get("status"));
 await getDb().ticket.update({where:{id:ticketId},data:{status}});await log(actor.id,"STATUS_"+status,"Ticket",ticketId);refresh();
}
export async function createInvoice(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId");
 const number=requireValue(form,"number",60),amount=z.coerce.number().positive().max(1000000).parse(form.get("amount"));
 const currency=z.enum(["EUR","MDL","USD","RON"]).parse(form.get("currency"));
 const invoice=await getDb().invoice.create({data:{clientId,number,amountMinor:Math.round(amount*100),currency,description:optional(form,"description",500),status:"DRAFT",dueAt:form.get("dueAt")?new Date(String(form.get("dueAt"))):null}});
 await log(actor.id,"CREATE","Invoice",invoice.id);refresh();
}
export async function setInvoiceStatus(form:FormData){
 const actor=await requireStaff(),invoiceId=validId(form,"id");
 const status=z.enum(["DRAFT","ISSUED","PAID","OVERDUE","VOID"]).parse(form.get("status"));
 if(status!=="DRAFT" && !process.env.BILLING_LEGAL_NAME)throw new Error("Configure legal billing identity before issuing or marking invoice records.");
 await getDb().invoice.update({where:{id:invoiceId},data:{status,issuedAt:status==="ISSUED"?new Date():undefined,paidAt:status==="PAID"?new Date():undefined}});
 await log(actor.id,"STATUS_"+status,"Invoice",invoiceId);refresh();
}
export async function createSubscription(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId");
 const amount=z.coerce.number().nonnegative().max(1000000).parse(form.get("amount"));
 const subscription=await getDb().subscription.create({data:{clientId,name:requireValue(form,"name",140),amountMinor:Math.round(amount*100),currency:z.enum(["EUR","MDL","USD","RON"]).parse(form.get("currency")),interval:z.enum(["monthly","yearly"]).parse(form.get("interval")),status:"TRIAL"}});
 await log(actor.id,"CREATE","Subscription",subscription.id);refresh();
}
export async function createManagedSite(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId"),url=requireValue(form,"url",400);
 if(!allowedExternalHttps(url))throw new Error("A public HTTPS domain is required.");
 const site=await getDb().managedSite.create({data:{clientId,url,name:requireValue(form,"name",180)}});
 await log(actor.id,"CREATE","ManagedSite",site.id);refresh();
}
export async function createPost(form:FormData){
 const actor=await requireStaff();
 const slug=z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(90).parse(form.get("slug"));
 const locale=z.enum(["en","ro","ru"]).parse(form.get("locale"));
 const post=await getDb().blogPost.create({data:{slug,locale,title:requireValue(form,"title",160),excerpt:requireValue(form,"excerpt",400),body:requireValue(form,"body",20000,40),category:optional(form,"category",80)||"INSIGHTS",status:"DRAFT"}});
 await log(actor.id,"CREATE","BlogPost",post.id);refresh();
}
export async function updatePost(form:FormData){
 const actor=await requireStaff(),postId=validId(form,"id");
 const title=requireValue(form,"title",160),excerpt=requireValue(form,"excerpt",400),body=requireValue(form,"body",20000,40),category=optional(form,"category",80)||"INSIGHTS";
 await getDb().blogPost.update({where:{id:postId},data:{title,excerpt,body,category}});
 await log(actor.id,"UPDATE","BlogPost",postId);refresh();
 for(const locale of ["en","ro","ru"])revalidatePath("/"+locale+"/journal");
}

export async function setPostStatus(form:FormData){
 const actor=await requireStaff(),postId=validId(form,"id");
 const status=z.enum(["DRAFT","PUBLISHED"]).parse(form.get("status"));
 await getDb().blogPost.update({where:{id:postId},data:{status,publishedAt:status==="PUBLISHED"?new Date():null}});
 await log(actor.id,"STATUS_"+status,"BlogPost",postId);refresh();
}
export async function setAppointmentStatus(form:FormData){
 const actor=await requireStaff(),appointmentId=validId(form,"id");
 const status=z.enum(["NEW","CONFIRMED","CANCELLED","COMPLETED"]).parse(form.get("status"));
 await getDb().bookingRequest.update({where:{id:appointmentId},data:{status}});
 await log(actor.id,"STATUS_"+status,"BookingRequest",appointmentId);refresh();
}
