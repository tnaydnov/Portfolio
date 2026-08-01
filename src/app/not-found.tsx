import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="label">
        <span className="text-signal">404</span>
        <span className="mx-2 opacity-40">/</span>
        No route
      </p>
      <h1 className="mt-8 t-hero max-w-[12ch]">Nothing here.</h1>
      <p className="mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
        This page does not exist, which is a small failure at the Prove stage.
        The work is where you probably meant to go.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/work"
          className="inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink"
        >
          See the work →
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
