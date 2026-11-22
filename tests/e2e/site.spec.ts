import {test,expect} from "@playwright/test";
test("homepage has concise brand message and founder only in top navigation",async({page})=>{
 await page.goto("/ro");
 await expect(page.getByRole("heading",{level:1})).toContainText("Build today. Evolve tomorrow.");
 await expect(page.locator(".future-main-nav a[href=\"/ro/founder\"]")).toHaveCount(1);
 await expect(page.locator(".future-status")).toContainText("WEB DEVELOPMENT & INNOVATION");
 await expect(page.locator(".evolve-founder-home")).toHaveCount(0);
 await expect(page.locator(".future-founder-inline")).toHaveCount(0);
 await expect(page.locator(".future-footer a[href='/ro/founder']")).toHaveCount(0);
});
test("client signup is visible in header and supports new Google accounts",async({page})=>{
 await page.goto("/ro");
 const portal=page.getByRole("link",{name:"Portal clienți"}).first();
 await expect(portal).toBeVisible();
 await portal.click();
 await expect(page).toHaveURL(/\/login\?lang=ro/);
 await expect(page.getByRole("heading",{name:/Spațiul tău/})).toBeVisible();
 await expect(page.getByRole("button",{name:"Continuă cu Google"})).toBeVisible();
 await expect(page.locator(".auth-privacy-note")).toContainText("Google");
});
test("unregistered users cannot open private client workspaces",async({page})=>{
 await page.goto("/portal");
 await expect(page).toHaveURL(/\/(login|setup)/,{timeout:15000});
 await expect(page.locator(".workspace-shell")).toHaveCount(0);
});
test("private project request history is never public",async({page})=>{
 await page.goto("/portal/requests");
 await expect(page).toHaveURL(/\/(login|setup)/,{timeout:15000});
 await expect(page.getByText("My requests",{exact:true})).toHaveCount(0);
});
test("founder page explains real professional background and has photo placeholder",async({page})=>{
 await page.goto("/ro/founder");
 await expect(page.locator(".evolve-founder-profile")).toBeVisible();
 await expect(page.locator(".evolve-founder-profile")).toContainText("ASEM");
 await expect(page.locator(".evolve-founder-profile")).toContainText("AlviTravel");
 await expect(page.locator(".evolve-founder-profile .evolve-founder-photo-badge")).toBeVisible();
});
test("English and Russian founder pages are localized",async({page})=>{
 await page.goto("/en/founder");
 await expect(page.locator(".evolve-founder-profile")).toContainText("Hi, I'm Vlad.");
 await page.goto("/ru/founder");
 await expect(page.locator(".evolve-founder-profile")).toContainText("Привет, я Влад.");
});
test("language switch preserves current route",async({page})=>{
 await page.goto("/en/pricing");
 await page.getByRole("link",{name:"Switch language to ro"}).click();
 await expect(page).toHaveURL(/\/ro\/pricing$/);
});
test("estimate updates without submitting personal data",async({page})=>{
 await page.goto("/en/quote");
 const pages=page.locator(".quote-pages input");
 await expect(pages).toHaveValue("5");
 await pages.fill("10");
 await expect(page.locator(".quote-price")).toContainText("2,350");
});
test("assistant offers useful local knowledge without external API",async({page})=>{
 await page.goto("/ro");
 await page.getByRole("button",{name:"Discută cu noi"}).click();
 await page.locator(".assistant-recording-consent input").check();
 await page.getByRole("textbox",{name:"Scrie o întrebare..."}).fill("Cât costă un site?");
 await page.getByRole("button",{name:"Send message"}).click();
 await expect(page.locator(".message-bot").last()).toContainText("nu avem un tarif fix",{timeout:10000});
});
test("assistant keeps the project topic across follow-ups and page refresh",async({page})=>{
 await page.goto("/ro");
 await page.getByRole("button",{name:"Discută cu noi"}).click();
 await page.locator(".assistant-recording-consent input").check();
 const field=page.getByRole("textbox",{name:"Scrie o întrebare..."});
 await field.fill("Vreau un magazin online pentru haine");
 await page.getByRole("button",{name:"Send message"}).click();
 await expect(page.locator(".message-bot").last()).toContainText("catalog",{timeout:10000});
 await field.fill("Și cât costă pentru asta?");
 await page.getByRole("button",{name:"Send message"}).click();
 const result=page.locator(".message-bot").last();
 await expect(result).toContainText("Magazine online",{timeout:10000});
 await expect(result).toContainText("/ro/quote");
 await page.reload();
 await page.getByRole("button",{name:"Discută cu noi"}).click();
 await expect(page.locator(".message-user").last()).toContainText("Și cât costă");
 await page.getByRole("button",{name:"Conversație nouă"}).click();
 await expect(page.locator(".message-user")).toHaveCount(0);
});
test("protected daily workflows require authorization",async({request})=>{
 const ops=await request.get("/api/cron/operations");
 expect(ops.status()).toBe(403);
 const monitor=await request.get("/api/cron/monitor");
 expect(monitor.status()).toBe(403);
});

