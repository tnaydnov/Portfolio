import { REPS } from "@/content/work";
import { formatSpan } from "@/lib/types";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export function RepsLedger({ locale }: { locale: Locale }) {
  return (
    <div
      role="region"
      tabIndex={0}
      aria-label={t(ui.work.repsTitle, locale)}
      className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
    >
      <table className="w-full min-w-[46rem] border-collapse text-start">
        <caption className="sr-only">{t(ui.work.repsSpan, locale)}</caption>
        <thead>
          <tr className="border-y border-rule">
            {[
              ui.work.colProject,
              ui.work.colSpan,
              ui.work.colStack,
              ui.work.colTaught,
            ].map((col, i) => (
              <th
                key={i}
                scope="col"
                className="label py-3 pe-6 text-start font-normal"
              >
                {t(col, locale)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {REPS.map((p) => (
            <tr
              key={p.slug}
              className="group border-b border-rule align-top transition-colors hover:bg-surface"
            >
              <th scope="row" className="py-5 pe-6 text-start font-normal">
                {p.links?.repo ? (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg tracking-tight transition-colors group-hover:text-signal"
                  >
                    {p.title}
                    <span aria-hidden className="ms-2 text-xs opacity-40">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className="font-display text-lg tracking-tight">
                    {p.title}
                  </span>
                )}
                <span className="mt-1 block text-sm font-normal text-faint">
                  {t(p.oneLiner, locale)}
                </span>
              </th>
              <td className="py-5 pe-6">
                <span className="label whitespace-nowrap">
                  {formatSpan(p, locale)}
                </span>
              </td>
              <td className="py-5 pe-6">
                <span className="label leading-relaxed">
                  {p.stack.join(" · ")}
                </span>
              </td>
              <td className="max-w-[34ch] py-5 text-sm leading-relaxed text-muted">
                {p.taught ? t(p.taught, locale) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
