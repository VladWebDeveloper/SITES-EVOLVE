import Link from "next/link";
import {ArrowLeft,ArrowUpRight,ExternalLink,Globe2,Plane,MonitorSmartphone,Languages,Layers3,CheckCircle2,MousePointer2,Sparkles,Compass,MessageCircleMore,Check,ArrowRight} from "lucide-react";
import {pathFor,type Locale} from "@/lib/site";

const labels={
 en:{
  back:"Back to all work",eyebrow:"FEATURED CASE STUDY / 001",title:"Travel beyond",em:"expectations.",
  lead:"A digital destination for AlviTravel — making it easier to discover holidays, explore offers and reach the team.",
  over:"ALVITRAVEL / TRAVEL EXPERIENCE",visit:"Visit live website",explore:"Explore the implementation",online:"LIVE WEBSITE",platform:"Travel website",point1:"3 languages",point2:"Mobile-first design",point3:"Enquiry experience",
  browserLabel:"TRAVEL · DESTINATIONS · DISCOVERY",browserTitle:"Your next journey starts here.",browserCTA:"Find your escape",miniOne:"Destination discovery",miniTwo:"Offers & excursions",
  featured:"01 / TRAVEL · WEB PLATFORM",tag:"FEATURED PROJECT",summary:"An inviting travel platform that connects destination inspiration with practical holiday enquiries.",
  featureTitle:"WHAT WE DELIVERED",features:["Destination-led design","Holiday enquiry forms","RO / EN / RU interface","Responsive layouts"],
  caseButton:"See features below",preview:"Conceptual website preview"
 },
 ro:{
  back:"Înapoi la proiecte",eyebrow:"STUDIU DE CAZ / 001",title:"Călătorii dincolo",em:"de așteptări.",
  lead:"O experiență digitală pentru AlviTravel — destinații, oferte și un mod simplu de a contacta agenția.",
  over:"ALVITRAVEL / EXPERIENȚĂ TURISTICĂ",visit:"Vizitează site-ul",explore:"Descoperă implementările",online:"WEBSITE ACTIV",platform:"Website turistic",point1:"3 limbi",point2:"Design pentru mobil",point3:"Cereri de ofertă",
  browserLabel:"VACANȚE · DESTINAȚII · DESCOPERIRE",browserTitle:"Următoarea călătorie începe aici.",browserCTA:"Descoperă destinații",miniOne:"Destinații turistice",miniTwo:"Oferte și excursii",
  featured:"01 / TURISM · PLATFORMĂ WEB",tag:"PROIECT PRINCIPAL",summary:"O platformă turistică ce transformă inspirația pentru vacanțe în solicitări concrete de ofertă.",
  featureTitle:"CE AM IMPLEMENTAT",features:["Design pentru destinații","Formulare de ofertă","Interfață RO / EN / RU","Design responsive"],
  caseButton:"Vezi funcționalitățile",preview:"Previzualizare conceptuală"
 },
 ru:{
  back:"Ко всем проектам",eyebrow:"КЕЙС / 001",title:"Путешествия за",em:"пределами ожиданий.",
  lead:"Цифровой опыт для AlviTravel: направления, туристические предложения и удобные запросы.",
  over:"ALVITRAVEL / ТУРИСТИЧЕСКИЙ САЙТ",visit:"Открыть сайт",explore:"Узнать о реализации",online:"САЙТ ОНЛАЙН",platform:"Туристический сайт",point1:"3 языка",point2:"Мобильная версия",point3:"Запросы предложений",
  browserLabel:"ТУРИЗМ · НАПРАВЛЕНИЯ · ОТКРЫТИЯ",browserTitle:"Ваше путешествие начинается здесь.",browserCTA:"Открыть направления",miniOne:"Популярные направления",miniTwo:"Туры и экскурсии",
  featured:"01 / ТУРИЗМ · ВЕБ-ПЛАТФОРМА",tag:"ИЗБРАННЫЙ ПРОЕКТ",summary:"Платформа, объединяющая идеи для отдыха и удобный запрос предложений.",
  featureTitle:"ЧТО РЕАЛИЗОВАНО",features:["Дизайн для путешествий","Формы заявок","Интерфейс RO / EN / RU","Адаптивная верстка"],
  caseButton:"Смотреть функции",preview:"Концептуальное превью"
 }
} as const;

