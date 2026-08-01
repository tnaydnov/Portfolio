"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { STAGES, type Stage } from "@/lib/stages";
import { STAGE_EVIDENCE, byStage } from "@/content/work";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useMediaQuery } from "@/components/motion/useMediaQuery";

function StagePanel({ stage, i }: { stage: Stage; i: number }) {
  const evidence = STAGE_EVIDENCE[stage.id];
  const count = byStage(stage.id).length;

  return (
    <article className="flex h-full flex-col justify-center border-l border-rule">
      <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
        <div>
          <p className="label">
            <span className="text-signal">{stage.index}</span>
            <span className="mx-2 opacity-40">/</span>
            Stage
          </p>

          <h3 className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.88] tracking-tight">
            {stage.name}
          </h3>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-signal md:text-sm">
            {stage.kicker}
          </p>

          <p className="mt-9 max-w-[32ch] font-display text-[clamp(1.1rem,1.7vw,1.5rem)] leading-snug tracking-tight">
            {stage.line}
          </p>

          {/* Only meaningful when the stages continue sideways. */}
          <p aria-hidden className="label mt-10 hidden opacity-40 lg:block">
            {i === STAGES.length - 1
              ? "↺ back to 01 — Signal"
              : `→ ${STAGES[i + 1].index} ${STAGES[i + 1].name}`}
          </p>
        </div>

        <div className="max-w-[42ch] border-t border-rule-strong pt-6">
          <p className="label">Evidence — {evidence.title}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
            {evidence.claim}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={`/work/${evidence.slug}`}
              className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-signal"
            >
              Read the case
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={`/work?stage=${stage.id}`}
              className="label transition-colors hover:text-text"
            >
              {count} {count === 1 ? "case" : "cases"} at this stage
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function VerticalLoop() {
  return (
    <ol className="grid gap-px bg-rule">
      {STAGES.map((stage, i) => (
        <li key={stage.id} className="bg-ink py-14">
          <StagePanel stage={stage} i={i} />
        </li>
      ))}
    </ol>
  );
}

function HorizontalLoop() {
  const outer = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  // Progress is written to a CSS variable rather than React state, so scrolling
  // never triggers a re-render.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = outer.current;
      const target = pin.current;
      if (!el || !target) return;

      const distance = el.offsetHeight - window.innerHeight;
      if (distance <= 0) return;

      const travelled = -el.getBoundingClientRect().top;
      const p = Math.min(Math.max(travelled / distance, 0), 1);
      target.style.setProperty("--p", p.toFixed(5));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const span = STAGES.length - 1;

  return (
    <div ref={outer} style={{ height: `${STAGES.length * 100}vh` }}>
      <div
        ref={pin}
        className="sticky top-0 h-svh overflow-hidden"
        style={{ ["--p" as string]: 0 }}
      >
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translate3d(calc(var(--p) * ${-span * 100}vw), 0, 0)`,
          }}
        >
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="h-full w-screen shrink-0">
              <StagePanel stage={stage} i={i} />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="shell pb-6">
            <div className="flex items-center justify-between">
              {STAGES.map((s) => (
                <span key={s.id} className="label">
                  {s.index}
                </span>
              ))}
            </div>
            <div className="mt-2 h-px w-full bg-rule">
              <div
                className="h-px w-full origin-left bg-signal"
                style={{
                  transform: `scaleX(calc(${(1 / STAGES.length).toFixed(4)} + var(--p) * ${(span / STAGES.length).toFixed(4)}))`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoopSection() {
  const reduced = useReducedMotion();
  // Pinned horizontal scroll is a desktop affordance. Everything else gets the
  // vertical layout, which is the default rather than the fallback.
  const roomy = useMediaQuery("(min-width: 1024px) and (min-height: 600px)");
  const pinned = roomy && !reduced;

  return (
    <section id="loop" aria-label="How I work — the six stages">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-3">
          <p className="label">
            <span className="text-signal">§01</span>
            <span className="mx-2 opacity-40">/</span>
            The loop
          </p>
          {pinned && (
            <a
              href="#after-loop"
              className="label transition-colors hover:text-text"
            >
              Skip the loop ↓
            </a>
          )}
        </div>

        <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <h2 className="t-section max-w-[16ch]">
            Six stages. Most people own two of them.
          </h2>
          <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">
            Industrial Engineering calls this a value stream. It is the same six
            steps every time, and the value is in owning all of them — including
            the last one, which is where projects become products.
          </p>
        </div>
      </div>

      {pinned ? <HorizontalLoop /> : <VerticalLoop />}
      <span id="after-loop" />
    </section>
  );
}
