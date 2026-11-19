import {test, expect} from "@playwright/test";

test("public pages have self-referencing canonicals and appear in sitemap", async ({request}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();

  for (const path of ["/ro", "/en", "/ru", "/ro/services", "/en/services", "/ru/services"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);

    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"\s*\/>/)?.[1];
    expect(canonical, path).toBeDefined();
    expect(new URL(canonical!).pathname).toBe(path);
    expect(sitemap).toContain("<loc>" + canonical + "</loc>");
  }

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  const robots = await robotsResponse.text();
  expect(robots).toContain("Sitemap:");
  expect(robots).toContain("Disallow: /portal");
});

test("nonexistent routes return genuine HTTP 404s instead of soft-404 200s", async ({request}) => {
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
