"use client";
import {useEffect,useState} from "react";
import Script from "next/script";
import type {Locale} from "@/lib/site";
const labels={
 en:{title:"Your privacy. Your choice.",body:"Optional analytics run only with your consent.",accept:"Allow analytics",reject:"Essential only"},
 ro:{title:"Confidențialitatea contează.",body:"Analytics funcționează doar cu acordul tău.",accept:"Accept analytics",reject:"Doar esențiale"},
 ru:{title:"Ваша приватность — ваш выбор.",body:"Аналитика включается только с вашего согласия.",accept:"Разрешить аналитику",reject:"Только необходимые"}
};
export function Preferences({locale}:{locale:Locale}){
 const [ready,setReady]=useState(false),[consent,setConsent]=useState<"yes"|"no"|null>(null);
 useEffect(()=>{
  const open=()=>{setConsent(null);};
  window.addEventListener("se:privacy-options",open);
  const request=requestAnimationFrame(()=>{
   document.documentElement.dataset.theme="dark";
   localStorage.setItem("se-theme","dark");
   const val=localStorage.getItem("se-analytics");
   setConsent(val==="yes"||val==="no"?val:null);
   setReady(true);
  });
  return ()=>{cancelAnimationFrame(request);window.removeEventListener("se:privacy-options",open);};
 },[]);
 function choose(next:"yes"|"no"){localStorage.setItem("se-analytics",next);setConsent(next);}
 const enabled=Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
 return <>
  {ready&&enabled&&consent===null&&<div className="consent-banner" role="dialog" aria-label="Cookie preferences"><div><strong>{labels[locale].title}</strong><p>{labels[locale].body}</p></div><div className="consent-buttons"><button type="button" onClick={()=>choose("no")}>{labels[locale].reject}</button><button type="button" className="accept-consent" onClick={()=>choose("yes")}>{labels[locale].accept}</button></div></div>}
  {ready&&enabled&&consent==="yes"&&<><Script src={"https://www.googletagmanager.com/gtag/js?id="+process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} strategy="afterInteractive"/><Script id="analytics-consented" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}',{anonymize_ip:true});`}</Script></>}
 </>;
}
