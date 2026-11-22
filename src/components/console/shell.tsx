"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import type {Locale} from "@/lib/site";
import {WorkspaceLocale,translateUI} from "@/components/console/workspace-i18n";
import {signOut} from "next-auth/react";
import {BrandLogo} from "@/components/brand/logo";
import AssistantWidget from "@/components/chat/assistant";
import {LayoutDashboard,Users,BriefcaseBusiness,Inbox,MessagesSquare,BookOpen,Wallet,Globe2,Zap,CalendarDays,Settings,FolderOpen,Receipt,ClipboardList,Menu,X,ArrowUpRight,LogOut,ChevronRight,} from "lucide-react";
const consoleLinks=[
 ["","Overview",LayoutDashboard],["leads","CRM & Leads",Inbox],["conversations","AI conversations",MessagesSquare],["tasks","Tasks & reminders",ClipboardList],["clients","Clients",Users],["projects","Projects",BriefcaseBusiness],["tickets","Support",MessagesSquare],["documents","Documents",FolderOpen],["content","Content & Blog",BookOpen],["briefs","Onboarding",FolderOpen],["experiments","A/B testing",Zap],["status","Public status",Globe2],["referrals","Referral benefits",Users],["privacy","Privacy requests",Settings],["finance","Finance",Wallet],["websites","Site Management",Globe2],["appointments","Appointments",CalendarDays],["automation","Automation",Zap],["settings","Settings",Settings]
] as const;
const portalLinks=[["","Overview",LayoutDashboard],["notifications","Notifications",Inbox],["onboarding","Get started",FolderOpen],["referrals","My referrals",Users],["privacy","Privacy & data",Settings],["requests","My requests",ClipboardList],["projects","My projects",BriefcaseBusiness],["tickets","Support",MessagesSquare],["documents","Files & deliverables",FolderOpen],["billing","Billing",Receipt],["websites","My websites",Globe2]] as const;
export function WorkspaceShell({area,actor,children,locale}:{area:"console"|"portal";locale:Locale;actor:{name:string;email:string;role:string};children:React.ReactNode}){
 const [menu,setMenu]=useState(false);const [language,setLanguage]=useState<Locale>(locale);
 const router=useRouter();const pathname=usePathname();
 const switchLanguage=(next:Locale)=>{
  document.cookie="se-workspace-lang="+next+"; Max-Age=31536000; Path=/; SameSite=Lax";
  setLanguage(next);router.refresh();
 };
 const links=area==="console"?consoleLinks:portalLinks;
 return <WorkspaceLocale.Provider value={language}><div className="workspace-shell">
 <aside className={"workspace-sidebar "+(menu?"sidebar-open":"")}>
  <div className="workspace-brand"><Link href="/en" aria-label="SITES EVOLVE public website"><BrandLogo variant="workspace" priority/></Link><button onClick={()=>setMenu(false)} className="sidebar-close" aria-label="Close menu"><X size={22}/></button></div>
  <div className="sidebar-descriptor">{translateUI("PRIVATE BUSINESS PLATFORM",language)} <span>·</span> {area==="console"?"STUDIO":"CLIENT"}</div>
  <nav className="workspace-nav" aria-label={area==="console"?"Admin navigation":"Client navigation"}>{links.map(([slug,label,Icon])=>{
   const url="/"+area+(slug?"/"+slug:"");const active=pathname===url;
   return <Link href={url} key={slug} onClick={()=>setMenu(false)} className={active?"workspace-nav-link selected":"workspace-nav-link"}><Icon size={18} strokeWidth={1.8}/><span>{translateUI(label,language)}</span>{active&&<ChevronRight size={15} className="side-chevron"/>}</Link>
  })}</nav>
  <div className="sidebar-bottom"><div className="sidebar-status"><span className="status-pulse"/> {translateUI("PRIVATE & SECURE",language)}</div><Link className="sidebar-back" href="/en">← {translateUI("Public website",language)} <ArrowUpRight size={14}/></Link><button className="sidebar-logout" onClick={()=>signOut({redirectTo:"/en"})}><LogOut size={16}/> {translateUI("Sign out",language)}</button></div>
 </aside>
 <div className="workspace-main"><header className="workspace-topbar"><div className="workspace-top-left"><button className="workspace-menu-button" onClick={()=>setMenu(v=>!v)} aria-label="Open workspace menu"><Menu size={21}/></button><span className="breadcrumbs"><BrandLogo variant="mark"/><span className="workspace-breadcrumb-brand">SITES EVOLVE</span> <span>/</span> {translateUI(area==="console"?"BUSINESS CONSOLE":"CLIENT PORTAL",language)}</span></div><div className="workspace-top-user">
  <label className="workspace-language-label">
   <span className="sr-only">Interface language</span>
   <select value={language} onChange={e=>switchLanguage(e.target.value as Locale)} aria-label="Interface language" className="workspace-language-select">
    <option value="ro">RO</option><option value="en">EN</option><option value="ru">RU</option>
   </select>
  </label>
  <span className="workspace-user-text"><strong>{actor.name}</strong><small>{actor.role.toLowerCase()}</small></span><span className="workspace-avatar">{actor.name.slice(0,1).toUpperCase()}</span></div></header><div className="workspace-content">{children}</div><footer className="workspace-footer">SITES EVOLVE · SECURE WORKSPACE <span>© {new Date().getFullYear()}</span></footer></div>
 {menu&&<button onClick={()=>setMenu(false)} className="workspace-scrim" aria-label="Close navigation"/>}
 {area==="portal"&&<AssistantWidget locale={language}/>}
 </div></WorkspaceLocale.Provider>
}
