"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";
import type { Architecture } from "@/lib/types";

// Keeps the interactive architecture explorer out of the server render.
const Graph = dynamic(
  () => import("./ArchitectureGraph").then((m) => m.ArchitectureGraph),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-64 animate-pulse border border-rule bg-surface md:h-[30rem]"
      />
    ),
  },
);

export function ArchitectureGraphLazy({
  architecture,
  locale,
}: {
  architecture: Architecture;
  locale: Locale;
}) {
  return <Graph architecture={architecture} locale={locale} />;
}
