import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EducationTimeline,
  ExperienceTimeline,
} from "@/components/about/CareerTimeline";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import {
  brief,
  capabilities,
  educationTimeline,
  experienceTimeline,
} from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, site } from "@/lib/site";
import { ui } from "@/lib/ui";

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/about",
    title: t(ui.about.title, locale),
    description: t(ui.about.lede, locale),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const experience = experienceTimeline.map((entry) => ({
    id: entry.id,
    span: t(entry.span, locale),
    title: t(entry.title, locale),
    org: t(entry.org, locale),
    summary: t(entry.summary, locale),
    details: t(entry.details, locale),
    current: entry.current,
  }));
  const education = educationTimeline.map((entry) => ({
    id: entry.id,
    span: t(entry.span, locale),
    title: t(entry.title, locale),
    org: t(entry.org, locale),
    summary: t(entry.summary, locale),
    current: entry.current,
  }));

  return (
    <div className="shell pt-12 md:pt-20">
      <SectionMark index="01" title={t(ui.about.title, locale)} />

      <header className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="label text-signal">{t(site.role, locale)}</p>
          <h1 className="mt-5 t-hero max-w-[9ch]">{t(ui.about.title, locale)}</h1>
          <p className="mt-8 max-w-[26ch] font-display text-[clamp(1.55rem,3vw,2.6rem)] leading-[1.14] tracking-tight">
            {t(ui.about.lede, locale)}
          </p>
        </div>
        <div className="lg:justify-self-end">
          <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-muted">
            {t(site.description, locale)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={site.cv} download className="inline-flex min-h-12 items-center bg-signal px-5 text-sm font-semibold text-signal-ink transition-transform hover:-translate-y-0.5">
              {t(ui.common.downloadCv, locale)} ↓
            </a>
            <Link href={href("/contact", locale)} className="inline-flex min-h-12 items-center border border-rule-strong px-5 text-sm hover:border-signal hover:text-signal">
              {t(ui.about.getInTouch, locale)}
            </Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="capabilities-title">
        <SectionMark index="02" title={t(ui.about.capabilitiesTitle, locale)} />
        <h2 id="capabilities-title" className="sr-only">{t(ui.about.capabilitiesTitle, locale)}</h2>
        <div className="mt-8 grid border-s border-t border-rule md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability, index) => (
            <article key={t(capability.title, locale)} className="min-h-64 border-b border-e border-rule p-6 md:p-8">
              <p className="label text-signal">0{index + 1}</p>
              <h3 className="mt-5 font-display text-2xl tracking-tight">{t(capability.title, locale)}</h3>
              <p className="mt-4 text-[0.96rem] leading-relaxed text-muted">{t(capability.body, locale)}</p>
              <p className="label mt-8 leading-relaxed">{t(capability.detail, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 pt-24 md:pt-32" aria-labelledby="experience-title">
        <SectionMark
          index="03"
          title={t(ui.about.experienceTitle, locale)}
          aside={t(ui.about.detailsHint, locale)}
        />
        <h2 id="experience-title" className="sr-only">{t(ui.about.experienceTitle, locale)}</h2>
        <div className="mt-8">
          <ExperienceTimeline
            entries={experience}
            labels={{
              current: t(ui.about.currentRole, locale),
              roleDetails: t(ui.about.roleDetails, locale),
              closeDetails: t(ui.about.closeDetails, locale),
              responsibilities: t(ui.about.responsibilities, locale),
            }}
          />
        </div>
      </section>

      <section id="education" className="scroll-mt-24 pt-24 md:pt-32" aria-labelledby="education-title">
        <SectionMark index="04" title={t(ui.about.educationTitle, locale)} />
        <h2 id="education-title" className="sr-only">{t(ui.about.educationTitle, locale)}</h2>
        <div className="mt-8">
          <EducationTimeline
            entries={education}
            currentLabel={t(ui.about.currentStudies, locale)}
          />
        </div>
      </section>

      <section className="pt-24 md:pt-32" aria-labelledby="thesis-title">
        <SectionMark index="05" title={t(ui.about.thesisLabel, locale)} />
        <Reveal>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <h2 id="thesis-title" className="t-section max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
              {locale === "he" ? "תוכנה היא הכלי. מערכות הן הנושא." : "Software is the tool. Systems are the subject."}
            </h2>
            <div className="prose">
              {t(ui.about.thesisBody, locale).slice(0, 3).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}><Rich text={paragraph} /></p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="teaching" className="scroll-mt-24 pt-20 md:pt-28" aria-labelledby="teaching-title">
        <SectionMark index="06" title={t(ui.about.teachingLabel, locale)} />
        <div className="grid gap-0 overflow-hidden border border-rule bg-surface md:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-72 overflow-hidden border-b border-rule bg-ink-2 p-7 md:min-h-[28rem] md:border-b-0 md:border-e">
            <div aria-hidden className="absolute -right-16 top-10 size-64 rounded-full border border-rule opacity-40" />
            <div aria-hidden className="absolute -right-8 top-20 size-44 rounded-full border border-signal/40" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="label text-signal">CLASSROOM / LIVE FEEDBACK</p>
              <blockquote className="max-w-[16ch] font-display text-[clamp(2rem,4vw,3.7rem)] leading-[1.02] tracking-tight">
                {locale === "he" ? "חדר שלם חושף מיד הנחה סמויה." : "A room of faces exposes a hidden assumption immediately."}
              </blockquote>
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-12">
            <h2 id="teaching-title" className="t-section max-w-[15ch]">
              {t(ui.home.classroomHeading, locale)}
            </h2>
            <div className="prose mt-7">
              {t(ui.home.classroomBody, locale).map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
            </div>
            <p className="mt-8 border-s-2 border-signal ps-5 font-display text-lg leading-snug">
              {t(ui.home.classroomRule, locale)}
            </p>
          </div>
        </div>
      </section>

      <section className="pt-24 md:pt-32" aria-labelledby="fit-title">
        <SectionMark index="07" title={t(ui.about.fitTitle, locale)} />
        <div className="grid gap-10 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <h2 id="fit-title" className="t-section max-w-[13ch]">{t(ui.about.wantLabel, locale)}</h2>
            <p className="mt-5 max-w-[35ch] text-[0.96rem] leading-relaxed text-muted">{t(ui.about.wantBody, locale)[0]}</p>
          </div>
          <dl className="border-t border-rule">
            {brief.map((row) => (
              <div key={t(row.term, locale)} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="label pt-1">{t(row.term, locale)}</dt>
                <dd className="max-w-[62ch] text-[0.98rem] leading-relaxed text-muted">{t(row.def, locale)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
