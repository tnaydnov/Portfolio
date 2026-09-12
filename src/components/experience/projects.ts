import type { Locale } from "@/lib/i18n";

export const EXPERIENCE_PROJECTS = ["arc", "applytide", "eventa"] as const;
export type ExperienceProject = (typeof EXPERIENCE_PROJECTS)[number];
export function isExperienceProject(value: string | null): value is ExperienceProject {
  return EXPERIENCE_PROJECTS.includes(value as ExperienceProject);
}

export const experienceProjects = {
  arc: {
    name: "Arc", number: "01", accent: "#a7ecd4", secondary: "#537e72",
    category: { en: "Learning operations", he: "מערכת לניהול למידה" },
    purpose: { en: "A better connection between what we teach and what happens next.", he: "חיבור טוב יותר בין מה שמלמדים לבין מה שקורה אחר כך." },
    description: { en: "Reusable lessons. Real classroom context. Feedback that informs the next version.", he: "שיעורים לשימוש חוזר. הקשר כיתתי. משוב שמכוון את הגרסה הבאה." },
    role: { en: "Co-developed", he: "פיתוח משותף" },
    status: { en: "Portal online", he: "הפורטל זמין" },
    action: { en: "Follow a lesson", he: "לעקוב אחר שיעור" },
    reset: { en: "Reset the view", he: "איפוס התצוגה" },
    stages: { en: ["Reusable content", "Classroom release", "Feedback & revision"], he: ["תוכן לשימוש חוזר", "פרסום לכיתה", "משוב ושיפור"] },
    response: { en: "A sample lesson moves into the classroom. The source stays connected, so feedback can inform its next revision.", he: "שיעור לדוגמה עובר לכיתה. המקור נשאר מחובר, כדי שהמשוב יוכל להשפיע על הגרסה הבאה." },
  },
  applytide: {
    name: "Applytide", number: "02", accent: "#ffb49e", secondary: "#946251",
    category: { en: "Job-search organization", he: "ארגון חיפוש עבודה" },
    purpose: { en: "An opportunity should become a next step. Not another open tab.", he: "הזדמנות צריכה להפוך לצעד הבא. לא לעוד לשונית פתוחה." },
    description: { en: "Capture a posting. Keep its context. Give every application a place to move forward.", he: "לתפוס משרה. לשמור את ההקשר. לתת לכל מועמדות מקום להתקדם." },
    role: { en: "Solo project", he: "פרויקט עצמאי" },
    status: { en: "Archived", he: "בארכיון" },
    action: { en: "Follow an opportunity", he: "לעקוב אחר הזדמנות" },
    reset: { en: "Reset the view", he: "איפוס התצוגה" },
    stages: { en: ["Capture", "Organize", "Follow through"], he: ["קליטה", "ארגון", "מעקב"] },
    response: { en: "A fictional opportunity moves from a browser posting into a structured record, keeping its application context together.", he: "הזדמנות בדיונית עוברת מלשונית בדפדפן לרשומה מסודרת, ושומרת את הקשר המועמדות במקום אחד." },
  },
  eventa: {
    name: "Eventa", number: "03", accent: "#ceb6ff", secondary: "#78698e",
    category: { en: "Connections at weddings", he: "חיבורים בחתונות" },
    purpose: { en: "A room full of people. A simpler way to say hello.", he: "חדר מלא באנשים. דרך פשוטה יותר להכיר." },
    description: { en: "A short path from event entry to guest profiles and a relevant introduction.", he: "דרך קצרה מכניסה לאירוע, דרך פרופילי אורחים ועד להיכרות רלוונטית." },
    role: { en: "Solo project", he: "פרויקט עצמאי" },
    status: { en: "Discontinued", he: "הופסק" },
    action: { en: "Make a connection", he: "ליצור חיבור" },
    reset: { en: "Reset the view", he: "איפוס התצוגה" },
    stages: { en: ["Event entry", "Guest profiles", "A connection"], he: ["כניסה לאירוע", "פרופילי אורחים", "חיבור"] },
    response: { en: "Two fictional guest profiles connect within one event. This illustration does not send messages or represent real guests.", he: "שני פרופילים בדיוניים מתחברים במסגרת אירוע אחד. ההמחשה אינה שולחת הודעות או מציגה אורחים אמיתיים." },
  },
} as const;

export function experienceText<T>(value: { en: T; he: T }, locale: Locale): T {
  return value[locale];
}
