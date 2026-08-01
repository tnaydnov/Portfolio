import Link from "next/link";
import { STAGES, type Stage } from "@/lib/stages";
import { STAGE_EVIDENCE, byStage } from "@/content/work";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";
import { LoopTrack } from "./LoopTrack";

function StagePanel({
  stage,
  i,
  locale,
}: {
  stage: Stage;
  i: number;
  locale: Locale;
}) {
  const evidence = STAGE_EVIDENCE[stage.id];
  const count = byStage(stage.id).length;
  const caseWord =
    count === 1
      ? t(ui.common.caseSingular, locale)
      : t(ui.common.casePlural, locale);

  return (
    <article
      dir={locale === "he" ? "rtl" : "ltr"}
      className="flex h-full flex-col justify-center border-s border-rule"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
        <div>
          <p className="label">
            <span dir="ltr" className="text-signal">
              {stage.index}
            </span>
            <span className="mx-2 opacity-40">/</span>
            {t(ui.common.stage, locale)}
          </p>

          <h3 className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.88] tracking-tight">
            {t(stage.name, locale)}
          </h3>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-signal md:text-sm">
            {t(stage.kicker, locale)}
          </p>

          <p className="mt-9 max-w-[32ch] font-display text-[clamp(1.1rem,1.7vw,1.5rem)] leading-snug tracking-tight">
            {t(stage.line, locale)}
          </p>

          {/* Only meaningful when the stages continue sideways. */}
          <p aria-hidden className="label mt-10 hidden opacity-40 lg:block">
            {i === STAGES.length - 1
              ? `↺ ${t(ui.common.backTo01, locale)}`
              : `→ ${STAGES[i + 1].index} ${t(STAGES[i + 1].name, locale)}`}
          </p>
        </div>

        <div className="max-w-[42ch] border-t border-rule-strong pt-6">
          <p className="label">
            {t(ui.common.evidence, locale)} — {evidence.title}
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
            {t(evidence.claim, locale)}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={href(`/work/${evidence.slug}`, locale)}
              className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-signal"
            >
              {t(ui.common.readCase, locale)}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={`${href("/work", locale)}?stage=${stage.id}`}
              className="label transition-colors hover:text-text"
            >
              <bdi>{count}</bdi> {caseWord} {t(ui.common.atThisStage, locale)}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function LoopSection({ locale }: { locale: Locale }) {
  return (
    <section id="loop" aria-label={t(ui.common.theLoop, locale)}>
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-3">
          <p className="label">
            <span dir="ltr" className="text-signal">
              §01
            </span>
            <span className="mx-2 opacity-40">/</span>
            {t(ui.common.theLoop, locale)}
          </p>
          <a
            href="#after-loop"
            className="label hidden transition-colors hover:text-text lg:inline"
          >
            {t(ui.home.skipTheLoop, locale)}
          </a>
        </div>

        <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <h2 className="t-section max-w-[16ch]">
            {t(ui.home.loopHeading, locale)}
          </h2>
          <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">
            {t(ui.home.loopIntro, locale)}
          </p>
        </div>
      </div>

      <LoopTrack
        indices={STAGES.map((s) => s.index)}
        panels={STAGES.map((stage, i) => (
          <StagePanel key={stage.id} stage={stage} i={i} locale={locale} />
        ))}
      />
      <span id="after-loop" />
    </section>
  );
}
