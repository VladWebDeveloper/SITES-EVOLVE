"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { copy } from "@/lib/copy";
import { contactEmail, pathFor, type Locale } from "@/lib/site";
export default function Shell({locale,children}:{locale:Locale;children:React.ReactNode}) {
 const [open,setOpen] = useState(false);
 const pathname=usePathname(); const t=copy[locale];
 const links=[["services",t.nav.services],["work",t.nav.work],["process",t.nav.process],["journal",t.nav.journal],["founder",t.nav.founder]];
 function localeLink(l:Locale){const parts=pathname.split("/").filter(Boolean);return "/"+[l,...parts.slice(1)].join("/");}
 return <div className="site-shell" lang={locale}>
  <header className="site-header"><div className="nav-wrap container">
    <Link className="brand" href={pathFor(locale)} aria-label="SITES EVOLVE home"><span className="brand-mark"><span/></span><span>SITES<span className="brand-light">EVOLVE</span><span className="brand-dot">.</span></span></Link>
    <nav className={`primary-nav ${open?"nav-open":""}`} aria-label="Main navigation">{links.map(([path,label])=><Link key={path} href={pathFor(locale,path)} onClick={()=>setOpen(false)} className={pathname.includes("/"+path)?"active":""}>{label}</Link>)}<Link className="nav-mobile-contact" href={pathFor(locale,"contact")} onClick={()=>setOpen(false)}>{t.nav.contact}</Link></nav>
    <div className="nav-actions"><div className="language-switch" aria-label="Language">{(["en","ro","ru"] as Locale[]).map(l=><Link key={l} href={localeLink(l)} aria-label={`Switch language to ${l}`} className={l===locale?"selected":""}>{l.toUpperCase()}</Link>)}</div><Link className="nav-cta" href={pathFor(locale,"quote")}>{t.cta}<ArrowUpRight size={15}/></Link><button className="menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={24}/>:<Menu size={24}/>}</button></div>
  </div></header>
  <main id="main">{children}</main>
  <footer className="footer"><div className="container"><div className="footer-top"><div><div className="footer-brand">SITES EVOLVE<span>.</span></div><p>{t.footerText}</p></div><div className="footer-links"><div><strong>EXPLORE</strong><Link href={pathFor(locale,"services")}>{t.nav.services}</Link><Link href={pathFor(locale,"work")}>{t.nav.work}</Link><Link href={pathFor(locale,"journal")}>{t.nav.journal}</Link><Link href={pathFor(locale,"founder")}>{t.nav.founder}</Link></div><div><strong>CONNECT</strong><a href={`mailto:${contactEmail}`}>{contactEmail}</a><a href="https://github.com/VladWebDeveloper" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13}/></a><Link href={pathFor(locale,"contact")}>{t.nav.contact}</Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SITES EVOLVE. {t.copyright}</span><span>{t.footNote}</span><span><Link href={pathFor(locale,"privacy")}>Privacy</Link> · <Link href={pathFor(locale,"terms")}>Terms</Link></span></div></div></footer>
 </div>;
}