test("assistant API validates bounded conversation history",async({request})=>{
 const invalid=await request.post("/api/assistant",{data:{message:"Salut",locale:"ro",history:Array.from({length:19},()=>({role:"user",text:"Buna"}))}});
 expect(invalid.status()).toBe(400);
});

test("mobile assistant stays accessible while consent banner is visible",async({page},testInfo)=>{
 if(testInfo.project.name!=="chrome-mobile")return;
 await page.goto("/ro");
 const consent=page.getByRole("dialog",{name:"Cookie preferences"});
 if(await consent.count()===0)return; // Analytics is optional in unconfigured previews.
 await expect(consent).toBeVisible();
 const chat=page.getByRole("button",{name:"Discută cu noi"});
 const bannerTop=await consent.evaluate(el=>el.getBoundingClientRect().top);
 const fabBottom=await chat.evaluate(el=>el.getBoundingClientRect().bottom);
 expect(fabBottom).toBeLessThan(bannerTop);
 await chat.click();
 await expect(page.getByRole("dialog",{name:"Asistentul studioului"})).toBeVisible();
 await expect(consent).toBeVisible();
});

test("analytics can be revoked without leaving tracking scripts active",async({page})=>{
 await page.goto("/ro");
 await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
 await page.getByRole("button",{name:"Accept analytics"}).click();
 await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(1);
 await page.getByRole("button",{name:"Cookie-uri"}).click();
 await page.getByRole("button",{name:"Doar esențiale"}).click();
 await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
 expect(await page.evaluate(()=>localStorage.getItem("se-analytics"))).toBe("no");
});

test("public submissions validate data and private uploads require login",async({request})=>{
 const lead=await request.post("/api/lead",{data:{name:"X",email:"bad",service:"web",message:"too short"}});
 expect(lead.status()).toBe(400);
 const quote=await request.post("/api/quote",{data:{kind:"invalid"}});
 expect(quote.status()).toBe(400);
 const upload=await request.post("/api/storage/upload",{data:{}});
 expect([401,403]).toContain(upload.status());
});
test("private conversation archive is inaccessible without staff login",async({page})=>{
 await page.goto("/console/conversations");
 await expect(page).toHaveURL(/\/(login|setup)$/);
});
test("chat recording acknowledgement is required before sending",async({page})=>{
 await page.goto("/ro");
 await page.getByRole("button",{name:"Discută cu noi"}).click();
 await page.getByRole("textbox",{name:"Scrie o întrebare..."}).fill("Salut");
 await expect(page.getByRole("button",{name:"Send message"})).toBeDisabled();
 await page.locator(".assistant-recording-consent input").check();
 await expect(page.getByRole("button",{name:"Send message"})).toBeEnabled();
});
test("private admin route fails closed without credentials",async({page})=>{
 await page.goto("/console");
 await expect(page).toHaveURL(/\/(login|setup)$/);
});
test("consultation request does not promise confirmed appointments",async({page})=>{
 await page.goto("/en/consultation");
 await expect(page.getByText("not a confirmed appointment",{exact:false})).toBeVisible();
});
test("mobile navigation works and there is no horizontal overflow",async({page},testInfo)=>{
 await page.goto("/ro");
 const dims=await page.evaluate(()=>({w:innerWidth,doc:document.documentElement.scrollWidth}));
 expect(dims.doc).toBeLessThanOrEqual(dims.w);
 if(testInfo.project.name==="chrome-mobile"){
  const menu=page.getByRole("button",{name:"Open menu"});
  await expect(menu).toBeVisible();
  await menu.click();
 }
 await page.locator(".future-main-nav").getByRole("link",{name:"Fondator",exact:true}).click();
 await expect(page).toHaveURL(/\/ro\/founder$/);
});
