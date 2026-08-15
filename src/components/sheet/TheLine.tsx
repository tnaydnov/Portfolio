import { TRAJECTORY } from "@/content/sheet";
import { t, type Locale } from "@/lib/i18n";

/**
 * One life in six segments, read in a single pass.
 *
 * Bidi matters here and it is easy to get wrong: this line mixes Hebrew, Latin
 * and numerals in the same run. A literal "→" between segments reorders into
 * nonsense under RTL, so each segment is wrapped in `<bdi>` to isolate its
 * direction and the separator is a CSS pseudo-element that mirrors itself.
 */
export function TheLine({ locale }: { locale: Locale }) {
  return (
    <ul className="traj flex flex-wrap items-baseline gap-x-1 gap-y-2">
      {TRAJECTORY.map((seg) => (
        <li
          key={t(seg.label, locale)}
          data-tag={seg.tags.join(" ")}
          className="font-display text-[clamp(1rem,1.5vw,1.35rem)] leading-tight tracking-tight"
        >
          <bdi>{t(seg.label, locale)}</bdi>
        </li>
      ))}
    </ul>
  );
}
