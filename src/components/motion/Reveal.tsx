import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Seconds, to match the motion tokens. */
  delay?: number;
  className?: string;
}

/** Visible-by-default entry motion. Keeping the content in the document flow
 * avoids turning JavaScript or IntersectionObserver failures into blank pages. */
export function Reveal({ children, delay = 0, className = "" }: Props) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ ["--d" as string]: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}
