import {describe,it,expect} from "vitest";
import {answerFromKnowledge,resolveTopic} from "./knowledge";

describe("contextual studio assistant",()=>{
 it("answers follow-up pricing for the previously discussed service",()=>{
  const history=[{role:"user" as const,text:"Vreau un magazin online pentru haine."},{role:"assistant" as const,text:"Câte produse ai?"}];
  const answer=answerFromKnowledge("Și cât costă pentru asta?","ro",history);
  expect(resolveTopic("Și cât costă pentru asta?",history)).toBe("shop");
  expect(answer).toContain("Magazine online");
  expect(answer).toContain("/ro/quote");
  expect(answer).not.toContain("SITES EVOLVE este un studio");
 });
 it("handles distinct intent without parroting company copy",()=>{
  const source="Vreau un site pentru un restaurant";
  const first=answerFromKnowledge(source,"ro");
  const next=answerFromKnowledge("Și cât durează?", "ro",[{role:"user",text:source},{role:"assistant",text:first}]);
  expect(first).toContain("site");
  expect(next).toContain("Durata");
  expect(first).not.toBe(next);
 });
 it("handles a real request without falsely claiming CRM access",()=>{
  const answer=answerFromKnowledge("Am trimis o cerere. Ați primit-o?","ro");
  expect(answer).toContain("nu am acces");
  expect(answer).toContain("contact@sitesevolve.com");
 });
 it("recognizes Russian messages rather than treating them as unknown",()=>{
  const answer=answerFromKnowledge("Сколько стоит сайт для кафе?","ru");
  expect(answer).toContain("/ru/quote");
 });
 it("gives relevant answers for portfolio, client portal and SEO",()=>{
  expect(answerFromKnowledge("Aș vrea să văd portofoliul","ro")).toContain("AlviTravel");
  expect(answerFromKnowledge("Cum intru în portal?","ro")).toContain("/login");
  expect(answerFromKnowledge("Faci SEO?","ro")).toContain("SEO");
 });
 it("does not parrot the identical price message on repeated questions",()=>{
  const first=answerFromKnowledge("Cât costă un site?","ro");
  const second=answerFromKnowledge("Cât costă un site?","ro",[{role:"user",text:"Cât costă un site?"},{role:"assistant",text:first}]);
  expect(second).not.toBe(first);
  expect(second).toContain("pagini");
 });
 it("explains self-serve Google portal and remembers café context",()=>{
  const portal=answerFromKnowledge("Cum intru în portal?","ro");
  expect(portal).toContain("/portal/requests");
  expect(portal).not.toContain("invitați");
  const cafe=answerFromKnowledge("Vreau site pentru cafenea, ce trebuie?","ro");
  expect(cafe).toContain("meniu");
  expect(cafe).not.toContain("ce domeniu");
 });
 it("follows up on an online store product count instead of repeating a canned introduction",()=>{
  const h=[{role:"user" as const,text:"Vreau magazin online."},{role:"assistant" as const,text:"Aproximativ câte produse vei avea?"}];
  const answer=answerFromKnowledge("aproximativ 70", "ro",h);
  expect(answer).toContain("70 produse");
  expect(answer).toContain("plată online");
  expect(answer).not.toContain("aproximativ câte produse");
 });
 it("handles concrete online payment and website scope replies",()=>{
  const shop=[{role:"user" as const,text:"Magazin online pentru haine"},{role:"assistant" as const,text:"În ce țări vei vinde?"}];
  expect(answerFromKnowledge("Moldova și România","ro",shop)).toContain("livrare");
  expect(answerFromKnowledge("cu cardul și curier","ro",shop)).toContain("procesator");
  const web=[{role:"user" as const,text:"Am nevoie de un site web"},{role:"assistant" as const,text:"Câte pagini dorești?"}];
  expect(answerFromKnowledge("5 pagini","ro",web)).toContain("5 pagini");
 });
 it("only echoes budgets explicitly supplied",()=>{
  expect(answerFromKnowledge("Bugetul meu este 2500 EUR pentru site","ro")).toContain("2500 EUR");
  expect(answerFromKnowledge("Cât costă?","ro")).not.toContain("2500");
 });
});