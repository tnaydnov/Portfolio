"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { arcExplorerHref } from "@/content/arc-explorer/types";
import {
  demoInstructor,
  demoLearners,
  demoProgram,
  demoStudent,
} from "@/content/arc-explorer/demo-data";
import {
  studentTaskTypes,
  type StudentTaskType,
} from "@/content/arc-explorer/student";
import styles from "./student-portal.module.css";

const href = (page: string) => arcExplorerHref("student", page);
const learner = demoLearners[0];
const groups = [
  "All activities",
  "Create & express",
  "Think & reflect",
  "Code & solve",
  "Learn together",
  "Connected tools",
];
const lessons = [
  {
    number: "01",
    title: "Start with a question",
    caption: "Observe · describe · reflect",
    status: "Completed",
    tasks: ["text", "questionnaire", "image_vision_board"],
  },
  {
    number: "02",
    title: "Decisions & loops",
    caption: "A helpful study planner · revision submitted",
    status: "In progress",
    tasks: ["flowchart", "programming", "text"],
  },
  {
    number: "03",
    title: "Build it together",
    caption: "Connect · create · share",
    status: "Available",
    tasks: ["canvas", "matching", "session_finale"],
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

function WorldArt() {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className={styles.worldArt}
      viewBox="0 0 1120 400"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-planet`} cx="30%" cy="20%">
          <stop stopColor="#c9f2ff" />
          <stop offset=".42" stopColor="#74a8e9" />
          <stop offset=".78" stopColor="#375589" />
          <stop offset="1" stopColor="#1c2b53" />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#8ad5ef" stopOpacity=".35" />
          <stop offset="1" stopColor="#8ad5ef" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-forest`} x2="0" y2="1">
          <stop stopColor="#466c4d" />
          <stop offset="1" stopColor="#142f29" />
        </linearGradient>
        <linearGradient id={`${id}-river`} x2="1" y2="1">
          <stop stopColor="#d5d6a0" stopOpacity=".9" />
          <stop offset="1" stopColor="#579585" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <g className={styles.spaceArt}>
        {Array.from({ length: 48 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 173 + 23) % 1120}
            cy={(i * 79 + 13) % 390}
            r={i % 5 === 0 ? 1.8 : 0.85}
            fill="currentColor"
            opacity={0.15 + (i % 4) * 0.1}
          />
        ))}
        <ellipse
          cx="560"
          cy="205"
          rx="500"
          ry="128"
          transform="rotate(-12 560 205)"
          stroke="currentColor"
          opacity=".13"
        />
        <ellipse
          cx="560"
          cy="205"
          rx="382"
          ry="190"
          transform="rotate(15 560 205)"
          stroke="currentColor"
          opacity=".09"
          strokeDasharray="4 10"
        />
        <circle cx="980" cy="292" r="212" fill={`url(#${id}-glow)`} />
        <circle cx="991" cy="292" r="94" fill={`url(#${id}-planet)`} />
        <ellipse
          cx="991"
          cy="292"
          rx="146"
          ry="23"
          transform="rotate(-27 991 292)"
          stroke="#becfdd"
          strokeWidth="11"
          opacity=".45"
        />
        <circle cx="150" cy="133" r="28" fill="#bc9cc9" />
        <path
          d="M130 117c23 7 35 25 35 37"
          stroke="#f0d8ed"
          strokeWidth="8"
          opacity=".28"
        />
        <circle cx="855" cy="75" r="9" fill="#c9dfed" />
        <circle cx="297" cy="337" r="8" fill="#9dc9bd" />
        <path
          d="m742 125 18-7-6 15-5-3-7-5Zm8 4-3 13"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity=".55"
        />
      </g>
      <g className={styles.forestArt}>
        <path
          d="M0 370Q170 237 367 330T770 286T1120 300V400H0Z"
          fill="#52765a"
          opacity=".7"
        />
        <path
          d="M0 395Q250 282 440 367T825 315T1120 340V400H0Z"
          fill="#183e31"
        />
        <path
          d="M595 245c-76 77 104 39 1 100-49 28-20 44 52 55h125c-170-49-192-45-126-84 47-27-55-31-52-71Z"
          fill={`url(#${id}-river)`}
        />
        {[65, 175, 980, 1070].map((x, i) => (
          <g key={x} transform={`translate(${x} ${i % 2 ? -38 : 0})`}>
            <path d="M0 0 12 400H-12L-8 0Z" fill="#172f29" />
            <path
              d="m0 135-59-55m64 111 62-61M1 70 44 28"
              stroke="#203e2e"
              strokeWidth="10"
            />
            <ellipse cy="14" rx="97" ry="107" fill={`url(#${id}-forest)`} />
            <ellipse cx="-45" cy="57" rx="60" ry="65" fill="#315b3c" />
            <ellipse cx="45" cy="28" rx="61" ry="70" fill="#426d49" />
          </g>
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={240 + ((i * 53) % 620)}
            cy={50 + ((i * 37) % 280)}
            r={1.5}
            fill="#e9dda0"
            opacity=".55"
          />
        ))}
      </g>
      <g className={styles.neonArt} stroke="currentColor" opacity=".3">
        <path d="M0 82h153l35 35h102M0 305h212l30-30h82M1120 125H970l-32 32h-87M1120 345H942l-59-59h-68" />
        {[
          { x: 290, y: 117 },
          { x: 324, y: 275 },
          { x: 851, y: 157 },
          { x: 815, y: 286 },
        ].map(({ x, y }) => (
          <g key={x}>
            <circle cx={x} cy={y} r="6" />
            <circle cx={x} cy={y} r="2" fill="currentColor" />
          </g>
        ))}
        <path
          d="M865 215h115v56H865zM883 235l9 8-9 8m21 0h18"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

