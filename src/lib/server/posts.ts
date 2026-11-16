import "server-only";
import {databaseConfigured,getDb} from "./db";
import type {Locale,PublishedPost} from "@/lib/site";
export async function publishedPosts(locale:Locale):Promise<PublishedPost[]>{
 if(!databaseConfigured())return [];
 try{
  const rows=await getDb().blogPost.findMany({where:{locale,status:"PUBLISHED"},orderBy:{publishedAt:"desc"},take:100,select:{slug:true,locale:true,title:true,excerpt:true,body:true,category:true,publishedAt:true}});
  return rows.map(p=>({slug:p.slug,locale:p.locale as Locale,title:p.title,excerpt:p.excerpt,body:p.body,category:p.category,publishedAt:p.publishedAt?.toISOString()||null}));
 }catch{console.error("Published posts unavailable");return [];}
}
