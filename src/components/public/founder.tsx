import Link from "next/link";
import Image from "next/image";
import {ArrowUpRight, Camera, Sparkles, GraduationCap, Code2, Rocket, Plane, Users, Globe2} from "lucide-react";
import {pathFor, type Locale} from "@/lib/site";
import FashionModelGallery from "@/components/public/fashion-gallery";

const profile={
 ro:{
  over:"DIN SPATELE SITES EVOLVE",hello:"Salut, sunt Vlad.",headline:"Tehnologie cu viziune.",intro:"Sunt Vlad Serbușco, fondator și CEO al SITES EVOLVE, pasionat de tehnologie, business și creativitate. Activez ca IT Manager la AlviTravel, sunt fashion model la ADI Academy și studiez Business & Administration.",
  focus:"Web development · Design · AI",projects:"IT Manager — AlviTravel",ph:"Spațiu rezervat pentru fotografia fondatorului",caption:"PORTRET ÎN CURÂND",cta:"Descoperă povestea",position:"FOUNDER · ENTREPRENEUR · TECHNOLOGY & CREATIVITY",
  story:"Sunt Vlad Serbușco, fondatorul și CEO-ul SITES EVOLVE. Îmbin tehnologia, businessul și creativitatea pentru a transforma ideile în experiențe digitale care contează. Pe lângă dezvoltarea propriului brand, sunt IT Manager la AlviTravel, fashion model la ADI Academy și am defilat la City Fashion Week în Cluj și Emirates Fashion Week în Dubai. Studiez Business & Administration. Experiența în leadership mă ajută să transform viziunea în acțiuni concrete.",
  approachTitle:"Ce mă motivează",approach:"Produse care arată excelent, funcționează intuitiv și au un scop clar pentru cei care le folosesc.",
  workTitle:"Proiect finalizat",work:"AlviTravel este proiectul finalizat prezentat în portofoliul SITES EVOLVE.",
  futureTitle:"Viziunea mea",future:"Un studio în care designul premium, software-ul și automatizările inteligente lucrează împreună."
 },
 en:{
  over:"BEHIND SITES EVOLVE",hello:"Hi, I'm Vlad.",headline:"Technology with vision.",intro:"I'm Vlad Serbușco, Founder & CEO of SITES EVOLVE. I work across technology, business and creativity as IT Manager at AlviTravel, a fashion model at ADI Academy and a Business & Administration student.",
  focus:"Web development · Design · AI",projects:"IT Manager — AlviTravel",ph:"Reserved for the founder's future portrait",caption:"PORTRAIT COMING SOON",cta:"Meet the founder",position:"FOUNDER · ENTREPRENEUR · TECHNOLOGY & CREATIVITY",
  story:"I'm Vlad Serbușco, Founder & CEO of SITES EVOLVE. I bring together technology, business and creativity to build digital experiences that matter. Alongside leading SITES EVOLVE, I am IT Manager at AlviTravel and a fashion model at ADI Academy. My international runway appearances include City Fashion Week in Cluj, Romania, and Emirates Fashion Week in Dubai. I also study Business & Administration. My leadership experience helps turn vision into action.",
  approachTitle:"What drives me",approach:"Experiences that look exceptional, feel intuitive and solve a real problem for the people using them.",
  workTitle:"Completed work",work:"AlviTravel is the completed project featured in the SITES EVOLVE portfolio.",
  futureTitle:"My vision",future:"A studio where premium design, software and intelligent automation work together."
 },
 ru:{
  over:"КТО СТОИТ ЗА SITES EVOLVE",hello:"Привет, я Влад.",headline:"Технологии с идеей.",intro:"Я Влад Сербушко, основатель и CEO SITES EVOLVE. Работаю IT-менеджером AlviTravel, занимаюсь моделингом в ADI Academy, участвовал в City Fashion Week в Клуже и Emirates Fashion Week в Дубае, а также изучаю Business & Administration.",
  focus:"Веб-разработка · Дизайн · ИИ",projects:"IT-менеджер — AlviTravel",ph:"Место для будущего портрета основателя",caption:"ФОТО СКОРО ПОЯВИТСЯ",cta:"Моя история",position:"FOUNDER · ENTREPRENEUR · TECHNOLOGY & CREATIVITY",
  story:"Я Влад Сербушко, основатель и CEO SITES EVOLVE. Соединяю технологии, бизнес и творчество, создавая полезные цифровые решения. Развивая собственный бренд, работаю IT-менеджером в AlviTravel, занимаюсь моделингом в ADI Academy, участвовал в City Fashion Week в Клуже и Emirates Fashion Week в Дубае, а также изучаю Business & Administration. Опыт лидерства помогает воплощать идеи в жизнь.",
  approachTitle:"Что меня вдохновляет",approach:"Продукты, которые выглядят впечатляюще, работают интуитивно и решают реальные задачи.",
  workTitle:"Готовый проект",work:"AlviTravel — завершённый проект в портфолио SITES EVOLVE.",
  futureTitle:"Моё видение",future:"Студия, где премиальный дизайн, разработка и умная автоматизация дополняют друг друга."
 }
} as const;

