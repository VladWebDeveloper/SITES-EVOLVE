import "server-only";
import {createHmac} from "node:crypto";
import {databaseConfigured,getDb} from "./db";
import {allowedExternalHttps} from "./security";
type Event={type:string;payload:Record<string,unknown>};
export async function sendEmail(to:string,subject:string,content:string,replyTo?:string):Promise<boolean>{
 const key=process.env.RESEND_API_KEY,from=process.env.LEAD_FROM_EMAIL;
 if(!key||!from)return false;
 try{
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:replyTo,subject,text:content}),signal:AbortSignal.timeout(9000)});
  if(!response.ok){console.error("Email delivery status",response.status);return false}
  return true;
 }catch{return false}
}
export async function emitWorkflow(event:Event):Promise<void>{
 const url=process.env.AUTOMATION_WEBHOOK_URL;
 if(!url||!allowedExternalHttps(url))return;
 const secret=process.env.AUTOMATION_WEBHOOK_SECRET;
 if(!secret)return;
 const body=JSON.stringify({...event,createdAt:new Date().toISOString()});
 const signature=createHmac("sha256",secret).update(body).digest("hex");
 let status="FAILED",responseCode="";
 try{const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","X-Sites-Evolve-Signature":"sha256="+signature},body,signal:AbortSignal.timeout(6000),redirect:"error"});status=response.ok?"SENT":"FAILED";responseCode=String(response.status);}
 catch{responseCode="NETWORK_ERROR";}
 if(databaseConfigured())try{await getDb().automationEvent.create({data:{event:event.type,status,payload:JSON.parse(JSON.stringify(event.payload)),response:responseCode}});}catch{console.error("Workflow logging failed");}
}
