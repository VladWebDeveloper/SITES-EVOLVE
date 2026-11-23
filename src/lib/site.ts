export const brand = "SITES EVOLVE";
export const contactEmail = "sites.evolve7@gmail.com";
export const contactPhone = "+37360356515";
export const contactPhoneDisplay = "+373 603 56 515";
export const whatsappUrl = "https://wa.me/37360356515";
export const telegramUrl = "https://t.me/Goa7ik";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? "https://"+process.env.VERCEL_URL : "http://localhost:3000");
export const locales = ["en","ro","ru"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export function pathFor(locale: Locale, segments = "") { return `/${locale}${segments ? "/"+segments : ""}`; }
export function absoluteUrl(path="") { return new URL(path,siteUrl).toString(); }
export type Service = {id:string; icon:string; title:string; body:string; detail:string; deliverables:string[]};
export const services: Record<Locale,Service[]> = {
 en:[
 {id:"web-development",icon:"code",title:"Web development",body:"Websites engineered to turn attention into action.",detail:"High-performing marketing sites, corporate platforms, booking experiences and custom web applications built for clarity, speed and growth.",deliverables:["Custom UX & responsive interfaces","SEO-ready architecture","Integrations and analytics","Deployment and handover"]},
 {id:"ai-automation",icon:"sparkles",title:"AI & automation",body:"Intelligent systems that take repetitive work off your plate.",detail:"Practical AI assistants, document workflows and reliable automation connecting the tools your business already uses.",deliverables:["AI chatbot design","Workflow automation","API integrations","Monitoring and safeguards"]},
 {id:"applications",icon:"blocks",title:"Apps & software",body:"Products your customers and teams actually enjoy using.",detail:"Custom web apps, internal tools, customer portals and mobile-ready platforms, designed around a real problem and measurable business need.",deliverables:["Product discovery","Application development","Authentication & permissions","Testing and deployment"]},
 {id:"ecommerce",icon:"bag",title:"E-commerce",body:"Beautiful storefronts with performance behind the scenes.",detail:"Conversion-led product experiences, catalogues, checkout integrations, and streamlined management.",deliverables:["Shopfront design","Product architecture","Checkout integration","Conversion analytics"]},
 {id:"seo-growth",icon:"chart",title:"SEO & performance",body:"Get discovered. Load instantly. Convert confidently.",detail:"Technical SEO, content structures, Core Web Vitals, and measured improvements that compound over time.",deliverables:["Technical audit","Structured metadata","Speed optimization","Analytics & reporting"]},
 {id:"care",icon:"shield",title:"Website care",body:"Launch is a milestone, not the finish line.",detail:"Managed updates, monitoring, backups and ongoing improvements to keep your digital presence healthy.",deliverables:["Maintenance and upgrades","Uptime monitoring","Security reviews","Priority support"]}
 ],
 ro:[
 {id:"web-development",icon:"code",title:"Dezvoltare web",body:"Website-uri care transformă atenția în rezultate.",detail:"Site-uri de prezentare, platforme corporate, rezervări și aplicații web personalizate, construite pentru viteză și creștere.",deliverables:["Design UX și interfețe responsive","Arhitectură SEO","Integrări și analytics","Publicare și predare"]},
 {id:"ai-automation",icon:"sparkles",title:"AI și automatizări",body:"Sisteme inteligente care elimină munca repetitivă.",detail:"Asistenți AI, fluxuri documentare și automatizări conectate la instrumentele pe care afacerea ta le folosește.",deliverables:["Chatbot AI personalizat","Automatizări de procese","Integrări API","Monitorizare și control"]},
 {id:"applications",icon:"blocks",title:"Aplicații și software",body:"Produse digitale pe care oamenii vor să le folosească.",detail:"Aplicații web, instrumente interne, portaluri pentru clienți și platforme adaptate necesităților reale.",deliverables:["Analiza produsului","Dezvoltare aplicații","Autentificare și acces","Testare și publicare"]},
 {id:"ecommerce",icon:"bag",title:"Magazine online",body:"Magazine atractive și optimizate pentru conversii.",detail:"Experiențe e-commerce cu catalog, proces de comandă și management simplificat.",deliverables:["Design magazin online","Structură de produse","Integrare plăți","Analiză conversii"]},
 {id:"seo-growth",icon:"chart",title:"SEO și performanță",body:"Mai multă vizibilitate. Mai multă viteză. Mai multe rezultate.",detail:"SEO tehnic, conținut structurat, Core Web Vitals și optimizări măsurabile.",deliverables:["Audit tehnic","Metadate structurate","Optimizare viteză","Analytics și rapoarte"]},
 {id:"care",icon:"shield",title:"Mentenanță website",body:"Lansarea este doar începutul.",detail:"Actualizări, monitorizare, backupuri și îmbunătățiri continue.",deliverables:["Mentenanță și actualizări","Monitorizare disponibilitate","Verificări de securitate","Suport prioritar"]}
 ],
 ru:[
 {id:"web-development",icon:"code",title:"Веб-разработка",body:"Сайты, которые превращают внимание в результат.",detail:"Корпоративные сайты, системы бронирования и веб-приложения с акцентом на скорость, удобство и развитие бизнеса.",deliverables:["Адаптивный UX-дизайн","SEO-архитектура","Интеграции и аналитика","Запуск и передача проекта"]},
 {id:"ai-automation",icon:"sparkles",title:"ИИ и автоматизация",body:"Умные системы вместо повторяющейся работы.",detail:"ИИ-ассистенты и автоматизированные процессы, интегрированные с существующими инструментами бизнеса.",deliverables:["ИИ-чатботы","Автоматизация процессов","API-интеграции","Мониторинг и безопасность"]},
 {id:"applications",icon:"blocks",title:"Приложения и ПО",body:"Цифровые продукты, которыми приятно пользоваться.",detail:"Веб-приложения, внутренние инструменты и клиентские порталы для реальных задач бизнеса.",deliverables:["Проектирование продукта","Разработка приложений","Доступ и авторизация","Тестирование и запуск"]},
 {id:"ecommerce",icon:"bag",title:"Интернет-магазины",body:"Красивые витрины и продуманные продажи.",detail:"Каталоги, заказы, интеграции оплаты и удобное управление магазином.",deliverables:["Дизайн магазина","Каталог товаров","Интеграция оплаты","Аналитика конверсий"]},
 {id:"seo-growth",icon:"chart",title:"SEO и скорость",body:"Больше видимости. Выше скорость. Лучше результат.",detail:"Техническое SEO, структурированный контент и оптимизация Core Web Vitals.",deliverables:["Технический аудит","Метаданные","Оптимизация скорости","Аналитика и отчёты"]},
 {id:"care",icon:"shield",title:"Поддержка сайтов",body:"Запуск — это только начало.",detail:"Обновления, мониторинг, резервные копии и постоянные улучшения.",deliverables:["Обновления и поддержка","Мониторинг доступности","Проверки безопасности","Приоритетная помощь"]}
 ]
};
export type Work = {id:string; eyebrow:string; title:string; category:string; description:string; url?:string; theme:string; coverImage?:string; features?:{title:string;description:string}[]; technologies?:string[]; challenge?:string; solution?:string};
export const works: Record<Locale,Work[]> = {
 en:[{id:"alvitravel",eyebrow:"TRAVEL • WEB PLATFORM",title:"AlviTravel",category:"Travel & discovery",description:"A travel-oriented digital experience bringing destinations and enquiries together in a streamlined interface.",url:"https://alvitravel.md",theme:"sea"}],
 ro:[{id:"alvitravel",eyebrow:"TURISM • PLATFORMĂ WEB",title:"AlviTravel",category:"Turism și descoperire",description:"Experiență digitală dedicată călătoriilor, care reunește destinațiile și solicitările de ofertă într-o interfață simplă.",url:"https://alvitravel.md",theme:"sea"}],
 ru:[{id:"alvitravel",eyebrow:"ТУРИЗМ • ВЕБ-ПЛАТФОРМА",title:"AlviTravel",category:"Туризм",description:"Цифровая платформа о путешествиях, объединяющая направления и заявки.",url:"https://alvitravel.md",theme:"sea"}]
};
export const journal = [
 {slug:"why-digital-experiences-matter",category:"PERSPECTIVES",date:"2026-11-16",readTime:"4 MIN",title:{en:"Why great digital experiences matter",ro:"De ce contează experiențele digitale excelente",ru:"Почему важен качественный цифровой опыт"},excerpt:{en:"A website should do more than look good. It should make the next step obvious.",ro:"Un website trebuie să facă mai mult decât să arate bine. Trebuie să simplifice următorul pas.",ru:"Сайт должен не только красиво выглядеть, но и помогать сделать следующий шаг."},paragraphs:{en:["A beautiful website earns attention. A useful one earns trust. The strongest digital experiences combine both.","I believe good digital work begins with listening: understanding the person behind the business, the customer on the other side of the screen and the problem that needs solving.","At SITES EVOLVE, the goal is to connect design, technology and practical thinking. Every interaction should have a purpose. Every page should help people move forward.","That approach applies whether we are creating a small business website, a booking experience or a future AI-powered platform."],ro:["Un site frumos atrage atenția. Un site util câștigă încrederea. Cele mai bune experiențe digitale le combină pe ambele.","Cred că un proiect digital reușit începe cu înțelegerea afacerii, a utilizatorului și a problemei reale pe care o rezolvăm.","La SITES EVOLVE vrem să conectăm designul, tehnologia și gândirea practică. Fiecare interacțiune trebuie să aibă un scop.","Această filosofie se aplică atât site-urilor mici, cât și platformelor complexe și soluțiilor AI."],ru:["Красивый сайт привлекает внимание. Полезный — завоёвывает доверие. Лучшие решения объединяют оба качества.","Я считаю, что хорошая цифровая работа начинается с понимания бизнеса, пользователя и задачи.","В SITES EVOLVE мы соединяем дизайн, технологии и практический подход. Каждое взаимодействие должно быть осмысленным.","Этот принцип работает и для небольших сайтов, и для будущих ИИ-платформ."]}},
 {slug:"building-sites-evolve",category:"FOUNDER NOTES",date:"2026-11-16",readTime:"3 MIN",title:{en:"Building SITES EVOLVE, one decision at a time",ro:"Construiesc SITES EVOLVE, pas cu pas",ru:"Создаю SITES EVOLVE шаг за шагом"},excerpt:{en:"The thinking behind a studio made for businesses that want to grow.",ro:"Ideile din spatele unei agenții construite pentru afaceri care vor să crească.",ru:"Идеи студии для компаний, которые хотят расти."},paragraphs:{en:["SITES EVOLVE began with a simple conviction: a strong online presence should be accessible to ambitious businesses, not only large companies.","I am building this studio around thoughtful design, modern engineering and long-term partnerships. The ambition is to grow beyond websites into apps, automation and AI solutions.","We are at the beginning. The work you see here reflects a growing portfolio and a commitment to improving with every project."],ro:["SITES EVOLVE a pornit de la o convingere simplă: o prezență online puternică trebuie să fie accesibilă afacerilor ambițioase, nu doar companiilor mari.","Construiesc această agenție în jurul designului atent, tehnologiei moderne și colaborărilor de durată. Ambiția este să evoluăm de la website-uri către aplicații, automatizări și AI.","Suntem la început. Proiectele prezentate reflectă un portofoliu în dezvoltare și dorința de a progresa cu fiecare colaborare."],ru:["SITES EVOLVE начался с простой идеи: качественное присутствие в интернете должно быть доступно не только крупным компаниям.","Я строю студию на современном дизайне, технологиях и долгосрочном сотрудничестве. В будущем — приложения, автоматизация и ИИ.","Мы только начинаем. Наше портфолио развивается вместе с каждым новым проектом."]}}
,
 {
 "slug": "why-i-started-sites-evolve",
 "category": "FOUNDER / ENTREPRENEURSHIP",
 "date": "2026-11-23",
 "readTime": "5 MIN",
 "title": {
  "en": "Why I started SITES EVOLVE while studying business",
  "ro": "De ce am început SITES EVOLVE în timp ce studiez business",
  "ru": "Почему я основал SITES EVOLVE во время учёбы"
 },
 "excerpt": {
  "en": "My perspective on building a small web development studio, learning through real projects and growing step by step.",
  "ro": "Cum văd dezvoltarea unui studio web, învățarea prin proiecte reale și creșterea pas cu pas.",
  "ru": "Мой взгляд на создание веб-студии, обучение через реальные проекты и постепенное развитие."
 },
 "paragraphs": {
  "en": [
   "My name is Vlad Serbușco. I am studying Business Administration at ASEM in Chișinău, and I founded SITES EVOLVE because I wanted to connect what I learn about businesses with the practical work of building digital products.",
   "For a young studio, the first important question is not how big it can look. It is whether someone can clearly understand what it offers, see the work behind it and contact the person responsible. I want SITES EVOLVE to be transparent about what is complete, what is still being developed and what it can realistically deliver.",
   "I became interested in websites as business tools rather than simply collections of pages. A restaurant may need a menu and a direct enquiry path. A service business may need a clear explanation of its offer and a way to request an appointment. A travel agency may need useful destination information and a straightforward way to request a quote.",
   "One project I can point to is AlviTravel, a travel-focused digital experience included in the SITES EVOLVE portfolio. It has helped me think more carefully about multilingual navigation, practical contact options and the relationship between design and customer needs. A published project is more meaningful to me than claims of results that have not been measured.",
   "Building a studio while studying is also a lesson in prioritisation. Design, development, communication and ongoing maintenance all compete for time. I try to break work into concrete steps: clarify the goal, build the essential path, test it and improve what is actually useful.",
   "My longer-term ambition is to work with businesses in Moldova and internationally. That does not mean presenting a small studio as a large global agency. It means communicating clearly, setting an honest scope and doing the work well. I believe credibility grows from consistent decisions, not just a polished homepage.",
   "SITES EVOLVE is still evolving. That is part of the name and part of the idea: build something useful today, learn from it and make it better tomorrow."
  ],
  "ro": [
   "Mă numesc Vlad Serbușco. Studiez Business și Administrare la ASEM, în Chișinău, și am fondat SITES EVOLVE pentru că vreau să conectez ceea ce învăț despre afaceri cu experiența practică de a construi produse digitale.",
   "Pentru un studio aflat la început, cea mai importantă întrebare nu este cât de mare pare, ci dacă oamenii înțeleg clar ce oferă, pot vedea proiectele reale și pot contacta persoana responsabilă. Vreau ca SITES EVOLVE să fie transparent în privința serviciilor, proiectelor și posibilităților reale de livrare.",
   "Mă interesează website-urile ca instrumente de business, nu doar ca pagini frumoase. O cafenea poate avea nevoie de un meniu ușor de accesat. Un atelier poate avea nevoie de o prezentare a serviciilor și de solicitări de programare. O agenție de turism poate avea nevoie de informații utile despre destinații și un mod simplu de a solicita oferte.",
   "Un proiect pe care îl pot prezenta este AlviTravel, o experiență digitală din domeniul turismului, inclusă în portofoliul SITES EVOLVE. Lucrul la el m-a făcut să acord atenție navigării multilingve, opțiunilor de contact și legăturii dintre design și nevoile clienților. Pentru mine, un proiect prezentat corect valorează mai mult decât statistici de succes neverificate.",
   "Să construiesc un studio în paralel cu studiile înseamnă și să învăț să stabilesc priorități. Designul, dezvoltarea, comunicarea și mentenanța necesită timp. Încerc să împart fiecare proiect în pași concreți: definirea obiectivului, dezvoltarea funcțiilor esențiale, testarea și îmbunătățirea lor.",
   "Pe termen lung, vreau să colaborez cu afaceri din Moldova și din alte țări. Asta nu înseamnă să prezint un studio mic drept o agenție globală. Înseamnă să comunic clar, să stabilesc responsabilitățile realist și să livrez lucrări utile. Credibilitatea se construiește prin decizii consecvente.",
   "SITES EVOLVE este încă în dezvoltare. Tocmai asta exprimă numele: construiești ceva util astăzi, înveți din experiență și evoluezi mâine."
  ],
  "ru": [
   "Меня зовут Влад Сербушко. Я изучаю бизнес и администрирование в ASEM в Кишинёве и основал SITES EVOLVE, потому что хочу соединить знания о предпринимательстве с практической разработкой цифровых продуктов.",
   "Для молодой студии важнее не казаться крупной компанией, а ясно объяснять свои услуги, показывать реальные проекты и оставаться доступной для клиентов. Я хочу, чтобы SITES EVOLVE открыто рассказывала о выполненной работе и о том, какие задачи действительно может решить.",
   "Я рассматриваю сайты как инструменты бизнеса, а не просто красивые страницы. Кафе может понадобиться удобное цифровое меню. Ателье — описание услуг и форма записи. Туристическому агентству — понятные направления и способ запросить предложение.",
   "Один из проектов, о которых я могу рассказать, — AlviTravel, цифровая платформа в сфере путешествий из портфолио SITES EVOLVE. Работа над ним заставила меня внимательнее относиться к многоязычной навигации, удобным способам связи и связи дизайна с потребностями клиентов. Реальный проект для меня важнее неподтверждённых обещаний результата.",
   "Создавать студию параллельно с учёбой — значит учиться расставлять приоритеты. Дизайн, разработка, общение с клиентами и поддержка требуют времени. Я стараюсь двигаться по шагам: определить цель, реализовать главное, протестировать и затем улучшить.",
   "В будущем я хочу сотрудничать с компаниями из Молдовы и других стран. Это не значит изображать небольшую студию большой международной корпорацией. Гораздо важнее ясно общаться, реально оценивать объём работы и создавать полезные решения.",
   "SITES EVOLVE продолжает развиваться. В этом и заключается идея бренда: создать что-то полезное сегодня, извлечь уроки и сделать лучше завтра."
  ]
 }
},
 {
 "slug": "what-student-leadership-taught-me",
 "category": "FOUNDER / LEADERSHIP",
 "date": "2026-11-23",
 "readTime": "4 MIN",
 "title": {
  "en": "What student leadership taught me about building projects",
  "ro": "Ce m-a învățat leadershipul studențesc despre proiecte",
  "ru": "Чему студенческое лидерство научило меня в работе над проектами"
 },
 "excerpt": {
  "en": "Listening, clear responsibilities and realistic execution matter in student initiatives and business projects alike.",
  "ro": "Ascultarea, responsabilitățile clare și execuția realistă contează atât în proiectele studențești, cât și în business.",
  "ru": "Умение слушать, ясные обязанности и реалистичный подход важны и в студенческих инициативах, и в бизнесе."
 },
 "paragraphs": {
  "en": [
   "Alongside building SITES EVOLVE, I serve as Vice President of the ASEM Student Senate. Student leadership and entrepreneurship are different kinds of work, but both require you to turn ideas into decisions that other people can understand and act on.",
   "One lesson is to listen before proposing a solution. When people describe a problem, they may ask for one thing while actually needing another. In student initiatives, that means understanding the real concern behind a request. In web development, it means learning what a business and its customers need before choosing features.",
   "A second lesson is to define responsibilities. A good event, a student project and a new website all involve moving parts. Progress becomes easier to see when it is clear what will be delivered, who is responsible and when the next review takes place.",
   "Third, communication is part of the work, not an optional extra. It is tempting to focus on the visible result: the finished design, the public event or the website launch. But expectations, changes and unanswered questions often determine how smoothly people can collaborate.",
   "I am still learning. Being involved in student representation does not automatically make someone an experienced business leader. It gives me opportunities to practise organisation, collaboration and accountability in situations where other people depend on the outcome.",
   "That is the mindset I want to bring to SITES EVOLVE: start with a real need, keep promises proportional to our capacity and improve through honest feedback."
  ],
  "ro": [
   "Pe lângă dezvoltarea SITES EVOLVE, sunt vicepreședinte al Senatului Studențesc ASEM. Leadershipul studențesc și antreprenoriatul sunt activități diferite, dar ambele presupun transformarea ideilor în decizii clare, pe care oamenii le pot pune în practică.",
   "Prima lecție este să asculți înainte de a propune o soluție. Uneori, oamenii cer un anumit lucru, dar nevoia reală este alta. În activitățile studențești, trebuie să înțelegi problema din spatele solicitării. În dezvoltarea web, trebuie să înțelegi afacerea și clienții ei înainte să alegi funcționalitățile.",
   "A doua lecție este claritatea responsabilităților. Un eveniment, un proiect studențesc și un website presupun multe detalii. Lucrurile se mișcă mai bine atunci când știm ce trebuie livrat, cine răspunde și când verificăm progresul.",
   "A treia lecție este că comunicarea face parte din rezultat. Este ușor să ne concentrăm doar asupra lucrului vizibil: designul final, evenimentul public sau lansarea site-ului. Dar așteptările, modificările și întrebările fără răspuns influențează decisiv colaborarea.",
   "Sunt încă în proces de învățare. Implicarea în reprezentarea studenților nu transformă automat pe cineva într-un lider de business experimentat. Îmi oferă însă ocazii reale de a exersa organizarea, cooperarea și asumarea responsabilității.",
   "Aceasta este mentalitatea pe care vreau să o dezvolt la SITES EVOLVE: pornim de la o nevoie reală, promitem doar ceea ce putem susține și îmbunătățim prin feedback sincer."
  ],
  "ru": [
   "Параллельно с развитием SITES EVOLVE я занимаю должность вице-президента Студенческого сената ASEM. Студенческое лидерство и предпринимательство — разные виды деятельности, но в обоих случаях нужно превращать идеи в понятные решения и конкретные действия.",
   "Первый урок — сначала слушать, а уже потом предлагать решение. Иногда люди просят об одном, а на самом деле им нужно другое. В студенческих инициативах важно понять настоящую проблему. В веб-разработке — разобраться в задачах бизнеса и его клиентов, прежде чем выбирать функции.",
   "Второй урок — чёткое распределение ответственности. И мероприятие, и студенческий проект, и создание сайта состоят из множества задач. Работа идёт лучше, когда понятно, что должно быть готово, кто отвечает и когда проверяется результат.",
   "Третий урок — общение является частью результата. Легко сосредоточиться на том, что видно всем: дизайне, мероприятии или запуске сайта. Но ожидания, изменения и вопросы без ответа часто определяют качество сотрудничества.",
   "Я продолжаю учиться. Участие в студенческом самоуправлении не делает человека автоматически опытным руководителем бизнеса. Но оно даёт возможность на практике развивать организацию, сотрудничество и ответственность.",
   "Именно такой подход я хочу использовать в SITES EVOLVE: начинать с реальной потребности, обещать только то, что можем выполнить, и улучшать работу благодаря честной обратной связи."
  ]
 }
}
] as const;

export type PublishedPost = {slug:string;locale:Locale;title:string;excerpt:string;body:string;category:string;publishedAt:string|null};
