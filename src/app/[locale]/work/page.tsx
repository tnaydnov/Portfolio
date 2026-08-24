import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { ProjectCard } from "@/components/work/ProjectCard";
import { RepsLedger } from "@/components/work/RepsLedger";
import { FLAGSHIPS, SYSTEMS } from "@/content/work";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/lib/site";
import { ui } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/work",
    title: t(ui.work.title, locale),
    description: t(ui.work.intro, locale),
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="shell pt-12 md:pt-20">
      <SectionMark index="01" title={t(ui.common.evidence, locale)} />

      <header className="grid gap-8 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="label text-signal">
            {locale === "he" ? "סקירה מהירה. עומק לפי בחירה." : "Fast read. Optional depth."}
          </p>
          <h1 className="mt-5 t-hero max-w-[8ch]">{t(ui.work.title, locale)}</h1>
        </div>
        <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-muted lg:justify-self-end">
          {t(ui.work.intro, locale)}
        </p>
      </header>

      <section aria-labelledby="selected-work-title">
        <SectionMark index="02" title={t(ui.work.selectedTitle, locale)} aside={t(ui.work.selectedIntro, locale)} />
        <h2 id="selected-work-title" className="sr-only">{t(ui.work.selectedTitle, locale)}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {FLAGSHIPS.map((project, index) => (
            <div key={project.slug} className={`min-w-0 ${index === 0 ? "lg:col-span-2" : ""}`}>
              <ProjectCard project={project} locale={locale} featured={index === 0} />
            </div>
          ))}
        </div>
      </section>

      <aside className="my-24 overflow-hidden border border-rule bg-surface md:my-32">
        <div className="grid md:grid-cols-[0.7fr_1.3fr]">
          <div className="relative min-h-56 overflow-hidden border-b border-rule bg-ink-2 p-7 md:min-h-72 md:border-b-0 md:border-e">
            <div aria-hidden className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_35%,rgba(255,90,47,.2),transparent_24%),linear-gradient(120deg,transparent_42%,rgba(111,154,155,.12)_43%,transparent_44%)]" />
            <pre aria-hidden dir="ltr" className="relative z-10 font-mono text-[clamp(.62rem,1.3vw,.82rem)] leading-[1.8] text-muted">
              <code>{`age = input("Enter age: ")\n\nif age >= 16:\n    print("Allowed")\n\n# What assumption did\n# the explanation hide?`}</code>
            </pre>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-12">
            <p className="label text-signal">{t(ui.work.teachingTitle, locale)}</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
              {locale === "he" ? "המשוב המהיר ביותר שקיבלתי אי פעם." : "The fastest feedback loop I have ever had."}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-relaxed text-muted">
              {t(ui.work.teachingBody, locale)}
            </p>
            <Link href={`${href("/about", locale)}#teaching`} className="mt-7 w-fit text-sm underline decoration-signal underline-offset-4 hover:text-signal">
              {locale === "he" ? "על הוראה והקשבה ←" : "Teaching, listening and product work →"}
            </Link>
          </div>
        </div>
      </aside>

      <section aria-labelledby="engineering-title">
        <SectionMark index="03" title={t(ui.work.engineeringTitle, locale)} aside={t(ui.work.engineeringIntro, locale)} />
        <h2 id="engineering-title" className="sr-only">{t(ui.work.engineeringTitle, locale)}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {SYSTEMS.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>

      <section className="pt-24 md:pt-32" aria-labelledby="archive-title">
        <SectionMark index="04" title={t(ui.work.repsTitle, locale)} aside={t(ui.work.repsSpan, locale)} />
        <div className="grid gap-7 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="archive-title" className="t-section max-w-[18ch]">
            {t(ui.work.repsHeading, locale)}
          </h2>
          <p className="max-w-[42ch] text-[0.95rem] leading-relaxed text-muted">
            {t(ui.work.repsIntro, locale)}
          </p>
        </div>
        <RepsLedger locale={locale} />
      </section>
    </div>
  );
}