export function FounderPortrait({locale,large=false}:{locale:Locale;large?:boolean}){
 const t=profile[locale];
 const photo=process.env.NEXT_PUBLIC_FOUNDER_PHOTO?.trim() || "/vlad-serbusco-founder.webp";
 const valid=Boolean(photo?.startsWith("/") && !photo.startsWith("//"));
 return <div className={"evolve-founder-portrait"+(large?" evolve-founder-portrait-large":"")} role="img" aria-label={valid?"Vlad Serbușco — founder of SITES EVOLVE":t.ph}>
  <div className="evolve-founder-portrait-glow"/>
  {valid&&photo?<Image className="evolve-founder-photo" src={photo} alt="Vlad Serbușco — Founder and CEO of SITES EVOLVE, international fashion model" fill sizes={large?"(max-width: 900px) 100vw, 45vw":"(max-width: 900px) 100vw, 32vw"} unoptimized priority={large}/>:<>
   <div className="evolve-founder-photo-rings" aria-hidden="true"><span/><span/><span/></div>
   <div className="evolve-founder-placeholder-avatar" aria-hidden="true">VS<span>.</span></div>
   <div className="evolve-founder-photo-badge"><Camera size={15}/><span>{t.caption}</span></div>
  </>}
  <div className="evolve-founder-photo-corner">S/E · 001</div>
 </div>;
}
export function FounderSpotlight({locale}:{locale:Locale}){
 const t=profile[locale];
 return <section className="evolve-founder-home" id="founder"><div className="container evolve-founder-home-grid">
  <div className="evolve-founder-home-image"><FounderPortrait locale={locale}/></div>
  <div className="evolve-founder-home-copy">
   <span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.over}</span>
   <h2>{t.hello}<br/><em>{t.headline}</em></h2>
   <p>{t.intro}</p>
   <div className="evolve-founder-facts"><span><Code2 size={16}/>{t.focus}</span><span><GraduationCap size={16}/>{locale==="ro"?"Studiez Business & Administration":locale==="ru"?"Изучаю Business & Administration":"Studying Business & Administration"}</span><span><Rocket size={16}/>{t.projects}</span></div>
   <Link href={pathFor(locale,"founder")} className="future-button future-button-primary"><span>{t.cta}</span><span className="future-button-icon"><ArrowUpRight size={17}/></span></Link>
  </div>
 </div></section>;
}
const details={
 ro:{byline:"Founder & CEO · IT Manager · International Fashion Model",title:"Experiență & implicare",subtitle:"Domenii diferite. Aceeași dorință de a construi și evolua.",education:"Studiez Business & Administration",vision:"Viziunea mea",quote:"Tehnologia nu trebuie doar să rezolve probleme. Trebuie să creeze oportunități.",summary:"Prin SITES EVOLVE ajut afacerile să transforme ideile în soluții digitale utile, memorabile și durabile.",work:"Explorează proiectele",visit:"Vizitează AlviTravel",roles:[["SITES EVOLVE","Fondator & CEO","Website-uri, produse digitale și inovație."],["AlviTravel","IT Manager","Tehnologie și experiențe digitale pentru turism."],["ADI Academy","Fashion Model","Fashion, imagine personală și creativitate."],["Senatul Studențesc","Vicepreședinte","Leadership și inițiative pentru comunitate."]]},
 en:{byline:"Founder & CEO · IT Manager · International Fashion Model",title:"Experience & involvement",subtitle:"Different fields. One drive to create and evolve.",education:"Studying Business & Administration",vision:"My vision",quote:"Technology should not only solve problems. It should create opportunities.",summary:"Through SITES EVOLVE, I help businesses turn ambitious ideas into useful, memorable and lasting digital experiences.",work:"Explore the work",visit:"Visit AlviTravel",roles:[["SITES EVOLVE","Founder & CEO","Websites, digital products and innovation."],["AlviTravel","IT Manager","Technology and digital experiences in travel."],["ADI Academy","Fashion Model","Fashion, personal presentation and creativity."],["Student Senate","Vice President","Leadership and community initiatives."]]},
 ru:{byline:"Founder & CEO · IT-менеджер · Fashion Model",title:"Опыт и деятельность",subtitle:"Разные направления. Одно стремление — создавать и развиваться.",education:"Изучаю Business & Administration",vision:"Моё видение",quote:"Технологии должны не только решать проблемы, но и открывать новые возможности.",summary:"Через SITES EVOLVE помогаю компаниям превращать идеи в полезные и запоминающиеся цифровые решения.",work:"Посмотреть проекты",visit:"Посетить AlviTravel",roles:[["SITES EVOLVE","Основатель & CEO","Сайты, цифровые продукты и инновации."],["AlviTravel","IT-менеджер","Технологии и цифровые решения для туризма."],["ADI Academy","Fashion Model","Мода, имидж и творческое развитие."],["Студенческий сенат","Вице-президент","Лидерство и общественные инициативы."]]}
} as const;
export function FounderProfile({locale}:{locale:Locale}){
 const t=profile[locale],d=details[locale];
 const icons=[Code2,Rocket,Camera,Users] as const;
 return <section className="evolve-founder-profile"><div className="container">
  <div className="evolve-founder-profile-grid">
   <FounderPortrait locale={locale} large/>
   <div className="evolve-founder-profile-copy">
    <span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.position}</span>
    <h2>{t.hello}<br/><em>{t.headline}</em></h2>
    <p className="evolve-founder-tagline">{d.byline}</p>
    <p className="evolve-founder-story">{t.story}</p>
    <div className="evolve-founder-education"><GraduationCap size={20} aria-hidden="true"/>{d.education}</div>
    <div className="evolve-founder-skills">{["Web Development","IT Management","Business Strategy","Leadership","Creative Thinking"].map(s=><span key={s}>{s}</span>)}</div>
    <Link href={pathFor(locale,"work")} className="evolve-founder-link">{d.work}<ArrowUpRight size={17}/></Link>
   </div>
  </div>
  <div className="evolve-founder-roles-section">
   <div className="evolve-founder-roles-heading"><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{d.title}</span><h3>{d.subtitle}</h3></div>
   <div className="evolve-founder-roles-grid">{d.roles.map(([company,role,description],idx)=>{
    const Icon=icons[idx];
    if(idx===2)return <FashionModelGallery key={company} locale={locale} company={company} role={role} description={description} index={idx}/>;
    return <article key={company} className="evolve-founder-role">
     <div className="evolve-founder-role-head"><span className="evolve-founder-role-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true"/></span><span className="evolve-founder-role-count">0{idx+1}</span></div>
     <h4>{company}</h4><strong>{role}</strong><p>{description}</p>
     {idx===1&&<Link href="https://alvitravel.md" className="evolve-founder-role-link" target="_blank" rel="noopener noreferrer" aria-label={d.visit}><Globe2 size={15}/><span>alvitravel.md</span><ArrowUpRight size={15}/></Link>}
    </article>;
   })}</div>
   <Link href={pathFor(locale,"fashion-model")} className="evolve-founder-runway-link"><Camera size={18} aria-hidden="true"/><span>{locale==="ro"?"Vlad Serbușco pe podium: Cluj și Dubai":locale==="ru"?"Влад Сербушко на подиуме: Клуж и Дубай":"Vlad Serbușco — International fashion runway portfolio"}</span><ArrowUpRight size={18} aria-hidden="true"/></Link>
  </div>
  <div className="evolve-founder-vision"><span className="future-eyebrow"><span className="future-eyebrow-dot"/>{d.vision}</span><blockquote>“{d.quote}”</blockquote><p>{d.summary}</p><Sparkles className="evolve-founder-vision-icon" size={104} strokeWidth={1} aria-hidden="true"/></div>
 </div></section>;
}
