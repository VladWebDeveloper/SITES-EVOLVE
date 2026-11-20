import {z} from "zod";
import {getDb,databaseConfigured} from "@/lib/server/db";
import {rateLimited,requesterKey,jsonError,guardSize} from "@/lib/server/security";
const schema=z.object({experiment:z.literal("homepage_cta_v1"),variant:z.enum(["A","B"]),event:z.enum(["impression","click"]),consent:z.literal(true)}).strict();
export async function POST(req:Request){
 if(guardSize(req,1200))return jsonError("Invalid payload",413);
 if(rateLimited(requesterKey(req,"experiment"),12,60_000))return jsonError("Rate limited",429);
 const origin=req.headers.get("origin");
 if(origin){try{const site=new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://sitesevolve.com");if(new URL(origin).origin!==site.origin)return jsonError("Cross-site event denied",403)}catch{return jsonError("Invalid origin",403)}}
 let data:z.infer<typeof schema>;try{data=schema.parse(await req.json())}catch{return jsonError("Invalid event",400)}
 if(!databaseConfigured())return jsonError("Metrics unavailable",503);
 try{
  await getDb().experimentMetric.create({data:{experiment:data.experiment,variant:data.variant,event:data.event}});
  return Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});
 }catch{return jsonError("Metrics unavailable",503)}
}
