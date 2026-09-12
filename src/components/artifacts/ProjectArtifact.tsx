import { useId } from "react";
import styles from "./project-artifact.module.css";
const STUDIES = {
    arc: {
        title: "Arc", index: "01", theme: "arc", color: "#a7ecd4",
        note: "Prepare. Teach. Learn. Repeat.",
        label: "Arc: three connected learning stages form a continuous feedback loop"
    },
    applytide: {
        title: "Applytide", index: "02", theme: "apply", color: "#ffad91",
        note: "A clearer path through the search.",
        label: "Applytide: scattered application records align into an organized workflow"
    },
    eventa: {
        title: "Eventa", index: "03", theme: "event", color: "#c9b5f5",
        note: "A shared place. A new connection.",
        label: "Eventa: two guest profiles connect within an illustrative event network"
    },
    "license-plate-recognition": {
        title: "License Plate Recognition", index: "04", theme: "recognition", color: "#a7d8ef",
        note: "From a frame to a readable result.",
        label: "License plate recognition: detection, recognition and output shown as three processing planes"
    },
    "trading-system": {
        title: "Trading System", index: "05", theme: "trading", color: "#e8ce9a",
        note: "Permissions. Actions. State.",
        label: "Trading system: connected structures represent permissions, purchases and state"
    }
} as const;
type ArtifactSlug = keyof typeof STUDIES;
type ProjectArtifactProps = {
    slug: string;
    size?: "card" | "hero";
};
type SceneProps = {
    id: string;
};
function Platform({ x, y, width = 230, depth = 110, height = 30, fill = "#203a33" }: {
    x: number;
    y: number;
    width?: number;
    depth?: number;
    height?: number;
    fill?: string;
}) {
    const side = depth * .52;
    return <g transform={`translate(${x} ${y})`}>
    <path d={`M0 0 L${width} 0 L${width + side} ${-depth} L${side} ${-depth} Z`} fill={fill} stroke="currentColor" strokeOpacity=".48"/>
    <path d={`M0 0 V${height} H${width} V0 Z`} fill="#111c1d" stroke="currentColor" strokeOpacity=".28"/>
    <path d={`M${width} 0 L${width + side} ${-depth} V${height - depth} L${width} ${height} Z`} fill="#19292a" stroke="currentColor" strokeOpacity=".32"/>
  </g>;
}
function ArcStudy({ id }: SceneProps) {
    const words = ["Preparation", "Classroom", "Feedback"];
    return <g>
    <ellipse cx="607" cy="490" rx="390" ry="83" fill={`url(#${id}-floor)`}/>
    <path d="M299 442 C175 345 284 222 485 207 C719 187 1029 282 999 393 C988 444 907 475 813 477" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="2"/>
    <path d="M304 443 C179 344 283 222 485 207 C719 187 1029 282 999 393" fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="8" strokeLinecap="round"/>
    <path d="m982 382 15 14 11-19" fill="none" stroke="currentColor" strokeWidth="3"/>
    <Platform x={248} y={426} width={205} depth={104}/>
    <Platform x={471} y={394} width={241} depth={123} height={92} fill="#294e43"/>
    <Platform x={746} y={462} width={185} depth={94}/>
    <g transform="translate(284 225)">
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${i * 8} ${-i * 10})`}>
        <path d="M0 0 133-32 166 102 34 136Z" fill={i === 2 ? "#335c4e" : "#192f28"} stroke="currentColor" strokeOpacity={i === 2 ? ".8" : ".35"}/>
        {i === 2 ? <><path d="m24 20 82-20m-74 44 77-20m-69 44 77-20m-68 44 41-11" stroke="currentColor" strokeOpacity=".7" strokeWidth="3"/><circle cx="130" cy="78" r="14" fill="currentColor"/><path d="m124 78 4 4 8-10" stroke="#163329" strokeWidth="2.5" fill="none"/></> : null}
      </g>)}
    </g>
    <g transform="translate(555 237)">
      <path d="M-26 7 114-24 149 98 9 130Z" fill={`url(#${id}-glass)`} stroke="currentColor" strokeOpacity=".8"/>
      {[0, 1, 2].map((row) => [0, 1, 2].map((col) => <g key={`${row}-${col}`} transform={`translate(${col * 40 + row * 8} ${row * 34 - col * 9})`}><circle r="8" fill="currentColor" opacity={.9 - row * .2}/><path d="M-11 19q11-17 22 0" fill="none" stroke="currentColor" strokeWidth="3" opacity=".65"/></g>))}
    </g>
    <g transform="translate(779 308)">
      <path d="M0 14 100-12 128 77 51 97 30 124 27 104Z" fill="#335c4e" stroke="currentColor" strokeOpacity=".8"/>
      <path d="m29 39 49-13m-43 35 49-13m-43 35 26-7" fill="none" stroke="currentColor" strokeWidth="4"/>
    </g>
    <g className={styles.svgLabel} textAnchor="middle"><text x="379" y="496">01 / {words[0]}</text><text x="626" y="546">02 / {words[1]}</text><text x="856" y="526">03 / {words[2]}</text></g>
  </g>;
}
function ApplyStudy({ id }: SceneProps) {
    const words = ["Capture", "Apply", "Follow through"];
    return <g>
    <ellipse cx="626" cy="508" rx="407" ry="74" fill={`url(#${id}-floor)`}/>
    <path d="M187 345 498 282 978 368M174 395 485 332 966 418M161 445 472 382 953 468" fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="2"/>
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${222 + i * 22} ${285 + i * 56}) rotate(${-18 + i * 7})`}>
      <rect width="127" height="67" rx="8" fill="#382a28" stroke="currentColor" strokeOpacity=".65"/>
      <circle cx="23" cy="25" r="7" fill="currentColor" opacity=".7"/><path d="M43 22h62M43 36h42M18 52h83" stroke="currentColor" strokeWidth="3" strokeOpacity=".4"/>
    </g>)}
    <path d="M412 223 444 209 548 431 516 445Z" fill="#824b3d" stroke="currentColor" strokeOpacity=".8"/>
    <path d="M412 223v170l104 52V275Z" fill={`url(#${id}-glass)`} stroke="currentColor" strokeOpacity=".7"/>
    <path d="M444 209v170l104 52V261Z" fill="none" stroke="currentColor" strokeOpacity=".38"/>
    <path d="m428 278 39 19m-39 10 51 25m-51 4 68 34" stroke="currentColor" strokeWidth="3" strokeOpacity=".65"/>
    <g transform="translate(546 242)">
      <path d="M0 0 309 43 384 209 75 166Z" fill="#251f1f" stroke="currentColor" strokeOpacity=".45"/>
      <path d="M75 166v30l309 43v-30Z" fill="#49302a" stroke="currentColor" strokeOpacity=".25"/>
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${35 + i * 93} ${18 + i * 13})`}>
        <path d="M0 0 70 10 120 122 50 112Z" fill="#392925" stroke="currentColor" strokeOpacity=".25"/>
        {[0, 1].map((j) => <g key={j} transform={`translate(${13 + j * 20} ${24 + j * 46})`}><path d="M0 0 45 6 57 34 12 28Z" fill="#ed9e83" opacity={.85 - i * .18}/><path d="m5 8 27 4m-23 4 19 3" stroke="#3e2720" strokeWidth="2"/></g>)}
      </g>)}
    </g>
    <circle cx="932" cy="316" r="31" fill={`url(#${id}-sphere)`}/><path d="m921 316 8 8 15-18" fill="none" stroke="#35231f" strokeWidth="4"/>
    <g className={styles.svgLabel} textAnchor="middle"><text x="288" y="525">01 / {words[0]}</text><text x="593" y="542">02 / {words[1]}</text><text x="865" y="558">03 / {words[2]}</text></g>
  </g>;
}
function EventStudy({ id }: SceneProps) {
    const points = [[272, 247], [419, 186], [707, 178], [930, 257], [1002, 412], [859, 511], [571, 552], [293, 472], [182, 363]];
    return <g>
    <ellipse cx="602" cy="502" rx="326" ry="74" fill={`url(#${id}-floor)`}/>
    <ellipse cx="593" cy="353" rx="385" ry="190" fill="none" stroke="currentColor" strokeOpacity=".18"/>
    <ellipse cx="593" cy="353" rx="302" ry="147" fill="none" stroke="currentColor" strokeOpacity=".12"/>
    {points.map(([x, y], index) => <g key={index}><path d={`M${x} ${y} 600 353`} stroke="currentColor" strokeOpacity=".13" strokeDasharray="3 8"/><circle cx={x} cy={y} r={index % 3 === 0 ? 14 : 8} fill={index % 3 === 0 ? `url(#${id}-sphere)` : "#493e61"} stroke="currentColor" strokeOpacity=".45"/></g>)}
    <path d="M335 441V304c0-136 221-136 221 0v137" fill="none" stroke="#382d4c" strokeWidth="40"/>
    <path d="M328 438V301c0-136 221-136 221 0v137" fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="23"/>
    <path d="M656 441V304c0-136 221-136 221 0v137" fill="none" stroke="#382d4c" strokeWidth="40"/>
    <path d="M649 438V301c0-136 221-136 221 0v137" fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="23"/>
    <ellipse cx="444" cy="442" rx="125" ry="30" fill="#332b41" stroke="currentColor" strokeOpacity=".4"/>
    <ellipse cx="764" cy="442" rx="125" ry="30" fill="#332b41" stroke="currentColor" strokeOpacity=".4"/>
    <g fill={`url(#${id}-sphere)`}><circle cx="440" cy="319" r="33"/><path d="M386 415v-16a54 54 0 0 1 108 0v16Z"/><circle cx="763" cy="319" r="33"/><path d="M709 415v-16a54 54 0 0 1 108 0v16Z"/></g>
    <path d="M486 339c45-52 188-52 232 0" fill="none" stroke="currentColor" strokeWidth="3"/>
    <g transform="translate(600 301)"><circle r="23" fill="#c9b5f5"/><path d="M-10-1q0-9 10-3q10-6 10 3q0 6-10 12q-10-6-10-12" fill="#45345e"/></g>
    <g className={styles.svgLabel} textAnchor="middle"><text x="601" y="602">{"Illustrative guests / Shared event"}</text></g>
  </g>;
}
function RecognitionStudy({ id }: SceneProps) {
    return <g>
    <ellipse cx="628" cy="509" rx="404" ry="67" fill={`url(#${id}-floor)`}/>
    <path d="M157 346h843" fill="none" stroke="currentColor" strokeOpacity=".2" strokeDasharray="4 9"/>
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${222 + i * 259} ${214 + i * 33})`}>
      <path d="M0 0 199 30 225 258 26 228Z" fill={i === 1 ? `url(#${id}-glass)` : "#18272e"} stroke="currentColor" strokeOpacity={i === 1 ? ".8" : ".4"}/>
      <path d="M26 228v18l199 30v-18Z" fill="#253d48" stroke="currentColor" strokeOpacity=".3"/>
      {i === 0 ? <><path d="m38 58 22 3m-22-3 3 25m119-3-22-3m22 3 3 25m-106 75-22-3m22 3-3-25m122 39-22-3m22 3-3-25" stroke="currentColor" strokeWidth="3" fill="none"/><path d="m63 111 74 10 7 49-74-10Z" fill="#7699a7"/><path d="m69 122 58 8m-56 5 58 8m-56 5 58 8" stroke="#172831" strokeWidth="2"/></> : null}
      {i === 1 ? <><path d="m34 104 140 22 9 66-140-22Z" fill="#a7d8ef"/><text x="51" y="148" transform="rotate(9 51 148)" fill="#163744" fontSize="24" fontFamily="monospace">ABC·123</text><path d="m19 60 171 27m-150 127 171 27" stroke="currentColor" strokeOpacity=".45"/><path d="m40 34 22 203m22-196 22 202m22-195 22 202" stroke="currentColor" strokeOpacity=".14"/></> : null}
      {i === 2 ? <><circle cx="96" cy="96" r="28" fill={`url(#${id}-sphere)`}/><path d="m85 96 9 8 15-17" fill="none" stroke="#1e3843" strokeWidth="4"/><path d="m52 155 109 16m-107-1 84 13m-82 2 62 9" stroke="currentColor" strokeWidth="3" strokeOpacity=".55"/></> : null}
    </g>)}
    <g className={styles.svgLabel} textAnchor="middle"><text x="350" y="511">01 / {"Detect"}</text><text x="609" y="544">02 / {"Recognize"}</text><text x="868" y="577">03 / {"Output"}</text></g>
  </g>;
}
function TradingStudy({ id }: SceneProps) {
    return <g>
    <ellipse cx="623" cy="514" rx="362" ry="62" fill={`url(#${id}-floor)`}/>
    <path d="M326 404 574 465 883 379M422 302 668 363 977 276" stroke="currentColor" strokeOpacity=".25" fill="none" strokeDasharray="4 7"/>
    <Platform x={290} y={452} width={208} depth={111} height={32} fill="#4b4131"/>
    <Platform x={505} y={424} width={219} depth={116} height={94} fill="#5c5039"/>
    <Platform x={754} y={436} width={170} depth={103} height={32} fill="#4b4131"/>
    <g transform="translate(350 238)"><path d="M0 38V17a37 37 0 0 1 74 0v21" fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="15"/><rect x="-13" y="33" width="100" height="92" rx="10" fill={`url(#${id}-glass)`} stroke="currentColor"/><circle cx="37" cy="71" r="9" fill="currentColor"/><path d="M37 75v22" stroke="currentColor" strokeWidth="7"/></g>
    <g transform="translate(584 232)"><path d="M0 0 88-24 131 41 43 65Z" fill="#a28d60" stroke="currentColor"/><path d="M0 0v99l43 65V65Z" fill="#4b4131" stroke="currentColor" strokeOpacity=".5"/><path d="m43 65 88-24v99l-88 24Z" fill={`url(#${id}-glass)`} stroke="currentColor" strokeOpacity=".7"/><path d="m40-11 43 65v27" fill="none" stroke="currentColor" strokeOpacity=".8" strokeWidth="3"/></g>
    <g transform="translate(809 274)"><circle cx="26" cy="19" r="33" fill={`url(#${id}-sphere)`}/><path d="m12 19 10 9 20-21" fill="none" stroke="#403726" strokeWidth="4"/><path d="M-12 87h104M-12 107h71" stroke="currentColor" strokeOpacity=".65" strokeWidth="5"/></g>
    <g className={styles.svgLabel} textAnchor="middle"><text x="416" y="521">{"Permissions"}</text><text x="646" y="564">{"Purchase"}</text><text x="854" y="518">{"State"}</text></g>
  </g>;
}
const SCENES = { arc: ArcStudy, applytide: ApplyStudy, eventa: EventStudy, "license-plate-recognition": RecognitionStudy, "trading-system": TradingStudy };
export function ProjectArtifact({ slug, size = "card" }: ProjectArtifactProps) {
    const uniqueId = useId().replace(/:/g, "");
    if (!(slug in STUDIES))
        return null;
    const study = STUDIES[slug as ArtifactSlug];
    const Scene = SCENES[slug as ArtifactSlug];
    const id = `study-${study.theme}-${uniqueId}`;
    const caption = slug === "license-plate-recognition"
        ? "Computer-vision pipeline"
        : slug === "eventa" ? "Illustrative scenario"
            : "Product illustration";
    return <div className={`${styles.artifact} ${styles[study.theme]}`} data-size={size} role="img" aria-label={`${study.label}. ${caption}.`}>
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.coverCaption}><span>{study.title}</span><span>{study.index} / {caption}</span></div>
      <svg viewBox="0 0 1200 700" className={styles.scene} fill="none" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`${id}-floor`}><stop stopColor={study.color} stopOpacity=".2"/><stop offset="1" stopColor={study.color} stopOpacity="0"/></radialGradient>
          <radialGradient id={`${id}-sphere`} cx=".28" cy=".24" r=".82"><stop stopColor="#f0f8f2"/><stop offset=".32" stopColor={study.color}/><stop offset="1" stopColor={study.color} stopOpacity=".18"/></radialGradient>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={study.color} stopOpacity=".48"/><stop offset=".45" stopColor={study.color} stopOpacity=".1"/><stop offset="1" stopColor={study.color} stopOpacity=".3"/></linearGradient>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2=".8"><stop stopColor={study.color} stopOpacity=".2"/><stop offset=".42" stopColor={study.color}/><stop offset="1" stopColor={study.color} stopOpacity=".4"/></linearGradient>
        </defs>
        <g stroke="currentColor" strokeOpacity=".045"><path d="M100 620 595 105 1115 620M0 620 595 0 1200 620M0 510h1200M0 605h1200"/><path d="M330 700 595 105 885 700M0 434h1200"/></g>
        <Scene id={id}/>
      </svg>
      <div className={styles.studyNote}><span>{study.note}</span><i aria-hidden>↗</i></div>
    </div>
  </div>;
}
export type { ProjectArtifactProps };
