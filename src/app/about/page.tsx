import type { Metadata } from "next";
import Link from "next/link";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineering graduate, M.Sc. student in Industrial Engineering & Management. Two degrees, one argument: software is the tool, systems are the subject.",
};

const timeline = [
  {
    span: "2026 — 2028",
    title: "M.Sc. Industrial Engineering & Management",
    org: "Shenkar College of Engineering, Design and Art",
    note: "The systems half. Process design, optimisation, and the formal tools behind what I had been doing by instinct.",
    current: true,
  },
  {
    span: "2023 — now",
    title: "Programming Instructor & EdTech Content Developer",
    org: "Nitzanim",
    note: "Requirements with clients and educational stakeholders, curriculum and product development, Gantt planning, and Arc — an internal learning platform I founded and shipped.",
    current: true,
  },
  {
    span: "2021 — 2025",
    title: "B.Sc. Software Engineering",
    org: "Ben-Gurion University of the Negev",
    note: "The build half. Where the reps in the ledger come from.",
  },
  {
    span: "2020 — 2023",
    title: "Technical Support, Tier 2",
    org: "IDF · Israel Electric Corporation · Isracard",
    note: "Three large organisations, three helpdesks. This is where I learned that users describe symptoms, never causes.",
  },
];

const numbers = [
  { value: "650+", label: "Students taught" },
  { value: "3 yrs", label: "Arc in production" },
  { value: "2", label: "Degrees, one argument" },
  { value: "6", label: "Stages I own" },
];

export default function AboutPage() {
  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title="About" />

      <header className="py-14 md:py-24">
        <h1 className="t-hero max-w-[9ch]">About</h1>
        <p className="mt-10 max-w-[30ch] font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.16] tracking-tight">
          I am a software engineer who went and got the other half of the
          problem.
        </p>
      </header>

      <section>
        <Reveal>
          <div className="grid gap-10 border-t border-rule py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <h2 className="label lg:sticky lg:top-28 lg:self-start">
              The thesis
            </h2>
            <div className="prose">
              <p>
                I finished a Software Engineering degree and then enrolled in a
                Master&apos;s in Industrial Engineering and Management. People
                read that as a pivot away from engineering. It is the opposite.
              </p>
              <p>
                Industrial Engineering is the discipline of designing, measuring
                and improving systems and processes. It is the formal version of
                the thing I kept running into at work: the code was rarely the
                bottleneck. The bottleneck was an undefined requirement, a
                handoff nobody owned, or a workaround that had quietly become
                policy. I had been solving those problems by instinct. I went and
                learned to do it properly.
              </p>
              <p>
                So the two degrees are one argument.{" "}
                <strong>Software is the tool. Systems are the subject.</strong>{" "}
                Being able to write the code is what stops the systems thinking
                from becoming a slide deck; understanding the system is what
                stops the code from being beautifully built and pointed at the
                wrong problem.
              </p>
              <p>
                In practice this means I am not looking for a role where I only
                write tickets, and not one where I only close them. The work I am
                good at is the whole loop — finding the need, framing it,
                sequencing it, building it, proving it, and then sitting with the
                people who use it while they tell me what I got wrong.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-10 border-t border-rule py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <h2 className="label lg:sticky lg:top-28 lg:self-start">
              What teaching taught me
            </h2>
            <div className="prose">
              <p>
                I have spent three years teaching programming — several hundred
                students, plus the syllabuses, lesson plans, exercises and
                instructor guides underneath. It is the most useful professional
                training I have had, and not for the reason people assume.
              </p>
              <p>
                Teaching is requirements engineering with immediate feedback. You
                explain something, and within thirty seconds a room full of
                people shows you exactly which part of your explanation carried
                an assumption. You cannot argue with it, you cannot defer it to
                the next sprint, and you cannot blame the audience. You just find
                the broken sentence and fix it.
              </p>
              <p>
                That is the same skill as sitting between a client and a
                developer who think they agree. My rule now:{" "}
                <em>
                  if you cannot explain the requirement to a sixteen-year-old, the
                  requirement is not finished.
                </em>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-10 border-t border-rule py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <h2 className="label lg:sticky lg:top-28 lg:self-start">
              What I want next
            </h2>
            <div className="prose">
              <p>
                A technical product role, on a small team, where the distance
                between noticing a problem and shipping something about it is
                short. I want to own outcomes rather than tickets, and I want to
                be close enough to the users that the feedback arrives directly
                rather than through a summary.
              </p>
              <p>
                I am comfortable being the person who writes the spec and then
                has to implement it. I think that combination is rarer than it
                should be, and it is the entire reason this site is organised the
                way it is.
              </p>
              <p>
                <Link href="/contact">Get in touch →</Link>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="pt-16">
        <SectionMark index="01" title="By the numbers" />
        <dl className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
          {numbers.map((m) => (
            <div key={m.label} className="bg-ink p-6 md:p-8">
              <dd
                data-metric
                className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-none tracking-tight"
              >
                {m.value}
              </dd>
              <dt className="label mt-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="02" title="Track" />
        <ol className="mt-8 grid gap-px bg-rule">
          {timeline.map((t) => (
            <li key={t.title} className="bg-ink">
              <div className="grid gap-4 py-8 md:grid-cols-[11rem_1fr] md:gap-10">
                <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                  <p className="label">{t.span}</p>
                  {t.current && (
                    <p className="label flex items-center gap-2 text-ok">
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-ok"
                      />
                      Current
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-tight md:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-signal">{t.org}</p>
                  <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
                    {t.note}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.cv}
            download
            className="group inline-flex h-11 items-center gap-2.5 bg-signal px-5 text-sm font-medium text-signal-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Download CV
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
          <Link
            href="/system"
            className="inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
          >
            How I work →
          </Link>
        </div>
      </section>
    </div>
  );
}
