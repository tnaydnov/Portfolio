import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { numbers, timeline } from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href, routeMetadata, site } from "@/lib/site";

/** Renders **bold** spans without pulling in a markdown runtime. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
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
  return routeMetadata({
    path: "/about",
    locale,
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

  const essays = [
    { label: ui.about.thesisLabel, body: ui.about.thesisBody },
    { label: ui.about.teachingLabel, body: ui.home.classroomBody },
    { label: ui.about.wantLabel, body: ui.about.wantBody },
  ] as const;

  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title={t(ui.about.title, locale)} />

      <header className="py-14 md:py-24">
        <h1 className="t-hero max-w-[9ch]">{t(ui.about.title, locale)}</h1>
        <p className="mt-10 max-w-[30ch] font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.16] tracking-tight">
          {t(ui.about.lede, locale)}
        </p>
      </header>

      <section>
        <SectionMark index="01" title={t(ui.about.numbersTitle, locale)} />
        <dl className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
          {numbers.map((m) => (
            <div key={t(m.label, locale)} className="flex flex-col bg-ink p-6 md:p-8">
              <dt className="label mt-3">{t(m.label, locale)}</dt>
              <dd
                data-metric
                className="-order-1 font-display text-[clamp(1.9rem,4vw,3rem)] leading-none tracking-tight"
              >
                {t(m.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="02" title={t(ui.about.trackTitle, locale)} />
        <ol className="mt-8 grid gap-px bg-rule">
          {timeline.map((entry) => (
            <li key={t(entry.title, locale)} className="bg-ink">
              <div className="grid gap-4 py-8 md:grid-cols-[11rem_1fr] md:gap-10">
                <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                  <p className="label">{t(entry.span, locale)}</p>
                  {entry.current && (
                    <p className="label flex items-center gap-2 text-ok">
                      <span aria-hidden className="size-1.5 rounded-full bg-ok" />
                      {t(ui.about.current, locale)}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-tight md:text-2xl">
                    {t(entry.title, locale)}
                  </h3>
                  <p className="mt-1.5 text-sm text-signal">
                    {t(entry.org, locale)}
                  </p>
                  <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
                    {t(entry.note, locale)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.cv}
            download
            className="group inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t(ui.common.downloadCv, locale)}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
          <Link
            href={href("/system", locale)}
            className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
          >
            {t(ui.about.howIWork, locale)}
          </Link>
        </div>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark
          index="03"
          title={locale === "he" ? "הערות עבודה" : "Working notes"}
        />
        {essays.map((e, i) => (
          <Reveal key={t(e.label, locale)}>
            <div className="grid gap-10 border-t border-rule py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <h2 className="label lg:sticky lg:top-28 lg:self-start">
                {t(e.label, locale)}
              </h2>
              <div className="prose">
                {t(e.body, locale).map((para) => (
                  <p key={para.slice(0, 40)}>
                    <Rich text={para} />
                  </p>
                ))}
                {i === essays.length - 1 && (
                  <p>
                    <Link href={href("/contact", locale)}>
                      {t(ui.about.getInTouch, locale)}
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
