import { LocalTime } from "@/components/chrome/LocalTime";
import { BUILT_AT } from "@/content/bio";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { site } from "@/lib/site";

const REV = `${BUILT_AT.getUTCFullYear()}.${String(BUILT_AT.getUTCMonth() + 1).padStart(2, "0")}`;

/**
 * The name, at the top, at size. Everything to its side is instrumentation:
 * where he is, what time it is there, and when this sheet was last revised.
 */
export function Masthead({ locale }: { locale: Locale }) {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 bg-ink px-5 py-5 md:px-8">
      <h1 className="font-display text-[clamp(1.65rem,3.4vw,2.6rem)] leading-none tracking-tight">
        {t(site.name, locale)}
      </h1>

      <div className="label flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
        <span>{t(site.location, locale)}</span>
        <LocalTime locale={locale} />
        <span aria-hidden className="opacity-30">
          /
        </span>
        <span>
          {t(ui.home.rev, locale)} <span dir="ltr">{REV}</span>
        </span>
        <span className="text-signal">{t(ui.home.sheetLabel, locale)}</span>
      </div>
    </header>
  );
}
