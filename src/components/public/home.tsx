"use client";
import {useRef,useEffect,useState} from "react";
import Link from "next/link";
import {ArrowUpRight,ArrowRight,Code2,BrainCircuit,Blocks,ShoppingBag,ChartNoAxesCombined,ShieldCheck,MoveUpRight,Sparkles,Layers3,ScanLine,Check} from "lucide-react";
import {services,pathFor,type Locale,type Service} from "@/lib/site";
import {copy} from "@/lib/copy";
import {BrandLogo} from "@/components/brand/logo";

const iconMap={code:Code2,sparkles:BrainCircuit,blocks:Blocks,bag:ShoppingBag,chart:ChartNoAxesCombined,shield:ShieldCheck};
const ui={
 en:{eyebrow:"WEB DEVELOPMENT & INNOVATION",line1:"Build today.",line2:"Evolve tomorrow.",subtitle:"Premium websites, custom apps and AI. Designed to stand out. Engineered to perform.",primary:"Start your project",secondary:"Explore our work",mini1:"DESIGN-LED",mini2:"ENGINEERED TO SCALE",mini3:"AI-READY",serviceTitle:"Everything your",serviceEm:"brand needs.",serviceOver:"WHAT WE CREATE",serviceIntro:"From first impression to your next big move.",serviceCta:"Explore all services",portfolioTitle:"Work worth",portfolioEm:"showing.",portfolioOver:"SELECTED WORK",portfolioIntro:"Real projects. Distinctive digital experiences.",portfolioCta:"See case study",flowTitle:"Simple process.",flowEm:"Remarkable results.",flowOver:"HOW WE WORK",closingOver:"YOUR NEXT MOVE",closingTitle:"Have an idea?",closingEm:"Let's make it real.",closingBody:"Tell us what you're building. We'll find the right digital solution.",closingButton:"Let's talk",more:"Explore",visualA:"DESIGN / CODE / AI",visualB:"DIGITAL EXPERIENCES",visualC:"NEXT-GEN STUDIO",visualBadge:"LIVE CONCEPT",capabilities:["WEB DEVELOPMENT","AI & AUTOMATION","DIGITAL PRODUCTS","DESIGN SYSTEMS","GROWTH"]},
 ro:{eyebrow:"WEB DEVELOPMENT & INNOVATION",line1:"Build today.",line2:"Evolve tomorrow.",subtitle:"Website-uri premium, aplicații și AI. Design memorabil. Tehnologie care performează.",primary:"Începe proiectul",secondary:"Vezi proiectele",mini1:"DESIGN PREMIUM",mini2:"TEHNOLOGIE MODERNĂ",mini3:"AI & AUTOMATIZĂRI",serviceTitle:"Tot ce are nevoie",serviceEm:"brandul tău.",serviceOver:"CE CONSTRUIM",serviceIntro:"De la prima impresie la următorul nivel.",serviceCta:"Vezi toate serviciile",portfolioTitle:"Proiecte care",portfolioEm:"se remarcă.",portfolioOver:"PORTOFOLIU",portfolioIntro:"Experiențe digitale create pentru afaceri reale.",portfolioCta:"Descoperă proiectul",flowTitle:"Proces simplu.",flowEm:"Rezultate memorabile.",flowOver:"CUM LUCRĂM",closingOver:"URMĂTORUL PAS",closingTitle:"Ai o idee?",closingEm:"Hai s-o construim.",closingBody:"Povestește-ne despre proiectul tău. Găsim împreună soluția potrivită.",closingButton:"Hai să discutăm",more:"Explorează",visualA:"DESIGN / COD / AI",visualB:"EXPERIENȚE DIGITALE",visualC:"STUDIO NEXT-GEN",visualBadge:"CONCEPT DIGITAL",capabilities:["WEBSITE-URI","AI & AUTOMATIZĂRI","APLICAȚII","DESIGN DIGITAL","CREȘTERE"]},
 ru:{eyebrow:"WEB DEVELOPMENT & INNOVATION",line1:"Build today.",line2:"Evolve tomorrow.",subtitle:"Премиальные сайты, приложения и ИИ. Выразительный дизайн. Продуманные технологии.",primary:"Начать проект",secondary:"Смотреть проекты",mini1:"ПРЕМИУМ-ДИЗАЙН",mini2:"СОВРЕМЕННЫЙ КОД",mini3:"ИИ И АВТОМАТИЗАЦИЯ",serviceTitle:"Всё для роста",serviceEm:"вашего бренда.",serviceOver:"ЧТО МЫ СОЗДАЁМ",serviceIntro:"От первого впечатления до новых возможностей.",serviceCta:"Все услуги",portfolioTitle:"Проекты,",portfolioEm:"которые впечатляют.",portfolioOver:"НАШИ РАБОТЫ",portfolioIntro:"Цифровые решения для реальных задач.",portfolioCta:"О проекте",flowTitle:"Простой процесс.",flowEm:"Сильный результат.",flowOver:"НАШ ПОДХОД",closingOver:"СЛЕДУЮЩИЙ ШАГ",closingTitle:"Есть идея?",closingEm:"Давайте воплотим.",closingBody:"Расскажите о проекте. Вместе найдём лучшее решение.",closingButton:"Обсудить проект",more:"Подробнее",visualA:"ДИЗАЙН / КОД / ИИ",visualB:"ЦИФРОВОЙ ОПЫТ",visualC:"СТУДИЯ НОВОГО ПОКОЛЕНИЯ",visualBadge:"DIGITAL CONCEPT",capabilities:["ВЕБ-РАЗРАБОТКА","ИИ И АВТОМАТИЗАЦИЯ","ПРИЛОЖЕНИЯ","ДИЗАЙН","РАЗВИТИЕ"]}
} as const;

