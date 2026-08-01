import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { LoopSchematic } from "@/components/loop/LoopSchematic";
import { STAGES } from "@/lib/stages";
import { byStage } from "@/content/work";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href, routeMetadata } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return routeMetadata({
    path: "/system",
    locale,
    title: t(ui.system.title, locale),
    description: t(ui.system.intro, locale),
  });
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const cards = [
    {
      href: "/work",
      title: t(ui.system.nextEvidence, locale),
      body: t(ui.system.nextEvidenceBody, locale),
    },
    {
      href: "/about",
      title: t(ui.system.nextThesis, locale),
      body: t(ui.system.nextThesisBody, locale),
    },
  ];

  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title={t(ui.common.method, locale)} />

      <header className="relative isolate overflow-hidden py-14 md:py-24">
        <LoopSchematic
          locale={locale}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[160%] max-w-none -translate-x-1/2 -translate-y-1/2 text-text opacity-[0.09]"
        />
        <h1 className="t-hero max-w-[9ch]">{t(ui.system.title, locale)}</h1>
        <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">
          {t(ui.system.intro, locale)}
        </p>
      </header>

      <section>
        <SectionMark index="01" title={t(ui.system.sixStages, locale)} />
        <ol className="grid gap-px bg-rule md:grid-cols-2 xl:grid-cols-3">
          {STAGES.map((stage) => {
            const count = byStage(stage.id).length;
            const caseWord =
              count === 1
                ? t(ui.common.caseSingular, locale)
                : t(ui.common.casePlural, locale);

            return (
              <li key={stage.id} className="bg-ink">
                <Reveal className="h-full">
                  <Link
                    href={`${href("/work", locale)}?stage=${stage.id}`}
                    className="group flex h-full min-h-[23rem] flex-col p-6 transition-colors hover:bg-surface md:p-8"
                  >
                    <p className="label">
                      <span className="text-signal">{stage.index}</span>
                      <span className="mx-2 opacity-40">/</span>
                      {t(stage.kicker, locale)}
                    </p>
                    <h2 className="mt-8 font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-none tracking-tight transition-colors group-hover:text-signal">
                      {t(stage.name, locale)}
                    </h2>
                    <p className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">
                      {t(stage.line, locale)}
                    </p>

                    <div className="mt-8 border-t border-rule pt-5">
                      <p className="label">{t(ui.system.produces, locale)}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {t(stage.artifacts, locale)
                          .slice(0, 3)
                          .map((artifact) => (
                            <li
                              key={artifact}
                              className="border border-rule px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-faint"
                            >
                              {artifact}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <p className="label mt-auto pt-8 transition-colors group-hover:text-text">
                      {count} {caseWord} <span aria-hidden>→</span>
                    </p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="02" title={t(ui.system.peopleTitle, locale)} />
        <Reveal>
          <div className="grid gap-10 py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <h2 className="t-section max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
              {t(ui.system.peopleHeading, locale)}
            </h2>
            <div className="prose">
              {t(ui.system.peopleBody, locale).map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="03" title={t(ui.system.nextTitle, locale)} />
        <div className="grid gap-px bg-rule py-1 md:grid-cols-2">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={href(c.href, locale)}
              className="group bg-ink p-8 transition-colors hover:bg-surface md:p-12"
            >
              <p className="label">{c.href}</p>
              <h3 className="mt-4 font-display text-2xl tracking-tight transition-colors group-hover:text-signal md:text-3xl">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-muted">
                {c.body}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
