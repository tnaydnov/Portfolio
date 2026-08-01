"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Seconds, to match the motion tokens. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-in reveal via IntersectionObserver + CSS. Deliberately not a library:
 * the `.reveal` keyframe is disabled under prefers-reduced-motion in globals.css.
 */
export function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-8% 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${shown ? "reveal" : "opacity-0"} ${className}`}
      style={{ ["--d" as string]: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}