export default function AlviTravelCaseHero({locale}:{locale:Locale}){
 const t=labels[locale];
 return <section className="alvi-case-hero">
  <div className="alvi-case-ambient alvi-case-ambient-one" aria-hidden="true"/><div className="alvi-case-ambient alvi-case-ambient-two" aria-hidden="true"/>
  <div className="container">
   <Link href={pathFor(locale,"work")} className="alvi-case-back"><ArrowLeft size={16}/>{t.back}</Link>
   <div className="alvi-case-main">
    <div className="alvi-case-copy">
     <span className="alvi-case-kicker"><span/>{t.eyebrow}</span>
     <h1>{t.title}<br/><em>{t.em}</em></h1>
     <p className="alvi-case-lead">{t.lead}</p>
     <div className="alvi-case-metrics">
      <div><Languages size={19}/><strong>RO · EN · RU</strong><span>{t.point1}</span></div>
      <div><MonitorSmartphone size={19}/><strong>Desktop + Mobile</strong><span>{t.point2}</span></div>
      <div><MessageCircleMore size={19}/><strong>{t.point3}</strong><span>AlviTravel</span></div>
     </div>
     <div className="alvi-case-qualities">
      <span><CheckCircle2 size={18}/>{t.platform}</span>
      <span><CheckCircle2 size={18}/>{t.point2}</span>
      <span><CheckCircle2 size={18}/>{t.point3}</span>
     </div>
     <div className="alvi-case-actions">
      <a href="https://alvitravel.md" target="_blank" rel="noopener noreferrer" className="alvi-case-button">{t.visit}<ExternalLink size={18}/></a>
      <a href="#implemented" className="alvi-case-text-link">{t.explore}<ArrowRight size={17}/></a>
     </div>
    </div>
    <div className="alvi-case-art" aria-label={t.preview} role="img">
     <div className="alvi-case-orbit alvi-case-orbit-a"/><div className="alvi-case-orbit alvi-case-orbit-b"/>
     <div className="alvi-case-layer alvi-case-layer-back"/><div className="alvi-case-layer alvi-case-layer-front"/>
     <div className="alvi-case-float alvi-case-float-brand"><span><Plane size={17}/></span><div><strong>AlviTravel</strong><small>{t.online}</small></div><i/></div>
     <div className="alvi-case-float alvi-case-float-languages"><Languages size={22}/><div><strong>RO / EN / RU</strong><small>{t.point1}</small></div></div>
     <div className="alvi-case-float alvi-case-float-responsive"><MonitorSmartphone size={22}/><div><strong>Responsive</strong><small>Mobile & desktop</small></div></div>
     <div className="alvi-case-browser">
      <div className="alvi-case-browser-top"><div><i/><i/><i/></div><span><Globe2 size={12}/> alvitravel.md</span><span className="alvi-case-browser-menu">≡</span></div>
      <div className="alvi-case-browser-nav"><strong><Plane size={17}/> AlviTravel</strong><small>DESTINATIONS &nbsp; / &nbsp; OFFERS &nbsp; / &nbsp; CONTACT</small><span>RO &nbsp; EN &nbsp; RU</span></div>
      <div className="alvi-case-browser-image"><div className="alvi-case-browser-inner"><small>{t.browserLabel}</small><strong>{t.browserTitle}</strong><span>{t.browserCTA}<ArrowUpRight size={13}/></span></div></div>
      <div className="alvi-case-browser-foot"><span/><span/><span/><small>AlviTravel</small></div>
     </div>
     <div className="alvi-case-microviews">
      <div className="alvi-case-micro alvi-case-micro-first"><div className="alvi-case-micro-top"><Plane size={10}/> AlviTravel</div><div><small>{t.miniOne}</small><strong>Explore more.</strong></div></div>
      <div className="alvi-case-micro alvi-case-micro-second"><div className="alvi-case-micro-top">AlviTravel <Compass size={10}/></div><small>{t.miniTwo}</small><div className="alvi-case-mini-cards"><i/><i/><i/></div></div>
     </div>
     <span className="alvi-case-ribbon"><Check size={13}/>{t.tag}</span>
     <span className="alvi-case-preview-disclaimer">{t.preview}</span>
    </div>
   </div>
   <div className="alvi-case-summary">
    <div className="alvi-case-project"><span>{t.featured}</span><h2>AlviTravel</h2><p>Travel & Discovery</p></div>
    <div className="alvi-case-summary-copy"><p>{t.summary}</p><div><span>UX / UI</span><span>WEB DEVELOPMENT</span><span>RESPONSIVE</span></div></div>
    <div className="alvi-case-deliverables"><span>{t.featureTitle}</span><ul>{t.features.map(feature=><li key={feature}><CheckCircle2 size={17}/>{feature}</li>)}</ul></div>
   </div>
  </div>
 </section>;
}
