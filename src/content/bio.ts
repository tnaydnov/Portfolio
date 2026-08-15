import type { LS } from "@/lib/i18n";

/**
 * One life, as data.
 *
 * This module is the single source of truth for three surfaces that must never
 * disagree: the Gantt on the home page, the trajectory line above it, and every
 * `data-tag` the crosshair matches on. Nothing downstream hard-codes a year, a
 * span, or a tag — if a date is wrong it is wrong in exactly one place.
 */

export type BioTag =
  | "idf-combat"
  | "c4i"
  | "iec"
  | "isracard"
  | "bgu"
  | "siraj"
  | "nitzanim"
  | "arc"
  | "leyman"
  | "shenkar";

/** Drives the bar's weight in the Gantt. Not a category for the reader. */
export type BioKind = "service" | "support" | "study" | "teach" | "build";

export interface BioEntry {
  id: BioTag;
  /** Inclusive. */
  start: number;
  /** Inclusive. `null` means still running. */
  end: number | null;
  title: LS;
  org: LS;
  note: LS;
  kind: BioKind;
  /**
   * Set where a date is derived rather than documented, so the uncertainty is
   * visible in the source instead of laundered into a confident chart.
   */
  approximate?: true;
}

export const BIO: BioEntry[] = [
  {
    id: "idf-combat",
    start: 2019,
    end: 2019,
    kind: "service",
    title: { en: "Combat soldier", he: "לוחם" },
    org: {
      en: "Combat Intelligence Collection Corps, IDF",
      he: "איסוף קרבי, צה״ל",
    },
    note: {
      en: "Intelligence gathering. The first job where being wrong about what you were looking at had a cost that was not measured in tickets.",
      he: "איסוף מודיעין. העבודה הראשונה שבה טעות בקריאת המצב עלתה במשהו שלא נמדד בקריאות שירות.",
    },
  },
  {
    id: "c4i",
    start: 2020,
    end: 2021,
    kind: "support",
    title: { en: "Help desk technician", he: "טכנאי מוקד תמיכה" },
    org: { en: "C4I Corps, IDF", he: "חיל התקשוב, צה״ל" },
    note: {
      en: "Hardware, software and networking for roughly 2,000 people. Active Directory accounts and access control.",
      he: "חומרה, תוכנה ורשתות עבור כ־2,000 איש. ניהול חשבונות Active Directory ובקרת גישה.",
    },
  },
  {
    id: "iec",
    start: 2021,
    end: 2022,
    kind: "support",
    title: { en: "Help desk technician, Tier 2", he: "טכנאי מוקד, Tier 2" },
    org: {
      en: "Israel Electric Corporation",
      he: "חברת החשמל לישראל",
    },
    note: {
      en: "Tier 2 for roughly 1,000 employees — Active Directory, Citrix, network troubleshooting. Cut resolution times by fixing remote connection configs rather than re-explaining them.",
      he: "‏Tier 2 עבור כ־1,000 עובדים — Active Directory, Citrix, פתרון תקלות רשת. קיצרתי זמני טיפול בכך שתיקנתי הגדרות חיבור מרחוק במקום להסביר אותן שוב ושוב.",
    },
  },
  {
    id: "isracard",
    start: 2022,
    end: 2023,
    kind: "support",
    approximate: true,
    title: { en: "Technical support, Tier 2", he: "תמיכה טכנית, Tier 2" },
    org: { en: "Isracard", he: "ישראכרט" },
    note: {
      en: "The third help desk. Three large organisations, three queues, one lesson: users describe symptoms, never causes.",
      he: "המוקד השלישי. שלושה ארגונים גדולים, שלושה תורים, לקח אחד: משתמשים מתארים סימפטומים, אף פעם לא סיבות.",
    },
  },
  {
    id: "bgu",
    start: 2021,
    end: 2025,
    kind: "study",
    title: { en: "B.Sc Software Engineering", he: "תואר ראשון בהנדסת תוכנה" },
    org: {
      en: "Ben-Gurion University of the Negev",
      he: "אוניברסיטת בן־גוריון בנגב",
    },
    note: {
      en: "The build half. Algorithms, OOP, database systems — and every rep in the ledger.",
      he: "החצי של הבנייה. אלגוריתמים, תכנות מונחה עצמים, מסדי נתונים — וכל החזרות שברשימה.",
    },
  },
  {
    id: "siraj",
    start: 2023,
    end: 2023,
    kind: "teach",
    title: { en: "Scholarship mentor", he: "חונך מלגות" },
    org: {
      en: "Siraj Programme, Ben-Gurion University",
      he: "תוכנית סיראג׳, אוניברסיטת בן־גוריון",
    },
    note: {
      en: "Mentored underrepresented students through Software Engineering coursework. The first time teaching was the job rather than a favour.",
      he: "חניכה של סטודנטים מאוכלוסיות מיוצגות־חסר בקורסי הנדסת תוכנה. הפעם הראשונה שההוראה הייתה התפקיד ולא טובה.",
    },
  },
  {
    id: "nitzanim",
    start: 2023,
    end: null,
    kind: "teach",
    title: {
      en: "Programming instructor & content developer",
      he: "מנחה תכנות ומפתח תוכן",
    },
    org: { en: "Nitzanim", he: "ניצנים" },
    note: {
      en: "Teaching teenagers Python, and writing the syllabuses, lesson plans, exercises and instructor guides underneath. Requirements work with clients and educational stakeholders.",
      he: "מלמד בני נוער פייתון, וכותב את הסילבוסים, מערכי השיעור, התרגילים והמדריכים למנחים שמתחת. אפיון דרישות מול לקוחות ובעלי עניין חינוכיים.",
    },
  },
  {
    id: "arc",
    start: 2023,
    end: null,
    kind: "build",
    title: { en: "Founded and shipped Arc", he: "ייסדתי ושלחתי את Arc" },
    org: { en: "Internal platform, Nitzanim", he: "פלטפורמה פנימית, ניצנים" },
    note: {
      en: "Nobody requested it. I noticed six instructors rebuilding the same material six ways, and it has been in production ever since.",
      he: "אף אחד לא ביקש אותה. שמתי לב לשישה מנחים שבונים מחדש את אותו חומר בשש דרכים, ומאז היא בייצור.",
    },
  },
  {
    id: "leyman",
    start: 2024,
    end: 2024,
    kind: "teach",
    title: { en: "Computer science teacher", he: "מורה למדעי המחשב" },
    org: { en: "Leyman High School", he: "תיכון ליימן" },
    note: {
      en: "Java, recursion, data structures and OOP. Prepared 50+ students for the national Bagrut exams — a deadline that does not move.",
      he: "‏Java, רקורסיה, מבני נתונים ותכנות מונחה עצמים. הכנתי יותר מ־50 תלמידים לבגרות — תאריך יעד שלא זז.",
    },
  },
  {
    id: "shenkar",
    start: 2026,
    end: 2028,
    kind: "study",
    title: {
      en: "M.Sc Industrial Engineering & Management",
      he: "תואר שני בהנדסת תעשייה וניהול",
    },
    org: {
      en: "Shenkar College of Engineering, Design and Art",
      he: "שנקר — הנדסה. עיצוב. אמנות",
    },
    note: {
      en: "The systems half. Process design and optimisation — the formal tools behind what I had been doing by instinct since the first help desk.",
      he: "החצי המערכתי. תכנון תהליכים ואופטימיזציה — הכלים הפורמליים שמאחורי מה שעשיתי באינטואיציה מאז המוקד הראשון.",
    },
  },
];

