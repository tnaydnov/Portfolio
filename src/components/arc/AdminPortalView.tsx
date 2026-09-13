"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  demoClassrooms,
  demoInstructor,
  demoLearners,
  demoProgram,
  demoStudent,
} from "@/content/arc-explorer/demo-data";
import { arcExplorerHref } from "@/content/arc-explorer/types";
import s from "./admin-portal.module.css";

type Classroom = (typeof demoClassrooms)[number];
const sum = (rows: Classroom[], key: "learners" | "submitted" | "reviewed") =>
  rows.reduce((n, row) => n + row[key], 0);
const schools = [...new Set(demoClassrooms.map((row) => row.school))];
const adminHref = (id: string) => arcExplorerHref("admin", id);

function Panel({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className={s.panel}>
      <div className={s.panelHead}>
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
      {children}
    </section>
  );
}
function Note({ children }: { children: ReactNode }) {
  return <p className={s.note}>{children}</p>;
}
function Stats({ items }: { items: [string, string | number, string?][] }) {
  return (
    <dl className={s.stats}>
      {items.map(([label, value, note]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
          {note && <small>{note}</small>}
        </div>
      ))}
    </dl>
  );
}
function Badge({
  children,
  neutral = false,
}: {
  children: ReactNode;
  neutral?: boolean;
}) {
  return <span className={neutral ? s.badgeNeutral : s.badge}>{children}</span>;
}
function Links({ items }: { items: [string, string][] }) {
  return (
    <nav className={s.links} aria-label="Related views">
      {items.map(([label, id]) => (
        <Link href={adminHref(id)} key={id}>
          {label}
          <span aria-hidden="true">↗</span>
        </Link>
      ))}
    </nav>
  );
}
function Tabs({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className={s.tabs} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
function Bar({
  label,
  value,
  total,
  detail,
}: {
  label: string;
  value: number;
  total: number;
  detail?: string;
}) {
  return (
    <div className={s.barRow}>
      <div>
        <span>{label}</span>
        <strong>
          {value}
          {detail ? ` ${detail}` : ` / ${total}`}
        </strong>
      </div>
      <div className={s.barTrack}>
        <span
          style={{
            width: `${Math.min(100, (value / Math.max(total, 1)) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
function Flow({ steps }: { steps: [string, string][] }) {
  return (
    <ol className={s.flow}>
      {steps.map(([name, detail], i) => (
        <li key={name}>
          <span className={s.step}>{String(i + 1).padStart(2, "0")}</span>
          <h3>{name}</h3>
          <p>{detail}</p>
        </li>
      ))}
    </ol>
  );
}
function Config({ rows }: { rows: [string, string][] }) {
  return (
    <dl className={s.config}>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function LineChart({
  points,
  label,
  labels,
}: {
  points: number[];
  label: string;
  labels: string[];
}) {
  const max = Math.max(...points, 1);
  const positions = points.map((v, i) => [
    20 + (i / Math.max(points.length - 1, 1)) * 560,
    150 - (v / max) * 125,
  ]);
  return (
    <div className={s.lineChart}>
      <svg
        viewBox="0 0 600 180"
        role="img"
        aria-label={`${label}: ${points.join(", ")}`}
      >
        <path d="M20 25H580 M20 87H580 M20 150H580" className={s.gridLine} />
        <polyline
          points={positions.map((p) => p.join(",")).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {positions.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="currentColor" />
        ))}
      </svg>
      <div className={s.chartLabels}>
        {labels.map((name, i) => (
          <div key={name}>
            <span>{name}</span>
            <strong>{points[i]}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
function ClassroomTable({
  rows = demoClassrooms,
  learners = false,
}: {
  rows?: Classroom[];
  learners?: boolean;
}) {
  return (
    <div
      className={s.tableWrap}
      tabIndex={0}
      role="region"
      aria-label="Data table; scroll horizontally for more columns"
    >
      <table>
        <caption>
          {learners
            ? "Classroom submission example for one activity"
            : "Fictional classroom directory"}
        </caption>
        <thead>
          <tr>
            <th>Classroom</th>
            <th>Instructor</th>
            <th>Learners</th>
            {learners && (
              <>
                <th>Submitted</th>
                <th>Reviewed</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th scope="row">
                <Link href={adminHref(`classrooms/${row.id}`)}>
                  {row.name} ↗
                </Link>
                <small>{row.school}</small>
              </th>
              <td>{row.instructor}</td>
              <td>{row.learners}</td>
              {learners && (
                <>
                  <td>{row.submitted}</td>
                  <td>{row.reviewed}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function LearnerTable({
  classroom,
  classrooms,
  query = "",
}: {
  classroom?: string;
  classrooms?: string[];
  query?: string;
}) {
  const rows = demoLearners.filter(
    (row) =>
      (!classroom || row.classroom === classroom) &&
      (!classrooms || classrooms.includes(row.classroom)) &&
      row.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Note>
        Selected learner records. These six examples are a sample of the
        66-person fictional program.
      </Note>
      <div
        className={s.tableWrap}
        tabIndex={0}
        role="region"
        aria-label="Data table; scroll horizontally for more columns"
      >
        <table>
          <caption>Example learner records</caption>
          <thead>
            <tr>
              <th>Learner</th>
              <th>Classroom</th>
              <th>Submitted versions</th>
              <th>Reviewed</th>
              <th>Latest work</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row">
                  {row.name === demoStudent.name ? (
                    <Link href={adminHref("school-manager/learner")}>
                      {row.name} ↗
                    </Link>
                  ) : (
                    row.name
                  )}
                </th>
                <td>{row.classroom}</td>
                <td>{row.submitted}</td>
                <td>{row.reviewed}</td>
                <td>
                  <Badge neutral={row.status.includes("draft")}>
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className={s.empty}>No example learners match this search.</p>
        )}
      </div>
    </>
  );
}

function Overview() {
  return (
    <>
      <div className={s.banner}>
        <span className={s.kicker}>{demoProgram.term}</span>
        <strong>{demoProgram.name}</strong>
        <p>
          A connected view of the fictional program. Select a classroom to
          inspect its context.
        </p>
      </div>
      <Stats
        items={[
          ["Learners", sum(demoClassrooms, "learners")],
          ["Classrooms", demoClassrooms.length],
          ["Schools", schools.length],
          [
            "Instructors",
            new Set(demoClassrooms.map((c) => c.instructor)).size,
          ],
        ]}
      />
      <Panel
        title="The classrooms"
        note="One program, three learning environments."
      >
        <ClassroomTable />
      </Panel>
      <div className={s.two}>
        <Panel title="Follow the learning activity">
          <Bar label="Learners who submitted" value={47} total={66} />
          <Bar label="Learners with reviewed work" value={37} total={66} />
          <Note>
            One activity snapshot across all three classrooms. These are example
            learner counts, not the platform’s total submissions.
          </Note>
          <Links items={[["Inspect submitted work", "submissions"]]} />
        </Panel>
        <Panel title="Know what to inspect next">
          <Links
            items={[
              ["Teaching coverage", "builder/coverage"],
              ["Review workload", "reports/grading"],
              ["Program analysis", "analytics/overview"],
              ["People & permissions", "access"],
            ]}
          />
        </Panel>
      </div>
      <Note>
        The native admin dashboard separately counts active classrooms,
        students, today’s submissions and submitted versions. Its
        production-oriented counters exclude records marked as demo.
      </Note>
    </>
  );
}

function Classrooms({ manager = false }: { manager?: boolean }) {
  const [school, setSchool] = useState("All schools");
  const [query, setQuery] = useState("");
  const rows = demoClassrooms.filter(
    (c) =>
      (school === "All schools" || c.school === school) &&
      `${c.name} ${c.instructor}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className={s.filters}>
        <label>
          School
          <select value={school} onChange={(e) => setSchool(e.target.value)}>
            {["All schools", ...schools].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Find a classroom
          <input
            type="search"
            placeholder="Classroom or instructor"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <Stats
        items={[
          ["Classrooms in view", rows.length],
          ["Learners in view", sum(rows, "learners")],
          ["Submitted this activity", sum(rows, "submitted")],
          ["Reviewed this activity", sum(rows, "reviewed")],
        ]}
      />
      <Panel title={manager ? "Schools in your scope" : "Classroom directory"}>
        <ClassroomTable rows={rows} learners />
        {rows.length === 0 && (
          <p className={s.empty}>No classrooms match those filters.</p>
        )}
      </Panel>
      {manager ? (
        <>
          <Panel title="A separate level of access">
            <Config
              rows={[
                ["Classrooms", "Assigned schools and classrooms only"],
                ["Submission summary", "A separate permission"],
                [
                  "Full learner detail",
                  "Requires students.detail; absent from the default role",
                ],
              ]}
            />
            <Links
              items={[
                ["Inspect an example learner", "school-manager/learner"],
                ["How scopes are assigned", "access"],
              ]}
            />
          </Panel>
        </>
      ) : (
        <Flow
          steps={[
            [
              "Set up the group",
              "School, region, active state and entry access.",
            ],
            [
              "Assign teaching",
              "One or more instructors can be attached to the group.",
            ],
            [
              "Assign curriculum",
              "A content pack is assigned separately from releasing its lessons.",
            ],
          ]}
        />
      )}
    </>
  );
}
function ClassroomDetail({ id }: { id: string }) {
  const c = demoClassrooms.find((c) => c.id === id) ?? demoClassrooms[0];
  return (
    <>
      <Config
        rows={[
          ["Classroom", c.name],
          ["School", c.school],
          ["Instructor", c.instructor],
          ["Learners", String(c.learners)],
          ["Program", demoProgram.name],
        ]}
      />
      <div className={s.two}>
        <Panel title="Current activity">
          <Bar label="Submitted" value={c.submitted} total={c.learners} />
          <Bar label="Reviewed" value={c.reviewed} total={c.learners} />
        </Panel>
        <Panel title="Assigned material">
          <p className={s.largeText}>Think, make, reflect.</p>
          <p>
            Three example lessons connect a written idea, visual problem-solving
            and reflection.
          </p>
          <Links items={[["Inspect the content pack", "content-packs"]]} />
        </Panel>
      </div>
      <Panel title="A few learners in this classroom">
        <LearnerTable classroom={c.name} />
      </Panel>
    </>
  );
}
function Instructors() {
  const [query, setQuery] = useState("");
  const rows = demoClassrooms.filter((c) =>
    c.instructor.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <label className={s.search}>
        Find an instructor
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try Maya"
        />
      </label>
      <div className={s.cards}>
        {rows.map((c) => (
          <Panel key={c.instructor} title={c.instructor}>
            <Badge>Active · example account</Badge>
            <Config
              rows={[
                ["School", c.school],
                ["Classroom", c.name],
                ["Learners", String(c.learners)],
              ]}
            />
            <Links items={[["View classroom", `classrooms/${c.id}`]]} />
          </Panel>
        ))}
      </div>
      {rows.length === 0 && (
        <p className={s.empty}>No example instructors match this search.</p>
      )}
      <Note>
        Arc also provides account editing, activation, password resets and
        classroom assignment. Those operations are not connected in this
        read-only view.
      </Note>
    </>
  );
}

const roleAccess = {
  "School manager": [
    ["Classroom scope", "Northstar School · Python Lab + Web Studio"],
    ["Classroom and learner lists", "Granted"],
    ["Submission summaries", "Granted"],
    ["Full learner detail", "Additional permission; off by default"],
    ["Analytics tabs", "Overview · Grading · Progress"],
  ],
  "Analytics staff": [
    ["School scope", "Northstar School + Cedar School"],
    ["Analytics", "Overview · Grading · Progress"],
    ["Admin BI", "Separate admin-only portal"],
    ["Administrative editing", "Not granted"],
  ],
  "Content manager": [
    ["Content-pack scope", "Think, Make, Reflect"],
    ["Pack permissions", "View · Create · Edit · Assign"],
    [
      "Questionnaire permissions",
      "Results, codes and profiles can be granted separately",
    ],
    ["Builder library", "All, assigned or explicitly selected source packs"],
    ["Student management", "Not part of this role"],
  ],
} satisfies Record<string, [string, string][]>;
function Access() {
  const [role, setRole] = useState<keyof typeof roleAccess>("School manager");
  return (
    <>
      <Tabs
        options={Object.keys(roleAccess)}
        value={role}
        onChange={(value) => setRole(value as keyof typeof roleAccess)}
        label="Inspect a role"
      />
      <div className={s.two}>
        <Panel title={`${role}: example access`}>
          <Config rows={roleAccess[role]} />
        </Panel>
        <Panel title="Permissions and scope answer different questions">
          <Flow
            steps={[
              ["Role", "Which workspace does this person use?"],
              [
                "Permission",
                "Which operations or depth of detail can they access?",
              ],
              [
                "Scope",
                "Which schools, classrooms or content records are included?",
              ],
            ]}
          />
        </Panel>
      </div>
      <Note>
        Non-empty classroom-scope dimensions intersect. An empty dimension means
        no restriction on that dimension. No account or permission is changed
        here.
      </Note>
    </>
  );
}
function Imports() {
  const [showIssues, setShowIssues] = useState(false);
  return (
    <>
      <Tabs
        options={["Sample spreadsheet", "Validation preview"]}
        value={showIssues ? "Validation preview" : "Sample spreadsheet"}
        onChange={(value) => setShowIssues(value === "Validation preview")}
        label="Import preparation view"
      />
      <Panel
        title={showIssues ? "Review before importing" : "Three example rows"}
      >
        <div
          className={s.tableWrap}
          tabIndex={0}
          role="region"
          aria-label="Data table; scroll horizontally for more columns"
        >
          <table>
            <caption>Fictional student import preview</caption>
            <thead>
              <tr>
                <th>Row</th>
                <th>Learner</th>
                <th>Classroom</th>
                {showIssues && <th>Validation</th>}
              </tr>
            </thead>
            <tbody>
              {[
                ["2", "Jamie Taylor", "Python Lab", "Ready"],
                ["3", "Casey Bell", "Web Studio", "Ready"],
                [
                  "4",
                  "Robin Ellis",
                  "Unrecognized classroom",
                  "Classroom needs correction",
                ],
              ].map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <th scope="row">{row[1]}</th>
                  <td>{row[2]}</td>
                  {showIssues && (
                    <td>
                      <Badge neutral={row[0] === "4"}>{row[3]}</Badge>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Flow
        steps={[
          [
            "Choose the template",
            "Classrooms, instructors and students use different import schemas.",
          ],
          [
            "Inspect the preview",
            "Parsed records and errors are shown before committing.",
          ],
          [
            "Confirm in Arc",
            "Only the original application can create these records.",
          ],
        ]}
      />
    </>
  );
}
function Merge() {
  const [step, setStep] = useState("Compare records");
  return (
    <>
      <Tabs
        options={["Compare records", "Review the plan"]}
        value={step}
        onChange={setStep}
        label="Account reconciliation example"
      />
      {step === "Compare records" ? (
        <div className={s.two}>
          <Panel title="Record A · keep">
            <Config
              rows={[
                ["Name", "Taylor Quinn"],
                ["Classroom", "Python Lab"],
                ["Submitted versions", "4"],
                ["Published reviews", "3"],
              ]}
            />
          </Panel>
          <Panel title="Record B · reconcile">
            <Config
              rows={[
                ["Name", "Taylor Quinn"],
                ["Classroom", "Python Lab"],
                ["Submitted versions", "2"],
                ["Published reviews", "1"],
              ]}
            />
          </Panel>
        </div>
      ) : (
        <Panel title="Inspect collisions before execution">
          <Flow
            steps={[
              [
                "Choose the surviving record",
                "The target keeps the intended account identity.",
              ],
              [
                "Review linked work",
                "A merge plan identifies collisions and references that must move.",
              ],
              [
                "Keep the audit history",
                "The real workflow records the merge and absorbed accounts transactionally.",
              ],
            ]}
          />
        </Panel>
      )}
      <Note>
        These are hypothetical duplicate records outside the program totals. No
        merge is executed; no original learner history is accessed.
      </Note>
    </>
  );
}

const lessonRows = [
  {
    title: "Start with a question",
    minutes: 20,
    activities: [
      "A learning goal",
      "Reflect on your approach",
      "My learning board",
    ],
    coverage: "Lesson teaching materials",
  },
  {
    title: "Decisions & loops",
    minutes: 30,
    activities: [
      "Read a decision",
      "A helpful study planner",
      "Explain your reasoning",
    ],
    coverage: "Activity mini-lessons",
  },
  {
    title: "Build it together",
    minutes: 20,
    activities: ["A shared plan", "Make the connections", "What changed?"],
    coverage: "One preparation gap",
  },
];
function Curriculum({
  builder = false,
  coverage = false,
  lesson = false,
}: {
  builder?: boolean;
  coverage?: boolean;
  lesson?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("Lesson sequence");
  const row = lessonRows[index];
  return (
    <>
      {!coverage && !lesson && (
        <>
          <div className={s.banner}>
            <span className={s.kicker}>
              {builder
                ? "Editable draft · example"
                : "Reusable content pack · example"}
            </span>
            <strong>Think, Make, Reflect</strong>
            <p>
              3 lessons · 9 activities · an illustrative arrangement of
              source-supported activity types.
            </p>
          </div>
          <Tabs
            options={[
              "Lesson sequence",
              builder ? "Selection logic" : "Reuse & release",
            ]}
            value={mode}
            onChange={setMode}
            label="Curriculum view"
          />
        </>
      )}
      {coverage ? (
        <Panel title="Teaching readiness">
          <div className={s.coverage}>
            {lessonRows.map((item, i) => (
              <div key={item.title}>
                <span className={s.step}>0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.coverage}</p>
                </div>
                <Badge neutral={i === 2}>
                  {i === 2 ? "Review needed" : "Material available"}
                </Badge>
              </div>
            ))}
          </div>
          <Note>
            Coverage is advisory: an activity can use its own mini-lesson,
            inherit lesson materials or still need preparation. A warning does
            not automatically block publication.
          </Note>
        </Panel>
      ) : mode === "Lesson sequence" ? (
        <div className={s.curriculum}>
          <nav aria-label="Example lesson selection" className={s.lessonList}>
            {lessonRows.map((item, i) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setIndex(i)}
                aria-pressed={index === i}
              >
                <span>0{i + 1}</span>
                <strong>{item.title}</strong>
                <small>{item.minutes} min · 3 activities</small>
              </button>
            ))}
          </nav>
          <Panel
            title={row.title}
            note={
              lesson
                ? "A view of lesson preparation fields."
                : "Select another lesson to inspect its activities."
            }
          >
            <ol className={s.activities}>
              {row.activities.map((activity, i) => (
                <li key={activity}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{activity}</strong>
                  <Badge neutral>
                    {i === 0 ? "Explore" : i === 1 ? "Make" : "Reflect"}
                  </Badge>
                </li>
              ))}
            </ol>
            {lesson && (
              <Config
                rows={[
                  [
                    "Presentation",
                    "Introduce the problem and model one example",
                  ],
                  [
                    "Teaching plan",
                    "Explain → demonstrate → practice → discuss",
                  ],
                  ["Instructor notes", "Ask what changes at each decision"],
                  [
                    "Sandbox resources",
                    "Separate student and instructor master archives",
                  ],
                ]}
              />
            )}
            <Links
              items={[
                ["Teaching coverage", "builder/coverage"],
                ["Lesson materials", "content-packs/lesson"],
              ]}
            />
          </Panel>
        </div>
      ) : builder ? (
        <Panel title="Selection, with an editable result">
          <Flow
            steps={[
              [
                "Start with intent",
                "A goal, lesson count, activity preferences and priorities guide selection.",
              ],
              [
                "Rank existing material",
                "Tags and task-type preferences influence a rule-based score. They are not guaranteed hard matches.",
              ],
              [
                "Inspect and edit",
                "The author reviews the sequence and teaching gaps before publishing a new pack.",
              ],
            ]}
          />
          <Note>
            Smart Build does not generate new pedagogy with an AI model. Draft
            snapshots, reusable source content and published packs are separate
            records.
          </Note>
        </Panel>
      ) : (
        <Panel title="Reuse and delivery are separate decisions">
          <div className={s.two}>
            <Config
              rows={[
                ["Copy", "Create independent editable material"],
                [
                  "Mirror",
                  "Keep a linked, read-only copy that follows its source",
                ],
                ["Source removal", "Explicitly detach or remove linked copies"],
              ]}
            />
            <Flow
              steps={[
                ["Publish", "Create a reusable content pack."],
                ["Assign", "Attach the pack to a classroom."],
                [
                  "Release",
                  "Make a lesson or activity available during teaching.",
                ],
              ]}
            />
          </div>
        </Panel>
      )}
    </>
  );
}

function Questionnaires({ view = "catalog" }: { view?: string }) {
  const [tab, setTab] = useState("Distribution");
  const [group, setGroup] = useState("Platform learners");
  return (
    <>
      {view === "catalog" && (
        <>
          <Panel title="How I approach a challenge">
            <Badge>Example reflection questionnaire</Badge>
            <Config
              rows={[
                [
                  "Response formats",
                  "Scaled responses and choice-based questions",
                ],
                ["Scoring", "Configurable categories and profile output"],
                [
                  "Wording",
                  "Alternative phrasings can follow a lesson or external group",
                ],
                [
                  "Versions",
                  "Activate an intended definition while retaining version context",
                ],
              ]}
            />
            <Links
              items={[
                ["Response analysis", "questionnaires/results"],
                ["External access groups", "questionnaires/access"],
                ["Reflection timelines", "questionnaires/reflection"],
              ]}
            />
          </Panel>
          <Flow
            steps={[
              [
                "Define the questions",
                "Create questions, options and scoring rules.",
              ],
              [
                "Choose the context",
                "Assign to lessons or distribute through a separate access group.",
              ],
              [
                "Inspect the responses",
                "Compare summaries and open the underlying answer.",
              ],
            ]}
          />
        </>
      )}
      {view === "access" && (
        <>
          <Tabs
            options={["Platform learners", "Workshop visitors"]}
            value={group}
            onChange={setGroup}
            label="Questionnaire audience"
          />
          <Panel title={group}>
            <Config
              rows={
                group === "Platform learners"
                  ? [
                      ["Context", "Classroom and lesson assignment"],
                      ["Identity", "A signed-in learner record"],
                      ["Results", "Retain classroom and lesson context"],
                    ]
                  : [
                      ["Context", "A separate external questionnaire group"],
                      ["Entry", "A group-specific access link or code"],
                      [
                        "Limits",
                        "Configurable maximum responses and enabled state",
                      ],
                      [
                        "Management",
                        "Separate group-manager access and response analysis",
                      ],
                    ]
              }
            />
          </Panel>
          <Note>
            No access link, token or invitation is issued here. The example
            contains no real guest records.
          </Note>
        </>
      )}
      {(view === "results" || view === "reflection") && (
        <>
          <Tabs
            options={
              view === "reflection"
                ? ["Distribution", "Repeated reflections"]
                : ["Distribution", "Sample responses"]
            }
            value={tab}
            onChange={setTab}
            label="Response analysis view"
          />
          <Panel
            title={
              tab === "Repeated reflections"
                ? "Jordan’s category scores across three reflections"
                : "A selected response set"
            }
            note="Illustrative questionnaire data, separate from the classroom activity counts."
          >
            {tab === "Distribution" ? (
              <>
                <Stats
                  items={[
                    ["Responses in this example", 24],
                    ["First responses", 18],
                    ["Repeated responses", 6],
                  ]}
                />
                {[
                  ["Explore", 8],
                  ["Plan", 7],
                  ["Connect", 5],
                  ["Test", 4],
                ].map(([name, value]) => (
                  <Bar
                    key={name}
                    label={String(name)}
                    value={Number(value)}
                    total={24}
                  />
                ))}
              </>
            ) : tab === "Sample responses" ? (
              <Config
                rows={[
                  ["Jordan Lee", "Explore · Python Lab"],
                  ["Liam Chen", "Plan · Python Lab"],
                  ["Avery Morgan", "Connect · Python Lab"],
                ]}
              />
            ) : (
              <LineChart
                label="Example Explore category score"
                labels={["Reflection 1", "Reflection 2", "Reflection 3"]}
                points={[58, 64, 71]}
              />
            )}
            <Note>
              Profiles summarize configured answers. They are not a validated
              psychological assessment, and a rising score is not proof of
              improved learning.
            </Note>
          </Panel>
          <Links
            items={[
              ["Questionnaire setup", "questionnaires"],
              ["Reflection timelines", "questionnaires/reflection"],
            ]}
          />
        </>
      )}
    </>
  );
}
function Submissions() {
  const [query, setQuery] = useState("");
  return (
    <>
      <label className={s.search}>
        Find an example learner
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try Jordan"
        />
      </label>
      <Panel title="Submitted work and review state">
        <LearnerTable query={query} />
      </Panel>
      <Flow
        steps={[
          ["Draft", "Work in progress has its own state."],
          ["Submitted version", "The learner commits a version for review."],
          [
            "Published feedback",
            "The review remains associated with that submitted version.",
          ],
          [
            "Revision",
            "A later submission adds history instead of erasing it.",
          ],
        ]}
      />
      <Links
        items={[
          ["Open Jordan’s work", "school-manager/learner"],
          ["Inspect the review workload", "reports/grading"],
        ]}
      />
    </>
  );
}

const biViews = [
  ["Overview", "overview"],
  ["Geography", "geography"],
  ["Lessons", "lessons"],
  ["Students", "students"],
  ["Learning friction", "learning-friction"],
  ["Business impact", "business-impact"],
];
const lenses = [
  [
    "No-show runs",
    "A scheduled run with no recorded participation warrants a different question from an unfinished draft.",
    "Check whether the lesson actually took place.",
  ],
  [
    "Started, not finished",
    "A learner started work but has not submitted it.",
    "Inspect the task, available time and next instruction.",
  ],
  [
    "Late completion",
    "A submission arrives after the relevant teaching window.",
    "Separate delayed work from work that never started.",
  ],
  [
    "Stuck on a task",
    "Elapsed work and completion patterns indicate a possible obstacle.",
    "Open the activity and ask where progress stopped.",
  ],
  [
    "Unusual time",
    "An attempt is unusually fast or slow relative to its comparison context.",
    "Treat it as a prompt to investigate, not a diagnosis.",
  ],
  [
    "Skipped work",
    "A sequence can reveal work that was passed over.",
    "Inspect the neighboring activities and their requirements.",
  ],
  [
    "Repeated retries",
    "Several attempts may reveal persistence or unclear instructions.",
    "Review the attempt history before interpreting the signal.",
  ],
  [
    "Excellence",
    "Strong work is worth noticing alongside friction.",
    "Look at the work and the comparison criteria.",
  ],
  [
    "Early help",
    "Early difficulty can be surfaced before the lesson is over.",
    "Use the signal to support a learner, not label them.",
  ],
];
function Analytics({ view }: { view: string }) {
  const [school, setSchool] = useState("All schools");
  const [lens, setLens] = useState(1);
  const rows = demoClassrooms.filter(
    (c) => school === "All schools" || c.school === school,
  );
  const learners = sum(rows, "learners"),
    submitted = sum(rows, "submitted"),
    reviewed = sum(rows, "reviewed");
  return (
    <>
      <nav className={s.tabs} aria-label="Admin BI tabs">
        {biViews.map(([label, id]) => (
          <Link
            href={adminHref(`analytics/${id}`)}
            aria-current={view === id ? "page" : undefined}
            key={id}
          >
            {label}
          </Link>
        ))}
      </nav>
      <Note>
        Admin BI is a separate, admin-only workspace. Staff reporting has its
        own Overview, Grading and Progress pages.
      </Note>
      {!["learning-friction", "business-impact", "lessons"].includes(view) && (
        <label className={s.search}>
          Example school scope
          <select value={school} onChange={(e) => setSchool(e.target.value)}>
            {["All schools", ...schools].map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      )}
      {view === "overview" && (
        <>
          <Stats
            items={[
              ["Classrooms", rows.length],
              ["Learners", learners],
              ["Instructors", new Set(rows.map((c) => c.instructor)).size],
              ["Schools", new Set(rows.map((c) => c.school)).size],
            ]}
          />
          <div className={s.two}>
            <Panel title="Activity, within the chosen scope">
              <Bar
                label="Submitted this activity"
                value={submitted}
                total={learners}
              />
              <Bar
                label="Reviewed this activity"
                value={reviewed}
                total={learners}
              />
            </Panel>
            <Panel title="Operational questions">
              <Config
                rows={[
                  ["Assignment", "Does every classroom have an instructor?"],
                  ["Capacity", "Are some instructors or groups overloaded?"],
                  ["Lesson runs", "Were started lessons closed correctly?"],
                  [
                    "Definitions",
                    "Inspect the population and date window behind each metric",
                  ],
                ]}
              />
            </Panel>
          </div>
          <Links
            items={[
              ["Inspect lesson runs", "analytics/lessons"],
              ["Find friction", "analytics/learning-friction"],
            ]}
          />
        </>
      )}
      {view === "geography" && (
        <>
          <Panel title="Schools in the fictional program">
            {[...new Set(rows.map((c) => c.school))].map((name) => {
              const matches = rows.filter((c) => c.school === name);
              return (
                <Bar
                  key={name}
                  label={name}
                  value={sum(matches, "learners")}
                  total={66}
                  detail="learners"
                />
              );
            })}
            <Note>
              Northstar School: 2 groups, 46 learners. Cedar School: 1 group, 20
              learners. Regional labels are omitted because the shared sample
              does not assign regions.
            </Note>
          </Panel>
          <ClassroomTable rows={rows} />
        </>
      )}
      {view === "lessons" && (
        <>
          <Stats
            items={[
              ["Example lesson runs", 12],
              ["Ended", 9],
              ["In progress", 2],
              ["Open beyond threshold", 1],
            ]}
          />
          <Panel title="A run has a lifecycle">
            <Flow
              steps={[
                ["Start", "The instructor opens the lesson run."],
                [
                  "Teach",
                  "Activities and submissions occur within its time window.",
                ],
                ["End", "A completed run closes its duration."],
                [
                  "Investigate",
                  "A long-open run is visible as an operational exception.",
                ],
              ]}
            />
          </Panel>
          <Panel title="Selected run examples">
            <Config
              rows={[
                ["Python Lab · Notice the problem", "Ended · 42 minutes"],
                ["Web Studio · Make the idea visible", "In progress"],
                [
                  "Idea Lab · Reflect and revise",
                  "Open beyond 24 hours · needs inspection",
                ],
              ]}
            />
            <Note>
              These three records illustrate the statuses; they are not the
              complete set of 12 sample runs.
            </Note>
          </Panel>
        </>
      )}
      {view === "students" && (
        <>
          <Stats
            items={[
              ["Learners in scope", learners],
              ["Submitted this activity", submitted],
              ["Not yet submitted", learners - submitted],
            ]}
          />
          <Panel title="Read the person’s record">
            <LearnerTable classrooms={rows.map((row) => row.name)} />
          </Panel>
          <Note>
            The native tab additionally calculates return activity, after-hours
            submissions and inactive-student lists. This small sample does not
            model attendance or retention history.
          </Note>
        </>
      )}
      {view === "learning-friction" && (
        <div className={s.lensLayout}>
          <nav className={s.lensList} aria-label="Learning friction lens">
            {lenses.map(([title], i) => (
              <button
                type="button"
                key={title}
                onClick={() => setLens(i)}
                aria-pressed={lens === i}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {title}
              </button>
            ))}
          </nav>
          <Panel title={lenses[lens][0]}>
            <div className={s.signalGraphic} aria-hidden="true">
              {[65, 85, 50, 92, 30, 71, 54].map((height, i) => (
                <span
                  key={i}
                  style={{
                    height: `${height}%`,
                    opacity: i === lens % 7 ? 1 : 0.2,
                  }}
                />
              ))}
            </div>
            <p className={s.largeText}>{lenses[lens][1]}</p>
            <div className={s.insight}>
              <span className={s.kicker}>The next useful question</span>
              <p>{lenses[lens][2]}</p>
            </div>
            <Note>
              The bars are an illustrative visual, not computed analytics. The
              original page provides metric values, denominators and calculation
              disclosures from recorded activity.
            </Note>
          </Panel>
        </div>
      )}
      {view === "business-impact" && (
        <>
          <div className={s.insight}>
            <Badge neutral>Not enough peers for comparison</Badge>
            <h2>Three example instructors are fewer than the required five.</h2>
            <p>
              Raw inputs can be inspected. A normalized peer index should stay
              unavailable until the comparison gates pass.
            </p>
          </div>
          <Stats
            items={[
              ["Sample required submissions", 47],
              ["Sample instruction hours", 4],
              ["Sample instructors", 3],
              ["Submissions / hour", "11.75", "47 ÷ 4; illustrative IER input"],
            ]}
          />
          <Panel title="The comparison gates">
            <Config
              rows={[
                ["Peer instructors", "3 in the example / at least 5 required"],
                [
                  "Scoped instruction hours",
                  "4 in the example / at least 3 required",
                ],
                [
                  "Scoped meaningful submissions",
                  "47 in the example / at least 10 required",
                ],
                [
                  "Comparison context",
                  "Each eligible peer also needs 3 hours and 10 meaningful submissions",
                ],
              ]}
            />
          </Panel>
          <div className={s.cards}>
            {[
              [
                "IER",
                "Instructional Efficiency Ratio",
                "Meaningful submissions per instruction hour.",
              ],
              [
                "VRI",
                "Value Realization Index",
                "An operational ratio using completion and resource use, with a fixed 0.8 engagement-stability factor.",
              ],
              [
                "MIS",
                "Marginal Investment Signal",
                "Required submissions per active learner, divided by scoped instruction hours.",
              ],
              [
                "CoF",
                "Cost of Friction",
                "A model of friction, with explicit input and comparison context.",
              ],
            ].map(([code, title, description]) => (
              <Panel key={code} title={title}>
                <span className={s.metricCode}>{code}</span>
                <p>{description}</p>
              </Panel>
            ))}
          </div>
          <Panel title="Inside the VRI calculation">
            <Config
              rows={[
                [
                  "Completion",
                  "Required submitted versions / required attempts",
                ],
                [
                  "Engagement stability",
                  "Fixed factor: 0.8 in the current calculation",
                ],
                ["Resource use", "Scoped instruction hours / active learners"],
                ["Raw VRI", "Completion × 0.8 / resource use"],
              ]}
            />
            <Note>
              The stability factor is a model assumption. It is not measured
              from this learner sample, and the ratio is not a learning-outcome
              score.
            </Note>
          </Panel>
          <Note>
            These are model-defined operational indicators, not audited revenue,
            measured financial ROI or proof of learning outcomes. The current
            route uses the V3 business-impact service; older financial-card
            manifests describe another presentation.
          </Note>
        </>
      )}
    </>
  );
}

function Reports({ view }: { view: string }) {
  const [selected, setSelected] = useState("All classrooms");
  const rows = demoClassrooms.filter(
    (c) => selected === "All classrooms" || c.name === selected,
  );
  const learners = sum(rows, "learners"),
    submitted = sum(rows, "submitted"),
    reviewed = sum(rows, "reviewed");
  return (
    <>
      <nav className={s.tabs} aria-label="Scoped analytics tabs">
        {[
          ["Overview", "reports"],
          ["Grading", "reports/grading"],
          ["Progress", "reports/progress"],
        ].map(([label, id]) => (
          <Link
            key={id}
            href={adminHref(id)}
            aria-current={view === id ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <label className={s.search}>
        Classroom scope
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {["All classrooms", ...demoClassrooms.map((c) => c.name)].map(
            (name) => (
              <option key={name}>{name}</option>
            ),
          )}
        </select>
      </label>
      {view === "reports" ? (
        <>
          <Stats
            items={[
              ["Classrooms selected", rows.length],
              ["Learners", learners],
              ["Submitted this activity", submitted],
            ]}
          />
          <Panel title="Classroom statistics">
            <ClassroomTable rows={rows} learners />
          </Panel>
          <div className={s.two}>
            <Panel title="Statistics and questionnaires">
              <p>
                The current Overview loads classroom statistics and
                questionnaire panels. Its class picker supports a single class
                or an aggregate view.
              </p>
              <Links
                items={[
                  ["Explore questionnaire analysis", "questionnaires/results"],
                ]}
              />
            </Panel>
            <Panel title="Take the selected view with you">
              <Config
                rows={[
                  ["Statistics", "Excel workbook"],
                  ["Questionnaires", "Excel workbook"],
                  ["Both", "Two workbooks in a ZIP"],
                ]}
              />
              <Note>
                Exports are implemented in Arc; this example does not download
                or access classroom records.
              </Note>
            </Panel>
          </div>
        </>
      ) : view === "reports/grading" ? (
        <>
          <Stats
            items={[
              ["Learners submitted", submitted],
              ["Learners reviewed", reviewed],
              ["Awaiting review", submitted - reviewed],
              [
                "Review coverage",
                `${Math.round((reviewed / Math.max(submitted, 1)) * 100)}%`,
                "For this single-activity example",
              ],
            ]}
          />
          <Panel title="The review gap, by classroom">
            {rows.map((c) => (
              <Bar
                key={c.id}
                label={c.name}
                value={c.reviewed}
                total={c.submitted}
              />
            ))}
          </Panel>
          <Panel title="Review priority examples">
            <Config
              rows={demoLearners
                .filter(
                  (learner) =>
                    rows.some((c) => c.name === learner.classroom) &&
                    learner.submitted > learner.reviewed,
                )
                .map(
                  (learner) =>
                    [learner.name, learner.status] as [string, string],
                )}
            />
            <Note>
              Only selected learner examples in this classroom scope are shown
              here.
            </Note>
            <Note>
              Native reports also show queue-age buckets, review time, revision
              requests, grade distributions and a class-by-lesson grade heatmap.
              Those metrics need version, grade and timestamp data beyond this
              small sample.
            </Note>
          </Panel>
          <Links
            items={[["Inspect the work behind the review", "submissions"]]}
          />
        </>
      ) : (
        <>
          <Stats
            items={[
              ["Learners", learners],
              ["Submitted this activity", submitted],
              ["Not yet submitted", learners - submitted],
              [
                "Submission coverage",
                `${Math.round((submitted / Math.max(learners, 1)) * 100)}%`,
              ],
            ]}
          />
          <Panel title="The progress of each class">
            {rows.map((c) => (
              <Bar
                key={c.id}
                label={c.name}
                value={c.submitted}
                total={c.learners}
              />
            ))}
          </Panel>
          <Panel title="What changes across a lesson">
            <Flow
              steps={[
                ["Started", "A draft records work in progress."],
                [
                  "Submitted",
                  "A committed version enters the review workflow.",
                ],
                ["Reviewed", "Published feedback is attached to that version."],
              ]}
            />
            <Note>
              The real Progress page adds weekly trends, lesson progression,
              student segments and task-type comparisons. Activity and grading
              signals should not be read as causal evidence of learning
              improvement.
            </Note>
          </Panel>
        </>
      )}
    </>
  );
}
function LearnerDetail() {
  const [version, setVersion] = useState("Revision");
  return (
    <>
      <div className={s.banner}>
        <span className={s.kicker}>Scoped learner detail · example</span>
        <strong>{demoStudent.name}</strong>
        <p>
          {demoStudent.classroom} · {demoInstructor.name}
        </p>
      </div>
      <Stats
        items={[
          ["Submitted versions", 7],
          ["Reviewed versions", 6],
          ["Latest state", "Revision submitted"],
        ]}
      />
      <Tabs
        options={["First submission", "Published feedback", "Revision"]}
        value={version}
        onChange={setVersion}
        label="Inspect submission history"
      />
      <Panel
        note="Selected written activity: Explain your reasoning · Decisions & loops. The programming revision is another activity in the same lesson."
        title={
          version === "First submission"
            ? "Version 1 · the first explanation"
            : version === "Published feedback"
              ? "Review of version 1"
              : "Version 2 · a revised explanation"
        }
      >
        <blockquote className={s.answer}>
          {version === "First submission"
            ? "I would check the input, make a decision and show the result."
            : version === "Published feedback"
              ? "Your sequence is clear. Explain what should happen when the input is missing, then revise the decision branch."
              : "First I check whether an input was provided. If it is missing, I ask for it again. Otherwise I evaluate the condition and show the result."}
        </blockquote>
        <Badge>
          {version === "Published feedback"
            ? "Revision requested"
            : version === "Revision"
              ? "Awaiting review"
              : "Submitted"}
        </Badge>
        <Note>
          These short texts are authored fictional examples of Arc’s version and
          review model, not extracted learner work.
        </Note>
      </Panel>
      <Links items={[["Back to school overview", "school-manager"]]} />
    </>
  );
}

const securityTabs = [
  "Overview",
  "Insights",
  "Attacks",
  "Timeline",
  "Developer",
  "Tests",
  "IPs",
  "Settings",
];
function Security() {
  const [tab, setTab] = useState("Overview");
  return (
    <>
      <Tabs
        options={securityTabs}
        value={tab}
        onChange={setTab}
        label="Security console area"
      />
      <Panel
        title={
          tab === "Developer"
            ? "API access and usage"
            : tab === "IPs"
              ? "Address management"
              : `${tab}: source-supported controls`
        }
      >
        {tab === "Overview" ? (
          <>
            <Flow
              steps={[
                ["Observe", "Events, types, severity and timing."],
                ["Investigate", "Request details and contextual patterns."],
                ["Configure", "Explicit rules and access boundaries."],
              ]}
            />
            <Note>
              No live security telemetry is connected. No incident counts or
              protection guarantees are inferred from the presence of these
              controls.
            </Note>
          </>
        ) : tab === "Developer" ? (
          <>
            <Config
              rows={[
                ["Token lifecycle", "Create · renew · revoke · remove"],
                [
                  "Permission scopes",
                  "Questionnaire, response and other API families",
                ],
                [
                  "Binding modes",
                  "Unrestricted, single address or multiple addresses",
                ],
                [
                  "Usage context",
                  "Endpoint, result, duration and recognized-token history",
                ],
              ]}
            />
            <div className={s.code}>
              GET /api/v1/ping
              <br />
              GET /api/v1/questionnaires
              <br />
              <span>Authorization: not connected in this explorer</span>
            </div>
            <Note>
              The actual token list is a JSON endpoint used by the developer
              tab. No token is displayed or issued here.
            </Note>
          </>
        ) : tab === "Settings" ? (
          <Config
            rows={[
              ["API access", "Enable/disable configuration"],
              ["Rate limits", "Configurable request limits"],
              ["Detection", "Selected attack-pattern categories"],
              ["Response headers", "Configurable browser protections"],
              ["Logging", "Event-recording settings"],
            ]}
          />
        ) : tab === "IPs" ? (
          <Config
            rows={[
              ["Activity", "Inspect addresses represented in recorded events"],
              ["Block list", "Time-bounded blocks and explicit unblocking"],
              ["Allow list", "API access exceptions"],
              [
                "Current example",
                "No real addresses or access rules are loaded",
              ],
            ]}
          />
        ) : tab === "Tests" ? (
          <>
            <Config
              rows={[
                ["Suite selection", "Security and portal-health categories"],
                ["Execution state", "Queued, running, completed or cancelled"],
                [
                  "Inspection",
                  "Live output, results, history and version context",
                ],
              ]}
            />
            <Links items={[["Quality and demo tools", "quality"]]} />
          </>
        ) : (
          <>
            <Config
              rows={
                tab === "Insights"
                  ? [
                      [
                        "Patterns",
                        "Grouped event behavior and recommendations",
                      ],
                      [
                        "Context",
                        "Period, selected filters and supporting event details",
                      ],
                      [
                        "Interpretation",
                        "A prompt for investigation, not a security certification",
                      ],
                    ]
                  : tab === "Attacks"
                    ? [
                        ["Filters", "Attack type, severity and period"],
                        [
                          "Event row",
                          "Time, category, description, method and resolution state",
                        ],
                        [
                          "Detail",
                          "Recorded request metadata and technical context",
                        ],
                      ]
                    : [
                        ["Ordering", "Newest recorded events first"],
                        ["Inspection", "Event type, timestamp and details"],
                        ["Example state", "No live events are connected"],
                      ]
              }
            />
            <Note>
              The original system records operational data. This explorer
              presents the available inspection model without publishing logs or
              request metadata.
            </Note>
          </>
        )}
      </Panel>
    </>
  );
}
function Integrations() {
  return (
    <>
      <div className={s.cards}>
        <Panel title="Browser Coder">
          <span className={s.metricCode}>&gt;_</span>
          <p>
            Run and inspect programming work while Arc retains the lesson and
            assignment context.
          </p>
          <Link className={s.textLink} href="/work/browser-coder">
            Explore Browser Coder ↗
          </Link>
        </Panel>
        <Panel title="Arc Gaming">
          <span className={s.metricCode}>◇</span>
          <p>
            Selected games connect to class assignments, roster provisioning and
            a scoped launch.
          </p>
          <Note>
            Source-supported integration. No external game is launched here.
          </Note>
        </Panel>
        <Panel title="Developer access">
          <span className={s.metricCode}>{"{ }"}</span>
          <p>
            API documentation and permission-scoped tokens support external
            integration workflows.
          </p>
          <Links items={[["Inspect the API controls", "security"]]} />
        </Panel>
      </div>
      <Config
        rows={[
          ["Connection settings", "Owned by the platform administrator"],
          [
            "Assignment",
            "Classroom, selected task and timing are part of the launch context",
          ],
          [
            "In this explorer",
            "No credentials, external service calls or writable connection fields",
          ],
        ]}
      />
    </>
  );
}
function Quality() {
  return (
    <>
      <div className={s.two}>
        <Panel title="Inspect a test run">
          <Flow
            steps={[
              ["Select", "Choose the configured suite."],
              ["Follow", "Read queued/running status and output."],
              ["Review", "Inspect results and run history."],
            ]}
          />
          <Note>No fresh test-pass result is claimed by this preview.</Note>
        </Panel>
        <Panel title="Prepare synthetic demonstrations">
          <Config
            rows={[
              [
                "Provision",
                "Generate a predictable fictional learning environment",
              ],
              [
                "Inspect",
                "Review classrooms, instructors, sample work and system users",
              ],
              ["Access", "Refresh demo links and export an account summary"],
              [
                "Cleanup",
                "Original admin tools include destructive fixture cleanup",
              ],
            ]}
          />
          <Note>
            No provisioning, account access or cleanup action is available here.
          </Note>
        </Panel>
      </div>
      <Links items={[["Platform documentation", "documentation"]]} />
    </>
  );
}
function Documentation() {
  return (
    <>
      <div className={s.cards}>
        {[
          ["Admin", "Classrooms, people, content and operations"],
          ["Instructor", "Teaching, classroom state and review"],
          ["Student", "Activities, work history and themes"],
          ["Curriculum", "Packs, material reuse and teaching preparation"],
          ["Questionnaires", "Scoring, profiles and response analysis"],
          ["Analytics", "Program activity, friction and reporting"],
          ["Security", "Events, access and administration"],
          ["Deployment", "Application delivery and environment boundaries"],
          ["Developer API", "Contracts, scopes and external integrations"],
        ].map(([title, description]) => (
          <Panel key={title} title={title}>
            <p>{description}</p>
          </Panel>
        ))}
      </div>
      <Note>
        The original all-platform hub is /documentation. Its older cards include
        superseded theme, activity and endpoint counts. This explorer follows
        current source routes and implementations instead of repeating those
        totals.
      </Note>
    </>
  );
}

function AdminPage({ pageId }: { pageId: string }) {
  if (pageId.startsWith("classrooms/"))
    return <ClassroomDetail id={pageId.split("/")[1]} />;
  if (pageId.startsWith("analytics/"))
    return <Analytics view={pageId.split("/")[1]} />;
  if (pageId === "reports" || pageId.startsWith("reports/"))
    return <Reports view={pageId} />;
  if (pageId.startsWith("questionnaires/"))
    return <Questionnaires view={pageId.split("/")[1]} />;
  switch (pageId) {
    case "overview":
      return <Overview />;
    case "classrooms":
      return <Classrooms />;
    case "instructors":
      return <Instructors />;
    case "access":
      return <Access />;
    case "imports":
      return <Imports />;
    case "account-merge":
      return <Merge />;
    case "content-packs":
      return <Curriculum />;
    case "content-packs/lesson":
      return <Curriculum lesson />;
    case "builder":
      return <Curriculum builder />;
    case "builder/coverage":
      return <Curriculum coverage />;
    case "questionnaires":
      return <Questionnaires />;
    case "submissions":
      return <Submissions />;
    case "school-manager":
      return <Classrooms manager />;
    case "school-manager/learner":
      return <LearnerDetail />;
    case "security":
      return <Security />;
    case "integrations":
      return <Integrations />;
    case "quality":
      return <Quality />;
    case "documentation":
      return <Documentation />;
    default:
      return <Overview />;
  }
}
export function AdminPortalView({ pageId }: { pageId: string }) {
  return (
    <div className={s.root}>
      <AdminPage key={pageId} pageId={pageId} />
    </div>
  );
}
