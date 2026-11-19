import {test,expect} from "@playwright/test";
for(const locale of ["ro","en","ru"]){
 test("hero tagline and founder top navigation "+locale,async({page},info)=>{
  await page.goto("/"+locale);
  await expect(page.locator(".future-hero h1")).toHaveText("Build today. Evolve tomorrow.");
  await expect(page.locator(".future-status")).toContainText("WEB DEVELOPMENT & INNOVATION");
  await expect(page.locator(".evolve-founder-home")).toHaveCount(0);
  await expect(page.locator(".future-founder-inline")).toHaveCount(0);
  await expect(page.locator(".future-footer a[href$='/founder']")).toHaveCount(0);
  const noOverflow=await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth);
  expect(noOverflow).toBe(true);
  const hero=page.locator(".future-hero h1");
  const width=await hero.evaluate(el=>({client:el.getBoundingClientRect().width,scroll:el.scrollWidth}));
  expect(width.scroll).toBeLessThanOrEqual(width.client+2);
  if(info.project.name==="chrome-mobile")await page.getByRole("button",{name:"Open menu"}).click();
  await page.locator(".future-main-nav a[href$='/founder']").click();
  await expect(page).toHaveURL(new RegExp("/"+locale+"/founder$"));
  await expect(page.locator(".evolve-founder-profile")).toBeVisible();
 });
}
