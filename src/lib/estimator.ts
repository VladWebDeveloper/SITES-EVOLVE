export type QuoteKind="landing"|"web"|"commerce"|"app"|"ai";
export type QuoteExtra="seo"|"multi"|"cms"|"care";
export type QuoteInput={kind:QuoteKind;extras:QuoteExtra[];timeline:"standard"|"rush";pages:number};

/** Public entry prices. Maintenance is always a recurring monthly service, never a one-time add-on. */
export const servicePrices={
 landing:299,
 web:699,
 commerce:1499,
 app:2499,
 ai:699,
 careMonthly:150
} as const;

export const extraPrices={seo:300,multi:400,cms:450} as const;
export function estimate(input:QuoteInput){
 const pages=input.kind==="landing"?1:Math.max(1,Math.min(50,input.pages));
 const pageCost=input.kind==="web"||input.kind==="commerce"?Math.max(0,pages-5)*110:0;
 const extras=[...new Set(input.extras)].reduce((sum,key)=>key==="care"?sum:sum+extraPrices[key],0);
 const amount=(servicePrices[input.kind]+pageCost+extras)*(input.timeline==="rush"?1.3:1);
 const low=Math.round(amount);
 const high=Math.ceil(low*1.85/50)*50;
 return {low,high,monthly:input.extras.includes("care")?servicePrices.careMonthly:0,currency:"EUR" as const};
}
