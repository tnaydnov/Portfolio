import type { Metadata } from "next";
import { SectionMark } from "@/components/chrome/SectionMark";

export const metadata: Metadata = {
  title: "Performance budget",
  description:
    "The performance and accessibility budget this site is built against, published rather than claimed.",
};

const targets = [
  { metric: "LCP", target: "< 1.8s", note: "Mobile, throttled 4G" },
  { metric: "CLS", target: "< 0.02", note: "Fonts and media reserve space" },
  { metric: "INP", target: "< 150ms", note: "No blocking work on interaction" },
  { metric: "First-load JS", target: "< 180KB gz", note: "Per route" },
  { metric: "Accessibility", target: "100", note: "Lighthouse" },
  { metric: "Contrast", target: "AA / AAA body", note: "Both themes" },
];

const rules = [
  {
    title: "Reduced motion is a layout, not a downgrade",
    body: "prefers-reduced-motion is resolved at the layout level. The pinned horizontal loop is replaced by a vertical list, smooth scrolling is never mounted, and no transform animation runs. Nothing is hidden in that mode.",
  },
  {
    title: "No WebGL",
    body: "The cinematic layer is SVG, CSS grain and typography. A shader hero would have cost more in Largest Contentful Paint than it returned in impression, so it is not here.",
  },
  {
    title: "Heavy libraries load below the fold",
    body: "The interactive architecture diagram is dynamically imported with a reserved-height placeholder, so it never appears in a route's first-load bundle and never shifts layout when it arrives.",
  },
  {
    title: "Keyboard paths are real",
    body: "A skip link, a skip-the-loop link, visible focus rings on both themes, real button semantics on every control, and an aria-live announcement when the work filter changes.",
  },
  {
    title: "Content is server-rendered",
    body: "Every case study is a React Server Component rendered at build time. Client JavaScript exists only for the four things that genuinely need it: theme, filter, dial and diagram.",
  },
];

export default function BudgetPage() {
  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title="Budget" />

      <header className="py-14 md:py-24">
        <h1 className="t-hero max-w-[10ch]">Budget</h1>
        <p className="mt-10 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">
          A portfolio that argues for engineering judgement should be willing to
          publish the constraints it was built against. These are the targets for
          this site, and the rules that follow from them.
        </p>
      </header>

      <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {targets.map((t) => (
          <div key={t.metric} className="bg-ink p-6 md:p-8">
            <dt className="label">{t.metric}</dt>
            <dd
              data-metric
              className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none tracking-tight"
            >
              {t.target}
            </dd>
            <p className="mt-3 text-xs leading-relaxed text-faint">{t.note}</p>
          </div>
        ))}
      </dl>

      <section className="pt-24">
        <SectionMark index="01" title="Rules" />
        <ol className="mt-8 grid gap-px bg-rule">
          {rules.map((r, i) => (
            <li key={r.title} className="bg-ink">
              <div className="grid gap-4 py-8 md:grid-cols-[4rem_1fr] md:gap-8">
                <p className="label text-signal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h2 className="font-display text-xl tracking-tight md:text-2xl">
                    {r.title}
                  </h2>
                  <p className="mt-3 max-w-[64ch] text-[0.95rem] leading-relaxed text-muted">
                    {r.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
