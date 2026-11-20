import {lookup} from "node:dns/promises";
import {isIP} from "node:net";
import {request as httpsRequest} from "node:https";
import type {IncomingHttpHeaders} from "node:http";
import {rateLimited,requesterKey,jsonError} from "@/lib/server/security";

export const runtime="nodejs";
const LIMIT=350_000;
const cache=new Map<string,{expires:number;data:unknown}>();

/** Deny non-public and documentation ranges before opening a TCP socket. */
export function publicAddress(address:string):boolean{
 const family=isIP(address);
 if(family===4){
  const [a,b,c,d]=address.split(".").map(Number);
  if(![a,b,c,d].every(v=>v>=0&&v<=255))return false;
  if(a===0||a===10||a===127||a>=224||a===169&&b===254||a===172&&b>=16&&b<=31||
   a===192&&b===168||a===100&&b>=64&&b<=127||a===192&&b===0||
   a===192&&b===0&&c===2||a===198&&b>=18&&b<=19||
   a===198&&b===51&&c===100||a===203&&b===0&&c===113||
   a===255||a===192&&b===88&&c===99)return false;
  return true;
 }
 if(family===6){
  const low=address.toLowerCase();
  if(low.includes(".")||low.startsWith("::ffff:"))return false; // embedded IPv4
  if(low==="::"||low==="::1"||low.startsWith("fc")||low.startsWith("fd")||
   low.startsWith("fe80")||low.startsWith("2001:db8")||low.startsWith("2001:10"))return false;
  return /^[23][0-9a-f]{0,3}:/i.test(low); // global IPv6 unicast range 2000::/3
 }
 return false;
}
function attributes(tag:string):Record<string,string>{
 const attrs:Record<string,string>={};
 for(const match of tag.matchAll(/([a-z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi))attrs[match[1].toLowerCase()]=match[2]??match[3]??match[4]??"";
 return attrs;
}
function clean(text:string){return text.replace(/<[^>]*>/g," ").replace(/&(?:nbsp|amp|quot|lt|gt);/gi,m=>({"&nbsp;":" ","&amp;":"&","&quot;":'"',"&lt;":"<","&gt;":">"}[m.toLowerCase()]||m)).replace(/\s+/g," ").trim().slice(0,450);}
function extract(html:string,url:URL,status:number,elapsedMs:number){
 const title=clean(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||"");
 const h1=clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||"");
 const tags=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>attributes(m[0]));
 const description=clean(tags.find(a=>a.name?.toLowerCase()==="description")?.content||"");
 const robots=(tags.filter(a=>["robots","googlebot"].includes(a.name?.toLowerCase()||"")).map(a=>a.content).join(" ")).toLowerCase();
 const canonicals=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>attributes(m[0])).filter(a=>a.rel?.toLowerCase().split(/\s+/).includes("canonical"));
 const canonical=canonicals[0]?.href||"";
 const cleaned=html.replace(/<script\b[\s\S]*?<\/script>/gi," ").replace(/<style\b[\s\S]*?<\/style>/gi," ").replace(/<!--[\s\S]*?-->/g," ");
 const visibleText=cleaned.replace(/<[^>]*>/g," ").replace(/&(?:nbsp|amp|quot|lt|gt);/gi," ").replace(/\s+/g," ").trim();
 const wordCount=Math.min(50000,visibleText.split(/\s+/).filter(Boolean).length);
 const links=[...html.matchAll(/<a\b[^>]*>/gi)].map(m=>attributes(m[0]).href).filter(Boolean);
 const internalLinks=links.filter(x=>{try{const link=new URL(x,url);return link.hostname===url.hostname && ["https:","http:"].includes(link.protocol)}catch{return false}}).length;
 const normalized=(value:string)=>{try{const u=new URL(value,url);return u.origin+u.pathname.replace(/\/$/,"") }catch{return ""}};
 const expected=normalized(url.toString());
 const checks=[
  {label:"HTTP 200",pass:status===200,detail:"Server response: "+status},
  {label:"HTTPS",pass:url.protocol==="https:",detail:"The connection uses HTTPS."},
  {label:"Page title",pass:title.length>=15&&title.length<=75,detail:title||"Missing title"},
  {label:"Meta description",pass:description.length>=50&&description.length<=175,detail:description||"Missing meta description"},
  {label:"Primary H1 heading",pass:h1.length>2,detail:h1||"No H1 heading found"},
  {label:"Canonical URL",pass:canonical.length>0&&normalized(canonical)===expected&&canonicals.length===1,detail:canonical||"No canonical URL found"},
  {label:"Search engine indexing",pass:!robots.includes("noindex"),detail:robots||"No meta robots restriction detected"},
  {label:"Internal navigation",pass:internalLinks>=2,detail:internalLinks+" links to the same website"},
 ];
 return {url:url.toString(),status,elapsedMs,title,description,h1,canonical,wordCount,internalLinks,checks,score:Math.round(checks.filter(c=>c.pass).length/checks.length*100)};
}
function readHTML(url:URL,address:string,family:number):Promise<{status:number;body:string;headers:IncomingHttpHeaders}>{
 return new Promise((resolve,reject)=>{
  const request=httpsRequest(url,{method:"GET",headers:{"Accept":"text/html,application/xhtml+xml","User-Agent":"SitesEvolve-Audit/1.0 (+https://sitesevolve.com/ro/audit)"},timeout:7500,
   family,
   lookup:(_hostname,options,callback)=>{
    if(options.all){
     (callback as unknown as (error:Error|null,addresses:{address:string;family:number}[])=>void)(null,[{address,family}]);
    }else callback(null,address,family);
   }},response=>{
   const status=response.statusCode||0;
   if(status>=300&&status<400){response.resume();reject(Error("Redirects require an explicit new audit URL"));return;}
   if(!String(response.headers["content-type"]||"").toLowerCase().includes("text/html")){response.resume();reject(Error("Not an HTML page"));return;}
   const contentLength=Number(response.headers["content-length"]||0);
   if(contentLength>LIMIT){response.destroy();reject(Error("Page too large"));return;}
   let size=0;const parts:Buffer[]=[];
   response.on("data",(chunk:Buffer)=>{size+=chunk.length;if(size>LIMIT){request.destroy(Error("Page too large"));return;}parts.push(chunk)});
   response.on("end",()=>resolve({status,body:Buffer.concat(parts).toString("utf8"),headers:response.headers}));
   response.on("error",reject);
  });
  request.on("timeout",()=>request.destroy(Error("Timeout")));
  request.on("error",reject);
  request.end();
 });
}
export async function GET(req:Request){
 const input=new URL(req.url).searchParams.get("url")||"";
 if(!input||input.length>300)return jsonError("Enter a valid public HTTPS URL",400);
 let url:URL;try{url=new URL(input)}catch{return jsonError("Invalid URL",400)}
 if(url.protocol!=="https:"||url.port||url.username||url.password||url.hash||
   url.hostname.length<4||url.hostname.endsWith(".local")||url.hostname.endsWith(".internal")||
   url.hostname==="localhost"||isIP(url.hostname)!==0||!url.hostname.includes("."))
  return jsonError("Only public HTTPS domain names are supported",400);
 if(rateLimited(requesterKey(req,"web-audit"),3,60_000))return jsonError("Too many audits. Try again later.",429);
 const hit=cache.get(url.href);if(hit&&hit.expires>Date.now())return Response.json(hit.data,{headers:{"Cache-Control":"no-store"}});
 try{
  const records=await lookup(url.hostname,{all:true});
  if(!records.length||records.some(x=>!publicAddress(x.address)))return jsonError("URL does not resolve to a public server",400);
  const chosen=records.find(x=>x.family===4)||records[0];
  const start=Date.now();const response=await readHTML(url,chosen.address,chosen.family);
  const result=extract(response.body,url,response.status,Date.now()-start);
  if(cache.size>200){for(const [k,v] of cache)if(v.expires<Date.now())cache.delete(k);if(cache.size>200)cache.clear()}
  cache.set(url.href,{data:result,expires:Date.now()+20*60_000});
  return Response.json(result,{headers:{"Cache-Control":"no-store"}});
 }catch(error){console.warn("Public website audit failed",error instanceof Error?error.message:"Error");return jsonError("Could not analyze this public URL",422)}
}
