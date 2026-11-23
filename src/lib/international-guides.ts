export type InternationalGuide = {
 slug:string;
 region:"us"|"uk";
 heading:string;
 description:string;
 eyebrow:string;
 updated:string;
 minutes:number;
 summary:string;
 opening:string[];
 highlights:{label:string;text:string}[];
 sections:{heading:string;paragraphs:string[];bullets?:string[];note?:string}[];
 example:{title:string;intro:string;lines:string[];outro:string};
 closing:string;
 resources:{label:string;url:string;description:string}[];
};

export const internationalGuides:InternationalGuide[]=[
 {
  slug:"website-project-brief-template",
  region:"us",
  heading:"How to write a website project brief that gets a useful quote",
  description:"A practical website project brief template for small businesses: goals, pages, integrations, budget, ownership and what to send a web developer.",
  eyebrow:"PROJECT PLANNING / WEBSITE BRIEF",
  updated:"2026-11-23",
  minutes:8,
  summary:"A clear website brief does not need to be long. It needs to explain what the business does, what the visitor should do, and what counts as a successful launch.",
  opening:[
   "A website quote is only meaningful when the person preparing it understands the work. Two projects described as “a five-page website” may require very different amounts of planning, copywriting, integrations, testing and ongoing care.",
   "If you run a small US business, you can make the first conversation more productive by preparing a one-page project brief. The aim is not to write technical specifications. The aim is to explain your business and identify which decisions are already made."
  ],
  highlights:[
   {label:"Business outcome",text:"Define the action a visitor should take, not just the appearance you want."},
   {label:"Essential scope",text:"Separate what must launch now from what could be added later."},
   {label:"Ownership",text:"Clarify who provides content, approves work and controls the domain."}
  ],
  sections:[
   {
    heading:"1. Start with the business, audience and one primary action",
    paragraphs:[
     "Write two sentences about your business: what you sell or provide, whom you serve and where you operate. Then name the visitor you care about most. A new homeowner comparing contractors has different questions from a buyer purchasing an item online.",
     "Choose one main goal for the site. It may be receiving qualified enquiries, getting appointment requests, presenting a product range or explaining a service before a phone call. Several secondary goals are fine, but naming the main action keeps the design focused."
    ],
    bullets:["Business type and service area: for example, residential landscaping serving two nearby cities.","Audience and questions: who visits and what do they need to know before contacting you?","Primary conversion: request an estimate, book a call, purchase a product, or submit an enquiry.","Success signal: completed enquiries, confirmed appointments, or product purchases rather than an unverified traffic target."]
   },
   {
    heading:"2. List pages and content you can actually provide",
    paragraphs:[
     "Instead of asking for a fixed page count first, list what users need to understand. A small service business may need Home, Services, About, Service Areas and Contact. A shop may need product categories, product details, cart, checkout and policies.",
     "Mark each piece of content as ready, needs editing or still missing. Design and development can stall when service descriptions, product photography and business details arrive late. It is better to flag missing material in the brief than promise it will appear during development."
    ],
    bullets:["Existing branding, logo files and preferred colours, if any.","Photos and written descriptions: who provides them and who can approve publication?","Required languages, accessibility needs, opening times, contact details and service areas.","Examples of websites you like, with one sentence explaining what works for you."],
    note:"If you have an existing website, include its URL and name what should stay. A redesign does not automatically require replacing everything."
   },
   {
    heading:"3. Identify integrations and workflow decisions",
    paragraphs:[
     "A contact form that emails your team is different from a form that assigns enquiries inside a CRM. A link to an existing booking service is different from custom scheduling software. These decisions affect complexity, testing and maintenance.",
     "Tell the developer which tools you already pay for and who has administrative access. Do not send passwords in an enquiry. Access should be arranged securely after a project is agreed."
    ],
    bullets:["Enquiries: email notification, CRM capture, files, or a customer portal?","Scheduling: simple request form, link to existing tool, embedded booking, or confirmed appointment system?","Payments: online transactions, deposits, or no payments at all?","Analytics and consent: what must be measured and what privacy requirements apply?","Content management: who will update pages, menus or products after launch?"]
   },
   {
    heading:"4. State budget boundaries without guessing a final price",
    paragraphs:[
     "You do not need to know exactly what a website should cost. Sharing a realistic range or a maximum helps the developer decide whether to propose a streamlined launch or a larger scope. Ask what the estimate includes and excludes.",
     "Separate one-time costs from recurring costs. Hosting, a domain, third-party subscriptions, payment processing, ongoing maintenance and additional content work may be distinct expenses. If you have a launch deadline, explain what creates that deadline."
    ],
    bullets:["Budget range and whether it covers design, development and content.","Target launch date, and whether there is flexibility.","What you consider essential versus a second-phase improvement.","Who will own the domain, source files and access credentials after handover.","Whether you want training or an ongoing maintenance plan."],
    note:"A price range published on a studio website is an indication, not a binding quote. Final pricing follows a documented project scope."
   },
   {
    heading:"5. Agree on review, acceptance and handover",
    paragraphs:[
     "A useful proposal explains more than pages and a deadline. Look for a process that identifies the review stages, number or nature of revisions, what testing is expected, how third-party accounts are handled and what happens after launch.",
     "For remote collaboration, confirm the main communication channel, who can approve decisions and a realistic review window. This is especially useful if the developer works in a different time zone."
    ],
    bullets:["Named decision-maker and one feedback channel.","Design review and development preview milestones.","Mobile testing, working forms, accessibility checks and redirects if replacing an old site.","Domain, hosting, analytics, backups and documentation at handover."]
   },
   {
    heading:"Common mistakes that slow a website project",
    paragraphs:[
     "The biggest problem is usually not an imperfect brief; it is an unknown requirement discovered too late. “We'll add online booking later” may actually mean complex staff availability, deposits, cancellations and automated reminders. That is a separate system, not a small design tweak.",
     "Avoid asking for an exact quote from a screenshot alone. Share the example, but explain the purpose of the functionality. If the budget is limited, ask for a first release that does the essential job well."
    ],
    bullets:["Choosing technology before defining the visitor's task.","Assuming copywriting, photography, hosting or subscriptions are included.","Requesting custom features when existing services already solve the problem.","Leaving content approval and domain ownership undefined."]
   }
  ],
  example:{
   title:"A website brief you can copy",
   intro:"Use this as a starting point and replace the examples with your real details. You can send it in an email or paste it into a project enquiry.",
   lines:[
    "Business: Independent landscaping company in [city/state].",
    "Customers: Homeowners comparing local services on mobile.",
    "Main goal: Receive quote requests with project type and approximate location.",
    "Pages: Home, Services, Gallery, About, Contact; service area details where useful.",
    "Content ready: Logo, business description, six real project photos. Service descriptions need editing.",
    "Features: Mobile-first enquiry form, click-to-call, map, basic analytics. No online payments.",
    "Existing tools: [CRM or booking tool, if any].",
    "Timing: Prefer to launch by [date]; flexible by [number] weeks.",
    "Budget: [range] for the initial build; maintenance priced separately.",
    "Decision maker: [role]. We can review one preview per week."
   ],
   outro:"A developer can now identify unknowns, suggest a sensible first release and prepare a scoped proposal."
  },
  closing:"If you want a practical estimate for a website, send the information you already know. We can clarify the missing parts together rather than asking you to decide every technical detail upfront.",
  resources:[
   {label:"Google Search Central — SEO starter guide",url:"https://developers.google.com/search/docs/fundamentals/seo-starter-guide",description:"Why clear structure, useful content and descriptive pages matter."},
   {label:"W3C Web Accessibility Initiative — forms tutorial",url:"https://www.w3.org/WAI/tutorials/forms/",description:"Accessible labels, instructions, validation and feedback for enquiry forms."}
  ]
 },
 {
  slug:"booking-website-or-booking-platform",
  region:"uk",
  heading:"Booking website or booking platform? A practical guide for UK service businesses",
  description:"Choose between a booking link, an embedded scheduling tool and a custom booking website. A practical decision guide for UK salons, studios and service teams.",
  eyebrow:"UK SMALL BUSINESS / BOOKINGS & WEBSITE DESIGN",
  updated:"2026-11-23",
  minutes:9,
  summary:"Many service businesses do not need a custom booking system. The right solution depends on whether you need appointment requests, instant confirmations or complex staff and resource scheduling.",
  opening:[
   "If customers discover your business on Instagram, Google Maps or word of mouth, they still need a clear place to compare services and decide what to do next. A good service website can provide that context while leaving your existing scheduling tool in charge of availability.",
   "For UK salons, studios, wellness providers and small professional-service businesses, there are three common approaches: link to an existing booking tool, embed that tool in the website, or develop a custom booking experience. The most expensive option is not automatically the best one."
  ],
  highlights:[
   {label:"Simplest route",text:"Keep the booking tool you already use when it works well for clients."},
   {label:"Better conversion path",text:"Show services, price context and trust signals before asking visitors to book."},
   {label:"Scope control",text:"Build custom scheduling only when there is a documented workflow it must solve."}
  ],
  sections:[
   {
    heading:"Option A: Link to your existing booking system",
    paragraphs:[
     "A prominent “Book an appointment” button can open a scheduling page hosted by your provider. This approach is usually the simplest to set up and maintain because staff availability, reminders and changes remain inside the system your team already knows.",
     "The website should still do useful work: explain each service, show location and opening information, answer common questions, and put the booking action where mobile visitors can find it."
    ],
    bullets:["Best fit: a small team with a working booking provider and no unusual requirements.","Check: does the booking page work clearly on mobile, and can customers return to your site?","Risk: the provider's booking screen may look different from your website, and some features depend on the provider's plan."],
    note:"Do not rebuild an existing scheduling system solely because the website needs a visual redesign."
   },
   {
    heading:"Option B: Embed a booking widget in the website",
    paragraphs:[
     "Some scheduling services provide an embedded widget or hosted component. Visitors may be able to select a service and time without leaving the branded website. The experience can feel more continuous, but it remains dependent on the provider.",
     "Before promising this option, check whether your provider supports embedding, how the widget behaves on narrow screens, how it handles keyboard navigation and whether it adds cookies or third-party scripts. A demo on desktop is not enough."
    ],
    bullets:["Best fit: businesses that want a stronger branded journey without rebuilding scheduling logic.","Check: provider permissions, mobile layout, accessibility and loading performance.","Risk: third-party styling limitations and changes to integrations outside your direct control."]
   },
   {
    heading:"Option C: Build a custom booking application",
    paragraphs:[
     "A custom application may be justified when bookings involve several resources, multiple locations, unusual approval rules, bundled services or integration with a proprietary internal workflow.",
     "However, a calendar interface is only one part of a reliable booking system. The project must also consider availability conflicts, cancellations, time zones, customer notifications, staff access and safe handling of personal information. Those requirements need proper testing and continuing support."
    ],
    bullets:["Best fit: specialist workflows that an existing provider cannot reasonably support.","Check: roles and permissions, double-booking prevention, notifications, cancellations, security and backups.","Risk: higher development cost, more testing and ongoing maintenance obligations."],
    note:"A contact form labelled “request an appointment” is not the same as a confirmed booking. Be explicit with customers about what happens after submission."
   },
   {
    heading:"What the website should show before the booking button",
    paragraphs:[
     "A booking link can only convert visitors who already understand the service. If clients still have unanswered questions, improve the content around the booking step before adding more technology.",
     "Useful information often includes service descriptions written in plain language, indicative duration, relevant price information, clear location details, accessibility information and genuine examples of work. Use real testimonials only with permission, never invented ratings."
    ],
    bullets:["A clear description of what each service includes and how long it takes.","An honest price or explanation of how the price is determined.","Visible contact details and a straightforward cancellation or rescheduling route.","A prominent booking action on service pages, not only on the homepage.","A mobile layout that remains readable and usable without zooming."]
   },
   {
    heading:"Privacy, consent and accessibility in the UK",
    paragraphs:[
     "Booking systems may handle names, contact details and appointment information. Before launch, confirm which company receives the data, where it is stored, how long it is needed and who can access it. Provide clear privacy information and avoid collecting unnecessary fields.",
     "Third-party scheduling widgets and analytics tools may use cookies or similar technologies. UK guidance distinguishes between uses that require consent and defined exceptions, so the precise setup should be reviewed rather than assuming every cookie is automatically permitted.",
     "Make sure form controls have accessible labels and understandable errors. A visually appealing booking flow is not useful if someone cannot complete it with a keyboard or assistive technology."
    ],
    bullets:["Use the minimum information necessary for the requested service.","Review the booking provider's data-processing terms and configuration.","Check cookies and storage practices against current UK ICO guidance.","Test the full flow with keyboard navigation and a small screen."],
    note:"This article is practical website-planning guidance, not legal advice. Ask a qualified adviser to confirm compliance requirements for your circumstances."
   },
   {
    heading:"A sensible launch and measurement plan",
    paragraphs:[
     "Start with the simplest journey that meets the business goal. For many small teams, that means a useful website with an existing booking link or a supported embed, rather than a replacement scheduling platform.",
     "Test a real appointment request from a phone: service selection, date or request form, confirmation messaging, staff notification and cancellation route. If you measure engagement, configure tracking appropriately and do not confuse a button click with a confirmed appointment."
    ],
    bullets:["Test one successful booking and one cancelled or failed flow.","Verify booking notifications reach the correct inbox or staff member.","Check page loading and layout stability, especially around embedded widgets.","Review enquiries and completed bookings separately to identify bottlenecks.","Keep a named owner for website and booking-provider updates."]
   }
  ],
  example:{
   title:"Example: a studio with two therapists",
   intro:"Consider a small studio that already manages appointments in an external booking tool:",
   lines:[
    "Current situation: Instagram and word-of-mouth referrals; booking tool works but service information is scattered.",
    "Website goal: Help a new client choose a treatment and book confidently.",
    "Recommended first release: Home, Treatments, Therapists, About, Contact.",
    "Booking: “Book now” buttons linking to the existing scheduling provider.",
    "Content: Real treatment durations, applicable pricing, therapist information and address.",
    "Checks: Mobile booking flow, accessible labels, privacy notice, confirmation messages.",
    "Phase two only if needed: Embedded widget, improved service filters and agreed analytics.",
    "Not required now: A new custom scheduling engine that duplicates existing availability."
   ],
   outro:"The result is a clearer customer journey without forcing staff to change the system they use every day."
  },
  closing:"If your business already has a booking provider, start by sharing its name and your current website. We can assess whether a new service page, a booking integration or a more substantial build would actually improve the customer journey.",
  resources:[
   {label:"UK Information Commissioner's Office — storage and access technologies",url:"https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/",description:"Current UK guidance for cookies and related technologies."},
   {label:"W3C Web Accessibility Initiative — forms tutorial",url:"https://www.w3.org/WAI/tutorials/forms/",description:"Practical accessibility considerations for booking and enquiry forms."},
   {label:"Google Search Central — Core Web Vitals",url:"https://developers.google.com/search/docs/appearance/core-web-vitals",description:"Performance concepts relevant to page loading, responsiveness and layout stability."}
  ]
 }
];
export function findInternationalGuide(slug:string){return internationalGuides.find(guide=>guide.slug===slug);}
