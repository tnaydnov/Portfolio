import type { Locale } from "./i18n";

export const site = {
  url: "https://tomernaydnov.com",
} as const;

/** Prefixes a site-relative path with the active locale. */
export function href(path: string, locale: Locale): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
