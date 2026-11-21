import Link from "next/link";
import {ArrowUpRight,CheckCircle2} from "lucide-react";
import {pathFor,type Locale} from "@/lib/site";

type Kind="home"|"services"|"about"|"process"|"pricing"|"contact"|"work"|"founder";
type Editorial={over:string;title:string;intro:string;points:readonly (readonly [string,string])[];faqTitle:string;faq:readonly (readonly [string,string])[];action:string;actionPath:string};
const content:Record<Locale,Record<Kind,Editorial>>={
 en:{
  home:{
   over:"SITES EVOLVE / A DIGITAL PARTNER",title:"What a useful website should do for your business",
   intro:"A business website should explain your offer clearly, make it easy to get in touch, and work just as well on a phone as on a computer. SITES EVOLVE is an independent web development studio based in Chișinău, Moldova, working with businesses locally and remotely.",
   points:[
    ["Start with the customer's questions","We look at what visitors need to know first: what you offer, who it is for, how to trust the business and how to take the next step. That helps shape the page structure before the visual details."],
    ["Build for everyday use","The work may include a responsive company website, an online store, a custom web application or a redesign. Navigation, forms, accessibility and loading performance matter alongside a distinctive appearance."],
    ["Think beyond the launch","A website needs updates as the business changes. We can discuss technical SEO foundations, analytics, maintenance, backups and ongoing improvements as part of the project scope, rather than treating launch as the final step."]
   ],
   faqTitle:"Before starting a website",
   faq:[
    ["Do I need a new website or a redesign?","That depends on what already works. If your existing site is fast, easy to update and helps visitors contact you, targeted improvements may be more practical than rebuilding everything."],
    ["Can we start with a small project?","Yes. A focused landing page or a clear company website can be a sensible first step. Features such as booking workflows, customer accounts or other integrations can be discussed separately."]
   ],action:"See web development services",actionPath:"services"
  },
  services:{
   over:"WEB DEVELOPMENT / PRACTICAL SOLUTIONS",title:"Choosing the right digital solution",
   intro:"Not every business needs a large platform. The right choice depends on your customers, your existing website, the information you need to publish and the actions visitors should be able to complete.",
   points:[
    ["Presentation websites and redesigns","A company website can explain services, show useful examples and give visitors clear ways to enquire. When redesigning an existing site, we first identify which content and functionality are worth keeping."],
    ["Online sales and custom functionality","Stores need organized product information and a straightforward order journey. Custom web applications may require accounts, permissions, dashboards or integrations. These requirements are defined during planning, not assumed for every project."],
    ["Visibility, performance and support","Technical SEO starts with crawlable pages, meaningful titles, logical headings and mobile usability. Performance, analytics and maintenance help you understand and improve how the site works after launch."]
   ],
   faqTitle:"Questions about our services",
   faq:[
    ["What information should I prepare?","A short explanation of your business, intended audience, required pages, existing brand materials and examples of sites you like is enough to begin a useful conversation."],
    ["Can you improve a website I already own?","A redesign, speed review, technical SEO improvements or a new feature may be possible without replacing the entire website. The best approach depends on the platform and access available."]
   ],action:"Discuss a website",actionPath:"contact"
  },
  about:{
   over:"THE STUDIO / HOW WE THINK",title:"Independent work, thoughtful decisions",
   intro:"SITES EVOLVE was founded by Vlad Serbușco to create modern digital experiences for growing businesses. The studio is based in Chișinău and approaches each website as a combination of communication, design and engineering rather than simply a collection of pages.",
   points:[
    ["Understand the business first","Before choosing a layout or a technology, we discuss the target audience, the information customers look for and the action that matters most: a request, a purchase, an appointment or another clear outcome."],
    ["Design with a clear purpose","A strong visual identity helps people recognize a brand, but usability makes it useful. We prioritize readable content, a consistent interface, accessible interaction and a sensible experience across screen sizes."],
    ["Build a foundation that can evolve","Digital needs change. We consider future content, possible integrations, basic search visibility and maintainability when deciding how a project should be built. The result should remain practical for the people who use and manage it."]
   ],faqTitle:"Working with SITES EVOLVE",
   faq:[
    ["Where is SITES EVOLVE based?","The studio is based in Chișinău, Moldova. Initial conversations, planning and many stages of development can also take place remotely."],
    ["Who is behind the studio?","Vlad Serbușco is the Founder & CEO of SITES EVOLVE. His work combines interests in business, web technology and creative design."]
   ],action:"Meet the founder",actionPath:"founder"
  },
  process:{
   over:"PROJECT PROCESS / FROM IDEA TO LAUNCH",title:"What happens after the first conversation?",
   intro:"A defined process reduces confusion and makes decisions easier. Projects differ in size, but a typical website collaboration starts by understanding the business and ends with a review of how the finished site should be maintained.",
   points:[
    ["Discovery and scope","We discuss the audience, pages, desired features, content, integrations and available materials. This helps separate essential functionality from ideas that can be considered later."],
    ["Design and implementation","The site structure and visual direction are developed around the approved scope. During development, navigation, forms and responsive layouts need testing, not just attractive screenshots."],
    ["Review, launch and improvement","Before publishing, we review important pages, links and contact paths. After launch, the business may want to monitor traffic, update content, refine SEO and plan maintenance."]
   ],faqTitle:"Planning and collaboration",
   faq:[
    ["How long does a website take?","Timing depends on the number of pages, content readiness, integrations and revision rounds. A realistic schedule can be discussed after the initial brief."],
    ["Can the project change during development?","Yes, but substantial changes can affect scope, timing and cost. Discussing changes openly helps keep priorities clear for everyone involved."]
   ],action:"Tell us about your project",actionPath:"quote"
  },
  pricing:{
   over:"PLANNING A PROJECT / TRANSPARENT SCOPE",title:"What affects the cost of a website?",
   intro:"The displayed package amounts are starting points, not automatic final quotations. A useful estimate takes into account the website's purpose, page count, visual complexity, content, integrations and future support needs.",
   points:[
    ["Pages and functionality","A focused landing page requires different planning from an online store, multilingual website or platform with user accounts. Custom features and third-party integrations usually require additional discovery and testing."],
    ["Content and design","Content structure, illustrations, translations and the availability of text or photographs influence the workload. Preparing your business information early helps make the project more predictable."],
    ["Launch and ongoing care","Hosting, domains, maintenance, technical SEO, backups and future updates should be discussed separately when relevant. The final proposal should explain what is included and what remains outside the agreed scope."]
   ],faqTitle:"Understanding an estimate",
   faq:[
    ["Is the calculator a binding quote?","No. An online estimate is indicative. A final project proposal follows a discussion of the requirements and the work involved."],
    ["Can I begin with fewer features?","Often, yes. A smaller first release can focus on the most important pages or customer actions, while optional functionality is planned for a later phase."]
   ],action:"Request a project estimate",actionPath:"quote"
  },
  contact:{
   over:"STARTING A CONVERSATION",title:"What to include in your enquiry",
   intro:"You do not need a technical specification to contact SITES EVOLVE. A few practical details are enough for an initial discussion about a new website, a redesign, search visibility or ongoing support.",
   points:[
    ["Describe the business","Tell us what your company does, where your customers are and whether you already have a website. A link to an existing site is useful when you want an audit or redesign."],
    ["Explain the main goal","For example, you may want visitors to request offers, book a service, browse a catalogue or understand your brand better. It helps to mention any essential forms, languages or integrations."],
    ["Share priorities and constraints","If you have a target date, approximate budget or prepared branding and content, include that information. We can then discuss a realistic scope and identify the next practical step."]
   ],faqTitle:"Before you get in touch",
   faq:[
    ["Can I contact you without a finished brief?","Yes. You can describe your idea in everyday language. Technical requirements can be clarified during the conversation."],
    ["Do you work with businesses outside Moldova?","Yes. SITES EVOLVE is based in Chișinău and can discuss remote website projects with businesses in other locations."]
   ],action:"Explore available services",actionPath:"services"
  },
  work:{
   over:"OUR WORK / REAL PROJECTS",title:"What to look for in a project case study",
   intro:"Our portfolio presents the projects that are ready to share publicly. Rather than filling the page with fictional examples or performance claims, we explain the problem each project addresses, what visitors can do on the live site and which design decisions shaped the experience.",
   points:[
    ["A useful customer journey","A well-structured project helps people understand the offer and move toward a relevant action. For AlviTravel, that means finding destinations, exploring holiday options and reaching the agency for an enquiry."],
    ["Details beyond the appearance","A project page should describe practical components such as responsive navigation, enquiry forms, multilingual interfaces and contact options. Those details explain what was built more clearly than a decorative preview alone."],
    ["A portfolio designed to grow","AlviTravel is currently our featured public project. As future work is completed and approved for publication, new project cards and individual case studies can be added to this collection."]
   ],faqTitle:"About the portfolio",
   faq:[
    ["Can I view the live project?","Yes. Open the AlviTravel case study to see the functionality breakdown and a separate link to the public travel website."],
    ["Are the visual previews screenshots?","Some portfolio visuals are stylized representations rather than exact browser screenshots. We identify them as previews and provide links to the live project for reference."]
   ],action:"Discuss a similar project",actionPath:"contact"
  },
  founder:{
   over:"FOUNDER / VLAD SERBUȘCO",title:"Business, technology and creativity",
   intro:"Vlad Serbușco founded SITES EVOLVE with the goal of building thoughtful websites and useful digital products. His interests connect business administration, web development, digital design and leadership.",
   points:[
    ["Founder & CEO of SITES EVOLVE","Through the studio, Vlad focuses on turning business ideas into accessible online experiences. The emphasis is on clear communication, modern interfaces and solutions that can evolve as the business grows."],
    ["Fashion Model at ADI Academy","Alongside digital entrepreneurship, Vlad is involved in fashion modeling at ADI Academy, with runway appearances at City Fashion Week in Cluj, Romania and Emirates Fashion Week in Dubai."],
    ["Learning and leadership","Vlad studies Business & Administration and participates in student leadership. These interests inform how he thinks about collaboration, planning and practical problem-solving."]
   ],faqTitle:"More about Vlad",
   faq:[
    ["What is Vlad Serbușco's main professional role?","He is the Founder & CEO of SITES EVOLVE, an independent web development and digital innovation studio."],
    ["Where can I see modeling work?","The Fashion Model card opens a photo gallery; a separate fashion portfolio page contains the City Fashion Week and Emirates Fashion Week photographs."]
   ],action:"View the fashion portfolio",actionPath:"fashion-model"
  }
 },
 ro:{
  home:{
   over:"SITES EVOLVE / PARTENER DIGITAL",title:"Ce trebuie să facă un website util pentru afacerea ta?",
   intro:"Un website de afaceri trebuie să explice clar ce oferi, să inspire încredere și să simplifice contactul cu potențialii clienți. SITES EVOLVE este un studio independent de dezvoltare web din Chișinău, care colaborează cu afaceri locale și de la distanță.",
   points:[
    ["Pornim de la întrebările clienților","Analizăm ce caută un vizitator: ce servicii oferi, cui i se adresează, de ce să aibă încredere și cum poate solicita o ofertă. Din aceste informații construim structura paginilor."],
    ["Construim pentru utilizare reală","Proiectul poate fi un website de prezentare, magazin online, aplicație web sau redesign. Navigarea clară, formularele funcționale, accesibilitatea și viteza contează la fel de mult ca aspectul vizual."],
    ["Ne gândim și la perioada de după lansare","Website-ul evoluează odată cu afacerea. Putem discuta despre SEO tehnic, analytics, actualizări, backupuri și mentenanță, în funcție de nevoile și bugetul proiectului."]
   ],
   faqTitle:"Înainte să începi un website",
   faq:[
    ["Am nevoie de un site nou sau de redesign?","Depinde de starea website-ului actual. Dacă structura și funcționalitățile de bază sunt bune, uneori optimizările punctuale sunt mai utile decât reconstruirea completă."],
    ["Putem începe cu un proiect mic?","Da. O pagină de prezentare sau un website clar pentru companie poate fi un început potrivit. Rezervările, conturile de clienți sau integrările suplimentare pot fi planificate separat."]
   ],action:"Descoperă serviciile web",actionPath:"services"
  },
  services:{
   over:"DEZVOLTARE WEB / SOLUȚII PRACTICE",title:"Cum alegi soluția digitală potrivită?",
   intro:"Nu orice afacere are nevoie de o platformă complexă. Alegerea depinde de clienți, de website-ul existent și de acțiunile pe care vizitatorii trebuie să le poată realiza.",
   points:[
    ["Website-uri de prezentare și redesign","Un website de companie prezintă serviciile, exemplele relevante și metodele de contact. În cazul unui redesign, verificăm mai întâi ce pagini și funcționalități merită păstrate."],
    ["Magazine online și funcții personalizate","Un magazin are nevoie de categorii clare și un proces de comandă ușor. Aplicațiile web pot include conturi, permisiuni, panouri de administrare sau integrări, stabilite după analiza cerințelor."],
    ["Vizibilitate, performanță și administrare","SEO-ul tehnic include pagini indexabile, titluri relevante, structură logică și navigare mobilă. Analytics, optimizarea vitezei și mentenanța ajută la îmbunătățirea website-ului după lansare."]
   ],faqTitle:"Întrebări despre serviciile noastre",
   faq:[
    ["Ce informații să pregătesc pentru început?","Sunt suficiente o scurtă descriere a afacerii, publicul vizat, paginile dorite, materialele de brand și câteva exemple de website-uri care îți plac."],
    ["Puteți îmbunătăți website-ul pe care îl am deja?","În funcție de platformă și acces, putem discuta despre redesign, viteză, SEO tehnic sau funcționalități noi, fără să reconstruim neapărat tot site-ul."]
   ],action:"Discută despre website",actionPath:"contact"
  },
  about:{
   over:"DESPRE STUDIO / PRINCIPII",title:"Independență, claritate și atenție la detalii",
   intro:"SITES EVOLVE a fost fondat de Vlad Serbușco pentru a crea experiențe digitale moderne pentru afaceri în dezvoltare. Studioul își are baza în Chișinău și privește fiecare website ca o combinație între comunicare, design și tehnologie.",
   points:[
    ["Înțelegem mai întâi afacerea","Înainte de alegerea designului, discutăm despre publicul țintă, informațiile importante și acțiunea dorită: o solicitare, o comandă, o programare sau un alt obiectiv clar."],
    ["Design cu un scop","Identitatea vizuală trebuie să diferențieze brandul, dar și să fie utilă. Punem accent pe text lizibil, navigare intuitivă, interacțiuni accesibile și o experiență coerentă pe toate ecranele."],
    ["O bază pregătită pentru schimbare","Nevoile digitale se modifică. La planificare luăm în considerare conținutul viitor, integrările posibile, vizibilitatea în căutare și întreținerea website-ului."]
   ],faqTitle:"Colaborarea cu SITES EVOLVE",
   faq:[
    ["Unde se află SITES EVOLVE?","Studioul este în Chișinău, Republica Moldova. Discuțiile inițiale și numeroase etape de dezvoltare pot avea loc și online."],
    ["Cine este fondatorul studioului?","Vlad Serbușco este Founder & CEO al SITES EVOLVE. Activitatea sa îmbină antreprenoriatul, tehnologia web și designul creativ."]
   ],action:"Cunoaște fondatorul",actionPath:"founder"
  },
  process:{
   over:"PROCESUL DE LUCRU / DE LA IDEE LA LANSARE",title:"Ce urmează după prima discuție?",
   intro:"Un proces clar reduce neînțelegerile și ajută la luarea deciziilor. Fiecare proiect diferă, dar colaborarea începe prin înțelegerea afacerii și include verificarea website-ului înainte de publicare.",
   points:[
    ["Analiză și definirea proiectului","Discutăm publicul, paginile, funcționalitățile necesare, conținutul, integrările și materialele existente. Separăm elementele esențiale de ideile care pot fi adăugate ulterior."],
    ["Design și implementare","Structura și direcția vizuală sunt dezvoltate conform cerințelor stabilite. În timpul implementării, navigarea, formularele și interfața mobilă trebuie testate, nu doar prezentate în imagini."],
    ["Verificare, lansare și îmbunătățiri","Înainte de publicare, verificăm paginile, linkurile și metodele de contact. După lansare, pot urma actualizări de conținut, monitorizare, optimizări SEO și mentenanță."]
   ],faqTitle:"Planificare și colaborare",
   faq:[
    ["Cât durează realizarea unui website?","Depinde de numărul de pagini, pregătirea conținutului, integrări și revizii. Un calendar realist se poate stabili după analiza cerințelor."],
    ["Se pot modifica cerințele pe parcurs?","Da, dar schimbările importante pot influența timpul și costul. Comunicarea clară ajută la menținerea priorităților."]
   ],action:"Descrie proiectul tău",actionPath:"quote"
  },
  pricing:{
   over:"BUGET ȘI PLANIFICARE",title:"Ce influențează prețul unui website?",
   intro:"Prețurile afișate pentru pachete sunt orientative și reprezintă puncte de pornire, nu oferte finale automate. Estimarea depinde de obiectivul proiectului, numărul de pagini, design, conținut, integrări și suport.",
   points:[
    ["Pagini și funcționalități","O pagină de prezentare necesită alt efort decât un magazin online, un site multilingv sau o platformă cu autentificare. Funcționalitățile personalizate se analizează separat."],
    ["Conținut și design","Textele, fotografiile, traducerile, identitatea vizuală și numărul de revizii pot modifica volumul de lucru. Materialele pregătite din timp ajută la planificare."],
    ["Lansare și mentenanță","Găzduirea, domeniul, backupurile, SEO-ul tehnic și actualizările ulterioare trebuie discutate în funcție de necesități. Oferta finală trebuie să arate clar ce este inclus."]
   ],faqTitle:"Cum interpretezi estimarea",
   faq:[
    ["Calculatorul oferă un preț final?","Nu. Calculatorul oferă o estimare orientativă. O ofertă fermă se stabilește după discutarea cerințelor și a lucrărilor necesare."],
    ["Pot începe cu mai puține funcționalități?","De multe ori, da. O primă versiune poate include doar paginile și acțiunile esențiale, iar restul funcțiilor poate fi planificat pentru o etapă următoare."]
   ],action:"Solicită o estimare",actionPath:"quote"
  },
  contact:{
   over:"PREGĂTIREA UNEI SOLICITĂRI",title:"Ce să scrii când ne contactezi?",
   intro:"Nu ai nevoie de o specificație tehnică pentru a discuta cu SITES EVOLVE. Câteva informații practice sunt suficiente pentru început, fie că ai nevoie de un website nou, redesign, optimizare SEO sau administrare.",
   points:[
    ["Descrie afacerea","Spune-ne ce face compania, unde sunt clienții și dacă ai deja website. Un link către site-ul existent este util pentru un audit sau redesign."],
    ["Explică obiectivul principal","Poate vrei mai multe cereri de ofertă, programări, un catalog de produse sau o prezentare mai clară. Menționează limbile, formularele și integrările esențiale."],
    ["Precizează prioritățile","Dacă ai un termen dorit, buget orientativ sau materiale de brand pregătite, include-le în mesaj. Astfel putem discuta un volum realist de lucru."]
   ],faqTitle:"Înainte să ne scrii",
   faq:[
    ["Pot trimite o idee fără un plan complet?","Da. Descrie ideea cu propriile cuvinte. Detaliile tehnice pot fi clarificate în timpul discuției."],
    ["Lucrați și cu afaceri din afara Moldovei?","Da. SITES EVOLVE are sediul operațional în Chișinău și poate discuta proiecte web la distanță cu afaceri din alte regiuni."]
   ],action:"Vezi serviciile",actionPath:"services"
  },
  work:{
   over:"PORTOFOLIU / PROIECTE REALE",title:"Ce îți arată un studiu de caz?",
   intro:"În portofoliu prezentăm proiecte reale, care pot fi vizitate public. În loc de exemple inventate sau statistici neconfirmate, explicăm ce problemă rezolvă un proiect, ce pot face utilizatorii pe site și cum a fost gândită experiența.",
   points:[
    ["Experiență clară pentru client","Un proiect bine structurat ajută vizitatorii să înțeleagă oferta și să facă următorul pas. Pentru AlviTravel, asta înseamnă să descopere destinații, să exploreze vacanțe și să solicite o ofertă."],
    ["Mai mult decât un design atrăgător","Studiile de caz descriu elemente precum navigarea responsive, formularele, interfața multilingvă și contactul. Detaliile tehnice sunt mai utile decât un preview decorativ."],
    ["Portofoliu pregătit să crească","AlviTravel este momentan proiectul public principal. Pe măsură ce finalizăm alte colaborări și primim acordul de publicare, vor apărea noi carduri și pagini individuale."]
   ],faqTitle:"Despre proiectele noastre",
   faq:[
    ["Pot vedea website-ul real?","Da. Deschide studiul de caz AlviTravel pentru explicațiile despre funcționalități și linkul separat către site-ul public."],
    ["Previzualizările sunt capturi reale de ecran?","Unele imagini sunt reprezentări stilizate, nu capturi exacte din browser. Le marcăm drept previzualizări și oferim acces la website-ul real."]
   ],action:"Discută despre un proiect asemănător",actionPath:"contact"
  },
  founder:{
   over:"FONDATOR / VLAD SERBUȘCO",title:"Business, tehnologie și creativitate",
   intro:"Vlad Serbușco a fondat SITES EVOLVE cu obiectivul de a construi website-uri bine gândite și produse digitale utile. Interesele sale îmbină administrarea afacerilor, dezvoltarea web, designul și leadershipul.",
   points:[
    ["Founder & CEO SITES EVOLVE","Prin studio, Vlad urmărește să transforme ideile de afaceri în experiențe online accesibile. Accentul cade pe comunicare clară, interfețe moderne și soluții care pot evolua odată cu afacerea."],
    ["Fashion Model la ADI Academy","Pe lângă antreprenoriat, Vlad activează ca model la ADI Academy și are apariții pe podium la City Fashion Week în Cluj, România și Emirates Fashion Week în Dubai."],
    ["Educație și leadership","Vlad studiază Business & Administration și este implicat în leadership studențesc. Aceste domenii influențează modul în care privește colaborarea, planificarea și rezolvarea problemelor."]
   ],faqTitle:"Mai multe despre Vlad",
   faq:[
    ["Care este rolul principal al lui Vlad Serbușco?","Este fondatorul și CEO-ul SITES EVOLVE, studio independent de dezvoltare web și inovație digitală."],
    ["Unde pot vedea activitatea de modeling?","Cardul Fashion Model deschide o galerie foto. O pagină separată include fotografiile de la City Fashion Week și Emirates Fashion Week."]
   ],action:"Vezi portofoliul fashion",actionPath:"fashion-model"
  }
 },
 ru:{
  home:{
   over:"SITES EVOLVE / ЦИФРОВОЙ ПАРТНЁР",title:"Чем полезный сайт помогает бизнесу?",
   intro:"Сайт компании должен понятно объяснять предложение, вызывать доверие и помогать посетителям связаться с вами. SITES EVOLVE — независимая студия веб-разработки в Кишинёве, которая работает с местными и удалёнными проектами.",
   points:[
    ["Начинаем с вопросов клиента","Выясняем, что посетитель хочет узнать: какие услуги предлагаются, кому они подходят, почему компании можно доверять и как отправить заявку. На этой основе строим структуру страниц."],
    ["Создаём для реальных задач","Это может быть корпоративный сайт, интернет-магазин, веб-приложение или редизайн. Удобная навигация, формы, доступность и скорость важны не меньше красивого оформления."],
    ["Думаем о развитии после запуска","Сайт меняется вместе с бизнесом. В зависимости от задачи можно обсудить техническое SEO, аналитику, обновления, резервные копии и поддержку."]
   ],faqTitle:"Перед началом работы",
   faq:[
    ["Нужен новый сайт или редизайн?","Всё зависит от существующего сайта. Если основные функции работают хорошо, иногда точечные улучшения полезнее полной переработки."],
    ["Можно начать с небольшого проекта?","Да. Лендинг или компактный сайт компании может быть разумным первым этапом. Бронирования, личные кабинеты и другие интеграции можно запланировать отдельно."]
   ],action:"Посмотреть услуги разработки",actionPath:"services"
  },
  services:{
   over:"ВЕБ-РАЗРАБОТКА / ПРАКТИЧНЫЕ РЕШЕНИЯ",title:"Как выбрать подходящее цифровое решение?",
   intro:"Не каждому бизнесу нужна сложная платформа. Выбор зависит от клиентов, существующего сайта и действий, которые посетитель должен иметь возможность выполнить.",
   points:[
    ["Корпоративные сайты и редизайн","Сайт компании представляет услуги, примеры работ и способы связи. При редизайне сначала определяем, какой контент и функции стоит сохранить."],
    ["Интернет-магазины и дополнительные функции","Магазину нужны понятные категории и удобное оформление заказа. Веб-приложения могут включать аккаунты, права доступа, панели управления и интеграции. Состав функций определяется после обсуждения."],
    ["Видимость, скорость и обслуживание","Техническое SEO включает доступные поисковикам страницы, подходящие заголовки, логичную структуру и мобильную версию. Аналитика и обслуживание помогают улучшать сайт после запуска."]
   ],faqTitle:"Вопросы об услугах",
   faq:[
    ["Что подготовить к первой встрече?","Достаточно краткого описания бизнеса, целевой аудитории, необходимых страниц, материалов бренда и примеров понравившихся сайтов."],
    ["Можете улучшить мой существующий сайт?","В зависимости от платформы и доступа мы можем обсудить редизайн, оптимизацию скорости, SEO или новые функции без полной перестройки."]
   ],action:"Обсудить сайт",actionPath:"contact"
  },
  about:{
   over:"О СТУДИИ / НАШИ ПРИНЦИПЫ",title:"Независимость и внимание к деталям",
   intro:"SITES EVOLVE основана Владом Сербушко для разработки современных цифровых решений для растущих компаний. Студия находится в Кишинёве и рассматривает сайт как сочетание коммуникации, дизайна и технологий.",
   points:[
    ["Сначала понимаем бизнес","До выбора дизайна обсуждаем аудиторию, важную информацию и цель: заявку, заказ, запись или другое конкретное действие."],
    ["Дизайн с понятной задачей","Фирменный стиль должен выделять компанию, но удобство не менее важно. Мы уделяем внимание читаемости, простой навигации, доступности и работе на разных экранах."],
    ["Основа для будущего развития","Потребности бизнеса меняются. При планировании учитываем будущий контент, возможные интеграции, поисковую видимость и поддержку сайта."]
   ],faqTitle:"Сотрудничество с SITES EVOLVE",
   faq:[
    ["Где находится студия?","Студия находится в Кишинёве, Республика Молдова. Обсуждение и многие этапы разработки возможны онлайн."],
    ["Кто основал SITES EVOLVE?","Влад Сербушко — основатель и CEO SITES EVOLVE. Его интересы связаны с предпринимательством, веб-технологиями и дизайном."]
   ],action:"Об основателе",actionPath:"founder"
  },
  process:{
   over:"ПРОЦЕСС / ОТ ИДЕИ ДО ЗАПУСКА",title:"Что происходит после первого разговора?",
   intro:"Понятный процесс снижает неопределённость. Проекты отличаются по объёму, но обычно работа начинается с обсуждения задач бизнеса и заканчивается проверкой сайта перед публикацией.",
   points:[
    ["Анализ и объём работ","Обсуждаем аудиторию, страницы, нужные функции, контент и интеграции. Отделяем обязательные задачи от идей, которые можно реализовать позже."],
    ["Дизайн и разработка","Структура и визуальное направление соответствуют согласованным требованиям. Во время разработки проверяем навигацию, формы и мобильный интерфейс."],
    ["Проверка, запуск и улучшения","Перед публикацией проверяем страницы, ссылки и способы связи. После запуска могут понадобиться обновления, аналитика, SEO и техническая поддержка."]
   ],faqTitle:"Планирование и сотрудничество",
   faq:[
    ["Сколько времени занимает создание сайта?","Сроки зависят от количества страниц, готовности контента, интеграций и правок. Реалистичный график обсуждается после знакомства с задачей."],
    ["Можно менять требования в процессе?","Да, но существенные изменения могут влиять на сроки и стоимость. Открытое обсуждение помогает удерживать приоритеты."]
   ],action:"Опишите проект",actionPath:"quote"
  },
  pricing:{
   over:"БЮДЖЕТ И ПЛАНИРОВАНИЕ",title:"От чего зависит стоимость сайта?",
   intro:"Указанные цены на пакеты — ориентировочные начальные значения, а не автоматические окончательные предложения. Оценка зависит от задач, количества страниц, дизайна, контента и интеграций.",
   points:[
    ["Страницы и возможности","Лендинг требует другого объёма работы, чем магазин, многоязычный сайт или платформа с аккаунтами. Индивидуальные функции обсуждаются отдельно."],
    ["Контент и дизайн","Тексты, фотографии, переводы, фирменный стиль и количество согласований влияют на объём проекта. Подготовленные материалы упрощают планирование."],
    ["Запуск и поддержка","Хостинг, домен, резервные копии, техническое SEO и дальнейшие обновления обсуждаются отдельно по необходимости. Финальное предложение должно точно описывать состав работ."]
   ],faqTitle:"Об оценке стоимости",
   faq:[
    ["Калькулятор показывает окончательную цену?","Нет. Он даёт ориентировочную оценку. Окончательное предложение формируется после обсуждения требований."],
    ["Можно начать с меньшего набора функций?","Часто да. В первую версию могут войти самые важные страницы и действия, а дополнительные возможности — в следующий этап."]
   ],action:"Запросить оценку",actionPath:"quote"
  },
  contact:{
   over:"ПЕРЕД ОБРАЩЕНИЕМ",title:"Что написать в заявке?",
   intro:"Для первого разговора с SITES EVOLVE не нужно техническое задание. Достаточно нескольких деталей — независимо от того, интересует вас новый сайт, редизайн, SEO или обслуживание.",
   points:[
    ["Расскажите о бизнесе","Опишите деятельность компании, аудиторию и наличие сайта. Ссылка на существующий сайт пригодится для аудита или редизайна."],
    ["Укажите главную цель","Возможно, вам нужны заявки, записи, каталог товаров или более понятная презентация бренда. Упомяните языки, формы и важные интеграции."],
    ["Расскажите о приоритетах","Желаемые сроки, примерный бюджет и подготовленные материалы помогут обсудить реалистичный объём работ."]
   ],faqTitle:"Перед тем как связаться",
   faq:[
    ["Можно обратиться без готового плана?","Да. Опишите идею своими словами. Технические детали можно уточнить в разговоре."],
    ["Вы работаете с клиентами из других стран?","Да. Студия находится в Кишинёве и может обсуждать удалённые веб-проекты с компаниями из других регионов."]
   ],action:"Посмотреть услуги",actionPath:"services"
  },
  work:{
   over:"ПОРТФОЛИО / РЕАЛЬНЫЕ ПРОЕКТЫ",title:"Что показывает кейс проекта?",
   intro:"В портфолио представлены реальные проекты, которые можно открыть в интернете. Вместо выдуманных примеров и неподтверждённых цифр мы объясняем задачи, возможности для посетителей и решения в дизайне.",
   points:[
    ["Понятный путь клиента","Хорошая структура помогает человеку понять предложение и сделать следующий шаг. В AlviTravel это выбор направлений, просмотр поездок и запрос предложения."],
    ["Больше, чем красивый экран","На странице проекта описаны адаптивная навигация, формы, несколько языков и способы связи. Такие детали полезнее декоративного превью."],
    ["Портфолио будет расти","AlviTravel — наш текущий открытый проект. После завершения будущих работ и согласования публикации здесь появятся новые карточки и отдельные кейсы."]
   ],faqTitle:"О наших работах",
   faq:[
    ["Можно посмотреть настоящий сайт?","Да. Откройте кейс AlviTravel, чтобы узнать о функциях и перейти на действующий туристический сайт."],
    ["Превью — это скриншоты?","Часть визуалов стилизована и не является точной копией экрана. Мы отмечаем их как превью и даём ссылку на действующий сайт."]
   ],action:"Обсудить подобный проект",actionPath:"contact"
  },
  founder:{
   over:"ОСНОВАТЕЛЬ / ВЛАД СЕРБУШКО",title:"Бизнес, технологии и творчество",
   intro:"Влад Сербушко основал SITES EVOLVE, чтобы создавать продуманные сайты и полезные цифровые продукты. Его интересы объединяют бизнес-администрирование, веб-разработку, дизайн и лидерство.",
   points:[
    ["Founder & CEO SITES EVOLVE","Через студию Влад стремится превращать бизнес-идеи в удобные онлайн-продукты. Приоритет — понятная коммуникация, современные интерфейсы и решения, способные развиваться вместе с бизнесом."],
    ["Fashion Model в ADI Academy","Наряду с предпринимательством Влад занимается моделингом в ADI Academy и участвовал в City Fashion Week в Клуже, Румыния, и Emirates Fashion Week в Дубае."],
    ["Образование и лидерство","Влад изучает Business & Administration и участвует в студенческом самоуправлении. Эти сферы формируют его подход к сотрудничеству и практическим задачам."]
   ],faqTitle:"Подробнее о Владе",
   faq:[
    ["Чем занимается Влад Сербушко?","Он основатель и CEO SITES EVOLVE — независимой студии веб-разработки и цифровых решений."],
    ["Где посмотреть фотографии с показов?","Карточка Fashion Model открывает галерею. Отдельная страница содержит фотографии City Fashion Week и Emirates Fashion Week."]
   ],action:"Fashion-портфолио",actionPath:"fashion-model"
  }
 }
};
export default function SeoEditorial({locale,kind}:{locale:Locale;kind:Kind}){
 const t=content[locale][kind];
 return <section className={"seo-editorial seo-editorial-"+kind} aria-label={t.title}><div className="container">
  <div className="seo-editorial-head"><div><span className="seo-editorial-overline"><span/>{t.over}</span><h2>{t.title}</h2></div><p>{t.intro}</p></div>
  <div className="seo-editorial-grid">{t.points.map(([title,description],i)=><article key={title} className="seo-editorial-point">
   <div className="seo-editorial-point-top"><span>0{i+1}</span><CheckCircle2 size={19} strokeWidth={1.7} aria-hidden="true"/></div>
   <h3>{title}</h3><p>{description}</p>
  </article>)}</div>
  <div className="seo-editorial-bottom">
   <div className="seo-editorial-faq"><h3>{t.faqTitle}</h3><div>{t.faq.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div>
   <Link href={pathFor(locale,t.actionPath)} className="seo-editorial-link">{t.action}<ArrowUpRight size={18} aria-hidden="true"/></Link>
  </div>
 </div></section>;
}
