import Link from "next/link";
import {ArrowLeft,ArrowUpRight,Camera,MapPin,Globe2} from "lucide-react";
import {pathFor,type Locale} from "@/lib/site";

const text={
 en:{
  eyebrow:"VLAD SERBUȘCO / FASHION PORTFOLIO",
  first:"International fashion model.",second:"From Cluj to Dubai.",
  intro:"Vlad Serbușco is a fashion model at ADI Academy with runway appearances at City Fashion Week in Cluj, Romania and Emirates Fashion Week in Dubai, United Arab Emirates.",
  gallery:"RUNWAY APPEARANCES",galleryTitle:"Two cities. Two runways.",
  galleryIntro:"Real moments from international fashion events.",
  cityLocation:"Cluj, Romania",dubaiLocation:"Dubai, United Arab Emirates",
  cityAlt:"Vlad Serbușco modeling at City Fashion Week in Cluj, Romania, wearing a tan blazer",
  dubaiAlt:"Vlad Serbușco walking the runway at Emirates Fashion Week in Dubai, United Arab Emirates",
  cityDesc:"City Fashion Week runway appearance in Cluj, Romania.",
  dubaiDesc:"Emirates Fashion Week runway appearance in Dubai, United Arab Emirates.",
  back:"Back to the founder",endTitle:"Fashion meets entrepreneurship.",
  endText:"Vlad Serbușco is the Founder & CEO of SITES EVOLVE and a fashion model at ADI Academy, bringing together entrepreneurship, technology and creative expression.",
  founder:"Discover the founder",social:"Personal Instagram"
 },
 ro:{
  eyebrow:"VLAD SERBUȘCO / PORTOFOLIU FASHION",
  first:"Model internațional.",second:"De la Cluj la Dubai.",
  intro:"Vlad Serbușco este fashion model la ADI Academy, cu apariții pe podium la City Fashion Week în Cluj, România și Emirates Fashion Week în Dubai, Emiratele Arabe Unite.",
  gallery:"APARIȚII PE PODIUM",galleryTitle:"Două orașe. Două podiumuri.",
  galleryIntro:"Momente reale de la evenimente internaționale de modă.",
  cityLocation:"Cluj, România",dubaiLocation:"Dubai, Emiratele Arabe Unite",
  cityAlt:"Vlad Serbușco pe podium la City Fashion Week în Cluj, România, într-un sacou bej",
  dubaiAlt:"Vlad Serbușco defilând la Emirates Fashion Week în Dubai, Emiratele Arabe Unite",
  cityDesc:"Apariție pe podium la City Fashion Week din Cluj, România.",
  dubaiDesc:"Apariție pe podium la Emirates Fashion Week din Dubai, Emiratele Arabe Unite.",
  back:"Înapoi la fondator",endTitle:"Fashion și antreprenoriat.",
  endText:"Vlad Serbușco este fondatorul și CEO-ul SITES EVOLVE și fashion model la ADI Academy, îmbinând antreprenoriatul, tehnologia și creativitatea.",
  founder:"Descoperă fondatorul",social:"Instagram personal"
 },
 ru:{
  eyebrow:"ВЛАД СЕРБУШКО / FASHION ПОРТФОЛИО",
  first:"Международный fashion model.",second:"От Клужа до Дубая.",
  intro:"Влад Сербушко — fashion model в ADI Academy. Участвовал в City Fashion Week в Клуже, Румыния, и Emirates Fashion Week в Дубае, ОАЭ.",
  gallery:"ПОКАЗЫ",galleryTitle:"Два города. Два подиума.",
  galleryIntro:"Настоящие моменты с международных показов мод.",
  cityLocation:"Клуж, Румыния",dubaiLocation:"Дубай, Объединённые Арабские Эмираты",
  cityAlt:"Влад Сербушко на показе City Fashion Week в Клуже, Румыния",
  dubaiAlt:"Влад Сербушко на подиуме Emirates Fashion Week в Дубае, ОАЭ",
  cityDesc:"Участие в City Fashion Week, Клуж, Румыния.",
  dubaiDesc:"Участие в Emirates Fashion Week, Дубай, ОАЭ.",
  back:"Об основателе",endTitle:"Мода и предпринимательство.",
  endText:"Влад Сербушко — основатель и CEO SITES EVOLVE и fashion model в ADI Academy, объединяющий предпринимательство, технологии и творчество.",
  founder:"Познакомиться с основателем",social:"Личный Instagram"
 }
} as const;

export default function FashionProfilePage({locale}:{locale:Locale}){
 const t=text[locale];
 const cards=[
  {src:"/vlad-serbusco-city-fashion-week-cluj-romania.jpg",title:"City Fashion Week",place:t.cityLocation,alt:t.cityAlt,caption:t.cityDesc,kind:"fashion-seo-city"},
  {src:"/vlad-serbusco-emirates-fashion-week-dubai.jpg",title:"Emirates Fashion Week",place:t.dubaiLocation,alt:t.dubaiAlt,caption:t.dubaiDesc,kind:"fashion-seo-dubai"}
 ];
 return <div className="fashion-seo-page">
  <header className="fashion-seo-hero">
   <div className="container fashion-seo-hero-grid">
    <div className="fashion-seo-hero-copy">
     <Link className="fashion-seo-back" href={pathFor(locale,"founder")}><ArrowLeft size={17}/>{t.back}</Link>
     <span className="fashion-seo-eyebrow"><Camera size={16}/>{t.eyebrow}</span>
     <h1>Vlad Serbușco<span>{t.first}</span><em>{t.second}</em></h1>
     <p>{t.intro}</p>
     <a className="fashion-seo-personal" href="https://www.instagram.com/vlad_14.02/" rel="noopener noreferrer" target="_blank">{t.social}<ArrowUpRight size={16}/></a>
    </div>
    <div className="fashion-seo-hero-photo">
     <strong aria-label="VS — Vlad Serbușco initials">VS<span>.</span></strong>
     <span>VLAD / FASHION / DIGITAL</span>
    </div>
   </div>
  </header>
  <section className="fashion-seo-showcase"><div className="container">
   <div className="fashion-seo-section-title"><span className="fashion-seo-eyebrow"><Globe2 size={16}/>{t.gallery}</span><h2>{t.galleryTitle}</h2><p>{t.galleryIntro}</p></div>
   <div className="fashion-seo-photo-grid">
    {cards.map((photo)=><figure className="fashion-seo-figure" key={photo.src}>
     <div className={"fashion-seo-image fashion-seo-image-monogram "+photo.kind}><span aria-hidden="true">{photo.title==="City Fashion Week"?"CLUJ":"DUBAI"}</span></div>
     <figcaption><div><h3>{photo.title}</h3><p>{photo.caption}</p></div><span><MapPin size={16}/>{photo.place}</span></figcaption>
    </figure>)}
   </div>
  </div></section>
  <section className="fashion-seo-ending"><div className="container">
   <div className="fashion-seo-ending-panel"><span className="fashion-seo-eyebrow"><Globe2 size={16}/> SITES EVOLVE × ADI ACADEMY</span><h2>{t.endTitle}</h2><p>{t.endText}</p><Link href={pathFor(locale,"founder")} className="fashion-seo-cta">{t.founder}<ArrowUpRight size={20}/></Link></div>
  </div></section>
 </div>;
}
