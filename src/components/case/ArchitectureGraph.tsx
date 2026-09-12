"use client";
import { useMemo, useState } from "react";
import { ui } from "@/lib/ui";
import type { Architecture } from "@/lib/types";
import styles from "./engineering.module.css";
const KIND_ACCENT: Record<string, string> = { edge: "var(--signal)", service: "var(--trace)", store: "var(--text-faint)", client: "var(--ok)" };
export function ArchitectureGraph({ architecture }: {
    architecture: Architecture;
}) {
    const [selected, setSelected] = useState(architecture.nodes[0].id);
    const detail = architecture.nodes.find((node) => node.id === selected)!;
    const nodeById = useMemo(() => Object.fromEntries(architecture.nodes.map((node) => [node.id, node])), [architecture.nodes]);
    const maxX = Math.max(1, ...architecture.nodes.map((node) => node.x));
    const maxY = Math.max(1, ...architecture.nodes.map((node) => node.y));
    const x = (value: number) => 110 + (value / maxX) * 780;
    const y = (value: number) => 65 + (value / maxY) * 350;
    return <figure className={styles.graph}>
    <div aria-hidden className={styles.diagram}>
      <svg viewBox="0 0 1000 480" preserveAspectRatio="none">
        {architecture.edges.map((edge, index) => {
            const from = nodeById[edge.from];
            const to = nodeById[edge.to];
            if (!from || !to)
                return null;
            const startX = x(from.x), startY = y(from.y), endX = x(to.x), endY = y(to.y);
            const middleX = (startX + endX) / 2;
            const active = edge.from === selected || edge.to === selected;
            return <path key={`${edge.from}-${edge.to}-${index}`} d={`M ${startX} ${startY} C ${middleX} ${startY}, ${middleX} ${endY}, ${endX} ${endY}`} fill="none" stroke={active ? "var(--signal)" : "var(--rule-strong)"} strokeWidth={active ? "1.8" : "1.2"} vectorEffect="non-scaling-stroke"/>;
        })}
      </svg>
      {architecture.nodes.map((node) => <div key={node.id} className={styles.node} data-selected={selected === node.id} style={{ left: `${x(node.x) / 10}%`, top: `${y(node.y) / 4.8}%` }}>
        <i style={{ background: KIND_ACCENT[node.kind] }}/><span>{node.label}</span>{node.sub ? <small>{node.sub}</small> : null}
      </div>)}
    </div>
    <div role="group" className={styles.nodeButtons} aria-label={"System components"}>
      {architecture.nodes.map((node) => <button key={node.id} type="button" onClick={() => setSelected(node.id)} aria-pressed={selected === node.id}>
        <span>{node.label}</span>{node.sub ? <small>{node.sub}</small> : null}
      </button>)}
    </div>
    <div aria-live="polite" aria-atomic="true" className={styles.graphDetail}>
      <div><p>{ui.common.selected}</p><h3>{detail.label}</h3>{detail.sub ? <small>{detail.sub}</small> : null}</div>
      <p>{detail.note}</p>
      <div className={styles.nodeConnections}>
        <p>{"Connections"}</p>
        <ul>{architecture.edges.filter((edge) => edge.from === selected || edge.to === selected).map((edge, index) => <li key={`${edge.from}-${edge.to}-${index}`}>
          <span>{nodeById[edge.from]?.label} <span aria-hidden>→</span><span className="sr-only">{"to"}</span> {nodeById[edge.to]?.label}</span>
          {edge.label ? <small>{edge.label}</small> : null}
        </li>)}</ul>
      </div>
    </div>
    <figcaption>{architecture.caption}</figcaption>
  </figure>;
}
