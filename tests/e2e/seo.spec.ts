import {test, expect} from "@playwright/test";

test("public pages have a unique locale canonical and are listed in sitemap", async ({request}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();

  for (const path of ["/ro", "/en", "/ru", "/ro/services", "/en/services", "/ru/services"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toMatch(new RegExp('<link rel="canonical" href="https?://[^"]+' + path + '"\\s*/?>'));
    expect(sitemap).toContain("<loc>https://sitesevolve.com" + path + "</loc>");
  }

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  const robots = await robotsResponse.text();
  expect(robots).toContain("Sitemap: https://sitesevolve.com/sitemap.xml");
  expect(robots).toContain("Disallow: /portal");
});

test("nonexistent routes return real HTTP 404s instead of soft-404 200s", async ({request}) => {
  for (const path of [
    "/ro/not-a-real-section",
    "/ro/services/not-a-real-service",
    "/en/work/not-a-real-project",
    "/ru/journal/not-a-real-article",
    "/not-a-supported-locale",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});
