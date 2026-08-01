import Link from "next/link";
import { Hero } from "@/components/loop/Hero";
import { LoopSection } from "@/components/loop/LoopSection";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { FLAGSHIPS } from "@/content/work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LoopSection />

      <section className="shell pt-24 md:pt-32">
        <SectionMark
          index="02"
          title="Evidence"
          aside={<Link href="/work" className="hover:text-text">All work →</Link>}
        />

        <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
          <Reveal>
            <h2 className="t-section max-w-[18ch]">
              Three products. Every claim above is one of these.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">
              Each carries a decision log — what I chose, what I gave up for it,
              and the condition that would make me change my mind.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px bg-rule md:grid-cols-2">
          {FLAGSHIPS.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={p} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pt-24 md:pt-32">
        <SectionMark index="03" title="Position" />
        <Reveal>
          <div className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:gap-20 md:py-20">
            <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.16] tracking-tight">
              Software Engineering gave me the build. Industrial Engineering gave
              me the system.{" "}
              <span className="text-signal">The value is the combination.</span>
            </p>
            <div className="prose">
              <p>
                Two degrees that read as unrelated are one argument: software is
                the tool, systems are the subject. I did not move away from
                engineering — I went and got the half that makes engineering
                land.
              </p>
              <p>
                <Link href="/system">See how I work →</Link>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
