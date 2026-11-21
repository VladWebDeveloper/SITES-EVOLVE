import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,ArrowRight,Globe2,Plane,Layers3} from "lucide-react";
import {works,pathFor,type Locale,type Work} from "@/lib/site";

const labels={
 en:{eyebrow:"OUR WORK / SITES EVOLVE",heading:"A collection of",accent:"ideas brought to life.",intro:"Explore real websites and digital experiences we've built. Select any project to discover its design, features and implementation.",count:"Projects in our portfolio",view:"Explore project",live:"Live website",ctaOver:"YOUR PROJECT COULD BE NEXT",cta:"Let's build your next big idea.",ctaText:"Every new collaboration becomes another story worth sharing.",ctaButton:"Start a project",preview:"Stylized preview",status:"LIVE PROJECT"},
 ro:{eyebrow:"PORTOFOLIU / SITES EVOLVE",heading:"Idei transformate",accent:"în proiecte reale.",intro:"Descoperă website-urile și experiențele digitale construite de noi. Deschide fiecare proiect pentru a vedea designul, funcționalitățile și implementările.",count:"Proiecte în portofoliu",view:"Descoperă proiectul",live:"Website live",ctaOver:"URMĂTORUL PROIECT POATE FI AL TĂU",cta:"Hai să construim următoarea idee.",ctaText:"Fiecare colaborare nouă devine o poveste care merită prezentată.",ctaButton:"Începe un proiect",preview:"Previzualizare stilizată",status:"PROIECT LIVE"},
 ru:{eyebrow:"НАШИ ПРОЕКТЫ / SITES EVOLVE",heading:"Идеи, ставшие",accent:"реальными проектами.",intro:"Откройте для себя созданные нами сайты и цифровые решения. Выберите проект, чтобы узнать о дизайне, функциях и реализации.",count:"Проектов в портфолио",view:"Изучить проект",live:"Открыть сайт",ctaOver:"ВАШ ПРОЕКТ МОЖЕТ БЫТЬ СЛЕДУЮЩИМ",cta:"Давайте воплотим вашу идею.",ctaText:"Каждая новая работа — история, которой хочется поделиться.",ctaButton:"Начать проект",preview:"Стилизованное превью",status:"ГОТОВЫЙ ПРОЕКТ"}
} as const;

function ProjectVisual({work,locale}:{work:Work;locale:Locale}){
 const t=labels[locale],travel=work.id==="alvitravel";
 return <div className={"work-index-visual "+(travel?"work-index-visual-travel":"work-index-visual-generic")}>
  <div className="work-index-visual-glow" aria-hidden="true"/>
  <div className="work-index-browser" aria-hidden="true">
   <div className="work-index-browser-top"><div className="work-index-browser-dots"><i/><i/><i/></div><span>{travel?"alvitravel.md":work.title}</span><Globe2 size={12}/></div>
   <div className="work-index-browser-content">
    {work.coverImage&&<Image src={work.coverImage} alt="" fill sizes="(max-width:700px) 92vw, 55vw" className="work-index-cover" unoptimized/>}
    <div className="work-index-browser-inner">
     {travel&&<span className="work-index-travel-logo"><Plane size={16}/> AlviTravel</span>}
     <small>{work.eyebrow}</small>
     <strong>{work.title}</strong>
     <span>{work.category}</span>
    </div>
   </div>
  </div>
  <div className="work-index-art-label"><Layers3 size={16}/>{t.preview}</div>
 </div>;
}
export default function WorkIndex({locale}:{locale:Locale}){
 const t=labels[locale],projects=works[locale];
 return <div className="work-index">
  <section className="work-index-hero"><div className="container">
   <span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.eyebrow}</span>
   <h1>{t.heading}<br/><em>{t.accent}</em></h1>
   <div className="work-index-hero-bottom"><p>{t.intro}</p><span>{String(projects.length).padStart(2,"0")} <small>{t.count}</small></span></div>
  </div></section>
  <section className="work-index-gallery"><div className="container">
   <div className="work-index-grid">{projects.map((project,i)=>{
    const detail=pathFor(locale,"work/"+project.id);
    return <article className="work-index-card" key={project.id}>
     <Link href={detail} className="work-index-main-link" aria-label={t.view+": "+project.title}>
      <ProjectVisual work={project} locale={locale}/>
      <div className="work-index-card-info">
       <div className="work-index-meta"><span>{String(i+1).padStart(2,"0")} / {project.eyebrow}</span><span>{t.status}</span></div>
       <div className="work-index-card-heading"><div><h2>{project.title}</h2><p>{project.description}</p></div><span className="work-index-arrow"><ArrowUpRight size={27}/></span></div>
      </div>
     </Link>
     <div className="work-index-card-footer"><span>{project.category}</span><div><Link href={detail}>{t.view}<ArrowRight size={16}/></Link>{project.url&&<a href={project.url} target="_blank" rel="noopener noreferrer">{t.live}<ArrowUpRight size={15}/></a>}</div></div>
    </article>;
   })}</div>
  </div></section>
  <section className="work-index-bottom"><div className="container"><div className="work-index-bottom-panel">
   <div><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.ctaOver}</span><h2>{t.cta}</h2><p>{t.ctaText}</p></div>
   <Link href={pathFor(locale,"quote")} className="work-index-bottom-button">{t.ctaButton}<ArrowUpRight size={21}/></Link>
  </div></div></section>
 </div>;
}
