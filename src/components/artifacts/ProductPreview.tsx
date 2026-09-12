import type { Project } from "@/lib/types";
import styles from "./product-preview.module.css";

type PreviewProps = { project: Project; compact?: boolean };
type TextProps = { x: number; y: number; children: React.ReactNode; muted?: boolean; small?: boolean; mono?: boolean };

function Text({ x, y, children, muted = false, small = false, mono = false }: TextProps) {
  return <text x={x} y={y} className={`${styles.text} ${muted ? styles.muted : ""} ${small ? styles.small : ""} ${mono ? styles.mono : ""}`}>{children}</text>;
}

function WindowBar({ title, detail }: { title: string; detail: string }) {
  return <>
    <path d="M0 43H900" className={styles.rule} />
    <circle cx="23" cy="22" r="4" fill="var(--preview-accent)" />
    <Text x={38} y={27}>{title}</Text>
    <Text x={873} y={27} muted small mono><tspan textAnchor="end">{detail}</tspan></Text>
  </>;
}

function ArcPreview() {
  return <>
    <WindowBar title="arc / learning workspace" detail="LESSON BUILDER" />
    <path d="M167 43V330" className={styles.rule} />
    <rect x="15" y="70" width="136" height="34" rx="5" className={styles.active} />
    <Text x={30} y={92}>Content library</Text>
    <Text x={30} y={134} muted>Classrooms</Text>
    <Text x={30} y={176} muted>Review & feedback</Text>
    <Text x={30} y={282} muted small mono>01 / PREPARE</Text>
    <Text x={30} y={307} muted small>Reuse. Teach. Refine.</Text>
    <Text x={194} y={80} muted small mono>LEARNING UNIT / PYTHON</Text>
    <text x="194" y="114" className={styles.heading}>Loops & patterns</text>
    <Text x={194} y={139} muted>Reusable content, ready for the classroom.</Text>
    {[
      { y: 162, n: "01", title: "Start with a question", type: "Discussion" },
      { y: 213, n: "02", title: "Explore a loop", type: "Coding activity" },
      { y: 264, n: "03", title: "Explain the pattern", type: "Reflection" },
    ].map((item) => <g key={item.n}>
      <rect x="193" y={item.y} width="405" height="42" rx="5" className={styles.panel} />
      <Text x={208} y={item.y + 27} muted small mono>{item.n}</Text>
      <Text x={244} y={item.y + 27}>{item.title}</Text>
      <Text x={581} y={item.y + 27} muted small><tspan textAnchor="end">{item.type}</tspan></Text>
    </g>)}
    <rect x="623" y="70" width="251" height="236" rx="7" className={styles.panel} />
    <Text x={641} y={97} muted small mono>STUDENT WORK / REVIEW</Text>
    <circle cx="649" cy="129" r="5" fill="var(--preview-accent)" />
    <Text x={664} y={135}>Revision requested</Text>
    <path d="M641 155H855" className={styles.rule} />
    <Text x={641} y={181}>Please explain</Text>
    <Text x={641} y={206}>the stopping condition.</Text>
    <Text x={641} y={237} muted small>Feedback on a sample submission.</Text>
    <rect x="641" y="257" width="213" height="31" rx="5" className={styles.active} />
    <Text x={660} y={278} small>Review → student revision</Text>
  </>;
}

function CoderPreview() {
  return <>
    <WindowBar title="browser coder" detail="PYTHON / DEBUG SESSION" />
    <path d="M142 43V330M650 43V330" className={styles.rule} />
    <Text x={18} y={76} muted small mono>EXPLORER</Text>
    <rect x="9" y="94" width="124" height="32" rx="4" className={styles.active} />
    <Text x={24} y={116} mono small>loops.py</Text>
    <Text x={24} y={154} muted mono small>notes.md</Text>
    <Text x={167} y={75} mono small>loops.py</Text>
    <rect x="515" y="55" width="112" height="28" rx="5" className={styles.active} />
    <Text x={531} y={75} small>Paused · line 3</Text>
    <path d="M143 93H650" className={styles.rule} />
    <rect x="150" y="176" width="491" height="33" rx="3" className={styles.active} />
    <circle cx="166" cy="192" r="4" fill="var(--preview-accent)" />
    {["1", "2", "3", "4"].map((number, index) => <Text key={number} x={181} y={133 + index * 32} muted mono>{number}</Text>)}
    <Text x={214} y={133} mono><tspan className={styles.codeBlue}>total</tspan>{" = "}<tspan className={styles.codeAmber}>0</tspan></Text>
    <Text x={214} y={165} mono><tspan className={styles.codePurple}>for</tspan>{" value "}<tspan className={styles.codePurple}>in</tspan>{" [2, 4, 6]:"}</Text>
    <Text x={246} y={197} mono>{"total += value"}</Text>
    <Text x={214} y={229} mono><tspan className={styles.codeBlue}>print</tspan>{"(total)"}</Text>
    <path d="M143 250H650" className={styles.rule} />
    <Text x={166} y={278} muted small mono>RECORDED PAUSES</Text>
    <path d="M366 275H608" stroke="#405661" strokeWidth="2" />
    {[366, 442, 518, 608].map((x, index) => <g key={x}><circle cx={x} cy="275" r={index === 1 ? 7 : 4} fill={index === 1 ? "var(--preview-accent)" : "#57707a"} /><Text x={x - 4} y={304} muted small mono>{index + 1}</Text></g>)}
    <Text x={671} y={78} muted small mono>VARIABLES AT THIS PAUSE</Text>
    <path d="M670 97H878" className={styles.rule} />
    <Text x={672} y={128} mono>total</Text><text x="864" y="128" textAnchor="end" className={styles.value}>2</text>
    <Text x={672} y={167} mono>value</Text><text x="864" y="167" textAnchor="end" className={styles.value}>4</text>
    <path d="M670 190H878" className={styles.rule} />
    <Text x={671} y={219} muted small mono>CALL STACK</Text>
    <Text x={671} y={249} mono small>{"<module> · loops.py:3"}</Text>
    <Text x={671} y={296} muted small>Inspect the step. Understand why.</Text>
  </>;
}

