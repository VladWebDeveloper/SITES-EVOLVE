import {test,expect} from "@playwright/test";
test("PDF proposal is generated on server in three languages",async({request})=>{
 for(const locale of ["ro","en","ru"]){
  const response=await request.post("/api/quote/pdf",{data:{locale,kind:"web",pages:5,
   extras:["seo"],timeline:"standard",contactName:"Test Client",businessName:"Test Business",notes:"This is an example project description."}});
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect(response.headers()["content-disposition"]).toContain("SITES-EVOLVE-Proposal.pdf");
  const buf=await response.body();
  expect(buf.subarray(0,4).toString()).toBe("%PDF");
  expect(buf.length).toBeGreaterThan(5000);
 }
});
test("PDF proposal rejects malformed payloads",async({request})=>{
 for(const data of [{locale:"ro",kind:"unsupported"}, {locale:"ro",kind:"web",pages:-1,extras:[],timeline:"standard"}, {}]){
  const response=await request.post("/api/quote/pdf",{data});
  expect(response.status()).toBe(400);
 }
});
test("builder offers personalized direct PDF and localized inputs",async({page})=>{
 await page.goto("/ro/builder");
 await expect(page.getByText("Numele tău (opțional)")).toBeVisible();
 const downloadPromise=page.waitForEvent("download");
 await page.getByRole("button",{name:/Salvează propunerea ca PDF/}).click();
 const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe("SITES-EVOLVE-Proposal.pdf");
});
test("booking calendar shows the 30 minute slots and user selects a time",async({page})=>{
 const date="2027-01-16";
 await page.route("**/api/appointments/slots?date="+date,async route=>{
  await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({
   date,timezone:"Europe/Chisinau",durationMinutes:30,slots:[
    {value:"2027-01-16T10:00:00.000Z",label:"12:00"},
    {value:"2027-01-16T10:30:00.000Z",label:"12:30"}]})});
 });
 await page.goto("/ro/consultation");
 await expect(page.getByRole("heading",{level:1})).toContainText("Programează");
 await page.locator('input[type="date"]').fill(date);
 await expect(page.getByRole("option",{name:/12:00/})).toHaveCount(1);
 await page.locator('select').filter({has:page.locator('option[value="2027-01-16T10:00:00.000Z"]')}).selectOption("2027-01-16T10:00:00.000Z");
 await expect(page.getByRole("button",{name:/Confirmă programarea/})).toBeEnabled();
});
test("unauthorized ICS download and calendar admin cannot be accessed",async({request})=>{
 const response=await request.get("/api/appointments/aaaaaaaaaaaaaaaa/calendar?token=invalid");
 expect(response.status()).toBe(403);
 const admin=await request.get("/console/appointments",{maxRedirects:0});
 expect([302,303,307,308]).toContain(admin.status());
});
test("public status handles uninitialized sample history without fabricating uptime",async({request})=>{
 const response=await request.get("/api/public/status");
 expect([200,503]).toContain(response.status()); // 503 only in a local build without database.
 if(response.status()===200){
  const body=await response.json();
  expect(Array.isArray(body.events)).toBe(true);
  expect(body.observation).toHaveProperty("successfulChecks");
  expect(body.observation).toHaveProperty("totalChecks");
 }
});
