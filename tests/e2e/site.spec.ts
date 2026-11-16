import {test,expect} from "@playwright/test";
test("homepage and services",async({page})=>{
 await page.goto("/en");
 await expect(page.getByRole("heading",{level:1})).toContainText("The web");
 await page.getByRole("link",{name:"Services",exact:true}).first().click();
 await expect(page).toHaveURL(/\/en\/services$/);
});
test("language switch preserves current route",async({page})=>{
 await page.goto("/en/pricing");
 await page.getByRole("link",{name:"Switch language to ro"}).click();
 await expect(page).toHaveURL(/\/ro\/pricing$/);
});
test("quote estimate reacts to page count",async({page})=>{
 await page.goto("/en/quote");
 const count=page.locator(".quote-pages input");
 await expect(count).toHaveValue("5");
 await count.fill("10");
 await expect(page.locator(".quote-price")).toContainText("2,350");
});
test("assistant uses reliable knowledge fallback",async({page})=>{
 await page.goto("/ro");
 await page.getByRole("button",{name:"Discută cu noi"}).click();
 await page.getByRole("textbox",{name:"Scrie o întrebare..."}).fill("Cât costă un site?");
 await page.getByRole("button",{name:"Send message"}).click();
 await expect(page.locator(".message-bot").last()).toContainText("Fiecare proiect",{timeout:10000});
});
test("unconfigured console does not reveal client data",async({page})=>{
 await page.goto("/console");
 await expect(page).toHaveURL(/\/setup$/);
 await expect(page.getByRole("heading",{level:1})).toContainText("Built for more");
});
test("consultation is a request, not a confirmed booking",async({page})=>{
 await page.goto("/en/consultation");
 await expect(page.getByText("not a confirmed appointment",{exact:false})).toBeVisible();
});
