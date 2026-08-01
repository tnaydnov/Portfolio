import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceMontage } from "@/components/home/EvidenceMontage";
import { ProofProject } from "@/components/home/ProofProject";
import { MethodRail } from "@/components/home/MethodRail";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { home } from "@/content/home";
import { FLAGSHIPS } from "@/content/work";
import { numbers } from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { href, site } from "@/lib/site";

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
      <section className="shell grid min-h-[calc(100svh-4rem)] gap-12 py-12 lg:grid-cols-[minmax(20rem,.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-14 lg:py-16">
        <div className="flex h-full flex-col justify-center">
          <p className="label reveal">
            <span className="text-signal">TOMER NAYDNOV</span>
            <span className="mx-2 opacity-40">/</span>
            {t(home.eyebrow, locale)}
          </p>

          <h1 className="mt-8 max-w-[10ch] font-display text-[clamp(3rem,7.4vw,7rem)] leading-[0.9] tracking-[-0.05em]">
            <span className="reveal block" style={{ ["--d" as string]: "80ms" }}>
              {t(home.headlineLead, locale)}
            </span>
            <span
              className="reveal mt-2 block text-signal"
              style={{ ["--d" as string]: "170ms" }}
            >
              {t(home.headlineAccent, locale)}
            </span>
          </h1>

          <p
            className="reveal mt-8 max-w-[48ch] text-[1.02rem] leading-relaxed text-muted"
            style={{ ["--d" as string]: "260ms" }}
          >
            {t(home.intro, locale)}
          </p>

          <p
            className="label reveal mt-5 text-text"
            style={{ ["--d" as string]: "320ms" }}
          >
            {t(home.status, locale)}
          </p>

          <div
            className="reveal mt-8 flex flex-wrap gap-3"
            style={{ ["--d" as string]: "380ms" }}
          >
            <Link
              href="#work"
              className="inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink transition-transform duration-300 hover:-translate-y-0.5 halo"
            >
              {t(home.viewWork, locale)}
              <span aria-hidden>↓</span>
            </Link>
            <a
              href={site.cv}
              download
              className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
            >
              {t(home.downloadCv, locale)}
              <span aria-hidden>↘</span>
            </a>
          </div>

          <aside className="mt-12 grid max-w-[31rem] grid-cols-[auto_1fr] gap-4 border-t border-rule pt-5">
            <p
              lang="he"
              dir="rtl"
              className="font-display text-2xl leading-none tracking-tight"
            >
              מכלול
            </p>
            <p className="text-xs leading-relaxed text-faint">
              {locale === "he"
                ? "השלם שנוצר מהשילוב של כל חלקיו. שם לדרך שבה החלקים של העבודה שלי מתחברים."
                : "The whole formed by all its parts. A name for the way the pieces of my work connect."}
            </p>
          </aside>
        </div>

        <div className="reveal lg:ps-4" style={{ ["--d" as string]: "220ms" }}>
          <EvidenceMontage locale={locale} />
        </div>
      </section>

      <section id="work" className="shell pt-24 md:pt-32">
        <SectionMark
          index="01"
          title={t(home.evidenceLabel, locale)}
          aside={
            <Link href={href("/work", locale)} className="hover:text-text">
              {locale === "he" ? "כל העבודות ←" : "All work →"}
            </Link>
          }
        />

        <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <Reveal>
            <h2 className="t-section max-w-[16ch]">
              {t(home.evidenceHeading, locale)}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[42ch] text-[0.95rem] leading-relaxed text-muted">
              {t(home.evidenceIntro, locale)}
            </p>
          </Reveal>
        </div>

        <div>
          {FLAGSHIPS.map((project, index) => (
            <ProofProject
              key={project.slug}
              project={project}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="pt-24 md:pt-32">
        <div className="shell">
          <SectionMark index="02" title={t(home.methodLabel, locale)} />
          <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
            <Reveal>
              <h2 className="t-section max-w-[17ch]">
                {t(home.methodHeading, locale)}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-[40ch] text-[0.95rem] leading-relaxed text-muted">
                {t(home.methodIntro, locale)}
              </p>
            </Reveal>
          </div>
        </div>
        <MethodRail locale={locale} />
        <div className="shell mt-6 text-end">
          <Link
            href={href("/system", locale)}
            className="label transition-colors hover:text-text"
          >
            {locale === "he" ? "השיטה המלאה ←" : "The full method →"}
          </Link>
        </div>
      </section>

      <section className="shell pt-24 md:pt-32">
        <SectionMark index="03" title={t(home.profileLabel, locale)} />
        <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.08fr] lg:gap-20 lg:py-20">
          <Reveal>
            <div>
              <h2 className="t-section max-w-[15ch]">
                {t(home.profileHeading, locale)}
              </h2>
              <p className="mt-8 max-w-[48ch] text-[1rem] leading-relaxed text-muted">
                {t(home.profileBody, locale)}
              </p>
              <Link
                href={href("/about", locale)}
                className="mt-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-signal"
              >
                {t(home.profileLink, locale)} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="grid grid-cols-2 gap-px border border-rule bg-rule">
              {numbers.map((item) => (
                <div key={t(item.label, locale)} className="flex flex-col bg-ink p-5 md:p-6">
                  <dt className="label mt-3 leading-relaxed">
                    {t(item.label, locale)}
                  </dt>
                  <dd
                    data-metric
                    className="-order-1 font-display text-[clamp(1.35rem,3vw,2.25rem)] leading-none tracking-tight"
                  >
                    {t(item.value, locale)}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="shell pt-24 md:pt-32">
        <div className="relative overflow-hidden border-y border-rule py-16 md:py-24">
          <p className="label text-signal">04 / {t(home.closingLabel, locale)}</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
            <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
              {t(home.closingHeading, locale)}
            </h2>
            <div>
              <p className="max-w-[42ch] text-[1rem] leading-relaxed text-muted">
                {t(home.closingBody, locale)}
              </p>
              <Link
                href={href("/contact", locale)}
                className="mt-8 inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t(home.contact, locale)}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
