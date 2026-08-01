import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionMark } from "@/components/chrome/SectionMark";
import { WorkFilter } from "@/components/work/WorkFilter";
import { RepsLedger } from "@/components/work/RepsLedger";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies indexed by stage of delivery — signal, frame, plan, build, prove, field — rather than by technology.",
};

export default function WorkPage() {
  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="01" title="Evidence" />

      <header className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
        <h1 className="t-hero max-w-[10ch]">Work</h1>
        <p className="max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">
          Filter by what I actually did, not by what it was written in. Every
          case study carries dates, a decision log, and a list of what I would
          rebuild.
        </p>
      </header>

      <Suspense fallback={<div className="h-9" />}>
        <WorkFilter />
      </Suspense>

      <section className="pt-28 md:pt-36">
        <SectionMark
          index="02"
          title="The reps"
          aside="2022 — 2023 · University"
        />
        <div className="grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="t-section max-w-[16ch]">Where I learned the craft.</h2>
          <p className="max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">
            Coursework, kept at coursework weight. Knowing the difference between
            a rep and a product is most of the point.
          </p>
        </div>
        <RepsLedger />
      </section>
    </div>
  );
}
