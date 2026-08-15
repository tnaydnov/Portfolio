import Link from "next/link";
import { WORK_ROWS } from "@/content/sheet";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";

/**
 * Five things, one line each, every one a link into a case study that already
 * exists. These are also the crosshair's keyboard entry points: tabbing down
 * the list plays the connections one at a time.
 */
export function WorkTable({ locale }: { locale: Locale }) {
  return (
    <section className="bg-ink px-5 py-7 md:px-8" aria-labelledby="work-h">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="work-h" className="label">
          {t(ui.home.workLabel, locale)}
        </h2>
        <Link href={href("/work", locale)} className="label hover:text-text">
          {t(ui.common.allWork, locale)} →
        </Link>
      </div>

      <ul className="mt-5">
        {WORK_ROWS.map((row) => (
          <li key={row.slug}>
            <Link
              href={href(`/work/${row.slug}`, locale)}
              data-tag={row.tags.join(" ")}
              className="work-row grid items-baseline gap-x-5 gap-y-1 border-t border-rule py-3.5 md:grid-cols-[11rem_1fr_auto]"
            >
              <span className="font-display text-base tracking-tight">
                {row.title}
              </span>
              <span className="text-[0.9rem] leading-snug text-muted">
                {t(row.what, locale)}
              </span>
              <span className="label whitespace-nowrap">
                {t(row.status, locale)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
