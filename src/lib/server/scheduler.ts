import "server-only";
import {databaseConfigured,getDb} from "@/lib/server/db";

const serverOnly=()=>process.env.NODE_ENV==="production"&&Boolean(process.env.RAILWAY_SERVICE_ID)&&Boolean(process.env.CRON_SECRET);

async function claim(name:string,intervalMs:number){
 const db=getDb(),now=new Date();
 try{await db.scheduleState.create({data:{key:name,nextRunAt:new Date(0)}})}catch(error){
  if(!(typeof error==="object"&&error!==null&&"code" in error&&error.code==="P2002"))throw error;
 }
 const result=await db.scheduleState.updateMany({where:{key:name,nextRunAt:{lte:now}},
  data:{nextRunAt:new Date(now.getTime()+intervalMs)}});
 return result.count===1;
}
async function recordHeartbeat(){
 const started=Date.now();
 let ok=false,statusCode=0;
 try{
  const port=process.env.PORT||"3000";
  const response=await fetch("http://127.0.0.1:"+port+"/api/health",{cache:"no-store",signal:AbortSignal.timeout(8000)});
  ok=response.ok;statusCode=response.status;
 }catch{statusCode=0}
 const db=getDb();
 await db.platformHeartbeat.create({data:{ok,statusCode,responseMs:Date.now()-started}});
 // Retain a small rolling sample; published incidents and release history are kept separately.
 await db.platformHeartbeat.deleteMany({where:{checkedAt:{lt:new Date(Date.now()-30*86400000)}}});
}
async function runProtectedJob(path:string){
 const secret=process.env.CRON_SECRET;
 if(!secret)return;
 const response=await fetch("http://127.0.0.1:"+(process.env.PORT||"3000")+path,{
  headers:{authorization:"Bearer "+secret},signal:AbortSignal.timeout(27_000),cache:"no-store"});
 if(!response.ok)throw Error(path+" returned HTTP "+response.status);
}
async function runJobs(){
 if(!serverOnly()||!databaseConfigured())return;
 const work=[
  {key:"platform-heartbeat",interval:15*60_000,run:recordHeartbeat},
  {key:"managed-sites",interval:45*60_000,run:()=>runProtectedJob("/api/cron/monitor")},
  {key:"crm-reminders",interval:3*60*60_000,run:()=>runProtectedJob("/api/cron/operations")}
 ];
 for(const job of work){
  try{
   if(await claim(job.key,job.interval))await job.run();
  }catch(error){console.warn("Background job",job.key,error instanceof Error?error.message:"failed")}
 }
}
export function startPlatformScheduler(){
 if(!serverOnly())return;
 const state=globalThis as typeof globalThis & {__sitesEvolveJobs?:NodeJS.Timeout};
 if(state.__sitesEvolveJobs)return;
 // Trigger once after startup, then check leases periodically. Only one replica
 // may claim each task's interval in PostgreSQL.
 const bootstrap=setTimeout(()=>void runJobs(),12_000);
 bootstrap.unref();
 const timer=setInterval(()=>void runJobs(),5*60_000);
 timer.unref();
 state.__sitesEvolveJobs=timer;
}
