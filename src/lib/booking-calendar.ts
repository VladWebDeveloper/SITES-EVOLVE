import {fromZonedTime,formatInTimeZone} from "date-fns-tz";

export const studioTimeZone="Europe/Chisinau";
export const consultationDurationMinutes=30;
const localDatePattern=/^\d{4}-\d{2}-\d{2}$/;

function localIso(date:Date){
 return formatInTimeZone(date,studioTimeZone,"yyyy-MM-dd HH:mm");
}
export function localDateToday(){
 return formatInTimeZone(new Date(),studioTimeZone,"yyyy-MM-dd");
}
export function daySlots(day:string,now=Date.now()){
 if(!localDatePattern.test(day))return [];
 const date=fromZonedTime(day+"T12:00:00",studioTimeZone);
 if(!Number.isFinite(date.getTime())||formatInTimeZone(date,studioTimeZone,"yyyy-MM-dd")!==day)return [];
 const min=now+2*60*60*1000,max=now+90*86400000;
 const items:{startAt:Date;label:string}[]=[];
 for(let hour=0;hour<24;hour++)for(const minute of [0,30]){
  const h=String(hour).padStart(2,"0")+":"+String(minute).padStart(2,"0");
  const startAt=fromZonedTime(day+"T"+h+":00",studioTimeZone);
  if(startAt.getTime()<min||startAt.getTime()>max)continue;
  if(localIso(startAt)!==day+" "+h)continue; // rejects DST-skipped local times
  items.push({startAt,label:h});
 }
 return items;
}
export function isValidConsultationTime(date:Date,now=Date.now()){
 if(!Number.isFinite(date.getTime())||date.getTime()<now+2*3600000||date.getTime()>now+90*86400000)return false;
 const local=localIso(date);
 const [day,time]=local.split(" ");
 return daySlots(day,now).some(x=>x.label===time&&x.startAt.getTime()===date.getTime());
}
export function studioDate(date:Date,locale:"ro"|"en"|"ru"="ro"){
 return new Intl.DateTimeFormat(locale==="ru"?"ru-RU":locale==="en"?"en-GB":"ro-RO",{
  timeZone:studioTimeZone,dateStyle:"full",timeStyle:"short"
 }).format(date);
}