function ApplytidePreview() {
  const columns = [
    { x: 25, title: "Saved", jobs: [["Frontend engineer", "Sample Studio", "Captured from the browser"], ["Product engineer", "Example Labs", "Add a tailored CV"]] },
    { x: 319, title: "Applied", jobs: [["Software engineer", "Sample Systems", "CV + cover letter attached"], ["Full-stack engineer", "Demo Works", "Follow-up reminder set"]] },
    { x: 613, title: "Interview", jobs: [["Product engineer", "Example Co.", "Prepare questions"]] },
  ];
  return <>
    <WindowBar title="applytide / application pipeline" detail="YOUR NEXT CHAPTER" />
    {columns.map((column) => <g key={column.title}>
      <circle cx={column.x + 5} cy="76" r="4" fill="var(--preview-accent)" />
      <Text x={column.x + 20} y={82}>{column.title}</Text>
      <Text x={column.x + 263} y={82} muted small mono><tspan textAnchor="end">{column.jobs.length.toString().padStart(2, "0")}</tspan></Text>
      {column.jobs.map((job, index) => <g key={job[0]}>
        <rect x={column.x} y={101 + index * 103} width="267" height="89" rx="7" className={styles.panel} />
        <Text x={column.x + 15} y={127 + index * 103}>{job[0]}</Text>
        <Text x={column.x + 15} y={150 + index * 103} muted small>{job[1]}</Text>
        <Text x={column.x + 15} y={176 + index * 103} muted small>{job[2]}</Text>
      </g>)}
    </g>)}
    <rect x="613" y="204" width="267" height="89" rx="7" className={styles.active} />
    <Text x={629} y={231} small mono>NEXT STEP</Text>
    <Text x={629} y={257}>Everything for the interview,</Text>
    <Text x={629} y={280}>already in one place.</Text>
  </>;
}

function EventaPreview() {
  return <>
    <WindowBar title="eventa / a shared occasion" detail="EVENT-SCOPED CONNECTIONS" />
    <Text x={47} y={97} muted small mono>01 / ARRIVE</Text>
    <text x="47" y="131" className={styles.heading}>You&apos;re in good company.</text>
    <Text x={47} y={162} muted>One QR. Your event. A way to say hello.</Text>
    <rect x="47" y="192" width="81" height="81" rx="8" fill="#ede9e6" />
    <g fill="#253636"><path d="M58 203h23v23H58Zm8 8v7h7v-7ZM94 203h23v23H94Zm8 8v7h7v-7ZM58 239h23v23H58Zm8 8v7h7v-7Z" fillRule="evenodd" /><path d="M94 239h8v8h-8Zm15 0h8v15h-8Zm-15 15h8v8h-8Zm15 4h8v4h-8Z" /></g>
    <Text x={145} y={224}>Meet the people</Text><Text x={145} y={250}>already in your room.</Text>
    <rect x="389" y="63" width="213" height="276" rx="23" fill="#e9ede7" stroke="#81978f" />
    <rect x="465" y="75" width="59" height="5" rx="3" fill="#b3c3bb" />
    <circle cx="495" cy="126" r="26" fill="#cadccf" />
    <text x="495" y="136" textAnchor="middle" fill="#305a47" fontSize="26" fontFamily="var(--font-heading), sans-serif">A</text>
    <text x="495" y="176" textAnchor="middle" fill="#244436" fontSize="21" fontFamily="var(--font-heading), sans-serif">Alex</text>
    <text x="495" y="198" textAnchor="middle" fill="#5a7567" fontSize="13">Fictional guest profile</text>
    <rect x="410" y="216" width="171" height="30" rx="15" fill="#d8e1d8" />
    <text x="495" y="236" textAnchor="middle" fill="#4e6659" fontSize="13">Live music · Good food</text>
    <rect x="410" y="267" width="171" height="37" rx="7" fill="#44694f" />
    <text x="495" y="291" textAnchor="middle" fill="#f3f7ee" fontSize="14">Say hello</text>
    <Text x={635} y={99} muted small mono>02 / CONNECT</Text>
    <rect x="635" y="120" width="235" height="67" rx="10" className={styles.panel} />
    <Text x={651} y={147}>A shared interest</Text><Text x={651} y={172} muted small>makes the first hello easier.</Text>
    <path d="M671 207h174" className={styles.rule} />
    <rect x="665" y="225" width="205" height="58" rx="10" className={styles.active} />
    <Text x={680} y={249} small>See you by the coffee?</Text><Text x={680} y={271} muted small>Private, within this event.</Text>
  </>;
}

