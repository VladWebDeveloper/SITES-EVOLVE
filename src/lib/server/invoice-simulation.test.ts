import {describe,it,expect} from "vitest";
import {isSimulatedInvoice} from "./invoice-simulation";
describe("simulation billing segregation",()=>{
 it("identifies legacy demo invoice even after reassignment",()=>{
  expect(isSimulatedInvoice({number:"DEMO-2026-002",description:"Website corporate"})).toBe(true);
 });
 it("identifies the internally simulated Vlad receipt without DEMO name",()=>{
  expect(isSimulatedInvoice({number:"INT-2026-006",description:"Simulare internă: servicii design web; fără factură emisă sau plată reală.",client:{name:"Vlad Serbuşco"}})).toBe(true);
 });
 it("does not label a legitimate paid invoice as demo",()=>{
  expect(isSimulatedInvoice({number:"INV-2026-008",description:"Website delivery",client:{name:"A real paying client"}})).toBe(false);
 });
});
