import type { LS } from "@/lib/i18n";
import type { Project, Tier } from "@/lib/types";
import type { StageId } from "@/lib/stages";
import { arc } from "./arc";
import { applytide } from "./applytide";
import { eventa } from "./eventa";
import { lpr, tradingSystem } from "./systems";
import { reps } from "./reps";

export const FLAGSHIPS: Project[] = [arc, applytide, eventa];
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
      en: "Nobody requested Arc. I noticed six instructors rebuilding the same material six ways and went looking for why a shared folder had already failed.",
      he: "אף אחד לא ביקש את Arc. שמתי לב לשישה מנחים שבונים מחדש את אותו חומר בשש דרכים והלכתי לברר למה תיקייה משותפת כבר נכשלה.",
    },
  },
  frame: {
    slug: "eventa",
    title: "Eventa",
    claim: {
      en: "Framing Eventa around onboarding completion ruled out a native app, accounts and passwords before a single screen was designed.",
      he: "מסגור Eventa סביב השלמת הכניסה פסל אפליקציית נייטיב, חשבונות וסיסמאות עוד לפני שעוצב מסך אחד.",
    },
  },
  plan: {
    slug: "arc",
    title: "Arc",
    claim: {
      en: "Arc's riskiest assumption was behavioural, not technical — so I tested whether instructors would share material before building anything to share it with.",
      he: "ההנחה המסוכנת ביותר של Arc הייתה התנהגותית, לא טכנית — אז בדקתי אם מנחים ישתפו חומר לפני שבניתי משהו לשתף בו.",
    },
  },
  build: {
    slug: "applytide",
    title: "Applytide",
    claim: {
      en: "Six services, twenty data models, fourteen routers — and a written defence for why each boundary exists and what it would take to delete it.",
      he: "שישה שירותים, עשרים מודלי נתונים, ארבעה־עשר ראוטרים — והגנה כתובה לכל גבול: למה הוא קיים ומה יידרש כדי למחוק אותו.",
    },
  },
  prove: {
    slug: "applytide",
    title: "Applytide",
    claim: {
      en: "A hard daily spending cap on AI calls, enforced in Redis with per-user attribution. That is what makes an AI feature safe to leave running.",
      he: "תקרת הוצאה יומית קשיחה על קריאות בינה מלאכותית, נאכפת ב־Redis עם ייחוס לכל משתמש. זה מה שהופך פיצ׳ר בינה מלאכותית לבטוח להשארה פעילה.",
    },
  },
  field: {
    slug: "arc",
    title: "Arc",
    claim: {
      en: "Three years of classroom use. Almost nothing Arc does today was in the original spec, and the largest improvement came from a complaint I first dismissed.",
      he: "שלוש שנים של שימוש בכיתות. כמעט כלום ממה ש־Arc עושה היום לא היה באפיון המקורי, והשיפור הגדול ביותר הגיע מתלונה שבהתחלה פטרתי.",
    },
  },
};
