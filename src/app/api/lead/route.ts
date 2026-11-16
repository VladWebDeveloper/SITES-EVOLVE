import {NextResponse} from "next/server";
import {z} from "zod";
import {databaseConfigured,getDb} from "@/lib/server/db";
import {guardSize,rateLimited,requesterKey,jsonError} from "@/lib/server/security";
import {sendEmail,emitWorkflow} from "@/lib/server/notify";
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(180),service:z.string().trim().min(1).max(120),message:z.string().trim().min(10).max(4000),website:z.string().max(200).optional().default("")}).strict();
export async function POST(request:Request){
 if(guardSize(request,12000))return jsonError("Request too large",413);
 if(rateLimited(requesterKey(request,"lead"),5,60000))return jsonError("Please try again in a moment.",429);
 let form:z.infer<typeof schema>;try{form=schema.parse(await request.json());}catch{return jsonError("Please check the required fields.",400)}
 if(form.website)return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
 const email=form.email.toLowerCase();
 let stored=false;
 if(databaseConfigured()){
  try{await getDb().lead.create({data:{name:form.name,email,service:form.service,message:form.message,source:"website"}});stored=true;}
  catch{console.error("Lead database write failed");}
 }
 const sent=await sendEmail(process.env.LEAD_TO_EMAIL||"sites.evolve7@gmail.com","SITES EVOLVE — "+form.service+" enquiry","Name: "+form.name+"\nEmail: "+email+"\nService: "+form.service+"\n\n"+form.message,email);
 if(sent){if(stored)void emitWorkflow({type:"lead.created",payload:{service:form.service,name:form.name,email}});return NextResponse.json({ok:true,stored,sent},{headers:{"Cache-Control":"no-store"}});}
 return jsonError("Direct delivery is not configured. Please use your email application.",503);
}
