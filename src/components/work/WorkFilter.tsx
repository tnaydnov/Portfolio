"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { STAGES, type StageId } from "@/lib/stages";
import { CASE_STUDIES } from "@/content/work";
import { ProjectCard } from "./ProjectCard";

export function WorkFilter() {
  const params = useSearchParams();
  const requested = params.get("stage");
  const initial = STAGES.some((s) => s.id === requested)
    ? (requested as StageId)
    : null;

  const [stage, setStage] = useState<StageId | null>(initial);

  const shown = useMemo(
    () =>
      stage ? CASE_STUDIES.filter((p) => p.stages.includes(stage)) : CASE_STUDIES,
    [stage],
  );

  const active = stage ? STAGES.find((s) => s.id === stage) : null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setStage(null)}
          aria-pressed={stage === null}
          className={`label h-9 border px-3.5 transition-colors ${
            stage === null
              ? "border-signal text-signal"
              : "border-rule hover:border-rule-strong hover:text-text"
          }`}
        >
          All
        </button>
        {STAGES.map((s) => {
          const on = stage === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStage(on ? null : s.id)}
              aria-pressed={on}
              className={`label h-9 border px-3.5 transition-colors ${
                on
                  ? "border-signal text-signal"
                  : "border-rule hover:border-rule-strong hover:text-text"
              }`}
            >
              <span className="opacity-50">{s.index}</span>
              <span className="ml-2">{s.name}</span>
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
          <>
            Filtered by stage of delivery, not by technology — because the stack
            is the least interesting thing about any of these.
          </>
        )}
      </p>

      {/* Keyed so the grid re-mounts and replays the CSS reveal on filter change. */}
      <div
        key={stage ?? "all"}
        className="mt-10 grid gap-px bg-rule md:grid-cols-2"
      >
        {shown.map((p, i) => (
          <div
            key={p.slug}
            className={`reveal ${i === 0 ? "md:col-span-2" : ""}`}
            style={{
              ["--d" as string]: `${i * 55}ms`,
              ["--rise-from" as string]: "12px",
            }}
          >
            <ProjectCard project={p} featured={i === 0} />
          </div>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 border border-dashed border-rule p-10 text-center text-sm text-muted">
          Nothing at this stage yet. That is the honest answer rather than a
          padded one.
        </p>
      )}
    </>
  );
}
