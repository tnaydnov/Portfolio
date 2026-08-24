import Link from "next/link";
import { ProjectArtifact } from "@/components/artifacts";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import {
  DOMAIN_LABEL,
  STATUS_LABEL,
  formatSpan,
  type Project,
} from "@/lib/types";

export function ProjectCard({
  project,
  locale,
  featured = false,
}: {
  project: Project;
  locale: Locale;
  featured?: boolean;
}) {
  const snapshot = project.snapshot;

  return (
    <article className="group relative h-full min-w-0 overflow-hidden border border-rule bg-surface transition-colors duration-500 hover:border-rule-strong focus-within:border-signal focus-within:shadow-[inset_0_0_0_1px_var(--signal)]">
      <Link href={href(`/work/${project.slug}`, locale)} className="flex h-full flex-col focus-visible:outline-none">
        <ProjectArtifact slug={project.slug} locale={locale} size="card" />

        <div className={`flex flex-1 flex-col ${featured ? "p-7 md:p-9" : "p-6 md:p-7"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="label">
              {project.domain.map((domain) => t(DOMAIN_LABEL[domain], locale)).join(" · ")}
            </p>
            <p className="label flex items-center gap-2">
              <span
                aria-hidden
                className={`size-1.5 rounded-full ${project.status === "live" || project.status === "ongoing" ? "bg-ok" : "bg-faint"}`}
              />
              {project.statusLabel
                ? t(project.statusLabel, locale)
                : t(STATUS_LABEL[project.status], locale)}
            </p>
          </div>

          <h3 className={`mt-5 font-display leading-none tracking-[-0.035em] transition-colors duration-300 group-hover:text-signal ${featured ? "text-[clamp(2.2rem,4vw,3.5rem)]" : "text-[clamp(1.8rem,3vw,2.5rem)]"}`}>
            {project.title}
          </h3>
          <p className="mt-4 max-w-[55ch] text-[1rem] leading-relaxed text-muted">
            {t(project.hook, locale)}
          </p>

          {snapshot ? (
            <dl className={`mt-7 grid gap-5 border-t border-rule pt-6 ${featured ? "sm:grid-cols-2" : ""}`}>
              <div>
                <dt className="label text-signal">
                  {locale === "he" ? "מה השתנה" : "The move"}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {t(snapshot.move, locale)}
                </dd>
              </div>
              <div>
                <dt className="label text-signal">
                  {locale === "he" ? "התפקיד שלי" : "My part"}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {t(snapshot.contribution, locale)}
                </dd>
              </div>
            </dl>
          ) : null}

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
            <div>
              <p className="label">{formatSpan(project, locale)}</p>
              <p className="mt-2 max-w-[40ch] text-xs leading-relaxed text-faint">
                {t(project.role, locale)}
              </p>
            </div>
            <span aria-hidden className="text-xl text-signal transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
