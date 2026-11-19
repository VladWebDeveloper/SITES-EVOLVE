import {services,works,type Locale} from "../site";

export type ChatTurn={role:"assistant"|"user";text:string};

function plain(value:string){
 return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ș/g,"s").replace(/ț/g,"t").trim();
}
const rx={
 hello:/\b(salut|buna|hei|hello|hi|hey|привет|здравствуйте|добрый)\b/,
 prices:/\b(pret\w*|costa|cost|tarif|buget\w*|price|pricing|budget|expensive|цена|стоит|стоимость|бюджет|сколько)\b/,
 timeline:/\b(cand|cat dureaza|timp|termen|livrare|timeline|when|deadline|how long|сколько времени|срок|когда)\b/,
 lead:/\b(trimis|trimisa|trimite|cerere|solicitare|formular|raspuns|raspundeti|submitted|sent|request|application|заявк|отправил|запрос)\b/,
 contact:/\b(contact|email|telefon|sun|call|scriu|mesaj|message|phone|связ|почт|звон)\b/,
 portal:/\b(portal|contul meu|autentificar|logare|login|account|proiectul meu|client portal|личн|кабинет|аккаунт)\b/,
 portfolio:/\b(portofoli\w*|portfolio|lucrari|exemple|projects|examples|cases|работ|примеры)\b/,
 web:/\b(site|website|web|pagina|landing|prezentare|corporate|сайт|лендинг)\b/,
 shop:/\b(magazin\w*|ecommerce|e-commerce|shop|vanz\w*|comenzi|catalog|plati|checkout|магазин|товар|каталог|оплат)\b/,
 ai:/\b(ai|inteligenta artificiala|automatizar|automatiz|chatbot|bot|robot|artificial|automation|automate|ии|искусствен|автомат|бот)\b/,
 app:/\b(aplicat|app|software|platform|crm|dashboard|aplicati|приложен|софт|платформ)\b/,
 seo:/\b(seo|google|cautar|indexar|trafic|optimiz|search engine|ranking|скорость|поиск|трафик)\b/,
 care:/\b(mentenanta|mentenan|suport|backup|actualizar|gazduire|hosting|monitor|maintenance|support|updates|поддерж|обновлен|мониторинг)\b/,
 who:/\b(cine sunteti|cine esti|ce este sites evolve|who are you|about you|who is sites evolve|кто вы|кто ты)\b/,
 process:/\b(cum lucrati|cum procedam|pasi|etape|colabor|how do we start|how it works|process|процесс|начать|этап)\b/,
};
type Topic="web"|"shop"|"ai"|"app"|"seo"|"care";
const russian:Partial<Record<keyof typeof rx,RegExp>>={
 hello:/привет|здравствуй|добрый/,
 prices:/цена|стоит|стоим|бюджет|сколько/,
 timeline:/время|срок|когда/,
 lead:/заявк|отправил|запрос/,
 contact:/связ|почт|звон/,
 portal:/личн|кабинет|аккаунт/,
 portfolio:/работ|пример/,
 web:/сайт|лендинг/,
 shop:/магазин|товар|каталог|оплат/,
 ai:/искусствен|автомат|бот/,
 app:/приложен|софт|платформ/,
 seo:/скорость|поиск|трафик/,
 care:/поддерж|обновлен|мониторинг/,
 who:/кто вы|кто ты/,
 process:/процесс|начать|этап/
};
function match(name:keyof typeof rx,q:string){return rx[name].test(q)||!!russian[name]?.test(q)}
function topicOf(text:string):Topic|null{
 const q=plain(text);
 if(match("shop",q))return "shop";
 if(match("seo",q))return "seo";
 if(match("ai",q))return "ai";
 if(match("care",q))return "care";
 if(match("app",q))return "app";
 if(match("web",q))return "web";
 return null;
}
export function resolveTopic(message:string,history:ChatTurn[]):Topic|null{
 const explicit=topicOf(message);if(explicit)return explicit;
 const users=history.filter(h=>h.role==="user").slice(-5).reverse();
 for(const h of users){const topic=topicOf(h.text);if(topic)return topic}
 return null;
}
function chosenName(locale:Locale,topic:Topic|null){
 if(!topic)return locale==="ro"?"proiectul tău":locale==="ru"?"ваш проект":"your project";
 const map:Record<Topic,string>={web:"web-development",shop:"ecommerce",ai:"ai-automation",app:"applications",seo:"seo-growth",care:"care"};
 return services[locale].find(s=>s.id===map[topic])?.title||topic;
}
function budgetFrom(text:string){
 // Echo an explicitly supplied number only: never invent agency prices.
 const found=text.match(/(?:\b(?:buget\w*|budget|бюджет)\s*(?:(?:meu|este|de|is|of|:)[\s:]*){0,4})(\d[\d .]{1,9})\s*(€|eur|mdl|lei|\$|usd)?/i);
 return found?(found[1].trim()+" "+(found[2]||"")).trim():null;
}
const copy={
 ro:{
  hello:"Salut! Te pot ajuta să alegi un site, magazin online, aplicație sau mentenanță. Ce ai în plan?",
  who:"SITES EVOLVE este un studio de dezvoltare web din Chișinău. Construim site-uri, aplicații și automatizări, apoi le putem administra și îmbunătăți. Poți vedea serviciile la /ro/services.",
  prices:(name:string)=>"Pentru "+name+" nu avem un tarif fix: depinde de pagini, funcționalități, design și integrări. Poți obține o estimare orientativă la /ro/quote. Spune-mi ce fel de proiect dorești și îți explic ce influențează costul.",
  timeline:(name:string)=>"Durata pentru "+name+" depinde de complexitate, conținut și aprobări. Dacă îmi spui câte pagini sau ce funcții dorești, îți pot explica etapele. Termenul ferm se stabilește în ofertă.",
  lead:"Dacă ai trimis formularul, solicitarea ar trebui să ajungă în CRM. Eu nu am acces la dosarul tău și nu pot confirma individual primirea; pentru verificare scrie la contact@sitesevolve.com. Nu retrimite aceeași cerere de mai multe ori.",
  contact:"Ne poți scrie la contact@sitesevolve.com sau completa /ro/contact. Pentru o ofertă detaliată folosește /ro/quote; pentru o discuție inițială, /ro/consultation.",
  portal:"Client Portal este spațiul privat în care clienții invitați văd proiectele, etapele, documentele și solicitările de suport. Accesul este prin Google, după asocierea contului de către studio. Intrare: /login.",
  portfolio:"În portofoliu sunt prezentate AlviTravel și DDent. Le poți explora în /ro/work. Vrei un proiect asemănător unuia dintre ele?",
  web:"Putem construi un site de prezentare, un landing page, o platformă corporate sau o aplicație web personalizată. Pentru a-ți recomanda o soluție: ce domeniu are afacerea și ce trebuie să facă site-ul?",
  shop:"Un magazin online poate include catalog, coș, comenzi și integrarea unui procesator de plăți. Pentru a defini soluția: aproximativ câte produse vei avea și în ce țări vei vinde?",
  ai:"Dezvoltăm asistenți AI și automatizări adaptate proceselor afacerii. Exemple: preluarea întrebărilor, trierea cererilor și integrarea cu CRM. Ce proces vrei să automatizezi?",
  app:"Creăm aplicații web, panouri administrative și portaluri pentru clienți. Spune-mi cine le va folosi și care este cea mai importantă funcție; apoi putem schița modulele.",
  seo:"Optimizăm structura tehnică SEO, viteza, metadatele și măsurarea performanței. Rezultatele din Google nu pot fi garantate; spune-mi URL-ul și obiectivul pentru a discuta un audit.",
  care:"Oferim administrarea site-urilor: actualizări, monitorizare, verificări de securitate și backupuri. Pentru un plan de mentenanță, spune-mi platforma și cât de des se modifică site-ul.",
  process:"Începem cu obiectivele, apoi clarificăm funcționalitățile, pregătim oferta, realizăm designul și dezvoltarea, testăm și publicăm. Putem continua și cu mentenanța. Formular: /ro/contact.",
  unknown:"Te pot ajuta cu soluții web, AI, magazine online, SEO sau mentenanță. Spune-mi concret ce vrei să obții, iar dacă întrebarea nu ține de serviciile noastre îți voi spune direct."
 },
 en:{
  hello:"Hi! I can help you choose a website, online store, app or support plan. What are you building?",
  who:"SITES EVOLVE is a web development studio in Chișinău. We build websites, applications and automation, then help maintain and improve them. Explore /en/services.",
  prices:(name:string)=>"There is no fixed price for "+name+": pages, design, functions and integrations change the scope. Try /en/quote for a preliminary estimate. Tell me what you need and I can break down the cost drivers.",
  timeline:(name:string)=>"The timeline for "+name+" depends on scope, content and approvals. Tell me the pages or features involved and I can explain the stages; a firm deadline belongs in a formal proposal.",
  lead:"Submitted forms should enter our CRM, but I cannot inspect your personal record or confirm receipt. Email contact@sitesevolve.com to check; you do not need to submit the same request repeatedly.",
  contact:"Reach the studio at contact@sitesevolve.com or use /en/contact. For a detailed estimate see /en/quote; for a first conversation see /en/consultation.",
  portal:"The Client Portal lets invited clients see their projects, milestones, shared documents and support requests. Access uses Google sign-in after an administrator links your account. Sign in at /login.",
  portfolio:"Our portfolio features AlviTravel and DDent. Explore /en/work. Is there a project style you like?",
  web:"We create business sites, landing pages, corporate platforms and custom web apps. What kind of business is this for, and what should visitors be able to do?",
  shop:"We can build stores with a catalogue, cart, ordering flow and payment-provider integration. Roughly how many products are you planning, and where will you sell?",
  ai:"We build AI assistants and business automations, including enquiry triage and CRM integrations. What repetitive task do you want to automate?",
  app:"We develop web apps, dashboards and client portals. Who will use your app and what is its one must-have feature?",
  seo:"We work on technical SEO, speed, structured metadata and performance measurement. Google rankings cannot be guaranteed. Share your website and goal for an initial discussion.",
  care:"Our website-care plans can cover upgrades, monitoring, security checks and backups. What platform are you using, and how often does the content change?",
  process:"We start with discovery, then scope and quote, design and development, testing and launch. Maintenance can follow. Start at /en/contact.",
  unknown:"I can help with websites, apps, e-commerce, SEO, AI and maintenance. Tell me the outcome you want, and I will be clear if I cannot confirm something."
 },
 ru:{
  hello:"Здравствуйте! Помогу разобраться с сайтом, интернет-магазином, приложением или поддержкой. Что планируете?",
  who:"SITES EVOLVE — студия веб-разработки в Кишинёве. Создаём сайты, приложения и автоматизацию, затем помогаем с поддержкой и развитием. Услуги: /ru/services.",
  prices:(name:string)=>"Стоимость "+name+" зависит от страниц, дизайна и функций. Предварительная оценка есть на /ru/quote. Расскажите о задаче, и я объясню, что влияет на цену.",
  timeline:(name:string)=>"Срок "+name+" зависит от сложности, материалов и согласований. Расскажите о функциях, чтобы обсудить этапы. Точная дата согласуется в предложении.",
  lead:"Заявка из формы должна поступить в CRM, но я не вижу вашу личную запись и не могу подтвердить получение. Для проверки напишите на contact@sitesevolve.com. Повторно отправлять одно и то же не нужно.",
  contact:"Напишите на contact@sitesevolve.com или откройте /ru/contact. Для оценки — /ru/quote, для первой консультации — /ru/consultation.",
  portal:"Client Portal — защищённый кабинет с проектами, этапами, документами и обращениями. Вход через Google после привязки аккаунта студией: /login.",
  portfolio:"В портфолио представлены AlviTravel и DDent. Подробнее: /ru/work. Какой стиль вам ближе?",
  web:"Создаём сайты компаний, лендинги и веб-приложения. Расскажите, чем занимается ваш бизнес и что посетители должны делать на сайте.",
  shop:"Возможны каталог, корзина, оформление заказов и интеграция оплаты. Сколько примерно товаров будет и где вы планируете продавать?",
  ai:"Разрабатываем ИИ-помощников и автоматизацию бизнес-процессов, включая обработку заявок и интеграцию CRM. Что хотите автоматизировать?",
  app:"Создаём приложения, панели управления и личные кабинеты. Кто будет пользоваться и какая функция главная?",
  seo:"Помогаем с техническим SEO, скоростью, метаданными и аналитикой. Гарантировать позиции Google нельзя. Поделитесь сайтом и целью.",
  care:"Предлагаем обслуживание сайтов: обновления, мониторинг, проверки безопасности и резервное копирование. Какая платформа используется?",
  process:"Сначала обсуждаем цели, затем составляем объём работ и предложение, делаем дизайн и разработку, тестируем и запускаем. Начните с /ru/contact.",
  unknown:"Помогу с сайтами, приложениями, интернет-магазинами, SEO, ИИ и обслуживанием. Напишите, какой результат нужен; если я не могу чего-то подтвердить, скажу прямо."
 }
};
export function answerFromKnowledge(message:string,locale:Locale,history:ChatTurn[]=[]):string{
 const q=plain(message),t=copy[locale],topic=resolveTopic(message,history);
 const initial=(()=>{
 if(match("lead",q)&&/(trimis|trimisa|submitted|sent|отправил|заявк|отправлено)/.test(q))return t.lead;
 if(match("portal",q))return t.portal;
 if(match("portfolio",q))return t.portfolio;
 if(match("who",q))return t.who;
 if(match("prices",q)){
  const budget=budgetFrom(message);
  const prefix=budget?locale==="ro"?"Am notat bugetul indicat de "+budget+". ":locale==="ru"?"Вы указали бюджет "+budget+". ":"You mentioned a budget of "+budget+". ":"";
  return prefix+t.prices(chosenName(locale,topic));
 }
 if(match("timeline",q))return t.timeline(chosenName(locale,topic));
 if(match("process",q))return t.process;
 if(match("contact",q))return t.contact;
 if(topic)return t[topic];
 if(match("hello",q))return t.hello;
 return t.unknown;
 })();
 const previous=history.filter(turn=>turn.role==="assistant").map(turn=>turn.text);
 if(!previous.includes(initial))return initial;
 // If the visitor repeats or rephrases the same question, provide the next
 // useful clarification rather than returning an identical canned message.
 const name=chosenName(locale,topic);
 const repeatCount=previous.filter(x=>x===initial).length;
 if(match("prices",q)){
  return locale==="ro"?(repeatCount%2?"Pentru a aproxima costul pentru "+name+", am nevoie de două detalii: câte pagini dorești și dacă ai nevoie de formulare, rezervări sau plăți?":"Prețul final nu poate fi confirmat fără cerințe. Spune-mi bugetul disponibil și funcția principală; apoi îți explic o variantă realistă sau poți trimite detaliile la /ro/quote."):
   locale==="ru"?(repeatCount%2?"Чтобы уточнить стоимость "+name+", сколько страниц и какие функции вам нужны?":"Назовите примерный бюджет и главную функцию, чтобы обсудить подходящее решение."):
   (repeatCount%2?"To narrow down "+name+" pricing, how many pages do you need and will you require bookings, payments or custom features?":"Tell me your budget and most important feature so I can suggest a realistic scope; you can also use /en/quote.");
 }
 if(topic){
  return locale==="ro"?"Hai să concretizăm "+name+": cine va folosi soluția și ce rezultat trebuie să obțină?":locale==="ru"?"Давайте уточним "+name+": кто будет пользоваться и какой главный результат нужен?":"Let's narrow down "+name+": who will use it and what is the most important outcome?";
 }
 return locale==="ro"?"Pot detalia partea care te interesează, dar am nevoie de puțin context. Vorbim despre un site, o aplicație sau alt serviciu?":locale==="ru"?"Я могу уточнить ответ. Речь о сайте, приложении или другой услуге?":"I can be more specific. Is your question about a website, an app, or another service?";
}
// Expose the publicly verifiable studio context to the external AI provider.
export function studioFacts(locale:Locale):string{
 const items=services[locale].map(s=>s.title+": "+s.detail+" Deliverables: "+s.deliverables.join(", "));
 const projects=works[locale].map(w=>w.title+": "+w.description).join("; ");
 return ["SITES EVOLVE — independent web-development and website-care studio, Chișinău, Moldova.","Verified services:",...items,"Portfolio examples: "+projects,
 "Public routes: /"+locale+"/services, /"+locale+"/work, /"+locale+"/pricing, /"+locale+"/quote, /"+locale+"/contact, /"+locale+"/consultation, /login.",
 "Support: contact@sitesevolve.com. No fixed prices, delivery dates, real-time booking access or verified business registration details provided."].join("\n");
}