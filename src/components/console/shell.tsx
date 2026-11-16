"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut} from "next-auth/react";
import {LayoutDashboard,Users,BriefcaseBusiness,Inbox,MessagesSquare,BookOpen,Wallet,Globe2,Zap,CalendarDays,Settings,FolderOpen,Receipt,Menu,X,ArrowUpRight,LogOut,ChevronRight,} from "lucide-react";
const consoleLinks=[
 ["","Overview",LayoutDashboard],["leads","CRM & Leads",Inbox],["clients","Clients",Users],["projects","Projects",BriefcaseBusiness],["tickets","Support",MessagesSquare],["documents","Documents",FolderOpen],["content","Content & Blog",BookOpen],["finance","Finance",Wallet],["websites","Site Management",Globe2],["appointments","Appointments",CalendarDays],["automation","Automation",Zap],["settings","Settings",Settings]
] as const;
const portalLinks=[["","Overview",LayoutDashboard],["projects","My projects",BriefcaseBusiness],["tickets","Support",MessagesSquare],["documents","Files & deliverables",FolderOpen],["billing","Billing",Receipt],["websites","My websites",Globe2]] as const;
export function WorkspaceShell({area,actor,children}:{area:"console"|"portal";actor:{name:string;email:string;role:string};children:React.ReactNode}){
 const [menu,setMenu]=useState(false);const pathname=usePathname();const links=area==="console"?consoleLinks:portalLinks;
 return <div className="workspace-shell">
 <aside className={"workspace-sidebar "+(menu?"sidebar-open":"")}>
  <div className="workspace-brand"><Link href="/en">SITES<span>EVOLVE.</span></Link><button onClick={()=>setMenu(false)} className="sidebar-close" aria-label="Close menu"><X size={22}/></button></div>
  <div className="sidebar-descriptor">PRIVATE BUSINESS PLATFORM <span>·</span> {area==="console"?"STUDIO":"CLIENT"}</div>
  <nav className="workspace-nav" aria-label={area==="console"?"Admin navigation":"Client navigation"}>{links.map(([slug,label,Icon])=>{
   const url="/"+area+(slug?"/"+slug:"");const active=pathname===url;
   return <Link href={url} key={slug} onClick={()=>setMenu(false)} className={active?"workspace-nav-link selected":"workspace-nav-link"}><Icon size={18} strokeWidth={1.8}/><span>{label}</span>{active&&<ChevronRight size={15} className="side-chevron"/>}</Link>
  })}</nav>
  <div className="sidebar-bottom"><div className="sidebar-status"><span className="status-pulse"/> PRIVATE & SECURE</div><Link className="sidebar-back" href="/en">← Public website <ArrowUpRight size={14}/></Link><button className="sidebar-logout" onClick={()=>signOut({redirectTo:"/en"})}><LogOut size={16}/> Sign out</button></div>
 </aside>
 <div className="workspace-main"><header className="workspace-topbar"><div className="workspace-top-left"><button className="workspace-menu-button" onClick={()=>setMenu(v=>!v)} aria-label="Open workspace menu"><Menu size={21}/></button><span className="breadcrumbs">SITES EVOLVE <span>/</span> {area==="console"?"BUSINESS CONSOLE":"CLIENT PORTAL"}</span></div><div className="workspace-top-user"><span className="workspace-user-text"><strong>{actor.name}</strong><small>{actor.role.toLowerCase()}</small></span><span className="workspace-avatar">{actor.name.slice(0,1).toUpperCase()}</span></div></header><div className="workspace-content">{children}</div><footer className="workspace-footer">SITES EVOLVE · SECURE WORKSPACE <span>© {new Date().getFullYear()}</span></footer></div>
 {menu&&<button onClick={()=>setMenu(false)} className="workspace-scrim" aria-label="Close navigation"/>}
 </div>
}