function EngineeringPreview({ project }: { project: Project }) {
  const isLpr = project.slug === "license-plate-recognition";
  const isTrading = project.slug === "trading-system";
  const nodes = isLpr ? ["VIDEO INPUT", "PLATE DETECTION", "CHARACTER ANALYSIS"] : isTrading ? ["USER & PERMISSIONS", "PURCHASE WORKFLOW", "CONSISTENT STATE"] : ["INPUT", "SYSTEM LOGIC", "OUTPUT"];
  return <>
    <WindowBar title={project.title} detail="ENGINEERING STUDY" />
    <path d="M146 176H755" stroke="#4f7074" strokeWidth="2" strokeDasharray="5 8" />
    {nodes.map((node, index) => <g key={node}>
      <rect x={31 + index * 299} y="105" width="240" height="140" rx="8" className={styles.panel} />
      <Text x={49 + index * 299} y={131} muted small mono>{`0${index + 1}`}</Text>
      {isLpr && index === 0 ? <g><path d="M84 178h128l-17-24h-89Z" stroke="var(--preview-accent)" fill="#183f42" /><rect x="83" y="178" width="130" height="31" rx="5" fill="#294b50" /><rect x="123" y="189" width="48" height="12" rx="2" fill="#b1c9c6" /></g> : <g><rect x={91 + index * 299} y="151" width="118" height="49" rx="5" fill="#21474b" stroke="#4f8c83" /><path d={`M${110 + index * 299} 168h80M${110 + index * 299} 183h51`} stroke="var(--preview-accent)" strokeWidth="3" strokeLinecap="round" /></g>}
      <Text x={151 + index * 299} y={226} small mono><tspan textAnchor="middle">{node}</tspan></Text>
    </g>)}
    <Text x={451} y={293} muted><tspan textAnchor="middle">{isLpr ? "From a changing frame to a readable result." : isTrading ? "Model the rules. Connect the pieces. Test the boundaries." : "A closer look at the decisions inside the system."}</tspan></Text>
  </>;
}

