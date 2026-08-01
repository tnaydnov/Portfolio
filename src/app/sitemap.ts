import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/work";
import { LOCALES } from "@/lib/i18n";
import { site } from "@/lib/site";

const ROUTES = ["", "/work", "/system", "/about", "/contact", "/colophon"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  });

  return LOCALES.flatMap((locale) => [
    ...ROUTES.map((route) =>
      entry(`/${locale}${route}`, route === "" ? 1 : 0.8),
    ),
    ...CASE_STUDIES.map((p) =>
      entry(`/${locale}/work/${p.slug}`, p.tier === "flagship" ? 0.9 : 0.6),
    ),
  ]);
}
