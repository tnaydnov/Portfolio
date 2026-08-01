import type { Metadata } from "next";
import Link from "next/link";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { LoopSchematic } from "@/components/loop/LoopSchematic";
import { STAGES } from "@/lib/stages";
import { byStage } from "@/content/work";

export const metadata: Metadata = {
  title: "System",
  description:
    "The six stages I run every project through — signal, frame, plan, build, prove, field — the artifacts each one produces, and the templates behind them.",
};

export default function SystemPage() {
  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title="Method" />

      <header className="relative isolate overflow-hidden py-14 md:py-24">
        <LoopSchematic className="pointer-events-none absolute left-1/2 top-1/2 w-[160%] max-w-none -translate-x-1/2 -translate-y-1/2 text-text opacity-[0.07]" />
        <h1 className="t-hero max-w-[9ch]">System</h1>
        <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">
          Delivery is not a talent, it is a process — and a process can be
          written down, taught, and improved. This is mine. It is the same six
          stages every time, and it is the reason the work on this site looks
          consistent despite spanning education, infrastructure and consumer
          product.
        </p>
      </header>

      <section>
        <SectionMark index="01" title="The six stages" />
        <ol className="grid gap-px bg-rule">
          {STAGES.map((stage) => {
            const count = byStage(stage.id).length;
            return (
              <li key={stage.id} className="bg-ink">
                <Reveal>
                  <div className="grid gap-8 py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                      <p className="label">
                        <span className="text-signal">{stage.index}</span>
                        <span className="mx-2 opacity-40">/</span>
                        Stage
                      </p>
                      <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-none tracking-tight">
                        {stage.name}
                      </h2>
                      <p className="mt-3 text-sm uppercase tracking-[0.18em] text-signal">
                        {stage.kicker}
                      </p>
                      <Link
                        href={`/work?stage=${stage.id}`}
                        className="label mt-6 inline-block transition-colors hover:text-text"
                      >
                        {count} {count === 1 ? "case" : "cases"} →
                      </Link>
                    </div>

                    <div>
                      <p className="max-w-[46ch] font-display text-xl leading-snug tracking-tight md:text-2xl">
                        {stage.line}
                      </p>
                      <div className="prose mt-8">
                        {stage.detail.map((para) => (
                          <p key={para.slice(0, 40)}>{para}</p>
                        ))}
                      </div>

                      <div className="mt-10 border-t border-rule pt-5">
                        <p className="label">What this stage produces</p>
                        <ul className="mt-4 grid gap-2.5">
                          {stage.artifacts.map((a) => (
                            <li
                              key={a}
                              className="flex gap-3 text-[0.95rem] text-muted"
                            >
                              <span aria-hidden className="text-signal">
                                —
                              </span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="02" title="Working with people" />
        <Reveal>
          <div className="grid gap-10 py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <h2 className="t-section max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
              Most requirements fail as translation, not as analysis.
            </h2>
            <div className="prose">
              <p>
                Three years of teaching programming to teenagers turned out to be
                the best requirements training I could have had. If you cannot
                explain a requirement to a sixteen-year-old, the requirement is
                not finished — it is still carrying assumptions you have not
                examined.
              </p>
              <p>
                The same is true with stakeholders. When a client and a developer
                disagree, it is almost never because one of them is wrong. It is
                because a word in the spec means two different things and nobody
                has noticed yet. My job in that room is to find the word.
              </p>
              <p>
                So I write things down, in plain language, and read them back to
                the people who will live with the result. It is unglamorous and
                it prevents most of the expensive failures.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="03" title="Where to look next" />
        <div className="grid gap-px bg-rule py-1 md:grid-cols-2">
          {[
            {
              href: "/work",
              title: "The evidence",
              body: "Case studies filtered by stage, each with a decision log and a rebuild list.",
            },
            {
              href: "/about",
              title: "The thesis",
              body: "Why a software engineer went and got an Industrial Engineering degree.",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-ink p-8 transition-colors hover:bg-surface md:p-12"
            >
              <p className="label">{c.href}</p>
              <h3 className="mt-4 font-display text-2xl tracking-tight transition-colors group-hover:text-signal md:text-3xl">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-muted">
                {c.body}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
