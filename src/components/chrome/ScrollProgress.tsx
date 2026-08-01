"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline at the very top of the viewport that fills with scroll progress.
 * Written to a CSS variable so scrolling never triggers a React render.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      el.style.setProperty("--sp", p.toFixed(4));
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

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px"
      style={{ ["--sp" as string]: 0 }}
    >
      <div
        className="h-full w-full bg-signal"
        style={{ transform: "scaleX(var(--sp))", transformOrigin: "left" }}
      />
    </div>
  );
}
