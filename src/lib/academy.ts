import type {Locale} from "@/lib/site";
export type Guide={slug:string;meta:Record<Locale,[title:string,excerpt:string,category:string]>;sections:Record<Locale,[heading:string,body:string][]>};
export const academyGuides:Guide[]=[
  {
    "slug": "cum-pregatesti-un-site-profesional",
    "meta": {
      "ro": [
        "Cum pregătești un website profesional pentru afacerea ta",
        "Un plan practic pentru obiective, pagini, conținut, buget și lansare.",
        "Ghid website"
      ],
      "en": [
        "How to prepare a professional business website",
        "A practical plan for goals, pages, content, budget and launch.",
        "Website guide"
      ],
      "ru": [
        "Как подготовить профессиональный сайт для бизнеса",
        "Практический план: цели, страницы, контент, бюджет и запуск.",
        "Руководство по сайтам"
      ]
    },
    "sections": {
      "ro": [
        [
          "Începe cu un obiectiv măsurabil",
          "Un website nu este doar o carte de vizită. Stabilește ce acțiune dorești de la vizitatori: solicitare de ofertă, programare, apel sau comandă. Alege o acțiune principală pentru fiecare pagină importantă, astfel încât utilizatorii să știe exact ce trebuie să facă."
        ],
        [
          "Definește structura înainte de design",
          "Pentru un website de prezentare, pornește de la Acasă, Servicii, Portofoliu sau Studii de caz, Despre noi și Contact. Adaugă pagini suplimentare doar când există conținut util. Navigarea trebuie să fie logică atât pe telefon, cât și pe desktop."
        ],
        [
          "Pregătește materialele autentice",
          "Colectează descrieri de servicii, fotografii reale, logo-ul, datele de contact și întrebările frecvente ale clienților. Folosește un limbaj clar și evită promisiunile exagerate. Textele originale sunt mai utile decât paragrafele copiate de pe alte site-uri."
        ],
        [
          "Planifică lansarea și administrarea",
          "Verifică domeniul, găzduirea, SSL, backupurile, formularul de contact, versiunea mobilă și instrumentele de măsurare. După lansare, programează actualizări de securitate și verificări periodice. Un site bun evoluează după feedbackul vizitatorilor."
        ],
        [
          "Următorul pas",
          "Poți folosi simulatorul SITES EVOLVE pentru o estimare orientativă și apoi poți solicita o ofertă adaptată afacerii tale."
        ]
      ],
      "en": [
        [
          "Start with one measurable objective",
          "A business website should help visitors complete a meaningful action: requesting a quote, booking a consultation, calling or ordering. Give every important page a clear primary action. This is more useful than adding effects without a purpose."
        ],
        [
          "Plan the structure before the visuals",
          "A clear starting point is Home, Services, Portfolio or Case studies, About and Contact. Add extra pages only when they answer a real customer question. Navigation should remain understandable on mobile screens and with a keyboard."
        ],
        [
          "Collect genuine materials",
          "Prepare service descriptions, original photographs, your logo, accurate contact details and frequent customer questions. Prefer concrete outcomes over exaggerated claims. Useful original content creates more trust than copied marketing text."
        ],
        [
          "Plan launch and ongoing care",
          "Check the domain, hosting, SSL, backups, forms, mobile layout and analytics consent. After launch, schedule security updates and routine checks. A successful website improves continuously based on customer feedback."
        ],
        [
          "Next step",
          "Try the SITES EVOLVE website simulator for an indicative scope and request a tailored proposal when you are ready."
        ]
      ],
      "ru": [
        [
          "Начните с измеримой цели",
          "Бизнес-сайт должен помогать посетителям совершать понятное действие: запросить предложение, записаться на консультацию, позвонить или оформить заказ. Для каждой важной страницы определите одну основную цель."
        ],
        [
          "Сначала структура, затем дизайн",
          "Начните со страниц: Главная, Услуги, Портфолио, О компании и Контакты. Добавляйте новые страницы, только если они отвечают на конкретные вопросы клиентов. Навигация должна быть удобной на телефоне."
        ],
        [
          "Подготовьте настоящий контент",
          "Соберите описания услуг, оригинальные фотографии, логотип, актуальные контакты и ответы на частые вопросы. Конкретика вызывает больше доверия, чем необоснованные обещания или тексты, скопированные с чужих сайтов."
        ],
        [
          "Продумайте запуск и поддержку",
          "Проверьте домен, хостинг, SSL, резервные копии, формы, мобильную версию и согласие на аналитику. После запуска регулярно обновляйте сайт и проверяйте безопасность и доступность."
        ],
        [
          "Следующий шаг",
          "Используйте симулятор SITES EVOLVE для предварительной оценки и отправьте запрос на индивидуальное предложение."
        ]
      ]
    }
  },
  {
    "slug": "seo-tehnic-pentru-afaceri",
    "meta": {
      "ro": [
        "SEO tehnic: ce trebuie să verifice orice afacere",
        "Indexare, sitemap, canonical, metadate, conținut și măsurarea rezultatelor.",
        "SEO tehnic"
      ],
      "en": [
        "Technical SEO checklist for small businesses",
        "Indexing, sitemaps, canonical URLs, metadata, content and measurement.",
        "Technical SEO"
      ],
      "ru": [
        "Техническое SEO для бизнеса: чек-лист",
        "Индексация, sitemap, canonical, метаданные, контент и аналитика.",
        "Техническое SEO"
      ]
    },
    "sections": {
      "ro": [
        [
          "Permite motoarelor de căutare să acceseze paginile publice",
          "Verifică robots.txt, directivele noindex și codurile HTTP ale paginilor. O pagină importantă trebuie să fie accesibilă și să răspundă corect. Paginile inexistente trebuie să returneze 404, nu o pagină de eroare cu HTTP 200."
        ],
        [
          "Construiește un sitemap curat",
          "Sitemap-ul XML trebuie să includă URL-uri canonice, indexabile și valide. Trimite-l în Google Search Console și urmărește eventualele erori. Trimiterea sitemap-ului ajută descoperirea, dar nu garantează indexarea."
        ],
        [
          "Fiecare pagină are o intenție",
          "Scrie titluri unice, descrieri clare și câte un titlu principal H1 relevant. Creează legături interne naturale între servicii, studii de caz și articole. Conținutul trebuie să răspundă mai bine unei întrebări decât o listă de cuvinte-cheie repetate."
        ],
        [
          "Folosește canonical și versiuni lingvistice consecvent",
          "Pentru conținut duplicat sau variante de URL, declară adresa preferată prin canonical. Dacă site-ul are mai multe limbi, leagă versiunile echivalente prin hreflang și păstrează navigarea coerentă."
        ],
        [
          "Măsoară și îmbunătățește",
          "Analizează în Search Console paginile indexate, căutările care aduc afișări și problemele tehnice. Verifică performanța pe mobil cu Lighthouse. SEO este un proces continuu, nu o setare unică."
        ]
      ],
      "en": [
        [
          "Make public pages crawlable",
          "Check robots.txt, noindex directives and HTTP status codes. Important public pages should be accessible and return the proper response. Missing content should return HTTP 404 rather than a successful response containing an error page."
        ],
        [
          "Keep your XML sitemap accurate",
          "Include valid, canonical, indexable URLs in the sitemap. Submit it to Google Search Console and investigate processing errors. Submission helps discovery but never guarantees indexing or search ranking."
        ],
        [
          "Make every page answer a search intent",
          "Write unique titles, relevant headings and useful descriptions. Add contextual internal links between services, case studies and tutorials. Avoid stuffing the same phrases repeatedly: search visibility follows genuinely helpful pages."
        ],
        [
          "Use canonical and language signals properly",
          "Declare preferred URLs with canonical links. On multilingual sites, connect equivalent translated pages with hreflang annotations and maintain a consistent URL structure."
        ],
        [
          "Monitor rather than guessing",
          "Review indexed-page reports, queries and impressions in Search Console. Use Lighthouse to assess mobile experience. Technical SEO requires periodic maintenance, testing and better content over time."
        ]
      ],
      "ru": [
        [
          "Откройте публичные страницы для индексации",
          "Проверьте robots.txt, директивы noindex и HTTP-статусы. Важные страницы должны быть доступны, а несуществующие адреса обязаны отвечать кодом 404, а не 200 с текстом ошибки."
        ],
        [
          "Поддерживайте правильный sitemap",
          "Добавляйте в XML-карту только корректные канонические URL. Отправьте карту в Google Search Console и проверяйте ошибки. Sitemap помогает обнаружить страницы, но не гарантирует индексацию."
        ],
        [
          "Отвечайте на реальные запросы",
          "Пишите уникальные заголовки, понятные описания и полезный контент. Связывайте услуги, кейсы и статьи внутренними ссылками. Избыточное повторение ключевых слов не делает страницу полезнее."
        ],
        [
          "Следите за canonical и языками",
          "Для похожих URL задавайте канонический адрес. На мультиязычном сайте связывайте переводы с помощью hreflang и сохраняйте последовательную структуру ссылок."
        ],
        [
          "Анализируйте результаты",
          "Следите за индексацией, показами и поисковыми запросами в Search Console. Проверяйте мобильную версию в Lighthouse. SEO требует регулярных проверок и улучшений."
        ]
      ]
    }
  },
  {
    "slug": "magazin-online-de-la-idee-la-lansare",
    "meta": {
      "ro": [
        "Magazin online: de la idee la prima comandă",
        "Catalog, plăți, livrare, securitate și operațiuni: o listă înainte de lansare.",
        "E-commerce"
      ],
      "en": [
        "E-commerce launch checklist: from idea to first order",
        "Catalogue, payments, delivery, security and operations before launch.",
        "E-commerce"
      ],
      "ru": [
        "Как подготовить интернет-магазин к запуску",
        "Каталог, платежи, доставка, безопасность и процессы заказа.",
        "Интернет-магазин"
      ]
    },
    "sections": {
      "ro": [
        [
          "Organizează catalogul pentru oameni",
          "Grupează produsele în categorii intuitive. Fiecare produs are nevoie de nume, fotografii clare, descriere, preț, disponibilitate și informații despre livrare. Pentru un catalog mare, filtrele și căutarea devin esențiale."
        ],
        [
          "Desenează traseul comenzii",
          "Testează drumul de la pagina produsului la coș și checkout. Solicită doar informațiile necesare, explică taxele și costurile de livrare din timp și confirmă comenzile printr-o notificare clară."
        ],
        [
          "Verifică procesarea plăților",
          "Un procesator de plăți trebuie să accepte juridic și comercial țara, firma și tipul de produse. Nu activa plăți fără un cont de comerciant aprobat și condiții legale corecte."
        ],
        [
          "Pregătește livrarea și suportul",
          "Stabilește metodele de livrare, timpul estimat, retururile și canalul de suport. Testează situațiile neobișnuite: produs epuizat, comandă anulată, email nelivrat și adresă invalidă."
        ],
        [
          "Măsoară conversia",
          "Urmărește vizite, adăugări în coș și comenzi numai cu analitice conforme consimțământului. Folosește datele pentru a elimina fricțiunea din cumpărare."
        ]
      ],
      "en": [
        [
          "Organize the catalogue for people",
          "Group products into intuitive categories. Every product needs a clear title, original imagery, description, accurate price, availability and delivery information. Search and filters matter as the catalogue grows."
        ],
        [
          "Design the complete order journey",
          "Test every step from a product page to the cart and checkout. Ask only for essential details, disclose shipping costs early and send an understandable order confirmation."
        ],
        [
          "Choose payment processing responsibly",
          "Payment providers have legal and commercial eligibility rules based on your country, business and product category. Do not activate payments before a merchant account has been approved and the required terms are in place."
        ],
        [
          "Prepare fulfilment and customer service",
          "Define shipping methods, expected times, return policies and support channels. Test edge cases including out-of-stock items, cancelled orders, undelivered email and invalid addresses."
        ],
        [
          "Measure what matters",
          "Track visits, add-to-cart actions and completed orders only when the visitor has provided appropriate analytics consent. Use the resulting insight to improve purchasing."
        ]
      ],
      "ru": [
        [
          "Сделайте удобный каталог",
          "Распределите товары по понятным категориям. Для каждого нужны название, оригинальные фотографии, описание, цена, наличие и условия доставки. Поиск и фильтры особенно важны для больших каталогов."
        ],
        [
          "Проверьте путь покупки",
          "Пройдите от карточки товара до корзины и оформления заказа. Запрашивайте только необходимые данные, заранее указывайте стоимость доставки и отправляйте понятное подтверждение."
        ],
        [
          "Выбирайте платежные системы ответственно",
          "Провайдер платежей должен поддерживать страну, юридический статус бизнеса и товарную категорию. Не подключайте прием платежей без одобренного торгового аккаунта и необходимых правил."
        ],
        [
          "Организуйте доставку и поддержку",
          "Определите способы доставки, сроки, правила возвратов и каналы связи. Проверьте ошибки: нет товара, отмена, неверный адрес, письмо не доставлено."
        ],
        [
          "Оценивайте конверсию",
          "С согласия пользователей анализируйте просмотры, добавления в корзину и покупки. Используйте данные для улучшения удобства оформления заказа."
        ]
      ]
    }
  },
  {
    "slug": "viteza-si-securitatea-site-ului",
    "meta": {
      "ro": [
        "Viteza și securitatea unui website: verificări de bază",
        "Cum eviți paginile lente, erorile mobile și riscurile pentru date.",
        "Performanță web"
      ],
      "en": [
        "Website speed and security: essential checks",
        "How to avoid slow pages, mobile errors and unnecessary data risks.",
        "Web performance"
      ],
      "ru": [
        "Скорость и безопасность сайта: основы",
        "Как избежать медленных страниц, ошибок на телефонах и рисков для данных.",
        "Производительность"
      ]
    },
    "sections": {
      "ro": [
        [
          "Optimizează imaginile",
          "Folosește dimensiuni potrivite pentru fiecare dispozitiv și formate moderne. Evită imaginile uriașe încărcate înainte de a fi vizibile. Definește dimensiunile elementelor pentru a reduce mișcările neașteptate ale paginii."
        ],
        [
          "Redu blocajele în interacțiune",
          "Limitează scripturile inutile, bibliotecile mari și animațiile grele. Testează viteza pe un telefon obișnuit, nu doar pe un laptop performant. O experiență rapidă ajută utilizatorii să găsească informația și să trimită formulare."
        ],
        [
          "Protejează comunicațiile",
          "Activează HTTPS, actualizări regulate, controlul accesului și backupuri testate. Păstrează parolele și cheile API doar pe server. Verifică permisiunile conturilor de administrare."
        ],
        [
          "Respectă datele personale",
          "Colectează doar datele necesare, explică scopul și oferă mijloace de contact pentru solicitări de acces sau ștergere. Analiticele opționale nu trebuie activate înainte de consimțământ."
        ],
        [
          "Testează după orice lansare",
          "Verifică formularul, loginul, linkurile, răspunsurile serverului, autentificarea și afișarea mobilă după actualizări. Monitorizarea continuă previne surprizele."
        ]
      ],
      "en": [
        [
          "Optimize images",
          "Serve appropriately sized modern-format images. Avoid downloading oversized media before visitors need it. Reserve dimensions for visual elements to prevent unexpected layout shifts."
        ],
        [
          "Keep interactions responsive",
          "Reduce unnecessary scripts, heavy dependencies and excessive animations. Test on a typical phone rather than only on a powerful laptop. Visitors should reach information and submit forms without delays."
        ],
        [
          "Secure communications",
          "Use HTTPS, timely updates, strict access controls and tested backups. Keep credentials and API secrets on the server. Review who has administrative permissions."
        ],
        [
          "Respect personal information",
          "Collect only essential data, explain why it is required and offer clear ways to request access or deletion. Optional analytics should remain off until consent has been given."
        ],
        [
          "Test after every release",
          "Check contact forms, login, links, HTTP statuses, authorization and mobile layout after changes. Proactive monitoring prevents many surprises."
        ]
      ],
      "ru": [
        [
          "Оптимизируйте изображения",
          "Используйте подходящие размеры и современные форматы. Не загружайте крупные изображения раньше времени. Задавайте размеры элементов, чтобы страница не прыгала."
        ],
        [
          "Сделайте интерфейс отзывчивым",
          "Уберите ненужные скрипты и тяжелые анимации. Проверяйте сайт на обычном смартфоне, а не только на мощном компьютере. Контент и формы должны открываться быстро."
        ],
        [
          "Защитите соединения",
          "Применяйте HTTPS, обновления, строгие права доступа и проверенные резервные копии. Секреты и API-ключи храните только на сервере."
        ],
        [
          "Уважайте личные данные",
          "Собирайте только необходимые сведения, объясняйте цель их использования и предоставляйте возможность запросить копию или удаление. Аналитику включайте лишь с согласия."
        ],
        [
          "Тестируйте после релизов",
          "Проверяйте формы, авторизацию, ссылки, HTTP-ответы, права доступа и мобильную версию после каждого изменения. Постоянный мониторинг уменьшает риски."
        ]
      ]
    }
  },
  {
    "slug": "cum-alegi-automatizarile-ai",
    "meta": {
      "ro": [
        "Automatizări AI utile pentru afaceri mici",
        "Cum identifici procese potrivite pentru automatizare fără promisiuni nerealiste.",
        "Automatizări AI"
      ],
      "en": [
        "Practical AI automation ideas for small businesses",
        "How to find repeatable processes worth automating responsibly.",
        "AI automation"
      ],
      "ru": [
        "Полезная ИИ-автоматизация для малого бизнеса",
        "Как найти процессы, которые можно автоматизировать без лишних обещаний.",
        "Автоматизация ИИ"
      ]
    },
    "sections": {
      "ro": [
        [
          "Caută activități repetitive",
          "Începe cu sarcini frecvente, descrise clar: sortarea solicitărilor, confirmarea primirii mesajelor, completarea unor documente sau rezumarea datelor. Notează timpul economisit și erorile posibile."
        ],
        [
          "Separă automatizarea de deciziile sensibile",
          "Un asistent poate pregăti răspunsuri și extrage informații, dar aprobarea contractelor, transferurile financiare și deciziile cu impact mare trebuie să aibă verificare umană."
        ],
        [
          "Pregătește informațiile sursă",
          "Asistentul va fi util dacă serviciile, procedurile, prețurile și restricțiile sunt actualizate. Stabilește ce se întâmplă când informația lipsește: sistemul trebuie să recunoască limita și să ceară clarificări."
        ],
        [
          "Testează și măsoară",
          "Începe cu un flux mic, folosește cazuri reale și măsoară timpul economisit, ratele de eroare și feedbackul echipei. Nu presupune că un chatbot trebuie să gestioneze singur orice solicitare."
        ],
        [
          "Alege costurile corect",
          "Există automatizări fără modele AI plătite, bazate pe reguli și date structurate. Funcțiile generative avansate necesită uneori consum de API, hardware și costuri suplimentare."
        ]
      ],
      "en": [
        [
          "Identify repeatable tasks",
          "Start with frequent predictable work: routing enquiries, acknowledging messages, assembling documents and summarizing internal records. Measure hours saved and common failure cases."
        ],
        [
          "Keep people in control of high-impact decisions",
          "Assistants can draft replies and extract details, but contracts, financial transfers and sensitive decisions need human review and authorization."
        ],
        [
          "Maintain accurate source material",
          "An assistant needs current services, procedures, pricing and restrictions. Define what happens when information is missing: the system should admit the limit rather than invent facts."
        ],
        [
          "Start small and measure",
          "Pilot one workflow against realistic examples. Observe errors, employee time saved and feedback before expanding the automation."
        ],
        [
          "Understand cost and trade-offs",
          "Rule-based workflows may run without paid language-model APIs. Advanced generative capabilities often require model usage, hosting resources and additional spending."
        ]
      ],
      "ru": [
        [
          "Найдите повторяющиеся задачи",
          "Начните с понятных процессов: сортировка заявок, подтверждение получения сообщений, подготовка документов и сводки записей. Измеряйте экономию времени и возможные ошибки."
        ],
        [
          "Оставьте важные решения человеку",
          "ИИ может помогать с черновиками и извлечением данных, но договоры, переводы денег и важные решения требуют контроля и подтверждения человеком."
        ],
        [
          "Подготовьте достоверную информацию",
          "Помощнику нужны актуальные услуги, процедуры и ограничения. Если информации не хватает, система должна честно указать это, а не придумывать ответ."
        ],
        [
          "Начните с небольшого пилота",
          "Проверьте один процесс на реальных примерах, оцените ошибки и обратную связь команды перед расширением."
        ],
        [
          "Оценивайте стоимость",
          "Автоматизация на правилах может работать без платного ИИ API. Генеративные функции часто требуют дополнительных ресурсов и расходов."
        ]
      ]
    }
  }
,
  {
    "slug": "alegerea-domeniului-si-hostingului",
    "meta": {
      "ro": [
        "Cum alegi domeniul și hostingul pentru un website de afaceri",
        "Un ghid practic despre domenii .md și .com, DNS, SSL, găzduire și administrarea site-ului.",
        "Domenii și hosting"
      ],
      "en": [
        "How to choose a domain and hosting for your business website",
        "Practical guidance on domain extensions, DNS, SSL, hosting and long-term website care.",
        "Domains & hosting"
      ],
      "ru": [
        "Как выбрать домен и хостинг для сайта компании",
        "Практическое руководство о доменных зонах, DNS, SSL, хостинге и обслуживании сайта.",
        "Домены и хостинг"
      ]
    },
    "sections": {
      "ro": [
        [
          "Alege un nume ușor de memorat",
          "Domeniul este adresa prin care clienții ajung la website. Alege un nume scurt, clar, ușor de scris și de pronunțat. Evită cratimele inutile, cifrele confuze și imitațiile unor mărci cunoscute. Verifică disponibilitatea și eventualele conflicte de marcă înainte de cumpărare."
        ],
        [
          "Comparația .md, .com și alte extensii",
          "Pentru o afacere orientată spre Republica Moldova, .md poate semnala un context local. Un domeniu .com poate fi potrivit pentru clienți internaționali. Extensia nu înlocuiește un website bine structurat: contează mai mult conținutul relevant, încrederea și experiența utilizatorului."
        ],
        [
          "Cine deține domeniul și accesul DNS?",
          "Înregistrează domeniul pe numele titularului legitim al afacerii, cu autentificare în doi pași și reînnoire automată când este posibil. Păstrează accesul la registrar și la înregistrările DNS. Nu transfera controlul asupra domeniului unor terți fără un acord explicit."
        ],
        [
          "Hostingul trebuie ales după cerințe",
          "Pentru un site simplu, găzduirea administrată poate fi suficientă. Un magazin online sau o aplicație are nevoie de baze de date, backupuri, monitorizare și resurse adaptate traficului. Analizează politica de securitate, nivelul de suport, costurile de transfer și posibilitatea de migrare."
        ],
        [
          "SSL, backupuri și lansare",
          "Configurează HTTPS, verifică certificatul SSL, stabilește o adresă canonică și adaugă redirectări 301 pentru variantele vechi. Testează formularele, emailurile, sitemap-ul, accesul pe mobil și restaurarea backupurilor. Păstrează o evidență a serviciilor și a datelor de expirare."
        ]
      ],
      "en": [
        [
          "Choose a memorable name",
          "A domain is how people find your business. Keep it short, descriptive and easy to spell and pronounce. Avoid confusing digits and unnecessary hyphens. Verify availability and possible trademark conflicts before purchase."
        ],
        [
          "Understand .md, .com and other extensions",
          "A .md domain can signal a Moldova-focused business, while .com may suit an international audience. Domain extensions do not replace helpful content, user experience and credible contact information."
        ],
        [
          "Keep control of registration and DNS",
          "Register the domain under the legitimate business owner's account, enable two-factor authentication and consider automatic renewal. Keep access to the registrar and DNS records. Do not transfer ownership to a provider without a clear agreement."
        ],
        [
          "Match hosting to the actual workload",
          "Managed hosting may be enough for a simple brochure website. Stores and web applications may require databases, reliable backups, monitoring and more resources. Compare support, security, migration options and long-term running costs."
        ],
        [
          "Finish with SSL and operational checks",
          "Enable HTTPS and verify the SSL certificate. Configure the canonical URL and 301 redirects, test all forms and mobile layouts, submit a valid sitemap and test backup restoration. Record service renewals and ownership details."
        ]
      ],
      "ru": [
        [
          "Выберите понятное имя",
          "Домен должен быть коротким, запоминающимся и простым в написании. Избегайте лишних дефисов и цифр. Перед покупкой проверьте доступность и возможные конфликты с товарными знаками."
        ],
        [
          "Сравните .md и .com",
          "Домен .md может подчеркнуть связь компании с Молдовой. Зона .com подходит и для международного рынка. Сама по себе доменная зона не заменяет полезный контент, доверие клиентов и удобный сайт."
        ],
        [
          "Контролируйте регистрацию и DNS",
          "Оформляйте домен на реального владельца бизнеса, включите двухфакторную защиту и автопродление. Сохраняйте доступ к регистратору и настройкам DNS. Не передавайте контроль без понятного договора."
        ],
        [
          "Выбирайте хостинг по задачам",
          "Для простого сайта может подойти управляемый хостинг. Магазину или приложению могут потребоваться базы данных, резервные копии, мониторинг и дополнительные ресурсы. Оцените поддержку, безопасность и стоимость переноса."
        ],
        [
          "Проверьте SSL и запуск",
          "Подключите HTTPS, проверьте сертификат, канонический URL и перенаправления 301. Протестируйте формы, мобильную версию, карту сайта и восстановление резервных копий. Запишите сроки продления услуг."
        ]
      ]
    }
  },
  {
    "slug": "seo-local-si-dezvoltare-web-chisinau",
    "meta": {
      "ro": [
        "SEO local și dezvoltare web în Chișinău: ce contează pentru firme",
        "Cum își pot construi firmele din Chișinău o prezență web clară, credibilă și utilă pentru căutările locale.",
        "SEO local Moldova"
      ],
      "en": [
        "Local SEO and website development in Chișinău",
        "How Moldova-based businesses can build a credible website and appear for relevant local searches.",
        "Moldova local SEO"
      ],
      "ru": [
        "Локальное SEO и разработка сайтов в Кишинёве",
        "Как компаниям Молдовы создать полезный сайт и повысить видимость в местном поиске.",
        "Локальное SEO"
      ]
    },
    "sections": {
      "ro": [
        [
          "Clarifică serviciile și aria reală de activitate",
          "Clienții care caută servicii în Chișinău vor să știe ce oferi, cui te adresezi și cum te pot contacta. Creează pagini de servicii distincte, cu explicații concrete, exemple și un apel la acțiune. Nu lista orașe în care nu lucrezi fizic doar pentru a atrage trafic."
        ],
        [
          "Profil Google Business doar pentru afacerile eligibile",
          "Un profil de business poate ajuta afacerile care deservesc clienți în persoană. Nu afișa o adresă inventată sau un birou inexistent. Pentru un prestator care vizitează clienții, configurează corect zona de servicii și ascunde adresa când este cazul."
        ],
        [
          "Construiește conținut util, nu pagini repetate",
          "Explică probleme reale: cât durează lansarea unui site, cum alegi domeniul, ce include mentenanța și ce trebuie pregătit înainte de prima discuție. Leagă articolele de paginile serviciilor relevante. Evită multiplicarea aceleiași pagini pentru fiecare cartier."
        ],
        [
          "Măsoară căutările și cererile",
          "În Google Search Console urmărește paginile indexate, afișările, clickurile și interogările relevante. Folosește analitice numai cu consimțământul necesar. Compară lunile și observă ce pagini generează solicitări reale, nu doar vizite."
        ],
        [
          "O experiență rapidă și corectă construiește încredere",
          "Optimizează imaginile, afișarea pe mobil, contrastul, navigarea și timpul de răspuns. Adaugă date de contact autentice. SEO local funcționează mai bine când website-ul rezolvă întrebările unui client din Moldova."
        ]
      ],
      "en": [
        [
          "Describe your actual service area",
          "People searching in Chișinău need to understand what you offer, who you serve and how to get in touch. Use distinct useful service pages. Avoid claiming physical coverage in cities where you do not serve clients."
        ],
        [
          "Use Google Business Profile only if eligible",
          "Local business profiles are intended for businesses that interact with customers in person. Never invent an office address. Service-area businesses should set their real service region and hide private addresses when appropriate."
        ],
        [
          "Publish useful content, not duplicate location pages",
          "Answer practical questions about launching websites, choosing hosting, ongoing care and preparing content. Connect guides to relevant services with meaningful links. Avoid mass-producing near-identical pages for every district."
        ],
        [
          "Measure search visibility and real enquiries",
          "Google Search Console helps review indexed pages, impressions, clicks and relevant queries. Use analytics only under appropriate consent. Track whether visitors actually request a consultation or quotation."
        ],
        [
          "Earn trust through performance and accessibility",
          "Optimize mobile navigation, image sizes, contrast and server response times. Show truthful contact details and real project examples. Useful pages serve customers in Moldova better than keyword repetition."
        ]
      ],
      "ru": [
        [
          "Укажите реальную территорию работы",
          "Клиентам в Кишинёве важно понимать ваши услуги, аудиторию и способы связи. Создайте полезные страницы для разных услуг. Не заявляйте вымышленные офисы или регионы присутствия ради трафика."
        ],
        [
          "Заполняйте профиль Google по правилам",
          "Профиль компании подходит организациям, которые взаимодействуют с клиентами лично. Не указывайте несуществующий офис. Если компания выезжает к клиентам, настройте реальную территорию обслуживания."
        ],
        [
          "Публикуйте полезные материалы",
          "Отвечайте на вопросы о запуске сайта, доменах, хостинге, обслуживании и подготовке контента. Связывайте статьи со страницами услуг. Не создавайте десятки почти одинаковых страниц для районов города."
        ],
        [
          "Анализируйте поиск и заявки",
          "В Search Console отслеживайте проиндексированные страницы, показы, клики и запросы. Подключайте аналитику только с необходимым согласием. Оценивайте реальные обращения, а не только посещения."
        ],
        [
          "Скорость и доступность помогают доверию",
          "Улучшайте мобильную навигацию, изображения, контраст и скорость. Публикуйте настоящие контакты и проекты. Полезный сайт важнее повторения ключевых слов."
        ]
      ]
    }
  }
];
export function getGuide(slug:string){return academyGuides.find(g=>g.slug===slug)}
