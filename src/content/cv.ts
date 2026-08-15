import type { LS, LSA } from "@/lib/i18n";

/**
 * The whole site.
 *
 * Budget: about 400 words per language on the home page. It was ~7,000 before.
 *
 * Voice rules, so this file does not drift back:
 *   Verbs allowed — built, taught, kept running, supported, studied, wrote, fixed.
 *   Verbs banned  — architected, owned, drove, scaled, spearheaded, delivered
 *                   end-to-end. "Founded" never appears: he built Arc and kept
 *                   it running, which is the true and smaller claim.
 *   No methodology, no framework, no aphorisms. Nothing that would read as a
 *   person with fifteen years of experience. He graduated in 2025.
 */

export const me = {
  greeting: { en: "Hi, I’m Tomer.", he: "היי, אני תומר." },
  nameLatin: "Tomer Naydnov",
  nameHebrew: "תומר ניידנוב",
  what: {
    en: "I’m a software engineer in Israel. I write backends, and I teach teenagers to code.",
    he: "אני מהנדס תוכנה מישראל. אני כותב צד־שרת, ומלמד בני נוער לתכנת.",
  },
  degree: {
    en: "B.Sc Software Engineering, Ben-Gurion University, 2025.",
    he: "בוגר הנדסת תוכנה, אוניברסיטת בן־גוריון, 2025.",
  },
} as const;

export const now: { label: LS; lines: LSA; wanted: LS } = {
  label: { en: "Now — summer 2026", he: "עכשיו — קיץ 2026" },
  lines: {
    en: [
      "I teach Python at Nitzanim, and I look after Arc — the platform my classes run on. Third year of it now.",
      "I start an M.Sc in Industrial Engineering at Shenkar in the autumn.",
    ],
    he: [
      "אני מלמד פייתון בניצנים, ומתחזק את Arc — הפלטפורמה שהשיעורים שלי רצים עליה. כבר שנה שלישית.",
      "בסתיו אני מתחיל תואר שני בהנדסת תעשייה וניהול בשנקר.",
    ],
  },
  wanted: {
    en: "I’m looking for a junior backend role.",
    he: "אני מחפש תפקיד ג׳וניור בצד־שרת.",
  },
};

/**
 * Contexts, not levels. A context is a fact; a level is an opinion, and a
 * progress bar next to "Python 85%" is the thing recruiters read as junior.
 *
 * Deliberately absent: "OOP" and "algorithms" (course names — every graduate
 * has them), and "microservices", "LLM integration", "backend integration"
 * (true, but as badges they read senior-architect). Those come back as plain
 * verbs inside the project blurbs, which is where they are believable.
 */
export const skills: { label: LS; items: string[] }[] = [
  {
    label: { en: "I build with", he: "אני בונה עם" },
    items: ["Python", "FastAPI", "Docker", "Redis", "SQL", "Git"],
  },
  {
    label: { en: "I studied with", he: "למדתי עם" },
    items: ["Java", "C++", "C", "C#"],
  },
  {
    label: { en: "I teach", he: "אני מלמד" },
    items: ["Python", "Java"],
  },
];

export type RowKind = "work" | "study";

export interface Row {
  id: string;
  from: number;
  /** `null` means it is still running. */
  to: number | null;
  kind: RowKind;
  role: LS;
  org: LS;
  /** Revealed when the row is opened. One or two sentences, never more. */
  note: LS;
  /** Small qualifier printed next to the role. */
  tag?: LS;
}

/**
 * Work and study in ONE list, most recent first.
 *
 * Not two lists. Ben-Gurion 2021–2025 sits directly underneath Isracard,
 * Nitzanim, Siraj and Leyman, which shows he worked straight through his
 * degree — the most interesting true thing about this timeline, and the thing
 * two separate lists would destroy.
 *
 * Years only. It keeps the rows short, and it also settles the Isracard dates
 * honestly: the month was never recorded anywhere, so the site does not claim
 * to know it.
 *
 * Shenkar is deliberately absent — it has not happened yet. It lives in `now`.
 */
