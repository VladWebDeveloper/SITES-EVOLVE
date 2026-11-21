import Link from "next/link";
import {ArrowRight,ArrowUpRight,Globe2,Plane} from "lucide-react";
import {pathFor,type Locale,type Work} from "@/lib/site";

const text={
 en:{label:"SELECTED WORK",title:"Work worth",accent:"showing.",intro:"Real projects, thoughtfully built. A glimpse of what we create for ambitious businesses.",projectType:"TRAVEL · WEB EXPERIENCE",projectDescription:"A clearer way to explore destinations and request a holiday offer.",view:"Explore Our Work",preview:"Stylized preview",previewTag:"TRAVEL & DISCOVERY"},
 ro:{label:"PORTOFOLIU SELECTAT",title:"Proiecte care",accent:"se remarcă.",intro:"Proiecte reale, construite cu atenție la detalii. Descoperă experiențele digitale pe care le creăm pentru afaceri.",projectType:"TURISM · EXPERIENȚĂ WEB",projectDescription:"O modalitate simplă de a descoperi destinații și de a solicita o ofertă de vacanță.",view:"Explorează portofoliul",preview:"Previzualizare stilizată",previewTag:"CĂLĂTORII & DESCOPERIRE"},
 ru:{label:"ИЗБРАННЫЕ РАБОТЫ",title:"Проекты,",accent:"которые впечатляют.",intro:"Реальные проекты, созданные с вниманием к деталям. Узнайте, какие цифровые решения мы разрабатываем для бизнеса.",projectType:"ТУРИЗМ · ВЕБ-ПРОЕКТ",projectDescription:"Удобный способ найти направления и запросить предложение для отдыха.",view:"Смотреть все проекты",preview:"Стилизованное превью",previewTag:"ПУТЕШЕСТВИЯ"}
} as const;

export default function HomeWorkShowcase({locale,project}:{locale:Locale;project:Work}){
 const t=text[locale],portfolio=pathFor(locale,"work");
 return <section className="future-section future-work home-work-clean" id="projects"><div className="container">
  <div className="home-work-clean-header">
   <div><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.label}</span><h2>{t.title}<br/><em>{t.accent}</em></h2></div>
   <div className="home-work-clean-intro"><p>{t.intro}</p><Link href={portfolio} className="home-work-clean-explore">{t.view}<ArrowUpRight size={18} aria-hidden="true"/></Link></div>
  </div>
  <Link href={portfolio} className="home-work-clean-card" aria-label={t.view}>
   <div className="home-work-clean-art" aria-hidden="true">
    <div className="home-work-clean-orbit"/>
    <div className="home-work-clean-browser">
     <div className="home-work-clean-toolbar"><span className="home-work-clean-dots"><i/><i/><i/></span><span>alvitravel.md</span><Globe2 size={13}/></div>
     <div className="home-work-clean-preview"><span>{t.previewTag}</span><strong>AlviTravel</strong><small>Discover. Explore. Travel.</small><div className="home-work-clean-sun"/></div>
    </div>
    <div className="home-work-clean-stamp"><Plane size={18}/><span>001 / SITES EVOLVE</span></div>
    <span className="home-work-clean-preview-caption">{t.preview}</span>
   </div>
   <div className="home-work-clean-description">
    <div><span>{t.projectType}</span><h3>{project.title}</h3><p>{t.projectDescription}</p></div>
    <span className="home-work-clean-card-arrow"><ArrowRight size={25}/></span>
   </div>
  </Link>
 </div></section>;
}