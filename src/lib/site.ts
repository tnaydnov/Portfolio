import type { Metadata } from "next";
import { LOCALES, type Locale } from "./i18n";

export const site = {
  name: { en: "Tomer Naydnov", he: "תומר ניידנוב" },
  role: {
    en: "Software engineer · EdTech builder · M.Sc. student",
    he: "מהנדס תוכנה · בונה EdTech · סטודנט לתואר שני",
  },
  url: "https://tomer-naydnov.com",
  description: {
    en: "Software Engineering graduate and Industrial Engineering & Management M.Sc. student building products from unclear need through delivery and iteration.",
    he: "בוגר הנדסת תוכנה וסטודנט לתואר שני בהנדסת תעשייה וניהול, בונה מוצרים מצורך לא ברור ועד מסירה ואיטרציה.",
  },
  email: "tnaydnov@gmail.com",
  location: { en: "Israel · UTC+2/+3", he: "ישראל · UTC+2/+3" },
  links: {
    github: "https://github.com/tnaydnov",
    linkedin: "https://www.linkedin.com/in/tomer-naydnov/",
  },
  cv: "/Tomer Naydnov.pdf",
} as const;

export const NAV = [
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "system", href: "/system" },
  { key: "contact", href: "/contact" },
] as const;

/** Prefixes a site-relative path with the active locale. */
export function href(path: string, locale: Locale): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Route-aware canonical and language links for localized pages. */
export function localeAlternates(path: string, locale: Locale) {
  return {
    canonical: href(path, locale),
    languages: Object.fromEntries(
      LOCALES.map((language) => [language, href(path, language)]),
    ),
  };
}

/** Complete route metadata so nested pages do not inherit home-page social copy. */
export function routeMetadata({
  path,
  locale,
  title,
  description,
}: {
  path: string;
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const url = href(path, locale);
  const image = `/${locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: localeAlternates(path, locale),
    openGraph: {
      type: "website",
      url,
      siteName: site.name[locale],
      title,
      description,
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: site.name.en }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
