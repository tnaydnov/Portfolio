"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { arcExplorerHref } from "@/content/arc-explorer/types";
import {
  demoInstructor,
  demoLearners,
  demoProgram,
  demoStudent,
} from "@/content/arc-explorer/demo-data";
import styles from "./instructor-portal.module.css";

const learners = demoLearners.filter(
  (person) => person.classroom === "Python Lab",
);
const lessonTitle = "Decisions & loops";
const taskTitle = "A helpful study planner";
const code = {
  revised: `def study_plan(minutes):\n    if minutes <= 0:\n        return "Start with a small goal."\n\n    sessions = []\n    while minutes > 0:\n        block = min(minutes, 25)\n        sessions.append(block)\n        minutes -= block\n\n    return sessions\n\nprint(study_plan(60))`,
  first: `def study_plan(minutes):\n    sessions = []\n    while minutes > 0:\n        sessions.append(25)\n        minutes -= 25\n\n    return sessions\n\nprint(study_plan(60))`,
  starter: `# Build a study plan in short blocks.\n# What happens when minutes is zero?\n\ndef study_plan(minutes):\n    # Your lesson workspace starts here.\n    pass`,
  personal: `# Maya's reusable classroom examples\n\ndef describe(value):\n    return f"{value!r} is a {type(value).__name__}"\n\nexamples = [25, "hello", True, [1, 2]]\nfor example in examples:\n    print(describe(example))`,
};

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warm";
}) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
function Jump({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className={styles.jump} href={arcExplorerHref("instructor", to)}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
function Panel({
  title,
  eyebrow,
  children,
  className = "",
}: {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.panel} ${className}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
function Metrics({ items }: { items: [string, string, string?][] }) {
  return (
    <div className={styles.metrics}>
      {items.map(([value, label, detail]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
          {detail && <small>{detail}</small>}
        </div>
      ))}
    </div>
  );
}
function Note({ children }: { children: ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}
function Person({
  name,
  initials,
  detail,
}: {
  name: string;
  initials: string;
  detail?: string;
}) {
  return (
    <span className={styles.person}>
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
      <span>
        <strong>{name}</strong>
        {detail && <small>{detail}</small>}
      </span>
    </span>
  );
}
function Choices({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.choices} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          type="button"
          aria-pressed={option.id === value}
          onClick={() => onChange(option.id)}
          key={option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
function CodeView({ source, label }: { source: string; label: string }) {
  return (
    <div className={styles.code} role="region" aria-label={label} tabIndex={0}>
      <pre>
        <code>{source}</code>
      </pre>
    </div>
  );
}
function TableBox({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      className={styles.tableBox}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

function Overview() {
  return (
    <div className={styles.stack}>
      <section className={styles.desk}>
        <div>
          <p className={styles.eyebrow}>
            {demoProgram.name} · {demoProgram.term}
          </p>
          <h2>
            Good teaching starts
            <br />
            with a little context.
          </h2>
          <Person
            name={demoInstructor.name}
            initials={demoInstructor.initials}
            detail="Instructor · fictional workspace"
          />
        </div>
        <div className={styles.lessonCard}>
          <Badge tone="accent">Current classroom lesson</Badge>
          <span className={styles.lessonNumber} aria-hidden="true">
            02
          </span>
          <h3>{lessonTitle}</h3>
          <p>Python Lab · 24 learners</p>
          <Jump to="classroom">Open classroom hub</Jump>
        </div>
      </section>
      <Metrics
        items={[
          ["24", "Learners", "Python Lab"],
          ["18", "Submitted", "Current activity"],
          ["14", "Reviewed", "Published feedback"],
          ["4", "Awaiting review", "Submitted work"],
        ]}
      />
      <div className={styles.twoCol}>
        <Panel eyebrow="Next useful response" title="A revision is ready.">
          <Person
            name={demoStudent.name}
            initials={demoStudent.initials}
            detail={`${taskTitle} · version 2`}
          />
          <blockquote>
            “I changed the last block so it only uses the minutes left.”
          </blockquote>
          <Jump to="reviews/submission">Compare Jordan’s versions</Jump>
        </Panel>
        <Panel eyebrow="Inside the lesson" title="Prepare. Teach. Notice.">
          <div className={styles.linkList}>
            <Jump to="materials">Teaching plan & materials</Jump>
            <Jump to="sessions">Six live activity formats</Jump>
            <Jump to="support">Help requests & recent activity</Jump>
            <Jump to="insights">Participation & revision patterns</Jump>
          </div>
        </Panel>
      </div>
      <Note>
        All people, work and figures in this explorer are fictional. The
        original product’s screens and recorded behavior are available in the
        evidence section.
      </Note>
    </div>
  );
}

const lessons = [
  {
    number: "01",
    name: "Start with a question",
    status: "Finished",
    items: ["A learning goal", "Reflect on your approach", "My learning board"],
  },
  {
    number: "02",
    name: lessonTitle,
    status: "Active lesson",
    items: ["Read a decision", taskTitle, "Explain your reasoning"],
  },
  {
    number: "03",
    name: "Build it together",
    status: "Available",
    items: ["A shared plan", "Make the connections", "What changed?"],
  },
];
function Classroom() {
  const [selected, setSelected] = useState("02");
  const active = lessons.find((lesson) => lesson.number === selected)!;
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <Person
          name="Python Lab"
          initials="PL"
          detail="Northstar School · Maya Reed"
        />
        <div>
          <Badge tone="accent">24 learners</Badge>
          <span className={styles.entryCode}>
            Sample entry code <b>PY-24</b>
          </span>
        </div>
      </div>
      <div className={styles.hub}>
        <nav className={styles.lessonTree} aria-label="Inspect a lesson">
          {lessons.map((lesson) => (
            <button
              type="button"
              key={lesson.number}
              onClick={() => setSelected(lesson.number)}
              aria-pressed={selected === lesson.number}
            >
              <span>{lesson.number}</span>
              <strong>
                {lesson.name}
                <small>{lesson.status} · 3 activities</small>
              </strong>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </nav>
        <Panel
          eyebrow={`Python foundations · Lesson ${active.number}`}
          title={active.name}
        >
          <Badge tone={selected === "02" ? "accent" : "neutral"}>
            {active.status}
          </Badge>
          <ol className={styles.activityList}>
            {active.items.map((item, index) => (
              <li key={item}>
                <span className={styles.activityIndex}>{index + 1}</span>
                <div>
                  <strong>{item}</strong>
                  <small>
                    {index === 1
                      ? "Programming · instructor review"
                      : index === 0
                        ? "Guided activity · mini-lesson"
                        : "Reflection · written response"}
                  </small>
                </div>
                <Badge>
                  {selected === "03" || (selected === "02" && index === 2)
                    ? "Locked"
                    : "Open"}
                </Badge>
              </li>
            ))}
          </ol>
          <div className={styles.actionLinks}>
            {selected === "02" ? (
              <>
                <Jump to="classroom/lesson">Inspect lesson resources</Jump>
                <Jump to="classroom/activity">Inspect activity & work</Jump>
              </>
            ) : (
              <Jump to="classroom/lesson">
                Explore the Decisions &amp; loops example
              </Jump>
            )}
          </div>
        </Panel>
      </div>
      <div className={styles.twoCol}>
        <Panel title="A lesson is one gate. An activity is another.">
          <p>
            Opening a lesson does not release all its activities. Locking the
            lesson locks its activities too; releasing an individual activity
            opens its lesson.
          </p>
          <div className={styles.stateFlow}>
            <Badge tone="accent">Lesson open</Badge>
            <span aria-hidden="true">→</span>
            <Badge>Activities released individually</Badge>
          </div>
        </Panel>
        <Panel title="Finished does not mean gone.">
          <p>
            Completed lessons remain inspectable in the classroom tree. The
            instructor can return to their materials and student work.
          </p>
          <Jump to="grades">Open the classroom gradebook</Jump>
        </Panel>
      </div>
    </div>
  );
}

function Lesson() {
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <span className={styles.breadcrumb}>
          Python foundations / Lesson 02
        </span>
        <Badge tone="accent">Active · sample state</Badge>
      </div>
      <div className={styles.twoCol}>
        <Panel
          eyebrow="Teaching intention"
          title="Make a decision. Repeat it carefully."
        >
          <p>
            Use conditions to handle an edge case, then build a loop that stops
            at the right time.
          </p>
          <ol className={styles.agenda}>
            <li>
              <span>05 min</span>
              <div>
                <strong>Predict before running</strong>
                <p>Trace a small condition together.</p>
              </div>
            </li>
            <li>
              <span>20 min</span>
              <div>
                <strong>Build a helpful study planner</strong>
                <p>Turn 60 minutes into useful blocks.</p>
              </div>
            </li>
            <li>
              <span>10 min</span>
              <div>
                <strong>Explain an edge case</strong>
                <p>Compare zero, negative and uneven inputs.</p>
              </div>
            </li>
          </ol>
          <Note>This teaching plan is fictional sample content.</Note>
        </Panel>
        <Panel
          eyebrow="Ready beside the activity"
          title="Materials with a purpose."
        >
          <div className={styles.resourceRows}>
            <Jump to="presentation">Presentation · 3 sample slides</Jump>
            <Jump to="materials">Lesson plan & instructor notes</Jump>
            <Jump to="materials">Student handout · shared file</Jump>
            <Jump to="workspace">Personal programming workspace</Jump>
          </div>
          <div className={styles.callout}>
            <strong>Mini-lesson available</strong>
            <p>
              A task can carry its own teaching content as well as the lesson’s
              shared resources.
            </p>
          </div>
        </Panel>
      </div>
      <Panel title="Activities in this lesson">
        <ol className={styles.activityList}>
          {lessons[1].items.map((name, index) => (
            <li key={name}>
              <span className={styles.activityIndex}>{index + 1}</span>
              <div>
                <strong>{name}</strong>
                <small>
                  {index === 1
                    ? "18 submitted · 14 reviewed"
                    : index === 0
                      ? "Guided introduction"
                      : "Written reflection"}
                </small>
              </div>
              <Badge tone={index < 2 ? "accent" : "neutral"}>
                {index < 2 ? "Open" : "Locked"}
              </Badge>
            </li>
          ))}
        </ol>
        <Jump to="classroom/activity">Open programming activity</Jump>
      </Panel>
    </div>
  );
}

function Activity() {
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <span className={styles.breadcrumb}>
          Lesson 02 / Programming activity
        </span>
        <div>
          <Badge tone="accent">Open to learners</Badge>
          <Badge>Solution hidden</Badge>
        </div>
      </div>
      <Panel eyebrow="Activity instructions" title={taskTitle}>
        <p>
          Build a function that splits a study session into blocks of at most 25
          minutes. Make the final block fit the time left, and explain how you
          handle a non-positive input.
        </p>
        <div className={styles.stateFlow}>
          <Badge>Python</Badge>
          <Badge>Instructor review</Badge>
          <Badge>100-point maximum</Badge>
          <Badge>Mini-lesson attached</Badge>
        </div>
      </Panel>
      <Metrics
        items={[
          ["18 / 24", "Submitted"],
          ["14", "Published reviews"],
          ["3", "Draft-only learners"],
          ["2", "Revisions submitted"],
        ]}
      />
      <Panel title="Different states, clearly separated">
        <LearnerTable detailed />
        <Note>
          Three example rows from a fictional 24-person classroom. A newer draft
          does not replace the latest submitted version in the review queue.
        </Note>
      </Panel>
      <div className={styles.twoCol}>
        <Panel title="The student’s view, safely previewed.">
          <p>
            The product can open the activity in its student-facing viewer with
            an unsaved preview submission. It does not create real student work.
          </p>
          <Jump to="reviews/submission">
            Inspect an actual work-shaped example
          </Jump>
        </Panel>
        <Panel title="Tools follow the activity type.">
          <p>
            Programming work, collaborative flowcharts and live activities have
            distinct views. Integrated game activities can also show external
            game progress when that service is connected.
          </p>
          <Jump to="sessions">Compare the live activity boards</Jump>
        </Panel>
      </div>
    </div>
  );
}

function LearnerTable({
  detailed = false,
  filter = "",
}: {
  detailed?: boolean;
  filter?: string;
}) {
  const rows = learners.filter((person) =>
    `${person.name} ${person.status}`
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );
  return (
    <TableBox label="Example Python Lab learners">
      <table>
        <thead>
          <tr>
            <th scope="col">Learner</th>
            <th scope="col">Current state</th>
            <th scope="col">{detailed ? "Version" : "Learning history"}</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((person, index) => (
            <tr key={person.name}>
              <th scope="row">
                <Person name={person.name} initials={person.initials} />
              </th>
              <td>
                <Badge tone={index === 0 ? "accent" : "neutral"}>
                  {person.status}
                </Badge>
              </td>
              <td>
                {detailed
                  ? index === 0
                    ? "v2 · submitted"
                    : index === 1
                      ? "v1 · submitted"
                      : "Unsubmitted draft"
                  : `${person.submitted} submitted · ${person.reviewed} reviewed`}
              </td>
              <td>
                {index === 0 ? (
                  <Link
                    href={arcExplorerHref(
                      "instructor",
                      detailed ? "reviews/submission" : "learners/jordan",
                    )}
                  >
                    View {detailed ? "work" : "profile"}
                    <span className={styles.srOnly}> for Jordan Lee</span>
                  </Link>
                ) : (
                  <span className={styles.muted}>Example row</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && (
        <p className={styles.empty}>No example learners match this search.</p>
      )}
    </TableBox>
  );
}
function Learners() {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <Person
          name="Python Lab"
          initials="PL"
          detail="Assigned to Maya Reed"
        />
        <Badge>Showing 3 example learners of 24</Badge>
      </div>
      <Panel>
        <label className={styles.search}>
          Find a learner
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search names or current states"
          />
        </label>
        <LearnerTable filter={query} />
      </Panel>
      <Panel title="A learner’s work stays in classroom context.">
        <p>
          Student detail connects task submissions, version history and reviews.
          Instructor student searches are restricted to their assigned
          classrooms.
        </p>
        <Jump to="learners/jordan">Follow Jordan’s learning history</Jump>
      </Panel>
    </div>
  );
}
function LearnerProfile() {
  return (
    <div className={styles.stack}>
      <div className={styles.profileHeader}>
        <Person
          name={demoStudent.name}
          initials={demoStudent.initials}
          detail="Python Lab · Northstar School"
        />
        <Badge tone="accent">Revision submitted</Badge>
      </div>
      <Metrics
        items={[
          ["7", "Activities submitted"],
          ["6", "Reviewed"],
          ["v2", "Latest planner submission"],
        ]}
      />
      <Panel title="One improvement, with its history">
        <ol className={styles.timeline}>
          <li>
            <span className={styles.timelineDot} />
            <div>
              <small>Monday · First submission</small>
              <h3>Three blocks of 25 minutes</h3>
              <p>
                The loop stopped, but a 60-minute plan contained 75 minutes.
              </p>
            </div>
          </li>
          <li>
            <span className={styles.timelineDot} />
            <div>
              <small>Tuesday · Published feedback</small>
              <h3>Keep the final block within the time left.</h3>
              <p>
                Maya requested a revision and asked Jordan to test zero and
                negative inputs too.
              </p>
            </div>
          </li>
          <li>
            <span className={styles.timelineDot} />
            <div>
              <small>Wednesday · Version 2 submitted</small>
              <h3>A smaller final block, and a clear edge case.</h3>
              <p>The latest version is ready for a new instructor review.</p>
              <Jump to="reviews/submission">Inspect both versions</Jump>
            </div>
          </li>
        </ol>
      </Panel>
      <Panel title="Recent learning history">
        <div className={styles.historyRows}>
          {[
            ["A learning goal", "Reflection", "Feedback published"],
            ["First Python steps", "Programming", "Feedback published"],
            [taskTitle, "Programming", "Revision submitted"],
          ].map(([name, type, state]) => (
            <div key={name}>
              <span>
                <strong>{name}</strong>
                <small>{type}</small>
              </span>
              <Badge>{state}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
function Reviews() {
  const [filter, setFilter] = useState("all");
  const items = [
    {
      name: "Jordan Lee",
      initials: "JL",
      title: taskTitle,
      kind: "revision",
      detail: "Version 2 · previous revision request",
      link: true,
    },
    {
      name: "Liam Chen",
      initials: "LC",
      title: taskTitle,
      kind: "first",
      detail: "Version 1 · first submission",
      link: false,
    },
  ];
  return (
    <div className={styles.stack}>
      <Metrics
        items={[
          ["4", "Awaiting published review", "Across the current activity"],
          ["2", "Example submissions", "Shown below"],
          ["1", "Revision in this excerpt"],
        ]}
      />
      <Panel title="Latest submitted work">
        <Choices
          label="Filter example reviews"
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All examples" },
            { id: "revision", label: "Revisions" },
            { id: "first", label: "First submissions" },
          ]}
        />
        <div className={styles.reviewRows}>
          {items
            .filter((item) => filter === "all" || item.kind === filter)
            .map((item) => (
              <article key={item.name}>
                <Person
                  name={item.name}
                  initials={item.initials}
                  detail={item.detail}
                />
                <h3>{item.title}</h3>
                {item.link ? (
                  <Jump to="reviews/submission">Open revision review</Jump>
                ) : (
                  <Badge>Awaiting published feedback</Badge>
                )}
              </article>
            ))}
        </div>
      </Panel>
      <div className={styles.twoCol}>
        <Panel title="Draft feedback is still a draft.">
          <p>
            A saved review can remain unpublished. Publishing feedback is an
            explicit step, and a revision request records why the learner should
            return.
          </p>
        </Panel>
        <Panel title="Empty work needs a different response.">
          <p>
            The product allows feedback or a revision request for empty work,
            while preventing a numeric or rubric grade from being applied to it.
          </p>
        </Panel>
      </div>
    </div>
  );
}
function SubmissionReview() {
  const [version, setVersion] = useState("2");
  const [reviewTab, setReviewTab] = useState("feedback");
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <Person
          name={demoStudent.name}
          initials={demoStudent.initials}
          detail={taskTitle}
        />
        <Badge tone={version === "2" ? "accent" : "warm"}>
          {version === "2"
            ? "Revision submitted · awaiting review"
            : "Revision requested"}
        </Badge>
      </div>
      <div className={styles.reviewLayout}>
        <Panel eyebrow="Original work-shaped sample" title="study_planner.py">
          <Choices
            label="Inspect submission version"
            value={version}
            onChange={setVersion}
            options={[
              { id: "1", label: "Version 1" },
              { id: "2", label: "Version 2 · latest" },
            ]}
          />
          <CodeView
            source={version === "2" ? code.revised : code.first}
            label={`Jordan's fictional version ${version} Python source`}
          />
          <div className={styles.codeCaption}>
            <strong>Learner’s explanation</strong>
            <p>
              {version === "2"
                ? "I use the smaller of the remaining time and 25 minutes. I also return a helpful message when there is no time to plan."
                : "I subtract 25 each time until the minutes run out."}
            </p>
          </div>
        </Panel>
        <Panel
          eyebrow={
            version === "2"
              ? "Earlier published review · version 1"
              : "Published review · version 1"
          }
          title="A specific next step"
        >
          <Choices
            label="Inspect review details"
            value={reviewTab}
            onChange={setReviewTab}
            options={[
              { id: "feedback", label: "Feedback" },
              { id: "rubric", label: "Rubric" },
              { id: "signals", label: "Star criteria" },
            ]}
          />
          {reviewTab === "feedback" ? (
            <>
              <Badge tone="warm">Revision requested</Badge>
              <blockquote>
                Your loop is easy to follow. For 60 minutes, check the total
                time in the returned list. Can the last block use only the
                minutes left?
              </blockquote>
              <div className={styles.callout}>
                <strong>Revision note</strong>
                <p>
                  Keep every block within the remaining time. Test 0, −5 and 60
                  minutes, then explain your choices.
                </p>
              </div>
              <Note>
                Version 2 has not been reviewed in this example. The published
                note above belongs to version 1.
              </Note>
            </>
          ) : reviewTab === "rubric" ? (
            <>
              <div className={styles.rubric}>
                {[
                  [
                    "Reasoning",
                    "30 / 40",
                    "Loop structure 20/20 · edge cases 10/20",
                  ],
                  [
                    "Correctness",
                    "20 / 40",
                    "Termination 15/15 · time allocation 5/25",
                  ],
                  [
                    "Explanation",
                    "15 / 20",
                    "Clear intent; missing edge-case discussion",
                  ],
                ].map(([label, score, detail]) => (
                  <div key={label}>
                    <strong>{label}</strong>
                    <b>{score}</b>
                    <small>{detail}</small>
                  </div>
                ))}
              </div>
              <div className={styles.total}>
                <span>Version 1 rubric total</span>
                <strong>65 / 100</strong>
              </div>
              <Note>
                Illustrative rubric with subcriteria. Real task review settings
                determine the available criteria and maximum score.
              </Note>
            </>
          ) : (
            <>
              <div className={styles.ratingRows}>
                {[
                  ["Creativity", 8],
                  ["Task understanding", 7],
                  ["Completion", 6],
                  ["General", 7],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <meter
                      min={1}
                      max={10}
                      value={Number(value)}
                      aria-label={`${label}: ${value} out of 10`}
                    />
                    <b>{value}/10</b>
                  </div>
                ))}
              </div>
              <Note>
                Optional 1–10 criteria are separate from the numeric or rubric
                grade. These example ratings belong to the earlier review.
              </Note>
            </>
          )}
        </Panel>
      </div>
      <details className={styles.details}>
        <summary>How optional AI assistance fits this workflow</summary>
        <p>
          The source includes a feedback-refinement endpoint that accepts an
          instructor’s draft, the task title and type, and a language. It
          returns a suggestion; the instructor remains responsible for the
          review. No model call or generated assessment runs in this explorer.
        </p>
      </details>
    </div>
  );
}

function Grades() {
  const [view, setView] = useState("scores");
  const rows = [
    {
      name: "Jordan Lee",
      scores: ["88", "92", "—"],
      states: ["Published", "Published", "Version 2 awaiting review"],
    },
    {
      name: "Liam Chen",
      scores: ["91", "86", "—"],
      states: ["Published", "Published", "Awaiting review"],
    },
    {
      name: "Avery Morgan",
      scores: ["84", "79", "—"],
      states: ["Published", "Published", "Draft only"],
    },
  ];
  return (
    <div className={styles.stack}>
      <Panel
        eyebrow="Python Lab · sample excerpt"
        title="Read across a learner. Down an activity."
      >
        <Choices
          label="Gradebook display"
          value={view}
          onChange={setView}
          options={[
            { id: "scores", label: "Scores & state" },
            { id: "states", label: "Review states" },
          ]}
        />
        <TableBox label="Example classroom grade matrix">
          <table className={styles.gradeTable}>
            <thead>
              <tr>
                <th scope="col">Learner</th>
                <th scope="col">Learning goal</th>
                <th scope="col">First Python steps</th>
                <th scope="col">Study planner · latest</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  {row.scores.map((score, col) => (
                    <td key={col}>
                      {view === "scores" && <strong>{score}</strong>}
                      <small
                        className={col === 2 ? styles.gradePending : undefined}
                      >
                        {row.states[col]}
                      </small>
                      {index === 0 && col === 2 && (
                        <Link
                          href={arcExplorerHref(
                            "instructor",
                            "reviews/submission",
                          )}
                        >
                          View revision history
                        </Link>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableBox>
        <Note>
          Jordan’s latest version 2 is awaiting review. The earlier 65/100
          review remains available through the revision history; it is not a
          grade for version 2. A missing grade is not a zero.
        </Note>
      </Panel>
      <div className={styles.twoCol}>
        <Panel title="Latest submitted versions matter.">
          <p>
            The product builds the classroom matrix from submitted work. A later
            draft and an earlier submitted version are not interchangeable.
          </p>
        </Panel>
        <Panel title="An average needs a definition.">
          <p>
            The source distinguishes available grades, published reviews and
            settled published reviews. Publication and revision state belong
            beside the numbers.
          </p>
          <Jump to="insights">Explore lesson-level patterns</Jump>
        </Panel>
      </div>
    </div>
  );
}

function Insights() {
  const [group, setGroup] = useState("lesson");
  const data =
    group === "lesson"
      ? [
          { label: "Start with a question", value: 92, grade: 88 },
          { label: lessonTitle, value: 75, grade: 81 },
          { label: "Build it together", value: 0, grade: 0 },
        ]
      : [
          { label: "September", value: 75, grade: 81 },
          { label: "October", value: 83, grade: 84 },
          { label: "November", value: 88, grade: 87 },
        ];
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <span>Python Lab · fictional reporting example</span>
        <Choices
          label="Inspect reporting grouping"
          value={group}
          onChange={setGroup}
          options={[
            { id: "lesson", label: "By lesson" },
            { id: "month", label: "By month" },
          ]}
        />
      </div>
      <Metrics
        items={[
          ["21 / 24", "Participated", "Non-empty work or drafts"],
          ["18 / 24", "Submitted", "Current activity"],
          ["14 / 18", "Published reviews"],
          [
            "2 / 3",
            "Revision follow-through",
            "New submissions after a request",
          ],
        ]}
      />
      <div className={styles.twoCol}>
        <Panel title="Submission completion">
          <div className={styles.barChart}>
            {data.map((row) => (
              <div key={row.label}>
                <div>
                  <span>{row.label}</span>
                  <strong>{row.value}%</strong>
                </div>
                <div className={styles.track}>
                  <span style={{ width: `${row.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Note>
            {group === "lesson"
              ? "The third lesson is not open in this sample. Its zero completion is context, not a judgment."
              : "A separate fictional month-grouping example, rather than live or current reporting."}
          </Note>
        </Panel>
        <Panel title="Activity types ask different things.">
          <div className={styles.typeRows}>
            {[
              ["Programming", "Trace, write, explain", "3 activities"],
              ["Reflection", "Notice a change", "2 activities"],
              ["Live activities", "Think with the class", "2 activities"],
              ["Peer review", "Give a useful response", "1 activity"],
            ].map(([label, purpose, count]) => (
              <div key={label}>
                <span>
                  <strong>{label}</strong>
                  <small>{purpose}</small>
                </span>
                <Badge>{count}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="A number can lead back to a person.">
        <p>
          The product supports date, lesson, learner and activity-type filters,
          with lesson/task and student-level drilldowns. Empty submissions are
          excluded from these participation calculations.
        </p>
        <Jump to="learners/jordan">
          Inspect the revision behind one sample signal
        </Jump>
      </Panel>
    </div>
  );
}

const materialOptions = [
  { id: "plan", label: "Lesson plan" },
  { id: "notes", label: "Teaching notes" },
  { id: "handout", label: "Student handout" },
];
function Materials() {
  const [file, setFile] = useState("plan");
  return (
    <div className={styles.stack}>
      <Panel>
        <Choices
          label="Inspect lesson material"
          value={file}
          onChange={setFile}
          options={materialOptions}
        />
        <div className={styles.document}>
          <div className={styles.documentHeader}>
            <span>
              {file === "handout"
                ? "PYTHON LAB · STUDENT HANDOUT"
                : "PYTHON LAB · TEACHING RESOURCE"}
            </span>
            <Badge tone={file === "handout" ? "accent" : "neutral"}>
              {file === "handout" ? "Shared · visible" : "Instructor only"}
            </Badge>
          </div>
          <p className={styles.eyebrow}>Lesson 02</p>
          <h2>
            {file === "plan"
              ? "From a condition to a useful loop."
              : file === "notes"
                ? "Listen for the reasoning."
                : "Make a plan that fits."}
          </h2>
          {file === "plan" ? (
            <>
              <p>
                Learning intention: split a duration into bounded blocks and
                explain the stopping condition.
              </p>
              <h3>Before class</h3>
              <ul>
                <li>Open the lesson presentation and the starter code.</li>
                <li>
                  Keep the final reflection activity locked until the
                  discussion.
                </li>
                <li>Prepare examples for 0, 25 and 60 minutes.</li>
              </ul>
              <h3>Evidence to notice</h3>
              <p>
                Does the learner connect the loop condition, the changing
                variable and the size of the final block?
              </p>
            </>
          ) : file === "notes" ? (
            <>
              <blockquote>
                “What changes every time this loop repeats?”
              </blockquote>
              <h3>If the learner gets stuck</h3>
              <p>
                Trace one iteration on paper. Name the remaining time before
                writing another line of code.
              </p>
              <h3>A productive edge case</h3>
              <p>
                Compare a plan for 50 minutes with a plan for 60 minutes. Ask
                why the last block should be different.
              </p>
              <h3>Close the lesson</h3>
              <p>
                Ask the class to explain one change they made and the input that
                revealed it.
              </p>
            </>
          ) : (
            <>
              <p>
                You have 60 minutes. Study in blocks no longer than 25 minutes.
              </p>
              <div className={styles.blocks}>
                <span>25 min</span>
                <span>25 min</span>
                <span>10 min</span>
              </div>
              <h3>Three things to explain</h3>
              <ol>
                <li>How do you choose the length of a block?</li>
                <li>How do you know when to stop?</li>
                <li>What should happen when there are no minutes to plan?</li>
              </ol>
              <div className={styles.callout}>
                <strong>Try these inputs</strong>
                <p>
                  <code>0 &nbsp; −5 &nbsp; 25 &nbsp; 60</code>
                </p>
              </div>
            </>
          )}
          <small className={styles.documentFooter}>
            Fictional teaching material · read-only explorer
          </small>
        </div>
      </Panel>
      <Note>
        The original product also supports attached files and native PDF, image,
        video, audio and text previews. Some office documents use external
        viewers; none are loaded in this sample.
      </Note>
    </div>
  );
}
function Workspace() {
  const [file, setFile] = useState("starter");
  const files = [
    { id: "starter", label: "lesson-materials/study_planner.py" },
    { id: "personal", label: "my_examples.py" },
  ];
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <Person
          name={demoInstructor.name}
          initials={demoInstructor.initials}
          detail="Personal instructor workspace"
        />
        <Badge>Python · read-only code view</Badge>
      </div>
      <div className={styles.editor}>
        <nav className={styles.fileTree} aria-label="Inspect a code file">
          <p className={styles.eyebrow}>Files</p>
          <span className={styles.folder}>▾ lesson-materials</span>
          <button
            type="button"
            className={styles.nestedFile}
            aria-pressed={file === "starter"}
            onClick={() => setFile("starter")}
          >
            study_planner.py
          </button>
          <span className={styles.folder}>Personal files</span>
          <button
            type="button"
            aria-pressed={file === "personal"}
            onClick={() => setFile("personal")}
          >
            my_examples.py
          </button>
          <small>Example files · no execution</small>
        </nav>
        <div className={styles.editorMain}>
          <div className={styles.editorFile}>
            {files.find((item) => item.id === file)?.label}
            <Badge>
              {file === "starter" ? "This lesson" : "Across lessons"}
            </Badge>
          </div>
          <CodeView
            source={file === "starter" ? code.starter : code.personal}
            label="Read-only instructor Python example"
          />
          <div className={styles.editorStatus}>
            <span>Python</span>
            <span>Original product integrates Browser Coder</span>
          </div>
        </div>
      </div>
      <div className={styles.twoCol}>
        <Panel eyebrow="Lesson-specific" title="A reliable starting point.">
          <p>
            Master ZIPs can provide separate starter files for students and
            instructors. The workspace copies the appropriate files into{" "}
            <code>lesson-materials/</code>.
          </p>
          <Badge>Restore affects this folder</Badge>
        </Panel>
        <Panel
          eyebrow="Personal, across lessons"
          title="Examples worth keeping."
        >
          <p>
            Files outside the materials folder belong to the instructor’s wider
            personal workspace. Restoring the lesson’s starter code preserves
            those files.
          </p>
          <Badge tone="accent">Personal files remain</Badge>
        </Panel>
      </div>
      <Note>
        The product persists these owner-scoped files in its backend. The
        explorer’s file switcher does not connect to storage, execute code or
        restore any files.
      </Note>
    </div>
  );
}

const liveTypes = [
  {
    id: "quiz",
    name: "Quiz Battle",
    mark: "?",
    detail: "Questions, answer counts and a shared reveal",
    tags: "Question → answers → results",
  },
  {
    id: "cloud",
    name: "Live Cloud",
    mark: "Aa",
    detail: "A class’s words gathered around a prompt",
    tags: "Prompt → contributions → cloud",
  },
  {
    id: "heatmap",
    name: "Class heatmap",
    mark: "+",
    detail: "Place a response on an image",
    tags: "Image → positions → pattern",
  },
  {
    id: "debate",
    name: "Structured debate",
    mark: "↔",
    detail: "Two positions, with room for reasons",
    tags: "Position → round → contribution",
  },
  {
    id: "escape",
    name: "Team escape room",
    mark: "⌘",
    detail: "Team progress through a shared challenge",
    tags: "Teams → rooms → results",
  },
  {
    id: "branching",
    name: "Branching scenario",
    mark: "Y",
    detail: "A class decision that changes the path",
    tags: "Node → votes → instructor choice",
  },
];
function Sessions() {
  return (
    <div className={styles.stack}>
      <div className={styles.sessionGrid}>
        {liveTypes.map((type, index) => (
          <Link
            className={`${styles.sessionCard} ${styles[`session${index}`]}`}
            href={arcExplorerHref("instructor", `sessions/${type.id}`)}
            key={type.id}
          >
            <div className={styles.sessionArtwork} aria-hidden="true">
              <span>{type.mark}</span>
              <i />
              <i />
              <i />
            </div>
            <h2>{type.name}</h2>
            <p>{type.detail}</p>
            <small>{type.tags}</small>
            <span className={styles.sessionOpen}>
              Inspect sample board <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
      <Note>
        The real two-sided Quiz Battle flow has a recorded local demonstration.
        The other boards here explain source-verified session capabilities with
        fictional, static states.
      </Note>
    </div>
  );
}
function LiveHeader({ name, detail }: { name: string; detail: string }) {
  return (
    <div className={styles.liveHeader}>
      <span>
        <small>Python Lab · sample session board</small>
        <strong>{name}</strong>
      </span>
      <Badge tone="accent">{detail}</Badge>
    </div>
  );
}
function Quiz() {
  const [mode, setMode] = useState("question");
  return (
    <div className={styles.stack}>
      <Choices
        label="Inspect quiz session state"
        value={mode}
        onChange={setMode}
        options={[
          { id: "question", label: "Question state" },
          { id: "results", label: "Results state" },
        ]}
      />
      <section className={styles.liveBoard}>
        <LiveHeader
          name="Quiz Battle"
          detail={mode === "question" ? "Question 2 of 3" : "Results excerpt"}
        />
        {mode === "question" ? (
          <>
            <div className={styles.quizQuestion}>
              <span className={styles.timer}>
                00:18<small>Sample timer</small>
              </span>
              <p>What should the final block be in a 60-minute study plan?</p>
            </div>
            <div className={styles.answers}>
              {[
                ["A", "25 minutes", "3 answers"],
                ["B", "10 minutes", "12 answers"],
                ["C", "15 minutes", "2 answers"],
                ["D", "No final block", "1 answer"],
              ].map(([letter, text, count]) => (
                <div key={letter}>
                  <b>{letter}</b>
                  <span>
                    {text}
                    <small>{count}</small>
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.liveFooter}>
              <strong>18 of 24 answered</strong>
              <span>6 still thinking · answer counts, not correctness</span>
            </div>
          </>
        ) : (
          <div className={styles.leaderboard}>
            {[
              ["01", "Liam Chen", "850"],
              ["02", "Jordan Lee", "790"],
              ["03", "Avery Morgan", "720"],
            ].map(([rank, name, score]) => (
              <div key={rank}>
                <span>{rank}</span>
                <strong>{name}</strong>
                <b>
                  {score}
                  <small>sample points</small>
                </b>
              </div>
            ))}
          </div>
        )}
      </section>
      <Panel title="The instructor holds the pace.">
        <p>
          The product starts and closes questions explicitly, advances to the
          next question and stores the session’s results. This example switches
          between two fixed states; no timer or student connection runs here.
        </p>
        <Jump to="sessions">Compare another format</Jump>
      </Panel>
    </div>
  );
}
function Cloud() {
  const [prompt, setPrompt] = useState("first");
  const words =
    prompt === "first"
      ? [
          "try again",
          "curiosity",
          "small steps",
          "a clear plan",
          "ask why",
          "practice",
          "feedback",
          "patience",
          "a fresh idea",
        ]
      : [
          "a smaller block",
          "test zero",
          "explain it",
          "check the total",
          "name the variable",
          "trace one loop",
          "ask a classmate",
        ];
  return (
    <div className={styles.stack}>
      <Choices
        label="Inspect cloud prompt"
        value={prompt}
        onChange={setPrompt}
        options={[
          { id: "first", label: "Prompt 1" },
          { id: "second", label: "Prompt 2" },
        ]}
      />
      <section className={styles.liveBoard}>
        <LiveHeader name="Live Cloud" detail="Collected answers · sample" />
        <h2 className={styles.boardQuestion}>
          {prompt === "first"
            ? "What helps you learn something difficult?"
            : "What would you improve in your first plan?"}
        </h2>
        <div
          className={styles.wordCloud}
          aria-label="Example student contributions"
        >
          {words.map((word, index) => (
            <span className={styles[`word${index % 4}`]} key={word}>
              {word}
            </span>
          ))}
        </div>
        <div className={styles.liveFooter}>
          <span>Responses belong to the current prompt.</span>
          <Badge>Instructor moderation available in Arc</Badge>
        </div>
      </section>
      <Note>
        Word sizes in this illustrative layout are editorial, not measured
        frequency. The source supports prompt progression, individual answer
        removal and saving the cloud layout when ending a session.
      </Note>
    </div>
  );
}
function Heatmap() {
  const [showPoints, setShowPoints] = useState(true);
  return (
    <div className={styles.stack}>
      <section className={styles.liveBoard}>
        <LiveHeader name="Class heatmap" detail="Page 1 of 2 · sample" />
        <h2 className={styles.boardQuestion}>
          Where should we pause to check the result?
        </h2>
        <div className={styles.heatmap}>
          <svg
            className={styles.heatmapWide}
            viewBox="0 0 700 350"
            role="img"
            aria-label={`Sample flow image${showPoints ? " with response points clustered around checking remaining time" : " without response points"}`}
          >
            <defs>
              <pattern
                id="instructor-heat-grid"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M28 0H0V28"
                  fill="none"
                  stroke="currentColor"
                  opacity=".1"
                />
              </pattern>
            </defs>
            <rect width="700" height="350" fill="url(#instructor-heat-grid)" />
            <path
              d="M140 170H278M420 170H555M350 230V290H140V220"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".45"
            />
            <rect
              x="55"
              y="120"
              width="170"
              height="100"
              rx="20"
              className={styles.svgBox}
            />
            <path
              d="M350 85L450 170L350 255L250 170Z"
              className={styles.svgBox}
            />
            <rect
              x="495"
              y="120"
              width="165"
              height="100"
              rx="20"
              className={styles.svgBox}
            />
            <text x="140" y="162" textAnchor="middle">
              Choose a
            </text>
            <text x="140" y="186" textAnchor="middle">
              study block
            </text>
            <text x="350" y="162" textAnchor="middle">
              Time
            </text>
            <text x="350" y="186" textAnchor="middle">
              remaining?
            </text>
            <text x="577" y="176" textAnchor="middle">
              Finish
            </text>
            {showPoints &&
              [
                [318, 145],
                [343, 168],
                [360, 144],
                [377, 176],
                [337, 205],
                [380, 207],
                [318, 183],
                [401, 165],
                [136, 160],
                [578, 150],
                [355, 227],
                [361, 180],
              ].map(([x, y], index) => (
                <g key={index}>
                  <circle cx={x} cy={y} r="25" className={styles.heatHalo} />
                  <circle cx={x} cy={y} r="5" className={styles.heatDot} />
                </g>
              ))}
          </svg>
          <svg
            className={styles.heatmapTall}
            viewBox="0 0 300 440"
            role="img"
            aria-label={`Sample flow image${showPoints ? " with response points clustered around checking remaining time" : " without response points"}`}
          >
            <path
              d="M150 98V150M150 290V342M78 220H24V59H80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".4"
            />
            <rect
              x="65"
              y="20"
              width="170"
              height="78"
              rx="16"
              className={styles.svgBox}
            />
            <path
              d="M150 140L240 220L150 300L60 220Z"
              className={styles.svgBox}
            />
            <rect
              x="65"
              y="342"
              width="170"
              height="78"
              rx="16"
              className={styles.svgBox}
            />
            <text x="150" y="54" textAnchor="middle">
              Choose a
            </text>
            <text x="150" y="78" textAnchor="middle">
              study block
            </text>
            <text x="150" y="214" textAnchor="middle">
              Time
            </text>
            <text x="150" y="238" textAnchor="middle">
              remaining?
            </text>
            <text x="150" y="387" textAnchor="middle">
              Finish
            </text>
            {showPoints &&
              [
                [120, 194],
                [143, 215],
                [160, 189],
                [177, 226],
                [137, 257],
                [178, 251],
                [118, 235],
                [194, 212],
                [144, 61],
                [153, 370],
                [153, 275],
                [165, 229],
              ].map(([x, y], index) => (
                <g key={index}>
                  <circle cx={x} cy={y} r="21" className={styles.heatHalo} />
                  <circle cx={x} cy={y} r="5" className={styles.heatDot} />
                </g>
              ))}
          </svg>
        </div>
        <div className={styles.liveFooter}>
          <strong>12 example positions</strong>
          <button
            className={styles.textButton}
            type="button"
            aria-pressed={showPoints}
            onClick={() => setShowPoints((value) => !value)}
          >
            {showPoints ? "Hide" : "Show"} response layer
          </button>
        </div>
      </section>
      <Note>
        The original activity uses authored images and normalized response
        positions. This diagram and its points are fictional; toggling the layer
        only changes this read-only view.
      </Note>
    </div>
  );
}
function Debate() {
  const [round, setRound] = useState("1");
  return (
    <div className={styles.stack}>
      <Choices
        label="Inspect debate round"
        value={round}
        onChange={setRound}
        options={[
          { id: "1", label: "Round 1 · position" },
          { id: "2", label: "Round 2 · response" },
        ]}
      />
      <section className={styles.liveBoard}>
        <LiveHeader
          name="Structured debate"
          detail={`Round ${round} · sample contributions`}
        />
        <h2 className={styles.boardQuestion}>
          Should a planner always use equal-length blocks?
        </h2>
        <div className={styles.debateSides}>
          <section>
            <p className={styles.eyebrow}>Position A</p>
            <h3>Keep the blocks equal.</h3>
            <blockquote>
              {round === "1"
                ? "A predictable pattern is easier to follow when I am learning a new routine."
                : "We could keep most blocks equal and describe the shorter last one clearly."}
            </blockquote>
            <small>Example contribution · learner A</small>
          </section>
          <section>
            <p className={styles.eyebrow}>Position B</p>
            <h3>Fit the time available.</h3>
            <blockquote>
              {round === "1"
                ? "A plan should respect the time I actually have, even when the last block is shorter."
                : "The total matters more than a perfectly repeating pattern."}
            </blockquote>
            <small>Example contribution · learner B</small>
          </section>
        </div>
      </section>
      <Panel title="A structure for reasons, not just votes.">
        <p>
          The source supports two-sided contributions within successive rounds.
          The instructor starts the activity, advances the round and ends the
          session.
        </p>
      </Panel>
    </div>
  );
}
function Escape() {
  const [team, setTeam] = useState("comet");
  const teams = [
    {
      id: "comet",
      name: "Comet",
      room: 3,
      status: "Solving the loop lock",
      initials: "CO",
    },
    {
      id: "orbit",
      name: "Orbit",
      room: 2,
      status: "Checking a clue",
      initials: "OR",
    },
    {
      id: "nova",
      name: "Nova",
      room: 2,
      status: "Room locked after repeated attempts",
      initials: "NO",
    },
  ];
  const current = teams.find((item) => item.id === team)!;
  return (
    <div className={styles.stack}>
      <section className={styles.liveBoard}>
        <LiveHeader
          name="Team escape room"
          detail="Session in progress · sample"
        />
        <div className={styles.escapeLayout}>
          <nav className={styles.teamList} aria-label="Inspect a team">
            {teams.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setTeam(item.id)}
                aria-pressed={team === item.id}
              >
                <Person
                  name={item.name}
                  initials={item.initials}
                  detail={`Room ${item.room} of 4`}
                />
              </button>
            ))}
          </nav>
          <div className={styles.escapeMap}>
            <p className={styles.eyebrow}>
              {current.name} · four-room challenge
            </p>
            <div className={styles.rooms}>
              {[
                "The entrance",
                "A hidden condition",
                "The loop lock",
                "The final message",
              ].map((name, index) => (
                <div
                  key={name}
                  className={
                    index + 1 === current.room ? styles.currentRoom : ""
                  }
                >
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <strong>{name}</strong>
                  <small>
                    {index + 1 < current.room
                      ? "Completed"
                      : index + 1 === current.room
                        ? "Current room"
                        : "Ahead"}
                  </small>
                </div>
              ))}
            </div>
            <div className={styles.callout}>
              <strong>{current.status}</strong>
              <p>
                {team === "nova"
                  ? "The original instructor tools can clear a lockout or advance a team when support is needed."
                  : "The dashboard keeps this team’s location and progress separate from the rest of the class."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Note>
        Arc supports automatic or manual team assignment and session
        pause/resume, alongside team-level recovery tools. No team or session
        state is changed here.
      </Note>
    </div>
  );
}
function Branching() {
  const [view, setView] = useState("decision");
  return (
    <div className={styles.stack}>
      <Choices
        label="Inspect branching session state"
        value={view}
        onChange={setView}
        options={[
          { id: "decision", label: "Decision node" },
          { id: "path", label: "Traversed path" },
        ]}
      />
      <section className={styles.liveBoard}>
        <LiveHeader
          name="Branching scenario"
          detail="A shared design decision"
        />
        {view === "decision" ? (
          <>
            <h2 className={styles.boardQuestion}>
              The plan is too long. What should we inspect first?
            </h2>
            <div className={styles.branchChoices}>
              {[
                ["A", "The final block size", 14],
                ["B", "The name of the function", 3],
                ["C", "The printed message", 1],
              ].map(([letter, title, votes]) => (
                <div key={letter}>
                  <b>{letter}</b>
                  <div>
                    <strong>{title}</strong>
                    <div className={styles.track}>
                      <span
                        style={{ width: `${(Number(votes) / 18) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span>{votes} votes</span>
                </div>
              ))}
            </div>
            <div className={styles.liveFooter}>
              <span>18 example votes</span>
              <strong>The instructor selects the next branch.</strong>
            </div>
          </>
        ) : (
          <ol className={styles.branchPath}>
            <li>
              <span>01</span>
              <div>
                <small>Starting point</small>
                <h3>A 60-minute plan lasts 75 minutes.</h3>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <small>Chosen branch</small>
                <h3>Inspect the final block size.</h3>
                <p>Compare the remaining time with the preferred block size.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <small>Outcome node</small>
                <h3>A plan that fits the real constraint.</h3>
                <p>Take the smaller value, then explain why.</p>
              </div>
            </li>
          </ol>
        )}
      </section>
      <Note>
        These are two fixed illustrative states. Class votes inform the
        discussion; the source gives the instructor control over which branch
        advances.
      </Note>
    </div>
  );
}

function Presentation() {
  const [slide, setSlide] = useState("1");
  const slides = [
    {
      id: "1",
      title: "What changes each time?",
      text: "Trace the remaining minutes before writing the loop.",
      kicker: "01 / NOTICE",
    },
    {
      id: "2",
      title: "Make the last block fit.",
      text: "A useful plan respects the minutes you actually have.",
      kicker: "02 / COMPARE",
    },
    {
      id: "3",
      title: "Explain the edge case.",
      text: "What should the planner do with zero minutes?",
      kicker: "03 / REFLECT",
    },
  ];
  const current = slides.find((item) => item.id === slide)!;
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <span>Active classroom lesson · {lessonTitle}</span>
        <Badge>Slide inspection · no broadcast</Badge>
      </div>
      <div className={styles.presentation}>
        <p>{current.kicker}</p>
        <h2>{current.title}</h2>
        <div className={styles.slideGraphic} aria-hidden="true">
          <span>25</span>
          <span>25</span>
          <span>10</span>
        </div>
        <p>{current.text}</p>
      </div>
      <Choices
        label="Inspect presentation slide"
        value={slide}
        onChange={setSlide}
        options={slides.map((item) => ({
          id: item.id,
          label: `Slide ${item.id}`,
        }))}
      />
      <Panel title="One shared slide position.">
        <p>
          The original presentation controller keeps the classroom’s active
          lesson and slide index together. Instructors can start or stop the
          broadcast and move forward, backward or directly to a slide.
        </p>
      </Panel>
    </div>
  );
}
function PeerReview() {
  const [view, setView] = useState("assignments");
  return (
    <div className={styles.stack}>
      <div className={styles.contextStrip}>
        <span>Explain your reasoning · Python Lab</span>
        <Badge tone="accent">Review phase · sample</Badge>
      </div>
      <Choices
        label="Inspect peer review"
        value={view}
        onChange={setView}
        options={[
          { id: "assignments", label: "Who reviews whom" },
          { id: "moderation", label: "Response moderation" },
        ]}
      />
      {view === "assignments" ? (
        <Panel title="A small circle of useful responses.">
          <div className={styles.peerCircle}>
            {[
              ["Jordan Lee", "Liam Chen"],
              ["Liam Chen", "Avery Morgan"],
              ["Avery Morgan", "Jordan Lee"],
            ].map(([from, to]) => (
              <div key={from}>
                <span>
                  <small>Reviewer</small>
                  <strong>{from}</strong>
                </span>
                <b aria-hidden="true">→</b>
                <span>
                  <small>Work by</small>
                  <strong>{to}</strong>
                </span>
              </div>
            ))}
          </div>
          <Note>
            This three-person example assigns one review each. The product
            supports 1–5, avoids self-review and duplicate assignments, and also
            allows scoped manual assignment.
          </Note>
        </Panel>
      ) : (
        <div className={styles.twoCol}>
          <Panel
            eyebrow="Unpublished peer response"
            title="Specific feedback, before release."
          >
            <Badge tone="warm">Awaiting instructor moderation</Badge>
            <blockquote>
              “Your example helped me see the last block. Could you also show
              what happens when the input is zero?”
            </blockquote>
            <Person
              name="Liam Chen"
              initials="LC"
              detail="Reviewing Jordan’s explanation"
            />
            <Note>
              The learner receiving this response has not seen it yet.
            </Note>
          </Panel>
          <Panel
            eyebrow="Published peer response"
            title="Ready for the learner to use."
          >
            <Badge tone="accent">Published by instructor</Badge>
            <blockquote>
              “Naming the remaining minutes makes your loop easier to follow.”
            </blockquote>
            <Person
              name="Avery Morgan"
              initials="AM"
              detail="Reviewing Liam’s explanation"
            />
          </Panel>
        </div>
      )}
      <Panel title="Assignment, response and publication are separate.">
        <p>
          The instructor can close or reopen the review phase, inspect responses
          and publish them individually or in a batch. A submitted peer response
          does not become visible automatically.
        </p>
      </Panel>
    </div>
  );
}
function Sharing() {
  const [direction, setDirection] = useState("outgoing");
  return (
    <div className={styles.stack}>
      <Choices
        label="Inspect vision-board requests"
        value={direction}
        onChange={setDirection}
        options={[
          { id: "outgoing", label: "Outgoing requests" },
          { id: "incoming", label: "Incoming requests" },
        ]}
      />
      <Panel
        eyebrow="Vision-board activity · future learning spaces"
        title={
          direction === "outgoing"
            ? "An invitation to exchange perspectives."
            : "A request arrives with its classroom."
        }
      >
        <div className={styles.sharingDiagram}>
          <div>
            <span className={styles.largeAvatar}>PL</span>
            <h3>Python Lab</h3>
            <p>Maya Reed</p>
          </div>
          <div>
            <span aria-hidden="true">
              {direction === "outgoing" ? "→" : "←"}
            </span>
            <Badge tone={direction === "outgoing" ? "accent" : "warm"}>
              {direction === "outgoing" ? "Approved" : "Pending approval"}
            </Badge>
          </div>
          <div>
            <span className={styles.largeAvatar}>
              {direction === "outgoing" ? "WS" : "IL"}
            </span>
            <h3>{direction === "outgoing" ? "Web Studio" : "Idea Lab"}</h3>
            <p>{direction === "outgoing" ? "Eli Stone" : "Sam Park"}</p>
          </div>
        </div>
        <p>
          {direction === "outgoing"
            ? "The approved request allows the relevant vision-board work to appear in the intended classroom context."
            : "The request identifies the source classroom and activity. Its work is not shared merely because a request exists."}
        </p>
      </Panel>
      <div className={styles.twoCol}>
        <Panel title="A permission, with a lifecycle.">
          <div className={styles.stateFlow}>
            <Badge>Pending</Badge>
            <span aria-hidden="true">→</span>
            <Badge tone="accent">Approved</Badge>
            <span aria-hidden="true">→</span>
            <Badge>Revoked</Badge>
          </div>
          <p>
            A pending request can also be denied or canceled. Approval is held
            by the receiving instructor; either side can revoke an approved
            share.
          </p>
        </Panel>
        <Panel title="Purposeful, scoped sharing.">
          <p>
            The source limits this workflow to eligible vision-board activities
            and the involved classrooms. It is not an unrestricted public
            student gallery.
          </p>
        </Panel>
      </div>
    </div>
  );
}
function Questionnaires() {
  const [view, setView] = useState("classroom");
  return (
    <div className={styles.stack}>
      <Choices
        label="Inspect questionnaire context"
        value={view}
        onChange={setView}
        options={[
          { id: "classroom", label: "Classroom participation" },
          { id: "instructor", label: "Instructor assignments" },
        ]}
      />
      {view === "classroom" ? (
        <>
          <Metrics
            items={[
              ["24", "Assigned learners"],
              ["18", "Completed"],
              ["6", "Not completed"],
            ]}
          />
          <Panel
            eyebrow="Sample classroom assignment"
            title="How do you approach a new challenge?"
          >
            <div className={styles.barChart}>
              {[
                ["Read an example first", 8],
                ["Try a small experiment", 6],
                ["Talk through the problem", 4],
              ].map(([label, value]) => (
                <div key={label}>
                  <div>
                    <span>{label}</span>
                    <strong>{value} responses</strong>
                  </div>
                  <div className={styles.track}>
                    <span style={{ width: `${(Number(value) / 18) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Note>
              Fictional response categories illustrate a configured
              questionnaire’s distribution. They are not psychological
              diagnoses, platform results or a universal questionnaire scoring
              model.
            </Note>
          </Panel>
        </>
      ) : (
        <Panel
          eyebrow={`${demoInstructor.name} · personal assignments`}
          title="The instructor can be a participant too."
        >
          <div className={styles.historyRows}>
            <div>
              <span>
                <strong>Teaching reflection</strong>
                <small>Assigned questionnaire · sample</small>
              </span>
              <Badge tone="warm">Pending</Badge>
            </div>
            <div>
              <span>
                <strong>Beginning-of-term check-in</strong>
                <small>Assigned questionnaire · sample</small>
              </span>
              <Badge tone="accent">Completed</Badge>
            </div>
          </div>
          <p>
            The dashboard separates the instructor’s own questionnaire
            assignments from the student participation summaries inside a
            classroom.
          </p>
        </Panel>
      )}
    </div>
  );
}
function Support() {
  return (
    <div className={styles.stack}>
      <div className={styles.twoCol}>
        <Panel
          eyebrow="During the active lesson"
          title="A hand raised, with context."
        >
          <div className={styles.helpRequest}>
            <Person name="Avery Morgan" initials="AM" detail={taskTitle} />
            <Badge tone="warm">Help requested</Badge>
            <p>
              Student, task and request time are kept together so the instructor
              can return to the relevant work.
            </p>
            <small>Example timestamp · 10:24</small>
          </div>
          <Note>
            The original workflow lets an instructor resolve a help request.
            This sample has no action that changes the request.
          </Note>
        </Panel>
        <Panel
          eyebrow="Recent activity"
          title="A useful signal, with a time window."
        >
          <div className={styles.historyRows}>
            {learners.map((person, index) => (
              <div key={person.name}>
                <Person name={person.name} initials={person.initials} />
                <small>{index + 1} min ago</small>
              </div>
            ))}
          </div>
          <Note>
            The source’s “online” list uses a recent-activity window. This is
            not a continuous presence or attention measurement.
          </Note>
        </Panel>
      </div>
      <Panel title="Keep the active lesson within reach.">
        <div className={styles.contextStrip}>
          <span>
            <strong>{lessonTitle}</strong>
            <small className={styles.blockSmall}>
              Python Lab · current lesson
            </small>
          </span>
          <Jump to="classroom/lesson">Return to lesson context</Jump>
        </div>
        <p>
          The original instructor shell also provides a return link for an
          active live session, a guided help tour and classroom entry-code
          access.
        </p>
      </Panel>
    </div>
  );
}

export function InstructorPortalView({ pageId }: { pageId: string }) {
  const views: Record<string, ReactNode> = {
    overview: <Overview />,
    classroom: <Classroom />,
    "classroom/lesson": <Lesson />,
    "classroom/activity": <Activity />,
    learners: <Learners />,
    "learners/jordan": <LearnerProfile />,
    reviews: <Reviews />,
    "reviews/submission": <SubmissionReview />,
    grades: <Grades />,
    insights: <Insights />,
    materials: <Materials />,
    workspace: <Workspace />,
    sessions: <Sessions />,
    "sessions/quiz": <Quiz />,
    "sessions/cloud": <Cloud />,
    "sessions/heatmap": <Heatmap />,
    "sessions/debate": <Debate />,
    "sessions/escape": <Escape />,
    "sessions/branching": <Branching />,
    presentation: <Presentation />,
    "peer-review": <PeerReview />,
    sharing: <Sharing />,
    questionnaires: <Questionnaires />,
    support: <Support />,
  };
  return <div className={styles.root}>{views[pageId] ?? <Overview />}</div>;
}
