import { REPS } from "@/content/work";
import { formatSpan } from "@/lib/types";
import { t, type Locale } from "@/lib/i18n";

export function RepsLedger({ locale }: { locale: Locale }) {
  return (
    <ul className="grid border-t border-rule md:grid-cols-2 xl:grid-cols-3">
      {REPS.map((project) => (
        <li key={project.slug} className="border-b border-rule md:odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0">
          <a
            href={project.links?.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full min-h-56 flex-col p-6 transition-colors hover:bg-surface md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="label">{formatSpan(project, locale)}</span>
              <span aria-hidden className="text-faint transition-colors group-hover:text-signal">↗</span>
            </div>
            <h3 className="mt-5 font-display text-2xl tracking-tight transition-colors group-hover:text-signal">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(project.oneLiner, locale)}
            </p>
            {project.taught ? (
              <p className="mt-auto border-t border-rule pt-5 text-sm leading-relaxed text-faint">
                {t(project.taught, locale)}
              </p>
            ) : null}
            <p className="label mt-5 leading-relaxed">{project.stack.join(" · ")}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
