"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/** Lenis is opt-in: never mounted when the user asked for reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 0.9 }}>
      {children}
    </ReactLenis>
  );
}
