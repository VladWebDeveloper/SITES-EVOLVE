import Link from "next/link";
import Image from "next/image";
import {ArrowLeft,ArrowUpRight,ArrowRight,Layers3,MonitorSmartphone,CheckCircle2} from "lucide-react";
import {pathFor,type Locale,type Work} from "@/lib/site";

const i18n={
 en:{back:"All projects",heading:"Project overview",features:"What we implemented",challenge:"The challenge",solution:"Our solution",technology:"Technology & tools",visit:"Visit the live website",next:"Have a project in mind?",nextButton:"Start a project"},
 ro:{back:"Toate proiectele",heading:"Despre proiect",features:"Funcționalități implementate",challenge:"Provocarea",solution:"Soluția noastră",technology:"Tehnologii și instrumente",visit:"Vizitează website-ul",next:"Ai un proiect în minte?",nextButton:"Începe un proiect"},
 ru:{back:"Все проекты",heading:"О проекте",features:"Реализованные функции",challenge:"Задача",solution:"Наше решение",technology:"Технологии и инструменты",visit:"Открыть сайт",next:"Есть идея проекта?",nextButton:"Начать проект"}
} as const;

// Shared case-study template: new entries in works[locale] automatically get their own detail page.
export default function GenericWorkDetail({locale,project}:{locale:Locale;project:Work}){
 const t=i18n[locale];
 return <div className="work-generic">
  <section className="work-generic-hero"><div className="container">
   <Link href={pathFor(locale,"work")} className="work-generic-back"><ArrowLeft size={17}/>{t.back}</Link>
   <span className="future-eyebrow"><span className="future-eyebrow-dot"/>{project.eyebrow}</span>
   <h1>{project.title}<em>.</em></h1>
   <p>{project.description}</p>
   {project.url&&<a href={project.url} target="_blank" rel="noopener noreferrer" className="work-generic-live">{t.visit}<ArrowUpRight size={18}/></a>}
  </div></section>
  <section className="work-generic-overview"><div className="container">
   <div className="work-generic-visual">
    {project.coverImage?<Image src={project.coverImage} fill alt={project.title} sizes="100vw" unoptimized/>:<div className="work-generic-art"><Layers3 size={100} strokeWidth={.85}/><strong>{project.title}</strong><span>{project.category}</span></div>}
   </div>
   <div className="work-generic-summary"><div><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.heading}</span><h2>{project.title}</h2></div><p>{project.description}</p></div>
   {(project.challenge||project.solution)&&<div className="work-generic-approach">{project.challenge&&<article><span>{t.challenge}</span><p>{project.challenge}</p></article>}{project.solution&&<article><span>{t.solution}</span><p>{project.solution}</p></article>}</div>}
   {project.features&&project.features.length>0&&<div className="work-generic-section"><h2>{t.features}</h2><div className="work-generic-features">{project.features.map((feature,i)=><article key={feature.title}><span><CheckCircle2 size={24}/><small>{String(i+1).padStart(2,"0")}</small></span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></div>}
   {project.technologies&&project.technologies.length>0&&<div className="work-generic-technologies"><span><MonitorSmartphone size={18}/>{t.technology}</span><div>{project.technologies.map(v=><small key={v}>{v}</small>)}</div></div>}
  </div></section>
  <section className="work-generic-end"><div className="container"><div className="work-generic-end-panel"><h2>{t.next}</h2><Link href={pathFor(locale,"quote")}>{t.nextButton}<ArrowRight size={20}/></Link></div></div></section>
 </div>;
}
