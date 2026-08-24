import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Seconds, to match the motion tokens. */
  delay?: number;
  className?: string;
}

/**
 * Progressive scroll reveal. Content is visible by default (and without JS);
 * browsers that support view timelines add the entrance motion in CSS.
 */
export function Reveal({ children, delay = 0, className = "" }: Props) {
  return (
    <div
      className={`scroll-reveal ${className}`}
      style={{ ["--d" as string]: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}
