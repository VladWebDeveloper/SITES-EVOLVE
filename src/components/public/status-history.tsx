"use client";
import {useCallback,useEffect,useState} from "react";
import {Activity,CalendarClock,CheckCircle2,RefreshCw,ShieldAlert} from "lucide-react";
import type {Locale} from "@/lib/site";

type Sample={ok:boolean;checkedAt:string;responseMs:number;statusCode:number};
type Event={id:string;kind:"RELEASE"|"INCIDENT"|"MAINTENANCE";state:string;title:string;details:string;occurredAt:string;resolvedAt:string|null};
type Report={status:"operational"|"degraded";openIncidents:number;lastCheckedAt:string|null;mostRecentResponseMs:number|null;observation:{periodHours:number;successfulChecks:number;totalChecks:number;note:string};recentSamples:Sample[];events:Event[]};
const copy={
 ro:{online:"Sistemul funcționează",degraded:"Serviciu degradat",checking:"Verificare în curs...",history:"Istoric verificabil",releases:"Actualizări și incidente",samples:"Verificări în ultimele 24 de ore",successful:"reușite",observed:"Verificări înregistrate, nu un procent presupus de uptime.",none:"Nu există încă suficiente date de monitorizare.",refresh:"Actualizează",incident:"INCIDENT",release:"ACTUALIZARE",maintenance:"MENTENANȚĂ",resolved:"Rezolvat",open:"În desfășurare",latest:"Ultima verificare"},
 en:{online:"All monitored systems operational",degraded:"Service degraded",checking:"Checking live status...",history:"Verified check history",releases:"Updates & incidents",samples:"Checks in the last 24 hours",successful:"successful",observed:"Recorded samples, not an inferred uptime percentage.",none:"Monitoring samples are not yet available.",refresh:"Refresh",incident:"INCIDENT",release:"RELEASE",maintenance:"MAINTENANCE",resolved:"Resolved",open:"Ongoing",latest:"Last checked"},
 ru:{online:"Система работает",degraded:"Есть проблемы с сервисом",checking:"Проверяем статус...",history:"История проверок",releases:"Обновления и инциденты",samples:"Проверки за последние 24 часа",successful:"успешных",observed:"Только реальные проверки, без выдуманного процента доступности.",none:"Данных мониторинга пока недостаточно.",refresh:"Обновить",incident:"ИНЦИДЕНТ",release:"ОБНОВЛЕНИЕ",maintenance:"ОБСЛУЖИВАНИЕ",resolved:"Решено",open:"Активно",latest:"Последняя проверка"}
} as const;
export default function StatusLivePanel({locale}:{locale:Locale}){
 const t=copy[locale],[report,setReport]=useState<Report|null>(null),[health,setHealth]=useState<boolean|null>(null),
 [loading,setLoading]=useState(true),[checked,setChecked]=useState("");
 const refresh=useCallback(async()=>{
  setLoading(true);
  const results=await Promise.allSettled([
   fetch("/api/public/status",{cache:"no-store",signal:AbortSignal.timeout(9000)}),
   fetch("/api/health",{cache:"no-store",signal:AbortSignal.timeout(9000)})
  ]);
  if(results[0].status==="fulfilled"&&results[0].value.ok){
   try{setReport(await results[0].value.json() as Report)}catch{setReport(null)}
  }else setReport(null);
  if(results[1].status==="fulfilled")setHealth(results[1].value.ok);
  else setHealth(false);
  setChecked(new Date().toLocaleString());
  setLoading(false);
 },[]);
 useEffect(()=>{const first=window.setTimeout(()=>void refresh(),0);const timer=window.setInterval(()=>void refresh(),60_000);return()=>{window.clearTimeout(first);window.clearInterval(timer)}},[refresh]);
 const degraded=health===false||report?.status==="degraded",working=health===true&&!degraded;
 return <div className="growth-status-live">
  <div className="growth-status-card" role="status">
   <span className={"growth-status-dot "+(working?"online":degraded?"offline":"")}/>
   <div><span>https://sitesevolve.com</span><h2>{loading&&health===null?t.checking:degraded?t.degraded:working?t.online:t.checking}</h2>
    <p>{t.latest}: {report?.lastCheckedAt?new Date(report.lastCheckedAt).toLocaleString():checked||t.checking}</p>
   </div><button type="button" onClick={()=>void refresh()} disabled={loading} aria-label={t.refresh}><RefreshCw size={19}/></button>
  </div>
  <section className="growth-status-history">
   <div className="growth-status-head"><h2><Activity size={24}/>{t.history}</h2><p>{t.observed}</p></div>
   {report&&report.observation.totalChecks>0?
    <div className="growth-monitor-checks"><div><strong>{report.observation.successfulChecks}/{report.observation.totalChecks}</strong><span>{t.samples} · {t.successful}</span></div>
     <div className="growth-monitor-samples" role="list" aria-label={t.samples}>{report.recentSamples.map((s,i)=><span key={i} role="listitem" className={s.ok?"good":"down"} title={(s.ok?"HTTP "+s.statusCode:"Unavailable")+" · "+new Date(s.checkedAt).toLocaleString()+" · "+s.responseMs+"ms"}/>)}</div>
    </div>:<p className="growth-status-no-samples">{t.none}</p>}
   <h2 className="growth-status-activity-title"><CalendarClock size={24}/>{t.releases}</h2>
   <div className="growth-public-timeline">{report?.events.length?report.events.map(e=><article key={e.id} className="growth-public-event">
    <span className={"growth-event-kind "+e.kind.toLowerCase()}>{e.kind==="RELEASE"?t.release:e.kind==="INCIDENT"?t.incident:t.maintenance}</span>
    <time dateTime={e.occurredAt}>{new Date(e.occurredAt).toLocaleString(locale==="ro"?"ro-RO":locale==="ru"?"ru-RU":"en-GB")}</time>
    <h3>{e.title}</h3><p>{e.details}</p>
    {e.kind==="INCIDENT"&&<span className="growth-event-state">{e.state==="RESOLVED"?<CheckCircle2 size={14}/>:<ShieldAlert size={14}/>} {e.state==="RESOLVED"?t.resolved:t.open}</span>}
   </article>):<p>{t.none}</p>}</div>
  </section>
 </div>;
}
