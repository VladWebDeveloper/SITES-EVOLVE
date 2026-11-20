import {createHmac,timingSafeEqual} from "node:crypto";
const secret=()=>process.env.AUTH_SECRET||"";
export function calendarToken(id:string){
 if(secret().length<20)return null;
 return createHmac("sha256",secret()).update("consultation-ics-v1:"+id).digest("hex");
}
export function validCalendarToken(id:string,received:string|null){
 const expected=calendarToken(id);
 if(!expected||!received||!/^[a-f0-9]{64}$/.test(received))return false;
 return timingSafeEqual(Buffer.from(received,"hex"),Buffer.from(expected,"hex"));
}
