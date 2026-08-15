"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMediaQuery, useReducedMotion } from "@/components/motion/hooks";

interface Props {
  panels: ReactNode[];
  indices: string[];
}

function HorizontalLoop({ panels, indices }: Props) {
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

  const count = panels.length;
  const span = count - 1;

  return (
    <div ref={outer} style={{ height: `${count * 100}vh` }}>
      <div
        ref={pin}
        className="sticky top-0 h-svh overflow-hidden"
        style={{ ["--p" as string]: 0 }}
      >
        {/* The track is mechanically LTR in both languages; panel content is not. */}
        <div
          dir="ltr"
          className="flex h-full will-change-transform"
          style={{
            transform: `translate3d(calc(var(--p) * ${-span * 100}vw), 0, 0)`,
          }}
        >
          {panels.map((panel, i) => (
            <div key={indices[i]} className="h-full w-screen shrink-0">
              {panel}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="shell pb-6" dir="ltr">
            <div className="flex items-center justify-between">
              {indices.map((index) => (
                <span key={index} className="label">
                  {index}
                </span>
              ))}
            </div>
            <div className="mt-2 h-px w-full bg-rule">
              <div
                className="h-px w-full origin-left bg-signal"
                style={{
                  transform: `scaleX(calc(${(1 / count).toFixed(4)} + var(--p) * ${(span / count).toFixed(4)}))`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Chooses the pinned track or the vertical stack. Content comes from the server. */
export function LoopTrack({ panels, indices }: Props) {
  const reduced = useReducedMotion();
  // Pinned horizontal scroll is a desktop affordance. Everything else gets the
  // vertical layout, which is the default rather than the fallback.
  const roomy = useMediaQuery("(min-width: 1024px) and (min-height: 600px)");

  if (!roomy || reduced) {
    return (
      <ol className="grid gap-px bg-rule">
        {panels.map((panel, i) => (
          <li key={indices[i]} className="bg-ink py-14">
            {panel}
          </li>
        ))}
      </ol>
    );
  }

  return <HorizontalLoop panels={panels} indices={indices} />;
}
