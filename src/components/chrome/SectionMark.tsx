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
        <span dir="ltr" className="text-signal">
          §{index}
        </span>
        <span className="mx-2 opacity-40">/</span>
        {title}
      </p>
      {aside ? <div className="label">{aside}</div> : null}
    </div>
  );
}

/** Corner registration brackets, drawn on hover. Purely decorative. */
export function Brackets() {
  return (
    <>
      <span
        aria-hidden
        className="bracket start-0 top-0 -translate-x-1.5 -translate-y-1.5 border-s border-t"
      />
      <span
        aria-hidden
        className="bracket end-0 top-0 translate-x-1.5 -translate-y-1.5 border-e border-t"
      />
      <span
        aria-hidden
        className="bracket bottom-0 start-0 -translate-x-1.5 translate-y-1.5 border-b border-s"
      />
      <span
        aria-hidden
        className="bracket bottom-0 end-0 translate-x-1.5 translate-y-1.5 border-b border-e"
      />
    </>
  );
}
