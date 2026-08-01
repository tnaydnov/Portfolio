import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/work";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/work", "/system", "/about", "/contact", "/budget"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...CASE_STUDIES.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.tier === "flagship" ? 0.9 : 0.6,
    })),
  ];
}
