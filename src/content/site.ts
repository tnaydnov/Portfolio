import type { LS, LSA } from "@/lib/i18n";

export const timeline: {
  span: LS;
  title: LS;
  org: LS;
  note: LS;
  current?: boolean;
}[] = [
  {
    span: {
      en: "2026 — present · expected 2028",
      he: "2026 — היום · סיום צפוי 2028",
    },
    title: {
      en: "M.Sc. student · Industrial Engineering & Management",
      he: "סטודנט לתואר שני · הנדסת תעשייה וניהול",
    },
    org: {
      en: "Shenkar College of Engineering, Design and Art",
      he: "שנקר — הנדסה. עיצוב. אמנות",
    },
    note: {
      en: "The systems half. Process design, optimisation, and the formal tools behind what I had been doing by instinct.",
      he: "החצי המערכתי. תכנון תהליכים, אופטימיזציה, והכלים הפורמליים שמאחורי מה שעשיתי באינטואיציה.",
    },
    current: true,
  },
  {
    span: { en: "2023 — now", he: "2023 — היום" },
    title: {
      en: "Programming Instructor & EdTech Content Developer",
      he: "מנחה תכנות ומפתח תוכן EdTech",
    },
    org: { en: "Nitzanim", he: "ניצנים" },
    note: {
      en: "Requirements with clients and educational stakeholders, curriculum and product development, Gantt planning, and Arc — an internal learning platform I founded and shipped.",
      he: "אפיון דרישות מול לקוחות ובעלי עניין חינוכיים, פיתוח תוכן ומוצר, תכנון גאנט, ו־Arc — פלטפורמת למידה פנימית שייסדתי ושלחתי לאוויר.",
    },
    current: true,
  },
  {
    span: { en: "2021 — 2025", he: "2021 — 2025" },
    title: { en: "B.Sc. Software Engineering", he: "בוגר בהנדסת תוכנה" },
    org: {
      en: "Ben-Gurion University of the Negev",
      he: "אוניברסיטת בן־גוריון בנגב",
    },
    note: {
      en: "The build half. Where the reps in the ledger come from.",
      he: "החצי של הבנייה. משם מגיעות החזרות שברשימה.",
    },
  },
  {
    span: { en: "Oct 2022 — Jun 2023", he: "אוק׳ 2022 — יונ׳ 2023" },
    title: {
      en: "Volunteer Software Engineering Mentor",
      he: "מנטור מתנדב להנדסת תוכנה",
    },
    org: { en: "Siraj Technologies", he: "Siraj Technologies" },
    note: {
      en: "Mentored Bedouin software-engineering students through required university courses.",
      he: "ליווי סטודנטים בדואים להנדסת תוכנה בקורסי החובה באוניברסיטה.",
    },
  },
  {
    span: { en: "2020 — 2023", he: "2020 — 2023" },
    title: { en: "Technical Support, Tier 2", he: "תמיכה טכנית, Tier 2" },
    org: {
      en: "IDF · Israel Electric Corporation · Isracard",
      he: "צה״ל · חברת החשמל · ישראכרט",
    },
    note: {
      en: "Three large organisations, three helpdesks. This is where I learned that users describe symptoms, never causes.",
      he: "שלושה ארגונים גדולים, שלושה מוקדי תמיכה. כאן למדתי שמשתמשים מתארים סימפטומים, אף פעם לא סיבות.",
    },
  },
];

export const numbers: { value: LS; label: LS }[] = [
  {
    value: { en: "2023—now", he: "2023—היום" },
    label: { en: "Nitzanim · EdTech", he: "ניצנים · EdTech" },
  },
  {
    value: { en: "2021—25", he: "2021—25" },
    label: { en: "B.Sc. Software Engineering", he: "B.Sc. הנדסת תוכנה" },
  },
  {
    value: { en: "2026—28", he: "2026—28" },
    label: { en: "M.Sc. in progress", he: "M.Sc. בתהליך" },
  },
  {
    value: { en: "6", he: "6" },
    label: { en: "Delivery stages I work across", he: "שלבי מסירה שאני עובד לאורכם" },
  },
];