function TaskMark({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    text: (
      <>
        <path d="M13 14h23M13 23h30M13 32h21M13 41h16" />
        <path d="m33 42 10-13 5 4-10 13-6 2Z" />
      </>
    ),
    table: (
      <>
        <rect x="9" y="11" width="42" height="38" rx="3" />
        <path d="M9 23h42M9 36h42M24 11v38M39 11v38" />
      </>
    ),
    canvas: (
      <>
        <path d="M15 12h34v35H11V16" />
        <path d="m11 43 12-21 12 15 7-9 7 15M10 11l8 5-3 7-7-4Z" />
      </>
    ),
    vision_board: (
      <>
        <rect x="5" y="18" width="15" height="27" rx="2" />
        <rect x="23" y="10" width="15" height="35" rx="2" />
        <rect x="41" y="22" width="14" height="23" rx="2" />
      </>
    ),
    questionnaire: (
      <>
        <path d="M26 13h24M26 30h24M26 47h24" />
        <circle cx="13" cy="13" r="5" />
        <circle cx="13" cy="30" r="5" />
        <path d="m8 46 4 4 7-9" />
      </>
    ),
    image_vision_board: (
      <>
        <rect
          x="8"
          y="12"
          width="23"
          height="32"
          rx="3"
          transform="rotate(-10 8 12)"
        />
        <rect
          x="29"
          y="13"
          width="24"
          height="33"
          rx="3"
          transform="rotate(9 29 13)"
        />
        <path d="m32 37 6-10 9 14M14 22l3 6 7-9" />
      </>
    ),
    file: (
      <>
        <path d="M15 6h21l11 12v35H15Z M36 6v14h11M23 34h16M23 42h10" />
      </>
    ),
    programming: (
      <>
        <rect x="6" y="10" width="48" height="38" rx="4" />
        <path d="m22 24-8 6 8 6m16-12 8 6-8 6m-6-15-5 21M10 17h40" />
      </>
    ),
    external: (
      <>
        <path d="M31 10h19v19M49 11 24 36M23 14H11v36h36V38" />
      </>
    ),
    arc_game: (
      <>
        <path d="M17 22h26l9 23c1 6-4 8-9 3l-8-8H25l-8 8c-5 5-10 3-9-3Z M18 27v10m-5-5h10" />
        <circle cx="40" cy="29" r="2" />
        <circle cx="46" cy="35" r="2" />
      </>
    ),
    recording: (
      <>
        <rect x="23" y="6" width="14" height="31" rx="7" />
        <path d="M16 27a14 14 0 0 0 28 0M30 41v11M21 52h18" />
      </>
    ),
    escape_room: (
      <>
        <path d="M13 51V9h31v42M9 51h42" />
        <circle cx="35" cy="31" r="2" />
        <path d="M23 15v9m-3-5h6" />
      </>
    ),
    live_cloud: (
      <>
        <path d="M15 43h29a9 9 0 0 0 1-18 15 15 0 0 0-29-3 10 10 0 0 0-1 21Z" />
        <path d="M20 30h13M18 36h24" />
      </>
    ),
    sorting_ranking: (
      <>
        <path d="M11 13h14M11 29h25M11 45h36M46 11v22m-5-5 5 5 5-5" />
      </>
    ),
    matching: (
      <>
        <circle cx="12" cy="14" r="5" />
        <circle cx="12" cy="44" r="5" />
        <circle cx="48" cy="14" r="5" />
        <circle cx="48" cy="44" r="5" />
        <path d="m17 14 26 30M17 44l26-30" />
      </>
    ),
    class_heatmap: (
      <>
        <rect x="8" y="9" width="44" height="43" rx="3" />
        <circle cx="26" cy="30" r="13" />
        <circle cx="26" cy="30" r="7" />
        <path d="M40 12v14m-7-7h14" />
      </>
    ),
    quiz_battle: (
      <>
        <path d="m33 4-20 29h16l-3 23 22-32H33Z" />
      </>
    ),
    branching_scenario: (
      <>
        <path d="M30 8v18m0 0L12 39m18-13 18 13M12 39v12m36-12v12" />
        <circle cx="30" cy="8" r="4" />
        <circle cx="12" cy="51" r="4" />
        <circle cx="48" cy="51" r="4" />
      </>
    ),
    flowchart: (
      <>
        <rect x="20" y="5" width="20" height="11" rx="5" />
        <path d="M30 16v8m0 16v8M16 32H8v17" />
        <path d="m30 23 15 9-15 9-15-9Z" />
        <rect x="21" y="48" width="18" height="9" rx="2" />
      </>
    ),
    session_finale: (
      <>
        <path d="m30 5 7 5 9 1 2 10 7 8-7 8-2 10-9 1-7 7-7-7-9-1-2-10-7-8 7-8 2-10 9-1Z" />
        <path d="m20 29 7 7 14-15" />
      </>
    ),
    debate: (
      <>
        <path d="M6 12h29v20H18l-9 7v-7H6Zm22 27h13l9 8v-8h4V20H42" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind] ?? paths.text}
    </svg>
  );
}