export const timeline: Row[] = [
  {
    id: "nitzanim",
    from: 2023,
    to: null,
    kind: "work",
    role: { en: "Programming instructor", he: "מנחה תכנות" },
    org: { en: "Nitzanim", he: "ניצנים" },
    note: {
      en: "I teach Python to teenagers, and I write the lesson plans and exercises underneath. 650+ students so far. I also built Arc, the platform the classes run on.",
      he: "אני מלמד פייתון בני נוער, וכותב את מערכי השיעור והתרגילים שמתחת. יותר מ־650 תלמידים עד עכשיו. בניתי גם את Arc, הפלטפורמה שהשיעורים רצים עליה.",
    },
  },
  {
    id: "bgu",
    from: 2021,
    to: 2025,
    kind: "study",
    role: { en: "B.Sc Software Engineering", he: "תואר ראשון בהנדסת תוכנה" },
    org: {
      en: "Ben-Gurion University of the Negev",
      he: "אוניברסיטת בן־גוריון בנגב",
    },
    note: {
      en: "Algorithms, databases, operating systems, and a lot of Java. I worked through most of it, which is why the dates around this one overlap.",
      he: "אלגוריתמים, מסדי נתונים, מערכות הפעלה, והרבה Java. עבדתי במקביל לרוב התואר, ולכן התאריכים סביבו חופפים.",
    },
  },
  {
    id: "leyman",
    from: 2024,
    to: 2024,
    kind: "work",
    role: { en: "Computer science teacher", he: "מורה למדעי המחשב" },
    org: { en: "Leyman High School", he: "תיכון ליימן" },
    note: {
      en: "Taught Java to 50+ high-school students and got them through their Bagrut exams. A deadline that genuinely does not move.",
      he: "לימדתי Java ליותר מ־50 תלמידי תיכון והבאתי אותם לבגרות. תאריך יעד שבאמת לא זז.",
    },
  },
  {
    id: "siraj",
    from: 2023,
    to: 2023,
    kind: "work",
    role: { en: "Scholarship mentor", he: "חונך מלגות" },
    org: { en: "Siraj Programme, Ben-Gurion University", he: "תוכנית סיראג׳, בן־גוריון" },
    note: {
      en: "Helped students from under-represented backgrounds through their software engineering courses.",
      he: "עזרתי לסטודנטים מאוכלוסיות מיוצגות־חסר לעבור את קורסי הנדסת התוכנה.",
    },
  },
  {
    id: "isracard",
    from: 2022,
    to: 2023,
    kind: "work",
    role: { en: "Technical support, Tier 2", he: "תמיכה טכנית, Tier 2" },
    org: { en: "Isracard", he: "ישראכרט" },
    note: {
      en: "The third help desk in a row. By this point I had stopped believing the first sentence of any ticket.",
      he: "המוקד השלישי ברצף. בשלב הזה כבר הפסקתי להאמין למשפט הראשון של כל קריאה.",
    },
  },
  {
    id: "iec",
    from: 2021,
    to: 2022,
    kind: "work",
    role: { en: "Help desk, Tier 2", he: "מוקד תמיכה, Tier 2" },
    org: { en: "Israel Electric Corporation", he: "חברת החשמל לישראל" },
    note: {
      en: "Tier 2 for about 1,000 employees — Active Directory, Citrix, and a lot of network troubleshooting.",
      he: "‏Tier 2 עבור כ־1,000 עובדים — Active Directory, Citrix, והרבה פתרון תקלות רשת.",
    },
  },
  {
    id: "c4i",
    from: 2020,
    to: 2021,
    kind: "work",
    role: { en: "Help desk technician", he: "טכנאי מוקד תמיכה" },
    org: { en: "C4I Corps, IDF", he: "חיל התקשוב, צה״ל" },
    tag: { en: "military service", he: "שירות צבאי" },
    note: {
      en: "Hardware, software and networking for about 2,000 people, plus the Active Directory accounts behind them.",
      he: "חומרה, תוכנה ורשתות עבור כ־2,000 איש, וגם חשבונות ה־Active Directory שמאחוריהם.",
    },
  },
  {
    id: "idf-combat",
    from: 2019,
    to: 2019,
    kind: "work",
    role: { en: "Combat soldier", he: "לוחם" },
    org: { en: "Combat Intelligence Collection Corps, IDF", he: "איסוף קרבי, צה״ל" },
    tag: { en: "military service", he: "שירות צבאי" },
    note: {
      en: "Where I started.",
      he: "כאן התחלתי.",
    },
  },
];

export interface Project {
  slug: string;
  name: string;
  /** Two lines, maximum, on the home page. */
  blurb: LS;
  tech: string[];
  repo?: string;
  live?: string;
  image?: { src: string; alt: LS };
  /** The project page. Three short paragraphs, no more. */
  detail: LSA;
  /** Non-negotiable: one honest thing he would do differently. */
  rebuild: LS;
}