/** The inverted job description. */
export const brief: { term: LS; def: LS }[] = [
  {
    term: { en: "The work", he: "העבודה" },
    def: {
      en: "Owning a problem from the moment it is noticed to the moment it stops being a problem. Not a lane inside someone else's loop.",
      he: "בעלות על בעיה מהרגע שמזהים אותה ועד הרגע שהיא מפסיקה להיות בעיה. לא נתיב בתוך הלולאה של מישהו אחר.",
    },
  },
  {
    term: { en: "The distance to users", he: "המרחק מהמשתמשים" },
    def: {
      en: "Short. I want to hear the complaint, not a summary of the complaint in a quarterly deck.",
      he: "קצר. אני רוצה לשמוע את התלונה, לא סיכום של התלונה במצגת רבעונית.",
    },
  },
  {
    term: { en: "What I bring", he: "מה אני מביא" },
    def: {
      en: "I can write the spec and then implement it, which means the spec is shippable. I can plan the timeline and then live inside it, which means the timeline is honest.",
      he: "אני יכול לכתוב את האפיון ואז לממש אותו, ולכן האפיון בר־שליחה. אני יכול לתכנן את לוח הזמנים ואז לחיות בתוכו, ולכן לוח הזמנים כן.",
    },
  },
];

export const budgetTargets: {
  metric: LS;
  target: LS;
  measured: LS;
  note: LS;
}[] = [
  {
    metric: { en: "First-load JS, home", he: "‏JS ראשוני, דף הבית" },
    target: { en: "< 180 kB", he: "‎< 180 kB" },
    measured: { en: "136 kB", he: "136 kB" },
    note: { en: "gzip · Next build · 2026-08-01", he: "gzip · Next build · 2026-08-01" },
  },
  {
    metric: { en: "First-load JS, case", he: "‏JS ראשוני, מקרה בוחן" },
    target: { en: "< 180 kB", he: "‎< 180 kB" },
    measured: { en: "137 kB", he: "137 kB" },
    note: { en: "gzip · Next build · 2026-08-01", he: "gzip · Next build · 2026-08-01" },
  },
  {
    metric: {
      en: "General-purpose animation libraries",
      he: "ספריות אנימציה כלליות",
    },
    target: { en: "0", he: "0" },
    measured: { en: "0", he: "0" },
    note: { en: "CSS motion only", he: "תנועת CSS בלבד" },
  },
  {
    metric: { en: "Runtime dependencies", he: "תלויות זמן ריצה" },
    target: { en: "Minimal", he: "מינימלי" },
    measured: { en: "5", he: "5" },
    note: { en: "Including next & react", he: "כולל next ו־react" },
  },
  {
    metric: { en: "Autoplay project video", he: "סרטון פרויקט אוטומטי" },
    target: { en: "0", he: "0" },
    measured: { en: "0", he: "0" },
    note: { en: "Explicit controls on case pages", he: "פקדים מפורשים בעמודי המקרים" },
  },
  {
    metric: { en: "WebGL", he: "WebGL" },
    target: { en: "None", he: "אין" },
    measured: { en: "None", he: "אין" },
    note: { en: "SVG and CSS instead", he: "‏SVG ו־CSS במקום" },
  },
];

