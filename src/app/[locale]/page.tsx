import Link from "next/link";
import { notFound } from "next/navigation";
import { Sheet } from "@/components/sheet/Sheet";
import { Desk } from "@/components/bio/Desk";
import { StudentField } from "@/components/bio/StudentField";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { FLAGSHIPS } from "@/content/work";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";

/**
 * The home page is a datasheet for one person, followed by its proof.
 *
 * The order is the argument: who he is resolves before any scroll, and the
 * method — which used to open the site as a six-station diagram — is now the
 * closing caption, because it explains a person the reader has already met.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <>
      {/* §00 — the sheet. Everything below this is evidence, not prerequisite. */}
      <Sheet locale={locale} />

      {/* §01 — the desk. His best sentence, with its evidence re-attached. */}
      <Desk locale={locale} />

      {/* §02 — the room. 650 students, drawn rather than counted. */}
      <section className="shell pt-24 md:pt-32">
        <SectionMark index="02" title={t(ui.home.roomLabel, locale)} />
        <Reveal>
          <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-20">
            <div>
              <h2 className="t-section max-w-[16ch]">
                {t(ui.home.classroomHeading, locale)}
              </h2>
              <StudentField locale={locale} className="mt-10 max-w-[26rem]" />
            </div>

            <div>
              <div className="prose">
                {t(ui.home.classroomBody, locale).map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              <p className="mt-10 max-w-[42ch] border-s-2 border-signal ps-5 font-display text-lg leading-snug tracking-tight md:text-xl">
                {t(ui.home.classroomRule, locale)}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* §03 — the evidence. */}
      <section className="shell pt-24 md:pt-32">
        <SectionMark
          index="03"
          title={t(ui.common.evidence, locale)}
          aside={
            <Link href={href("/work", locale)} className="hover:text-text">
              {t(ui.common.allWork, locale)} →
            </Link>
          }
        />

        <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <Reveal>
            <h2 className="t-section max-w-[18ch]">
              {t(ui.home.evidenceHeading, locale)}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">
              {t(ui.home.evidenceIntro, locale)}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px bg-rule md:grid-cols-2">
          {FLAGSHIPS.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={p} locale={locale} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* §04 — the word, at last. Same text as the old hero, a tenth the size,
          and it now describes somebody the reader has already met. */}
      <section className="shell pt-24 md:pt-32">
        <SectionMark index="04" title={t(ui.common.thesis, locale)} />
        <Reveal>
          <div className="grid gap-12 py-14 md:grid-cols-[auto_1fr] md:gap-20 md:py-24">
            <div>
              <p
                dir="rtl"
                lang="he"
                className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-none tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-he-display), var(--font-display), sans-serif",
                }}
              >
                {t(ui.home.mikhlolWord, locale)}
              </p>
              <p className="label mt-4">{t(ui.home.mikhlolPron, locale)}</p>
              <p className="mt-4 max-w-[22ch] font-display text-lg leading-snug tracking-tight md:text-xl">
                {t(ui.home.mikhlolDefinition, locale)}
              </p>
            </div>

            <div className="border-t border-rule-strong pt-6 md:border-s md:border-t-0 md:ps-12 md:pt-0">
              <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
                {t(ui.home.mikhlolLead, locale)}{" "}
                <strong className="font-medium text-text">
                  {t(ui.home.mikhlolBold, locale)}
                </strong>{" "}
                {t(ui.home.mikhlolRest, locale)}
              </p>
              <p className="mt-8">
                <Link
                  href={href("/system", locale)}
                  className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
                >
                  {t(ui.home.mikhlolCta, locale)}
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
