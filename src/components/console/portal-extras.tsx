import {getDb} from "@/lib/server/db";
import {requireActor,clientIdsFor} from "@/lib/server/actor";
import {createReferralCode} from "@/lib/server/referrals";
import {submitClientBrief,requestDataDeletion,markAllNotificationsRead} from "@/lib/server/feature-actions";
import {markNotificationRead} from "@/lib/server/actions";
import {PageTitle,Metric,SectionPanel,DataTable,Empty,SmallLink,Status,shortDate} from "./primitives";
import {CreateForm,Field,ClientChoices} from "./forms";
import FileUploader from "./file-uploader";
import {storageReady} from "@/lib/server/storage";
import {Bell,Users} from "lucide-react";

export async function PortalExtraSection({section}:{section:string}){
 const actor=await requireActor(),db=getDb();
 const ids=await clientIdsFor(actor);
 const clients=await db.client.findMany({where:ids?{id:{in:ids}}:{},select:{id:true,name:true},orderBy:{name:"asc"}});
 const allowed=ids?{clientId:{in:ids}}:{};
 switch(section){
 case "onboarding":{
  const [briefs,documents]=await Promise.all([
   db.clientBrief.findMany({where:allowed,orderBy:{createdAt:"desc"},take:35,include:{client:{select:{name:true}}}}),
   db.document.findMany({where:{...allowed,visibility:"CLIENT"},orderBy:{createdAt:"desc"},take:30,include:{client:{select:{name:true}}}})
  ]);
  return <><PageTitle eyebrow="CLIENT PORTAL / GETTING STARTED" title="Project onboarding" description="Share an actionable project brief and upload your real brand materials securely. Your studio team will review them before any work is agreed."/>
   {clients.length?<><CreateForm action={submitClientBrief} title="Complete your project brief" button="Send brief to studio" description="Only authenticated members of the selected client account can submit a brief.">
    <ClientChoices clients={clients}/><Field name="title" label="Project / brand name"/><Field name="business" label="What does the business do?" type="textarea" rows={3}/><Field name="goals" label="Goals, important pages and essential features" type="textarea" rows={5}/><Field name="audience" label="Target audience" type="textarea" rows={2} required={false}/><Field name="inspiration" label="Websites or design references" type="textarea" rows={2} required={false}/><Field name="contentStatus" label="Are logo, text and photos ready?" required={false}/><Field name="notes" label="Additional details" type="textarea" rows={3} required={false}/>
   </CreateForm><FileUploader clients={clients} enabled={storageReady()}/></>:<Empty title="No client account yet" description="Create your account with Google first; the private workspace is generated during registration."/>}
   <SectionPanel title="Submitted briefs" description={briefs.length+" brief(s)"}>{briefs.length?<DataTable headers={["Project","Account","Goal","Submitted"]} rows={briefs.map(b=>[<strong key={b.id}>{b.title}</strong>,b.client.name,<span key={"g-"+b.id} title={b.goals} className="table-clamp">{b.goals}</span>,shortDate(b.createdAt)])}/>:<Empty title="Your first project brief" description="Complete the form above to help us understand your idea."/>}</SectionPanel>
   <SectionPanel title="Your shared documents" description="Up to 3 MB per file, accessible to authorized client members and studio staff.">{documents.length?<DataTable headers={["File","Client","Uploaded","Download"]} rows={documents.map(d=>[<strong key={d.id}>{d.filename}</strong>,d.client.name,shortDate(d.createdAt),<a className="small-link" key={"d-"+d.id} href={"/api/storage/"+d.id}>Download ↗</a>])}/>:<Empty title="No files uploaded yet" description="Upload your logo, brief, text or photos using the secure form above."/>}</SectionPanel>
  </>;
 }
 case "notifications":{
  const notes=await db.notification.findMany({where:{userId:actor.id},orderBy:{createdAt:"desc"},take:100});
  const unread=notes.filter(n=>!n.readAt).length;
  return <><PageTitle eyebrow="CLIENT PORTAL / INBOX" title="Notifications" description="Project activity, support updates and account messages delivered inside your private workspace."/>
    <div className="metric-grid"><Metric label="Unread" value={unread} icon={Bell}/><Metric label="Recent messages" value={notes.length}/></div>
    {unread>0&&<form action={markAllNotificationsRead}><button className="workspace-submit" type="submit">Mark all as read ✓</button></form>}
    <SectionPanel title="Notification history">{notes.length?<div className="ticket-stack">{notes.map(n=><div className="ticket-card portal-alert" key={n.id}><div><strong>{n.title}</strong><small>{shortDate(n.createdAt)} · {n.readAt?"Read":"Unread"}</small>{n.href?.startsWith("/portal")&&<SmallLink href={n.href}>Open details</SmallLink>}</div>{!n.readAt&&<form action={markNotificationRead}><input type="hidden" name="id" value={n.id}/><button className="workspace-submit" type="submit">Mark read</button></form>}</div>)}</div>:<Empty title="No notifications" description="Updates about your projects and support conversations will appear here."/>}</SectionPanel>
  </>;
 }
 case "privacy":{
  const requests=await db.privacyRequest.findMany({where:{userId:actor.id},orderBy:{createdAt:"desc"},take:40});
  return <><PageTitle eyebrow="CLIENT PORTAL / DATA" title="Privacy & data" description="Access your own account-linked personal data and ask for erasure after identity and retention checks."/>
   <SectionPanel title="Export your data"><p className="console-muted">Download a JSON file containing your account, submissions, authored messages and briefs. Other client accounts and their private records are excluded.</p><a className="workspace-submit" href="/api/privacy/export" download>Export my personal data ↓</a></SectionPanel>
   <CreateForm action={requestDataDeletion} title="Request personal data erasure" button="Submit deletion request" description="This is a request, not immediate deletion. We verify your identity and legal retention obligations before taking action.">
    <Field name="note" label="Details / reason (optional)" required={false} type="textarea" rows={3}/>
   </CreateForm>
   <SectionPanel title="My privacy requests">{requests.length?<DataTable headers={["Request","Submitted","Status"]} rows={requests.map(r=>[r.kind,shortDate(r.createdAt),<Status key={r.id} value={r.status}/>])}/>:<Empty title="No requests" description="You have not submitted an erasure request."/>}</SectionPanel>
   <p className="console-muted">For urgent privacy issues: <a href="mailto:sites.evolve7@gmail.com">sites.evolve7@gmail.com</a>.</p>
  </>;
 }
 case "referrals":{
  const available=clients.map(c=>({...c,token:createReferralCode(c.id)})).filter((x):x is typeof x & {token:string}=>Boolean(x.token));
  const counts=await Promise.all(available.map(c=>db.lead.count({where:{referralCode:c.token}})));
  const [program,rewards]=await Promise.all([
   db.referralProgram.findUnique({where:{id:"main"},select:{enabled:true,benefitDescription:true}}),
   db.referralReward.findMany({where:{clientId:{in:clients.map(c=>c.id)}},orderBy:{createdAt:"desc"},take:90,select:{id:true,clientId:true,status:true,benefitDescription:true,createdAt:true}})
  ]);
  return <><PageTitle eyebrow="CLIENT PORTAL / PARTNERS" title="My referrals" description="Share your own referral link. New quote enquiries submitted through the link are attributed to this client account. No automatic payment, credit or reward is promised."/>
   <div className="metric-grid"><Metric label="Referrals recorded" value={counts.reduce((n,x)=>n+x,0)} icon={Users}/><Metric label="Referral links" value={available.length}/></div>
   <SectionPanel title="Referral benefits"><p className="console-muted">{program?.enabled?
   "Active referral benefit: "+program.benefitDescription:
   "The studio has not activated a reward offer yet. Referrals are tracked, but benefits are not promised until the owner publishes clear terms."}</p>
   {rewards.length>0&&<DataTable headers={["Date","Benefit","Status"]} rows={rewards.map(r=>[shortDate(r.createdAt),r.benefitDescription,<Status key={r.id} value={r.status}/>])}/>}
   </SectionPanel><SectionPanel title="Share a recommendation">{available.length?<div className="entity-grid">{available.map((c,i)=><article key={c.id} className="entity-card"><div className="entity-meta"><span>{c.name}</span><Status value="ACTIVE"/></div><strong>{counts[i]} quote enquiries attributed</strong><p>The recipient can explore the cost estimator before submitting a quote enquiry.</p><a className="small-link referral-url" href={"https://sitesevolve.com/ro/quote?ref="+encodeURIComponent(c.token)} rel="noopener noreferrer" target="_blank">https://sitesevolve.com/ro/quote?ref={c.token}</a></article>)}</div>:<Empty title="Referral links unavailable" description="Sign in with a client account. Private referral tokens require the existing secure authentication secret."/>}</SectionPanel>
  </>;
 }
 default:return null;
 }
}
