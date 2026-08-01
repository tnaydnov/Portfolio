import type { ReactNode } from "react";

interface Props {
  index: string;
  title: string;
  aside?: ReactNode;
  className?: string;
}

/** Section header styled as a registration mark on a technical drawing. */
export function SectionMark({ index, title, aside, className = "" }: Props) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-3 ${className}`}
    >
      <p className="label">
        <span className="text-signal">§{index}</span>
        <span className="mx-2 opacity-40">/</span>
        {title}
      </p>
      {aside ? <div className="label">{aside}</div> : null}
    </div>
  );
}
