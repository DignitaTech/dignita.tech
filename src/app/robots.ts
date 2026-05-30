import type { MetadataRoute } from "next";

const BASE = "https://dignita.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${BASE}/sitemap.xml`, "https://genera.dignita.tech/sitemap.xml"],
    host: BASE,
  };
}
