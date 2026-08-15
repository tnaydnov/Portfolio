import { ALL_TAGS } from "@/content/bio";
import type { Locale } from "@/lib/i18n";
import { Masthead } from "./Masthead";
import { Identity } from "./Identity";
import { Overlap } from "./Overlap";
import { Ratings } from "./Ratings";
import { WorkTable } from "./WorkTable";
import { Reach } from "./Reach";

/**
 * The crosshair.
 *
 * Engage any element that belongs to a part of his life and every other
 * element from that same part lights while the rest recede. Hovering the Arc
 * row lights the Nitzanim and Arc bars in the Gantt, the "3 yrs" figure, and
 * the ARC segment of the trajectory line — four blocks apart, no JavaScript.
 *
 * Two things make it hold up:
 *
 *   Specificity, not source order. `:has()` takes the specificity of its most
 *   specific argument, so the dimmer resolves to (0,2,1) and each lit rule to
 *   (0,3,1). A later refactor that reorders this stylesheet cannot break it.
 *
 *   Focus is ungated, hover is not. Keyboard users get the full mechanic at
 *   every width; `:hover` is gated behind a real pointer and a wide viewport,
 *   because on a touch screen `:hover` sticks after a tap.
 *
 * Cost: zero kilobytes of JavaScript. No state, no observer, no listener — on
 * a site whose colophon brags about deleting two animation libraries after
 * measuring them, the signature interaction weighs less than the film grain.
 *
 * Nothing is exclusively behind it. Every relationship it draws is also
 * written out: each figure prints its source, each bar prints its years. It is
 * an accelerator for the reader who has a pointer, never the only path.
 */
function crosshairCss(): string {
  const lit = (tag: string, engaged: string) =>
    `main:has([data-tag~="${tag}"]:${engaged}) [data-tag~="${tag}"]{opacity:1;--lit:1}`;

  const forMode = (engaged: string) =>
    [
      `main:has([data-tag]:${engaged}) :where([data-tag]){opacity:.26}`,
      ...ALL_TAGS.map((tag) => lit(tag, engaged)),
    ].join("");

  return [
    forMode("focus-visible"),
    `@media (hover:hover) and (min-width:64rem){${forMode("hover")}}`,
  ].join("");
}

export function Sheet({ locale }: { locale: Locale }) {
  return (
    <section className="shell pt-6 md:pt-10">
      <style dangerouslySetInnerHTML={{ __html: crosshairCss() }} />

      <div className="grid gap-px border border-rule bg-rule">
        <Masthead locale={locale} />
        <Identity locale={locale} />
        <Overlap locale={locale} />
        <Ratings locale={locale} />
        <WorkTable locale={locale} />
        <Reach locale={locale} />
      </div>
    </section>
  );
}
