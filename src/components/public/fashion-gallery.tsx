"use client";
import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import Image from "next/image";
import {ArrowUpRight,Camera,MapPin,X} from "lucide-react";
import type {Locale} from "@/lib/site";

const labels={
 ro:{
  explore:"Vezi aparițiile pe podium",
  eyebrow:"FASHION MODEL / ADI ACADEMY",
  title:"Runway moments.",
  introduction:"O selecție de momente de pe podium, din Cluj și Dubai.",
  close:"Închide galeria",
  city:"Cluj, România",
  dubai:"Dubai, Emiratele Arabe Unite",
  imageCity:"Prezentare de modă la City Fashion Week, Cluj, România",
  imageDubai:"Prezentare de modă la Emirates Fashion Week, Dubai",
  alt:"Deschide galeria Fashion Model"
 },
 en:{
  explore:"View runway moments",
  eyebrow:"FASHION MODEL / ADI ACADEMY",
  title:"Runway moments.",
  introduction:"A selection of runway moments from Cluj and Dubai.",
  close:"Close gallery",
  city:"Cluj, Romania",
  dubai:"Dubai, United Arab Emirates",
  imageCity:"Runway appearance at City Fashion Week, Cluj, Romania",
  imageDubai:"Runway appearance at Emirates Fashion Week, Dubai",
  alt:"Open Fashion Model gallery"
 },
 ru:{
  explore:"Посмотреть показы",
  eyebrow:"FASHION MODEL / ADI ACADEMY",
  title:"Моменты с подиума.",
  introduction:"Моменты с подиумов Клужа и Дубая.",
  close:"Закрыть галерею",
  city:"Клуж, Румыния",
  dubai:"Дубай, ОАЭ",
  imageCity:"Показ City Fashion Week в Клуже, Румыния",
  imageDubai:"Показ Emirates Fashion Week в Дубае",
  alt:"Открыть галерею Fashion Model"
 }
} as const;

export default function FashionModelGallery({locale,company,role,description,index}:{locale:Locale;company:string;role:string;description:string;index:number}){
 const t=labels[locale], [open,setOpen]=useState(false);
 const triggerRef=useRef<HTMLButtonElement>(null),closeRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  closeRef.current?.focus();
  const handleKey=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){event.preventDefault();setOpen(false);}
   else if(event.key==="Tab"){event.preventDefault();closeRef.current?.focus();}
  };
  document.addEventListener("keydown",handleKey);
  return ()=>{document.removeEventListener("keydown",handleKey);document.body.style.overflow=previous;triggerRef.current?.focus();};
 },[open]);
 const images=[
  {src:"/adi-academy-fashion-week.jpg",title:"City Fashion Week",place:t.city,alt:t.imageCity,cls:"fashion-gallery-city"},
  {src:"/adi-academy-runway.jpg",title:"Emirates Fashion Week",place:t.dubai,alt:t.imageDubai,cls:"fashion-gallery-dubai"}
 ];
 return <>
  <button ref={triggerRef} type="button" className="evolve-founder-role evolve-founder-role-fashion" aria-label={t.alt} aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}>
   <span className="evolve-founder-role-head"><span className="evolve-founder-role-icon"><Camera size={24} strokeWidth={1.6} aria-hidden="true"/></span><span className="evolve-founder-role-count">0{index+1}</span></span>
   <span className="fashion-role-name">{company}</span>
   <strong>{role}</strong>
   <span className="fashion-role-desc">{description}</span>
   <span className="fashion-role-cta">{t.explore}<ArrowUpRight size={16} aria-hidden="true"/></span>
  </button>
  {open&&typeof document!=="undefined"&&createPortal(
   <div className="fashion-gallery-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false);}}>
    <section className="fashion-gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="fashion-gallery-title" aria-describedby="fashion-gallery-intro">
     <button ref={closeRef} className="fashion-gallery-close" type="button" onClick={()=>setOpen(false)} aria-label={t.close}><X size={25}/></button>
     <div className="fashion-gallery-heading">
      <span className="fashion-gallery-overline"><span className="fashion-gallery-dot"/>{t.eyebrow}</span>
      <h2 id="fashion-gallery-title">{t.title}</h2>
      <p id="fashion-gallery-intro">{t.introduction}</p>
     </div>
     <div className="fashion-gallery-grid">{images.map((photo)=><figure key={photo.src} className="fashion-gallery-photo">
      <div className={"fashion-gallery-frame "+photo.cls}>
       <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 90vw, 42vw" className="fashion-gallery-photo-image" priority unoptimized/>
      </div>
      <figcaption><strong>{photo.title}</strong><span><MapPin size={15} aria-hidden="true"/>{photo.place}</span></figcaption>
     </figure>)}</div>
    </section>
   </div>,document.body)}
 </>;
}
