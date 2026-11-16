export type QuoteKind="web"|"commerce"|"app"|"ai";
export type QuoteExtra="seo"|"multi"|"cms"|"care";
export type QuoteInput={kind:QuoteKind;extras:QuoteExtra[];timeline:"standard"|"rush";pages:number};
export function estimate(input:QuoteInput){
 const bases={web:1800,commerce:3000,app:5500,ai:1200} as const;
 const addOns={seo:300,multi:400,cms:450,care:200} as const;
 const pageCost=input.kind==="web"||input.kind==="commerce"?Math.max(0,Math.min(50,input.pages)-5)*110:0;
 const extras=[...new Set(input.extras)].reduce((sum,key)=>sum+addOns[key],0);
 const amount=(bases[input.kind]+pageCost+extras)*(input.timeline==="rush"?1.3:1);
 const low=Math.round(amount/50)*50;
 const high=Math.ceil(low*1.85/50)*50;
 return {low,high,currency:"EUR" as const};
}
