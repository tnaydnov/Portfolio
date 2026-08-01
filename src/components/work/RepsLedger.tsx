import { REPS } from "@/content/work";
import { formatSpan } from "@/lib/types";

export function RepsLedger() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">
          University coursework, 2022 to 2023
        </caption>
        <thead>
          <tr className="border-y border-rule">
            <th scope="col" className="label py-3 pr-6 font-normal">
              Project
            </th>
            <th scope="col" className="label py-3 pr-6 font-normal">
              Span
            </th>
            <th scope="col" className="label py-3 pr-6 font-normal">
              Stack
            </th>
            <th scope="col" className="label py-3 font-normal">
              What it taught
            </th>
          </tr>
        </thead>
        <tbody>
          {REPS.map((p) => (
            <tr
              key={p.slug}
              className="group border-b border-rule align-top transition-colors hover:bg-surface"
            >
              <th scope="row" className="py-5 pr-6 font-normal">
                {p.links?.repo ? (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg tracking-tight transition-colors group-hover:text-signal"
                  >
                    {p.title}
                    <span aria-hidden className="ml-2 text-xs opacity-40">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className="font-display text-lg tracking-tight">
                    {p.title}
                  </span>
                )}
                <span className="mt-1 block text-sm font-normal text-faint">
                  {p.oneLiner}
                </span>
              </th>
              <td className="py-5 pr-6">
                <span className="label whitespace-nowrap">{formatSpan(p)}</span>
              </td>
              <td className="py-5 pr-6">
                <span className="label leading-relaxed">
                  {p.stack.join(" · ")}
                </span>
              </td>
              <td className="max-w-[34ch] py-5 text-sm leading-relaxed text-muted">
                {p.taught}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
