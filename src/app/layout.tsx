import "./globals.css";
import "./platform.css";
import "./future.css";
import "./console-future.css";
import "./founder-premium.css";
import "./brand-system.css";
import type { Metadata, Viewport } from "next";
import { brand, siteUrl } from "@/lib/site";
export const metadata: Metadata = { title:{default:"SITES EVOLVE — Web Development, AI & Digital Solutions",template:"%s | SITES EVOLVE"}, description:"Independent digital studio in Chișinău, Moldova. Premium websites, software, AI automation and digital solutions for ambitious businesses.", metadataBase:new URL(siteUrl), openGraph:{type:"website",siteName:brand,title:"SITES EVOLVE — Build what's next",description:"Thoughtful websites, software and intelligent digital experiences.",locale:"en_US",images:[{url:"/opengraph-image.png",width:1200,height:630,alt:"SITES EVOLVE — Digital Studio"}]},twitter:{card:"summary_large_image",images:["/twitter-image.png"]},icons:{icon:[{url:"/favicon.ico",sizes:"any"},{url:"/icon.svg",type:"image/svg+xml"}],shortcut:"/favicon.ico",apple:[{url:"/apple-icon.png",sizes:"180x180",type:"image/png"}]},robots:{index:Boolean(process.env.NEXT_PUBLIC_SITE_URL)&&process.env.VERCEL_ENV!=="preview",follow:true},applicationName:brand };
export const viewport: Viewport = {width:"device-width",initialScale:1,themeColor:"#070712"};
export default function RootLayout({children}:{children:React.ReactNode}){const graph=JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:"SITES EVOLVE",url:siteUrl,description:"Independent digital studio for websites, software and AI solutions.",publisher:{"@type":"Organization",name:"SITES EVOLVE",email:"sites.evolve7@gmail.com"}}).replace(/</g,"\\u003c");return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:graph}}/><a href="#main" className="sr-only">Skip to main content</a>{children}</body></html>}
