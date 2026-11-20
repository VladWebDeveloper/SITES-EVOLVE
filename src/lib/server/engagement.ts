import "server-only";
import {getDb,databaseConfigured} from "@/lib/server/db";
import {sendEmail} from "@/lib/server/notify";

export type EnquiryKind="lead"|"quote"|"booking";
const labels:Record<EnquiryKind,{title:string;href:string;label:string}>={
 lead:{title:"New contact enquiry",href:"/console/leads",label:"contact enquiry"},
 quote:{title:"New project quotation request",href:"/console/leads",label:"project estimate"},
 booking:{title:"New consultation request",href:"/console/appointments",label:"consultation request"}
};

export async function notifyStaffAboutEnquiry(kind:EnquiryKind):Promise<void>{
 if(!databaseConfigured())return;
 try{
  const db=getDb();
  const members=await db.user.findMany({where:{role:{in:["OWNER","STAFF"]},active:true},select:{id:true}});
  if(members.length)await db.notification.createMany({data:members.map(user=>({userId:user.id,title:labels[kind].title,href:labels[kind].href}))});
 }catch{console.error("CRM notification could not be recorded");}
}

/** Acknowledgment is transactional, not marketing. Suppress duplicates to protect visitors. */
export async function acknowledgeEnquiry(kind:EnquiryKind,email:string,requestCountLastHour:number):Promise<boolean>{
 if(requestCountLastHour>1)return false;
 const label=labels[kind].label;
 const subject="SITES EVOLVE — we received your "+label;
 const body=["Hello,","Thank you for contacting SITES EVOLVE. Your "+label+" has been received and will be reviewed by the studio.","This is an automated acknowledgment, not a confirmed consultation appointment, project quote or contractual offer.","For follow-up questions, reply to sites.evolve7@gmail.com.","SITES EVOLVE · https://sitesevolve.com"].join("\n\n");
 return sendEmail(email,subject,body);
}

export async function sendClientInvitation(email:string):Promise<boolean>{
 const url="https://sitesevolve.com/login";
 const subject="SITES EVOLVE — access to your Client Portal";
 const body=["Hello,","You have been invited to use the SITES EVOLVE Client Portal.","Sign in with this Google email address to view your authorized projects, milestones, documents and support conversations:",url,"If you weren't expecting this invitation, you can ignore the email.","Questions? Contact sites.evolve7@gmail.com."].join("\n\n");
 return sendEmail(email,subject,body);
}

/** Sends operational notifications only. Never embed customer document contents. */
export async function informTicketUpdate(actorRole:"OWNER"|"STAFF"|"CLIENT",clientId:string,ticketSubject:string):Promise<void>{
 try{
  const db=getDb();
  if(actorRole==="CLIENT"){
   const users=await db.user.findMany({where:{active:true,role:{in:["OWNER","STAFF"]}},select:{id:true}});
   if(users.length)await db.notification.createMany({data:users.map(x=>({userId:x.id,title:"Client replied to support ticket",href:"/console/tickets"}))});
   await sendEmail(process.env.LEAD_TO_EMAIL||"sites.evolve7@gmail.com","SITES EVOLVE — client support reply","A client replied to the ticket: "+ticketSubject+". Open the secure CRM to read it: https://sitesevolve.com/console/tickets");
  }else{
   const client=await db.client.findUnique({where:{id:clientId},select:{email:true}});
   const members=await db.clientMember.findMany({where:{clientId},select:{userId:true}});
   if(members.length)await db.notification.createMany({data:members.map(m=>({userId:m.userId,title:"Support ticket updated: "+ticketSubject.slice(0,100),href:"/portal/tickets"}))});
   if(client?.email)await sendEmail(client.email,"SITES EVOLVE — support ticket updated","Your support ticket “"+ticketSubject+"” has an update. Sign in to the Client Portal to read it securely: https://sitesevolve.com/portal/tickets");
  }
 }catch{console.error("Ticket notification could not be delivered");}
}
