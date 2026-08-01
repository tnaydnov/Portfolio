import type { Metadata } from "next";
import { SectionMark } from "@/components/chrome/SectionMark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to technical product roles where the job is the whole loop — discovery through delivery, and the iteration after it.",
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "/in/tomer-naydnov", href: site.links.linkedin },
  { label: "GitHub", value: "@tnaydnov", href: site.links.github },
];

export default function ContactPage() {
  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title="Contact" />

      <header className="py-14 md:py-24">
        <h1 className="t-hero max-w-[9ch]">Contact</h1>
        <p className="mt-10 max-w-[36ch] font-display text-[clamp(1.4rem,3vw,2.25rem)] leading-[1.18] tracking-tight">
          If you are hiring for a role that spans the whole loop, I would like to
          hear about it.
        </p>
      </header>

      <ul className="grid gap-px border-y border-rule bg-rule">
        {channels.map((c) => (
          <li key={c.label} className="bg-ink">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-7 transition-colors"
            >
              <span className="label">{c.label}</span>
              <span className="flex-1 font-display text-[clamp(1.35rem,3.5vw,2.5rem)] leading-none tracking-tight transition-colors group-hover:text-signal">
                {c.value}
              </span>
              <span
                aria-hidden
                className="text-signal transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="label">Based</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
            Israel · GMT+3
            <br />
            Sunday to Thursday
          </p>
        </div>
        <div>
          <p className="label">Looking for</p>
          <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed text-muted">
            Technical product roles on small teams. Discovery through delivery,
            with the iteration after it.
          </p>
        </div>
        <div>
          <p className="label">CV</p>
          <a
            href={site.cv}
            download
            className="mt-3 inline-flex items-center gap-2 text-[0.95rem] text-muted underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
          >
            Download PDF ↓
          </a>
        </div>
      </div>
    </div>
  );
}