/**
 * Resolved at build. The Gantt needs an end for open-ended bars, and the
 * masthead's revision stamp needs a date. Both come from here so a rebuild
 * moves them together.
 */
export const BUILT_AT = new Date();
export const CURRENT_YEAR = BUILT_AT.getUTCFullYear();

/** Where a bar stops being drawn. Open-ended bars run to today. */
export function endOf(entry: BioEntry): number {
  return entry.end ?? CURRENT_YEAR;
}

export const SPAN_START = Math.min(...BIO.map((e) => e.start));
export const SPAN_END = Math.max(...BIO.map(endOf));

export const YEARS: number[] = Array.from(
  { length: SPAN_END - SPAN_START + 1 },
  (_, i) => SPAN_START + i,
);

/** Every tag running in a given year. Drives the year-tick crosshair links. */
export function tagsInYear(year: number): BioTag[] {
  return BIO.filter((e) => e.start <= year && year <= endOf(e)).map((e) => e.id);
}

/**
 * The busiest year, computed rather than typed — so the "N at once" caption
 * cannot drift from the bars sitting directly beneath it.
 */
export const PEAK: { year: number; count: number; tags: BioTag[] } = YEARS.map(
  (year) => {
    const tags = tagsInYear(year);
    return { year, count: tags.length, tags };
  },
).reduce((best, candidate) => (candidate.count > best.count ? candidate : best));

/** The contiguous run of years that all share the peak count. */
export const PEAK_SPAN: { from: number; to: number } = (() => {
  const years = YEARS.filter((y) => tagsInYear(y).length === PEAK.count);
  return { from: Math.min(...years), to: Math.max(...years) };
})();

export function entry(id: BioTag): BioEntry {
  const found = BIO.find((e) => e.id === id);
  if (!found) throw new Error(`Unknown bio entry: ${id}`);
  return found;
}

/** Every tag the crosshair can light. Used to generate its CSS rules. */
export const ALL_TAGS: BioTag[] = BIO.map((e) => e.id);
