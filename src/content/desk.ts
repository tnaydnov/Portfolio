import type { LS, Locale } from "@/lib/i18n";
import type { BioTag } from "./bio";

/**
 * המוקד — the desk.
 *
 * The Hebrew word for a support desk is also the word for a lens's focal
 * point. Three years behind one is where the sentence in `site.ts` came from:
 * users describe symptoms, never causes. This module is that sentence with its
 * evidence re-attached.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADDING A TICKET — read this before you do
 *
 * `said` is a human being's words. It renders in the language it was spoken in,
 * in both locales, with a gloss beneath for whoever does not read that script.
 *
 * `attested` is the honesty switch, and it is not decoration:
 *   true  — you are confident of the wording. Renders plain.
 *   false — you reconstructed it from memory or from your own case-study prose.
 *           Renders with a visible RECONSTRUCTED mark.
 *
 * Do not invent a quote and mark it `true`. The entire argument of this site is
 * that it does not overstate; this is the one file where that is cheapest to
 * break and most expensive to be caught at.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Ticket {
  id: string;
  tags: BioTag[];
  year: string;
  /** Which script `said` is written in. Drives `dir` and `lang` on the cell. */
  saidLocale: Locale;
  /** Raw, in the language it was spoken. Not a localised record — a quotation. */
  said: string;
  /** Rendered small beneath `said`, for readers of the other script. */
  gloss: LS;
  /** What was actually wrong. */
  was: LS;
  /** What changed as a result. */
  changed: LS;
  attested: boolean;
  /** Optional link to the case study that carries the full story. */
  slug?: string;
}

export const TICKETS: Ticket[] = [
  {
    id: "T-01",
    tags: ["arc", "nitzanim"],
    year: "2024",
    saidLocale: "he",
    said: "אי אפשר להבין מהחומר איפה המפגש הקודם נעצר",
    gloss: {
      en: "“You can't tell from the material where the previous session stopped.”",
      he: "„אי אפשר להבין מהחומר איפה המפגש הקודם נעצר.”",
    },
    was: {
      en: "I filed it as a documentation problem and dismissed it. It was not. Arc had no concept of a session having a state at all — every instructor was reconstructing that from memory, every week.",
      he: "תייקתי את זה כבעיית תיעוד ופטרתי אותה. זו לא הייתה. ל־Arc לא היה מושג כזה בכלל — מצב של מפגש. כל מנחה שיחזר את זה מהזיכרון, כל שבוע.",
    },
    changed: {
      en: "Session state. An instructor opens a course and sees exactly where the last one stopped. It is the single largest improvement Arc has had, and it came from the complaint I got wrong.",
      he: "מצב מפגש. מנחה פותח קורס ורואה בדיוק איפה הקודם נעצר. זה השיפור הגדול ביותר ש־Arc עבר, והוא הגיע מהתלונה שטעיתי לגביה.",
    },
    // Reconstructed from the field section of the Arc case study, which records
    // the substance of the complaint but not its wording.
    attested: false,
    slug: "arc",
  },

  /* ───────────────────────────────────────────────────────────────────────────
   * TOMER — three templates. Fill any of them in and delete the comment markers.
   * The component renders 1, 2, 3 or 4 rows and is composed for each count.
   *
   * The best ones are from the help desks: the complaint that sounded like one
   * thing and turned out to be another. Roughly fifteen words each.
   *
   * {
   *   id: "T-02",
   *   tags: ["c4i"],
   *   year: "2020",
   *   saidLocale: "he",
   *   said: "האינטרנט לא עובד",
   *   gloss: { en: "“The internet isn't working.”", he: "„האינטרנט לא עובד.”" },
   *   was:     { en: "…what it actually turned out to be", he: "…מה זה באמת היה" },
   *   changed: { en: "…what you changed because of it", he: "…מה שינית בעקבות זה" },
   *   attested: true,
   * },
   * {
   *   id: "T-03",
   *   tags: ["iec"],
   *   year: "2021",
   *   saidLocale: "he",
   *   said: "…",
   *   gloss: { en: "…", he: "…" },
   *   was:     { en: "…", he: "…" },
   *   changed: { en: "…", he: "…" },
   *   attested: true,
   * },
   * {
   *   id: "T-04",
   *   tags: ["nitzanim"],
   *   year: "2024",
   *   saidLocale: "he",
   *   said: "…",
   *   gloss: { en: "…", he: "…" },
   *   was:     { en: "…", he: "…" },
   *   changed: { en: "…", he: "…" },
   *   attested: true,
   * },
   * ─────────────────────────────────────────────────────────────────────────── */
];
