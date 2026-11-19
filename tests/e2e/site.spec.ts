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
 await page.getByRole("textbox",{name:"Scrie o întrebare..."}).fill("Cât costă un site?");
 await page.getByRole("button",{name:"Send message"}).click();
 await expect(page.locator(".message-bot").last()).toContainText("Fiecare proiect",{timeout:10000});
});
test("mobile assistant stays accessible while consent banner is visible",async({page},testInfo)=>{
 if(testInfo.project.name!=="chrome-mobile")return;
 await page.goto("/ro");
 const consent=page.getByRole("dialog",{name:"Cookie preferences"});
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
