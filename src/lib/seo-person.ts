import {absoluteUrl,pathFor,type Locale} from "@/lib/site";

const name="Vlad Serbușco";
const personId=absoluteUrl("/#vlad-serbusco");
const orgId=absoluteUrl("/#organization");
const image=absoluteUrl("/vlad-serbusco-founder.webp");
const cityPhoto=absoluteUrl("/vlad-serbusco-city-fashion-week-cluj-romania.jpg");
const dubaiPhoto=absoluteUrl("/vlad-serbusco-emirates-fashion-week-dubai.jpg");
const about={
 en:"Vlad Serbușco is the founder of SITES EVOLVE, an independent web development studio in Chișinău, Moldova. A Business Administration student at ASEM and Vice President of its Student Senate, he combines entrepreneurship, digital technology, leadership and modeling.",
 ro:"Vlad Serbușco este fondatorul SITES EVOLVE, studio de dezvoltare web din Chișinău. Student la Business și Administrare la ASEM și vicepreședinte al Senatului Studențesc, îmbină antreprenoriatul, tehnologia, leadershipul și modelingul.",
 ru:"Влад Сербушко — основатель SITES EVOLVE, независимой веб-студии в Кишинёве. Он изучает бизнес и администрирование в ASEM и является вице-президентом Студенческого сената. Его интересы включают предпринимательство, технологии, лидерство и моделинг."
} as const;
const fashionTitle={en:"Vlad Serbușco — Fashion Model at ADI Academy",ro:"Vlad Serbușco — Fashion Model la ADI Academy",ru:"Влад Сербушко — Fashion Model в ADI Academy"} as const;

export function personSchema(locale:Locale){
 return {
  "@type":"Person","@id":personId,name,givenName:"Vlad",familyName:"Serbușco",alternateName:["Vlad Serbusco","Serbușco Vlad","Serbusco Vlad","Vlad Serbuşco","Serbuşco Vlad","Влад Сербушко","Сербушко Влад"],
  url:absoluteUrl(pathFor("en","founder")),
  image,description:about[locale],
  jobTitle:["Founder & CEO of SITES EVOLVE","Fashion Model at ADI Academy"],
  worksFor:[{"@id":orgId}],
  memberOf:[{"@type":"Organization",name:"ADI Academy"},{"@type":"Organization",name:"ASEM Student Senate"}],
  affiliation:{"@type":"CollegeOrUniversity",name:"Academia de Studii Economice din Moldova",url:"https://ase.md"},
  knowsAbout:["Web development","IT management","Business administration","Fashion modeling"],
  sameAs:["https://www.instagram.com/vlad_14.02/","https://www.linkedin.com/in/vlad-serbu%C8%99co-398429451/"]
 };
}
export function founderSchema(locale:Locale){
 const url=absoluteUrl(pathFor(locale,"founder"));
 return {"@context":"https://schema.org","@graph":[
  {"@type":"Organization","@id":orgId,name:"SITES EVOLVE",url:absoluteUrl("/"),founder:{"@id":personId},logo:absoluteUrl("/brand/social-avatar.png")},
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
export function journalAuthorSchema(locale:Locale, article:{slug:string;title:Record<Locale,string>;excerpt:Record<Locale,string>;date:string}){
 const url=absoluteUrl(pathFor(locale,"journal/"+article.slug));
 return {"@context":"https://schema.org","@type":"BlogPosting",
  "@id":url+"#article",url,mainEntityOfPage:{"@type":"WebPage","@id":url},
  headline:article.title[locale],description:article.excerpt[locale],
  datePublished:article.date,dateModified:article.date,inLanguage:locale,
  author:{"@type":"Person","@id":personId,name,url:absoluteUrl("/en/founder")},
  publisher:{"@type":"Organization","@id":orgId,name:"SITES EVOLVE"}
 };
}
export function safeJsonLd(value:unknown){return JSON.stringify(value).replace(/</g,"\\u003c");}
export const personalSeoCopy={about,fashionTitle};
