import Link from "next/link";
import {ArrowUpRight,ArrowRight,Plane,Globe2,Layers3,MonitorSmartphone,Check,Compass,MousePointer2,ExternalLink,CheckCircle2,Languages,Code2,Sparkles} from "lucide-react";
import {pathFor,type Locale,type Work} from "@/lib/site";

const copy={
 en:{
  label:"SELECTED WORK",title:"Work worth",em:"showing.",
  lead:"A closer look at a real digital project — created to make travel discovery simpler, more engaging and accessible.",
  stat1:"Featured project",stat2:"Languages",stat3:"Live website",
  value1:"01",value2:"03",value3:"LIVE",
  point1:"Designed with purpose",point1Desc:"Thoughtful visuals and clear navigation.",
  point2:"Built for real people",point2Desc:"A simpler path from exploration to enquiry.",
  point3:"Made for every screen",point3Desc:"Seamless browsing on mobile and desktop.",
  viewAll:"Explore the portfolio",status:"Travel platform",statusSub:"Live website",
  live:"Online",device:"Responsive design",language:"RO / EN / RU",
  browserCaption:"TRAVEL · WEB PLATFORM",browserSub:"Travel & discovery",browserCta:"Explore",
  previewHeadline:"Discover new destinations",previewLabel:"Explore the world",previewSecondary:"Popular destinations",
  badge:"Featured project",detailOver:"01 / TRAVEL · WEB PLATFORM",
  detailText:"A modern travel website bringing destinations, holiday inspiration and requests for offers into one intuitive experience.",
  viewCase:"View case study",visit:"Visit AlviTravel",delivered:"WHAT WE BUILT",
  deliver1:"Travel-focused design",deliver2:"Clear enquiry experience",
  deliver3:"RO / EN / RU interface",deliver4:"Mobile-friendly layout",
  disclaimer:"Stylized website preview"
 },
 ro:{
  label:"PORTOFOLIU",title:"Proiecte care",em:"se remarcă.",
  lead:"Descoperă un proiect digital real, creat pentru ca explorarea vacanțelor să fie mai simplă, atractivă și accesibilă.",
  stat1:"Proiect prezentat",stat2:"Limbi",stat3:"Site online",
  value1:"01",value2:"03",value3:"LIVE",
  point1:"Design cu un scop",point1Desc:"Elemente vizuale atent gândite și navigare clară.",
  point2:"Creat pentru oameni",point2Desc:"De la inspirația de vacanță la cererea unei oferte.",
  point3:"Adaptat oricărui ecran",point3Desc:"Navigare fluidă pe mobil și calculator.",
  viewAll:"Descoperă portofoliul",status:"Platformă turistică",statusSub:"Website activ",
  live:"Online",device:"Design responsive",language:"RO / EN / RU",
  browserCaption:"TURISM · PLATFORMĂ WEB",browserSub:"Călătorii și descoperire",browserCta:"Explorează",
  previewHeadline:"Descoperă destinații noi",previewLabel:"Explorează lumea",previewSecondary:"Destinații populare",
  badge:"Proiect prezentat",detailOver:"01 / TURISM · PLATFORMĂ WEB",
  detailText:"Un website de călătorii care reunește destinații, inspirație pentru vacanțe și solicitări de ofertă într-o experiență intuitivă.",
  viewCase:"Vezi studiul de caz",visit:"Vizitează AlviTravel",delivered:"CE AM CONSTRUIT",
  deliver1:"Design pentru turism",deliver2:"Solicitare simplă de ofertă",
  deliver3:"Interfață RO / EN / RU",deliver4:"Adaptat pentru mobil",
  disclaimer:"Previzualizare stilizată"
 },
 ru:{
  label:"ИЗБРАННЫЕ РАБОТЫ",title:"Проекты,",em:"которые впечатляют.",
  lead:"Знакомьтесь с реальным цифровым проектом — удобным и современным опытом для выбора путешествий.",
  stat1:"Проект",stat2:"Языка",stat3:"Сайт онлайн",
  value1:"01",value2:"03",value3:"LIVE",
  point1:"Продуманный дизайн",point1Desc:"Яркая визуальная подача и удобная навигация.",
  point2:"Удобно для людей",point2Desc:"От поиска путешествия до запроса предложения.",
  point3:"Для любого экрана",point3Desc:"Комфортно на телефоне и компьютере.",
  viewAll:"Все проекты",status:"Туристическая платформа",statusSub:"Сайт работает",
  live:"Онлайн",device:"Адаптивный дизайн",language:"RO / EN / RU",
  browserCaption:"ТУРИЗМ · ВЕБ-ПЛАТФОРМА",browserSub:"Путешествия и открытия",browserCta:"Смотреть",
  previewHeadline:"Откройте новые направления",previewLabel:"Исследуй мир",previewSecondary:"Популярные направления",
  badge:"Избранный проект",detailOver:"01 / ТУРИЗМ · ВЕБ-ПЛАТФОРМА",
  detailText:"Современный туристический сайт с направлениями, идеями для отдыха и удобной формой запроса предложений.",
  viewCase:"О проекте",visit:"Открыть AlviTravel",delivered:"ЧТО МЫ СОЗДАЛИ",
  deliver1:"Дизайн для туризма",deliver2:"Удобные запросы предложений",
  deliver3:"Интерфейс RO / EN / RU",deliver4:"Мобильная версия",
  disclaimer:"Стилизованное превью"
 }
} as const;

