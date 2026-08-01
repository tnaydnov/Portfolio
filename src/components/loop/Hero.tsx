import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";
import { LoopSchematic } from "./LoopSchematic";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden">
      {/* Cropped at the bottom edge, like a drawing continuing off the sheet. */}
      <LoopSchematic
        locale={locale}
        className="pointer-events-none absolute bottom-0 left-1/2 w-[170%] max-w-none -translate-x-1/2 translate-y-[24%] text-text opacity-[0.13] md:w-[106%]"
      />

      <div className="shell relative flex flex-1 flex-col justify-center pb-44 pt-14">
        <p className="label reveal">
          <span dir="ltr" className="text-signal">
            §00
          </span>
          <span className="mx-2 opacity-40">/</span>
          {t(ui.common.thesis, locale)}
        </p>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-20">
          <div>
            <h1
              dir="rtl"
              lang="he"
              className="reveal t-hero w-fit"
              style={{
                fontFamily: "var(--font-he-display), var(--font-display), sans-serif",
                ["--d" as string]: "80ms",
              }}
            >
              {t(ui.home.heroWord, locale)}
            </h1>

            <p
              className="label reveal mt-6"
              style={{ ["--d" as string]: "220ms" }}
            >
              {t(ui.home.heroPron, locale)}
            </p>

            <p
              className="reveal mt-4 max-w-[20ch] font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.14] tracking-tight"
              style={{ ["--d" as string]: "300ms" }}
            >
              {t(ui.home.heroDefinition, locale)}
            </p>
          </div>

          <div
            className="reveal border-t border-rule-strong pt-6 lg:pb-2"
            style={{ ["--d" as string]: "440ms" }}
          >
            <p className="max-w-[38ch] text-[1.05rem] leading-relaxed text-muted">
              {t(ui.home.heroStatementLead, locale)}{" "}
              <strong className="font-medium text-text">
                {t(ui.home.heroStatementBold, locale)}
              </strong>{" "}
              {t(ui.home.heroStatementRest, locale)}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#loop"
                className="group inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink transition-transform duration-300 hover:-translate-y-0.5 halo"
              >
                {t(ui.home.seeTheLoop, locale)}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </Link>
              <Link
                href={href("/work", locale)}
                className="group inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
              >
                {t(ui.home.theEvidence, locale)}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
