import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/work";
import { site } from "@/lib/site";
import { arcPortals } from "@/content/arc-explorer";
import { arcExplorerHref } from "@/content/arc-explorer/types";

const ROUTES = ["", "/work", "/about", "/contact"];
const LAST_CONTENT_UPDATE = new Date("2026-09-15T00:00:00.000Z");

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
    entry("/work/arc/recordings", 0.6),
    ...arcPortals.flatMap(portal => portal.pages.map(page => entry(arcExplorerHref(portal.id, page.id), page.parentId ? 0.4 : 0.6))),
  ];
}
