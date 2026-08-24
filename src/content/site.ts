import type { LS, LSA } from "@/lib/i18n";

export const experienceTimeline: {
  id: string;
  span: LS;
  title: LS;
  org: LS;
  summary: LS;
  details: LSA;
  current?: boolean;
}[] = [
  {
    id: "nitzanim",
    span: { en: "2023 — now", he: "2023 — היום" },
    title: {
      en: "Programming Instructor & EdTech Content Developer",
      he: "מנחה תכנות ומפתח תוכן EdTech",
    },
    org: { en: "Nitzanim", he: "ניצנים" },
    summary: {
      en: "Teach programming and turn field needs into curricula, delivery plans and digital learning products.",
      he: "מלמד תכנות והופך צרכים מהשטח לתוכניות לימוד, תוכניות עבודה ומוצרים דיגיטליים ללמידה.",
    },
    details: {
      en: [
        "Work with clients and educational stakeholders to understand needs, clarify requirements, define deliverables and keep expectations aligned throughout development.",
        "Plan and develop syllabuses, presentations, lesson plans, instructor guides and programming exercises, adapting the sequence and explanation to different starting points and audiences.",
        "Build project timelines and Gantt plans, break initiatives into actionable tasks and support execution from initial planning through testing and delivery.",
        "Co-develop Arc with another engineer, translating field needs into product requirements, prioritising improvements, testing workflows and coordinating rollout with instructors and relevant teams.",
      ],
      he: [
        "עובד עם לקוחות ועם בעלי עניין חינוכיים כדי להבין צרכים, לחדד דרישות, להגדיר תוצרים ולשמור על תיאום ציפיות לאורך הפיתוח.",
        "מתכנן ומפתח סילבוסים, מצגות, מערכי שיעור, מדריכי מנחים ותרגילי תכנות, ומתאים את הרצף וההסבר לנקודות פתיחה ולקהלים שונים.",
        "בונה לוחות זמנים ותוכניות גאנט, מפרק יוזמות למשימות ישימות ומלווה את הביצוע מהתכנון הראשוני, דרך בדיקות ועד למסירה.",
        "מפתח את Arc בשיתוף עם מהנדס נוסף, מתרגם צרכים מהשטח לדרישות מוצר, מתעדף שיפורים, בודק תהליכי עבודה ומתאם את ההטמעה עם מנחים וצוותים רלוונטיים.",
      ],
    },
    current: true,
  },
  {
    id: "technical-support",
    span: { en: "2020 — 2023", he: "2020 — 2023" },
    title: { en: "Technical Support Roles · Tier 2", he: "תפקידי תמיכה טכנית · Tier 2" },
    org: {
      en: "IDF · Israel Electric Corporation · Isracard",
      he: "צה״ל · חברת החשמל · ישראכרט",
    },
    summary: {
      en: "Diagnosed user and system problems across three large organisations, learning to separate reported symptoms from underlying causes.",
      he: "אבחנתי תקלות משתמשים ומערכות בשלושה ארגונים גדולים, ולמדתי להפריד בין הסימפטום שדווח לבין הסיבה שמאחוריו.",
    },
    details: {
      en: [
        "Provided Tier 2 support involving Active Directory, Citrix, remote access, hardware, software and connectivity.",
        "Investigated user-reported symptoms and the system issues behind them, documented solutions and communicated next steps to users and technical teams.",
        "That work formed the habit of treating the first report as evidence—not necessarily as the root cause.",
      ],
      he: [
        "סיפקתי תמיכה טכנית ברמת Tier 2 בתחומי Active Directory, ‏Citrix, גישה מרחוק, חומרה, תוכנה וקישוריות.",
        "חקרתי הן את הסימפטום שהמשתמש תיאר והן את התקלה המערכתית שמאחוריו, תיעדתי פתרונות והעברתי את הצעדים הבאים למשתמשים ולצוותים טכניים.",
        "העבודה הזו בנתה אצלי את ההרגל להתייחס לדיווח הראשון כראיה — לא בהכרח כשורש הבעיה.",
      ],
    },
  },
];

export const educationTimeline: {
  id: string;
  span: LS;
  title: LS;
  org: LS;
  summary: LS;
  current?: boolean;
}[] = [
  {
    id: "shenkar",
    span: { en: "2026 — expected 2028", he: "2026 — צפי 2028" },
    title: {
      en: "M.Sc. Industrial Engineering & Management",
      he: "M.Sc. בהנדסת תעשייה וניהול",
    },
    org: {
      en: "Shenkar College of Engineering, Design and Art",
      he: "שנקר — הנדסה. עיצוב. אמנות",
    },
    summary: {
      en: "Studying the formal tools for designing, measuring and improving the systems I had previously approached by instinct.",
      he: "לומד את הכלים הפורמליים לתכנון, מדידה ושיפור של מערכות שקודם ניגשתי אליהן בעיקר מתוך אינטואיציה.",
    },
    current: true,
  },
  {
    id: "bgu",
    span: { en: "2021 — 2025", he: "2021 — 2025" },
    title: { en: "B.Sc. Software Engineering", he: "B.Sc. בהנדסת תוכנה" },
    org: {
      en: "Ben-Gurion University of the Negev",
      he: "אוניברסיטת בן־גוריון בנגב",
    },
    summary: {
      en: "The engineering foundation behind the systems and projects shown throughout this portfolio.",
      he: "הבסיס ההנדסי שמאחורי המערכות והפרויקטים שמופיעים לאורך הפורטפוליו.",
    },
  },
];

/** The environment in which the cross-functional profile is most useful. */
export const brief: { term: LS; def: LS }[] = [
  {
    term: { en: "The team", he: "הצוות" },
    def: {
      en: "A small, candid team where product, engineering and users are close enough to learn from one another quickly.",
      he: "צוות קטן וישיר שבו מוצר, הנדסה ומשתמשים קרובים מספיק כדי ללמוד זה מזה במהירות.",
    },
  },
  {
    term: { en: "The work", he: "העבודה" },
    def: {
      en: "Owning a problem from the first uncomfortable observation through framing, delivery and the iteration after real use.",
      he: "בעלות על בעיה מהתצפית הלא נוחה הראשונה, דרך מסגור ואספקה ועד לאיטרציה שאחרי שימוש אמיתי.",
    },
  },
  {
    term: { en: "The distance to users", he: "המרחק מהמשתמשים" },
    def: {
      en: "Short. Direct conversations and observation produce better decisions than second-hand summaries.",
      he: "קצר. שיחות ישירות ותצפית מייצרות החלטות טובות יותר מסיכומים מיד שנייה.",
    },
  },
  {
    term: { en: "What I bring", he: "מה אני מביא" },
    def: {
      en: "I can investigate the workflow, write the specification, understand the data model, build the critical path, teach the decision and revise it when reality disagrees.",
      he: "אני יכול לחקור את התהליך, לכתוב אפיון, להבין את מודל הנתונים, לבנות את הנתיב הקריטי, להסביר את ההחלטה ולתקן אותה כשהמציאות לא מסכימה.",
    },
  },
];

export const now: { label: LS; items: LSA } = {
  label: { en: "Now", he: "עכשיו" },
  items: {
    en: [
      "Co-developing Arc and improving educational workflows at Nitzanim.",
      "Studying Industrial Engineering & Management at Shenkar.",
      "Teaching programming and developing learning material.",
    ],
    he: [
      "מפתח במשותף את Arc ומשפר תהליכי עבודה חינוכיים בניצנים.",
      "לומד הנדסת תעשייה וניהול בשנקר.",
      "מלמד תכנות ומפתח חומרי למידה.",
    ],
  },
};
