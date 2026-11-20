import {lookup} from "node:dns/promises";
import {isIP} from "node:net";
import {getDb,databaseConfigured} from "@/lib/server/db";
import {constantTimeEqual,jsonError,allowedExternalHttps} from "@/lib/server/security";
function publiclyRoutable(ip:string){
 if(isIP(ip)===4){
  const n=ip.split(".").map(Number);
  if(n[0]===0||n[0]===10||n[0]===127||n[0]>=224||n[0]===169&&n[1]===254||n[0]===172&&n[1]>=16&&n[1]<=31||n[0]===192&&n[1]===168||n[0]===100&&n[1]>=64&&n[1]<=127||n[0]===192&&n[1]===0||n[0]===198&&n[1]>=18&&n[1]<=19)return false;
  return true;
 }
 if(isIP(ip)===6)return !/^(::|::1|fc|fd|fe80|2001:db8)/i.test(ip);
 return false;
}
export const runtime="nodejs";
export async function GET(request:Request){
 const secret=process.env.CRON_SECRET;
 if(!secret||!databaseConfigured())return jsonError("Monitoring not configured",503);
 const auth=request.headers.get("authorization")||"";
 if(!constantTimeEqual(auth,"Bearer "+secret))return jsonError("Forbidden",403);
 const allowed=new Set((process.env.MONITOR_ALLOWED_HOSTS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean));
 if(allowed.size===0)return jsonError("Monitoring allowlist required",503);
 const sites=await getDb().managedSite.findMany({take:20,orderBy:{lastCheckedAt:"asc"}});
 const results=[];
 for(const site of sites){
  let status="ERROR",statusCode:number|null=null;
  try{
   if(!allowedExternalHttps(site.url))throw Error("Invalid HTTPS address");
   const url=new URL(site.url);
   if(!allowed.has(url.hostname.toLowerCase()))throw Error("Hostname not on monitoring allowlist");
   const resolved=await lookup(url.hostname,{all:true});
   if(resolved.length===0||resolved.some(record=>!publiclyRoutable(record.address)))throw Error("Unsafe destination");
   const response=await fetch(site.url,{method:"HEAD",redirect:"manual",cache:"no-store",signal:AbortSignal.timeout(5000)});
   statusCode=response.status;status=response.status>=200&&response.status<400?"UP":"DOWN";
  }catch{status="ERROR";}
  await getDb().managedSite.update({where:{id:site.id},data:{status,lastCheckedAt:new Date(),lastStatus:statusCode}});
  await getDb().siteMetric.create({data:{siteId:site.id,name:"http_status",value:statusCode||0}});
  await getDb().siteMetric.deleteMany({where:{siteId:site.id,name:"http_status",createdAt:{lt:new Date(Date.now()-90*86400000)}}});
  results.push({site:site.id,status,code:statusCode});
 }
 return Response.json({checked:results.length,results},{headers:{"Cache-Control":"no-store"}});
}
