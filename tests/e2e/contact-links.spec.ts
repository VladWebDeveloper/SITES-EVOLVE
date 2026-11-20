import {test, expect} from "@playwright/test";

const links = [
  {name: "Email", href: "mailto:sites.evolve7@gmail.com"},
  {name: "Phone", href: "tel:+37360356515"},
  {name: "WhatsApp", href: "https://wa.me/37360356515"},
  {name: "Telegram", href: "https://t.me/Goa7ik"},
];

test("footer offers direct contact on all public language versions", async ({page}) => {
  for (const locale of ["ro", "en", "ru"]) {
    await page.goto("/" + locale);
    const footer = page.locator(".future-footer .contact-methods");
    await expect(footer.locator("a")).toHaveCount(4);
    for (const {name, href} of links) {
      const match = footer.locator(`a[href="${href}"]`);
      await expect(match, `${locale}: ${name}`).toHaveCount(1);
    }
  }
});

test("contact page exposes all four channels and click-to-call on mobile and desktop", async ({page}) => {
  await page.goto("/ro/contact");
  const methods = page.locator(".contact-info .contact-methods");
  await expect(methods).toBeVisible();
  await expect(methods.locator("a")).toHaveCount(4);
  for (const {name, href} of links) {
    const a = methods.locator(`a[href="${href}"]`);
    await expect(a, name).toBeVisible();
  }
  await expect(methods.locator("a[href='https://t.me/Goa7ik']")).toContainText("@Goa7ik");
  await expect(page.getByRole("button", {name: "Copiază emailul"})).toBeVisible();
});
