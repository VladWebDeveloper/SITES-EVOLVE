import {notFound} from "next/navigation";
import type {Metadata} from "next";
import Shell from "@/components/shell";
import InternationalMarketPage from "@/components/public/international-market-page";
import {internationalMarkets,type InternationalMarket} from "@/lib/international-markets";
import {absoluteUrl} from "@/lib/site";

type Params={params:Promise<{market:string}>};
const valid=(market:string):market is InternationalMarket=>market==="us"||market==="uk";
export const dynamicParams=false;
export function generateStaticParams(){return [{market:"us"},{market:"uk"}];}
const variants={
 en: absoluteUrl("/en/services/web-development"),
 ro: absoluteUrl("/ro/services/web-development"),
 ru: absoluteUrl("/ru/services/web-development"),
 "en-US":absoluteUrl("/en/markets/us"),
 "en-GB":absoluteUrl("/en/markets/uk"),
 "x-default":absoluteUrl("/en/services/web-development")
};

export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {market}=await params;
 if(!valid(market))return {robots:{index:false}};
 const m=internationalMarkets[market],url=absoluteUrl("/en/markets/"+market);
 return {
  title:{absolute:m.title+" | SITES EVOLVE"},
  description:m.description,
  alternates:{canonical:url,languages:variants},
  openGraph:{type:"website",siteName:"SITES EVOLVE",title:m.title,description:m.description,url,locale:market==="us"?"en_US":"en_GB",images:[{url:"/opengraph-image.png",width:1200,height:630,alt:"SITES EVOLVE — Web Development Studio"}]},
  twitter:{card:"summary_large_image",title:m.title,description:m.description,images:["/twitter-image.png"]},
  robots:{index:true,follow:true}
 };
}
export default async function MarketPage({params}:Params){
 const {market}=await params;if(!valid(market))notFound();
 const m=internationalMarkets[market];
 const url=absoluteUrl("/en/markets/"+market);
 const graph={
  "@context":"https://schema.org",
  "@type":"Service",
  "@id":url+"#service",
  name:m.title,
  description:m.description,
  url,
  serviceType:"Website design and development",
  areaServed:{"@type":"Country",name:m.region},
  availableChannel:{"@type":"ServiceChannel",serviceUrl:url},
  provider:{"@type":"ProfessionalService","@id":absoluteUrl("/#organization"),name:"SITES EVOLVE",url:absoluteUrl("/"),address:{"@type":"PostalAddress",addressLocality:"Chișinău",addressCountry:"MD"}}
 };
 return <Shell locale="en"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,"\\u003c")}}/><InternationalMarketPage market={market}/></Shell>;
}
