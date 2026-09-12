import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/work";
import { site } from "@/lib/site";

const ROUTES = ["", "/work", "/about", "/contact"];
const LAST_CONTENT_UPDATE = new Date("2026-09-12T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    ...ROUTES.map((route) =>
      entry(route || "/", route === "" ? 1 : 0.8),
    ),
    ...CASE_STUDIES.map((p) =>
      entry(`/work/${p.slug}`, p.tier === "flagship" ? 0.9 : 0.6),
    ),
  ];
}
