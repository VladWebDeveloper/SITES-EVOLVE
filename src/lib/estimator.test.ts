import {describe,it,expect} from "vitest";
import {estimate} from "./estimator";
describe("Quote estimator",()=>{
 it("computes a base web project",()=>{expect(estimate({kind:"web",extras:[],timeline:"standard",pages:5})).toEqual({low:1800,high:3350,currency:"EUR"});});
 it("counts unique add-ons once",()=>{expect(estimate({kind:"web",extras:["seo","seo"],timeline:"standard",pages:5}).low).toBe(2100);});
 it("adds extra pages for websites",()=>{expect(estimate({kind:"web",extras:[],timeline:"standard",pages:8}).low).toBe(2150);});
 it("adds priority multiplier",()=>{expect(estimate({kind:"ai",extras:[],timeline:"rush",pages:5}).low).toBe(1550);});
 it("does not charge extra pages for custom apps",()=>{expect(estimate({kind:"app",extras:[],timeline:"standard",pages:50}).low).toBe(5500);});
});
