import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/cv";
import { LOCALES, isLocale, t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";

const LABEL = {
  back: { en: "Back", he: "חזרה" },
  built: { en: "Built with", he: "בנוי עם" },
  rebuild: { en: "What I’d do differently", he: "מה הייתי עושה אחרת" },
  code: { en: "Code on GitHub", he: "קוד בגיטהאב" },
  live: { en: "Live", he: "אתר" },
} as const;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(locale) || !project) return {};
  return { title: project.name, description: t(project.blurb, locale) };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="wrap pb-24 pt-8">
      <Link
        href={href("/", locale)}
        className="lift inline-flex items-center gap-2 text-[0.95rem] text-faint transition-colors hover:text-ink"
      >
        <span aria-hidden className="rtl:rotate-180">
          ←
        </span>
        {t(LABEL.back, locale)}
      </Link>

      <header className="lift mt-8" style={{ ["--d" as string]: "60ms" }}>
        <h1 className="font-display text-[clamp(1.9rem,7vw,2.75rem)] font-bold leading-tight">
          {project.name}
        </h1>
        <p className="mt-3 max-w-[42ch] text-[1.05rem] leading-snug text-soft">
          {t(project.blurb, locale)}
        </p>
      </header>

      {project.image && (
        <Image
          src={project.image.src}
          alt={t(project.image.alt, locale)}
          width={1400}
          height={900}
          priority
          sizes="(min-width: 46rem) 43rem, 100vw"
          className="lift mt-8 w-full rounded-[var(--radius-card)] ring-1 ring-line"
          style={{ ["--d" as string]: "100ms" }}
        />
      )}

      <div
        className="lift mt-9 space-y-4 text-[1.02rem] leading-[1.72] text-soft"
        style={{ ["--d" as string]: "140ms" }}
      >
        {t(project.detail, locale).map((para) => (
          <p key={para.slice(0, 30)}>{para}</p>
        ))}
      </div>

      <section className="lift mt-10" style={{ ["--d" as string]: "180ms" }}>
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-faint">
          {t(LABEL.built, locale)}
        </h2>
        <p className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span key={tech} className="pill" dir="ltr">
              {tech}
            </span>
          ))}
        </p>
      </section>

      {/* Non-negotiable. A project page with only wins on it is an advert. */}
      <section
        className="lift mt-10 rounded-[var(--radius-card)] bg-card p-5 ring-1 ring-line sm:p-6"
        style={{ ["--d" as string]: "220ms" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-faint">
          {t(LABEL.rebuild, locale)}
        </h2>
        <p className="mt-3 text-[1.02rem] leading-relaxed">
          {t(project.rebuild, locale)}
        </p>
      </section>

      {(project.repo || project.live) && (
        <p
          className="lift mt-8 flex flex-wrap gap-x-5 gap-y-2"
          style={{ ["--d" as string]: "260ms" }}
        >
          {project.repo && (
            <a href={project.repo} className="link" rel="noreferrer" target="_blank">
              {t(LABEL.code, locale)}
            </a>
          )}
          {project.live && (
            <a href={project.live} className="link" rel="noreferrer" target="_blank">
              {t(LABEL.live, locale)}
            </a>
          )}
        </p>
      )}
    </main>
  );
}
