import type { ReactNode } from "react";

/** Native scrolling keeps anchor navigation and hydration stable. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
