import {describe,it,expect} from "vitest";
import {estimate,servicePrices} from "./estimator";
describe("Quote estimator",()=>{
 it("uses the exact approved starting prices",()=>{
  for(const [kind,amount] of Object.entries({
   landing:299,web:699,commerce:1499,app:2499,ai:699
  }) as [keyof typeof servicePrices,number][]){
   if(kind==="careMonthly")continue;
   expect(estimate({kind,extras:[],timeline:"standard",pages:5}).low).toBe(amount);
  }
 });
 it("counts unique add-ons once",()=>{expect(estimate({kind:"web",extras:["seo","seo"],timeline:"standard",pages:5}).low).toBe(999);});
 it("adds extra pages for a standard website",()=>{expect(estimate({kind:"web",extras:[],timeline:"standard",pages:8}).low).toBe(1029);});
 it("keeps a landing page at a single page price",()=>{expect(estimate({kind:"landing",extras:[],timeline:"standard",pages:30}).low).toBe(299);});
 it("adds priority multiplier",()=>{expect(estimate({kind:"ai",extras:[],timeline:"rush",pages:5}).low).toBe(909);});
 it("does not charge extra pages for custom apps",()=>{expect(estimate({kind:"app",extras:[],timeline:"standard",pages:50}).low).toBe(2499);});
 it("shows 150 euro recurring care separately from one-time project pricing",()=>{
  const without=estimate({kind:"web",extras:[],timeline:"standard",pages:5});
  const withCare=estimate({kind:"web",extras:["care"],timeline:"standard",pages:5});
  expect(withCare.low).toBe(without.low);
  expect(withCare.high).toBe(without.high);
  expect(withCare.monthly).toBe(150);
  expect(without.monthly).toBe(0);
 });
});
