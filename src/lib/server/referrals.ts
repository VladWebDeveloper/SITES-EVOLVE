import "server-only";
import {createHmac,timingSafeEqual} from "node:crypto";
function signature(clientId:string){
 const secret=process.env.AUTH_SECRET||"";
 if(secret.length<20)return null;
 return createHmac("sha256",secret).update("sites-evolve-referral-v1:"+clientId).digest("hex").slice(0,24);
}
/** Signed client attribution only: never grants account or portal access. */
export function createReferralCode(clientId:string){
 if(!/^[a-z0-9]{15,50}$/.test(clientId))return null;
 const sig=signature(clientId);
 return sig?clientId+"."+sig:null;
}
export function parseReferralCode(raw:string|null|undefined):string|null{
 if(!raw||raw.length>90)return null;
 const m=raw.match(/^([a-z0-9]{15,50})\.([a-f0-9]{24})$/);
 if(!m)return null;
 const expected=signature(m[1]);
 if(!expected)return null;
 const a=Buffer.from(m[2],"hex"),b=Buffer.from(expected,"hex");
 return a.length===b.length&&timingSafeEqual(a,b)?m[1]:null;
}
