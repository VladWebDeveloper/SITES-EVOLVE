import {test,expect} from "@playwright/test";

test("brand logo is loaded on every principal public route",async({page})=>{
 for(const route of ["/ro","/en","/ru","/ro/services","/ro/work","/ro/founder","/ro/pricing","/ro/quote","/ro/contact"]){
  await page.goto(route);
  const main=page.locator(".future-header .evolve-brand-logo");
  const footer=page.locator(".future-footer .evolve-brand-logo");
  await expect(main,route).toBeVisible();
  await expect(footer,route).toHaveCount(1);
  const ok=await main.evaluate(img=>img instanceof HTMLImageElement && img.complete && img.naturalWidth>0);
  expect(ok,route).toBe(true);
 }
});

test("login carries approved logo and never exposes private workspace",async({page})=>{
 await page.goto("/login");
 const brand=page.locator(".auth-card .evolve-brand-logo");
 await expect(brand).toBeVisible();
 expect(await brand.evaluate(img=>img instanceof HTMLImageElement && img.naturalWidth>0)).toBe(true);
 await page.goto("/console");
 await expect(page).toHaveURL(/\/(login|setup)$/);
 await page.goto("/portal");
 await expect(page).toHaveURL(/\/(login|setup)$/);
});

test("favicon, Apple icon, Android icons and social previews are available",async({request})=>{
 const assets=[
  ["/favicon.ico","image/x-icon"],
  ["/icon.svg","image/svg+xml"],
  ["/apple-icon.png","image/png"],
  ["/icons/icon-192.png","image/png"],
  ["/icons/icon-512.png","image/png"],
  ["/opengraph-image.png","image/png"],
  ["/twitter-image.png","image/png"],
  ["/brand/logo-header.png","image/png"],
  ["/brand/logo-horizontal.png","image/png"],
 ];
 for(const [url,mime] of assets){
  const response=await request.get(url);
  expect(response.status(),url).toBe(200);
  expect(response.headers()["content-type"],url).toContain(mime==="image/x-icon"?"image/":mime);
  expect((await response.body()).byteLength,url).toBeGreaterThan(100);
 }
});

test("manifest advertises matching installable branded artwork",async({request,page})=>{
 const response=await request.get("/manifest.webmanifest");
 expect(response.status()).toBe(200);
 const manifest=await response.json();
 expect(manifest.name).toContain("SITES EVOLVE");
 expect(manifest.icons.map((x:{src:string})=>x.src)).toEqual(expect.arrayContaining(["/icon.svg","/icons/icon-192.png","/icons/icon-512.png"]));
 await page.goto("/ro");
 const icons=await page.locator('head link[rel="icon"]').evaluateAll(links=>links.map(x=>x.getAttribute("href")));
 expect(icons.some(x=>x?.includes("favicon.ico")||x?.includes("icon.svg"))).toBe(true);
 const og=await page.locator('meta[property="og:image"]').getAttribute("content");
 expect(og).toContain("/opengraph-image.png");
});
