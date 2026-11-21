import {absoluteUrl,pathFor,type Locale} from "@/lib/site";

const name="Vlad Serbușco";
const personId=absoluteUrl("/#vlad-serbusco");
const orgId=absoluteUrl("/#organization");
const image=absoluteUrl("/vlad-serbusco-founder.webp");
const cityPhoto=absoluteUrl("/vlad-serbusco-city-fashion-week-cluj-romania.jpg");
const dubaiPhoto=absoluteUrl("/vlad-serbusco-emirates-fashion-week-dubai.jpg");
const about={
 en:"Vlad Serbușco is the Founder & CEO of SITES EVOLVE and a fashion model at ADI Academy. Combining entrepreneurship, digital innovation and fashion, he has appeared on runways in Cluj, Romania and Dubai, UAE.",
 ro:"Vlad Serbușco este fondatorul și CEO-ul SITES EVOLVE și fashion model la ADI Academy. Activează în antreprenoriat, inovație digitală și modeling, cu apariții pe podium în Cluj și Dubai.",
 ru:"Влад Сербушко — основатель и CEO SITES EVOLVE, а также fashion model в ADI Academy. Его деятельность объединяет предпринимательство, цифровые технологии и моделинг, включая показы в Клуже и Дубае."
} as const;
const fashionTitle={en:"Vlad Serbușco — Fashion Model at ADI Academy",ro:"Vlad Serbușco — Fashion Model la ADI Academy",ru:"Влад Сербушко — Fashion Model в ADI Academy"} as const;

export function personSchema(locale:Locale){
 return {
  "@type":"Person","@id":personId,name,alternateName:["Vlad Serbusco","Влад Сербушко"],
  url:absoluteUrl(pathFor("en","founder")),
  image,description:about[locale],
  jobTitle:["Founder & CEO of SITES EVOLVE","Fashion Model at ADI Academy"],
  worksFor:[{"@id":orgId}],
  memberOf:{"@type":"Organization",name:"ADI Academy"},
  knowsAbout:["Web development","IT management","Business administration","Fashion modeling"],
  sameAs:["https://www.instagram.com/vlad_14.02/"]
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
   primaryImageOfPage:{"@type":"ImageObject",url:image,contentUrl:image,caption:"Vlad Serbușco — Founder & CEO of SITES EVOLVE, Fashion Model at ADI Academy"},image:[image,cityPhoto,dubaiPhoto],hasPart:photos}
 ]};
}
export function safeJsonLd(value:unknown){return JSON.stringify(value).replace(/</g,"\\u003c");}
export const personalSeoCopy={about,fashionTitle};
