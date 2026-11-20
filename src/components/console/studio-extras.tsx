import {getDb} from "@/lib/server/db";
import {requireStaff} from "@/lib/server/actor";
import {createCrmTask,setCrmTaskDone,reviewPrivacyRequest,createPublicStatusEvent,resolvePublicStatusEvent,updateReferralProgram,setReferralRewardStatus} from "@/lib/server/feature-actions";
import {PageTitle,Metric,SectionPanel,DataTable,Empty,Status,shortDate} from "./primitives";
import {CreateForm,Field,StatusForm} from "./forms";
import {BellRing,CheckCircle2,ClipboardList,Target,TrendingUp} from "lucide-react";

const statuses=["NEW","CONTACTED","QUALIFIED","PROPOSAL","WON","LOST"] as const;
const statusText:Record<string,string>={NEW:"New",CONTACTED:"Contacted",QUALIFIED:"Qualified",PROPOSAL:"Proposal",WON:"Won",LOST:"Lost"};
type Lead={id:string;name:string;email:string;service:string;status:string;createdAt:Date};
export function CrmPipeline({leads}:{leads:Lead[]}){
 const closed=leads.filter(l=>l.status==="WON"||l.status==="LOST").length;
 const won=leads.filter(l=>l.status==="WON").length;
 const hot=leads.filter(l=>["QUALIFIED","PROPOSAL"].includes(l.status)).length;
 return <><div className="metric-grid"><Metric label="Leads in pipeline" value={leads.length} icon={ClipboardList}/><Metric label="Qualified & proposal" value={hot} icon={Target}/><Metric label="Won" value={won} icon={CheckCircle2}/><Metric label="Closed-win rate" value={closed?Math.round(won/closed*100)+"%":"—"} icon={TrendingUp} note="Won / (Won + Lost), excludes open leads"/></div>
  <SectionPanel title="Pipeline board" description="Live status groups. Update stages in the detailed CRM table below.">
   <div className="crm-pipeline" role="region" aria-label="CRM pipeline board" tabIndex={0}>
    {statuses.map(status=><div className="crm-column" key={status}><div className="crm-column-heading"><strong>{statusText[status]}</strong><span>{leads.filter(l=>l.status===status).length}</span></div>
      {leads.filter(l=>l.status===status).slice(0,30).map(l=><div className="crm-pipeline-card" key={l.id}><strong>{l.name}</strong><small>{l.service}</small><span>{shortDate(l.createdAt)}</span></div>)}
    </div>)}
   </div>
  </SectionPanel></>;
}
async function serverTime(){return Date.now();}
export async function ConsoleExtraSection({section}:{section:string}){
 const actor=await requireStaff(),db=getDb();
 switch(section){
 case "tasks":{
  const [tasks,leads]=await Promise.all([db.crmTask.findMany({orderBy:[{doneAt:"asc"},{dueAt:"asc"},{createdAt:"desc"}],take:200}),db.lead.findMany({select:{id:true,name:true,service:true},orderBy:{createdAt:"desc"},take:100})]);
  const now=await serverTime();const open=tasks.filter(t=>!t.doneAt),overdue=open.filter(t=>t.dueAt&&t.dueAt.getTime()<now);
  return <><PageTitle eyebrow="STUDIO / EXECUTION" title="Tasks & reminders" description="Track internal follow-ups, assign priority and close tasks. Scheduled reminders run only when the protected CRM scheduler is configured."/>
   <div className="metric-grid"><Metric label="Open tasks" value={open.length} icon={ClipboardList}/><Metric label="Overdue" value={overdue.length} icon={BellRing}/><Metric label="Completed" value={tasks.length-open.length} icon={CheckCircle2}/></div>
   <CreateForm action={createCrmTask} title="New task" button="Save task">
    <Field name="title" label="What needs to be done?"/><Field name="notes" label="Instructions (optional)" type="textarea" required={false}/><Field name="dueAt" label="Due date" type="date" required={false}/>
    <Field name="priority" label="Priority" options={["LOW","NORMAL","HIGH","URGENT"].map(v=>({value:v,label:v}))}/>
    <Field name="leadId" label="Related lead (optional)" options={[{value:"",label:"No lead"},...leads.map(l=>({value:l.id,label:l.name+" — "+l.service}))]} required={false}/>
   </CreateForm>
   <SectionPanel title="Task list" description={tasks.length+" task(s)"}>{tasks.length?<div className="studio-task-list">{tasks.map(task=><div key={task.id} className={"studio-task "+(task.doneAt?"done":"")}><div><strong>{task.title}</strong><p>{task.notes||"No notes"} · {task.dueAt?"Due "+shortDate(task.dueAt):"No deadline"}</p><Status value={task.priority}/>{!task.doneAt&&task.dueAt&&task.dueAt.getTime()<now&&<Status value="OVERDUE"/>}</div><form action={setCrmTaskDone}><input type="hidden" name="id" value={task.id}/><input type="hidden" name="done" value={task.doneAt?"false":"true"}/><button type="submit" className="workspace-submit">{task.doneAt?"Reopen":"Mark complete"}</button></form></div>)}</div>:<Empty title="No tasks" description="Create the first internal follow-up above."/>}</SectionPanel>
  </>;
 }
 case "briefs":{
  const briefs=await db.clientBrief.findMany({orderBy:{createdAt:"desc"},take:100,include:{client:{select:{name:true}}}});
  return <><PageTitle eyebrow="STUDIO / INTAKE" title="Client onboarding" description="Client-submitted project briefs and materials. Do not assume a brief is an approved contract."/><SectionPanel title="Incoming briefs">{briefs.length?<div className="studio-task-list">{briefs.map(b=><article key={b.id} className="studio-brief"><div><span className="console-kicker">{b.client.name} · {shortDate(b.createdAt)}</span><h3>{b.title}</h3></div><dl><dt>Business</dt><dd>{b.business}</dd><dt>Goals</dt><dd>{b.goals}</dd><dt>Audience</dt><dd>{b.audience||"—"}</dd><dt>Inspiration</dt><dd>{b.inspiration||"—"}</dd><dt>Content ready?</dt><dd>{b.contentStatus||"—"}</dd><dt>Other notes</dt><dd>{b.notes||"—"}</dd></dl></article>)}</div>:<Empty title="No onboarding briefs" description="Signed-in clients can submit their brief via /portal/onboarding."/>}</SectionPanel></>;
 }
 case "privacy":{
  const requests=await db.privacyRequest.findMany({orderBy:{createdAt:"desc"},take:100,include:{user:{select:{email:true,name:true}}}});
  return <><PageTitle eyebrow="STUDIO / PRIVACY" title="Personal data requests" description="Review identity and contractual retention requirements before any erasure. Changing status here does not delete personal records."/>
   <SectionPanel title="Erasure requests">{requests.length?<DataTable headers={["Customer","Type","Date","Status","Review"]} rows={requests.map(r=>[<div key={r.id}><strong>{r.user.name||r.user.email}</strong><small>{r.user.email}</small></div>,r.kind,shortDate(r.createdAt),<Status value={r.status} key={r.id}/>,<StatusForm key={"r-"+r.id} action={reviewPrivacyRequest} id={r.id} status={r.status} values={["PENDING","REVIEWING","CLOSED"]}/>])}/>:<Empty title="No privacy requests" description="Requests submitted by account holders appear here."/>}</SectionPanel></>;
 }
 case "referrals":{
  const [program,rewards,referrals]=await Promise.all([
   db.referralProgram.findUnique({where:{id:"main"}}),
   db.referralReward.findMany({include:{client:{select:{name:true}}},orderBy:{createdAt:"desc"},take:150}),
   db.lead.count({where:{referralCode:{not:null}}})
  ]);
  return <><PageTitle eyebrow="STUDIO / PARTNERS" title="Referral benefits" description="The owner defines actual referral benefits. Rewards are created once an attributed lead becomes WON, then reviewed and fulfilled manually."/>
   <div className="metric-grid"><Metric label="Referred enquiries" value={referrals}/><Metric label="Reward records" value={rewards.length}/><Metric label="Program active" value={program?.enabled?"YES":"NO"}/></div>
   {actor.role==="OWNER"&&<CreateForm action={updateReferralProgram} title="Configure referral benefit" button="Save referral policy" description="Only enable rewards that SITES EVOLVE is prepared to deliver.">
    <Field name="benefitDescription" label="Exact client benefit and eligibility conditions" type="textarea" rows={3} defaultValue={program?.benefitDescription||""}/>
    <label className="workspace-field"><span>Accept new rewards</span><input name="enabled" type="checkbox" defaultChecked={program?.enabled||false}/></label>
   </CreateForm>}
   <SectionPanel title="Attributed rewards">{rewards.length?<DataTable headers={["Client","Benefit","Status","Manage"]} rows={rewards.map(r=>[
    r.client.name,<div key={r.id}><strong>{r.benefitDescription}</strong><small>{shortDate(r.createdAt)} · Lead {r.leadId.slice(0,8)}</small></div>,
    <Status key={r.id} value={r.status}/>,<StatusForm key={"reward-"+r.id} id={r.id} status={r.status} action={setReferralRewardStatus} values={["PENDING","APPROVED","FULFILLED","VOID"]}/>
   ])}/>:<Empty title="No rewards issued yet" description="Create your policy and mark an attributed lead as WON before a reward is issued."/>}</SectionPanel>
  </>;
 }
 case "status":{
  const [events,samples]=await Promise.all([
   db.publicStatusEvent.findMany({orderBy:{occurredAt:"desc"},take:90}),
   db.platformHeartbeat.findMany({orderBy:{checkedAt:"desc"},take:96})
  ]);
  const uptime=samples.length?samples.filter(s=>s.ok).length+"/"+samples.length:"No samples";
  return <><PageTitle eyebrow="PUBLIC OPERATIONS / TRANSPARENCY" title="System status & release notes" description="Publish verified releases, maintenance announcements and incidents for the public. This panel never fabricates uptime."/>
   <div className="metric-grid"><Metric label="Recent successful samples" value={uptime}/><Metric label="Published events" value={events.length}/><Metric label="Open incidents" value={events.filter(e=>e.kind==="INCIDENT"&&e.state==="OPEN").length}/></div>
   <CreateForm action={createPublicStatusEvent} title="Publish status update" button="Publish update">
    <Field name="kind" label="Event type" options={[{value:"RELEASE",label:"Product release"},{value:"MAINTENANCE",label:"Maintenance"},{value:"INCIDENT",label:"Service incident"}]}/>
    <Field name="title" label="Verified title"/><Field name="details" label="What actually happened?" type="textarea" rows={4}/>
   </CreateForm>
   <SectionPanel title="Public history"><DataTable headers={["Type","Published","Details","State","Action"]} rows={events.map(e=>[
    e.kind,shortDate(e.occurredAt),<div key={e.id}><strong>{e.title}</strong><p>{e.details}</p></div>,<Status key={e.id} value={e.state}/>,
    e.kind==="INCIDENT"&&e.state==="OPEN"?<form action={resolvePublicStatusEvent} key={"resolve-"+e.id}><input name="id" value={e.id} type="hidden"/><button type="submit" className="workspace-submit">Mark resolved</button></form>:null
   ])}/></SectionPanel>
  </>;
 }
 case "experiments":{
  const data=await db.experimentMetric.groupBy({by:["variant","event"],where:{experiment:"homepage_cta_v1"},_count:{_all:true}});
  const count=(variant:string,event:string)=>data.find(x=>x.variant===variant&&x.event===event)?._count._all||0;
  const variants=["A","B"] as const;
  return <><PageTitle eyebrow="STUDIO / OPTIMIZATION" title="A/B testing" description="Consent-based homepage CTA experiment. We record anonymous impressions and clicks, not customer identities or sales."/>
   <div className="metric-grid">{variants.map(v=><Metric key={v} label={"Variant "+v+" CTR"} value={count(v,"impression")?Math.round(count(v,"click")/count(v,"impression")*1000)/10+"%":"—"} note={count(v,"impression")+" impressions · "+count(v,"click")+" CTA clicks"} icon={TrendingUp}/>)}</div>
   <SectionPanel title="Experiment methodology"><p className="console-muted">Variant A uses the original CTA. Variant B offers alternative copy. Participation requires explicit analytics consent; results are directional and do not substitute for confirmed project conversions. Large enough samples are necessary before choosing a winner.</p></SectionPanel>
  </>;
 }
 default:return null;
 }
}
