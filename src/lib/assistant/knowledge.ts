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
/** Human-friendly contextual replies when the external AI provider is unavailable.
 * Use only information supplied in this conversation; never invent a quote. */
function contextualContinuation(message:string,locale:Locale,topic:Topic|null,history:ChatTurn[]):string|null{
 if(!topic||!history.some(turn=>turn.role==="user"))return null;
 const q=plain(message);
 const lastAssistant=plain([...history].reverse().find(turn=>turn.role==="assistant")?.text||"");
 if(topic==="shop"){
  const explicit=q.match(/\b(\d{1,5})\s*(?:produse|products|items|articole|товаров|товара)\b/);
  const bare=q.match(/^(?:cam|aproximativ|circa|around|about|около|~)?\s*(\d{1,5})$/);
  const amount=explicit?.[1]||(bare&&/cate produse|how many products|сколько товаров/.test(lastAssistant)?bare[1]:null);
  if(amount){
   return locale==="ro"?"Pentru aproximativ "+amount+" produse, aș structura magazinul cu categorii, filtre, pagini de produs, coș și administrarea comenzilor. Vrei plată online cu cardul, ramburs sau ambele?":
    locale==="ru"?"Для каталога примерно из "+amount+" товаров я бы предусмотрел категории, фильтры, карточки товаров, корзину и управление заказами. Нужна оплата картой, при получении или оба варианта?":
    "For roughly "+amount+" products, I'd plan categories, filters, product pages, a cart and order management. Do you need card payments, cash on delivery, or both?";
  }
  if(/\b(moldova|romania|romania|românia|moldovei|romaniei|europe|europa|european|молдова|румыния)\b/.test(q)){
   return locale==="ro"?"Pentru țările menționate, trebuie să stabilim opțiunile de livrare, moneda afișată și procesatorul de plăți disponibil pentru afacerea ta. Ai nevoie de livrare prin curier și plăți cu cardul?":
    locale==="ru"?"Для этих рынков нужно уточнить доставку, валюту и доступного платёжного провайдера. Нужны курьерская доставка и онлайн-оплата картой?":
    "For those markets, we should define shipping, currencies and an eligible payment provider. Do you need courier delivery and online card payments?";
  }
  if(/\b(card|cardul|ramburs|livrare|curier|checkout|stripe|paypal|delivery|shipping|payment|cash|оплата|доставк|картой)\b/.test(q)){
   return locale==="ro"?"Putem proiecta checkout-ul cu opțiunile de plată și livrare potrivite; integrarea efectivă depinde de procesatorul eligibil și de contul comerciantului. Vrei și gestiune de stoc sau doar catalog și comenzi?":
    locale==="ru"?"Можно спроектировать оплату и доставку, но подключение зависит от платёжного провайдера и аккаунта продавца. Нужен также учёт остатков?":
    "We can design checkout and delivery options, but activation depends on an eligible payment provider and merchant account. Do you also need stock tracking?";
  }
  if(/\b(include|contine|functii|functionalitati|features|included|входит|функции)\b/.test(q)){
   return locale==="ro"?"Pentru un magazin online, nucleul este: catalog, categorii și filtre, coș, finalizare comandă și panou de administrare. Se pot adăuga conturi de client, stocuri, cupoane și integrări. Ce funcție este esențială pentru tine?":
    locale==="ru"?"Основа интернет-магазина: каталог, категории и фильтры, корзина, оформление заказа и панель управления. Аккаунты, остатки и скидки можно добавить отдельно. Что самое важное?":
    "A typical shop includes a catalogue, filters, cart, checkout and an admin area. Customer accounts, inventory and discounts can be added. Which feature matters most?";
  }
 }
 if(topic==="web"){
  const pages=q.match(/\b(\d{1,2})\s*(?:pagini|pages|страниц)\b/);
  if(pages){
   return locale==="ro"?"Pentru un site cu "+pages[1]+" pagini, putem defini structura, designul responsive, formularele și optimizarea SEO tehnică. Ai deja textele și fotografiile sau le pregătim în proiect?":
    locale==="ru"?"Для сайта из "+pages[1]+" страниц можно спланировать структуру, адаптивный дизайн, формы и техническое SEO. Тексты и фотографии уже есть?":
    "For a "+pages[1]+"-page site, we can scope the page structure, responsive design, forms and technical SEO. Do you already have copy and photos?";
  }
 }
 return null;
}

