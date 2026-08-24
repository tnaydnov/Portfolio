import type { Locale } from "./i18n";

export const site = {
  name: { en: "Tomer Naydnov", he: "תומר ניידנוב" },
  role: {
    en: "Technical product builder",
    he: "בונה מוצר טכני",
  },
  url: "https://tomernaydnov.com",
  description: {
    en: "I find the workaround everyone has accepted, trace it to the real problem, and build the fix.",
    he: "אני מוצא את המעקף שכולם כבר קיבלו, עוקב אחריו עד לבעיה האמיתית, ובונה את התיקון.",
  },
  email: "tnaydnov@gmail.com",
  location: { en: "Israel time", he: "שעון ישראל" },
  links: {
    github: "https://github.com/tnaydnov",
    linkedin: "https://www.linkedin.com/in/tomer-naydnov/",
  },
  cv: "/Tomer Naydnov.pdf",
} as const;

export const NAV = [
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** Prefixes a site-relative path with the active locale. */
export function href(path: string, locale: Locale): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
