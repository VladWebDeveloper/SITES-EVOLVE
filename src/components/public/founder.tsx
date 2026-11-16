import Link from "next/link";
import Image from "next/image";
import {ArrowUpRight, Camera, Sparkles, GraduationCap, Code2, Rocket} from "lucide-react";
import {pathFor, type Locale} from "@/lib/site";

const profile={
 ro:{
  over:"DIN SPATELE SITES EVOLVE",hello:"Salut, sunt Vlad.",headline:"Tehnologie cu viziune.",intro:"Sunt Vlad Serbușco, fondatorul SITES EVOLVE. Studiez Business și Administrare la ASEM și transform idei în experiențe digitale clare, moderne și utile.",
  focus:"Web development · Design · AI",projects:"Proiecte: AlviTravel și DDent",ph:"Spațiu rezervat pentru fotografia fondatorului",caption:"PORTRET ÎN CURÂND",cta:"Descoperă povestea",position:"FONDATOR / DEZVOLTARE DIGITALĂ",
  story:"Construiesc SITES EVOLVE din convingerea că o identitate digitală memorabilă trebuie să fie și funcțională. Studiez Business și Administrare la ASEM și combin gândirea de business cu tehnologia și un design atent la detalii.",
  approachTitle:"Ce mă motivează",approach:"Produse care arată excelent, funcționează intuitiv și au un scop clar pentru cei care le folosesc.",
  workTitle:"Proiecte în dezvoltare",work:"AlviTravel și DDent fac parte din portofoliul digital prezentat de SITES EVOLVE.",
  futureTitle:"Viziunea mea",future:"Un studio în care designul premium, software-ul și automatizările inteligente lucrează împreună."
 },
 en:{
  over:"BEHIND SITES EVOLVE",hello:"Hi, I'm Vlad.",headline:"Technology with vision.",intro:"I'm Vlad Serbușco, founder of SITES EVOLVE. I study Business & Administration at ASEM and turn ideas into clear, modern and purposeful digital experiences.",
  focus:"Web development · Design · AI",projects:"Projects: AlviTravel and DDent",ph:"Reserved for the founder's future portrait",caption:"PORTRAIT COMING SOON",cta:"Meet the founder",position:"FOUNDER / DIGITAL DEVELOPMENT",
  story:"I started SITES EVOLVE with the belief that a memorable digital presence must also work beautifully. I study Business & Administration at ASEM and combine business thinking, technology and thoughtful design.",
  approachTitle:"What drives me",approach:"Experiences that look exceptional, feel intuitive and solve a real problem for the people using them.",
  workTitle:"Work in progress",work:"AlviTravel and DDent are among the digital projects showcased by SITES EVOLVE.",
  futureTitle:"My vision",future:"A studio where premium design, software and intelligent automation work together."
 },
 ru:{
  over:"КТО СТОИТ ЗА SITES EVOLVE",hello:"Привет, я Влад.",headline:"Технологии с идеей.",intro:"Я Влад Сербушко, основатель SITES EVOLVE. Изучаю бизнес и управление в ASEM и превращаю идеи в современные и удобные цифровые продукты.",
  focus:"Веб-разработка · Дизайн · ИИ",projects:"Проекты: AlviTravel и DDent",ph:"Место для будущего портрета основателя",caption:"ФОТО СКОРО ПОЯВИТСЯ",cta:"Моя история",position:"ОСНОВАТЕЛЬ / DIGITAL DEVELOPMENT",
  story:"Я создаю SITES EVOLVE с убеждением, что запоминающийся цифровой образ должен быть не только красивым, но и удобным. Я изучаю бизнес и управление в ASEM, объединяя бизнес-мышление, технологии и дизайн.",
  approachTitle:"Что меня вдохновляет",approach:"Продукты, которые выглядят впечатляюще, работают интуитивно и решают реальные задачи.",
  workTitle:"Мои проекты",work:"AlviTravel и DDent входят в портфолио цифровых проектов SITES EVOLVE.",
  futureTitle:"Моё видение",future:"Студия, где премиальный дизайн, разработка и умная автоматизация дополняют друг друга."
 }
} as const;

export function FounderPortrait({locale,large=false}:{locale:Locale;large?:boolean}){
 const t=profile[locale];
 const photo=process.env.NEXT_PUBLIC_FOUNDER_PHOTO?.trim();
 const valid=Boolean(photo?.startsWith("/") && !photo.startsWith("//"));
 return <div className={"evolve-founder-portrait"+(large?" evolve-founder-portrait-large":"")} role="img" aria-label={valid?"Vlad Serbușco — founder of SITES EVOLVE":t.ph}>
  <div className="evolve-founder-portrait-glow"/>
  {valid&&photo?<Image className="evolve-founder-photo" src={photo} alt="Vlad Serbușco — fondator SITES EVOLVE" fill sizes={large?"(max-width: 900px) 100vw, 45vw":"(max-width: 900px) 100vw, 32vw"} unoptimized priority={large}/>:<>
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
   <div className="evolve-founder-facts"><span><Code2 size={16}/>{t.focus}</span><span><GraduationCap size={16}/>ASEM · Business & Administration</span><span><Rocket size={16}/>{t.projects}</span></div>
   <Link href={pathFor(locale,"founder")} className="future-button future-button-primary"><span>{t.cta}</span><span className="future-button-icon"><ArrowUpRight size={17}/></span></Link>
  </div>
 </div></section>;
}
export function FounderProfile({locale}:{locale:Locale}){
 const t=profile[locale];
 return <section className="evolve-founder-profile"><div className="container evolve-founder-profile-grid">
  <FounderPortrait locale={locale} large/>
  <div className="evolve-founder-profile-copy">
   <span className="future-eyebrow"><span className="future-eyebrow-dot"/>{t.position}</span>
   <h2>{t.hello}<br/><em>{t.headline}</em></h2>
   <p className="evolve-founder-story">{t.story}</p>
   <div className="evolve-founder-profile-points">
    <div><Sparkles size={18}/><strong>{t.approachTitle}</strong><p>{t.approach}</p></div>
    <div><Code2 size={18}/><strong>{t.workTitle}</strong><p>{t.work}</p></div>
    <div><Rocket size={18}/><strong>{t.futureTitle}</strong><p>{t.future}</p></div>
   </div>
   <Link href={pathFor(locale,"work")} className="evolve-founder-link">{locale==="ro"?"Vezi proiectele":locale==="ru"?"Посмотреть проекты":"Explore the work"}<ArrowUpRight size={17}/></Link>
  </div>
 </div></section>;
}
