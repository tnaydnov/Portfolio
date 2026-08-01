import Link from "next/link";
import { arc, applytide, eventa, lpr } from "@/content/work";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import { home } from "@/content/home";
import { ProjectVisual } from "@/components/work/ProjectVisual";

const records = [
  { project: eventa, className: "col-span-2 row-span-2 md:col-span-7 md:row-span-7" },
  { project: lpr, className: "col-span-2 row-span-1 md:col-span-5 md:row-span-4" },
  { project: applytide, className: "col-span-2 row-span-1 md:col-span-5 md:row-span-3" },
  { project: arc, className: "col-span-2 row-span-1 md:col-span-12 md:row-span-3" },
] as const;

export function EvidenceMontage({ locale }: { locale: Locale }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
        <p className="label text-text">{t(home.montageLabel, locale)}</p>
        <p className="label">{t(home.montageNote, locale)}</p>
      </div>

      <div className="grid auto-rows-[9rem] grid-cols-2 gap-2 md:auto-rows-[3rem] md:grid-cols-12">
        {records.map(({ project, className }, i) => (
          <Link
            key={project.slug}
            href={href(`/work/${project.slug}`, locale)}
            aria-label={`${t(home.caseStudy, locale)}: ${project.title}`}
            className={`group relative min-h-0 overflow-hidden border border-rule bg-surface ${className}`}
          >
            <ProjectVisual
              project={project}
              locale={locale}
              priority={i === 0}
              showCaption={false}
              compact
              className="size-full !aspect-auto"
            />
            {project.media ? (
              <span className="pointer-events-none absolute start-3 top-3 z-10 border border-white/25 bg-black/55 px-2 py-1 font-mono text-[8px] tracking-[0.16em] text-white backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")} / {project.title.toUpperCase()}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
