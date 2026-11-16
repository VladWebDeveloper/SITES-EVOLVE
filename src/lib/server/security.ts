import "server-only";
import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
const buckets=new Map<string,{count:number;expires:number}>();
export function rateLimited(key:string,limit=10,windowMs=60000):boolean {
 const now=Date.now();if(buckets.size>5000){for(const [k,v] of buckets)if(v.expires<now)buckets.delete(k);}
 const record=buckets.get(key);
 if(!record||record.expires<now){buckets.set(key,{count:1,expires:now+windowMs});return false;}
 record.count+=1;return record.count>limit;
}
// Instance-local fallback; configure a distributed WAF/rate limiter before high-volume deployment.
export function requesterKey(req:Request,prefix="public"){
 const ip=req.headers.get("x-real-ip")||req.headers.get("cf-connecting-ip")||"unknown";
 return prefix+":"+createHash("sha256").update(ip).digest("hex").slice(0,24);
}
export function guardSize(req:Request,max=12000){const length=Number(req.headers.get("content-length")||0);return Number.isFinite(length)&&length>max;}
export function jsonError(error:string,status=400){return NextResponse.json({error},{status,headers:{"Cache-Control":"no-store"}});}
export function constantTimeEqual(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
export function allowedExternalHttps(value:string){
 try{const u=new URL(value);return u.protocol==="https:"&&!u.username&&!u.password&&!u.port&&u.hostname.length>3&&!u.hostname.endsWith(".local")&&!u.hostname.endsWith(".internal")&&!/^\d+\.\d+\.\d+\.\d+$/.test(u.hostname);}catch{return false;}
}
