"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import type { Architecture } from "@/lib/types";

const KIND_ACCENT: Record<string, string> = {
  edge: "var(--signal)",
  service: "var(--trace)",
  store: "var(--text-faint)",
  client: "var(--ok)",
};

export function ArchitectureGraph({ architecture }: { architecture: Architecture }) {
  const [selected, setSelected] = useState(architecture.nodes[0].id);

  const nodes: Node[] = useMemo(
    () =>
      architecture.nodes.map((n) => ({
        id: n.id,
        position: { x: n.x * 235, y: n.y * 132 },
        draggable: false,
        connectable: false,
        type: "default",
        style: {
          width: 190,
          padding: 0,
          border: `1px solid ${
            selected === n.id ? "var(--signal)" : "var(--rule-strong)"
          }`,
          borderRadius: 0,
          background: "var(--surface)",
          boxShadow: "none",
        },
        data: {
          label: (
            <div className="px-3 py-2.5 text-left">
              <span
                aria-hidden
                className="mb-2 block h-0.5 w-6"
                style={{ background: KIND_ACCENT[n.kind] }}
              />
              <span className="block text-[0.8rem] font-medium leading-tight text-text">
                {n.label}
              </span>
              {n.sub && (
                <span className="label mt-1.5 block normal-case tracking-normal">
                  {n.sub}
                </span>
              )}
            </div>
          ),
        },
      })),
    [architecture.nodes, selected],
  );

  const edges: Edge[] = useMemo(
    () =>
      architecture.edges.map((e, i) => ({
        id: `e${i}`,
        source: e.from,
        target: e.to,
        label: e.label,
        type: "smoothstep",
        pathOptions: { borderRadius: 0 },
        animated: false,
        style: { stroke: "var(--rule-strong)", strokeWidth: 1 },
        labelStyle: {
          fill: "var(--text-faint)",
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
        },
        labelBgStyle: { fill: "var(--ink)" },
        labelBgPadding: [6, 3] as [number, number],
      })),
    [architecture.edges],
  );

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => setSelected(node.id),
    [],
  );

  const detail = architecture.nodes.find((n) => n.id === selected)!;

  return (
    <figure className="border border-rule bg-surface">
      <div className="h-[26rem] border-b border-rule md:h-[30rem]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={false}
          minZoom={0.4}
          maxZoom={1.4}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={22}
            size={1}
            color="var(--rule)"
          />
        </ReactFlow>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
        <div>
          <p className="label">Selected</p>
          <p className="mt-3 font-display text-xl tracking-tight">
            {detail.label}
          </p>
          {detail.sub && <p className="label mt-2">{detail.sub}</p>}
        </div>
        <p className="max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
          {detail.note}
        </p>
      </div>

      <figcaption className="border-t border-rule px-6 py-4 text-sm text-faint md:px-8">
        {architecture.caption}
      </figcaption>
    </figure>
  );
}
