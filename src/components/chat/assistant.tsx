"use client";
import {useEffect,useRef,useState} from "react";
import {X,Send,Sparkles,ShieldCheck,MessageCircle,RotateCcw} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type {Locale} from "@/lib/site";
type Message={role:"assistant"|"user";text:string};
type Mode="ai"|"knowledge-base"|null;
const langs={
 en:{intro:"Hi! Tell me about your project and I'll help you find the right solution.",title:"Studio assistant",subAI:"AI assistant · remembers this conversation",subLocal:"Studio knowledge · contextual answers",subStart:"Here to help with your project",placeholder:"Ask a question...",status:"Please don't share passwords or payment information.",open:"Chat with us",reset:"New conversation",error:"I couldn't respond right now. Please try again or email contact@sitesevolve.com."},
 ro:{intro:"Salut! Spune-mi ce vrei să construiești și găsim împreună soluția potrivită.",title:"Asistentul studioului",subAI:"Asistent AI · păstrează contextul discuției",subLocal:"Informații studio · răspunsuri contextuale",subStart:"Aici pentru proiectul tău",placeholder:"Scrie o întrebare...",status:"Nu trimite parole sau date bancare.",open:"Discută cu noi",reset:"Conversație nouă",error:"Nu am putut răspunde acum. Mai încearcă sau scrie la contact@sitesevolve.com."},
 ru:{intro:"Здравствуйте! Расскажите о проекте — помогу найти подходящее решение.",title:"Ассистент студии",subAI:"ИИ-ассистент · учитывает контекст",subLocal:"База знаний · ответы с контекстом",subStart:"Помогу с вашим проектом",placeholder:"Задайте вопрос...",status:"Не отправляйте пароли или данные банковских карт.",open:"Написать нам",reset:"Новый разговор",error:"Сейчас не удалось ответить. Попробуйте снова или напишите на contact@sitesevolve.com."}
};
const conversationKey=(locale:Locale)=>"sites-evolve-chat-v2-"+locale;
function linked(text:string){
 return text.replace(/(^|[\s(])((?:\/(?:en|ro|ru)\/[a-z-]+)|\/login)(?=$|[\s).,!])/g,"$1[$2]($2)");
}
export default function AssistantWidget({locale}:{locale:Locale}){
 const t=langs[locale];
 const [open,setOpen]=useState(false),[input,setInput]=useState(""),[working,setWorking]=useState(false);
 const [messages,setMessages]=useState<Message[]>([{role:"assistant",text:t.intro}]);
 const [mode,setMode]=useState<Mode>(null);
 const [hydrated,setHydrated]=useState(false);
 const bottom=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let restored:Message[]|null=null;
  try{
   const raw=sessionStorage.getItem(conversationKey(locale));
   if(raw){
    const parsed:unknown=JSON.parse(raw);
    if(Array.isArray(parsed)&&parsed.length>0&&parsed.length<=18&&parsed.every((m):m is Message=>!!m&&typeof m==="object"&&("role" in m)&&(m.role==="assistant"||m.role==="user")&&("text" in m)&&typeof m.text==="string"&&m.text.length<=2600)){
     restored=parsed;
    }
   }
  }catch{/* Session storage may be unavailable in private browsing. */}
  queueMicrotask(()=>{if(restored)setMessages(restored);setHydrated(true);});
 },[locale]);
 useEffect(()=>{
  if(!hydrated)return;
  try{sessionStorage.setItem(conversationKey(locale),JSON.stringify(messages.slice(-18)))}catch{/* Non-critical */}
 },[messages,locale,hydrated]);
 useEffect(()=>{if(open)bottom.current?.scrollIntoView({behavior:"smooth",block:"end"});},[messages,open]);
 function reset(){setMessages([{role:"assistant",text:t.intro}]);setMode(null);setInput("");try{sessionStorage.removeItem(conversationKey(locale))}catch{/* Non-critical */}}
 async function submit(e:React.FormEvent){
  e.preventDefault();
  const value=input.trim().slice(0,900);
  if(!value||working)return;
  const history=messages.slice(1).slice(-12).map(({role,text})=>({role,text}));
  setInput("");
  setMessages(m=>[...m,{role:"user",text:value}]);
  setWorking(true);
  try{
   const resp=await fetch("/api/assistant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:value,locale,history})});
   const data=await resp.json();
   if(!resp.ok||typeof data.answer!=="string"||!data.answer.trim())throw new Error("Assistant unavailable");
   setMode(data.mode==="ai"?"ai":"knowledge-base");
   setMessages(m=>[...m,{role:"assistant",text:data.answer.slice(0,2600)}]);
  }catch{
   setMessages(m=>[...m,{role:"assistant",text:t.error}]);
  }finally{setWorking(false)}
 }
 return <div className="assistant-container">
  {open&&<section className="assistant-window" role="dialog" aria-label={t.title}>
   <header className="assistant-header">
    <div className="assistant-header-icon"><Sparkles size={20}/></div>
    <div><strong>{t.title}</strong><small>{mode==="ai"?t.subAI:mode==="knowledge-base"?t.subLocal:t.subStart}</small></div>
    <button type="button" aria-label={t.reset} title={t.reset} onClick={reset} disabled={working}><RotateCcw size={17}/></button>
    <button type="button" aria-label="Close chat" onClick={()=>setOpen(false)}><X size={20}/></button>
   </header>
   <div className="assistant-messages" aria-live="polite">
    {messages.map((m,i)=><div className={"assistant-message "+(m.role==="user"?"message-user":"message-bot")} key={i}>
      <ReactMarkdown components={{a:({href,children})=><a href={href} rel="nofollow noopener">{children}</a>}}>{linked(m.text)}</ReactMarkdown>
    </div>)}
    {working&&<div className="assistant-typing" aria-label="Assistant is thinking"><span/><span/><span/></div>}
    <div ref={bottom}/>
   </div>
   <form className="assistant-inputbar" onSubmit={submit}>
    <input value={input} onChange={e=>setInput(e.target.value)} placeholder={t.placeholder} aria-label={t.placeholder} maxLength={900}/>
    <button type="submit" aria-label="Send message" disabled={working||!input.trim()}><Send size={17}/></button>
   </form>
   <div className="assistant-disclaimer"><ShieldCheck size={12}/>{t.status}</div>
  </section>}
  <button type="button" className={"assistant-fab "+(open?"fab-open":"")} onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?"Close assistant":t.open}>{open?<X size={22}/>:<MessageCircle size={23}/>}<span>{open?"":t.open}</span></button>
 </div>;
}