function MobilePreview({ project }: { project: Project }) {
  return <>
    <path d="M0 38H380" className={styles.rule} />
    <circle cx="17" cy="20" r="3" fill="var(--preview-accent)" />
    <Text x={29} y={25}>{project.title}</Text>
    <text x="361" y="25" textAnchor="end" className={styles.mobileLabel}>{project.slug === "browser-coder" ? "PYTHON" : "WORKSPACE"}</text>
    {project.slug === "arc" ? <>
      <rect x="17" y="54" width="346" height="80" rx="6" className={styles.panel} />
      <text x="33" y="78" className={styles.mobileLabel}>LESSON ACTIVITY</text>
      <text x="33" y="106" className={styles.heading}>Loops & patterns</text>
      <path d="m329 81 8 8-8 8m-13-8h20" stroke="var(--preview-accent)" strokeWidth="1.5" />
      <rect x="17" y="150" width="346" height="85" rx="6" className={styles.active} />
      <text x="33" y="173" className={styles.mobileLabel}>STUDENT WORK / REVISION REQUESTED</text>
      <Text x={33} y={202}>Explain the stopping condition.</Text>
      <text x="33" y="222" className={styles.mobileNote}>Feedback on a sample submission.</text>
    </> : project.slug === "browser-coder" ? <>
      <text x="18" y="64" className={styles.mobileLabel}>LOOPS.PY / PAUSED AT LINE 3</text>
      <rect x="10" y="127" width="360" height="31" rx="3" className={styles.active} />
      {["1", "2", "3", "4"].map((number, index) => <Text key={number} x={20} y={90 + index * 29} muted mono>{number}</Text>)}
      <Text x={48} y={90} mono>total = 0</Text>
      <Text x={48} y={119} mono><tspan className={styles.codePurple}>for</tspan>{" value "}<tspan className={styles.codePurple}>in</tspan>{" [2, 4, 6]:"}</Text>
      <Text x={73} y={148} mono>total += value</Text>
      <Text x={48} y={177} mono><tspan className={styles.codeBlue}>print</tspan>{"(total)"}</Text>
      <rect x="17" y="197" width="346" height="39" rx="5" className={styles.panel} />
      <Text x={33} y={223} mono>total <tspan className={styles.codeBlue}>2</tspan></Text>
      <Text x={209} y={223} mono>value <tspan className={styles.codeBlue}>4</tspan></Text>
    </> : project.slug === "applytide" ? <>
      <Text x={18} y={69}>Applied</Text><Text x={201} y={69}>Interview</Text>
      <path d="M170 64h19m-5-5 5 5-5 5" stroke="var(--preview-accent)" />
      <rect x="17" y="84" width="162" height="120" rx="7" className={styles.panel} />
      <Text x={31} y={111}>Software engineer</Text>
      <text x="31" y="138" className={styles.mobileNote}>Sample Systems</text>
      <text x="31" y="172" className={styles.mobileLabel}>CV ATTACHED</text>
      <rect x="201" y="84" width="162" height="120" rx="7" className={styles.active} />
      <Text x={215} y={111}>Product engineer</Text>
      <text x="215" y="138" className={styles.mobileNote}>Example Co.</text>
      <text x="215" y="172" className={styles.mobileLabel}>PREPARE QUESTIONS</text>
      <text x="18" y="234" className={styles.mobileNote}>Documents and next steps stay together.</text>
    </> : project.slug === "eventa" ? <>
      <text x="18" y="92" className={styles.heading}>Your people,</text>
      <text x="18" y="121" className={styles.heading}>in this room.</text>
      <Text x={18} y={155} muted>A shared occasion.</Text>
      <Text x={18} y={179} muted>A way to say hello.</Text>
      <rect x="205" y="54" width="157" height="195" rx="16" fill="#e9ede7" stroke="#91a89c" />
      <circle cx="284" cy="97" r="22" fill="#cadccf" />
      <text x="284" y="105" textAnchor="middle" fill="#305a47" fontSize="23">A</text>
      <text x="284" y="143" textAnchor="middle" fill="#244436" fontSize="20">Alex</text>
      <text x="284" y="165" textAnchor="middle" fill="#5a7567" fontSize="11">Fictional guest</text>
      <rect x="218" y="190" width="131" height="34" rx="6" fill="#44694f" />
      <text x="284" y="212" textAnchor="middle" fill="#f3f7ee" fontSize="14">Say hello</text>
    </> : <>
      <text x="18" y="77" className={styles.mobileLabel}>A CONNECTED SYSTEM</text>
      <path d="M45 137H335" stroke="#4f7074" strokeWidth="2" strokeDasharray="4 5" />
      {(project.slug === "license-plate-recognition" ? ["Motion", "Detect", "Read"] : ["Input", "Process", "Result"]).map((label, index) => <g key={label}>
        <rect x={17 + index * 126} y="103" width="95" height="71" rx="6" className={styles.panel} />
        <text x={64 + index * 126} y="145" textAnchor="middle" className={styles.text}>{label}</text>
      </g>)}
      <text x="18" y="218" className={styles.mobileNote}>Each stage has a clear responsibility.</text>
    </>}
  </>;
}

/** A representative interface, built from code with fictional fixtures. */
export function ProductPreview({ project, compact = false }: PreviewProps) {
  return <figure className={`${styles.preview} ${compact ? styles.compact : ""}`} data-product={project.slug} aria-label={`${project.title}: illustrative ${project.tier === "system" && project.slug !== "browser-coder" ? "system diagram" : "interface"}`}>
    <div className={styles.canvas} aria-hidden="true">
      <svg viewBox="0 0 900 330" width="900" height="330" fill="none" focusable="false">
        {project.slug === "arc" ? <ArcPreview /> : project.slug === "browser-coder" ? <CoderPreview /> : project.slug === "applytide" ? <ApplytidePreview /> : project.slug === "eventa" ? <EventaPreview /> : <EngineeringPreview project={project} />}
      </svg>
    </div>
    <div className={styles.mobileCanvas} aria-hidden="true"><svg viewBox="0 0 380 252" width="380" height="252" fill="none" focusable="false"><MobilePreview project={project} /></svg></div>
    <figcaption><span>Illustrative {project.tier === "system" && project.slug !== "browser-coder" ? "system view" : "UI"}</span><span>Fictional data</span></figcaption>
  </figure>;
}
