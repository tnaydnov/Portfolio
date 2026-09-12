"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALES, LOCALE_NAME, LOCALE_FULL, localizePath, type Locale } from "@/lib/i18n";
import styles from "./chrome.module.css";

export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const update = () => setSuffix(`${window.location.search}${window.location.hash}`);
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    window.addEventListener("portfolio:selection", update);
    return () => { window.removeEventListener("hashchange", update); window.removeEventListener("popstate", update); window.removeEventListener("portfolio:selection", update); };
  }, [pathname]);
  return <div className={styles.localeToggle} role="group" aria-label={locale === "he" ? "שפת האתר" : "Site language"} dir="ltr">
    {LOCALES.map((language) => <Link key={language} href={`${localizePath(pathname, language)}${suffix}`} hrefLang={language} lang={language} aria-label={LOCALE_FULL[language]} aria-current={language === locale ? "page" : undefined}>{LOCALE_NAME[language]}</Link>)}
  </div>;
}
