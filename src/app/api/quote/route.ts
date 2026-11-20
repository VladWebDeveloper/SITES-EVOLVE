import {z} from "zod";
import {estimate} from "@/lib/estimator";
import {parseReferralCode} from "@/lib/server/referrals";
import {databaseConfigured,getDb} from "@/lib/server/db";
import {sendEmail,emitWorkflow} from "@/lib/server/notify";
import {notifyStaffAboutEnquiry,acknowledgeEnquiry} from "@/lib/server/engagement";
import {rateLimited,requesterKey,guardSize,jsonError} from "@/lib/server/security";
const input=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(180),brief:z.string().trim().min(10).max(4000),kind:z.enum(["landing","web","commerce","app","ai"]),extras:z.array(z.enum(["seo","multi","cms","care"])).max(4),timeline:z.enum(["standard","rush"]),pages:z.number().int().min(1).max(50),ref:z.string().max(90).optional(),website:z.string().max(200).optional().default("")}).strict();
export async function POST(req:Request){
 if(guardSize(req,15000))return jsonError("Request too large",413);
 if(rateLimited(requesterKey(req,"quote"),4,60000))return jsonError("Too many requests",429);
 let data:z.infer<typeof input>;try{data=input.parse(await req.json());}catch{return jsonError("Please review your project details",400);}
 if(data.website)return Response.json({ok:true});
 if(data.kind==="landing"&&data.pages!==1)return jsonError("Landing pages must have exactly one page",400);
 const calculated=estimate({kind:data.kind,extras:data.extras,timeline:data.timeline,pages:data.pages});
 const potentialReferrer=parseReferralCode(data.ref);
 // Referral codes are attribution tokens, never access credentials.
 const referrer=potentialReferrer&&databaseConfigured()?await getDb().client.findUnique({where:{id:potentialReferrer},select:{id:true,email:true}}):null;
 const referralCode=referrer&&referrer.email?.toLowerCase()!==data.email.toLowerCase()?data.ref:undefined;
 const message=["Project type: "+data.kind,"Page count: "+data.pages,"Extras: "+data.extras.join(", "),"Timeline: "+data.timeline,"Indicative one-time development range: €"+calculated.low+"–€"+calculated.high,calculated.monthly?"Recurring website care: €"+calculated.monthly+"/month (separate)":"No monthly care selected","Name: "+data.name,"Email: "+data.email,"Brief: "+data.brief].join("\n");
 let saved=false;
 if(databaseConfigured()){
  try{await getDb().lead.create({data:{name:data.name,email:data.email.toLowerCase(),service:"Quote / "+data.kind,message:data.brief,source:referralCode?"referral":"estimator",referralCode,budgetMin:calculated.low*100,budgetMax:calculated.high*100,metadata:{kind:data.kind,extras:data.extras,timeline:data.timeline,pages:data.pages,maintenanceMonthlyEUR:calculated.monthly}}});saved=true;}catch{console.error("Quote lead storage failed");}
 }
 const sent=await sendEmail(process.env.LEAD_TO_EMAIL||"sites.evolve7@gmail.com","SITES EVOLVE — Project estimate",message,data.email);
 if(sent||saved){
  if(saved)try{
   await notifyStaffAboutEnquiry("quote");
   const mail=data.email.toLowerCase();
   const lastHour=await getDb().lead.count({where:{email:mail,createdAt:{gte:new Date(Date.now()-3600000)}}});
   await acknowledgeEnquiry("quote",mail,lastHour);
   await emitWorkflow({type:"quote.requested",payload:{kind:data.kind,name:data.name,email:mail}});
  }catch{console.error("CRM post-submission automation failed");}
  return Response.json({ok:true,stored:saved,sent,estimate:calculated});
 }
 return jsonError("The estimator is ready, but direct submission is not configured.",503);
}
