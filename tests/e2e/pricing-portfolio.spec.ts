import {test,expect} from "@playwright/test";

test("publishes all six approved starting prices in RO EN RU",async({page})=>{
 for(const lang of ["ro","en","ru"]){
  await page.goto("/"+lang+"/pricing");
  const cards=page.locator(".pricing-card");
  await expect(cards).toHaveCount(6);
  const expected=["299 €","699 €","1,499 €","2,499 €","699 €","150 €"];
  for(let i=0;i<expected.length;i++)await expect(cards.nth(i).locator(".pricing-label")).toContainText(expected[i]);
  await expect(cards.last().locator(".pricing-label")).toContainText(lang==="ro"?"/ lună":lang==="ru"?"/ месяц":"/ month");
 }
});

test("shows only AlviTravel in all public portfolio sections and removes DDent SEO URL",async({page,request})=>{
 const sitemap=await (await request.get("/sitemap.xml")).text();
 expect(sitemap.toLowerCase()).not.toContain("ddent");
 for(const lang of ["ro","en","ru"]){
  await page.goto("/"+lang+"/work");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("AlviTravel");
  await expect(page.locator("body")).not.toContainText("DDent");
  await page.goto("/"+lang);
  await expect(page.locator(".future-work-card")).toHaveCount(1);
  await expect(page.locator(".future-work-card")).toContainText("AlviTravel");
  await expect(page.locator("body")).not.toContainText("DDent");
  await page.goto("/"+lang+"/founder");
  await expect(page.locator("body")).not.toContainText("DDent");
  const oldCase=await request.get("/"+lang+"/work/ddent");
  expect(oldCase.status()).toBe(404);
 }
});
test("landing page and monthly website care are priced independently in the builder",async({page})=>{
 await page.goto("/ro/builder");
 await page.getByRole("button",{name:"Landing page"}).click();
 await expect(page.locator(".growth-estimate strong")).toContainText("299");
 await page.getByLabel("Mentenanță 150 €/lună").check();
 await expect(page.locator(".growth-estimate strong")).toContainText("299");
 await expect(page.locator(".growth-maintenance-line")).toContainText("150");
 await expect(page.locator(".growth-maintenance-line")).toContainText("lună");
 await page.getByRole("button",{name:"Site de prezentare"}).click();
 await expect(page.locator(".growth-estimate strong")).toContainText("699");
});
test("quote form accepts landing page and displays recurring care separately",async({page})=>{
 await page.goto("/ro/quote?kind=landing");
 await expect(page.getByRole("button",{name:/Landing page/})).toHaveAttribute("aria-pressed","true");
 await expect(page.locator(".quote-price")).toContainText("299");
 await page.locator(".quote-extras input").last().check();
 await expect(page.locator(".quote-maintenance-extra")).toContainText("150");
 await expect(page.locator(".quote-price")).toContainText("299");
});
test("PDF API accepts landing and care, rejects a multi-page landing",async({request})=>{
 const body={locale:"ro",kind:"landing",pages:1,extras:["care"],timeline:"standard",contactName:"Client Test",businessName:"Brand Test",notes:"Test de buget cu mentenanță lunară."};
 const response=await request.post("/api/quote/pdf",{data:body});
 expect(response.status()).toBe(200);
 expect(response.headers()["content-type"]).toContain("application/pdf");
 expect((await response.body()).subarray(0,4).toString()).toBe("%PDF");
 const invalid=await request.post("/api/quote/pdf",{data:{...body,pages:3}});
 expect(invalid.status()).toBe(400);
});
test("pricing and portfolio have no mobile horizontal overflow",async({page},testInfo)=>{
 if(testInfo.project.name!=="chrome-mobile")return;
 for(const path of ["/ro/pricing","/ro/work","/ro/builder"]){
  await page.goto(path);
  const widths=await page.evaluate(()=>({content:document.documentElement.scrollWidth,screen:window.innerWidth}));
  expect(widths.content,path).toBeLessThanOrEqual(widths.screen+1);
 }
});
