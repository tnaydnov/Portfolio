"use client";
import dynamic from "next/dynamic";
import type { Architecture } from "@/lib/types";
// Keeps the interactive architecture explorer out of the server render.
const Graph = dynamic(() => import("./ArchitectureGraph").then((m) => m.ArchitectureGraph), {
    ssr: false,
    loading: () => (<div aria-hidden className="h-64 animate-pulse border border-rule bg-surface md:h-[30rem]"/>)
});
export function ArchitectureGraphLazy({ architecture }: {
    architecture: Architecture;
}) {
    return <Graph architecture={architecture}/>;
}
