import { t, type Locale } from "@/lib/i18n";
import type { Architecture } from "@/lib/types";

const KIND_ACCENT: Record<string, string> = {
  edge: "var(--signal)",
  service: "var(--trace)",
  store: "var(--text-faint)",
  client: "var(--ok)",
};

/** A native system ledger: server-rendered, keyboard-accessible and readable at
 * every width. The public architecture stays inspectable without a canvas. */
export function ArchitectureGraphLazy({
  architecture,
  locale,
}: {
  architecture: Architecture;
  locale: Locale;
}) {
  const nodeName = new Map(architecture.nodes.map((node) => [node.id, node.label]));

  return (
    <figure className="border border-rule bg-surface">
      <div className="border-b border-rule p-4 md:p-6">
        <p className="label">{locale === "he" ? "נתיבי מערכת" : "System paths"}</p>
        <div className="mt-4 flex flex-wrap gap-2" dir="ltr">
          {architecture.edges.map((edge, index) => (
            <span
              key={`${edge.from}-${edge.to}-${index}`}
              className="border border-rule bg-ink px-2.5 py-1.5 font-mono text-[0.62rem] tracking-[0.08em] text-faint"
            >
              {nodeName.get(edge.from)} → {nodeName.get(edge.to)}
              {edge.label ? ` / ${edge.label}` : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {architecture.nodes.map((node, index) => (
          <details key={node.id} className="group bg-ink open:bg-surface-2">
            <summary className="flex min-h-32 cursor-pointer list-none flex-col p-5 outline-offset-[-3px] marker:content-none md:p-6">
              <span
                aria-hidden
                className="mb-6 block h-0.5 w-8"
                style={{ background: KIND_ACCENT[node.kind] }}
              />
              <span className="label">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-2 font-display text-lg leading-tight tracking-tight">
                {node.label}
              </span>
              {node.sub ? (
                <span className="label mt-2 normal-case tracking-normal">{node.sub}</span>
              ) : null}
              <span
                aria-hidden
                className="mt-auto self-end pt-4 text-signal transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="border-t border-rule p-5 text-[0.9rem] leading-relaxed text-muted md:p-6">
              {t(node.note, locale)}
            </p>
          </details>
        ))}
      </div>

      <figcaption className="border-t border-rule px-5 py-4 text-sm text-faint md:px-6">
        {t(architecture.caption, locale)}
      </figcaption>
    </figure>
  );
}
