"use client";

import { useMemo, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import type { Architecture } from "@/lib/types";

const KIND_ACCENT: Record<string, string> = {
  edge: "var(--signal)",
  service: "var(--trace)",
  store: "var(--text-faint)",
  client: "var(--ok)",
};

export function ArchitectureGraph({
  architecture,
  locale,
}: {
  architecture: Architecture;
  locale: Locale;
}) {
  const [selected, setSelected] = useState(architecture.nodes[0].id);
  const detail = architecture.nodes.find((node) => node.id === selected)!;
  const nodeById = useMemo(
    () => Object.fromEntries(architecture.nodes.map((node) => [node.id, node])),
    [architecture.nodes],
  );
  const maxX = Math.max(1, ...architecture.nodes.map((node) => node.x));
  const maxY = Math.max(1, ...architecture.nodes.map((node) => node.y));
  const x = (value: number) => 70 + (value / maxX) * 860;
  const y = (value: number) => 55 + (value / maxY) * 370;

  return (
    <figure className="border border-rule bg-surface">
      <div aria-hidden className="relative hidden h-[30rem] overflow-hidden border-b border-rule bg-ink-2 md:block" dir="ltr">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:22px_22px]" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 480" preserveAspectRatio="none">
          {architecture.edges.map((edge, index) => {
            const from = nodeById[edge.from];
            const to = nodeById[edge.to];
            if (!from || !to) return null;
            const startX = x(from.x);
            const startY = y(from.y);
            const endX = x(to.x);
            const endY = y(to.y);
            const middleX = (startX + endX) / 2;
            return (
              <path
                key={`${edge.from}-${edge.to}-${index}`}
                d={`M ${startX} ${startY} C ${middleX} ${startY}, ${middleX} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke="var(--rule-strong)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {architecture.nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute w-40 -translate-x-1/2 -translate-y-1/2 border bg-surface px-3 py-2.5 ${selected === node.id ? "border-signal" : "border-rule-strong"}`}
            style={{ left: `${x(node.x) / 10}%`, top: `${y(node.y) / 4.8}%` }}
          >
            <span className="mb-2 block h-0.5 w-6" style={{ background: KIND_ACCENT[node.kind] }} />
            <span className="block text-[0.8rem] font-medium leading-tight text-text">{node.label}</span>
            {node.sub ? <span className="label mt-1.5 block normal-case tracking-normal">{node.sub}</span> : null}
          </div>
        ))}
      </div>

      <div role="group" className="grid gap-2 border-b border-rule p-4 sm:grid-cols-2 md:grid-cols-3 md:p-6" aria-label={locale === "he" ? "רכיבי המערכת" : "System components"}>
        {architecture.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setSelected(node.id)}
            aria-pressed={selected === node.id}
            className={`min-h-12 border px-3 py-2 text-start text-sm transition-colors ${
              selected === node.id
                ? "border-signal text-text"
                : "border-rule text-muted hover:border-rule-strong"
            }`}
          >
            <span className="block font-medium">{node.label}</span>
            {node.sub ? <span className="label mt-1 block normal-case tracking-normal">{node.sub}</span> : null}
          </button>
        ))}
      </div>

      <div aria-live="polite" aria-atomic="true" className="grid gap-6 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
        <div>
          <p className="label">{t(ui.common.selected, locale)}</p>
          <p className="mt-3 font-display text-xl tracking-tight">{detail.label}</p>
          {detail.sub ? <p className="label mt-2">{detail.sub}</p> : null}
        </div>
        <p className="max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">{t(detail.note, locale)}</p>
      </div>

      <figcaption className="border-t border-rule px-6 py-4 text-sm text-faint md:px-8">
        {t(architecture.caption, locale)}
      </figcaption>
    </figure>
  );
}