export const colophonRules: { title: LS; body: LS }[] = [
  {
    title: {
      en: "Motion has to earn its weight",
      he: "תנועה צריכה להצדיק את המשקל שלה",
    },
    body: {
      en: "The routed pages use restrained CSS entry motion and native scrolling. The proof-first redesign removed the long pinned homepage sequence; movement now supports hierarchy instead of becoming the subject.",
      he: "העמודים הפעילים משתמשים בתנועת כניסה מאופקת ב־CSS ובגלילה טבעית. העיצוב המחודש הסיר את רצף הבית הארוך והמוצמד; התנועה תומכת עכשיו בהיררכיה במקום להפוך לנושא.",
    },
  },
  {
    title: {
      en: "Reduced motion is a layout, not a downgrade",
      he: "תנועה מופחתת היא פריסה, לא הורדת דרגה",
    },
    body: {
      en: "With prefers-reduced-motion, CSS animation collapses to a static state. Project videos never autoplay; the full demos require an explicit press on their case-study pages.",
      he: "עם prefers-reduced-motion אנימציית CSS מצטמצמת למצב סטטי. סרטוני פרויקטים לעולם אינם מתחילים אוטומטית; ההדגמות המלאות דורשות לחיצה מפורשת בעמודי מקרי הבוחן.",
    },
  },
  {
    title: {
      en: "The cinematic layer is SVG and CSS",
      he: "השכבה הקולנועית היא SVG ו־CSS",
    },
    body: {
      en: "No WebGL, no 3D scene, no shader. The loop schematic is a single SVG path that draws itself with stroke-dashoffset, the grain is one inline feTurbulence filter, and the depth comes from typography and hairlines. A WebGL hero would have cost more in Largest Contentful Paint than it returned in impression.",
      he: "בלי WebGL, בלי סצנת תלת־ממד, בלי שיידר. סכמת הלולאה היא נתיב SVG יחיד שמצייר את עצמו עם stroke-dashoffset, הגרעיניות היא מסנן feTurbulence אחד מוטמע, והעומק מגיע מטיפוגרפיה וקווי שיער. גיבור WebGL היה עולה יותר ב־LCP ממה שהיה מחזיר ברושם.",
    },
  },
  {
    title: {
      en: "Bilingual from the data model up",
      he: "דו־לשוני החל ממודל הנתונים",
    },
    body: {
      en: "Localized narrative and interface strings are typed as records keyed by locale, so a missing translation in those records is a compile error rather than a hole in the page. Direction is handled with logical CSS properties, not a mirrored stylesheet. The pattern follows the bilingual approach used in Applytide.",
      he: "מחרוזות נרטיב וממשק מקומיות מוגדרות כרשומות לפי שפה, כך שתרגום חסר ברשומות האלה הוא שגיאת קומפילציה ולא חור בדף. כיוון מטופל בתכונות CSS לוגיות, לא בגיליון סגנונות משוקף. התבנית ממשיכה את הגישה הדו־לשונית שבה השתמשתי ב־Applytide.",
    },
  },
  {
    title: {
      en: "Content is typed, not markdown",
      he: "התוכן מוגדר בטיפוסים, לא ב־Markdown",
    },
    body: {
      en: "Case studies are TypeScript modules rather than MDX, because the format is a strict schema: stage sections, decision entries with a mandatory tradeoff, metrics, a graph topology. Typed content means the compiler enforces that every decision has a cost attached. MDX would have made it prose with escape hatches.",
      he: "מקרי הבוחן הם מודולי TypeScript ולא MDX, כי הפורמט הוא סכמה קשיחה: מקטעי שלבים, רשומות החלטה עם פשרה חובה, מדדים, טופולוגיית גרף. תוכן מוגדר בטיפוסים אומר שהמהדר אוכף שלכל החלטה מוצמד מחיר. MDX היה הופך את זה לפרוזה עם דלתות מילוט.",
    },
  },
  {
    title: {
      en: "What I would rebuild",
      he: "מה הייתי בונה מחדש",
    },
    body: {
      en: "The case-study schema grew organically and now has optional fields that only one project uses. I would collapse those into a block list. I would also add a visual regression check before the next redesign, because I verified this build by looking at it, which is exactly the kind of manual step I tell other people to automate.",
      he: "סכמת מקרי הבוחן צמחה אורגנית ויש בה עכשיו שדות אופציונליים שרק פרויקט אחד משתמש בהם. הייתי מכווץ אותם לרשימת בלוקים. הייתי גם מוסיף בדיקת רגרסיה ויזואלית לפני העיצוב מחדש הבא, כי אימתתי את הבנייה הזו בעיניים — בדיוק סוג השלב הידני שאני אומר לאחרים לאוטמט.",
    },
  },
];

export const now: { label: LS; items: LSA } = {
  label: { en: "Now", he: "עכשיו" },
  items: {
    en: [
      "Publishing Eventa as an inspectable post-mortem after taking it offline.",
      "First year of the M.Sc. at Shenkar.",
      "Teaching, developing EdTech content, and continuing the work around Arc.",
    ],
    he: [
      "מפרסם את Eventa כמקרה בוחן שניתן לבדיקה לאחר שהורד מהאוויר.",
      "שנה ראשונה בתואר השני בשנקר.",
      "מלמד, מפתח תוכן EdTech וממשיך את העבודה סביב Arc.",
    ],
  },
};