function LessonRows() {
  return (
    <div className={styles.lessonRows}>
      {lessons.map((lesson) => (
        <div className={styles.lessonRow} key={lesson.number}>
          <span className={styles.lessonNumber}>{lesson.number}</span>
          <div>
            <Tag>{lesson.status}</Tag>
            <h3>{lesson.title}</h3>
            <p>{lesson.caption}</p>
          </div>
          <div className={styles.lessonLinks}>
            {lesson.tasks.map((id) => (
              <Link key={id} href={href(`tasks/${id}`)}>
                {studentTaskTypes.find((task) => task.id === id)!.title}
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Overview() {
  return (
    <>
      <div className={styles.world}>
        <WorldArt />
        <div className={styles.worldContent}>
          <SectionLabel>
            {demoProgram.name} / {demoStudent.classroom}
          </SectionLabel>
          <div
            className={styles.progressOrb}
            style={
              { "--progress": `${learner.progress}%` } as React.CSSProperties
            }
          >
            <span>
              <strong>
                {learner.progress}
                <small>%</small>
              </strong>
              <em>Example progress</em>
            </span>
          </div>
          <h2>Hey, {demoStudent.name.split(" ")[0]}.</h2>
          <p>Your next idea is waiting.</p>
          <div className={styles.worldFacts}>
            <span>
              <b>{learner.submitted}</b> submitted tasks
            </span>
            <i />
            <span>
              <b>{learner.reviewed}</b> reviewed
            </span>
            <i />
            <span>{demoInstructor.name}’s classroom</span>
          </div>
        </div>
      </div>
      <div className={styles.quickLinks}>
        <Link href={href("feedback")}>
          <span className={styles.quickIcon}>↗</span>
          <span>
            <strong>A next step, from your teacher</strong>
            <small>Read the feedback and follow the revision.</small>
          </span>
          <Arrow />
        </Link>
        <Link href={href("vision-board")}>
          <span className={styles.quickIcon}>✳</span>
          <span>
            <strong>A board that feels like you</strong>
            <small>Explore images, ideas and personal touches.</small>
          </span>
          <Arrow />
        </Link>
      </div>
      <div className={styles.sectionHeading}>
        <div>
          <SectionLabel>THE LEARNING PATH</SectionLabel>
          <h2>One idea leads to another.</h2>
        </div>
        <Link href={href("tasks")}>
          All 21 activities <Arrow />
        </Link>
      </div>
      <LessonRows />
    </>
  );
}

function ActivityLibrary() {
  const [group, setGroup] = useState("All activities");
  const [query, setQuery] = useState("");
  const filtered = studentTaskTypes.filter(
    (task) =>
      (group === "All activities" || task.group === group) &&
      `${task.title} ${task.summary} ${task.participation}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className={styles.libraryIntro}>
        <div className={styles.bigNumber}>
          21<small>activity kinds</small>
        </div>
        <p>
          Writing is one way in.
          <br />
          There are twenty others.
        </p>
        <label className={styles.searchLabel}>
          <span>Find an activity</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try flowchart, team, reflection…"
            type="search"
          />
        </label>
      </div>
      <div className={styles.filters} aria-label="Activity categories">
        {groups.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={group === item}
            onClick={() => setGroup(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className={styles.resultCount} role="status">
        {filtered.length} {filtered.length === 1 ? "activity" : "activities"}
      </p>
      <div className={styles.activityGrid}>
        {filtered.map((task) => (
          <Link
            key={task.id}
            href={href(`tasks/${task.id}`)}
            className={styles.activityCard}
          >
            <span className={styles.activityMark}>
              <TaskMark kind={task.id} />
            </span>
            <div>
              <small>{task.participation}</small>
              <h3>{task.title}</h3>
              <p>{task.summary}</p>
            </div>
            <Arrow />
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className={styles.empty}>
          No activities match. Try a different word or category.
        </p>
      )}
    </>
  );
}

const studyPlannerCode = `def study_plan(minutes):\n    if minutes <= 0:\n        return "Start with a small goal."\n\n    sessions = []\n    while minutes > 0:\n        block = min(minutes, 25)\n        sessions.append(block)\n        minutes -= block\n\n    return sessions\n\nprint(study_plan(60))`;
const firstPlannerCode = `def study_plan(minutes):\n    sessions = []\n    while minutes > 0:\n        sessions.append(25)\n        minutes -= 25\n\n    return sessions\n\nprint(study_plan(60))`;

function CodeExample({ sandbox = false }: { sandbox?: boolean }) {
  const [format, setFormat] = useState(sandbox ? "Workspace" : "Read code");
  const [file, setFile] = useState("study_planner.py");
  const tabs = sandbox
    ? ["Workspace", "Lesson materials"]
    : ["Read code", "Fill the blanks", "Free code"];
  return (
    <div className={styles.codeStudio}>
      <div
        className={styles.exampleTabs}
        aria-label={sandbox ? "Workspace views" : "Programming formats"}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={format === tab}
            onClick={() => setFormat(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.editorHeader}>
        <span>
          <i />{" "}
          {sandbox
            ? "Personal lesson workspace"
            : format === "Fill the blanks"
              ? "A completed example"
              : "Python · Example program"}
        </span>
        <Tag>Read-only</Tag>
      </div>
      <div className={styles.editorColumns}>
        {sandbox && (
          <div className={styles.fileTree}>
            <SectionLabel>LESSON FILES</SectionLabel>
            {["study_planner.py", "notes.md", "examples.csv"].map((name) => (
              <button
                type="button"
                key={name}
                aria-pressed={file === name}
                onClick={() => setFile(name)}
              >
                <span aria-hidden="true">
                  {name.endsWith(".py") ? "⌘" : "≡"}
                </span>
                {name}
              </button>
            ))}
            <small>
              Personal files stay separate from the lesson originals.
            </small>
          </div>
        )}
        <div className={styles.codeArea}>
          {format === "Lesson materials" ? (
            <div className={styles.lessonNote}>
              <h3>Make a plan that fits.</h3>
              <p>
                You have 60 minutes. Study in blocks no longer than 25 minutes.
                Make the final block fit the time left, and explain how you
                handle a non-positive input.
              </p>
              <p>
                The lesson’s originals can be restored without removing personal
                files.
              </p>
            </div>
          ) : (
            <pre aria-label="Example source code">
              <code>
                {sandbox && file === "notes.md"
                  ? "# Decisions & loops\n\nUse the smaller of 25 and the minutes left.\nCheck zero and negative inputs first.\n\n60 minutes becomes [25, 25, 10]."
                  : sandbox && file === "examples.csv"
                    ? "minutes,expected\n0,Start with a small goal.\n25,[25]\n60,[25; 25; 10]"
                    : format === "Fill the blanks"
                      ? '# Filled example\nif minutes <= 0:\n    return "Start with a small goal."\n\nblock = min(minutes, 25)\n\n# The missing pieces were:\n# 1. <=   2. return   3. min'
                      : studyPlannerCode}
              </code>
            </pre>
          )}
        </div>
      </div>
      {format === "Read code" ? (
        <div className={styles.codeExplanation}>
          <SectionLabel>READING THE PROGRAM</SectionLabel>
          <strong>Why use the smaller value for each block?</strong>
          <p>
            The final block uses only the time left. A 60-minute plan becomes
            25, 25 and 10 minutes.
          </p>
        </div>
      ) : (
        <div className={styles.output}>
          <SectionLabel>EXAMPLE OUTPUT</SectionLabel>
          <code>[25, 25, 10]</code>
          <span>A prepared example, not an execution.</span>
        </div>
      )}
    </div>
  );
}

function FlowExample() {
  const [selected, setSelected] = useState("Check the reading");
  const nodes = [
    { id: "Read sensor", x: 270, y: 24, w: 200, h: 48 },
    { id: "Check the reading", x: 260, y: 120, w: 220, h: 74 },
    { id: "Explain the missing value", x: 30, y: 262, w: 255, h: 60 },
    { id: "Use the reading", x: 430, y: 262, w: 240, h: 60 },
  ];
  return (
    <div className={styles.flowWorkspace}>
      <div className={styles.editorHeader}>
        <span>Temperature checker / process map</span>
        <Tag>4 nodes · 3 connections</Tag>
      </div>
      <div className={styles.flowCanvas}>
        <svg
          className={styles.flowDesktop}
          viewBox="0 0 730 356"
          role="img"
          aria-label="A process reads a sensor, checks whether its value is missing, then explains the missing value or uses the reading."
        >
          <defs>
            <marker
              id="student-flow-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 10 5 0 10Z" fill="currentColor" />
            </marker>
          </defs>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            markerEnd="url(#student-flow-arrow)"
          >
            <path d="M370 72v47" />
            <path d="M282 157H159v104" />
            <path d="M458 157h92v104" />
          </g>
          <text x="204" y="145">
            Missing
          </text>
          <text x="477" y="145">
            Has a value
          </text>
          {nodes.map((node) => (
            <g
              key={node.id}
              className={selected === node.id ? styles.activeNode : undefined}
            >
              {node.id === "Check the reading" ? (
                <path d="m370 110 115 47-115 47-115-47Z" />
              ) : (
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={node.id === "Read sensor" ? 24 : 7}
                />
              )}
              <text
                x={node.x + node.w / 2}
                y={node.y + node.h / 2 + 5}
                textAnchor="middle"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
        <svg
          className={styles.flowMobile}
          viewBox="0 0 290 350"
          role="img"
          aria-label="Read a sensor, check for a missing reading, then explain the missing value or use the reading."
        >
          <path
            d="M145 65v33M62 138H65v104m163-104h-3v104"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m141 90 4 7 4-7m-88 143 4 7 4-7m152-7 4 7 4-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <g
            className={
              selected === "Read sensor" ? styles.activeNode : undefined
            }
          >
            <rect x="65" y="20" width="160" height="44" rx="22" />
            <text x="145" y="47" textAnchor="middle">
              Read sensor
            </text>
          </g>
          <g
            className={
              selected === "Check the reading" ? styles.activeNode : undefined
            }
          >
            <path d="m145 98 87 40-87 40-87-40Z" />
            <text x="145" y="135" textAnchor="middle">
              <tspan x="145">Check the</tspan>
              <tspan x="145" dy="17">
                reading
              </tspan>
            </text>
          </g>
          <text x="65" y="213" textAnchor="middle">
            Missing
          </text>
          <text x="225" y="213" textAnchor="middle">
            Has a value
          </text>
          <g
            className={
              selected === "Explain the missing value"
                ? styles.activeNode
                : undefined
            }
          >
            <rect x="5" y="246" width="123" height="75" rx="7" />
            <text x="66.5" y="275" textAnchor="middle">
              <tspan x="66.5">Explain the</tspan>
              <tspan x="66.5" dy="18">
                missing value
              </tspan>
            </text>
          </g>
          <g
            className={
              selected === "Use the reading" ? styles.activeNode : undefined
            }
          >
            <rect x="162" y="246" width="123" height="75" rx="7" />
            <text x="223.5" y="275" textAnchor="middle">
              <tspan x="223.5">Use the</tspan>
              <tspan x="223.5" dy="18">
                reading
              </tspan>
            </text>
          </g>
        </svg>
      </div>
      <div className={styles.nodeInspector}>
        <SectionLabel>INSPECT A NODE</SectionLabel>
        <div className={styles.filters}>
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              aria-pressed={selected === node.id}
              onClick={() => setSelected(node.id)}
            >
              {node.id}
            </button>
          ))}
        </div>
        <p>
          {selected === "Check the reading"
            ? "A decision creates two paths. The connection labels make the condition visible."
            : selected === "Read sensor"
              ? "A clear starting point gives the rest of the process context."
              : selected === "Use the reading"
                ? "The program can safely continue after the missing-value check."
                : "A helpful explanation makes an exceptional case understandable."}
        </p>
      </div>
    </div>
  );
}

function IdeaArt({ variant = 0 }: { variant?: number }) {
  return (
    <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
      <circle cx="110" cy="90" r="64" fill="currentColor" opacity=".08" />
      {variant % 4 === 0 ? (
        <>
          <path
            d="M76 102a42 42 0 1 1 68 0l-13 17H90Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M94 132h34m-30 10h26m-16-23V94l-14-15m14 15 17-16M64 36l-8-8m101 8 8-8M51 75H40m130 0h11"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : variant % 4 === 1 ? (
        <>
          <path
            d="M45 127 89 46l36 62 20-33 40 52Z"
            fill="currentColor"
            opacity=".13"
          />
          <path
            d="m45 127 44-81 36 62 20-33 40 52M76 70l13 9 11-11"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle
            cx="151"
            cy="40"
            r="13"
            stroke="currentColor"
            strokeWidth="3"
          />
        </>
      ) : variant % 4 === 2 ? (
        <>
          <circle
            cx="79"
            cy="65"
            r="17"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle
            cx="139"
            cy="65"
            r="17"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M45 133v-16a34 34 0 0 1 68 0v16m-12-29a33 33 0 0 1 72 13v16M80 103l30 21 30-21"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M111 146V91m0 27c-42 2-61-21-55-52 37 0 55 17 55 52Zm0-20c-2-43 18-67 53-67 1 35-14 61-53 67Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m69 81 33 28m49-64-29 36"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

function VisionExample({ canvas = false }: { canvas?: boolean }) {
  const [view, setView] = useState(canvas ? "Where I started" : "My board");
  const tabs = canvas
    ? ["Where I started", "What I’m learning", "What comes next"]
    : ["My board", "Class gallery"];
  return (
    <div className={styles.boardWorkspace}>
      <div className={styles.exampleTabs} aria-label="Board views">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={view === tab}
            onClick={() => setView(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.visionBoard}>
        <span className={styles.boardCorner}>
          A LITTLE ABOUT {view === "Class gallery" ? "OUR CLASS" : "JORDAN"}
        </span>
        <h3>
          {view === "Class gallery"
            ? "Different perspectives. Shared curiosity."
            : canvas
              ? view
              : "Curious enough to try."}
        </h3>
        <div className={styles.visionCards}>
          {[
            "Ask a better question",
            "Explore a new direction",
            "Think with someone else",
          ].map((label, i) => (
            <div key={label} className={styles.visionCard}>
              <IdeaArt variant={view === "What comes next" ? i + 1 : i} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className={styles.handwritten}>
          {view === "Class gallery"
            ? "A fictional class-only gallery example."
            : "Small experiments. A little courage. A next step."}
        </p>
      </div>
      <div className={styles.boardFoot}>
        <span>
          {canvas
            ? "Panel navigation preserves a larger visual story."
            : "Images, positions and personal touches belong to the learner."}
        </span>
        <Tag>
          {view === "Class gallery" ? "Class scope" : "Example composition"}
        </Tag>
      </div>
    </div>
  );
}

function MatchingExample() {
  const [stage, setStage] = useState("Connected");
  const pairs = [
    ["Input", "A value the program receives"],
    ["Condition", "A question that chooses a path"],
    ["Output", "A result the program shares"],
  ];
  return (
    <div className={styles.paperExample}>
      <div className={styles.exampleTabs} aria-label="Matching example states">
        {["Connected", "Original prompts"].map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={stage === value}
            onClick={() => setStage(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.matchingPairs}>
        {pairs.map(([left, right], i) => (
          <div key={left}>
            <strong>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {left}
            </strong>
            <span className={styles.connection} aria-hidden="true">
              {stage === "Connected" ? "⟷" : "···"}
            </span>
            <p>{right}</p>
          </div>
        ))}
      </div>
      <p className={styles.exampleNote}>
        One section of a multi-section activity. Each saved version retains its
        pairs.
      </p>
    </div>
  );
}

function SortingExample() {
  const [view, setView] = useState("Rank");
  return (
    <div className={styles.paperExample}>
      <div className={styles.exampleTabs} aria-label="Sorting activity modes">
        {["Rank", "Classify"].map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={mode === view}
            onClick={() => setView(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
      {view === "Rank" ? (
        <ol className={styles.rankList}>
          {[
            "Read the sensor",
            "Check for a missing value",
            "Choose the right message",
            "Share the result",
          ].map((item, i) => (
            <li key={item}>
              <span>{i + 1}</span>
              <strong>{item}</strong>
              <i aria-hidden="true">⠿</i>
            </li>
          ))}
        </ol>
      ) : (
        <div className={styles.categoryBins}>
          {[
            ["Input", "Temperature reading", "Button press"],
            ["Processing", "Missing-value check", "Comparison"],
            ["Output", "Screen message", "Indicator light"],
          ].map(([category, ...items]) => (
            <div key={category}>
              <h3>{category}</h3>
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      )}
      <p className={styles.exampleNote}>
        Two source-supported formats: ordering a sequence and grouping items by
        category.
      </p>
    </div>
  );
}

function CloudExample() {
  return (
    <div className={styles.cloudExample}>
      <SectionLabel>WHAT MAKES FEEDBACK USEFUL?</SectionLabel>
      <div className={styles.wordCloud}>
        {[
          "Specific",
          "Encouraging",
          "A next step",
          "Clear",
          "Honest",
          "Timely",
          "Kind",
          "Something to try",
        ].map((word, i) => (
          <span
            key={word}
            style={
              {
                "--weight": i === 0 ? 2.7 : i === 2 ? 2.1 : 1 + (i % 3) * 0.3,
              } as React.CSSProperties
            }
          >
            {word}
          </span>
        ))}
      </div>
      <div className={styles.cloudAnswer}>
        <span>Your example contribution</span>
        <strong>“Something to try”</strong>
      </div>
    </div>
  );
}

function HeatmapExample() {
  return (
    <div className={styles.heatmapExample}>
      <SectionLabel>WHERE SHOULD THE INPUT CHECK HAPPEN?</SectionLabel>
      <div className={styles.heatmapPlot}>
        <div className={styles.heatmapAxis}>
          <span>Read</span>
          <span>Check</span>
          <span>Use</span>
          <span>Share</span>
        </div>
        {Array.from({ length: 19 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${26 + ((i * 13) % 31)}%`,
              top: `${20 + ((i * 19) % 53)}%`,
            }}
          />
        ))}
        <div
          className={styles.selectedPoint}
          style={{ left: "42%", top: "42%" }}
        >
          <span />
          Your mark
        </div>
      </div>
      <p className={styles.exampleNote}>
        Fictional responses show how a class can mark a point or region on a
        shared diagram.
      </p>
    </div>
  );
}

function QuizExample() {
  const [view, setView] = useState("Question");
  return (
    <div className={styles.quizExample}>
      <div className={styles.exampleTabs} aria-label="Quiz example states">
        {["Question", "Answer", "Class results"].map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={view === tab}
            onClick={() => setView(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {view === "Class results" ? (
        <div className={styles.leaderboard}>
          <SectionLabel>ILLUSTRATIVE ROUND RESULTS</SectionLabel>
          {[
            ["Liam Chen", "850"],
            [demoStudent.name, "790"],
            ["Avery Morgan", "720"],
          ].map(([name, score], i) => (
            <div key={name}>
              <span>{i + 1}</span>
              <strong>{name}</strong>
              <b>
                {score}
                <small> points</small>
              </b>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.quizQuestion}>
            <span>QUESTION 02 / 03</span>
            <h3>What should the final block be in a 60-minute study plan?</h3>
          </div>
          <div className={styles.quizOptions}>
            {["25 minutes", "10 minutes", "15 minutes", "No final block"].map(
              (answer, i) => (
                <div key={answer} data-correct={view === "Answer" && i === 1}>
                  <span>{String.fromCharCode(65 + i)}</span>
                  {answer}
                  {view === "Answer" && i === 1 && <b>✓</b>}
                </div>
              ),
            )}
          </div>
          {view === "Answer" && (
            <p className={styles.answerExplanation}>
              Two 25-minute blocks leave 10 minutes. The final block uses only
              what remains.
            </p>
          )}
        </>
      )}
    </div>
  );
}

function BranchExample() {
  const [view, setView] = useState("The decision");
  return (
    <div className={styles.branchExample}>
      <div className={styles.branchTrail}>
        <span>Prototype</span>
        <i>→</i>
        <span>Unexpected result</span>
        <i>→</i>
        <strong>
          {view === "The decision"
            ? "Choose a direction"
            : "A smaller experiment"}
        </strong>
      </div>
      <div className={styles.branchStory}>
        <SectionLabel>
          {view === "The decision"
            ? "A FORK IN THE PATH"
            : "ONE POSSIBLE OUTCOME"}
        </SectionLabel>
        <h3>
          {view === "The decision"
            ? "The result isn’t what you expected."
            : "Now you know what to test."}
        </h3>
        <p>
          {view === "The decision"
            ? "The screen is blank, but the sensor is connected. Your team has a few ideas. What would you inspect first?"
            : "You inspect the incoming value, notice it is missing, and add a clear message before changing the rest of the program."}
        </p>
        <div className={styles.branchChoices}>
          {["The decision", "Inspect an example path"].map((label) => (
            <button
              type="button"
              key={label}
              aria-pressed={view === label}
              onClick={() => setView(label)}
            >
              {label}
              <Arrow />
            </button>
          ))}
        </div>
      </div>
      <p className={styles.exampleNote}>
        The real activity supports a personal path or an instructor-led class
        vote.
      </p>
    </div>
  );
}

function DebateExample() {
  const [round, setRound] = useState("Opening views");
  return (
    <div className={styles.paperExample}>
      <div className={styles.exampleTabs} aria-label="Debate rounds">
        {["Opening views", "Build on an argument"].map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={round === value}
            onClick={() => setRound(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.debateSides}>
        <div>
          <Tag>TRY IT QUICKLY</Tag>
          <h3>Make the next experiment small.</h3>
          <p>
            {round === "Opening views"
              ? "A quick prototype helps us discover what we did not anticipate."
              : "We can keep the test small and reversible while still checking the most important inputs."}
          </p>
          <small>Fictional student contribution</small>
        </div>
        <span className={styles.versus}>&</span>
        <div>
          <Tag>CHECK IT CAREFULLY</Tag>
          <h3>Make the result dependable.</h3>
          <p>
            {round === "Opening views"
              ? "A check at the right point can make a confusing failure understandable."
              : "Fast testing and careful validation can support each other when the goal is clear."}
          </p>
          <small>Fictional student contribution</small>
        </div>
      </div>
    </div>
  );
}

function EscapeExample() {
  const [room, setRoom] = useState(1);
  return (
    <div className={styles.escapeExample}>
      <div className={styles.roomTabs} aria-label="Escape room preview">
        {[1, 2, 3].map((number) => (
          <button
            type="button"
            key={number}
            aria-pressed={room === number}
            onClick={() => setRoom(number)}
          >
            <span>{String(number).padStart(2, "0")}</span>
            {["The signal", "The pattern", "The connection"][number - 1]}
          </button>
        ))}
      </div>
      <div className={styles.escapeRoom}>
        <div className={styles.door}>
          <span className={styles.doorLight} />
          <TaskMark kind="escape_room" />
          <span>ROOM {room}</span>
        </div>
        <div>
          <SectionLabel>TEAM EXPLORERS</SectionLabel>
          <h3>
            {
              [
                "A message is waiting.",
                "A pattern starts to emerge.",
                "The pieces belong together.",
              ][room - 1]
            }
          </h3>
          <p>
            {
              [
                "The first room asks the team to separate a missing signal from a zero reading.",
                "Compare the sequence and explain what changes from one step to the next.",
                "Use what you discovered in the earlier rooms to explain the final connection.",
              ][room - 1]
            }
          </p>
          <div className={styles.clue}>
            <span>Written example clue</span>
            <p>
              Look at what is present before deciding what the number means.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinaleExample() {
  const [card, setCard] = useState("The curious one");
  return (
    <div className={styles.finaleExample}>
      <div className={styles.reflectionCards}>
        {["The curious one", "The careful builder", "The connector"].map(
          (name, i) => (
            <button
              key={name}
              type="button"
              aria-pressed={card === name}
              onClick={() => setCard(name)}
            >
              <IdeaArt variant={i} />
              <strong>{name}</strong>
              <span>
                {
                  [
                    "Ask a question worth exploring.",
                    "Give a useful idea a solid shape.",
                    "Find a relationship others can use.",
                  ][i]
                }
              </span>
            </button>
          ),
        )}
      </div>
      <div className={styles.reflectionAnswer}>
        <Tag>EXAMPLE REFLECTION</Tag>
        <h3>{card}</h3>
        <p>
          “Next time, I’ll test the smallest piece first and explain what I
          notice before changing the whole program.”
        </p>
      </div>
    </div>
  );
}

function SimpleExample({ kind }: { kind: string }) {
  const [question, setQuestion] = useState(0);
  if (kind === "text")
    return (
      <div className={styles.writingSheet}>
        <SectionLabel>JORDAN’S EXAMPLE RESPONSE</SectionLabel>
        <p>
          Before using a sensor reading, I would check whether it exists. A
          missing value is different from zero.
        </p>
        <p>
          That small check lets the program give a useful explanation instead of
          comparing something it does not have.
        </p>
        <div>
          <span>Version 2</span>
          <Tag>Submitted example</Tag>
        </div>
      </div>
    );
  if (kind === "table")
    return (
      <div className={styles.tableWrap}>
        <table>
          <caption>Comparing possible sensor readings</caption>
          <thead>
            <tr>
              <th>Reading</th>
              <th>What it means</th>
              <th>Useful response</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["18", "A valid number", "Use the reading"],
              ["0", "A valid zero", "Keep the value"],
              ["None", "No reading available", "Explain the missing value"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={cell} data-preset={i === 0}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Shaded cells are supplied with the task; the learner completes the
          remaining structure.
        </p>
      </div>
    );
  if (kind === "questionnaire")
    return (
      <div className={styles.questionExample}>
        <div className={styles.questionProgress}>
          {[0, 1, 2].map((i) => (
            <button
              type="button"
              key={i}
              aria-label={`View reflection question ${i + 1}`}
              aria-pressed={question === i}
              onClick={() => setQuestion(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <SectionLabel>
          QUESTION {question + 1} OF 3 / PREPARED ANSWER
        </SectionLabel>
        <h3>
          {
            [
              "How did you approach the challenge?",
              "How confident do you feel explaining it?",
              "What would you try next?",
            ][question]
          }
        </h3>
        {question === 0 ? (
          <div className={styles.answerChoices}>
            <span>
              I tried a small example first <b>✓</b>
            </span>
            <span>I talked it through with someone</span>
            <span>I sketched a possible solution</span>
          </div>
        ) : question === 1 ? (
          <div className={styles.scale}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} data-selected={n === 4}>
                {n}
              </span>
            ))}
          </div>
        ) : (
          <blockquote>
            “I would compare the missing-value case with a zero reading.”
          </blockquote>
        )}
      </div>
    );
  if (kind === "file")
    return (
      <div className={styles.fileExample}>
        <TaskMark kind="file" />
        <div>
          <Tag>EXAMPLE ATTACHMENT</Tag>
          <h3>Observation-sheet.pdf</h3>
          <p>
            A document prepared in another tool, retained with this version of
            the work.
          </p>
          <span>Version 1 · Submitted record</span>
        </div>
      </div>
    );
  if (kind === "recording")
    return (
      <div className={styles.recordingExample}>
        <div className={styles.audioVisual}>
          {Array.from({ length: 43 }, (_, i) => (
            <i key={i} style={{ height: `${15 + ((i * 19) % 70)}%` }} />
          ))}
        </div>
        <Tag>ILLUSTRATIVE RECORDING RECORD</Tag>
        <h3>Explaining the first check</h3>
        <p>
          “I checked whether there was a reading before I tried to compare it to
          a number.”
        </p>
        <span>No microphone or camera is accessed in this explorer.</span>
      </div>
    );
  if (kind === "external" || kind === "arc_game")
    return (
      <div className={styles.integrationExample}>
        <div className={styles.integrationIcon}>
          <TaskMark kind={kind} />
        </div>
        <SectionLabel>
          {kind === "external"
            ? "A RESOURCE BEYOND THE CLASSROOM"
            : "A SEPARATE GAME ENVIRONMENT"}
        </SectionLabel>
        <h3>
          {kind === "external"
            ? "Interactive circuit explorer"
            : "Logic Lab / assigned game"}
        </h3>
        <p>
          {kind === "external"
            ? "A selected resource opens outside Arc. The learning record can show that it was visited."
            : "A classroom assignment can hand the learner into an available game, with a server-issued launch and configured time limit."}
        </p>
        <div className={styles.handoff}>
          <span>Arc lesson</span>
          <i>→</i>
          <span>
            {kind === "external" ? "Selected resource" : "Gaming Center"}
          </span>
        </div>
        <Tag>Integration preview</Tag>
      </div>
    );
  return (
    <div className={styles.canvasExample}>
      <SectionLabel>JORDAN’S IDEA SKETCH</SectionLabel>
      <div className={styles.sketch}>
        <div>
          <IdeaArt variant={0} />
          <span>A useful idea</span>
        </div>
        <b aria-hidden="true">→</b>
        <div>
          <IdeaArt variant={3} />
          <span>A small experiment</span>
        </div>
        <b aria-hidden="true">→</b>
        <div>
          <IdeaArt variant={2} />
          <span>Something to share</span>
        </div>
      </div>
      <p>“Start small. Notice what happens. Explain it to someone.”</p>
    </div>
  );
}

function TaskExample({ task }: { task: StudentTaskType }) {
  switch (task.id) {
    case "programming":
      return <CodeExample />;
    case "flowchart":
      return <FlowExample />;
    case "vision_board":
      return <VisionExample canvas />;
    case "image_vision_board":
      return <VisionExample />;
    case "matching":
      return <MatchingExample />;
    case "sorting_ranking":
      return <SortingExample />;
    case "live_cloud":
      return <CloudExample />;
    case "class_heatmap":
      return <HeatmapExample />;
    case "quiz_battle":
      return <QuizExample />;
    case "branching_scenario":
      return <BranchExample />;
    case "debate":
      return <DebateExample />;
    case "escape_room":
      return <EscapeExample />;
    case "session_finale":
      return <FinaleExample />;
    default:
      return <SimpleExample kind={task.id} />;
  }
}

function TaskDetail({ task }: { task: StudentTaskType }) {
  const current = studentTaskTypes.findIndex((item) => item.id === task.id);
  const next = studentTaskTypes[(current + 1) % studentTaskTypes.length];
  return (
    <>
      <div className={styles.taskBrief}>
        <span className={styles.taskBriefMark}>
          <TaskMark kind={task.id} />
        </span>
        <div>
          <Tag>{task.participation}</Tag>
          <SectionLabel>THE EXAMPLE CHALLENGE</SectionLabel>
          <h2>{task.prompt}</h2>
        </div>
      </div>
      <TaskExample key={task.id} task={task} />
      <div className={styles.noticeGrid}>
        {task.features.map((feature, i) => (
          <div key={feature}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <nav className={styles.bottomNav} aria-label="More student activities">
        <Link href={href("tasks")}>← All 21 activities</Link>
        <Link href={href(`tasks/${next.id}`)}>
          Next: {next.title} <Arrow />
        </Link>
      </nav>
    </>
  );
}

function Backpack() {
  const [scope, setScope] = useState("Lesson resources");
  const resources: Record<string, [string, string, string][]> = {
    "Lesson resources": [
      [
        "Input-validation notes",
        "Reference guide",
        "The difference between zero and no reading.",
      ],
      [
        "Sensor observation sheet",
        "Worksheet",
        "Record a value, an interpretation and a useful response.",
      ],
      [
        "Starter program",
        "Python files",
        "A small program to read and explain.",
      ],
    ],
    "Program library": [
      [
        "Asking useful questions",
        "Learning guide",
        "A reference across the learning pathway.",
      ],
      [
        "A language for feedback",
        "Reference card",
        "Specific observations and a constructive next step.",
      ],
    ],
    "My image library": [
      [
        "Idea sketch",
        "Canvas image",
        "A reusable example from the personal asset library.",
      ],
      [
        "A growing idea",
        "Canvas image",
        "Images uploaded for creative work can be found again.",
      ],
    ],
  };
  return (
    <>
      <div className={styles.resourceHero}>
        <div className={styles.resourceGlyph}>
          <TaskMark kind="file" />
        </div>
        <div>
          <SectionLabel>A PLACE FOR THE USEFUL THINGS</SectionLabel>
          <h2>
            Less searching.
            <br />
            More making.
          </h2>
          <p>
            This explorer brings the source’s program, lesson and task materials
            together with its personal canvas image library.
          </p>
        </div>
      </div>
      <div className={styles.exampleTabs} aria-label="Resource collections">
        {Object.keys(resources).map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={scope === name}
            onClick={() => setScope(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.resourceList}>
        {resources[scope].map(([name, type, description], i) => (
          <div key={name}>
            <span>
              {scope === "My image library" ? (
                <IdeaArt variant={i} />
              ) : (
                <TaskMark
                  kind={name === "Starter program" ? "programming" : "file"}
                />
              )}
            </span>
            <div>
              <small>{type}</small>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <Tag>Example resource</Tag>
          </div>
        ))}
      </div>
      <Link className={styles.textLink} href={href("sandbox")}>
        Look inside the lesson sandbox <Arrow />
      </Link>
    </>
  );
}

function SubmissionHistory({ feedback = false }: { feedback?: boolean }) {
  const [version, setVersion] = useState(2);
  return (
    <div className={styles.historyLayout}>
      <div className={styles.historyRail}>
        <SectionLabel>DECISIONS & LOOPS / PROGRAMMING</SectionLabel>
        <h2>A helpful study planner.</h2>
        {[1, 2].map((number) => (
          <button
            key={number}
            type="button"
            aria-pressed={version === number}
            onClick={() => setVersion(number)}
          >
            <span>0{number}</span>
            <div>
              <strong>Version {number}</strong>
              <small>
                {number === 1
                  ? "Feedback published · revision requested"
                  : "Revision submitted"}
              </small>
            </div>
          </button>
        ))}
        <p>
          Choose a version to inspect the prepared example. Earlier work remains
          part of the record.
        </p>
        <Link
          className={styles.textLink}
          href={arcExplorerHref("instructor", "reviews/submission")}
        >
          See Maya’s review view <Arrow />
        </Link>
      </div>
      <div className={styles.historyWork}>
        <div className={styles.editorHeader}>
          <span>study_planner.py / version {version}</span>
          <Tag>Submitted example</Tag>
        </div>
        <div className={styles.codeStudio}>
          <div className={styles.codeArea}>
            <pre aria-label={`Jordan’s example version ${version} Python code`}>
              <code>{version === 1 ? firstPlannerCode : studyPlannerCode}</code>
            </pre>
          </div>
        </div>
        <div className={styles.historyResponse}>
          <SectionLabel>JORDAN’S EXPLANATION</SectionLabel>
          <p>
            {version === 1
              ? "I subtract 25 each time until the minutes run out."
              : "I use the smaller of the remaining time and 25 minutes. I also return a helpful message when there is no time to plan."}
          </p>
        </div>
        <div className={styles.teacherFeedback}>
          <div className={styles.avatar}>{demoInstructor.initials}</div>
          <div>
            <SectionLabel>
              {demoInstructor.name} / PUBLISHED FEEDBACK ON VERSION 1
            </SectionLabel>
            <h3>Keep the final block within the time left.</h3>
            <p>
              Your loop is easy to follow. For 60 minutes, check the total time
              in the returned list. Can the last block use only the minutes
              left? Test 0, −5 and 60 minutes, then explain your choices.
            </p>
          </div>
        </div>
        {version === 2 && (
          <div className={styles.peerNote}>
            <Tag>REVISION SUBMITTED</Tag>
            <p>The latest version is ready for a new review.</p>
            <span>The published feedback above belongs to version 1.</span>
          </div>
        )}
        {feedback && (
          <div className={styles.peerNote}>
            <Tag>PEER REVIEW / PUBLICATION GATE</Tag>
            <p>A submitted peer response becomes visible after publication.</p>
            <span>
              The instructor view shows a response awaiting moderation. Its text
              stays private here.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Reflections() {
  const [view, setView] = useState("Learning habits");
  return (
    <>
      <div className={styles.reflectionIntro}>
        <div>
          <SectionLabel>A PREPARED QUESTIONNAIRE PROFILE</SectionLabel>
          <h2>Notice how you learn.</h2>
          <p>
            Assigned questionnaire responses can have their own profile and
            result presentation, separate from a lesson’s inline reflection
            activity.
          </p>
        </div>
        <IdeaArt variant={3} />
      </div>
      <div className={styles.exampleTabs} aria-label="Reflection profiles">
        {["Learning habits", "A next step"].map((tab) => (
          <button
            type="button"
            key={tab}
            aria-pressed={tab === view}
            onClick={() => setView(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.reflectionProfile}>
        <div>
          <SectionLabel>
            {view === "Learning habits"
              ? "JORDAN’S EXAMPLE ANSWERS"
              : "FROM REFLECTION TO ACTION"}
          </SectionLabel>
          <h3>
            {view === "Learning habits"
              ? "I learn by making the idea concrete."
              : "Try a smaller first experiment."}
          </h3>
          <p>
            {view === "Learning habits"
              ? "A small example helps me notice what I understand. Talking it through helps me see what I missed."
              : "Before building the whole solution, test one input and write down what you expect to happen."}
          </p>
          <Link href={href("tasks/questionnaire")}>
            See the inline question format <Arrow />
          </Link>
        </div>
        <div className={styles.reflectionDimensions}>
          {[
            "Try an example",
            "Explain the reasoning",
            "Ask another question",
          ].map((label, i) => (
            <div key={label}>
              <span>{label}</span>
              <div>
                {[0, 1, 2, 3, 4].map((n) => (
                  <i key={n} data-filled={n < 4 - i} />
                ))}
              </div>
            </div>
          ))}
          <small>Illustrative answers, not a diagnostic assessment.</small>
        </div>
      </div>
    </>
  );
}

function LiveClassroom() {
  const ids = [
    "live_cloud",
    "class_heatmap",
    "quiz_battle",
    "debate",
    "branching_scenario",
    "escape_room",
  ];
  return (
    <>
      <div className={styles.liveHero}>
        <div>
          <SectionLabel>ONE CLASSROOM. DIFFERENT WAYS IN.</SectionLabel>
          <h2>
            Everyone has
            <br />a way to participate.
          </h2>
          <p>
            The instructor shapes the session. Students contribute through
            words, choices, diagrams, arguments or a team puzzle.
          </p>
        </div>
        <div className={styles.participantOrbit}>
          {["JL", "LC", "AM", "NR", "RB", "AK"].map((initials, i) => (
            <span
              key={initials}
              style={{ "--index": i } as React.CSSProperties}
            >
              {initials}
            </span>
          ))}
          <b>
            24<small>fictional learners</small>
          </b>
        </div>
      </div>
      <div className={styles.liveJourney}>
        <span>Session prepared</span>
        <i>→</i>
        <span>Class participates</span>
        <i>→</i>
        <span>Teacher advances</span>
        <i>→</i>
        <span>Work is retained</span>
      </div>
      <div className={styles.activityGrid}>
        {ids.map((id) => {
          const task = studentTaskTypes.find((item) => item.id === id)!;
          return (
            <Link
              className={styles.activityCard}
              key={id}
              href={href(`tasks/${id}`)}
            >
              <span className={styles.activityMark}>
                <TaskMark kind={id} />
              </span>
              <div>
                <small>{task.participation}</small>
                <h3>{task.title}</h3>
                <p>{task.summary}</p>
              </div>
              <Arrow />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export function StudentPortalView({ pageId }: { pageId: string }) {
  const task = pageId.startsWith("tasks/")
    ? studentTaskTypes.find((item) => item.id === pageId.slice(6))
    : undefined;
  let content: React.ReactNode;
  if (task) content = <TaskDetail task={task} />;
  else
    switch (pageId) {
      case "lessons":
        content = (
          <>
            <div className={styles.lessonIntro}>
              <SectionLabel>
                {demoStudent.classroom} / SAMPLE LEARNING PATH
              </SectionLabel>
              <h2>
                From an observation
                <br />
                to a working idea.
              </h2>
              <p>
                Each lesson brings its own activities, resources and student
                work. These three fictional lessons demonstrate that structure.
              </p>
            </div>
            <LessonRows />
            <div className={styles.lessonFooter}>
              <Link href={href("backpack")}>
                Explore the resources <Arrow />
              </Link>
              <Link href={href("sandbox")}>
                Open the sandbox view <Arrow />
              </Link>
            </div>
          </>
        );
        break;
      case "tasks":
        content = <ActivityLibrary />;
        break;
      case "backpack":
        content = <Backpack />;
        break;
      case "sandbox":
        content = <CodeExample sandbox />;
        break;
      case "submissions":
        content = <SubmissionHistory />;
        break;
      case "feedback":
        content = <SubmissionHistory feedback />;
        break;
      case "reflections":
        content = <Reflections />;
        break;
      case "vision-board":
        content = <VisionExample />;
        break;
      case "live-classroom":
        content = <LiveClassroom />;
        break;
      default:
        content = <Overview />;
    }
  return (
    <div className={styles.root} data-student-explorer>
      {content}
    </div>
  );
}
