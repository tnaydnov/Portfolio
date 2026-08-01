"use client";

import { useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { StageId } from "@/lib/stages";

export interface FilterChip {
  id: StageId;
  index: string;
  name: string;
  kicker: string;
  line: string;
}

export interface FilterItem {
  slug: string;
  stages: StageId[];
  tier: "flagship" | "system";
  node: ReactNode;
}

interface Props {
  chips: FilterChip[];
  items: FilterItem[];
  allLabel: string;
  defaultNote: string;
  emptyNote: string;
  initialStage: StageId | null;
}

/**
 * Filtering only. Cards arrive pre-rendered from the server so the bilingual
 * content layer never reaches the client bundle.
 */
export function WorkFilter({
  chips,
  items,
  allLabel,
  defaultNote,
  emptyNote,
  initialStage,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [stage, setStage] = useState<StageId | null>(initialStage);

  const selectStage = (next: StageId | null) => {
    setStage(next);
    router.replace(next ? `${pathname}?stage=${next}` : pathname, {
      scroll: false,
    });
  };

  const shown = useMemo(
    () => (stage ? items.filter((i) => i.stages.includes(stage)) : items),
    [stage, items],
  );

  const active = stage ? chips.find((c) => c.id === stage) : null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => selectStage(null)}
          aria-pressed={stage === null}
          className={`label h-9 border px-3.5 transition-colors ${
            stage === null
              ? "border-signal text-signal"
              : "border-rule hover:border-rule-strong hover:text-text"
          }`}
        >
          {allLabel}
        </button>
        {chips.map((c) => {
          const on = stage === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => selectStage(on ? null : c.id)}
              aria-pressed={on}
              className={`label h-9 border px-3.5 transition-colors ${
                on
                  ? "border-signal text-signal"
                  : "border-rule hover:border-rule-strong hover:text-text"
              }`}
            >
              <span className="opacity-50">{c.index}</span>
              <span className="ms-2">{c.name}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 max-w-[54ch] text-sm text-muted">
        {active ? (
          <>
            <span className="text-text">{active.kicker}.</span> {active.line}
          </>
        ) : (
          defaultNote
        )}
      </p>

      {/* Keyed so the grid re-mounts and replays the CSS reveal on filter change. */}
      <div
        key={stage ?? "all"}
        className="mt-10 grid gap-px bg-rule md:grid-cols-2"
      >
        {shown.map((item, i) => (
          <div
            key={item.slug}
            className={`reveal ${item.tier === "flagship" ? "md:col-span-2" : ""}`}
            style={{
              ["--d" as string]: `${i * 55}ms`,
              ["--rise-from" as string]: "12px",
            }}
          >
            {item.node}
          </div>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 border border-dashed border-rule p-10 text-center text-sm text-muted">
          {emptyNote}
        </p>
      )}
    </>
  );
}
