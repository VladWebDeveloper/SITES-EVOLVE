import { NextResponse } from "next/server";
import { z } from "zod";
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(180),service:z.string().trim().min(1).max(120),message:z.string().trim().min(10).max(4000),website:z.string().max(200).optional().default("")}).strict();
function result(body:unknown,status:number){return NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}});}
export async function POST(request:Request){
 try{const raw=await request.json();const parsed=schema.safeParse(raw);if(!parsed.success)return result({error:"Please check the required fields."},400);
 const {name,email,service,message,website}=parsed.data;
 if(website)return result({ok:true},200); // Spam trap: do not deliver.
 const token=process.env.RESEND_API_KEY;const from=process.env.LEAD_FROM_EMAIL;const to=process.env.LEAD_TO_EMAIL||"sites.evolve7@gmail.com";
 if(!token||!from)return result({error:"Direct email delivery is not configured. Please use your email application."},503);
 const apiResponse=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:email,subject:"SITES EVOLVE — "+service+" enquiry",text:"Name: "+name+"\nEmail: "+email+"\nService: "+service+"\n\n"+message}),signal:AbortSignal.timeout(10000)});
 if(!apiResponse.ok){console.error("Lead mail delivery failed with HTTP",apiResponse.status);return result({error:"Email service temporarily unavailable."},502)};
 return result({ok:true},200);
 }catch{ return result({error:"Unable to process request."},400); }
}
