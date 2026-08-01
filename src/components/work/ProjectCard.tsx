import Link from "next/link";
import Image from "next/image";
import {
  DOMAIN_LABEL,
  STATUS_LABEL,
  formatSpan,
  type Project,
} from "@/lib/types";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col border border-rule bg-surface transition-colors duration-500 hover:border-rule-strong ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col outline-offset-4"
      >
        {project.media ? (
          <div className="relative aspect-[16/9] overflow-hidden border-b border-rule bg-surface-2">
            <Image
              src={project.media.poster}
              alt={project.media.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="label">
              {project.domain.map((d) => DOMAIN_LABEL[d]).join(" · ")}
            </p>
            <p className="label flex items-center gap-2">
              <span
                aria-hidden
                className={`size-1.5 rounded-full ${
                  project.status === "ongoing" || project.status === "live"
                    ? "bg-ok"
                    : "bg-faint"
                }`}
              />
              {STATUS_LABEL[project.status]}
            </p>
          </div>

          <h3
            className={`mt-5 font-display tracking-tight transition-colors duration-300 group-hover:text-signal ${
              featured
                ? "text-[clamp(1.9rem,4vw,3rem)] leading-[1.02]"
                : "text-[1.75rem] leading-[1.06]"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`mt-3 leading-relaxed text-muted ${
              featured ? "max-w-[52ch] text-[1.05rem]" : "text-[0.95rem]"
            }`}
          >
            {featured ? project.hook : project.oneLiner}
          </p>

          {project.metrics.length > 0 && (
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              {project.metrics.slice(0, featured ? 4 : 2).map((m) => (
                <div key={m.label}>
                  <dd
                    data-metric
                    className="font-display text-2xl leading-none tracking-tight"
                  >
                    {m.value}
                  </dd>
                  <dt className="label mt-2">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <p className="label">{formatSpan(project)}</p>
            <span
              aria-hidden
              className="text-signal transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