function SectionLead({over,title,em,intro}:{over:string;title:string;em:string;intro?:string}){
 return <div className="future-section-lead"><div><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{over}</span><h2>{title} <em>{em}</em></h2></div>{intro&&<p>{intro}</p>}</div>;
}
function FutureButton({href,children,ghost=false,onClick}:{href:string;children:React.ReactNode;ghost?:boolean;onClick?:()=>void}){
 return <Link href={href} onClick={onClick} className={"future-button "+(ghost?"future-button-ghost":"future-button-primary")}><span>{children}</span><span className="future-button-icon"><ArrowUpRight size={17}/></span></Link>;
}
function OrbitalExperience({locale}:{locale:Locale}){
 const el=useRef<HTMLDivElement>(null),t=ui[locale];
 function tilt(event:React.PointerEvent<HTMLDivElement>){
  if(event.pointerType==="touch"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const rect=event.currentTarget.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
  el.current?.style.setProperty("--tilt-x",(-y*9).toFixed(2)+"deg");
  el.current?.style.setProperty("--tilt-y",(x*12).toFixed(2)+"deg");
 }
 function reset(){el.current?.style.setProperty("--tilt-x","0deg");el.current?.style.setProperty("--tilt-y","0deg");}
 return <div className="future-scene" onPointerMove={tilt} onPointerLeave={reset} aria-label="Interactive dimensional digital sculpture"><div className="future-scene-perspective" ref={el}>
  <div className="future-scene-aura"/>
  <div className="future-orbit future-orbit-1"/><div className="future-orbit future-orbit-2"/><div className="future-orbit future-orbit-3"/>
  <div className="future-orb-body"><div className="future-orb-shine"/><div className="future-orb-contour"/><div className="future-orb-core"><BrandLogo variant="orb" decorative priority/></div></div>
  <div className="future-node future-node-one"/><div className="future-node future-node-two"/>
  <div className="future-float future-float-top"><div className="future-float-topline"><span className="future-mini-led"/> SITES EVOLVE <ScanLine size={15}/></div><div className="future-float-title">{t.visualB}</div><div className="future-float-graph"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="future-float-tag">{t.visualA}</div></div>
  <div className="future-float future-float-bottom"><span className="future-float-icon"><Layers3 size={17}/></span><div><strong>{t.visualC}</strong><small>{t.visualBadge}</small></div><div className="future-float-stars">✦</div></div>
 </div><div className="future-scene-label future-scene-label-left">S / E — EXPERIMENTAL</div><div className="future-scene-label future-scene-label-right">CREATIVE ENGINEERING · 2026</div></div>;
}
function ServiceIcon({service}:{service:Service}){const Icon=iconMap[service.icon as keyof typeof iconMap]||Code2;return <Icon size={26} strokeWidth={1.55}/>}
export default function FutureHome({locale}:{locale:Locale}){
 const t=ui[locale],common=copy[locale];
 const [variant,setVariant]=useState<"A"|"B">("A"),[analyticsEnabled,setAnalyticsEnabled]=useState(false);
 useEffect(()=>{
  try{
   if(localStorage.getItem("se-analytics")!=="yes")return;
   const existing=localStorage.getItem("se-ab-home-v1");
   const assigned=existing==="A"||existing==="B"?existing:(Math.random()<.5?"A":"B");
   localStorage.setItem("se-ab-home-v1",assigned);
   window.requestAnimationFrame(()=>{setVariant(assigned);setAnalyticsEnabled(true);});
   if(!sessionStorage.getItem("se-ab-home-impression")){
    sessionStorage.setItem("se-ab-home-impression","yes");
    void fetch("/api/experiments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({experiment:"homepage_cta_v1",variant:assigned,event:"impression",consent:true}),keepalive:true}).catch(()=>{});
   }
  }catch{/* Consent or storage unavailable: show the default experience. */}
 },[]);
 function trackCta(){
  if(!analyticsEnabled)return;
  const payload=JSON.stringify({experiment:"homepage_cta_v1",variant,event:"click",consent:true});
  try{navigator.sendBeacon("/api/experiments",new Blob([payload],{type:"application/json"}));}catch{}
 }
 return <>
  <section className="future-hero"><div className="future-hero-glow future-hero-glow-a"/><div className="future-hero-glow future-hero-glow-b"/><div className="container future-hero-grid">
   <div className="future-hero-copy"><div className="future-status"><span className="future-live-dot"/> {t.eyebrow}<Sparkles size={12}/></div><h1><span>{t.line1}</span>{" "}<span className="future-gradient-text">{t.line2}</span></h1><p>{t.subtitle}</p><div className="future-hero-cta"><FutureButton href={pathFor(locale,"quote")} onClick={trackCta}>{variant==="B"?(locale==="ro"?"Planifică-ți website-ul":locale==="ru"?"Спланируйте сайт":"Plan your website"):t.primary}</FutureButton><FutureButton href={pathFor(locale,"work")} ghost>{t.secondary}</FutureButton></div><div className="future-hero-meta"><span><Check size={14}/>{t.mini1}</span><span><Check size={14}/>{t.mini2}</span><span><Check size={14}/>{t.mini3}</span></div></div>
   <OrbitalExperience locale={locale}/>
  </div><div className="container future-hero-bottom"><span>CREATIVE CODE × DIGITAL STRATEGY</span><span>SCROLL TO EXPLORE <span className="future-scroll-arrow">↓</span></span></div></section>
  <section className="future-capabilities"><div className="container future-capabilities-wrap">{t.capabilities.map((label,i)=><span key={label} className="future-capability"><span>{label}</span>{i<4&&<i/>}</span>)}</div></section>
  <section className="future-section future-services" id="services"><div className="container"><SectionLead over={t.serviceOver} title={t.serviceTitle} em={t.serviceEm} intro={t.serviceIntro}/><div className="future-service-grid">{services[locale].slice(0,4).map((s,i)=><Link href={pathFor(locale,"services/"+s.id)} className="future-service" key={s.id}><div className="future-service-header"><span className="future-service-icon"><ServiceIcon service={s}/></span><span className="future-service-count">0{i+1} / 04</span></div><div className="future-service-content"><h3>{s.title}</h3><p>{s.body}</p></div><div className="future-service-bottom"><span>{t.more}</span><span className="future-service-arrow"><MoveUpRight size={20}/></span></div></Link>)}</div><div className="future-section-cta"><Link href={pathFor(locale,"services")}>{t.serviceCta}<ArrowRight size={18}/></Link></div></div></section>
  <section className="future-section growth-home-tools" id="tools"><div className="container"><SectionLead over="SITES EVOLVE / FREE TOOLS" title={locale==="ro"?"Instrumente gratuite.":locale==="ru"?"Бесплатные инструменты.":"Free digital tools."} em={locale==="ro"?"Decizii mai bune.":locale==="ru"?"Лучшие решения.":"Better decisions."} intro={locale==="ro"?"Configurează, testează și învață înainte să începi proiectul.":locale==="ru"?"Планируйте, тестируйте и учитесь до начала проекта.":"Plan, experiment and learn before you start."}/><div className="growth-home-tool-grid">{([["builder",locale==="ro"?"Simulator website":locale==="ru"?"Симулятор сайтов":"Website simulator"],["audit",locale==="ro"?"Audit SEO gratuit":locale==="ru"?"Бесплатный аудит":"Free SEO audit"],["demo",locale==="ro"?"Demonstrații interactive":locale==="ru"?"Интерактивное демо":"Interactive demos"],["academy","SITES EVOLVE Academy"]] as const).map(([slug,label])=><Link key={slug} href={pathFor(locale,slug)}><span className="growth-tool-symbol" aria-hidden="true">{slug==="builder"?<Layers3 size={27} strokeWidth={1.55}/>:slug==="audit"?<ScanLine size={27} strokeWidth={1.55}/>:slug==="demo"?<Sparkles size={27} strokeWidth={1.55}/>:<BrainCircuit size={27} strokeWidth={1.55}/>}</span><strong>{label}</strong><ArrowUpRight size={18}/></Link>)}</div></div></section>
  <section className="future-section future-process" id="process"><div className="container"><SectionLead over={t.flowOver} title={t.flowTitle} em={t.flowEm}/><div className="future-process-list">{common.processSteps.map(([num,title,desc])=><div className="future-process-step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><span className="future-process-symbol" aria-hidden="true">{num==="01"?<ScanLine size={42} strokeWidth={1.45}/>:num==="02"?<Layers3 size={42} strokeWidth={1.45}/>:num==="03"?<Code2 size={42} strokeWidth={1.45}/>:<Sparkles size={42} strokeWidth={1.45}/>}</span></div>)}</div></div></section>
  <section className="future-last-section"><div className="container"><div className="future-last-card"><div className="future-last-gridlines"/><span className="future-last-planet"/><div className="future-last-copy"><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.closingOver}</span><h2>{t.closingTitle}<br/><em>{t.closingEm}</em></h2><p>{t.closingBody}</p><FutureButton href={pathFor(locale,"contact")}>{t.closingButton}</FutureButton></div><div className="future-last-marker" aria-hidden="true"><ArrowUpRight size={76} strokeWidth={1.25}/></div></div></div></section>
 </>;
}
