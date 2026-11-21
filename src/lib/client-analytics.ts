/** Only emit a non-personal lead event after optional analytics consent. */
export function trackLead(formName:"contact"|"quote"){
 if(typeof window==="undefined")return;
 try{
  if(window.localStorage.getItem("se-analytics")!=="yes")return;
  const measurementId=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID||"";
  if(!/^G-[A-Z0-9]{6,}$/.test(measurementId))return;
  const analyticsWindow=window as Window & {gtag?: (command:string,event:string,params:Record<string,string>)=>void};
  if(typeof analyticsWindow.gtag!=="function")return;
  analyticsWindow.gtag("event","generate_lead",{form_name:formName});
 }catch{/* Analytics is always optional; never interrupt a valid enquiry. */}
}
