import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/types";

function ApplytideMap({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const nodes = [
    ["EDGE", "Nginx"],
    ["WEB", "React / TS"],
    ["API", "FastAPI"],
    ["WORK", "Worker"],
    ["DATA", "PostgreSQL"],
    ["STATE", "Redis"],
    ["MAIL", "React Email"],
    ["DEV", "MailDev"],
  ];

  return (
    <div
      dir={locale === "he" ? "rtl" : "ltr"}
      className={`absolute inset-0 overflow-hidden bg-[#0a1516] text-[#eaf0e7] ${
        compact ? "p-3" : "p-3 sm:p-5 md:p-7"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(111,214,190,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(111,214,190,.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-[#7bd8c2] md:text-[10px]">
          <span>
            {locale === "he" ? "APPLYTIDE / מפת מערכת" : "APPLYTIDE / SYSTEM MAP"}
          </span>
          <span className="hidden min-[360px]:inline">
            {locale === "he" ? "8 שירותי COMPOSE" : "08 COMPOSE SERVICES"}
          </span>
        </div>

        <div
          className={`relative grid flex-1 content-center ${
            compact ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4"
          } ${
            compact ? "mt-2 gap-1" : "mt-3 gap-1.5 sm:mt-5 sm:gap-2 md:gap-3"
          }`}
        >
          <span
            aria-hidden
            className="absolute inset-x-[16%] top-1/2 h-px bg-[#7bd8c2]/35"
          />
          <span
            aria-hidden
            className="absolute inset-y-[14%] left-1/2 w-px bg-[#7bd8c2]/35"
          />
          {nodes.map(([name, sub], i) => (
            <div
              key={name}
              className={`relative border ${compact ? "p-1.5" : "p-1.5 sm:p-2.5 md:p-4"} ${
                i === 2
                  ? "border-[#ff6b3d] bg-[#ff6b3d]/10"
                  : "border-[#7bd8c2]/35 bg-[#0d1d1e]/85"
              }`}
            >
              <p className="font-mono text-[9px] tracking-[0.16em] text-[#7bd8c2] md:text-[10px]">
                0{i + 1} / {name}
              </p>
              {!compact ? (
                <p className="mt-2 hidden font-display text-[11px] tracking-tight text-[#eaf0e7] sm:block md:text-sm">
                  {sub}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {!compact ? (
          <p className="relative mt-4 hidden max-w-[42ch] text-[10px] leading-relaxed text-[#9bb0ab] sm:block md:text-xs">
            {locale === "he"
              ? "קליטת משרות, מעקב תהליך, ניתוח בסיוע AI ובקרת עלויות במערכת אחת שניתנת לבדיקה."
              : "Job capture, workflow tracking, AI-assisted analysis and cost controls in one inspectable system."}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ArcRecord({ locale }: { locale: Locale }) {
  const items =
    locale === "he"
      ? ["צורך מהשטח", "אפיון", "תכנון גאנט", "בדיקת תהליכים", "שיפור עם מנחים"]
      : ["Field need", "Requirements", "Gantt plan", "Workflow QA", "Instructor iteration"];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e7e0d4] p-3 text-[#191916] sm:p-5 md:p-7">
      <div
        aria-hidden
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,24,20,.08) 1px, transparent 1px)",
          backgroundSize: "100% 22px",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-[0.18em] text-[#a63516] md:text-[10px]">
              {locale === "he" ? "ARC / סיכום מקרה" : "ARC / CASE SUMMARY"}
            </p>
            <p className="mt-2 hidden max-w-[21ch] font-display text-lg leading-[1.05] tracking-tight sm:block md:text-2xl">
              {locale === "he"
                ? "פלטפורמת למידה שנבנתה מתוך העבודה בשטח."
                : "A learning platform built from the work in the field."}
            </p>
          </div>
          <span className="rotate-3 border-2 border-[#a63516] px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.16em] text-[#a63516] md:text-[10px]">
            {locale === "he" ? "ראיות מוגבלות" : "EVIDENCE LIMITED"}
          </span>
        </div>

        <ol className="mt-auto grid grid-cols-5 gap-px border border-[#191916]/20 bg-[#191916]/20">
          {items.map((item, i) => (
            <li key={item} className="min-w-0 bg-[#e7e0d4]/95 p-1.5 sm:p-2.5 md:p-3">
              <span className="font-mono text-[8px] tracking-[0.16em] text-[#a63516] md:text-[9px]">
                0{i + 1}
              </span>
              <p className="mt-1.5 truncate text-[8px] leading-tight sm:text-[9px] md:text-[11px]">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function GenericRecord({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-2 p-6">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <p className="label text-signal">PROJECT RECORD / {project.slug}</p>
        <p className="max-w-[12ch] font-display text-3xl leading-none tracking-tight md:text-5xl">
          {project.title}
        </p>
      </div>
    </div>
  );
}

export function ProjectVisual({
  project,
  locale,
  priority = false,
  videoMode = "poster",
  showCaption = true,
  compact = false,
  className = "",
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
  videoMode?: "poster" | "controls";
  showCaption?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const media = project.media;

  return (
    <figure
      className={`project-visual relative isolate aspect-[16/10] overflow-hidden bg-surface-2 ${className}`}
    >
      {media ? (
        <>
          <Image
            src={media.poster}
            alt={media.video && videoMode === "controls" ? "" : t(media.alt, locale)}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="proof-video-poster object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
          />
          {media.video && videoMode === "controls" ? (
            <video
              className="absolute inset-0 size-full object-cover"
              poster={media.poster}
              src={media.video}
              controls
              playsInline
              preload="none"
              aria-label={t(media.alt, locale)}
            />
          ) : null}
        </>
      ) : project.slug === "applytide" ? (
        <ApplytideMap locale={locale} compact={compact} />
      ) : project.slug === "arc" ? (
        <ArcRecord locale={locale} />
      ) : (
        <GenericRecord project={project} />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-white/10 shadow-[inset_0_0_80px_rgba(0,0,0,.18)]"
      />

      {media?.kind === "concept" ? (
        <p className="pointer-events-none absolute end-3 top-3 z-20 rotate-1 border-2 border-signal bg-black/75 px-2.5 py-1.5 font-mono text-[8px] font-bold tracking-[0.14em] text-white shadow-lg md:end-4 md:top-4 md:text-[9px]">
          {locale === "he" ? "קונספט / לא תיעוד מהשטח" : "CONCEPT / NOT FIELD EVIDENCE"}
        </p>
      ) : null}

      {showCaption ? (
        <div
          className={`pointer-events-none absolute inset-x-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 pt-12 text-white md:p-4 ${
            media?.video && videoMode === "controls" ? "top-0 bottom-auto bg-gradient-to-b pb-10 pt-3" : "bottom-0"
          }`}
        >
          <p className="font-mono text-[8px] tracking-[0.16em] text-white/75 md:text-[9px]">
            {media?.caption
              ? t(media.caption, locale)
              : project.slug === "arc"
                ? locale === "he"
                  ? "סיכום מקרה / ראיות מוגבלות"
                  : "CASE SUMMARY / EVIDENCE LIMITED"
                : `${project.title} / RECORD`}
          </p>
          <p className="font-mono text-[8px] tracking-[0.16em] text-white/60 md:text-[9px]">
            {media?.kind?.toUpperCase() ?? (project.slug === "arc" ? "SUMMARY" : "SYSTEM")} / {project.started.slice(0, 4)}
          </p>
        </div>
      ) : null}
    </figure>
  );
}
