"use client";
import { useRef, useState } from "react";
import type { ConstraintStudy } from "@/lib/types";
import styles from "./engineering.module.css";
const LABELS = {
    time: ["Tight", "Real", "Ample"],
    scope: ["Narrow", "Balanced", "Broad"],
    timeTerm: "Time",
    scopeTerm: "Scope",
    dial: "Constraint dial",
    intro: "Move the constraints and see which answer they point at. The decision was never about the best technology — it was about which one survives these two numbers.",
    actual: "What I actually built",
    under: "Under these constraints",
    none: "No documented answer for this combination."
} as const;
export function ConstraintDial({ study }: {
    study: ConstraintStudy;
}) {
    const [time, setTime] = useState<number>(study.actual.time);
    const [scope, setScope] = useState<number>(study.actual.scope);
    const timeSlider = useRef<HTMLInputElement>(null);
    const current = study.scenarios.find((s) => s.time === time && s.scope === scope) ?? null;
    const isActual = time === study.actual.time && scope === study.actual.scope;
    const dials = [
        {
            id: "time",
            term: LABELS.timeTerm,
            value: time,
            set: setTime,
            labels: LABELS.time
        },
        {
            id: "scope",
            term: LABELS.scopeTerm,
            value: scope,
            set: setScope,
            labels: LABELS.scope
        },
    ];
    return (<div className={styles.dial}>
      <div className={styles.dialHead}>
        <p className="label">{LABELS.dial}</p>
        <h3 className="mt-4 max-w-[40ch] font-display text-xl leading-snug tracking-tight md:text-2xl">
          {study.question}
        </h3>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted">
          {LABELS.intro}
        </p>
      </div>

      <div className={styles.dials}>
        {dials.map((d) => (<div key={d.id}>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`dial-${d.id}`} className="label">
                {d.term}
              </label>
              <span className="font-mono text-sm text-signal">
                {d.labels[d.value]}
              </span>
            </div>
            <input ref={d.id === "time" ? timeSlider : undefined} id={`dial-${d.id}`} type="range" min={0} max={2} step={1} value={d.value} onChange={(e) => d.set(Number(e.target.value))} aria-valuetext={d.labels[d.value]} className="mt-2 h-11 w-full cursor-pointer accent-[var(--signal)]"/>
            <div className="mt-3 flex justify-between">
              {d.labels.map((l) => (<span key={l} className="label">
                  {l}
                </span>))}
            </div>
          </div>))}
      </div>

      <div aria-live="polite" aria-atomic="true" className={styles.dialResult}>
        <div key={`${time}-${scope}`} className="reveal">
          <p className="label flex items-center gap-2">
            {isActual ? (<>
                <span aria-hidden className="size-1.5 rounded-full bg-signal"/>
                <span className="text-signal">{LABELS.actual}</span>
              </>) : (LABELS.under)}
          </p>
          <p className="mt-4 max-w-[64ch] text-[1rem] leading-relaxed text-muted">
            {current ? current.outcome : LABELS.none}
          </p>
          {isActual && (<p className="mt-5 max-w-[64ch] border-s-2 border-signal ps-4 text-sm leading-relaxed text-muted">
              {study.actual.note}
            </p>)}
        </div>
        {!isActual ? (<button type="button" className={styles.dialReset} onClick={() => {
                setTime(study.actual.time);
                setScope(study.actual.scope);
                timeSlider.current?.focus();
            }}>
            {"Back to the actual decision"}
          </button>) : null}
      </div>
    </div>);
}
