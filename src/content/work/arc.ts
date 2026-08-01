import type { Project } from "@/lib/types";

export const arc: Project = {
  slug: "arc",
  title: "Arc",
  oneLiner: {
    en: "An internal learning platform used across large-scale educational programs at Nitzanim.",
    he: "פלטפורמת למידה פנימית המשמשת בתוכניות חינוך רחבות היקף בניצנים.",
  },
  hook: {
    en: "I identified the field need, then founded, planned and developed the internal product around it.",
    he: "זיהיתי צורך מהשטח, ואז ייסדתי, תכננתי ופיתחתי סביבו מוצר פנימי.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "education", "platform"],
  role: {
    en: "Founder · Product planning · Development",
    he: "מייסד · תכנון מוצר · פיתוח",
  },
  team: {
    en: "Coordinated with instructors and relevant teams at Nitzanim",
    he: "בתיאום עם מנחים וצוותים רלוונטיים בניצנים",
  },
  started: "2023-01",
  dateLabel: {
    en: "Within Nitzanim role · 2023—present",
    he: "במסגרת התפקיד בניצנים · 2023—היום",
  },
  status: "internal",
  metrics: [],
  stack: [
    "Field discovery",
    "Requirements",
    "Gantt planning",
    "Curriculum systems",
    "Workflow QA",
  ],
  proof: [
    {
      label: { en: "Role record", he: "תיעוד תפקיד" },
      value: {
        en: "Founded, planned and developed Arc",
        he: "ייסוד, תכנון ופיתוח Arc",
      },
      access: "internal",
    },
    {
      label: { en: "Adoption record", he: "תיעוד שימוש" },
      value: {
        en: "Used across large-scale educational programs",
        he: "בשימוש בתוכניות חינוך רחבות היקף",
      },
      access: "internal",
    },
    {
      label: { en: "Delivery record", he: "תיעוד מסירה" },
      value: {
        en: "Field needs → planning → workflow tests → improvements",
        he: "צורכי שטח ← תכנון ← בדיקות תהליך ← שיפורים",
      },
      access: "internal",
    },
  ],
  sections: [
    {
      stage: "signal",
      heading: {
        en: "It began inside the work, not beside it",
        he: "זה התחיל בתוך העבודה, לא לצידה",
      },
      body: {
        en: [
          "Arc grew from needs I encountered while working as a programming instructor and EdTech content developer at Nitzanim. I founded, planned and developed it inside an operating educational environment, coordinating with instructors and relevant teams as it evolved.",
        ],
        he: [
          "Arc צמח מצרכים שפגשתי בעבודה כמנחה תכנות ומפתח תוכן EdTech בניצנים. ייסדתי, תכננתי ופיתחתי אותו בתוך סביבת חינוך פעילה, בתיאום עם מנחים וצוותים רלוונטיים בזמן שהתפתח.",
        ],
      },
    },
    {
      stage: "plan",
      heading: {
        en: "Product work and program delivery shared one plan",
        he: "עבודת המוצר ומסירת התוכנית חלקו תוכנית אחת",
      },
      body: {
        en: [
          "Requirement clarification, deliverable definition, Gantt planning, software, educational content and delivery lived in one plan. Initiatives were broken into actionable tasks and supported through execution rather than handed off as finished specifications.",
        ],
        he: [
          "בירור דרישות, הגדרת תוצרים, תכנון גאנט, תוכנה, תוכן חינוכי ומסירה חיו בתוכנית אחת. יוזמות פורקו למשימות מעשיות וקיבלו תמיכה בביצוע במקום להימסר כמסמכים גמורים.",
        ],
      },
    },
    {
      stage: "field",
      heading: {
        en: "Internal evidence stays labelled internal",
        he: "ראיות פנימיות נשארות מסומנות כפנימיות",
      },
      body: {
        en: [
          "Arc is used across large-scale educational programs, and its workflow was tested and improved with instructors and relevant teams. There is no public repository, screenshot, user count or usage dashboard attached here; the case is limited to the ownership and delivery record that can be stated publicly.",
        ],
        he: [
          "Arc משמש בתוכניות חינוך רחבות היקף, והתהליך שלו נבדק ושופר עם מנחים וצוותים רלוונטיים. אין כאן מאגר ציבורי, צילום מסך, מספר משתמשים או לוח שימוש; המקרה מוגבל לתיעוד האחריות והמסירה שאפשר לפרסם.",
        ],
      },
    },
  ],
  rebuild: {
    en: [
      "Publish one redacted interface frame so the product can be seen without exposing internal content.",
      "Add one dated planning artifact and one workflow-test excerpt with sensitive names removed.",
      "Replace broad adoption language with exact, defensible program and instructor counts once they are cleared.",
    ],
    he: [
      "לפרסם פריים מושחר אחד מהממשק כדי שהמוצר יהיה נראה בלי לחשוף תוכן פנימי.",
      "להוסיף תוצר תכנון מתוארך אחד וקטע אחד מבדיקת תהליך לאחר הסרת שמות רגישים.",
      "להחליף ניסוח רחב על שימוש במספרים מדויקים וניתנים להגנה של תוכניות ומנחים לאחר אישור.",
    ],
  },
};
