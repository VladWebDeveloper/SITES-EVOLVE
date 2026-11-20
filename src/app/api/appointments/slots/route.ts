import {getDb,databaseConfigured} from "@/lib/server/db";
import {daySlots,studioTimeZone} from "@/lib/booking-calendar";
import {jsonError,rateLimited,requesterKey} from "@/lib/server/security";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(request:Request){
 if(rateLimited(requesterKey(request,"consultation-slots"),45,60_000))return jsonError("Too many requests",429);
 const day=new URL(request.url).searchParams.get("date");
 if(!day||!/^\d{4}-\d{2}-\d{2}$/.test(day))return jsonError("A valid local date is required",400);
 if(!databaseConfigured())return jsonError("Booking calendar is not ready",503);
 const times=daySlots(day);
 if(!times.length)return Response.json({date:day,timezone:studioTimeZone,durationMinutes:30,slots:[]},{headers:{"Cache-Control":"no-store"}});
 const start=times[0].startAt,end=new Date(times[times.length-1].startAt.getTime()+30*60_000);
 const db=getDb();
 const [booked,blocked]=await Promise.all([
  db.consultationSlot.findMany({where:{startAt:{gte:start,lt:end}},select:{startAt:true}}),
  db.consultationBlock.findMany({where:{startsAt:{lt:end},endsAt:{gt:start}},select:{startsAt:true,endsAt:true}})
 ]);
 const reserved=new Set(booked.map(x=>x.startAt.getTime()));
 const slots=times.filter(x=>!reserved.has(x.startAt.getTime())&&!blocked.some(b=>x.startAt>=b.startsAt&&x.startAt<b.endsAt))
 .map(x=>({value:x.startAt.toISOString(),label:x.label}));
 return Response.json({date:day,timezone:studioTimeZone,durationMinutes:30,slots},{headers:{"Cache-Control":"no-store"}});
}
