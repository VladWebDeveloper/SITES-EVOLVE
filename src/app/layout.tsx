import "./globals.css";
import type { Metadata, Viewport } from "next";
import { brand, siteUrl } from "@/lib/site";
export const metadata: Metadata = { title:{default:"SITES EVOLVE — Web Development, AI & Digital Solutions",template:"%s | SITES EVOLVE"}, description:"Independent digital studio in Chișinău, Moldova. Premium websites, software, AI automation and digital solutions for ambitious businesses.", metadataBase:new URL(siteUrl), openGraph:{type:"website",siteName:brand,title:"SITES EVOLVE — Build what's next",description:"Thoughtful websites, software and intelligent digital experiences.",locale:"en_US"},twitter:{card:"summary_large_image"},robots:{index:true,follow:true},applicationName:brand };
export const viewport: Viewport = {width:"device-width",initialScale:1,themeColor:"#0c0e0d"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a href="#main" className="sr-only">Skip to main content</a>{children}</body></html>}
