export const LOCALES = ["en", "he"] as const;

export type Locale = (typeof LOCALES)[number];

/** A string that exists in every locale. */
export type LS = Record<Locale, string>;
/** A paragraph array that exists in every locale. */
export type LSA = Record<Locale, string[]>;

export const DEFAULT_LOCALE: Locale = "en";

export const DIR: Record<Locale, "ltr" | "rtl"> = { en: "ltr", he: "rtl" };

export const LOCALE_NAME: Record<Locale, string> = { en: "EN", he: "עב" };

export const LOCALE_FULL: Record<Locale, string> = {
  en: "English",
  he: "עברית",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function t(value: LS, locale: Locale): string;
export function t(value: LSA, locale: Locale): string[];
export function t(value: LS | LSA, locale: Locale): string | string[] {
  return value[locale];
}

/** Swaps the locale segment of a pathname, preserving the rest. */
export function localizePath(pathname: string, locale: Locale): string {
  const rest = pathname.replace(/^\/(en|he)(?=\/|$)/, "");
  return `/${locale}${rest}`;
}
