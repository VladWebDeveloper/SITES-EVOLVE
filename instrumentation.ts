/** Railway Node process scheduler, with PostgreSQL-backed job leases. */
export async function register(){
 if(process.env.NEXT_RUNTIME!=="nodejs")return;
 if(!process.env.RAILWAY_SERVICE_ID||!process.env.CRON_SECRET)return;
 try{
  const {startPlatformScheduler}=await import("@/lib/server/scheduler");
  startPlatformScheduler();
 }catch(error){console.warn("SITES EVOLVE scheduler unavailable",error instanceof Error?error.message:"unknown")}
}
