import Link from "next/link";
import {ArrowUpRight,ArrowLeft,CalendarDays,Clock3,FileText,Globe2} from "lucide-react";
import {internationalGuides,type InternationalGuide} from "@/lib/international-guides";
import {internationalMarkets} from "@/lib/international-markets";

export default function InternationalGuidePage({guide}:{guide:InternationalGuide}){
 const market=internationalMarkets[guide.region];
 const other=internationalGuides.find(g=>g.slug!==guide.slug);
 return <div className="international-guide">
  <section className="international-guide-hero">
   <div className="container">
    <Link className="international-back" href={"/en/markets/"+guide.region}><ArrowLeft size={16}/> Web development for {market.region}</Link>
    <p className="international-eyebrow"><FileText size={16}/>{guide.eyebrow}</p>
    <h1>{guide.heading}<span>.</span></h1>
    <p className="international-guide-summary">{guide.summary}</p>
    <div className="international-guide-byline"><span><CalendarDays size={15}/> Published {guide.updated}</span><span><Clock3 size={15}/> {guide.minutes} min guide</span><span><Globe2 size={15}/> SITES EVOLVE editorial</span></div>
   </div>
  </section>
  <article className="international-guide-article">
   <div className="container international-guide-layout">
    <div className="international-guide-main">
     {guide.opening.map(p=><p className="international-guide-opening" key={p}>{p}</p>)}
     <div className="international-guide-quick">
      <h2>At a glance</h2><div>{guide.highlights.map(t=><section key={t.label}><strong>{t.label}</strong><p>{t.text}</p></section>)}</div>
     </div>
     {guide.sections.map((section,i)=><section className="international-guide-section" key={section.heading} id={"step-"+(i+1)}>
      <h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}
      {section.bullets&&<ul>{section.bullets.map(b=><li key={b}>{b}</li>)}</ul>}
      {section.note&&<aside className="international-guide-note"><strong>Practical note</strong><p>{section.note}</p></aside>}
     </section>)}
     <section className="international-guide-example">
      <span>WORKED EXAMPLE / START HERE</span><h2>{guide.example.title}</h2><p>{guide.example.intro}</p><div className="international-guide-example-list">{guide.example.lines.map((line,i)=><div key={line}><small>{String(i+1).padStart(2,"0")}</small><p>{line}</p></div>)}</div><p>{guide.example.outro}</p>
     </section>
     <section className="international-guide-section"><h2>What to do next</h2><p>{guide.closing}</p><Link className="international-button international-button-primary" href={"/en/quote?ref=guide-"+guide.region}>Discuss your website project <ArrowUpRight size={17}/></Link></section>
     <section className="international-guide-references"><h2>Further reading & references</h2><p>Independent, primary-source resources for the technical and compliance topics mentioned in this guide.</p><ul>{guide.resources.map(r=><li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}<ArrowUpRight size={14}/></a><span>{r.description}</span></li>)}</ul></section>
     <div className="international-guide-editorial"><strong>About this guide</strong><p>Published by SITES EVOLVE, an independent web development studio in Chișinău, Moldova. These are practical planning recommendations, not claims about a client&apos;s results. <Link href="/en/founder">Meet the founder</Link> and <Link href="/en/work/alvitravel">explore a real project</Link>.</p></div>
    </div>
    <aside className="international-guide-sidebar">
     <div className="international-guide-sidecard"><span>IN THIS GUIDE</span><nav aria-label="Guide sections">{guide.sections.map((s,i)=><a href={"#step-"+(i+1)} key={s.heading}>{s.heading.replace(/^\d+\.\s*/,"")}</a>)}</nav></div>
     <div className="international-guide-sidecard"><span>RELEVANT SERVICES</span><Link href={"/en/markets/"+guide.region}>{market.title} <ArrowUpRight size={15}/></Link><Link href="/en/services/web-development">Website development <ArrowUpRight size={15}/></Link><Link href="/en/services/seo-growth">Technical SEO <ArrowUpRight size={15}/></Link><Link href="/en/contact">Contact our team <ArrowUpRight size={15}/></Link></div>
     {other&&<div className="international-guide-sidecard"><span>RELATED READING</span><Link href={"/en/insights/"+other.slug}>{other.heading}<ArrowUpRight size={15}/></Link></div>}
    </aside>
   </div>
  </article>
 </div>;
}
