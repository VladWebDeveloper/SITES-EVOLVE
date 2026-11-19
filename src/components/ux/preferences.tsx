"use client";
import {useEffect,useState} from "react";
import Script from "next/script";
import type {Locale} from "@/lib/site";
const copy={
 en:{title:"Your privacy, your choice.",body:"Optional analytics run only with your permission.",accept:"Allow analytics",reject:"Essential only"},
 ro:{title:"Confidențialitatea contează.",body:"Analytics se activează doar cu acordul tău.",accept:"Accept analytics",reject:"Doar esențiale"},
 ru:{title:"Ваша приватность важна.",body:"Аналитика включается только с вашего согласия.",accept:"Разрешить аналитику",reject:"Только необходимое"}
};
export function Preferences({locale}:{locale:Locale}){
 const [consent,setConsent]=useState<"yes"|"no"|null>(null),[hydrated,setHydrated]=useState(false);
 useEffect(()=>{
  const reopen=()=>setConsent(null);
  window.addEventListener("se:privacy-options",reopen);
  const task=requestAnimationFrame(()=>{
   document.documentElement.dataset.theme="dark";
   localStorage.setItem("se-theme","dark");
   const stored=localStorage.getItem("se-analytics");
   setConsent(stored==="yes"||stored==="no"?stored:null);
   setHydrated(true);
  });
  return ()=>{cancelAnimationFrame(task);window.removeEventListener("se:privacy-options",reopen);};
 },[]);
 function choose(next:"yes"|"no"){const hadAnalytics=localStorage.getItem("se-analytics")==="yes";localStorage.setItem("se-analytics",next);setConsent(next);if(hadAnalytics&&next==="no")window.location.reload();}
 const configured=Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
 return <>
  {hydrated&&configured&&consent===null&&<div role="dialog" aria-label="Cookie preferences" className="consent-banner"><div><strong>{copy[locale].title}</strong><p>{copy[locale].body}</p></div><div className="consent-buttons"><button type="button" onClick={()=>choose("no")}>{copy[locale].reject}</button><button type="button" className="accept-consent" onClick={()=>choose("yes")}>{copy[locale].accept}</button></div></div>}
  {hydrated&&configured&&consent==="yes"&&<><Script src={"https://www.googletagmanager.com/gtag/js?id="+process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} strategy="afterInteractive"/><Script id="analytics-consented" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}',{anonymize_ip:true});`}</Script></>}
 </>;
}
