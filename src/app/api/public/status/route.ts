import {getDb,databaseConfigured} from "@/lib/server/db";
import {jsonError} from "@/lib/server/security";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
 if(!databaseConfigured())return jsonError("Status history not available",503);
 try{
  const db=getDb();
  const [checks,events,openIncidents]=await Promise.all([
   db.platformHeartbeat.findMany({where:{checkedAt:{gte:new Date(Date.now()-7*86400000)}},
    orderBy:{checkedAt:"desc"},take:700,select:{ok:true,statusCode:true,responseMs:true,checkedAt:true}}),
   db.publicStatusEvent.findMany({where:{published:true},orderBy:{occurredAt:"desc"},take:35,
    select:{id:true,kind:true,state:true,title:true,details:true,occurredAt:true,resolvedAt:true}}),
   db.publicStatusEvent.count({where:{published:true,kind:"INCIDENT",state:"OPEN"}})
  ]);
  const recent=checks[0],observed=checks.filter(c=>c.checkedAt.getTime()>=Date.now()-24*3600000);
  const healthy=observed.filter(x=>x.ok).length;
  return Response.json({
   status:openIncidents>0?"degraded":recent&&!recent.ok?"degraded":"operational",
   openIncidents,
   lastCheckedAt:recent?.checkedAt||null,
   mostRecentResponseMs:recent?.responseMs??null,
   observation:{periodHours:24,successfulChecks:healthy,totalChecks:observed.length,
    note:"Only actual samples are counted; unmonitored time is not treated as uptime."},
   recentSamples:checks.slice(0,28),
   events
  },{headers:{"Cache-Control":"public, max-age=0, s-maxage=30, stale-while-revalidate=15"}});
 }catch(error){console.warn("Platform history unavailable",error instanceof Error?error.message:"unknown");return jsonError("Status history unavailable",503)}
}
