import Link from "next/link";
import {getDb} from "@/lib/server/db";
import {requireStaff} from "@/lib/server/actor";
import {PageTitle,Empty,SectionPanel,shortDate} from "./primitives";
import {MessageSquareText,LockKeyhole,UserRound,Search} from "lucide-react";

const LIMIT=24;
export async function ChatArchive({page=1,query=""}:{page?:number;query?:string}){
 await requireStaff();
 const db=getDb(),q=query.trim().slice(0,80);
 const where=q?{OR:[
  {messages:{some:{text:{contains:q,mode:"insensitive" as const}}}},
  {user:{email:{contains:q,mode:"insensitive" as const}}}
 ]}:{};
 const [total,sessions]=await Promise.all([
  db.chatSession.count({where}),
  db.chatSession.findMany({
   where,
   orderBy:{updatedAt:"desc"},
   skip:(page-1)*LIMIT,take:LIMIT,
   include:{
    user:{select:{name:true,email:true}},
    messages:{orderBy:[{createdAt:"asc"},{id:"asc"}],select:{id:true,role:true,text:true,createdAt:true}}
   }
  })
 ]);
 const pages=Math.max(1,Math.ceil(total/LIMIT));
 const href=(next:number)=>"/console/conversations?"+new URLSearchParams({page:String(next),...(q?{q}:{})}).toString();
 return <div className="chat-archive">
  <PageTitle eyebrow="BUSINESS / AI ASSISTANT" title="AI conversations" description="Private transcript history for people who accepted chat archiving. No messages from before this feature was activated."/>
  <div className="chat-archive-banner"><LockKeyhole size={20}/><p>Only authorized studio staff can view these conversations. Do not use private visitor content for marketing without an appropriate lawful basis. Transcripts are automatically scheduled for deletion after 90 days.</p></div>
  <SectionPanel title={"Chat history · "+total+" conversation"+(total===1?"":"s")}>
   <form method="get" action="/console/conversations" className="chat-archive-search">
    <Search size={17}/><input type="search" name="q" maxLength={80} defaultValue={q} placeholder="Search messages or verified customer email…" aria-label="Search conversations"/>
    <button type="submit">Search</button>
   </form>
   {sessions.length?<div className="chat-archive-list">{sessions.map(s=>{
    const first=s.messages.find(m=>m.role==="user"),last=s.messages.at(-1);
    return <details className="chat-archive-item" key={s.id}>
     <summary><div className="chat-archive-title"><span className="chat-archive-icon"><MessageSquareText size={20}/></span><span><strong>{s.user?.name||s.user?.email||"Website visitor"}</strong><small>{s.user?.email||"Anonymous, no verified email"} · {s.locale.toUpperCase()} · {shortDate(s.updatedAt)}</small></span></div><div className="chat-archive-metadata"><span>{s.messages.length} messages</span><span>View conversation</span></div></summary>
     <div className="chat-archive-detail"><p className="chat-archive-preview"><UserRound size={15}/> {first?.text.slice(0,190)||"No user message"}</p>
      <div className="chat-archive-thread">{s.messages.map(m=><div key={m.id} className={"chat-archive-bubble "+(m.role==="user"?"is-visitor":"is-assistant")}><small>{m.role==="user"?"Visitor":"SITES EVOLVE AI"} · {new Intl.DateTimeFormat("ro-MD",{dateStyle:"short",timeStyle:"short",timeZone:"Europe/Chisinau"}).format(m.createdAt)}</small><p>{m.text}</p></div>)}</div>
      {last&&<small className="chat-archive-end">End of recorded conversation · {shortDate(last.createdAt)}</small>}
     </div>
    </details>;
   })}</div>:<Empty title={q?"No conversations match":"No chat conversations saved yet"} description={q?"Try searching for another phrase.":"Messages will appear here when visitors accept the chat disclosure and contact the AI assistant."}/>}
   {pages>1&&<nav className="chat-archive-pages" aria-label="Conversation pages">{page>1&&<Link href={href(page-1)}>← Newer</Link>}<span>Page {page} of {pages}</span>{page<pages&&<Link href={href(page+1)}>Older →</Link>}</nav>}
  </SectionPanel>
 </div>;
}
