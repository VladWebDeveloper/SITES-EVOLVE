import Link from "next/link";
import {ArrowUpRight,ArrowLeft,CheckCircle2,Globe2,MapPinned} from "lucide-react";
import {internationalMarkets,type InternationalMarket} from "@/lib/international-markets";
import {internationalGuides} from "@/lib/international-guides";

export default function InternationalMarketPage({market}:{market:InternationalMarket}){
 const m=internationalMarkets[market];
 const related=market==="us"?"uk":"us";
 const guide=internationalGuides.find(g=>g.region===market);
 return <div className="international-page">
  <section className="international-hero">
   <div className="international-hero-grid" aria-hidden="true"/>
   <div className="container international-hero-inner">
    <Link className="international-back" href="/en/services/web-development"><ArrowLeft size={16}/> All web development services</Link>
    <div className="international-eyebrow"><Globe2 size={17}/>{m.eyebrow}</div>
    <h1>{m.title}<span className="international-hero-period">.</span></h1>
    <p className="international-hero-lead">{m.lead}</p>
    <p className="international-hero-context">{m.introduction}</p>
    <div className="international-hero-actions">
     <Link className="international-button international-button-primary" href={"/en/quote?ref=international-"+market}>Request a project estimate <ArrowUpRight size={18}/></Link>
     <Link className="international-button international-button-outline" href="/en/work">See a real project <ArrowUpRight size={17}/></Link>
    </div>
    <div className="international-trust"><span><MapPinned size={16}/> Based in Moldova</span><span><CheckCircle2 size={16}/> Remote delivery</span><span><CheckCircle2 size={16}/> Clear project scope</span></div>
   </div>
  </section>
  <section className="international-section international-services">
   <div className="container">
    <div className="international-heading"><span>01 / SERVICES</span><h2>{m.fitTitle}</h2><p>{m.fitDescription}</p></div>
    <div className="international-grid">
     {m.services.map((s,i)=><article className="international-card" key={s.title}><span className="international-card-count">0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}
    </div>
    <div className="international-service-links">
     <Link href="/en/services/web-development">Custom website development <ArrowUpRight size={16}/></Link>
     <Link href="/en/services/ecommerce">E-commerce development <ArrowUpRight size={16}/></Link>
     <Link href="/en/services/care">Website maintenance <ArrowUpRight size={16}/></Link>
     <Link href="/en/services/seo-growth">Technical SEO <ArrowUpRight size={16}/></Link>
    </div>
   </div>
  </section>
  <section className="international-section international-benefits">
   <div className="container">
    <div className="international-heading"><span>02 / COLLABORATION</span><h2>{m.specificsTitle}</h2></div>
    <div className="international-benefits-grid">{m.specifics.map((s,i)=><article key={s.heading}><span className="international-detail-number">0{i+1} /</span><div><h3>{s.heading}</h3><p>{s.text}</p></div></article>)}</div>
   </div>
  </section>
  <section className="international-section international-process">
   <div className="container">
    <div className="international-heading"><span>03 / PROCESS</span><h2>{m.processTitle}</h2><p>We build around your brief, not an assumed local presence or a one-size-fits-all package.</p></div>
    <div className="international-process-grid">{m.steps.map((s,i)=><article key={s.title}><span>0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
   </div>
  </section>
  {guide&&<section className="international-editorial-link"><div className="container"><div><span>INSIGHTS / PRACTICAL GUIDE</span><h2>Plan your website before requesting a quote.</h2><p>Step-by-step advice, real trade-offs and a checklist for planning your next digital project.</p></div><Link href={"/en/insights/"+guide.slug}>{guide.heading}<ArrowUpRight size={18}/></Link></div></section>}
  <section className="international-section international-faq">
   <div className="container international-faq-layout">
    <div className="international-heading"><span>04 / COMMON QUESTIONS</span><h2>Before we start.</h2><p>Practical answers about remote web development with SITES EVOLVE.</p></div>
    <div className="international-faq-list">{m.faq.map((item)=><details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
   </div>
  </section>
  <section className="international-cta">
   <div className="container international-cta-inner"><div><span className="international-eyebrow">SITES EVOLVE / INTERNATIONAL PROJECTS</span><h2>Tell us what you&apos;re building.</h2><p>Share your goals and requirements. We&apos;ll discuss a realistic scope and a tailored estimate.</p><Link className="international-button international-button-primary" href={"/en/quote?ref=international-"+market}>Request a quote <ArrowUpRight size={17}/></Link></div><div className="international-other-market"><span>ALSO WORKING INTERNATIONALLY</span><Link href={"/en/markets/"+related}>{m.related}<ArrowUpRight size={18}/></Link><Link href="/en/contact">Contact the studio directly <ArrowUpRight size={18}/></Link></div></div>
  </section>
 </div>;
}
