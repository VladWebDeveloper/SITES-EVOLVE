import {test,expect} from "@playwright/test";

test("homepage: clear positioning and minimal navigation",async({page})=>{
 await page.goto("/en");
 await expect(page.getByRole("heading",{level:1})).toContainText("Digital, but");
 await expect(page.locator(".future-orb-body")).toBeVisible();
 const primary=page.locator(".future-main-nav > a");
 await expect(primary).toHaveCount(5); // 4 primary links + mobile CTA
 await page.getByRole("link",{name:"Services",exact:true}).first().click();
 await expect(page).toHaveURL(/\/en\/services$/);
});

test("language switch preserves the current page",async({page})=>{
 await page.goto("/en/pricing");
 await page.getByRole("link",{name:"Switch language to ro"}).click();
 await expect(page).toHaveURL(/\/ro\/pricing$/);
 await expect(page.getByRole("heading",{level:1})).toContainText("Opțiuni");
});

test("homepage copy is localized in Romanian and Russian",async({page})=>{
 await page.goto("/ro");
 await expect(page.getByRole("heading",{level:1})).toContainText("Digital, dar");
 await page.goto("/ru");
 await expect(page.getByRole("heading",{level:1})).toContainText("Цифровое");
});

test("price estimator reacts to the page count",async({page})=>{
 await page.goto("/en/quote");
 const pages=page.locator(".quote-pages input");
 await expect(pages).toHaveValue("5");
 await pages.fill("10");
 await expect(page.locator(".quote-price")).toContainText("2,350");
});

test("chat assistant uses factual fallback",async({page})=>{
 await page.goto("/ro");
 await page.getByRole("button",{name:"Discută cu noi"}).click();
 await page.getByRole("textbox",{name:"Scrie o întrebare..."}).fill("Cât costă un site?");
 await page.getByRole("button",{name:"Send message"}).click();
 await expect(page.locator(".message-bot").last()).toContainText("Fiecare proiect",{timeout:12000});
});

test("private console remains protected",async({page})=>{
 await page.goto("/console");
 await expect(page).toHaveURL(/\/setup$/);
 await expect(page.getByRole("heading",{level:1})).toContainText("Built for more");
});

test("consultation form is not a confirmed booking",async({page})=>{
 await page.goto("/en/consultation");
 await expect(page.getByText("not a confirmed appointment",{exact:false})).toBeVisible();
});

test("visual polish and navigation work on mobile and desktop",async({page},testInfo)=>{
 await page.goto("/ro");
 const width=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
 expect(width.document).toBeLessThanOrEqual(width.viewport);
 if(testInfo.project.name==="chrome-mobile"){
  const trigger=page.getByRole("button",{name:"Open menu"});
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(page.locator(".future-main-nav")).toBeVisible();
  await page.locator(".future-main-nav").getByRole("link",{name:"Proiecte"}).click();
 }else{
  await page.locator(".future-main-nav").getByRole("link",{name:"Proiecte"}).click();
 }
 await expect(page).toHaveURL(/\/ro\/work$/);
});

test("theme is black-blue-violet",async({page})=>{
 await page.goto("/en");
 const bg=await page.locator(".future-hero").evaluate(el=>getComputedStyle(el).backgroundImage);
 expect(bg).toContain("radial-gradient");
 await expect(page.locator(".future-service")).toHaveCount(4);
});
