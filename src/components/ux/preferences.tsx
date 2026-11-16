"use client";
import {useEffect,useState} from "react";
import Script from "next/script";
import {Moon,Sun} from "lucide-react";
import type {Locale} from "@/lib/site";
const text={en:{title:"A better experience, on your terms.",body:"We use optional analytics only if you accept. Essential features work without tracking.",accept:"Accept analytics",reject:"Only essential"},ro:{title:"Experiența ta, alegerea ta.",body:"Folosim analytics opțional doar dacă accepți. Funcțiile esențiale merg fără urmărire.",accept:"Accept analytics",reject:"Doar esențiale"},ru:{title:"Ваш выбор имеет значение.",body:"Необязательная аналитика включается только с вашего согласия.",accept:"Разрешить аналитику",reject:"Только необходимое"}};
export function Preferences({locale}:{locale:Locale}){
 const [theme,setTheme]=useState<"dark"|"light">("dark"),[consent,setConsent]=useState<"yes"|"no"|null>(null),[hydrated,setHydrated]=useState(false);
 useEffect(()=>{const reopen=()=>setConsent(null);window.addEventListener("se:privacy-options",reopen);const animation=requestAnimationFrame(()=>{const value=localStorage.getItem("se-theme");const next=value==="light"?"light":"dark";setTheme(next);document.documentElement.dataset.theme=next;const c=localStorage.getItem("se-analytics");setConsent(c==="yes"||c==="no"?c:null);setHydrated(true);});return ()=>{cancelAnimationFrame(animation);window.removeEventListener("se:privacy-options",reopen);};},[]);
 function chooseTheme(){setTheme(v=>{const next=v==="light"?"dark":"light";localStorage.setItem("se-theme",next);document.documentElement.dataset.theme=next;return next;});}
 function chooseConsent(v:"yes"|"no"){localStorage.setItem("se-analytics",v);setConsent(v);}
 const analyticsConfigured=Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
 return <>
  <button type="button" className="theme-switch" onClick={chooseTheme} aria-label={theme==="dark"?"Enable light mode":"Enable dark mode"} title="Change theme">{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>
  {hydrated&&analyticsConfigured&&consent===null&&<div role="dialog" aria-label="Cookie preferences" className="consent-banner"><div><strong>{text[locale].title}</strong><p>{text[locale].body}</p></div><div className="consent-buttons"><button onClick={()=>chooseConsent("no")}>{text[locale].reject}</button><button className="accept-consent" onClick={()=>chooseConsent("yes")}>{text[locale].accept}</button></div></div>}
  {hydrated&&consent==="yes"&&process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID&&<><Script src={"https://www.googletagmanager.com/gtag/js?id="+process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} strategy="afterInteractive"/><Script id="analytics-consented" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}',{anonymize_ip:true});`}</Script></>}
 </>;
}
