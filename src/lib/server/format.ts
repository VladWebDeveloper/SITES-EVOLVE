export function money(minor:number,currency="EUR"){return new Intl.NumberFormat("en-IE",{style:"currency",currency}).format(minor/100);}
export function shortDate(date:Date|string|null|undefined){return date?new Intl.DateTimeFormat("en-GB",{dateStyle:"medium"}).format(new Date(date)):"—";}
export function readableStatus(s:string){return s.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,l=>l.toUpperCase());}
export function safeText(v:FormDataEntryValue|null,max=200){return String(v??"").trim().slice(0,max);}
