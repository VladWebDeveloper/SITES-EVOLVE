"use client";
import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {ArrowUpRight,Menu,X,CircleUserRound} from "lucide-react";
import {copy} from "@/lib/copy";
import {contactEmail,pathFor,type Locale} from "@/lib/site";
import AssistantWidget from "@/components/chat/assistant";
import {Preferences} from "@/components/ux/preferences";
import {BrandLogo} from "@/components/brand/logo";

export default function Shell({locale,children}:{locale:Locale;children:React.ReactNode}){
 const [open,setOpen]=useState(false);
 const path=usePathname(),t=copy[locale];
 const links=[["services",t.nav.services],["work",t.nav.work],["founder",t.nav.founder],["pricing",t.nav.pricing],["contact",t.nav.contact]];
 const portalLabel=locale==="ro"?"Portal clienți":locale==="ru"?"Кабинет":"Client portal";
 function localeLink(l:Locale){const bits=path.split("/").filter(Boolean);return "/"+[l,...bits.slice(1)].join("/");}
 return <div className="site-shell future-site-shell" lang={locale}>
  <header className="future-header"><div className="container future-nav">
   <Link href={pathFor(locale)} aria-label="SITES EVOLVE home" className="future-brand"><BrandLogo variant="header" priority/></Link>
   <nav aria-label="Main navigation" className={"future-main-nav "+(open?"future-nav-open":"")}>{links.map(([slug,label])=><Link className={path.startsWith("/"+locale+"/"+slug)?"active":""} href={pathFor(locale,slug)} key={slug} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="future-mobile-portal" href={"/login?lang="+locale} onClick={()=>setOpen(false)}><CircleUserRound size={18}/>{portalLabel}</Link><Link href={pathFor(locale,"quote")} className="future-mobile-cta" onClick={()=>setOpen(false)}>{t.cta}<ArrowUpRight size={17}/></Link></nav>
   <div className="future-nav-actions"><div className="future-language" aria-label="Language">{(["ro","en","ru"] as Locale[]).map(l=><Link key={l} href={localeLink(l)} aria-label={"Switch language to "+l} className={l===locale?"selected":""}>{l.toUpperCase()}</Link>)}</div><Link href={"/login?lang="+locale} className="future-portal-link" aria-label={portalLabel}><CircleUserRound size={17}/><span>{portalLabel}</span></Link><Link href={pathFor(locale,"quote")} className="future-nav-cta">{t.cta}<span><ArrowUpRight size={17}/></span></Link><button className="future-menu-trigger" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(s=>!s)}>{open?<X size={23}/>:<Menu size={23}/>}</button></div>
  </div></header>
  <main id="main">{children}</main>
  <footer className="future-footer"><div className="container"><div className="future-footer-top"><div className="future-footer-identity"><Link href={pathFor(locale)} className="future-footer-logo" aria-label="SITES EVOLVE home"><BrandLogo variant="footer"/></Link><p>{t.footerText}</p><a className="future-footer-email" href={"mailto:"+contactEmail}>{contactEmail}<ArrowUpRight size={17}/></a></div><div className="future-footer-nav"><div><strong>{locale==="ro"?"EXPLOREAZĂ":locale==="ru"?"НАВИГАЦИЯ":"EXPLORE"}</strong>{links.filter(([slug])=>slug!=="founder").map(([slug,label])=><Link key={slug} href={pathFor(locale,slug)}>{label}</Link>)}</div><div><strong>{locale==="ro"?"DESCOPERĂ":locale==="ru"?"УЗНАТЬ БОЛЬШЕ":"DISCOVER"}</strong><Link href={pathFor(locale,"journal")}>{t.nav.journal}</Link><Link href={pathFor(locale,"consultation")}>{locale==="ro"?"Consultație":locale==="ru"?"Консультация":"Consultation"}</Link><Link href={"/login?lang="+locale}>{locale==="ro"?"Portal clienți":locale==="ru"?"Кабинет клиента":"Client portal"}</Link></div></div></div><div className="future-footer-bottom"><span>© {new Date().getFullYear()} SITES EVOLVE. {t.copyright}</span><span>CHIȘINĂU · WORLDWIDE</span><div><Link href={pathFor(locale,"privacy")}>{locale==="ro"?"Confidențialitate":locale==="ru"?"Конфиденциальность":"Privacy"}</Link><button type="button" onClick={()=>window.dispatchEvent(new Event("se:privacy-options"))}>{locale==="ro"?"Cookie-uri":locale==="ru"?"Cookie":"Cookies"}</button><Link href={pathFor(locale,"terms")}>{locale==="ro"?"Termeni":locale==="ru"?"Условия":"Terms"}</Link></div></div></div></footer>
  <Preferences locale={locale}/>
  <AssistantWidget key={locale} locale={locale}/>
 </div>;
}