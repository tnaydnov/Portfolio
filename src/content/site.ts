import type { LS, LSA } from "@/lib/i18n";

export const timeline: {
  span: LS;
  title: LS;
  org: LS;
  note: LS;
  current?: boolean;
}[] = [
  {
    span: { en: "2026 — 2028", he: "2026 — 2028" },
    title: {
      en: "M.Sc. Industrial Engineering & Management",
      he: "מוסמך בהנדסת תעשייה וניהול",
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
    value: { en: "650+", he: "‎650+" },
    label: { en: "Students taught", he: "תלמידים שלימדתי" },
  },
  {
    value: { en: "3 yrs", he: "3 שנים" },
    label: { en: "Arc in production", he: "‏Arc בייצור" },
  },
  {
    value: { en: "2", he: "2" },
    label: { en: "Degrees, one argument", he: "תארים, טענה אחת" },
  },
  {
    value: { en: "6", he: "6" },
    label: { en: "Stages I own", he: "שלבים באחריותי" },
  },
];

/** The inverted job description. */
export const brief: { term: LS; def: LS }[] = [
  {
    term: { en: "The team", he: "הצוות" },
    def: {
      en: "Small enough that I know what everyone is working on. Large enough that someone will tell me when I am wrong.",
      he: "קטן מספיק כדי שאדע על מה כל אחד עובד. גדול מספיק כדי שמישהו יגיד לי כשאני טועה.",
    },
  },
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
  {
    term: { en: "What I do not want", he: "מה אני לא רוצה" },
    def: {
      en: "A role where the requirements arrive finished and my job is to translate them into code. That is the half of the work I already know how to do.",
      he: "תפקיד שבו הדרישות מגיעות גמורות והתפקיד שלי הוא לתרגם אותן לקוד. זה החצי של העבודה שאני כבר יודע לעשות.",
    },
  },
  {
    term: { en: "Deal-breaker", he: "שובר עסקה" },
    def: {
      en: "Shipping something I would not defend in a decision log.",
      he: "לשלוח משהו שלא הייתי מגן עליו ביומן החלטות.",
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
    measured: { en: "152 kB", he: "152 kB" },
    note: { en: "gzipped", he: "מכווץ" },
  },
  {
    metric: { en: "First-load JS, case", he: "‏JS ראשוני, מקרה בוחן" },
    target: { en: "< 180 kB", he: "‎< 180 kB" },
    measured: { en: "130 kB", he: "130 kB" },
    note: { en: "gzipped", he: "מכווץ" },
  },
  {
    metric: { en: "Animation libraries", he: "ספריות אנימציה" },
    target: { en: "0", he: "0" },
    measured: { en: "0", he: "0" },
    note: { en: "Removed after measuring", he: "הוסרו אחרי מדידה" },
  },
  {
    metric: { en: "Runtime dependencies", he: "תלויות זמן ריצה" },
    target: { en: "Minimal", he: "מינימלי" },
    measured: { en: "7", he: "7" },
    note: { en: "Including next & react", he: "כולל next ו־react" },
  },
  {
    metric: { en: "CLS", he: "CLS" },
    target: { en: "< 0.02", he: "‎< 0.02" },
    measured: { en: "Reserved", he: "שמור מראש" },
    note: { en: "Fonts and media reserve space", he: "גופנים ומדיה שומרים מקום" },
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
      en: "I installed two animation libraries, then deleted them",
      he: "התקנתי שתי ספריות אנימציה, ואז מחקתי אותן",
    },
    body: {
      en: "GSAP and Motion were both in the build. The site needs three effects: a scroll reveal, a pinned horizontal track, and a keyed fade. Those are about sixty lines of IntersectionObserver, a rAF scroll handler, and a CSS keyframe. The libraries cost 74 kB on the home page and 108 kB on case studies. Reaching for a dependency is a decision, and this one did not survive being measured.",
      he: "‏GSAP ו־Motion היו שתיהן בבנייה. האתר צריך שלושה אפקטים: חשיפה בגלילה, מסלול אופקי מוצמד, ודהייה מבוססת מפתח. אלה בערך שישים שורות של IntersectionObserver, מטפל גלילה על rAF, ו־keyframe ב־CSS. הספריות עלו 74 קילובייט בדף הבית ו־108 במקרי הבוחן. לקחת תלות היא החלטה, וההחלטה הזו לא שרדה מדידה.",
    },
  },
  {
    title: {
      en: "Reduced motion is a layout, not a downgrade",
      he: "תנועה מופחתת היא פריסה, לא הורדת דרגה",
    },
    body: {
      en: "prefers-reduced-motion is resolved at the layout level. The pinned horizontal loop becomes a vertical list, smooth scrolling is never mounted, and no transform animation runs. Nothing is hidden in that mode — it is a different composition of the same content, and it is also what every phone gets.",
      he: "‏prefers-reduced-motion נפתר ברמת הפריסה. הלולאה האופקית המוצמדת הופכת לרשימה אנכית, גלילה חלקה לא נטענת כלל, ושום אנימציית טרנספורם לא רצה. שום דבר לא מוסתר במצב הזה — זו הרכבה אחרת של אותו תוכן, וזה גם מה שכל טלפון מקבל.",
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
      en: "Every string in the content layer is typed as a record keyed by locale, so a missing translation is a compile error rather than a hole in the page. Direction is handled with logical CSS properties, not a mirrored stylesheet. I built this pattern for Applytide first; this is the second time, and it took a fraction of the effort.",
      he: "כל מחרוזת בשכבת התוכן מוגדרת כרשומה לפי שפה, כך שתרגום חסר הוא שגיאת קומפילציה ולא חור בדף. כיוון מטופל בתכונות CSS לוגיות, לא בגיליון סגנונות משוקף. בניתי את התבנית הזו קודם ל־Applytide; זו הפעם השנייה, והיא לקחה שבריר מהמאמץ.",
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
      "Building Eventa, and cutting steps out of its onboarding.",
      "First year of the M.Sc. at Shenkar.",
      "Still teaching, still shipping to Arc.",
    ],
    he: [
      "בונה את Eventa, ומקצר שלבים בתהליך הכניסה שלו.",
      "שנה ראשונה בתואר השני בשנקר.",
      "עדיין מלמד, עדיין שולח עדכונים ל־Arc.",
    ],
  },
};
