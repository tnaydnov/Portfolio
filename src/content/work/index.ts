import type { LS } from "@/lib/i18n";
import type { Project, Tier } from "@/lib/types";
import type { StageId } from "@/lib/stages";
import { arc } from "./arc";
import { applytide } from "./applytide";
import { eventa } from "./eventa";
import { lpr, tradingSystem } from "./systems";
import { reps } from "./reps";

export { arc, applytide, eventa, lpr, tradingSystem };

export const FLAGSHIPS: Project[] = [eventa, applytide, arc];
export const SYSTEMS: Project[] = [lpr, tradingSystem];
export const REPS: Project[] = reps;

export const ALL_PROJECTS: Project[] = [...FLAGSHIPS, ...SYSTEMS, ...REPS];

export const CASE_STUDIES = ALL_PROJECTS.filter((p) => p.tier !== "rep");

export function getProject(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function byTier(tier: Tier): Project[] {
  return ALL_PROJECTS.filter((p) => p.tier === tier);
}

export function byStage(stage: StageId): Project[] {
  return CASE_STUDIES.filter((p) => p.stages.includes(stage));
}

/** One piece of hard evidence per stage, used on the home page loop. */
export const STAGE_EVIDENCE: Record<
  StageId,
  { slug: string; title: string; claim: LS }
> = {
  signal: {
    slug: "arc",
    title: "Arc",
    claim: {
      en: "Arc began as a field need inside my Nitzanim work. I identified the need, founded the platform and coordinated its improvement with instructors and relevant teams.",
      he: "Arc התחיל כצורך מהשטח בתוך העבודה שלי בניצנים. זיהיתי את הצורך, ייסדתי את הפלטפורמה ותיאמתי את השיפור שלה עם מנחים וצוותים רלוונטיים.",
    },
  },
  frame: {
    slug: "eventa",
    title: "Eventa",
    claim: {
      en: "Eventa used mobile web, QR entry and event-scoped identities so the product could begin at the venue without an app-store install.",
      he: "Eventa השתמש בווב למובייל, כניסה ב־QR וזהויות מוגבלות לאירוע כדי שהמוצר יוכל להתחיל באולם בלי התקנה מחנות אפליקציות.",
    },
  },
  plan: {
    slug: "arc",
    title: "Arc",
    claim: {
      en: "Arc sat inside real program delivery: timelines, Gantt plans and initiatives broken into actionable tasks rather than a separate software backlog.",
      he: "Arc ישב בתוך מסירה אמיתית של תוכניות: לוחות זמנים, תוכניות גאנט ויוזמות שפורקו למשימות מעשיות במקום בק־לוג תוכנה נפרד.",
    },
  },
  build: {
    slug: "applytide",
    title: "Applytide",
    claim: {
      en: "The public Applytide record exposes eight Compose services, nineteen mapped entities and fifteen router groups—not just a feature list.",
      he: "התיעוד הציבורי של Applytide חושף שמונה שירותי Compose, תשע־עשרה ישויות ממופות וחמש־עשרה קבוצות ראוטרים — לא רק רשימת פיצ׳רים.",
    },
  },
  prove: {
    slug: "applytide",
    title: "Applytide",
    claim: {
      en: "A Redis-backed daily budget guard for AI calls, with per-user attribution and an explicit fail-open tradeoff.",
      he: "מגבלת תקציב יומית לקריאות AI המגובה ב־Redis, עם ייחוס למשתמש ופשרת fail-open מפורשת.",
    },
  },
  field: {
    slug: "arc",
    title: "Arc",
    claim: {
      en: "My public record supports workflow testing and improvements coordinated with instructors and relevant teams. The detailed product evidence remains internal.",
      he: "התיעוד הציבורי שלי תומך בבדיקת תהליכים ובשיפורים שתואמו עם מנחים וצוותים רלוונטיים. תיעוד המוצר המפורט נשאר פנימי.",
    },
  },
};
