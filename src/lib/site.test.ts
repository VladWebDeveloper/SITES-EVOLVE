import {describe,it,expect} from "vitest";
import {locales,services,works,isLocale,pathFor} from "./site";
describe("Localization and navigation",()=>{
 it("supports three locales",()=>{expect(locales).toEqual(["en","ro","ru"]);expect(isLocale("ro")).toBe(true);expect(isLocale("de")).toBe(false);});
 it("preserves service slugs across languages",()=>{expect(services.en.map(x=>x.id)).toEqual(services.ro.map(x=>x.id));expect(services.en.map(x=>x.id)).toEqual(services.ru.map(x=>x.id));});
 it("preserves case-study routes",()=>{expect(works.en.map(x=>x.id)).toEqual(works.ro.map(x=>x.id));});
 it("builds locale-aware URLs",()=>{expect(pathFor("ro","services")).toBe("/ro/services");expect(pathFor("en")).toBe("/en");});
});
