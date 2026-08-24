"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALES, LOCALE_NAME, localizePath, type Locale } from "@/lib/i18n";

export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    setSuffix(`${window.location.search}${window.location.hash}`);
  }, [pathname]);

  return (
    <div className="flex min-h-11 items-stretch border border-rule">
      {LOCALES.map((l, i) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`${localizePath(pathname, l)}${suffix}`}
            hrefLang={l}
            aria-current={active ? "page" : undefined}
            className={`label flex min-h-11 min-w-11 items-center justify-center px-3 transition-colors ${
              i > 0 ? "border-s border-rule" : ""
            } ${active ? "bg-signal text-signal-ink" : "hover:text-text"}`}
          >
            {LOCALE_NAME[l]}
          </Link>
        );
      })}
    </div>
  );
}
