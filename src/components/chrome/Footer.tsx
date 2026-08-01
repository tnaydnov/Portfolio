import Link from "next/link";
import { site } from "@/lib/site";

const external = [
  { href: site.links.github, label: "GitHub" },
  { href: site.links.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="shell grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div>
          <p className="label">Currently</p>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            Open to technical product roles where the job is the whole loop —
            discovery through delivery, and the iteration after it.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-6 inline-flex items-baseline gap-2 font-display text-xl tracking-tight transition-colors hover:text-signal"
          >
            {site.email}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="label mb-1">Site</p>
          {["/work", "/system", "/about", "/contact", "/budget"].map((href) => (
            <Link
              key={href}
              href={href}
              className="w-fit text-sm text-muted transition-colors hover:text-text"
            >
              {href === "/budget" ? "Performance budget" : href.replace("/", "")}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="label mb-1">Elsewhere</p>
          {external.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.cv}
            download
            className="w-fit text-sm text-muted transition-colors hover:text-text"
          >
            CV (PDF)
          </a>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="label">{site.location}</p>
      </div>
    </footer>
  );
}
