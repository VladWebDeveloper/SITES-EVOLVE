"use client";
import {useEffect,useRef,useState} from "react";
import {X,Send,Sparkles,ShieldCheck,MessageCircle} from "lucide-react";
import type {Locale} from "@/lib/site";
type Message={role:"assistant"|"user";text:string};
const langs={
 en:{intro:"Hi! I'm the SITES EVOLVE assistant. Ask about our services, pricing and how we work.",title:"Studio assistant",sub:"AI when connected · knowledge base otherwise",placeholder:"Ask a question...",status:"Responses are informational. Do not share passwords or payment information.",open:"Chat with us"},
 ro:{intro:"Salut! Sunt asistentul SITES EVOLVE. Întreabă-mă despre servicii, prețuri și colaborare.",title:"Asistentul studioului",sub:"AI dacă este conectat · altfel baza de informații",placeholder:"Scrie o întrebare...",status:"Răspunsuri informative. Nu trimite parole sau date bancare.",open:"Discută cu noi"},
 ru:{intro:"Привет! Я ассистент SITES EVOLVE. Спросите об услугах, ценах и сотрудничестве.",title:"Ассистент студии",sub:"ИИ при подключении · иначе база знаний",placeholder:"Задайте вопрос...",status:"Ответы информационные. Не отправляйте пароли и банковские данные.",open:"Написать нам"}
};
export default function AssistantWidget({locale}:{locale:Locale}){
 const t=langs[locale];const [open,setOpen]=useState(false),[input,setInput]=useState(""),[working,setWorking]=useState(false),[messages,setMessages]=useState<Message[]>([{role:"assistant",text:t.intro}]);const bottom=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(open)bottom.current?.scrollIntoView({behavior:"smooth",block:"end"});},[messages,open]);
 async function submit(e:React.FormEvent){e.preventDefault();const value=input.trim().slice(0,900);if(!value||working)return;setInput("");setMessages(m=>[...m,{role:"user",text:value}]);setWorking(true);
 try{const resp=await fetch("/api/assistant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:value,locale})});const data=await resp.json();if(!resp.ok)throw new Error("temporarily unavailable");setMessages(m=>[...m,{role:"assistant",text:String(data.answer||"")||langs[locale].intro}]);}
 catch{setMessages(m=>[...m,{role:"assistant",text:locale==="ro"?"Asistentul este temporar indisponibil. Scrie la contact@sitesevolve.com.":locale==="ru"?"Ассистент временно недоступен. Напишите на contact@sitesevolve.com.":"The assistant is unavailable right now. Email contact@sitesevolve.com."}]);}
 finally{setWorking(false);}
 }
 return <div className="assistant-container">
 {open&&<section className="assistant-window" role="dialog" aria-label={t.title}><header className="assistant-header"><div className="assistant-header-icon"><Sparkles size={20}/></div><div><strong>{t.title}</strong><small>{t.sub}</small></div><button type="button" aria-label="Close chat" onClick={()=>setOpen(false)}><X size={20}/></button></header><div className="assistant-messages" aria-live="polite">{messages.map((m,i)=><div className={"assistant-message "+(m.role==="user"?"message-user":"message-bot")} key={i}>{m.text}</div>)}{working&&<div className="assistant-typing" aria-label="Assistant is thinking"><span/><span/><span/></div>}<div ref={bottom}/></div><form className="assistant-inputbar" onSubmit={submit}><input value={input} onChange={e=>setInput(e.target.value)} placeholder={t.placeholder} aria-label={t.placeholder} maxLength={900}/><button type="submit" aria-label="Send message" disabled={working||!input.trim()}><Send size={17}/></button></form><div className="assistant-disclaimer"><ShieldCheck size={12}/>{t.status}</div></section>}
 <button type="button" className={"assistant-fab "+(open?"fab-open":"")} onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?"Close assistant":t.open}>{open?<X size={22}/>:<MessageCircle size={23}/>}<span>{open?"":t.open}</span></button>
 </div>
}
