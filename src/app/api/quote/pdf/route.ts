import {NextResponse} from "next/server";
import {z} from "zod";
import {readFile} from "node:fs/promises";
import {join} from "node:path";
import {estimate,type QuoteInput} from "@/lib/estimator";
import {guardSize,jsonError,rateLimited,requesterKey} from "@/lib/server/security";
import type {TDocumentDefinitions,Content,TableCell} from "pdfmake/interfaces";

export const runtime="nodejs";
const schema=z.object({
  locale:z.enum(["ro","en","ru"]).default("ro"),
  kind:z.enum(["landing","web","commerce","app","ai"]),
  pages:z.number().int().min(1).max(30),
  extras:z.array(z.enum(["seo","multi","cms","care"])).max(4),
  timeline:z.enum(["standard","rush"]),
  contactName:z.string().trim().max(100).optional().default(""),
  businessName:z.string().trim().max(160).optional().default(""),
  notes:z.string().trim().max(1200).optional().default("")
}).strict().refine(data=>data.kind!=="landing"||data.pages===1,{message:"Landing pages contain exactly one page"});

const labels={
 ro:{
  subtitle:"PROPUNERE INDICATIVĂ DE PROIECT",date:"Emisă la",client:"Solicitant",company:"Afacere / brand",scope:"CONFIGURAȚIA PROIECTULUI",kind:"Tipul proiectului",pages:"Numărul paginilor",extras:"Funcții și servicii suplimentare",timeline:"Calendar estimativ",estimate:"INTERVAL DE BUGET ESTIMAT",notes:"Note privind proiectul",contact:"CONTACTEAZĂ-NE PENTRU OFERTA FINALĂ",disclaimer:"Acest document este o estimare orientativă, generată automat. Nu constituie o ofertă comercială fermă, factură sau contract. Prețul final, termenul și taxele aplicabile sunt stabilite după analiza cerințelor și confirmarea scrisă a ambelor părți.",landing:"Landing page",web:"Site de prezentare",commerce:"Magazin online",app:"Aplicație web",ai:"Automatizări AI",seo:"SEO avansat",multi:"3 limbi",cms:"Administrare conținut",care:"Mentenanță: 150 €/lună (separat)",standard:"Standard",rush:"Accelerat",none:"Fără opțiuni suplimentare",unknown:"Nespecificat",
 },
 en:{
  subtitle:"INDICATIVE PROJECT PROPOSAL",date:"Issued",client:"Requested by",company:"Business / brand",scope:"PROJECT SCOPE",kind:"Project type",pages:"Number of pages",extras:"Additional features and services",timeline:"Estimated timeline",estimate:"INDICATIVE BUDGET RANGE",notes:"Project notes",contact:"CONTACT US FOR YOUR FINAL QUOTE",disclaimer:"This is an automatically generated indicative estimate, not a binding commercial offer, invoice or contract. Final pricing, delivery times and applicable taxes are confirmed in writing after reviewing requirements.",landing:"Landing page",web:"Business website",commerce:"Online store",app:"Web application",ai:"AI automation",seo:"Advanced SEO",multi:"3 languages",cms:"Content management",care:"Monthly website care: €150/month (separate)",standard:"Standard",rush:"Accelerated",none:"No extras",unknown:"Not specified"
 },
 ru:{
  subtitle:"ПРЕДВАРИТЕЛЬНОЕ ПРЕДЛОЖЕНИЕ",date:"Дата",client:"Клиент",company:"Компания / бренд",scope:"ПАРАМЕТРЫ ПРОЕКТА",kind:"Тип проекта",pages:"Количество страниц",extras:"Дополнительные функции",timeline:"Сроки",estimate:"ПРЕДВАРИТЕЛЬНЫЙ БЮДЖЕТ",notes:"Примечания",contact:"СВЯЖИТЕСЬ С НАМИ ДЛЯ РАСЧЁТА",disclaimer:"Этот документ содержит автоматическую предварительную оценку и не является обязательной офертой, счётом или договором. Окончательная стоимость, сроки и налоги согласуются письменно после уточнения требований.",landing:"Лендинг",web:"Сайт компании",commerce:"Интернет-магазин",app:"Веб-приложение",ai:"ИИ-автоматизация",seo:"Продвинутое SEO",multi:"3 языка",cms:"Управление контентом",care:"Поддержка сайта: 150 €/месяц (отдельно)",standard:"Стандартно",rush:"Ускоренно",none:"Без дополнений",unknown:"Не указано"
 }
} as const;
const colors={ink:"#13182F",secondary:"#717999",accent:"#775CDE",line:"#E4E7F3",pale:"#F4F2FF"};
function pair(label:string,value:string):Content{
 return {columns:[{width:155,text:label,color:colors.secondary,bold:true,fontSize:10},{width:"*",text:value,color:colors.ink,fontSize:11}],columnGap:16,margin:[0,5,0,5]};
}
async function buildPdf(form:z.infer<typeof schema>):Promise<Buffer>{
 const t=labels[form.locale],price=estimate(form as QuoteInput);
 const pm=(await import("pdfmake/build/pdfmake")).default;
 const fontVfs=(await import("pdfmake/build/vfs_fonts")).default;
 pm.addVirtualFileSystem(fontVfs);
 const logo=(await readFile(join(process.cwd(),"public","brand","logo-horizontal.png"))).toString("base64");
 const day=new Intl.DateTimeFormat(form.locale==="ru"?"ru-RU":form.locale==="en"?"en-GB":"ro-RO",
  {timeZone:"Europe/Chisinau",day:"2-digit",month:"long",year:"numeric"}).format(new Date());
 const currency=(amount:number)=>new Intl.NumberFormat(form.locale==="ru"?"ru-RU":"en-GB",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(amount);
 const extras=[...new Set(form.extras)];
 const extraText=extras.length?extras.map(key=>t[key]).join(" · "):t.none;
 const content:Content[]=[
  {columns:[{image:"data:image/png;base64,"+logo,width:185},{text:"BUILD TODAY.\nEVOLVE TOMORROW.",fontSize:9,color:colors.secondary,bold:true,alignment:"right",lineHeight:1.4}],columnGap:20,margin:[0,0,0,15]},
  {text:t.subtitle,fontSize:11,color:colors.accent,bold:true,characterSpacing:1.4,margin:[0,0,0,8]},
  {text:"SITES EVOLVE",fontSize:31,bold:true,color:colors.ink,margin:[0,0,0,6]},
  {text:t.date+": "+day,fontSize:10,color:colors.secondary,margin:[0,0,0,16]},
  {text:t.scope,fontSize:12,bold:true,color:colors.accent,margin:[0,0,0,8]},
  pair(t.kind,t[form.kind]),pair(t.pages,String(form.pages)),
  pair(t.extras,extraText),pair(t.timeline,t[form.timeline]),
 ];
 if(form.contactName)content.push(pair(t.client,form.contactName));
 if(form.businessName)content.push(pair(t.company,form.businessName));
 if(form.notes)content.push({text:t.notes,fontSize:12,bold:true,color:colors.accent,margin:[0,14,0,7]},{text:form.notes,fontSize:10,lineHeight:1.55,color:colors.ink,margin:[0,0,0,5]});
 content.push(
  {canvas:[{type:"line",x1:0,y1:0,x2:505,y2:0,lineColor:colors.line,lineWidth:1}],margin:[0,11,0,12]},
  {table:{widths:["*"],body:[[{stack:[
   {text:t.estimate,fontSize:10,color:colors.secondary,bold:true,margin:[0,0,0,8]},
   {text:currency(price.low)+"  —  "+currency(price.high),fontSize:25,color:colors.accent,bold:true}
  ],fillColor:colors.pale,margin:[21,14,21,14]} as TableCell]]},layout:"noBorders",margin:[0,0,0,16]},
  {text:t.contact,fontSize:11,bold:true,color:colors.ink,margin:[0,0,0,11]},
  {text:"sites.evolve7@gmail.com   |   +373 603 56 515",fontSize:11,color:colors.accent,link:"mailto:sites.evolve7@gmail.com",margin:[0,0,0,7]},
  {text:"https://sitesevolve.com",fontSize:11,color:colors.accent,link:"https://sitesevolve.com",margin:[0,0,0,12]},
  {text:t.disclaimer,fontSize:9,lineHeight:1.6,color:colors.secondary,margin:[0,0,0,14]}
 );
 const doc:TDocumentDefinitions={
  pageSize:"A4",pageMargins:[49,38,49,46],background:{canvas:[{type:"rect",x:0,y:0,w:595,h:842,color:"#FFFFFF"}]},info:{title:"SITES EVOLVE — "+t.subtitle,author:"SITES EVOLVE",subject:"Indicative website project proposal",creator:"SITES EVOLVE"},
  content,defaultStyle:{font:"Roboto",fontSize:11},footer:(page,current)=>({columns:[{text:"SITES EVOLVE · WEB DEVELOPMENT & INNOVATION",fontSize:8,color:colors.secondary},{text:page+" / "+current,fontSize:8,color:colors.secondary,alignment:"right"}],margin:[49,0,49,18]})
 };
 return new Promise((resolve,reject)=>{
  try{(pm.createPdf(doc) as unknown as {getBuffer(callback:(data:Uint8Array)=>void):void}).getBuffer((data)=>resolve(Buffer.from(data)))}catch(e){reject(e)}
 });
}
export async function POST(request:Request){
 if(guardSize(request,4500))return jsonError("Request too large",413);
 let data:z.infer<typeof schema>;
 try{data=schema.parse(await request.json())}catch{return jsonError("Invalid proposal configuration",400)}
 if(rateLimited(requesterKey(request,"quote-pdf"),24,60_000))return jsonError("Too many PDF requests",429);
 try{
  const pdf=await buildPdf(data);
  return new NextResponse(new Uint8Array(pdf),{headers:{
   "Content-Type":"application/pdf","Content-Disposition":'attachment; filename="SITES-EVOLVE-Proposal.pdf"',
   "Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff",
   "Content-Security-Policy":"default-src 'none'; sandbox"
  }});
 }catch(error){console.error("PDF generation error",error instanceof Error?error.message:"unknown");return jsonError("Proposal PDF unavailable",500)}
}
