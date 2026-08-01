import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/loop/Hero";
import { LoopSection } from "@/components/loop/LoopSection";
import { StageTicker } from "@/components/loop/LoopSchematic";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { FLAGSHIPS } from "@/content/work";
import { numbers } from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";

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
      <Hero locale={locale} />
      <StageTicker locale={locale} />
      <LoopSection locale={locale} />

      <section className="shell pt-24 md:pt-32">
        <SectionMark
          index="02"
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

      <section className="shell pt-24 md:pt-32">
        <SectionMark index="03" title={t(ui.home.classroomLabel, locale)} />
        <Reveal>
          <div className="grid gap-10 py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-20">
            <div>
              <h2 className="t-section max-w-[16ch]">
                {t(ui.home.classroomHeading, locale)}
              </h2>
              <dl className="mt-12 grid grid-cols-2 gap-px border border-rule bg-rule">
                {numbers.slice(0, 2).map((n) => (
                  <div key={t(n.label, locale)} className="bg-ink p-6">
                    <dd className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-none tracking-tight">
                      <CountUp value={t(n.value, locale)} />
                    </dd>
                    <dt className="label mt-3">{t(n.label, locale)}</dt>
                  </div>
                ))}
              </dl>
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

      <section className="shell pt-24 md:pt-32">
        <SectionMark index="04" title={t(ui.common.position, locale)} />
        <Reveal>
          <div className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:gap-20 md:py-20">
            <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.16] tracking-tight">
              {t(ui.home.positionQuoteLead, locale)}{" "}
              <span className="text-signal">
                {t(ui.home.positionQuoteAccent, locale)}
              </span>
            </p>
            <div className="prose">
              {t(ui.home.positionBody, locale).map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              <p>
                <Link href={href("/system", locale)}>
                  {t(ui.home.seeHowIWork, locale)}
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
