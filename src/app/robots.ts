import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/console", "/portal", "/workspace", "/setup", "/login"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
