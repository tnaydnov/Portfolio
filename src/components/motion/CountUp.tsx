"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";

const NUMERIC = /^(\D*?)(\d[\d,]*)([\s\S]*)$/;

/**
 * Counts a metric up when it scrolls into view. Non-numeric values (and reduced
 * motion) render as-is — the number is the content, the animation is not.
 */
export function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const match = value.match(NUMERIC);
  const target = match ? Number(match[2].replace(/,/g, "")) : null;
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const duration = 900;
        const start = performance.now();
        let frame = requestAnimationFrame(function tick(t) {
          const p = Math.min((t - start) / duration, 1);
          // expo-out, matching the reveal curve
          const eased = 1 - Math.pow(2, -10 * p);
          setShown(Math.round(target * (p === 1 ? 1 : eased)));
          if (p < 1) frame = requestAnimationFrame(tick);
        });

        return () => cancelAnimationFrame(frame);
      },
      { rootMargin: "-10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, reduced]);

  if (target === null || !match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const display = shown === null ? (reduced ? target : 0) : shown;

  return (
    <span ref={ref} className={className} data-metric>
      {match[1]}
      {display.toLocaleString("en")}
      {match[3]}
    </span>
  );
}
