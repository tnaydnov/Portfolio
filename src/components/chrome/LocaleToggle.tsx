"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAME, localizePath, type Locale } from "@/lib/i18n";

/**
 * Demoted to a plain pair of words in the corner. A language switch is not a
 * feature to show off; it is a thing you find when you need it.
 */
export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm">
      {LOCALES.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden className="text-faint">
                /
              </span>
            )}
            <Link
              href={localizePath(pathname, l)}
              hrefLang={l}
              aria-current={active ? "true" : undefined}
              className={`rounded-full px-1.5 py-0.5 transition-colors ${
                active ? "text-ink" : "text-faint hover:text-ink"
              }`}
            >
              {LOCALE_NAME[l]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
