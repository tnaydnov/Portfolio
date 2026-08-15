import type { LS } from "@/lib/i18n";
import { CURRENT_YEAR, entry, type BioTag } from "./bio";

/**
 * The home page reads as a datasheet for one person. Its content lives here;
 * `lib/ui.ts` stays what its header claims to be — chrome only.
 *
 * Every item carries the `tags` it belongs to. Those become `data-tag`
 * attributes, and the crosshair does the rest in CSS.
 */

export interface Tagged {
  tags: BioTag[];
}

/**
 * The overlap caption reads "Five at once", not "5 at once". The count is
 * derived from the data, so the word has to be looked up rather than typed.
 * Hebrew forms are masculine, agreeing with the elided noun (things/roles).
 */
export const COUNT_WORD: Record<number, LS> = {
  2: { en: "Two", he: "שניים" },
  3: { en: "Three", he: "שלושה" },
  4: { en: "Four", he: "ארבעה" },
  5: { en: "Five", he: "חמישה" },
  6: { en: "Six", he: "שישה" },
  7: { en: "Seven", he: "שבעה" },
};

/** The six-segment line under the name. Read in one pass, left to right. */
export const TRAJECTORY: (Tagged & { label: LS })[] = [
  {
    tags: ["idf-combat"],
    label: { en: "Combat · 2019", he: "לוחם · 2019" },
  },
  {
    tags: ["c4i", "iec", "isracard"],
    label: {
      en: "Help desk · ~3,000 people",
      he: "מוקד תמיכה · ‎~3,000 איש",
    },
  },
  {
    tags: ["bgu"],
    label: { en: "B.Sc Software Engineering", he: "הנדסת תוכנה" },
  },
  {
    tags: ["nitzanim", "leyman", "siraj"],
    label: { en: "650 students", he: "650 תלמידים" },
  },
  {
    tags: ["arc"],
    label: {
      en: `Arc · ${CURRENT_YEAR - entry("arc").start} years live`,
      he: `‏Arc · ${CURRENT_YEAR - entry("arc").start} שנים באוויר`,
    },
  },
  {
    tags: ["shenkar"],
    label: {
      en: "M.Sc Industrial Engineering",
      he: "הנדסת תעשייה וניהול",
    },
  },
];

/**
 * Five numbers, each one traceable to a job with dates. `source` is printed
 * beneath the figure so the crosshair is an accelerator, never the only path
 * to the relationship.
 */
export const RATINGS: (Tagged & { value: LS; label: LS; source: LS })[] = [
  {
    tags: ["c4i", "iec", "isracard"],
    value: { en: "~3,000", he: "‎~3,000" },
    label: {
      en: "People I supported at three help desks",
      he: "אנשים שתמכתי בהם בשלושה מוקדים",
    },
    source: { en: "IDF · IEC · Isracard · 2020—2023", he: "צה״ל · חח״י · ישראכרט · 2020—2023" },
  },
  {
    tags: ["nitzanim", "leyman"],
    value: { en: "650+", he: "‎650+" },
    label: { en: "Students taught", he: "תלמידים שלימדתי" },
    source: { en: "Nitzanim · Leyman · 2023—", he: "ניצנים · ליימן · 2023—" },
  },
  {
    tags: ["arc", "nitzanim"],
    value: {
      en: `${CURRENT_YEAR - entry("arc").start} yrs`,
      he: `${CURRENT_YEAR - entry("arc").start} שנים`,
    },
    label: {
      en: "Arc in production, unbroken",
      he: "‏Arc בייצור, ברציפות",
    },
    source: { en: "Nitzanim · 2023—", he: "ניצנים · 2023—" },
  },
  {
    tags: ["leyman"],
    value: { en: "50+", he: "‎50+" },
    label: {
      en: "Prepared for national Bagrut exams",
      he: "תלמידים שהכנתי לבגרות",
    },
    source: { en: "Leyman High School · 2024", he: "תיכון ליימן · 2024" },
  },
  {
    tags: ["bgu", "shenkar"],
    value: { en: "2", he: "2" },
    label: {
      en: "Degrees — one to build, one to see the system",
      he: "תארים — אחד לבנות, אחד לראות את המערכת",
    },
    source: { en: "BGU · Shenkar · 2021—2028", he: "בן־גוריון · שנקר · 2021—2028" },
  },
];

/** The six work rows. `slug` links into the existing case studies. */
export const WORK_ROWS: (Tagged & {
  slug: string;
  title: string;
  what: LS;
  status: LS;
})[] = [
  {
    tags: ["arc", "nitzanim"],
    slug: "arc",
    title: "Arc",
    what: {
      en: "Learning platform I founded, for the instructors I work beside",
      he: "פלטפורמת למידה שייסדתי, למנחים שאני עובד לצידם",
    },
    status: { en: "In production, 3 years", he: "בייצור, 3 שנים" },
  },
  {
    tags: ["bgu"],
    slug: "applytide",
    title: "Applytide",
    what: {
      en: "Job-search pipeline with real instrumentation — 6 services, 20 models",
      he: "צינור חיפוש עבודה עם מדידה אמיתית — 6 שירותים, 20 מודלים",
    },
    status: { en: "Archived — and here is why", he: "בארכיון — והנה למה" },
  },
  {
    tags: [],
    slug: "eventa",
    title: "Eventa",
    what: {
      en: "150 strangers in a room and no way to meet. QR in, no accounts",
      he: "‏150 זרים בחדר בלי דרך להכיר. כניסה ב־QR, בלי חשבונות",
    },
    status: { en: "Building now", he: "בבנייה עכשיו" },
  },
  {
    tags: ["bgu"],
    slug: "lpr",
    title: "License Plate Recognition",
    what: {
      en: "YOLO + OCR over Redis queues, in Dockerised services",
      he: "‏YOLO ו־OCR מעל תורי Redis, בשירותים מוכלים",
    },
    status: { en: "Shipped", he: "נשלח" },
  },
  {
    tags: ["bgu"],
    slug: "trading-system",
    title: "Trading System",
    what: {
      en: "A large team project. What I owned is stated on the page",
      he: "פרויקט צוות גדול. מה שהייתי אחראי עליו כתוב בעמוד",
    },
    status: { en: "Shipped", he: "נשלח" },
  },
];

/**
 * The one thing on the sheet that is a request rather than a claim.
 */
export const WANTED: LS = {
  en: "A technical product role on a small team, close enough to the users that the complaint arrives before the summary of the complaint does.",
  he: "תפקיד מוצר טכני בצוות קטן, מספיק קרוב למשתמשים כדי שהתלונה תגיע לפני הסיכום של התלונה.",
};
