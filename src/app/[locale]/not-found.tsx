"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, t } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const pathname = usePathname();
  const candidate = params?.locale ?? pathname.split("/")[1];
  const locale = isLocale(candidate) ? candidate : DEFAULT_LOCALE;

  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="label">
        <span className="text-signal">404</span>
        <span className="mx-2 opacity-40">/</span>
        {t(ui.notFound.label, locale)}
      </p>
      <h1 className="mt-8 t-hero max-w-[12ch]">
        {t(ui.notFound.title, locale)}
      </h1>
      <p className="mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
        {t(ui.notFound.body, locale)}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={href("/work", locale)}
          className="inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink"
        >
          {t(ui.notFound.cta, locale)}
        </Link>
        <Link
          href={href("/", locale)}
          className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
        >
          {t(ui.notFound.home, locale)}
        </Link>
      </div>
    </div>
  );
}