export const projects: Project[] = [
  {
    slug: "arc",
    name: "Arc",
    blurb: {
      en: "The learning platform I built for my own classes. Three years old now, which mostly means fixing small things nobody notices.",
      he: "פלטפורמת הלמידה שבניתי לשיעורים שלי. בת שלוש שנים, מה שאומר בעיקר לתקן דברים קטנים שאף אחד לא שם לב אליהם.",
    },
    tech: ["Product", "Requirements", "Curriculum"],
    detail: {
      en: [
        "Every instructor in the programme was keeping their own copy of the same material. One had exercises in a personal Drive folder, another rebuilt slides each term because finding last year’s took longer than starting over. A new instructor’s first two weeks were archaeology.",
        "I thought the answer was a shared folder. It wasn’t — shared folders had already been tried and they decayed within a term, because nothing in a folder tells you which version is current. So Arc serves exactly one person: the instructor standing in front of a class tomorrow morning. No student accounts, no grading, no attendance.",
        "It has been running three years and almost nothing it does today was in the first version.",
      ],
      he: [
        "כל מנחה בתוכנית החזיק עותק משלו של אותו חומר בדיוק. לאחד היו תרגילים בתיקיית Drive פרטית, אחר בנה מחדש מצגות כל מחזור כי למצוא את של השנה שעברה לקח יותר זמן מלהתחיל מאפס. שבועיים ראשונים של מנחה חדש היו ארכיאולוגיה.",
        "חשבתי שהפתרון הוא תיקייה משותפת. הוא לא — כבר ניסו תיקיות משותפות והן התפוררו תוך מחזור, כי שום דבר בתיקייה לא אומר לך איזו גרסה עדכנית. אז Arc משרת בדיוק אדם אחד: המנחה שעומד מול כיתה מחר בבוקר. בלי חשבונות לתלמידים, בלי ציונים, בלי נוכחות.",
        "היא רצה שלוש שנים וכמעט כלום ממה שהיא עושה היום לא היה בגרסה הראשונה.",
      ],
    },
    rebuild: {
      en: "The best feature — showing an instructor where the last session stopped — came from a complaint I first dismissed as a documentation problem. I would listen faster next time.",
      he: "הפיצ׳ר הכי טוב — להראות למנחה איפה המפגש הקודם נעצר — הגיע מתלונה שבהתחלה פטרתי כבעיית תיעוד. בפעם הבאה אקשיב מהר יותר.",
    },
  },
  {
    slug: "applytide",
    name: "Applytide",
    blurb: {
      en: "A job-search tracker with a Chrome extension that saves a listing in one click.",
      he: "מעקב חיפוש עבודה עם תוסף כרום ששומר משרה בלחיצה אחת.",
    },
    tech: ["Python", "FastAPI", "Postgres", "Redis", "Docker"],
    detail: {
      en: [
        "Applying for jobs is a pipeline with terrible instrumentation. You lose track of what you sent where, and every listing is a slightly different shape of the same five facts.",
        "So I built a tracker and a Chrome extension that grabs a listing in one click. It tries the page’s own structured data first, then the page itself, and only asks a language model if both fail — which is cheaper and, it turned out, more accurate on the common case. I also put a hard daily cap on what the model could spend, because leaving that unbounded is how a side project becomes a bill.",
        "It’s a few small services behind one API, and I ran it against my own job search.",
      ],
      he: [
        "חיפוש עבודה הוא תהליך עם מדידה גרועה. מאבדים מעקב אחרי מה נשלח לאן, וכל מודעה היא צורה קצת אחרת של אותן חמש עובדות.",
        "אז בניתי מעקב ותוסף כרום שתופס מודעה בלחיצה אחת. הוא מנסה קודם את הנתונים המובנים של הדף, אחר כך את הדף עצמו, ורק אם שניהם נכשלים פונה למודל שפה — מה שיוצא זול יותר, והתברר גם מדויק יותר במקרה הנפוץ. שמתי גם תקרה יומית קשיחה על מה שהמודל יכול להוציא, כי להשאיר את זה פתוח זו הדרך שבה פרויקט צד הופך לחשבון.",
        "אלה כמה שירותים קטנים מאחורי API אחד, והרצתי אותו על חיפוש העבודה שלי.",
      ],
    },
    rebuild: {
      en: "I built an admin panel because it was interesting. It served exactly one administrator — me. I would cut it.",
      he: "בניתי פאנל ניהול כי זה היה מעניין. הוא שירת בדיוק מנהל אחד — אותי. הייתי מוחק אותו.",
    },
  },
  {
    slug: "lpr",
    name: "License plate recognition",
    blurb: {
      en: "Reads plates off a live camera feed. YOLO finds the plate, OCR reads it, Redis carries the frames between services.",
      he: "מזהה לוחיות רישוי מוידאו חי. YOLO מוצא את הלוחית, OCR קורא אותה, ו־Redis מעביר את הפריימים בין השירותים.",
    },
    tech: ["Python", "YOLO", "OCR", "Redis", "Docker"],
    image: {
      src: "/images/lpr-preview.png",
      alt: {
        en: "The operator view: a car under a barrier with its plate detected and read",
        he: "מסך המפעיל: רכב מתחת למחסום עם הלוחית שזוהתה ונקראה",
      },
    },
    repo: "https://github.com/tnaydnov/License_Plate_Recognition",
    detail: {
      en: [
        "A camera watches a gate. Something has to notice a car, find the plate on it, read the characters, and do all of that fast enough to be useful before the driver gives up and presses the intercom.",
        "I split it into small services that pass frames through Redis queues rather than one program doing everything, mostly so the slow part — the detection model — could be restarted without taking the camera feed down with it. YOLO handles finding the plate, OCR reads it, and a FastAPI service ties it together.",
        "The demo runs on footage I shot myself in a car park, which is why the plates are yellow and the signage is in Hebrew.",
      ],
      he: [
        "מצלמה משגיחה על שער. משהו צריך לשים לב לרכב, למצוא עליו את הלוחית, לקרוא את התווים, ולעשות את כל זה מספיק מהר כדי להועיל לפני שהנהג מוותר ולוחץ על האינטרקום.",
        "פיצלתי את זה לשירותים קטנים שמעבירים פריימים דרך תורי Redis במקום תוכנית אחת שעושה הכול, בעיקר כדי שאפשר יהיה לאתחל את החלק האיטי — מודל הזיהוי — בלי להפיל איתו את הזרם מהמצלמה. YOLO מוצא את הלוחית, OCR קורא אותה, ושירות FastAPI מחבר ביניהם.",
        "הדמו רץ על צילומים שצילמתי בעצמי בחניון, ולכן הלוחיות צהובות והשילוט בעברית.",
      ],
    },
    rebuild: {
      en: "I never measured it properly — no accuracy number, no latency budget. I would write the measurement first next time.",
      he: "אף פעם לא מדדתי את זה כמו שצריך — בלי מספר דיוק, בלי תקציב זמן תגובה. בפעם הבאה הייתי כותב את המדידה קודם.",
    },
  },
  {
    slug: "eventa",
    name: "Eventa",
    blurb: {
      en: "Weddings put 150 strangers in a room with no way to meet. Scan a QR code, you’re in — no app, no account, no password.",
      he: "חתונות מכניסות 150 זרים לחדר בלי דרך להכיר. סורקים QR ונכנסים — בלי אפליקציה, בלי חשבון, בלי סיסמה.",
    },
    tech: ["Product", "Next.js", "Postgres"],
    detail: {
      en: [
        "At an event, everyone is holding a phone and nobody wants to install anything. That single constraint ruled out a native app, accounts and passwords before I designed a screen.",
        "So the whole thing is a QR code and a web page. You scan, you’re in, and the guest list is the event rather than a signup funnel.",
        "It is the project I’m actively building right now, so it is the one most likely to look different next month.",
      ],
      he: [
        "באירוע כולם מחזיקים טלפון ואף אחד לא רוצה להתקין כלום. האילוץ הבודד הזה פסל אפליקציה, חשבונות וסיסמאות עוד לפני שעיצבתי מסך.",
        "אז כל העניין הוא קוד QR ודף אינטרנט. סורקים, נכנסים, ורשימת המוזמנים היא האירוע ולא משפך הרשמה.",
        "זה הפרויקט שאני בונה עכשיו, אז זה גם זה שהכי סביר שייראה אחרת בעוד חודש.",
      ],
    },
    rebuild: {
      en: "I am still cutting steps out of the way in. Every one I remove measurably helps, which suggests I should have started with fewer.",
      he: "אני עדיין מקצר שלבים בכניסה. כל שלב שאני מוריד עוזר בצורה מדידה, מה שרומז שהייתי צריך להתחיל עם פחות.",
    },
  },
];

export const alsoOnGithub: LS = {
  en: "Also on GitHub: a multithreaded Set card game in Java, a D&D simulator, a Kanban board, an HR system, and a team trading platform. University work, left there for the curious.",
  he: "יש גם בגיטהאב: משחק Set מרובה תהליכונים ב־Java, סימולטור D&D, לוח קנבן, מערכת משאבי אנוש, ופלטפורמת מסחר של צוות. עבודות מהאוניברסיטה, נשארו שם לסקרנים.",
};

export const contact = {
  line: {
    en: "The fastest way to reach me is email. I answer.",
    he: "הדרך הכי מהירה להשיג אותי היא מייל. אני עונה.",
  },
  email: "tnaydnov@gmail.com",
  github: "https://github.com/tnaydnov",
  linkedin: "https://www.linkedin.com/in/tomer-naydnov/",
  cv: "/tomer-naydnov-cv.pdf",
} as const;
