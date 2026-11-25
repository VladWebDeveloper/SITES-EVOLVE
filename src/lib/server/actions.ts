"use server";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {fromZonedTime} from "date-fns-tz";
import {isValidConsultationTime,studioDate,studioTimeZone} from "@/lib/booking-calendar";
import {getDb} from "./db";
import {isSimulatedInvoice} from "./invoice-simulation";
import {requireActor,requireStaff,requireClientAccess} from "./actor";
import {safeText} from "./format";
import {allowedExternalHttps} from "./security";
import {sendEmail} from "./notify";
import {parseReferralCode} from "@/lib/server/referrals";
import {sendClientInvitation,informTicketUpdate,notifyStaffAboutEnquiry,acknowledgeEnquiry} from "./engagement";
const id=z.string().min(15).max(50);
const email=z.email().max(180);
async function notifyClient(clientId:string,title:string,href:string){
 const db=getDb(),rows=await db.clientMember.findMany({where:{clientId},select:{userId:true}});
 if(rows.length)await db.notification.createMany({data:rows.map(r=>({userId:r.userId,title,href}))});
}
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
 await log(actor.id,"CREATE","Client",client.id);if(e)await sendClientInvitation(e);refresh();
}
export async function inviteClient(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId"),e=email.parse(requireValue(form,"email",180).toLowerCase());
 const db=getDb();await db.client.findUniqueOrThrow({where:{id:clientId}});
 const user=await db.user.upsert({where:{email:e},update:{},create:{email:e,role:"CLIENT"}});
 await db.clientMember.upsert({where:{clientId_userId:{clientId,userId:user.id}},update:{},create:{clientId,userId:user.id}});
 await log(actor.id,"INVITE","Client",clientId);await sendClientInvitation(e);refresh();
}
/** A verified Google client can request a project without another form account.
 * Their verified login email is always the identity recorded on the enquiry. */
export async function createClientRequest(form:FormData){
 const actor=await requireActor();
 if(actor.role!=="CLIENT")throw new Error("Use the studio CRM for staff requests.");
 const service=requireValue(form,"service",100,2);
 const message=requireValue(form,"message",4000,10);
 const db=getDb();
 const lead=await db.lead.create({data:{
   name:actor.name||actor.email,email:actor.email,service,message,
   source:"client_portal",status:"NEW"
 }});
 await log(actor.id,"SUBMIT","Lead",lead.id);
 await notifyStaffAboutEnquiry("quote");
 const lastHour=new Date(Date.now()-3600000);
 const recent=await db.lead.count({where:{email:actor.email,createdAt:{gte:lastHour}}});
 await acknowledgeEnquiry("quote",actor.email,recent);
 refresh();revalidatePath("/portal/requests");
}

export async function createLead(form:FormData){
 const actor=await requireStaff();
 const lead=await getDb().lead.create({data:{name:requireValue(form,"name",100),email:email.parse(requireValue(form,"email",180).toLowerCase()),service:requireValue(form,"service",100),message:requireValue(form,"message",4000),source:"staff"}});
 await log(actor.id,"CREATE","Lead",lead.id);refresh();
}
export async function setLeadStatus(form:FormData){
 const actor=await requireStaff(),leadId=validId(form,"id");
 const status=z.enum(["NEW","CONTACTED","QUALIFIED","PROPOSAL","WON","LOST"]).parse(form.get("status"));
 const db=getDb();
 const lead=await db.lead.update({where:{id:leadId},data:{status},select:{referralCode:true,name:true}});
 if(lead.referralCode){
  const clientId=parseReferralCode(lead.referralCode);
  if(clientId&&status==="WON"){
   const rule=await db.referralProgram.findUnique({where:{id:"main"}});
   const owner=await db.client.findUnique({where:{id:clientId},select:{id:true}});
   if(rule?.enabled&&rule.benefitDescription.trim()&&owner){
    await db.referralReward.upsert({where:{leadId},
     create:{clientId,leadId,benefitDescription:rule.benefitDescription,status:"PENDING"},update:{}});
    await notifyClient(clientId,"A referred project became a customer. Your benefit is pending approval.","/portal/referrals");
   }
  }else if(status==="LOST"){
   await db.referralReward.updateMany({where:{leadId,status:"PENDING"},data:{status:"VOID"}});
  }
 }
 await log(actor.id,"STATUS_"+status,"Lead",leadId);refresh();
}

export async function deleteLead(form:FormData){
 const actor=await requireStaff();
 if(actor.role!=="OWNER")throw new Error("Only the owner may permanently delete enquiries.");
 const leadId=validId(form,"id");
 const db=getDb();
 await db.lead.delete({where:{id:leadId}});
 await log(actor.id,"DELETE","Lead",leadId);refresh();
}

