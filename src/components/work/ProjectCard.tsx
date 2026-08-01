import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import {
  DOMAIN_LABEL,
  STATUS_LABEL,
  formatSpan,
  type Project,
} from "@/lib/types";
import { Brackets } from "@/components/chrome/SectionMark";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  locale,
  featured = false,
}: {
  project: Project;
  locale: Locale;
  featured?: boolean;
}) {
  return (
    <article className="group relative h-full border border-rule bg-surface transition-colors duration-500 hover:border-rule-strong">
      <Brackets />
      <Link
        href={href(`/work/${project.slug}`, locale)}
        className="flex h-full flex-col outline-offset-4"
      >
        <div className="border-b border-rule">
          <ProjectVisual
            project={project}
            locale={locale}
            className={featured ? "aspect-[16/8]" : "aspect-[16/10]"}
          />
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="label">
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

          <h2
            className={`mt-5 font-display tracking-tight transition-colors duration-300 group-hover:text-signal ${
              featured
                ? "text-[clamp(1.9rem,4vw,3rem)] leading-[1.02]"
                : "text-[1.75rem] leading-[1.06]"
            }`}
          >
            {project.title}
          </h2>

          <p
            className={`mt-3 leading-relaxed text-muted ${
              featured ? "max-w-[52ch] text-[1.05rem]" : "text-[0.95rem]"
            }`}
          >
            {t(featured ? project.hook : project.oneLiner, locale)}
          </p>

          {project.metrics.length > 0 && (
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              {project.metrics.slice(0, featured ? 4 : 2).map((m) => (
                <div key={t(m.label, locale)} className="flex flex-col">
                  <dt className="label mt-2">{t(m.label, locale)}</dt>
                  <dd
                    data-metric
                    className="-order-1 font-display text-2xl leading-none tracking-tight"
                  >
                    {t(m.value, locale)}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <p className="label">{formatSpan(project, locale)}</p>
            <span
              aria-hidden
              className="text-signal transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
