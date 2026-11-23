import type {MetadataRoute} from "next";
import {absoluteUrl,locales,journal,services,works} from "@/lib/site";
import {publishedPosts} from "@/lib/server/posts";
import {academyGuides} from "@/lib/academy";
import {internationalGuides} from "@/lib/international-guides";

export const dynamic="force-dynamic";
const originalDate=new Date("2026-11-16T00:00:00Z");
const founderImages=[
 absoluteUrl("/vlad-serbusco-founder.webp"),
 absoluteUrl("/vlad-serbusco-city-fashion-week-cluj-romania.jpg"),
 absoluteUrl("/vlad-serbusco-emirates-fashion-week-dubai.jpg")
];
const runwayImages=[
 absoluteUrl("/vlad-serbusco-founder.webp"),
 absoluteUrl("/vlad-serbusco-city-fashion-week-cluj-romania.jpg"),
 absoluteUrl("/vlad-serbusco-emirates-fashion-week-dubai.jpg")
];
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const paths=["","about","founder","fashion-model","services","work","process","journal","pricing","quote","consultation","contact","privacy","terms","builder","demo","academy","audit","status","privacy-center","referrals",
 ...academyGuides.map(g=>"academy/"+g.slug),
 ...services.en.map(s=>"services/"+s.id),
 ...works.en.map(w=>"work/"+w.id),
 ...journal.map(a=>"journal/"+a.slug)];
 const updatedPaths=new Set(["","about","founder","fashion-model","services","process","pricing","contact","work",...services.en.map(s=>"services/"+s.id),...works.en.map(w=>"work/"+w.id)]);
 const base=locales.flatMap(locale=>paths.map(path=>({
  url:absoluteUrl("/"+locale+(path?"/"+path:"")),
  lastModified:updatedPaths.has(path)?new Date("2026-11-23T08:00:00Z"):originalDate,
  changeFrequency:path.startsWith("journal")?"monthly" as const:"weekly" as const,
  priority:path===""?1:path==="founder"||path==="fashion-model"?0.9:path==="work"?0.8:0.7,
  ...(path==="founder"?{images:founderImages}:path==="fashion-model"?{images:runwayImages}:path===""?{images:[founderImages[0]]}:{})
 })));
 const journalPages=await Promise.all(locales.map(async locale=>(await publishedPosts(locale)).map(post=>({
  url:absoluteUrl("/"+locale+"/journal/"+post.slug),
  lastModified:post.publishedAt?new Date(post.publishedAt):originalDate,
  changeFrequency:"monthly" as const,priority:0.6
 }))));
 const internationalPages=["us","uk"].map(market=>({
  url:absoluteUrl("/en/markets/"+market),
  lastModified:new Date("2026-11-23T08:00:00Z"),
  changeFrequency:"monthly" as const,
  priority:0.8
 }));
 const guidePages=internationalGuides.map(guide=>({
  url:absoluteUrl("/en/insights/"+guide.slug),
  lastModified:new Date(guide.updated+"T08:00:00Z"),
  changeFrequency:"monthly" as const,
  priority:0.7
 }));
 return [...base,...internationalPages,...guidePages,...journalPages.flat()];
}
