"use client";

import { useState } from "react";
import type { ConstraintStudy } from "@/lib/types";

const TIME_LABELS = ["Tight", "Real", "Ample"];
const SCOPE_LABELS = ["Narrow", "Balanced", "Broad"];

export function ConstraintDial({ study }: { study: ConstraintStudy }) {
  const [time, setTime] = useState<number>(study.actual.time);
  const [scope, setScope] = useState<number>(study.actual.scope);

  const current =
    study.scenarios.find((s) => s.time === time && s.scope === scope) ?? null;
  const isActual = time === study.actual.time && scope === study.actual.scope;

  return (
    <div className="border border-rule bg-surface">
      <div className="border-b border-rule p-6 md:p-8">
        <p className="label">Constraint dial</p>
        <h3 className="mt-4 max-w-[40ch] font-display text-xl leading-snug tracking-tight md:text-2xl">
          {study.question}
        </h3>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted">
          Move the constraints and see which answer they point at. The decision
          was never about the best technology — it was about which one survives
          these two numbers.
        </p>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-8">
        {(
          [
            ["Time", time, setTime, TIME_LABELS],
            ["Scope", scope, setScope, SCOPE_LABELS],
          ] as const
        ).map(([label, value, set, labels]) => (
          <div key={label}>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`dial-${label}`} className="label">
                {label}
              </label>
              <span className="font-mono text-sm text-signal">
                {labels[value]}
              </span>
            </div>
            <input
              id={`dial-${label}`}
              type="range"
              min={0}
              max={2}
              step={1}
              value={value}
              onChange={(e) => set(Number(e.target.value) as 0 | 1 | 2)}
              aria-valuetext={labels[value]}
              className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-none bg-rule accent-[var(--signal)]"
            />
            <div className="mt-3 flex justify-between">
              {labels.map((l) => (
                <span key={l} className="label">
                  {l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-rule p-6 md:p-8">
        <div key={`${time}-${scope}`} className="reveal">
          <p className="label flex items-center gap-2">
            {isActual ? (
              <>
                <span aria-hidden className="size-1.5 rounded-full bg-signal" />
                <span className="text-signal">What I actually built</span>
              </>
            ) : (
              "Under these constraints"
            )}
          </p>
          <p className="mt-4 max-w-[64ch] text-[1.0rem] leading-relaxed text-muted">
            {current?.outcome ?? "No documented answer for this combination."}
          </p>
          {isActual && (
            <p className="mt-5 max-w-[64ch] border-l-2 border-signal pl-4 text-sm leading-relaxed text-muted">
              {study.actual.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