export default function HomeWorkShowcase({locale,project}:{locale:Locale;project:Work}){
 const t=copy[locale],caseUrl=pathFor(locale,"work/"+project.id);
 const points=[
  {Icon:Layers3,title:t.point1,desc:t.point1Desc},
  {Icon:MousePointer2,title:t.point2,desc:t.point2Desc},
  {Icon:MonitorSmartphone,title:t.point3,desc:t.point3Desc}
 ];
 return <section className="future-section future-work se-hw" id="projects"><div className="container">
  <div className="se-hw-layout">
   <div className="se-hw-intro">
    <span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.label}</span>
    <h2>{t.title}<br/><em>{t.em}</em></h2>
    <p className="se-hw-lead">{t.lead}</p>
    <div className="se-hw-metrics" aria-label={t.label}>
     <div><strong>{t.value1}</strong><span>{t.stat1}</span></div>
     <div><strong>{t.value2}</strong><span>{t.stat2}</span></div>
     <div><strong>{t.value3}</strong><span>{t.stat3}</span></div>
    </div>
    <div className="se-hw-values">{points.map(({Icon,title,desc})=><div key={title} className="se-hw-value">
     <span className="se-hw-value-icon"><Icon size={20} strokeWidth={1.7}/></span>
     <div><strong>{title}</strong><p>{desc}</p></div>
    </div>)}</div>
    <Link href={pathFor(locale,"work")} className="se-hw-all">{t.viewAll}<ArrowRight size={17}/></Link>
   </div>
   <div className="se-hw-feature">
    <div className="se-hw-stage">
     <div className="se-hw-orbit" aria-hidden="true"/>
     <div className="se-hw-layer se-hw-layer-back" aria-hidden="true"/>
     <div className="se-hw-layer se-hw-layer-front" aria-hidden="true"/>
     <div className="se-hw-status"><span className="se-hw-status-icon"><Plane size={20}/></span><div><strong>{t.status}</strong><small>{t.statusSub}</small></div><i/></div>
     <div className="se-hw-float se-hw-float-online"><CheckCircle2 size={24}/><div><strong>{t.live}</strong><span>{t.stat3}</span></div></div>
     <div className="se-hw-float se-hw-float-languages"><Languages size={22}/><div><strong>{t.language}</strong><span>{t.stat2}</span></div></div>
     <Link href={caseUrl} className="se-hw-browser" aria-label={t.viewCase}>
      <div className="se-hw-browserbar"><div><i/><i/><i/></div><span>alvitravel.md</span><Globe2 size={14}/></div>
      <div className="se-hw-browserbody">
       <span className="se-hw-browser-kicker">{t.browserCaption}</span>
       <strong>AlviTravel</strong><span className="se-hw-browser-subtitle">{t.browserSub}</span>
       <span className="se-hw-browser-button">{t.browserCta}<ArrowUpRight size={13}/></span>
       <span className="se-hw-browser-orb" aria-hidden="true"/>
      </div>
     </Link>
     <div className="se-hw-mini-views">
      <div className="se-hw-mini se-hw-mini-hero" aria-hidden="true"><div className="se-hw-mini-navbar"><Plane size={10}/> AlviTravel <span>☰</span></div><div className="se-hw-mini-hero-inner"><span>{t.previewLabel}</span><strong>{t.previewHeadline}</strong><span className="se-hw-mini-search"/></div></div>
      <div className="se-hw-mini se-hw-mini-grid" aria-hidden="true"><span>{t.previewSecondary}</span><div className="se-hw-mini-cards"><i/><i/><i/></div><div className="se-hw-mini-gridlines"><b/><b/><b/></div></div>
     </div>
     <span className="se-hw-project-badge"><Check size={16}/>{t.badge}</span>
     <span className="se-hw-preview-note">{t.disclaimer}</span>
    </div>
    <div className="se-hw-details">
     <div className="se-hw-project-name"><span>{t.detailOver}</span><h3>{project.title}</h3><p>{project.category}</p></div>
     <div className="se-hw-project-description"><p>{t.detailText}</p><div className="se-hw-tags"><span>WEB DESIGN</span><span>UX/UI</span><span>RO / EN / RU</span></div><div className="se-hw-links"><Link href={caseUrl} className="se-hw-cta">{t.viewCase}<ArrowUpRight size={17}/></Link><a href={project.url||"https://alvitravel.md"} target="_blank" rel="noopener noreferrer" className="se-hw-visit">{t.visit}<ExternalLink size={16}/></a></div></div>
     <div className="se-hw-delivered"><span>{t.delivered}</span><ul>{[t.deliver1,t.deliver2,t.deliver3,t.deliver4].map(v=><li key={v}><CheckCircle2 size={16}/>{v}</li>)}</ul></div>
    </div>
   </div>
  </div>
 </div></section>;
}