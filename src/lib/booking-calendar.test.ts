import {describe,it,expect} from "vitest";
import {daySlots,isValidConsultationTime,studioDate} from "./booking-calendar";

describe("SITES EVOLVE studio calendar",()=>{
 it("generates half-hour slots for a future 24-hour day in Moldova",()=>{
  const times=daySlots("2027-01-16",new Date("2026-11-20T00:00:00Z").getTime());
  expect(times).toHaveLength(48);
  expect(times[0]?.label).toBe("00:00");
  expect(times.at(-1)?.label).toBe("23:30");
  expect(new Set(times.map(x=>x.startAt.toISOString())).size).toBe(48);
 });
 it("rejects invalid days, out-of-range and off-grid slots",()=>{
  const now=new Date("2026-11-20T12:00:00Z").getTime();
  expect(daySlots("2026-02-30",now)).toHaveLength(0);
  expect(daySlots("2026-11-01",now)).toHaveLength(0);
  expect(isValidConsultationTime(new Date("2026-11-20T12:15:00Z"),now)).toBe(false);
  expect(isValidConsultationTime(new Date("2026-11-21T12:00:00Z"),now)).toBe(true);
 });
 it("rejects nonexistent local times during daylight-saving spring change",()=>{
  const now=new Date("2027-03-01T00:00:00Z").getTime();
  const slots=daySlots("2027-03-28",now);
  expect(slots.length).toBeLessThanOrEqual(48);
  expect(slots.length).toBeGreaterThanOrEqual(46);
  expect(slots.every(s=>s.label!=="03:30")).toBe(true);
 });
 it("formats dates in the actual Chișinău time zone",()=>{
  const formatted=studioDate(new Date("2027-06-16T12:00:00Z"),"en");
  expect(formatted).toContain("15:00");
 });
});
