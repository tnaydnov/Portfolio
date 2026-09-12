import type { Metadata } from "next";
import { LOCALES, type Locale } from "./i18n";
import { site } from "./site";

function localizedPath(locale: Locale, path = "") {
  const suffix = path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  index = true,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description: string;
  index?: boolean;
}): Metadata {
  const canonical = localizedPath(locale, path);
  const languages = Object.fromEntries([
    ...LOCALES.map((candidate) => [candidate, localizedPath(candidate, path)]),
    ["x-default", localizedPath("en", path)],
  ]);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: new URL(canonical, site.url),
      ...(title ? { title } : {}),
      description,
      locale: locale === "he" ? "he_IL" : "en_US",
    },
    robots: { index, follow: true },
  };
}
