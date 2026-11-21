import Link from "next/link";
import {ArrowLeft,ArrowRight,ArrowUpRight,Compass,ExternalLink,Globe2,Layers3,MessageCircleMore,MonitorSmartphone,Plane,Sparkles,MapPinned} from "lucide-react";
import {pathFor,works,type Locale,type Work} from "@/lib/site";
import GenericWorkDetail from "@/components/public/project-detail-generic";

const i18n={
 en:{
  kicker:"SELECTED WORK / SITES EVOLVE",hero1:"Digital experiences.",hero2:"Real-world stories.",intro:"Thoughtful design meets everyday usefulness. Explore the details behind our work.",featured:"FEATURED CASE STUDY",category:"TRAVEL / WEB EXPERIENCE",view:"Explore the case study",live:"Visit live website",back:"All projects",detailKicker:"THE PROJECT / ALVITRAVEL",detail1:"Travel, reimagined.",detail2:"Made effortless.",detailIntro:"A welcoming digital experience bringing travel inspiration, destinations and enquiries together.",eyebrow:"A CLOSER LOOK",featureTitle:"Designed for the journey.",featureIntro:"Not just a first impression — a useful experience at every step.",about:"AlviTravel brings holiday inspiration and practical enquiries together in one approachable digital destination.",feature1:"Explore destinations",feature1Text:"Inspiring destinations and featured holidays in one place.",feature2:"Request an offer",feature2Text:"A simple way to get in touch and plan a trip.",feature3:"Browse anywhere",feature3Text:"An experience designed for desktop and mobile.",process:"BEHIND THE EXPERIENCE",processTitle:"Purpose in every detail.",step1:"Clear direction",step1Text:"Make destination discovery inviting and straightforward.",step2:"Human-centred design",step2Text:"Strong imagery, clear information and intuitive navigation.",step3:"From interest to action",step3Text:"Connect travellers with a straightforward way to enquire.",next:"YOUR IDEA COULD BE NEXT",nextTitle:"Let's build something worth showing.",nextText:"Your next website or digital experience starts with a conversation.",nextButton:"Start your project",illustration:"Stylized preview of the live AlviTravel website",visualTitle:"Where your next journey begins.",visualButton:"Explore destinations",visualCaption:"DESTINATIONS · EXPERIENCES · DISCOVERY"
 },
 ro:{
  kicker:"PORTOFOLIU / SITES EVOLVE",hero1:"Experiențe digitale.",hero2:"Proiecte reale.",intro:"Design atent și funcționalitate practică. Descoperă detaliile din spatele proiectelor noastre.",featured:"STUDIU DE CAZ",category:"TURISM / EXPERIENȚĂ WEB",view:"Descoperă studiul de caz",live:"Vizitează site-ul",back:"Toate proiectele",detailKicker:"PROIECTUL / ALVITRAVEL",detail1:"Călătoriile, altfel.",detail2:"Simplu și intuitiv.",detailIntro:"O experiență digitală care reunește inspirația pentru vacanțe, destinațiile și solicitările de ofertă.",eyebrow:"O PRIVIRE MAI ATENTĂ",featureTitle:"Gândit pentru călătorie.",featureIntro:"Nu doar o primă impresie bună, ci o experiență utilă la fiecare pas.",about:"AlviTravel reunește inspirația pentru vacanțe și solicitările de ofertă într-un spațiu digital clar și accesibil.",feature1:"Descoperă destinații",feature1Text:"Idei de călătorie și vacanțe într-un singur loc.",feature2:"Cere o ofertă",feature2Text:"Acces simplu la contact și solicitări personalizate.",feature3:"Navighează de oriunde",feature3Text:"Interfață adaptată pentru calculator și telefon.",process:"DIN SPATELE PROIECTULUI",processTitle:"Fiecare detaliu are un scop.",step1:"O direcție clară",step1Text:"Descoperirea destinațiilor să fie simplă și captivantă.",step2:"Design pentru oameni",step2Text:"Imagini puternice, informații ordonate și navigare intuitivă.",step3:"De la interes la acțiune",step3Text:"Vizitatorii pot trece firesc de la explorare la cererea unei oferte.",next:"IDEA TA POATE URMA",nextTitle:"Hai să construim ceva memorabil.",nextText:"Un website sau un produs digital ambițios începe cu o conversație.",nextButton:"Începe proiectul",illustration:"Previzualizare stilizată a site-ului AlviTravel",visualTitle:"Următoarea călătorie începe aici.",visualButton:"Descoperă destinații",visualCaption:"DESTINAȚII · EXPERIENȚE · DESCOPERIRE"
 },
 ru:{
  kicker:"ПОРТФОЛИО / SITES EVOLVE",hero1:"Цифровой опыт.",hero2:"Реальные истории.",intro:"Продуманный дизайн и практическая польза. Изучите детали наших проектов.",featured:"ИЗБРАННЫЙ ПРОЕКТ",category:"ТУРИЗМ / ВЕБ-ПРОЕКТ",view:"Подробнее о проекте",live:"Открыть сайт",back:"Все проекты",detailKicker:"ПРОЕКТ / ALVITRAVEL",detail1:"Путешествия по-новому.",detail2:"Просто и удобно.",detailIntro:"Удобный цифровой опыт, объединяющий направления, вдохновение и заявки.",eyebrow:"В ДЕТАЛЯХ",featureTitle:"Создано для путешествий.",featureIntro:"Не только первое впечатление — удобство на каждом шагу.",about:"AlviTravel объединяет идеи для отдыха и запросы на предложения в одном понятном цифровом пространстве.",feature1:"Откройте направления",feature1Text:"Идеи для поездок и предложения для отдыха.",feature2:"Отправьте запрос",feature2Text:"Простой доступ к контактам и индивидуальным предложениям.",feature3:"Пользуйтесь где угодно",feature3Text:"Удобно на компьютере и смартфоне.",process:"ЗА КАДРОМ",processTitle:"Каждая деталь важна.",step1:"Чёткая концепция",step1Text:"Сделать поиск направлений простым и интересным.",step2:"Дизайн для людей",step2Text:"Яркие изображения, понятная структура и навигация.",step3:"От интереса к действию",step3Text:"Помочь посетителям перейти от просмотра к запросу предложения.",next:"ВАША ИДЕЯ МОЖЕТ БЫТЬ СЛЕДУЮЩЕЙ",nextTitle:"Создадим то, что запомнится.",nextText:"Новый сайт или цифровой продукт начинается с разговора.",nextButton:"Начать проект",illustration:"Стилизованное превью сайта AlviTravel",visualTitle:"Ваше путешествие начинается здесь.",visualButton:"Смотреть направления",visualCaption:"НАПРАВЛЕНИЯ · ВПЕЧАТЛЕНИЯ · ОТКРЫТИЯ"
 }
} as const;
const implementation={
 en:{label:"WHAT WE IMPLEMENTED",title:"Features built for real travellers.",intro:"A closer look at the practical parts of the AlviTravel experience, verified against the live website.",stack:"TECHNICAL APPROACH",tech:"HTML, CSS & JavaScript · Responsive layout · Search-friendly content",items:[
  ["Destination discovery","Clear sections for holiday destinations and excursion routes."],
  ["Holiday offers","Featured trips with useful details and transparent indicative prices."],
  ["Personalized enquiries","A structured request form to describe dates, travellers and preferences."],
  ["Multiple contact options","Visitors can continue their enquiry through WhatsApp, phone or email."],
  ["Excursions & group travel","Dedicated sections for organized trips, school groups and businesses."],
  ["Mobile-first experience","Flexible navigation and readable layouts across phones and desktops."]
 ]},
 ro:{label:"FUNCȚIONALITĂȚI IMPLEMENTATE",title:"Soluții utile pentru călători.",intro:"Funcționalități practice ale AlviTravel, verificate pe website-ul public.",stack:"ABORDARE TEHNICĂ",tech:"HTML, CSS și JavaScript · Design responsive · Conținut structurat pentru căutare",items:[
  ["Descoperirea destinațiilor","Secțiuni clare pentru vacanțe și trasee de excursie."],
  ["Oferte turistice","Sejururi și excursii prezentate cu informații și prețuri orientative."],
  ["Solicitare de ofertă","Formular pentru date de călătorie, numărul de persoane și preferințe."],
  ["Contact simplificat","Continuarea cererii prin WhatsApp, apel telefonic sau email."],
  ["Excursii și grupuri","Secțiuni pentru excursii organizate, grupuri școlare și companii."],
  ["Adaptare mobilă","Interfață ușor de parcurs atât pe telefon, cât și pe calculator."]
 ]},
 ru:{label:"РЕАЛИЗОВАННЫЕ ФУНКЦИИ",title:"Удобные решения для путешествий.",intro:"Практические функции сайта AlviTravel, проверенные на открытом сайте.",stack:"ТЕХНИЧЕСКИЙ ПОДХОД",tech:"HTML, CSS и JavaScript · Адаптивная верстка · Структурированный контент",items:[
  ["Поиск направлений","Удобные разделы с направлениями и экскурсионными маршрутами."],
  ["Туристические предложения","Поездки с полезными подробностями и ориентировочными ценами."],
  ["Форма заявки","Запрос поездки с датами, составом группы и пожеланиями."],
  ["Удобная связь","Связь через WhatsApp, телефон или электронную почту."],
  ["Экскурсии и группы","Разделы для организованных поездок, школ и компаний."],
  ["Мобильная версия","Удобный интерфейс для телефона и компьютера."]
 ]}
} as const;
function Eyebrow({children}:{children:React.ReactNode}){return <span className="showcase-eyebrow"><i/>{children}</span>}
function TravelPreview({locale}:{locale:Locale}){
 const t=i18n[locale];
 return <div className="showcase-preview" role="img" aria-label={t.illustration}>
  <div className="showcase-orbit" aria-hidden="true"/>
  <div className="showcase-browser">
   <div className="showcase-browser-toolbar"><div className="showcase-dots"><i/><i/><i/></div><span><Globe2 size={12}/>alvitravel.md</span><span className="showcase-browser-lines">☰</span></div>
   <div className="showcase-travel-nav"><strong><Plane size={17} fill="currentColor"/>AlviTravel</strong><span>DESTINATIONS &nbsp; / &nbsp; OFFERS &nbsp; / &nbsp; CONTACT</span><small>RO &nbsp; EN &nbsp; RU</small></div>
   <div className="showcase-travel-hero"><div className="showcase-travel-copy"><small>{t.visualCaption}</small><strong>{t.visualTitle}</strong><span className="showcase-preview-button">{t.visualButton}<ArrowUpRight size={14}/></span></div></div>
   <div className="showcase-travel-foot"><span/><span/><span/><small>alvitravel.md</small></div>
  </div>
  <div className="showcase-phone" aria-hidden="true"><div className="showcase-phone-screen"><span>AlviTravel</span><strong>GO<br/>EXPLORE.</strong><i/></div></div>
  <div className="showcase-floating-label"><Sparkles size={15}/> S/E — 001</div>
 </div>;
}
export default function PortfolioShowcase({locale,work}:{locale:Locale;work?:Work}){
 const t=i18n[locale],w=work||works[locale][0],isDetail=Boolean(work);
 if(w.id!=="alvitravel")return <GenericWorkDetail locale={locale} project={w}/>;
 const implemented=implementation[locale];
 const features=[[t.feature1,t.feature1Text,Compass],[t.feature2,t.feature2Text,MessageCircleMore],[t.feature3,t.feature3Text,MonitorSmartphone]] as const;
 const steps=[[t.step1,t.step1Text],[t.step2,t.step2Text],[t.step3,t.step3Text]] as const;
 return <div className="showcase-page">
  <section className="showcase-hero"><div className="showcase-hero-orbit" aria-hidden="true"/><div className="container">
   {isDetail&&<Link href={pathFor(locale,"work")} className="showcase-back"><ArrowLeft size={17}/>{t.back}</Link>}
   <Eyebrow>{isDetail?t.detailKicker:t.kicker}</Eyebrow>
   <h1>{isDetail?t.detail1:t.hero1}<br/><em>{isDetail?t.detail2:t.hero2}</em></h1>
   <div className="showcase-hero-bottom"><p>{isDetail?t.detailIntro:t.intro}</p><span>01 / 01 <ArrowRight size={22}/></span></div>
  </div></section>
  <section className="showcase-feature"><div className="container">
   <div className="showcase-title-row"><div><Eyebrow>{t.featured}</Eyebrow><h2>{w.title}<em>.</em></h2></div><div><span>{t.category}</span><strong>01 — 01</strong></div></div>
   <TravelPreview locale={locale}/>
   <div className="showcase-summary"><div><span className="showcase-micro">{t.eyebrow} / ALVITRAVEL</span><h3>{t.about}</h3><div className="showcase-tags"><span><Compass size={14}/> TRAVEL</span><span><Layers3 size={14}/> UX/UI</span><span><MonitorSmartphone size={14}/> RESPONSIVE</span></div></div><div className="showcase-actions">{!isDetail&&<Link className="showcase-button-primary" href={pathFor(locale,"work/"+w.id)}>{t.view}<ArrowUpRight size={18}/></Link>}<a className="showcase-button-secondary" href={w.url||"https://alvitravel.md"} target="_blank" rel="noopener noreferrer">{t.live}<ExternalLink size={17}/></a></div></div>
   <span className="showcase-note">{t.illustration}</span>
  </div></section>
  <section className="showcase-features"><div className="container">
   <header><Eyebrow>{t.eyebrow}</Eyebrow><h2>{t.featureTitle}</h2><p>{t.featureIntro}</p></header>
   <div className="showcase-feature-grid">{features.map(([title,body,Icon],i)=><article key={title} className="showcase-feature-card"><div className="showcase-feature-card-top"><span><Icon size={28} strokeWidth={1.6}/></span><small>0{i+1}</small></div><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
  </div></section>
  <section className="showcase-implementation"><div className="container">
   <header><Eyebrow>{implemented.label}</Eyebrow><h2>{implemented.title}</h2><p>{implemented.intro}</p></header>
   <div className="showcase-implementation-grid">{implemented.items.map(([title,description],i)=><article key={title}>
    <div className="showcase-implementation-head"><span>{String(i+1).padStart(2,"0")}</span><ArrowUpRight size={20} aria-hidden="true"/></div>
    <h3>{title}</h3><p>{description}</p>
   </article>)}</div>
   <div className="showcase-tech-bar"><span><Layers3 size={19}/>{implemented.stack}</span><p>{implemented.tech}</p></div>
  </div></section>
  <section className="showcase-story"><div className="container showcase-story-grid"><div><Eyebrow>{t.process}</Eyebrow><h2>{t.processTitle}</h2><span className="showcase-story-icon"><MapPinned size={95} strokeWidth={.85}/></span></div><div>{steps.map(([title,body],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight size={20}/></article>)}</div></div></section>
  <section className="showcase-next"><div className="container"><div className="showcase-next-box"><div className="showcase-next-orb" aria-hidden="true"><Sparkles size={110} strokeWidth={.8}/></div><div><Eyebrow>{t.next}</Eyebrow><h2>{t.nextTitle}</h2><p>{t.nextText}</p><Link className="showcase-button-primary" href={pathFor(locale,"quote")}>{t.nextButton}<ArrowUpRight size={18}/></Link></div></div></div></section>
 </div>;
}