export async function deleteBookingRequest(form:FormData){
 const actor=await requireStaff();
 if(actor.role!=="OWNER")throw new Error("Only the owner may permanently delete consultation requests.");
 const requestId=validId(form,"id");
 const db=getDb();
 await db.bookingRequest.delete({where:{id:requestId}});
 await log(actor.id,"DELETE","BookingRequest",requestId);refresh();
}

export async function markNotificationRead(form:FormData){
 const actor=await requireActor(),notificationId=validId(form,"id");
 await getDb().notification.updateMany({where:{id:notificationId,userId:actor.id},data:{readAt:new Date()}});
 refresh();
}

export async function createProject(form:FormData){
 const actor=await requireStaff(),clientId=validId(form,"clientId");
 const project=await getDb().project.create({data:{clientId,title:requireValue(form,"title",180),description:optional(form,"description",3000),dueAt:form.get("dueAt")?new Date(String(form.get("dueAt"))):null}});
 await log(actor.id,"CREATE","Project",project.id);refresh();
}
export async function setProjectStatus(form:FormData){
 const actor=await requireStaff(),projectId=validId(form,"id");
 const status=z.enum(["PLANNED","IN_PROGRESS","REVIEW","COMPLETED","ON_HOLD"]).parse(form.get("status"));
 const project=await getDb().project.update({where:{id:projectId},data:{status}});
 await notifyClient(project.clientId,"Project "+project.title+": "+status.replaceAll("_"," ").toLowerCase(),"/portal/projects");
 await log(actor.id,"STATUS_"+status,"Project",projectId);refresh();
}
export async function createMilestone(form:FormData){
 const actor=await requireStaff(),projectId=validId(form,"projectId");
 const milestone=await getDb().milestone.create({data:{projectId,title:requireValue(form,"title",200),description:optional(form,"description",1000),status:"TODO"}});
 await log(actor.id,"CREATE","Milestone",milestone.id);refresh();
}
export async function setMilestoneStatus(form:FormData){
 const actor=await requireStaff(),milestoneId=validId(form,"id");
 const status=z.enum(["TODO","ACTIVE","REVIEW","DONE"]).parse(form.get("status"));
 const stage=await getDb().milestone.update({where:{id:milestoneId},data:{status},include:{project:{select:{clientId:true}}}});
 if(status==="REVIEW"||status==="DONE")await notifyClient(stage.project.clientId,"Milestone "+stage.title+": "+status.toLowerCase(),"/portal/projects");
 await log(actor.id,"STATUS_"+status,"Milestone",milestoneId);refresh();
}
export async function approveMilestone(form:FormData){
 const actor=await requireActor(),milestoneId=validId(form,"id");
 const milestone=await getDb().milestone.findUniqueOrThrow({where:{id:milestoneId},include:{project:{select:{clientId:true}}}});
 await requireClientAccess(milestone.project.clientId,actor);
 if(milestone.status!=="REVIEW")throw new Error("Only milestones awaiting review can be approved.");
 await getDb().milestone.update({where:{id:milestoneId},data:{status:"DONE",approvedAt:new Date()}});
 const staff=await getDb().user.findMany({where:{role:{in:["OWNER","STAFF"]},active:true},select:{id:true}});
 if(staff.length)await getDb().notification.createMany({data:staff.map(u=>({userId:u.id,title:"Milestone approved by client",href:"/console/projects"}))});
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
 const ticket=await getDb().ticket.findUniqueOrThrow({where:{id:ticketId},select:{clientId:true,subject:true}});
 await requireClientAccess(ticket.clientId,actor);
 await getDb().ticketMessage.create({data:{ticketId,authorId:actor.id,body:requireValue(form,"body",4000,2),isInternal:false}});
 await log(actor.id,"REPLY","Ticket",ticketId);await informTicketUpdate(actor.role,ticket.clientId,ticket.subject);refresh();
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
/** Safely reassign only draft records; invoiced or paid history remains immutable. */
export async function reassignDraftInvoice(form:FormData){
 const actor=await requireStaff();
 if(actor.role!=="OWNER")throw new Error("Only the owner can reassign draft invoices.");
 const invoiceId=validId(form,"id"),clientId=validId(form,"clientId");
 const db=getDb();
 const [invoice,client]=await Promise.all([
  db.invoice.findUnique({where:{id:invoiceId},select:{status:true}}),
  db.client.findUnique({where:{id:clientId},select:{id:true}})
 ]);
 if(!invoice||invoice.status!=="DRAFT")throw new Error("Only draft invoices can be reassigned.");
 if(!client)throw new Error("Selected client does not exist.");
 await db.invoice.update({where:{id:invoiceId,status:"DRAFT"},data:{clientId}});
 await log(actor.id,"REASSIGN_DRAFT","Invoice",invoiceId);
 refresh();
}
export async function setInvoiceStatus(form:FormData){
 const actor=await requireStaff(),invoiceId=validId(form,"id");
 const status=z.enum(["DRAFT","ISSUED","PAID","SIMULATED_PAID","OVERDUE","VOID"]).parse(form.get("status"));
 const db=getDb();
 const invoice=await db.invoice.findUnique({where:{id:invoiceId},include:{client:{select:{name:true,industry:true}}}});
 if(!invoice)throw new Error("Invoice not found.");
 const simulated=isSimulatedInvoice(invoice);
 if(simulated && !["DRAFT","SIMULATED_PAID","VOID"].includes(status))
  throw new Error("This is a simulated invoice. Choose PAID (simulation), not real PAID.");
 if(!simulated && status==="SIMULATED_PAID")
  throw new Error("Only test records can use simulated payment status.");
 if(!simulated && ["ISSUED","PAID","OVERDUE"].includes(status) && !process.env.BILLING_LEGAL_NAME)
  throw new Error("Legal billing identity is not configured. Set it up before marking a real invoice as issued or paid.");
 await db.invoice.update({where:{id:invoiceId},data:{
  status,
  issuedAt:status==="ISSUED"?new Date():status==="DRAFT"||status==="SIMULATED_PAID"?null:undefined,
  paidAt:status==="PAID"?new Date():status==="DRAFT"||status==="SIMULATED_PAID"?null:undefined
 }});
 await log(actor.id,"STATUS_"+status,"Invoice",invoiceId);refresh();
}
/** Return expected validation failures in the form instead of crashing the entire workspace. */
export async function saveInvoiceStatus(_previous:{ok:boolean;message:string},form:FormData):Promise<{ok:boolean;message:string}>{
 try{
  await setInvoiceStatus(form);
  return {ok:true,message:"Status saved."};
 }catch(e){
  const msg=e instanceof Error?e.message:"";
  const expected=["Invoice not found.","This is a simulated invoice.","Only test records","Legal billing identity"];
  if(expected.some(x=>msg.startsWith(x)))return {ok:false,message:msg};
  console.error("Cannot update invoice status",e);
  return {ok:false,message:"Could not save the status. Please retry or check the administrator settings."};
 }
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
 const db=getDb();
 const original=await db.bookingRequest.findUniqueOrThrow({where:{id:appointmentId},include:{slot:true}});
 if(status==="CONFIRMED"&&!original.slot){
  if(!original.preferredAt||!isValidConsultationTime(original.preferredAt))throw Error("Choose a valid future available time before confirming.");
  const block=await db.consultationBlock.findFirst({where:{startsAt:{lte:original.preferredAt},endsAt:{gt:original.preferredAt}}});
  if(block)throw Error("This time is blocked.");
  await db.$transaction(async tx=>{
   await tx.consultationSlot.create({data:{startAt:original.preferredAt!,bookingId:appointmentId}});
   await tx.bookingRequest.update({where:{id:appointmentId},data:{status}});
  });
 }else if(status==="CANCELLED"||status==="NEW"){
  await db.$transaction(async tx=>{
   await tx.consultationSlot.deleteMany({where:{bookingId:appointmentId}});
   await tx.bookingRequest.update({where:{id:appointmentId},data:{status}});
  });
 }else{
  await db.bookingRequest.update({where:{id:appointmentId},data:{status}});
 }
 if(status==="CANCELLED"&&original.status!=="CANCELLED")await sendEmail(original.email,"SITES EVOLVE — Consultation cancelled",
  "Your consultation scheduled for "+(original.preferredAt?studioDate(original.preferredAt):"a future date")+" has been cancelled. Contact sites.evolve7@gmail.com to reschedule.");
 await log(actor.id,"STATUS_"+status,"BookingRequest",appointmentId);refresh();
}

export async function createConsultationBlock(form:FormData){
 const actor=await requireStaff();
 const startRaw=requireValue(form,"startsAt",35),endRaw=requireValue(form,"endsAt",35);
 const startsAt=fromZonedTime(startRaw,studioTimeZone),endsAt=fromZonedTime(endRaw,studioTimeZone);
 if(!Number.isFinite(startsAt.getTime())||!Number.isFinite(endsAt.getTime())||startsAt<new Date()||
  endsAt<=startsAt||endsAt.getTime()-startsAt.getTime()>7*86400000)throw Error("Invalid time range (max. seven days).");
 const confirmed=await getDb().consultationSlot.count({where:{startAt:{gte:startsAt,lt:endsAt}}});
 if(confirmed>0)throw Error("Cannot block a time that has a confirmed appointment.");
 const block=await getDb().consultationBlock.create({data:{startsAt,endsAt,note:optional(form,"note",180)}});
 await log(actor.id,"CREATE","ConsultationBlock",block.id);refresh();
}
export async function deleteConsultationBlock(form:FormData){
 const actor=await requireStaff();
 const blockId=validId(form,"id");
 await getDb().consultationBlock.delete({where:{id:blockId}});
 await log(actor.id,"DELETE","ConsultationBlock",blockId);refresh();
}

