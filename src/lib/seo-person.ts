import {absoluteUrl,pathFor,type Locale} from "@/lib/site";

const name="Vlad Serbușco";
const personId=absoluteUrl("/#vlad-serbusco");
const orgId=absoluteUrl("/#organization");
const image=absoluteUrl("/vlad-serbusco-founder.webp");
const cityPhoto=absoluteUrl("/vlad-serbusco-city-fashion-week-cluj-romania.jpg");
const dubaiPhoto=absoluteUrl("/vlad-serbusco-emirates-fashion-week-dubai.jpg");
const about={
 en:"Vlad Serbușco is Founder & CEO of SITES EVOLVE, IT Manager at AlviTravel, and an international fashion model at ADI Academy. His runway appearances include City Fashion Week in Cluj, Romania and Emirates Fashion Week in Dubai, UAE.",
 ro:"Vlad Serbușco este fondator și CEO al SITES EVOLVE, IT Manager la AlviTravel și model internațional la ADI Academy, cu apariții la City Fashion Week în Cluj și Emirates Fashion Week în Dubai.",
 ru:"Влад Сербушко — основатель и CEO SITES EVOLVE, IT-менеджер AlviTravel и международный fashion model в ADI Academy. Участвовал в City Fashion Week в Клуже и Emirates Fashion Week в Дубае."
} as const;
const fashionTitle={en:"Vlad Serbușco — International Fashion Model | Cluj & Dubai",ro:"Vlad Serbușco — Model internațional | Cluj și Dubai",ru:"Влад Сербушко — Международная модель | Клуж и Дубай"} as const;

export function personSchema(locale:Locale){
 return {
  "@type":"Person","@id":personId,name,alternateName:["Vlad Serbusco","Влад Сербушко"],
  url:absoluteUrl(pathFor("en","founder")),
  image,description:about[locale],
  jobTitle:["Founder & CEO of SITES EVOLVE","IT Manager at AlviTravel","International Fashion Model"],
  worksFor:[{"@id":orgId},{"@type":"Organization",name:"AlviTravel",url:"https://alvitravel.md"}],
  memberOf:{"@type":"Organization",name:"ADI Academy"},
  knowsAbout:["Web development","IT management","Business administration","Fashion modeling"],
  sameAs:["https://www.instagram.com/vlad_1402/"]
 };
}
export function founderSchema(locale:Locale){
 const url=absoluteUrl(pathFor(locale,"founder"));
 return {"@context":"https://schema.org","@graph":[
  {"@type":"Organization","@id":orgId,name:"SITES EVOLVE",url:absoluteUrl("/"),founder:{"@id":personId},logo:absoluteUrl("/brand/logo-header.png")},
  personSchema(locale),
  {"@type":"ProfilePage","@id":url+"#profile",url,name:name+" — Founder & CEO of SITES EVOLVE",
   inLanguage:locale,description:about[locale],mainEntity:{"@id":personId},primaryImageOfPage:{"@type":"ImageObject",url:image,contentUrl:image,caption:"Vlad Serbușco — Founder & CEO of SITES EVOLVE"}}
 ]};
}
export function fashionSchema(locale:Locale){
 const url=absoluteUrl(pathFor(locale,"fashion-model"));
 const photos=[
  {"@type":"ImageObject","@id":url+"#cluj-photo",contentUrl:cityPhoto,url:cityPhoto,name:"Vlad Serbușco — City Fashion Week Cluj, Romania",caption:"Vlad Serbușco on the runway at City Fashion Week in Cluj, Romania",about:{"@id":personId}},
  {"@type":"ImageObject","@id":url+"#dubai-photo",contentUrl:dubaiPhoto,url:dubaiPhoto,name:"Vlad Serbușco — Emirates Fashion Week Dubai",caption:"Vlad Serbușco on the runway at Emirates Fashion Week in Dubai, UAE",about:{"@id":personId}}
 ];
 return {"@context":"https://schema.org","@graph":[
  personSchema(locale),
  {"@type":"CollectionPage","@id":url+"#fashion",url,name:fashionTitle[locale],inLanguage:locale,
   description:about[locale],about:{"@id":personId},
   primaryImageOfPage:{"@id":url+"#cluj-photo"},image:[cityPhoto,dubaiPhoto],hasPart:photos}
 ]};
}
export function safeJsonLd(value:unknown){return JSON.stringify(value).replace(/</g,"\\u003c");}
export const personalSeoCopy={about,fashionTitle};
