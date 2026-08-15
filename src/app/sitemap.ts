import type { MetadataRoute } from "next";
import { projects } from "@/content/cv";
import { LOCALES } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((p) => `/work/${p.slug}`)];

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
