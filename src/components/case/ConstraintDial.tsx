"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import type { ConstraintStudy } from "@/lib/types";

const LABELS = {
  time: {
    en: ["Tight", "Real", "Ample"],
    he: ["צפוף", "אמיתי", "בשפע"],
  },
  scope: {
    en: ["Narrow", "Balanced", "Broad"],
    he: ["צר", "מאוזן", "רחב"],
  },
  timeTerm: { en: "Time", he: "זמן" },
  scopeTerm: { en: "Scope", he: "היקף" },
  dial: { en: "Constraint dial", he: "חוגת אילוצים" },
  intro: {
    en: "Move the constraints and see which answer they point at. The decision was never about the best technology — it was about which one survives these two numbers.",
    he: "הזיזו את האילוצים וראו לאיזו תשובה הם מצביעים. ההחלטה מעולם לא הייתה על הטכנולוגיה הטובה ביותר — היא הייתה על מי שורדת את שני המספרים האלה.",
  },
  actual: { en: "What I actually built", he: "מה שבאמת בניתי" },
  under: { en: "Under these constraints", he: "תחת האילוצים האלה" },
  none: {
    en: "No documented answer for this combination.",
    he: "אין תשובה מתועדת לצירוף הזה.",
  },
} as const;

export function ConstraintDial({
  study,
  locale,
}: {
  study: ConstraintStudy;
  locale: Locale;
}) {
  const [time, setTime] = useState<number>(study.actual.time);
  const [scope, setScope] = useState<number>(study.actual.scope);

  const current =
    study.scenarios.find((s) => s.time === time && s.scope === scope) ?? null;
  const isActual = time === study.actual.time && scope === study.actual.scope;

  const dials = [
    {
      id: "time",
      term: t(LABELS.timeTerm, locale),
      value: time,
      set: setTime,
      labels: LABELS.time[locale],
    },
    {
      id: "scope",
      term: t(LABELS.scopeTerm, locale),
      value: scope,
      set: setScope,
      labels: LABELS.scope[locale],
    },
  ];

  return (
    <div className="border border-rule bg-surface">
      <div className="border-b border-rule p-6 md:p-8">
        <p className="label">{t(LABELS.dial, locale)}</p>
        <h3 className="mt-4 max-w-[40ch] font-display text-xl leading-snug tracking-tight md:text-2xl">
          {t(study.question, locale)}
        </h3>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted">
          {t(LABELS.intro, locale)}
        </p>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-8">
        {dials.map((d) => (
          <div key={d.id}>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`dial-${d.id}`} className="label">
                {d.term}
              </label>
              <span className="font-mono text-sm text-signal">
                {d.labels[d.value]}
              </span>
            </div>
            <input
              id={`dial-${d.id}`}
              type="range"
              min={0}
              max={2}
              step={1}
              value={d.value}
              onChange={(e) => d.set(Number(e.target.value))}
              aria-valuetext={d.labels[d.value]}
              dir="ltr"
              className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-none bg-rule accent-[var(--signal)]"
            />
            <div className="mt-3 flex justify-between" dir="ltr">
              {d.labels.map((l) => (
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
                <span className="text-signal">{t(LABELS.actual, locale)}</span>
              </>
            ) : (
              t(LABELS.under, locale)
            )}
          </p>
          <p className="mt-4 max-w-[64ch] text-[1rem] leading-relaxed text-muted">
            {current ? t(current.outcome, locale) : t(LABELS.none, locale)}
          </p>
          {isActual && (
            <p className="mt-5 max-w-[64ch] border-s-2 border-signal ps-4 text-sm leading-relaxed text-muted">
              {t(study.actual.note, locale)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
