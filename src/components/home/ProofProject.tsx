import Link from "next/link";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { home } from "@/content/home";
import { t, type Locale } from "@/lib/i18n";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan, type Project } from "@/lib/types";
import { href } from "@/lib/site";

export function ProofProject({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  return (
    <article className="group border-t border-rule py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(20rem,.82fr)] lg:gap-12">
        <Link
          href={href(`/work/${project.slug}`, locale)}
          aria-label={`${t(home.caseStudy, locale)}: ${project.title}`}
          className="block self-start overflow-hidden border border-rule bg-surface"
        >
          <ProjectVisual
            project={project}
            locale={locale}
            priority={index === 0}
            className="aspect-[16/10] lg:aspect-[4/3]"
          />
        </Link>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="label">
              <span className="text-signal">0{index + 1}</span>
              <span className="mx-2 opacity-40">/</span>
              {project.domain.map((d) => t(DOMAIN_LABEL[d], locale)).join(" · ")}
            </p>
            <p className="label flex items-center gap-2">
              <span
                aria-hidden
                className={`size-1.5 rounded-full ${
                  project.status === "ongoing" || project.status === "live"
                    ? "bg-ok"
                    : "bg-faint"
                }`}
              />
              {t(STATUS_LABEL[project.status], locale)}
            </p>
          </div>

          <h3 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.92] tracking-tight">
            {project.title}
          </h3>
          <p className="mt-5 max-w-[40ch] font-display text-xl leading-snug tracking-tight text-signal md:text-2xl">
            {t(project.hook, locale)}
          </p>
          <p className="mt-5 max-w-[54ch] text-[0.95rem] leading-relaxed text-muted">
            {t(project.oneLiner, locale)}
          </p>

          {project.proof?.length ? (
            <dl className="mt-8 grid gap-px border border-rule bg-rule">
              {project.proof.map((item) => (
                <div
                  key={t(item.label, locale)}
                  className="grid gap-1.5 bg-ink p-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5"
                >
                  <dt className="label flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${
                        item.access === "public" ? "bg-ok" : "bg-signal"
                      }`}
                    />
                    {t(item.label, locale)}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-text"
                      >
                        {t(item.value, locale)}
                        <span aria-hidden className="ms-2 text-signal">
                          ↗
                        </span>
                      </a>
                    ) : (
                      t(item.value, locale)
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={href(`/work/${project.slug}`, locale)}
              className="inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t(home.caseStudy, locale)}
              <span aria-hidden>→</span>
            </Link>
            {project.links?.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
              >
                {t(home.source, locale)}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
            <span className="label ms-auto">{formatSpan(project, locale)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
