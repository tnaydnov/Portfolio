import { STAGES } from "@/lib/stages";
import { t, type Locale } from "@/lib/i18n";

const STATION_X = [140, 324, 508, 692, 876, 1060];

const LOOP_PATH =
  "M 140 110 H 1060 A 90 90 0 0 1 1060 290 H 140 A 90 90 0 0 1 140 110 Z";

/**
 * The delivery loop as a technical drawing. Self-draws once on load, then a
 * carrier token circles it continuously. Decorative — the same information is
 * in the text beside it.
 */
export function LoopSchematic({
  className = "",
  locale,
  carrier = true,
}: {
  className?: string;
  locale: Locale;
  carrier?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={LOOP_PATH}
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

      {carrier && (
        <g
          className="carrier"
          style={{
            ["--path" as string]: `path("${LOOP_PATH}")`,
            ["--travel" as string]: "26s",
          }}
        >
          <circle r={13} fill="var(--signal)" opacity={0.14} />
          <circle r={4.5} fill="var(--signal)" />
        </g>
      )}

      <text
        x={600}
        y={332}
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          letterSpacing: "0.22em",
        }}
        className="reveal"
      >
        {locale === "he"
          ? "המשוב סוגר את הלולאה"
          : "FEEDBACK CLOSES THE LOOP"}
      </text>
    </svg>
  );
}

/** A scrolling band of the six stage names. Section divider, not navigation. */
export function StageTicker({ locale }: { locale: Locale }) {
  const items = STAGES.map((s) => ({
    index: s.index,
    name: t(s.name, locale),
  }));
  const run = [...items, ...items];

  return (
    <div
      aria-hidden
      className="ticker overflow-hidden border-y border-rule py-3.5"
    >
      <div className="ticker-track" style={{ ["--speed" as string]: "46s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {run.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="label flex items-center whitespace-nowrap px-6"
              >
                <span className="text-signal">{item.index}</span>
                <span className="mx-2.5 opacity-30">/</span>
                {item.name}
                <span aria-hidden className="ms-6 opacity-30">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
