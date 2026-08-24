import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import { formatSpan, type Project } from "@/lib/types";

export function EarlierWorkLedger({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  return (
    <ul className="grid border-t border-rule md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => {
        const takeaway = project.taught ?? project.snapshot?.move;
        const content = (
          <>
            <div className="flex items-center justify-between gap-4">
              <span className="label">{formatSpan(project, locale)}</span>
              <span className="label text-faint transition-colors group-hover:text-signal">
                {project.tier === "rep"
                  ? locale === "he" ? "GitHub ↖" : "GitHub ↗"
                  : locale === "he" ? "מקרה בוחן ←" : "Case study →"}
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl tracking-tight transition-colors group-hover:text-signal">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(project.oneLiner, locale)}
            </p>
            {takeaway ? (
              <p className="mt-auto border-t border-rule pt-5 text-sm leading-relaxed text-faint">
                {t(takeaway, locale)}
              </p>
            ) : null}
            <p className="label mt-5 leading-relaxed">{project.stack.join(" · ")}</p>
          </>
        );

        return (
          <li key={project.slug} className="border-b border-rule md:odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0">
            {project.tier === "rep" ? (
              <a
                href={project.links?.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-56 flex-col p-6 transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal md:p-7"
              >
                {content}
              </a>
            ) : (
              <Link
                href={href(`/work/${project.slug}`, locale)}
                className="group flex h-full min-h-56 flex-col p-6 transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal md:p-7"
              >
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
