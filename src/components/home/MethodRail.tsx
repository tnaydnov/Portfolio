import Link from "next/link";
import { home } from "@/content/home";
import { STAGES } from "@/lib/stages";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";

export function MethodRail({ locale }: { locale: Locale }) {
  return (
    <div className="border-y border-rule">
      <ol className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-6">
        {STAGES.map((stage) => (
          <li key={stage.id} className="group bg-ink p-5 md:p-6">
            <Link
              href={`${href("/work", locale)}?stage=${stage.id}`}
              className="block h-full"
            >
              <p className="font-mono text-[10px] tracking-[0.16em] text-signal">
                {stage.index}
              </p>
              <h3 className="mt-5 font-display text-2xl leading-none tracking-tight transition-colors group-hover:text-signal">
                {t(stage.name, locale)}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {t(stage.artifacts, locale)[0]}
              </p>
              <span className="label mt-8 block transition-colors group-hover:text-text">
                {t(home.evidenceLabel, locale)} →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
