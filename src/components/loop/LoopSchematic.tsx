import { STAGES } from "@/lib/stages";

const STATION_X = [140, 324, 508, 692, 876, 1060];

/**
 * The delivery loop as a technical drawing. Self-draws once on load, then holds.
 * Purely decorative — the same information is in the text beside it.
 */
export function LoopSchematic({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M 140 110 H 1060 A 90 90 0 0 1 1060 290 H 140 A 90 90 0 0 1 140 110 Z"
        stroke="currentColor"
        strokeWidth={1.25}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={{
          animation: "drawIn 3.2s cubic-bezier(0.16,1,0.3,1) 0.35s forwards",
        }}
      />

      {STATION_X.map((x, i) => (
        <g key={STAGES[i].id}>
          <circle
            cx={x}
            cy={110}
            r={5}
            fill="var(--ink)"
            stroke="currentColor"
            strokeWidth={1.25}
            className="reveal"
            style={{ ["--d" as string]: `${900 + i * 220}ms` }}
          />
          <text
            x={x}
            y={84}
            textAnchor="middle"
            fill="currentColor"
            className="reveal"
            style={{
              ["--d" as string]: `${1000 + i * 220}ms`,
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              letterSpacing: "0.16em",
            }}
          >
            {STAGES[i].index}
          </text>
        </g>
      ))}

      <text
        x={600}
        y={330}
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          letterSpacing: "0.22em",
        }}
        className="reveal"
      >
        FEEDBACK CLOSES THE LOOP
      </text>
    </svg>
  );
}
