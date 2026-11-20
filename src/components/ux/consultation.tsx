"use client";
import {useEffect,useState} from "react";
import {ArrowUpRight,CalendarClock,Download} from "lucide-react";
import type {Locale} from "@/lib/site";
import {contactEmail,services} from "@/lib/site";

const copy={
 ro:{
  title:"Programează consultația gratuită",intro:"Alege un interval disponibil; îl rezervăm imediat în calendar. Toate orele sunt afișate pentru Chișinău (Europe/Chișinău).",
  name:"Numele tău",email:"Email",service:"Despre ce discutăm?",method:"Formatul consultației",
  online:"Apel video online",phone:"Apel telefonic",inPerson:"Întâlnire în Chișinău",
  date:"Data",time:"Ora disponibilă",select:"Alege o oră",loading:"Se verifică orele...",empty:"Nu sunt intervale libere pentru această dată. Alege altă zi.",
  notes:"Ce dorești să discutăm?",send:"Confirmă programarea",submitting:"Rezervare...",
  confirmed:"Consultația este rezervată în calendar pentru 30 de minute.",emailed:"Confirmarea a fost trimisă pe email.",notEmailed:"Programarea este înregistrată, însă emailul nu s-a putut livra. Salvează fișierul de calendar.",
  ics:"Adaugă în calendar (.ics)",error:"Rezervarea nu a reușit. Verifică intervalul sau contactează-ne direct.",conflict:"Intervalul a fost ocupat între timp. Alege altă oră.",timezone:"Ora Chișinăului · disponibil 24/7",topic:"Alege un serviciu"
 },
 en:{
  title:"Book your free consultation",intro:"Choose an available time; it is reserved immediately. All times are shown in Chișinău time (Europe/Chișinău).",
  name:"Your name",email:"Email",service:"What is the topic?",method:"Meeting format",
  online:"Online video call",phone:"Phone call",inPerson:"In-person meeting in Chișinău",
  date:"Date",time:"Available time",select:"Choose a time",loading:"Checking availability...",empty:"No times available on this date. Pick another day.",
  notes:"What would you like to discuss?",send:"Confirm booking",submitting:"Reserving...",
  confirmed:"Your 30-minute consultation is reserved in the calendar.",emailed:"Confirmation email sent.",notEmailed:"Your booking is recorded, but email delivery was unavailable. Save the calendar file.",
  ics:"Add to calendar (.ics)",error:"Could not reserve the time. Choose another slot or contact us.",conflict:"That time was just booked. Please select another.",timezone:"Chișinău time · available 24/7",topic:"Choose a service"
 },
 ru:{
  title:"Записаться на бесплатную консультацию",intro:"Выберите свободное время — оно сразу бронируется. Все часы указаны по времени Кишинёва.",
  name:"Ваше имя",email:"Email",service:"Тема консультации",method:"Формат встречи",
  online:"Видеозвонок",phone:"Телефонный звонок",inPerson:"Личная встреча в Кишинёве",
  date:"Дата",time:"Доступное время",select:"Выберите время",loading:"Проверяем доступность...",empty:"На выбранную дату свободного времени нет. Выберите другую дату.",
  notes:"О чём хотите поговорить?",send:"Подтвердить запись",submitting:"Бронирование...",
  confirmed:"Ваша 30-минутная консультация забронирована.",emailed:"Письмо с подтверждением отправлено.",notEmailed:"Бронирование сохранено, но письмо не доставлено. Сохраните файл календаря.",
  ics:"Добавить в календарь (.ics)",error:"Не удалось записаться. Выберите другое время или свяжитесь с нами.",conflict:"Это время только что заняли. Выберите другое.",timezone:"Время Кишинёва · доступно 24/7",topic:"Выберите услугу"
 }
} as const;
type Slot={label:string;value:string};
function localToday(){
 return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Chisinau",year:"numeric",month:"2-digit",day:"2-digit"})
  .format(new Date());
}
export default function Consultation({locale}:{locale:Locale}){
 const t=copy[locale], [date,setDate]=useState(""),[slots,setSlots]=useState<Slot[]>([]),
 [slotTime,setSlotTime]=useState(""),[loading,setLoading]=useState(false),
 [state,setState]=useState<"idle"|"confirmed"|"error"|"conflict">("idle"),
 [pending,setPending]=useState(false),[icsUrl,setIcsUrl]=useState(""),[emailed,setEmailed]=useState(false);
 useEffect(()=>{
  if(!date)return;
  let active=true;
  const abort=new AbortController();
  void (async()=>{
   try{
    const response=await fetch("/api/appointments/slots?date="+encodeURIComponent(date),{signal:abort.signal,cache:"no-store"});
    if(!response.ok)throw Error("Availability unavailable");
    const data=await response.json() as {slots:Slot[]};
    if(active){setSlots(Array.isArray(data.slots)?data.slots:[]);setLoading(false)}
   }catch{if(active){setSlots([]);setLoading(false)}}
  })();
  return()=>{active=false;abort.abort()};
 },[date]);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!slotTime)return;
  setPending(true);setState("idle");setIcsUrl("");
  const form=e.currentTarget,fields=new FormData(form);
  const name=String(fields.get("name")||""),email=String(fields.get("email")||""),
   service=String(fields.get("service")||""),notes=String(fields.get("notes")||""),
   mode=String(fields.get("method")||"online");
  try{
   const response=await fetch("/api/appointments",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,email,service,notes:"Preferred format: "+mode+"\n"+notes,preferredAt:slotTime,website:fields.get("website")||""})
   });
   if(response.status===409){setState("conflict");setDate("");setSlotTime("");return}
   if(!response.ok)throw Error("Failed booking");
   const result=await response.json() as {confirmed:boolean;icsUrl?:string;emailSent?:boolean};
   if(!result.confirmed)throw Error("Booking was not confirmed");
   setIcsUrl(result.icsUrl?.startsWith("https://sitesevolve.com/api/appointments/")?result.icsUrl:"");
   setEmailed(Boolean(result.emailSent));setState("confirmed");form.reset();
   setSlots([]);setSlotTime("");setDate("");
  }catch{setState("error")}finally{setPending(false)}
 }
 return <section className="section-padding consultation-section"><div className="container consultation-grid">
  <div><span className="eyebrow"><span className="eyebrow-line"/> DISCOVERY CALL / SITES EVOLVE</span>
   <h1>{t.title}<em>.</em></h1><p>{t.intro}</p>
   <div className="consultation-note"><CalendarClock size={26}/><span>{t.timezone}</span></div>
   <a className="contact-email" href={"mailto:"+contactEmail}>{contactEmail}<ArrowUpRight size={20}/></a>
  </div>
  <form onSubmit={submit} className="contact-form consultation-form">
   <div className="form-fields">
    <label>{t.name}<input name="name" autoComplete="name" maxLength={100} required/></label>
    <label>{t.email}<input name="email" type="email" autoComplete="email" maxLength={180} required/></label>
    <label>{t.service}<select name="service" defaultValue=""><option value="">{t.topic}</option>{services[locale].map(s=><option key={s.id} value={s.title}>{s.title}</option>)}</select></label>
    <label>{t.method}<select name="method" defaultValue="online" required><option value="online">{t.online}</option><option value="phone">{t.phone}</option><option value="in_person">{t.inPerson}</option></select></label>
    <label>{t.date}<input type="date" value={date} min={localToday()} onChange={e=>{setLoading(true);setDate(e.target.value);setSlots([]);setSlotTime("");setState("idle")}} required/></label>
    <label>{t.time}<select value={slotTime} onChange={e=>setSlotTime(e.target.value)} disabled={!date||loading||slots.length===0} required>
     <option value="">{loading?t.loading:t.select}</option>
     {slots.map(s=><option key={s.value} value={s.value}>{s.label} · Chișinău</option>)}
    </select></label>
    {date&&!loading&&slots.length===0&&<p role="status" className="form-status field-full">{t.empty}</p>}
    <label className="field-full">{t.notes}<textarea name="notes" required minLength={10} maxLength={3900} rows={5}/></label>
    <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
   </div>
   <button disabled={pending||!slotTime} type="submit" className="action action-primary">
    {pending?t.submitting:t.send}<ArrowUpRight size={17}/>
   </button>
   {state==="confirmed"&&<div role="status" className="consultation-success"><strong>{t.confirmed}</strong>
    <p>{emailed?t.emailed:t.notEmailed}</p>
    {icsUrl&&<a href={icsUrl} className="action action-secondary"><Download size={17}/>{t.ics}</a>}</div>}
   {(state==="error"||state==="conflict")&&<p role="alert" className="form-status">{state==="conflict"?t.conflict:t.error}</p>}
  </form>
 </div></section>;
}
