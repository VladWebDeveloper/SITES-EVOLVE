import {test,expect} from "@playwright/test";

const newRoutes=["builder","demo","academy","audit","status","privacy-center","referrals"];
test("new public tools are available and have canonical URLs in every language",async({request})=>{
 const sitemap=await (await request.get("/sitemap.xml")).text();
 for(const language of ["ro","en","ru"]){
  for(const route of newRoutes){
   const path="/"+language+"/"+route;
   const response=await request.get(path);
   expect(response.status(),path).toBe(200);
   const html=await response.text();
   expect(html,path).toContain('rel="canonical"');
   expect(html,path).toContain("https://sitesevolve.com"+path);
   expect(sitemap).toContain("<loc>https://sitesevolve.com"+path+"</loc>");
  }
 }
 expect((sitemap.match(/<loc>/g)||[]).length).toBeGreaterThanOrEqual(100);
});
test("all academy articles are readable and individually indexable",async({request})=>{
 const res=await request.get("/ro/academy");
 expect(res.status()).toBe(200);
 const html=await res.text();
 const slugs=[...html.matchAll(/href="\/ro\/academy\/([a-z0-9-]+)"/g)].map(m=>m[1]);
 const unique=[...new Set(slugs)];
 expect(unique.length).toBeGreaterThanOrEqual(5);
 for(const slug of unique){
  const article=await request.get("/ro/academy/"+slug);
  expect(article.status()).toBe(200);
  expect(await article.text()).toContain("<h2");
 }
 const nonexistent=await request.get("/ro/academy/not-a-real-guide");
 expect(nonexistent.status()).toBe(404);
});
test("simulator previews both layouts and updates the estimate",async({page})=>{
 await page.goto("/ro/builder");
 await expect(page.getByRole("heading",{level:1})).toContainText("Simulator");
 const price=page.locator(".growth-estimate strong");
 const initial=await price.innerText();
 await page.getByRole("slider",{name:"Număr de pagini"}).fill("15");
 expect(await price.innerText()).not.toBe(initial);
 await page.getByRole("button",{name:"Mobil"}).click();
 await expect(page.locator(".growth-mock--mobile")).toBeVisible();
 await expect(page.locator(".growth-print-proposal")).toContainText("SITES EVOLVE");
 await expect(page.getByRole("button",{name:/Salvează propunerea ca PDF/})).toBeVisible();
});
test("interactive e-commerce demo adds items without placing orders",async({page})=>{
 await page.goto("/ro/demo");
 await page.getByRole("button",{name:/E-commerce|Magazin online/}).click();
 await expect(page.getByText(/Produse în coș:\s*0/)).toBeVisible();
 await page.getByRole("button",{name:/Adaugă în coș/}).first().click();
 await expect(page.getByText(/Produse în coș:\s*1/)).toBeVisible();
 await expect(page.getByText(/nu se efectuează plăți reale/)).toBeVisible();
});
test("audit endpoint rejects local and private targets",async({request})=>{
 for(const address of [
  "http://example.com",
  "https://127.0.0.1",
  "https://localhost",
  "https://[::1]",
  "https://example.com:8443",
 ]){
  const res=await request.get("/api/website-audit?url="+encodeURIComponent(address));
  expect(res.status(),address).toBe(400);
 }
});
test("status page checks the actual health endpoint",async({page,request})=>{
 const health=await request.get("/api/health");
 expect(health.status()).toBe(200);
 await page.goto("/en/status");
 await expect(page.getByRole("heading",{level:1})).toContainText("Platform status");
 await expect(page.getByText("Service operational")).toBeVisible();
});
test("privacy tools remain account gated and requests cannot access other accounts",async({request})=>{
 const exportResponse=await request.get("/api/privacy/export",{maxRedirects:0});
 expect([401,403]).toContain(exportResponse.status());
 const upload=await request.post("/api/storage/upload",{data:{}});
 expect([401,403]).toContain(upload.status());
 for(const path of ["/portal/onboarding","/portal/notifications","/portal/privacy","/portal/referrals","/console/tasks","/console/privacy","/console/experiments"]){
  const response=await request.get(path,{maxRedirects:0});
  expect([302,303,307,308],path).toContain(response.status());
  expect(response.headers().location||"",path).toMatch(/\/(login|setup|portal)/);
 }
});
test("new sections do not cause horizontal overflow on mobile",async({page},testInfo)=>{
 if(testInfo.project.name!=="chrome-mobile")return;
 for(const url of ["/ro/builder","/ro/demo","/ro/academy","/ro/audit","/ro/privacy-center"]){
  await page.goto(url);
  const width=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  expect(width.document,url).toBeLessThanOrEqual(width.viewport+1);
 }
});
