import type { LS, LSA } from "@/lib/i18n";

export const timeline: {
  span: LS;
  title: LS;
  org: LS;
  note: LS;
  current?: boolean;
}[] = [
  {
    span: { en: "2026 — expected 2028", he: "2026 — צפי 2028" },
    title: {
      en: "Industrial Engineering & Management",
      he: "הנדסת תעשייה וניהול",
    },
    org: {
      en: "Shenkar College of Engineering, Design and Art",
      he: "שנקר — הנדסה. עיצוב. אמנות",
    },
    note: {
      en: "M.Sc. studies in process design, optimisation and the formal tools behind the systems work I had been doing by instinct.",
      he: "לימודי M.Sc. בתכנון תהליכים, אופטימיזציה והכלים הפורמליים שמאחורי עבודת המערכות שעשיתי קודם באינטואיציה.",
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
      en: "Programming instruction, requirements with educational stakeholders, curriculum and product development, Gantt planning, and co-development of Arc.",
      he: "הדרכת תכנות, אפיון מול בעלי עניין חינוכיים, פיתוח תוכן ומוצר, תכנון גאנט ופיתוח משותף של Arc.",
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
    span: { en: "Oct 2022 — Jun 2023", he: "אוק׳ 2022 — יוני 2023" },
    title: { en: "Volunteer Software Engineering Mentor", he: "מנטור מתנדב להנדסת תוכנה" },
    org: { en: "Siraj Technologies", he: "Siraj Technologies" },
    note: {
      en: "Academic and technical mentoring for Bedouin software-engineering students.",
      he: "ליווי אקדמי וטכני לסטודנטים בדואים להנדסת תוכנה.",
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
      en: "Three large organisations, three helpdesks. This is where I learned that users often describe symptoms before causes.",
      he: "שלושה ארגונים גדולים, שלושה מוקדי תמיכה. כאן למדתי שמשתמשים מתארים לעיתים קרובות סימפטומים לפני סיבות.",
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

export const capabilities: { title: LS; body: LS; detail: LS }[] = [
  {
    title: { en: "Discover & frame", he: "גילוי ומסגור" },
    body: {
      en: "Find the real constraint behind a symptom or workaround.",
      he: "למצוא את האילוץ האמיתי שמאחורי סימפטום או מעקף.",
    },
    detail: {
      en: "User conversations · workflow mapping · requirements · problem definition",
      he: "שיחות משתמשים · מיפוי תהליכים · דרישות · הגדרת בעיה",
    },
  },
  {
    title: { en: "Design & plan", he: "עיצוב ותכנון" },
    body: {
      en: "Turn ambiguity into a sequence a team can make and test.",
      he: "להפוך עמימות לרצף שצוות יכול לבנות ולבדוק.",
    },
    detail: {
      en: "User flows · specifications · trade-offs · Gantt and dependencies",
      he: "תהליכי משתמש · אפיונים · פשרות · גאנט ותלויות",
    },
  },
  {
    title: { en: "Build & verify", he: "בנייה ואימות" },
    body: {
      en: "Build enough of the system to know its real cost and failure modes.",
      he: "לבנות מספיק מהמערכת כדי להבין את המחיר האמיתי ואת אופני הכשל שלה.",
    },
    detail: {
      en: "Full-stack engineering · data and APIs · QA · operational thinking",
      he: "הנדסת פול־סטאק · נתונים ו־API · בדיקות · חשיבה תפעולית",
    },
  },
  {
    title: { en: "Teach & translate", he: "הוראה ותרגום" },
    body: {
      en: "Make hidden assumptions visible to learners, users and teammates.",
      he: "להפוך הנחות סמויות לגלויות ללומדים, משתמשים וחברי צוות.",
    },
    detail: {
      en: "Programming instruction · curriculum · technical writing · feedback loops",
      he: "הדרכת תכנות · תוכניות לימוד · כתיבה טכנית · לולאות משוב",
    },
  },
];

export const approach: { index: string; title: LS; body: LS }[] = [
  {
    index: "01",
    title: { en: "Notice the tax", he: "לזהות את המס" },
    body: {
      en: "Repeated copying, searching, explaining or checking is usually a system asking to be examined.",
      he: "העתקה, חיפוש, הסבר או בדיקה שחוזרים על עצמם הם בדרך כלל מערכת שמבקשת שיבחנו אותה.",
    },
  },
  {
    index: "02",
    title: { en: "Trace the cause", he: "לעקוב לסיבה" },
    body: {
      en: "A reported request is evidence. I map the workflow before accepting its proposed solution.",
      he: "בקשה מדווחת היא ראיה. אני ממפה את התהליך לפני שאני מקבל את הפתרון שהוצע לה.",
    },
  },
  {
    index: "03",
    title: { en: "Build the smallest honest test", he: "לבנות את הבדיקה הכנה הקטנה ביותר" },
    body: {
      en: "Ship enough to expose cost, behavior and edge cases without pretending the first version is the answer.",
      he: "לשחרר מספיק כדי לחשוף עלות, התנהגות ומקרי קצה בלי להעמיד פנים שהגרסה הראשונה היא התשובה.",
    },
  },
  {
    index: "04",
    title: { en: "Let reality edit it", he: "לתת למציאות לערוך" },
    body: {
      en: "Watch use, preserve evidence and change the explanation or system when it proves us wrong.",
      he: "לצפות בשימוש, לשמור ראיות ולשנות את ההסבר או המערכת כשהמציאות מוכיחה שטעינו.",
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
    target: { en: "Measured per release", he: "נמדד בכל גרסה" },
    measured: { en: "144 kB + deferred renderer", he: "144 kB + מנוע שנטען בהמשך" },
    note: { en: "Next production build · 2026-08-24", he: "בניית production של Next · 2026-08-24" },
  },
  {
    metric: { en: "First-load JS, case", he: "‏JS ראשוני, מקרה בוחן" },
    target: { en: "< 180 kB", he: "‎< 180 kB" },
    measured: { en: "135 kB", he: "135 kB" },
    note: { en: "Largest generated case route · 2026-08-24", he: "מסלול מקרה הבוחן הגדול ביותר · 2026-08-24" },
  },
  {
    metric: { en: "Cinematic renderer", he: "מנוע קולנועי" },
    target: { en: "One isolated system", he: "מערכת מבודדת אחת" },
    measured: { en: "R3F / Three", he: "R3F / Three" },
    note: { en: "Isolated to the cinematic home", he: "מבודדות לדף הבית הקולנועי" },
  },
  {
    metric: { en: "Runtime dependencies", he: "תלויות זמן ריצה" },
    target: { en: "Minimal", he: "מינימלי" },
    measured: { en: "Purpose-specific", he: "לפי צורך מוגדר" },
    note: { en: "No effect library without a scene requirement", he: "אין ספריית אפקטים בלי צורך של סצנה" },
  },
  {
    metric: { en: "CLS", he: "CLS" },
    target: { en: "< 0.02", he: "‎< 0.02" },
    measured: { en: "Not measured on devices", he: "לא נמדד במכשירים" },
    note: { en: "Layout reserves space; field measurement remains open", he: "הפריסה שומרת מקום; מדידת שטח עדיין פתוחה" },
  },
  {
    metric: { en: "WebGL", he: "WebGL" },
    target: { en: "One persistent canvas", he: "קנבס מתמשך אחד" },
    measured: { en: "Balanced by default", he: "מאוזן כברירת מחדל" },
    note: { en: "Semantic HTML survives without it", he: "HTML סמנטי נשאר גם בלעדיו" },
  },
];

export const colophonRules: { title: LS; body: LS }[] = [
  {
    title: {
      en: "The interface is the film",
      he: "הממשק הוא הסרט",
    },
    body: {
      en: "The homepage does not play a rendered film. Live HTML interfaces remain selectable and legible while a single realtime scene supplies impossible depth, light and scale. The same scroll value drives both layers so reversing changes the system rather than rewinding a video.",
      he: "דף הבית לא מנגן סרט מרונדר. ממשקי HTML חיים נשארים ניתנים לבחירה ולקריאה, בזמן שסצנה אחת בזמן אמת מספקת עומק, אור וקנה מידה בלתי אפשריים. אותו ערך גלילה מניע את שתי השכבות, כך שגלילה לאחור משנה את המערכת במקום להריץ וידאו לאחור.",
    },
  },
  {
    title: {
      en: "Reduced motion is a layout, not a downgrade",
      he: "תנועה מופחתת היא פריסה, לא הורדת דרגה",
    },
    body: {
      en: "prefers-reduced-motion receives an authored HTML composition rather than a slowed camera ride. The same argument, evidence boundaries and project links remain available, and visitors can switch motion explicitly.",
      he: "‏prefers-reduced-motion מקבל קומפוזיציית HTML ייעודית במקום מסע מצלמה מואט. אותו טיעון, גבולות הראיות וקישורי הפרויקטים נשארים זמינים, ואפשר לבחור תנועה במפורש.",
    },
  },
  {
    title: {
      en: "DOM is reality; WebGL is where it breaks",
      he: "ה־DOM הוא המציאות; ב־WebGL היא נשברת",
    },
    body: {
      en: "Teaching code, Arc structure and product interfaces begin as ordinary HTML. Procedural geometry takes over only when depth communicates something the interface cannot. The professional story never depends on the canvas existing.",
      he: "קוד ההוראה, מבנה Arc וממשקי המוצר מתחילים כ־HTML רגיל. גאומטריה פרוצדורלית נכנסת רק כשעומק מתקשר משהו שהממשק לא יכול. הסיפור המקצועי לעולם אינו תלוי בכך שהקנבס קיים.",
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
      en: "The case-study schema grew organically and now has optional fields that only one project uses. I would collapse those into a block list. I would also add automated visual regression and a representative physical-device matrix; the current production build proves compilation and route integrity, not visual correctness on every screen.",
      he: "סכמת מקרי הבוחן צמחה אורגנית ויש בה עכשיו שדות אופציונליים שרק פרויקט אחד משתמש בהם. הייתי מכווץ אותם לרשימת בלוקים. הייתי מוסיף גם רגרסיה ויזואלית אוטומטית ומטריצת מכשירים פיזיים מייצגת; בניית הייצור הנוכחית מוכיחה קומפילציה ושלמות נתיבים, לא נכונות ויזואלית בכל מסך.",
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