const copy={
 ro:{
  hello:"Salut! Te pot ajuta să alegi un site, magazin online, aplicație sau mentenanță. Ce ai în plan?",
  who:"SITES EVOLVE este un studio de dezvoltare web din Chișinău. Construim site-uri, aplicații și automatizări, apoi le putem administra și îmbunătăți. Poți vedea serviciile la /ro/services.",
  prices:(name:string)=>"Pentru "+name+" nu avem un tarif fix: depinde de pagini, funcționalități, design și integrări. Poți obține o estimare orientativă la /ro/quote. Spune-mi ce fel de proiect dorești și îți explic ce influențează costul.",
  timeline:(name:string)=>"Durata pentru "+name+" depinde de complexitate, conținut și aprobări. Dacă îmi spui câte pagini sau ce funcții dorești, îți pot explica etapele. Termenul ferm se stabilește în ofertă.",
  lead:"Dacă ai trimis formularul, solicitarea ar trebui să ajungă în CRM. Eu nu am acces la dosarul tău și nu pot confirma individual primirea; pentru verificare scrie la sites.evolve7@gmail.com. Nu retrimite aceeași cerere de mai multe ori.",
  contact:"Ne poți scrie la sites.evolve7@gmail.com sau completa /ro/contact. Pentru o ofertă detaliată folosește /ro/quote; pentru o discuție inițială, /ro/consultation.",
  portal:"Oricine poate crea gratuit un cont prin Google la /login?lang=ro și primește automat un portal privat. Din /portal/requests poți trimite și urmări cereri; proiectele, etapele, documentele și suportul apar în contul tău când sunt disponibile.",
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
  lead:"Submitted forms should enter our CRM, but I cannot inspect your personal record or confirm receipt. Email sites.evolve7@gmail.com to check; you do not need to submit the same request repeatedly.",
  contact:"Reach the studio at sites.evolve7@gmail.com or use /en/contact. For a detailed estimate see /en/quote; for a first conversation see /en/consultation.",
  portal:"Anyone can create a free private client account using Google at /login?lang=en. Use /portal/requests to submit and track enquiries; assigned projects, files, milestones and support are visible only to you.",
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
  lead:"Заявка из формы должна поступить в CRM, но я не вижу вашу личную запись и не могу подтвердить получение. Для проверки напишите на sites.evolve7@gmail.com. Повторно отправлять одно и то же не нужно.",
  contact:"Напишите на sites.evolve7@gmail.com или откройте /ru/contact. Для оценки — /ru/quote, для первой консультации — /ru/consultation.",
  portal:"Любой посетитель может бесплатно создать личный кабинет через Google на /login?lang=ru. На /portal/requests можно отправлять и отслеживать заявки, а проекты и документы остаются приватными.",
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
 // Answer concrete product-tool and contact questions with actionable routes.
 if(/\b(telegram|@goa7ik|теле?грам)\b/.test(q))return locale==="ro"?"Ne poți scrie direct pe Telegram: https://t.me/Goa7ik. Mai găsești telefonul, emailul și WhatsApp la /ro/contact.":locale==="ru"?"Напишите нам в Telegram: https://t.me/Goa7ik. Другие каналы связи — /ru/contact.":"Message us on Telegram: https://t.me/Goa7ik. Other contact options are at /en/contact.";
 if(/\b(whatsapp|what?sup|ватсап)\b/.test(q))return locale==="ro"?"WhatsApp: https://wa.me/37360356515. Pentru apel, +373 603 56 515; toate metodele sunt la /ro/contact.":locale==="ru"?"WhatsApp: https://wa.me/37360356515. Телефон: +373 603 56 515.":"WhatsApp: https://wa.me/37360356515. You can also call +373 603 56 515.";
 if(/\b(audit|scanare website|verifica site|analiza seo|website audit|site audit|аудит|проверить сайт)\b/.test(q))return locale==="ro"?"Poți verifica gratuit titlul, descrierea, H1, canonical și linkurile unui site public HTTPS la /ro/audit. Este un audit tehnic de bază, nu un test complet Lighthouse.":locale==="ru"?"Проверьте публичные SEO-сигналы сайта по адресу /ru/audit. Это базовый технический аудит, не полный Lighthouse.":"Run a free check of public SEO metadata, HTTP status and internal links at /en/audit. It is not a complete Lighthouse audit.";
 if(/\b(simulator|configurator|configurez|constructor|builder|калькулятор|конструктор)\b/.test(q))return locale==="ro"?"La /ro/builder poți configura tipul de proiect, numărul de pagini, opțiunile și termenul. Vezi o estimare orientativă și poți salva propunerea în PDF din fereastra de imprimare.":locale==="ru"?"На /ru/builder можно настроить проект, посмотреть ориентировочную цену и сохранить предложение как PDF через печать.":"At /en/builder you can configure a website, preview a concept and save an indicative proposal via Print → Save as PDF.";
 if(/\b(academy|academie|ghiduri|tutorial|learn|guides|академи|руководств)\b/.test(q))return locale==="ro"?"În /ro/academy găsești ghiduri gratuite despre lansarea website-ului, SEO, magazine online, performanță și automatizări AI.":locale==="ru"?"Бесплатные руководства по сайтам, SEO, магазинам и автоматизации доступны на /ru/academy.":"Find practical free guides about websites, SEO, e-commerce, performance and automation at /en/academy.";
 if(/\b(programare|consultatie|rezervare consult|appointment|booking|consultation|запись|консультаци)\b/.test(q))return locale==="ro"?"Poți solicita o consultație la /ro/consultation: alegi data, ora și modul de discuție. Este o solicitare, nu o programare confirmată; confirmarea vine separat.":locale==="ru"?"Запросите консультацию на /ru/consultation, указав удобное время и формат. Подтверждение придёт отдельно.":"Request a consultation at /en/consultation and choose your preferred time and format. The slot is not confirmed until the studio replies.";
 if(/\b(recomandari|recomand|referral|referrals|recommend|реферал|рекомендац)\b/.test(q))return locale==="ro"?"Ai un link individual de recomandare în /portal/referrals după autentificare. Înregistrăm solicitările de ofertă provenite prin link; nu promitem recompense automate.":locale==="ru"?"После входа персональную ссылку можно найти в /portal/referrals. Автоматических вознаграждений нет.":"After signing in, find your referral link at /portal/referrals. Referred quote enquiries are attributed, but rewards are not automatic.";
 if(/\b(confidentialitate|gdpr|date personale|privacy|delete my data|my data|конфиденциальност|удалить данные)\b/.test(q))return locale==="ro"?"Poți gestiona consimțământul la /ro/privacy-center, iar din /portal/privacy poți exporta datele contului sau trimite o cerere de ștergere spre verificare.":locale==="ru"?"Управляйте согласием на /ru/privacy-center. Экспорт и запрос удаления данных доступны в /portal/privacy.":"Manage consent at /en/privacy-center; after login, export your account data or request erasure from /portal/privacy.";
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
 if(topic==="web" && /cafenea|cafea|coffee|restaurant|bistro|caf[eé]|кофейн|ресторан/.test(q)){
  return locale==="ro"?"Pentru o cafenea sau un restaurant putem realiza un site cu meniu, galerie, localizare și formular pentru rezervări sau cereri. Preferi rezervări online, meniu digital sau ambele?":
   locale==="ru"?"Для кафе или ресторана можно сделать сайт с меню, галереей, адресом и формой заявки. Вам важнее онлайн-бронирование, цифровое меню или оба варианта?":
   "For a café or restaurant, we can build a site with a menu, photo gallery, map and reservation enquiries. Do you need online bookings, a digital menu, or both?";
 }
 const continuation=contextualContinuation(message,locale,topic,history);
 if(continuation)return continuation;
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
 "Public routes: /"+locale+"/services, /"+locale+"/work, /"+locale+"/pricing, /"+locale+"/quote, /"+locale+"/builder, /"+locale+"/audit, /"+locale+"/demo, /"+locale+"/academy, /"+locale+"/contact, /"+locale+"/consultation, /login. Any visitor can sign up for a free private Client Portal with a verified Google account. Within the authenticated portal, /portal/requests lets customers submit project enquiries and track their status; only studio-assigned projects, files and invoices appear in the private workspace.",
 "Support: sites.evolve7@gmail.com, WhatsApp https://wa.me/37360356515, phone +37360356515, Telegram https://t.me/Goa7ik. No fixed prices, delivery dates, real-time booking access or verified business registration details provided."].join("\n");
}
