"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAME, localizePath, type Locale } from "@/lib/i18n";

export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex h-8 items-center border border-rule">
      {LOCALES.map((l, i) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localizePath(pathname, l)}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={`label flex h-full items-center px-2.5 transition-colors ${
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
