import type { Locale } from "./i18n";

export const site = {
  name: { en: "Tomer Naydnov", he: "תומר ניידנוב" },
  role: {
    en: "Technical product · end-to-end delivery",
    he: "מוצר טכני · אספקה מקצה לקצה",
  },
  url: "https://tomernaydnov.com",
  description: {
    en: "I find the need, define the shape, plan the path, build the thing, prove it works, and fix what the field says is wrong. Software Engineering for the build, Industrial Engineering for the system.",
    he: "אני מוצא את הצורך, מגדיר את הצורה, מתכנן את הדרך, בונה את הדבר, מוכיח שהוא עובד, ומתקן את מה שהשטח אומר שלא בסדר. הנדסת תוכנה לבנייה, הנדסת תעשייה למערכת.",
  },
  email: "tnaydnov@gmail.com",
  location: { en: "Israel · GMT+3", he: "ישראל · GMT+3" },
  links: {
    github: "https://github.com/tnaydnov",
    linkedin: "https://www.linkedin.com/in/tomer-naydnov/",
  },
  cv: "/Tomer Naydnov.pdf",
} as const;

export const NAV = [
  { key: "work", href: "/work" },
  { key: "system", href: "/system" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** Prefixes a site-relative path with the active locale. */
export function href(path: string, locale: Locale): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
