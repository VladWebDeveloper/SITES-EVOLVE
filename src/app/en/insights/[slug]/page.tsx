import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Shell from "@/components/shell";
import InternationalGuidePage from "@/components/public/international-guide-page";
import {internationalGuides,findInternationalGuide} from "@/lib/international-guides";
import {absoluteUrl} from "@/lib/site";

type Params={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return internationalGuides.map(({slug})=>({slug}));}

export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {slug}=await params,guide=findInternationalGuide(slug);
 if(!guide)return {robots:{index:false}};
 const url=absoluteUrl("/en/insights/"+guide.slug);
 return {
  title:{absolute:guide.heading+" | SITES EVOLVE"},
  description:guide.description,
  alternates:{canonical:url},
  openGraph:{type:"article",siteName:"SITES EVOLVE",title:guide.heading,description:guide.description,url,locale:"en_US",publishedTime:guide.updated+"T08:00:00Z",images:[{url:"/opengraph-image.png",width:1200,height:630}]},
  twitter:{card:"summary_large_image",title:guide.heading,description:guide.description,images:["/twitter-image.png"]}
 };
}

export default async function InternationalGuide({params}:Params){
 const {slug}=await params,guide=findInternationalGuide(slug);
 if(!guide)notFound();
 const url=absoluteUrl("/en/insights/"+guide.slug);
 const structured={
  "@context":"https://schema.org",
  "@type":"Article",
  "@id":url+"#article",
  mainEntityOfPage:{"@type":"WebPage","@id":url},
  headline:guide.heading,
  description:guide.description,
  datePublished:guide.updated,
  dateModified:guide.updated,
  inLanguage:"en",
  author:{"@type":"Organization",name:"SITES EVOLVE",url:absoluteUrl("/")},
  publisher:{"@type":"Organization","@id":absoluteUrl("/#organization"),name:"SITES EVOLVE",url:absoluteUrl("/")}
 };
 return <Shell locale="en"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}}/><InternationalGuidePage guide={guide}/></Shell>;
}
