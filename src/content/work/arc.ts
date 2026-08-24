import type { Project } from "@/lib/types";

export const arc: Project = {
  slug: "arc",
  title: "Arc",
  oneLiner: {
    en: "A learning-operations platform connecting reusable content, live classrooms, student work, instructor feedback and the next teaching cycle.",
    he: "פלטפורמת תפעול למידה שמחברת תוכן לשימוש חוזר, כיתות חיות, עבודת תלמידים, משוב מנחים ומחזור ההוראה הבא.",
  },
  hook: {
    en: "The problem was never where the files lived. It was that authoring, teaching and feedback were separate systems.",
    he: "הבעיה מעולם לא הייתה איפה הקבצים נמצאים. הבעיה הייתה שכתיבה, הוראה ומשוב היו מערכות נפרדות.",
  },
  snapshot: {
    problem: {
      en: "Teaching material was repeatedly searched for, rebuilt and adapted while the evidence from each classroom disappeared into the next session.",
      he: "חומרי הוראה נחפשו, נבנו והותאמו שוב ושוב, בזמן שהראיות מכל כיתה נעלמו לפני המפגש הבא.",
    },
    move: {
      en: "Treat the lesson as a living loop: reusable content becomes a classroom release, student work becomes feedback, and feedback changes what gets taught next.",
      he: "להתייחס לשיעור כלולאה חיה: תוכן לשימוש חוזר הופך לשחרור לכיתה, עבודת תלמידים הופכת למשוב, והמשוב משנה את מה שנלמד בהמשך.",
    },
    contribution: {
      en: "I co-developed Arc across architecture, portal workflows, authentication and authorization, realtime behavior, touch interaction, testing and a broad frontend refactor.",
      he: "פיתחתי את Arc במשותף לאורך הארכיטקטורה, תהליכי הפורטלים, אימות והרשאות, התנהגות בזמן אמת, אינטראקציות מגע, בדיקות וריפקטור רחב לחזית.",
    },
    proof: {
      en: "A reachable public portal and an audited private product repository with dated contribution history and substantial automated test infrastructure.",
      he: "פורטל ציבורי נגיש ומאגר מוצר פרטי שנבדק, עם היסטוריית תרומות מתוארכת ותשתית בדיקות אוטומטית משמעותית.",
    },
  },
  tier: "flagship",
  stages: ["signal", "frame", "build", "prove", "field"],
  domain: ["product", "education", "platform"],
  role: {
    en: "Co-developer · architecture, product workflows and quality",
    he: "מפתח שותף · ארכיטקטורה, תהליכי מוצר ואיכות",
  },
  team: {
    en: "Co-developed with another engineer",
    he: "פותח במשותף עם מהנדסת נוספת",
  },
  started: "2026-01",
  status: "live",
  statusLabel: { en: "Portal online", he: "הפורטל זמין" },
  statusDetail: {
    en: "The public Arc portal is reachable. The exact feature set on the audited development branch is not asserted as deployed.",
    he: "הפורטל הציבורי של Arc נגיש. אין טענה שכל היכולות בענף הפיתוח שנבדק כבר פרוסות בייצור.",
  },
  evidenceNote: {
    en: "The contribution history and product structure were audited locally. The repository is private and proprietary; every interface shown here is reconstructed with fictional data. No learner or instructor material - and no unverified reach figures - are published.",
    he: "היסטוריית התרומות ומבנה המוצר נבדקו מקומית. המאגר פרטי וקנייני; כל ממשק שמוצג כאן משוחזר עם נתונים בדיוניים. אין פרסום של חומר תלמידים או מנחים - וגם לא של נתוני חשיפה שלא אומתו.",
  },
  metrics: [
    {
      label: { en: "Product surface", he: "פני המוצר" },
      value: { en: "Multi-portal", he: "ריבוי פורטלים" },
      note: { en: "Student, instructor and operational flows", he: "תהליכי תלמידים, מנחים ותפעול" },
    },
    {
      label: { en: "Quality system", he: "מערכת איכות" },
      value: { en: "Automated suites", he: "מערכי בדיקות" },
      note: { en: "Repository inventory, not a pass-rate claim", he: "מלאי במאגר, לא טענה על שיעור מעבר" },
    },
    {
      label: { en: "Responsive intent", he: "כוונה רספונסיבית" },
      value: { en: "Phone · RTL · zoom", he: "טלפון · RTL · זום" },
      note: { en: "Authored browser tests; not a device claim", he: "בדיקות דפדפן שנכתבו; לא טענה על מכשירים" },
    },
    {
      label: { en: "Repository record", he: "תיעוד במאגר" },
      value: { en: "2026—", he: "2026—" },
      note: { en: "Dated history from January 2026", he: "היסטוריה מתוארכת מינואר 2026" },
    },
  ],
  stack: [
    "Laravel 11",
    "PHP 8.2",
    "TypeScript",
    "React",
    "Alpine.js",
    "Laravel Reverb",
    "Vite",
    "PHPUnit",
    "Laravel Dusk",
  ],
  links: { live: "https://arcacademy.co" },
  sections: [
    {
      stage: "signal",
      heading: {
        en: "The workaround was teaching us something",
        he: "המעקף ניסה ללמד אותנו משהו",
      },
      body: {
        en: [
          "While teaching and developing educational material, I kept seeing the same quiet tax: instructors searching for the right version, rebuilding something that already existed, or beginning a lesson without the context left by the previous session. That observation is my account of the problem; it is not presented as a measured adoption study.",
          "A shared folder looks like the obvious fix. But a folder can tell you where a file is, not whether it is current, how it belongs in a lesson, what happened when it met a classroom, or what should change next.",
        ],
        he: [
          "בזמן שהדרכתי ופיתחתי חומרי למידה, חזר אותו מס שקט: מנחים חיפשו את הגרסה הנכונה, בנו מחדש משהו שכבר קיים, או התחילו שיעור בלי ההקשר שהשאיר המפגש הקודם. זו העדות שלי על הבעיה; היא אינה מוצגת כמחקר אימוץ מדוד.",
          "תיקייה משותפת נראית כמו התיקון המובן מאליו. אבל תיקייה יכולה לומר איפה קובץ נמצא, לא אם הוא עדכני, איך הוא משתלב בשיעור, מה קרה כשהגיע לכיתה, או מה צריך להשתנות בפעם הבאה.",
        ],
      },
    },
    {
      stage: "frame",
      heading: {
        en: "One loop, not another library",
        he: "לולאה אחת, לא עוד ספרייה",
      },
      body: {
        en: [
          "Arc now spans reusable activities and content packs, lesson composition, live classroom release, versioned student submissions, instructor review, revision requests, analytics and operational administration.",
          "The useful abstraction is the loop underneath those features: content becomes a lesson; a lesson becomes an activity; activity produces work; review changes the next version. The portfolio reconstructs that loop instead of publishing private product screens or listing every feature.",
        ],
        he: [
          "Arc משתרעת כיום על פעילויות וחבילות תוכן לשימוש חוזר, הרכבת שיעורים, שחרור לכיתה בזמן אמת, הגשות תלמידים בגרסאות, בדיקת מנחים, בקשות תיקון, אנליטיקה וניהול תפעולי.",
          "ההפשטה השימושית היא הלולאה שמתחת לכל היכולות האלה: תוכן הופך לשיעור; שיעור הופך לפעילות; פעילות מפיקה עבודה; הבדיקה משנה את הגרסה הבאה. הפורטפוליו משחזר את הלולאה במקום לפרסם מסכי מוצר פרטיים או למנות כל פיצ׳ר.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "Working across the seams",
        he: "לעבוד בדיוק בתפרים",
      },
      body: {
        en: [
          "Arc was co-developed with another engineer. The repository shows substantial work from both contributors, so the case is deliberately explicit about that boundary.",
          "My dated contributions cross layers: replacing loosely shaped controller data with typed view models, decomposing oversized portal controllers, restructuring application services, correcting authorization wiring and password handling, moving realtime behavior toward WebSocket-first delivery, building test and CI coverage, and making a collaborative flowchart work with touch and pointer input.",
          "That breadth is the point of the case. I was not moving between unrelated subjects; I was following the same classroom workflow through every technical boundary it crossed.",
        ],
        he: [
          "Arc פותחה במשותף עם מהנדסת נוספת. המאגר מציג עבודה משמעותית של שני התורמים, ולכן מקרה הבוחן מגדיר את הגבול הזה במפורש.",
          "התרומות המתוארכות שלי חוצות שכבות: החלפת נתוני Controller רופפים במודלי תצוגה טיפוסיים, פירוק Controllers גדולים בפורטלים, ארגון מחדש של שירותי האפליקציה, תיקון חיבורי הרשאה וטיפול בסיסמאות, מעבר להתנהגות זמן־אמת שמעדיפה WebSocket, בניית כיסוי בדיקות ו־CI, והתאמת עורך תרשימי זרימה שיתופי למגע ולעכבר.",
          "הרוחב הזה הוא לב המקרה. לא עברתי בין נושאים לא קשורים; עקבתי אחרי אותו תהליך כיתתי דרך כל גבול טכני שהוא חצה.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "Quality is part of the classroom workflow",
        he: "איכות היא חלק מתהליך הכיתה",
      },
      body: {
        en: [
          "The audited repository contains substantial automated test infrastructure. Authored browser tests explicitly exercise phone-sized layouts, both language directions and high zoom. That is evidence of deliberate validation work, not a claim that every test passes today or that every physical device is covered.",
          "The production lesson is simpler: a classroom interaction that works only with a mouse, only left-to-right, or only on a developer laptop is not partially finished. It is a broken teaching tool.",
        ],
        he: [
          "המאגר שנבדק מכיל תשתית בדיקות אוטומטית משמעותית. בדיקות דפדפן שנכתבו מפעילות במפורש פריסות בגודל טלפון, את שני כיווני השפה וזום גבוה. זו ראיה לעבודת אימות מכוונת, לא טענה שכל בדיקה עוברת היום או שכל מכשיר פיזי מכוסה.",
          "הלקח המוצרי פשוט יותר: אינטראקציה כיתתית שעובדת רק עם עכבר, רק משמאל לימין, או רק במחשב של מפתח אינה כמעט גמורה. היא כלי הוראה שבור.",
        ],
      },
    },
    {
      stage: "field",
      heading: {
        en: "Live, private, and still moving",
        he: "פעיל, פרטי, ועדיין בתנועה",
      },
      body: {
        en: [
          "Arc has a reachable public portal and active deployment configuration. The branch audited for this portfolio is ahead of the shared development branch, so I do not claim that every inspected feature is already running in production.",
          "The product also contains real classroom and learner material. None of that is portfolio content. Names, submissions, recordings, uploads and operational records remain private; the artifact shown here is rebuilt from source structure with deliberately fictional data.",
        ],
        he: [
          "ל־Arc יש פורטל ציבורי נגיש ותצורת פריסה פעילה. הענף שנבדק עבור הפורטפוליו מקדים את ענף הפיתוח המשותף, ולכן איני טוען שכל יכולת שנבדקה כבר רצה בייצור.",
          "המוצר מכיל גם חומר אמיתי מכיתות ומתלמידים. שום דבר ממנו אינו תוכן לפורטפוליו. שמות, הגשות, הקלטות, העלאות ורשומות תפעוליות נשארים פרטיים; הארטיפקט שמוצג כאן נבנה מחדש ממבנה הקוד עם נתונים בדיוניים במכוון.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026-05",
      title: {
        en: "Replace loose view data with explicit view models.",
        he: "להחליף נתוני תצוגה רופפים במודלי תצוגה מפורשים.",
      },
      why: {
        en: "As portals grew, implicit controller-to-view contracts made changes hard to reason about and easy to break across roles.",
        he: "ככל שהפורטלים גדלו, חוזים מרומזים בין Controllers לתצוגות הפכו שינויים לקשים להבנה וקלים לשבירה בין תפקידים.",
      },
      tradeoff: {
        en: "More types and mapping code in exchange for visible, testable boundaries.",
        he: "יותר טיפוסים וקוד מיפוי בתמורה לגבולות גלויים וניתנים לבדיקה.",
      },
      revisit: {
        en: "If a simpler boundary can preserve the same clarity without recreating array-shaped contracts.",
        he: "אם גבול פשוט יותר ישמור על אותה בהירות בלי להחזיר חוזים בצורת מערכים.",
      },
    },
    {
      id: "D-02",
      date: "2026-05",
      title: {
        en: "Make authorization a platform boundary, not a controller habit.",
        he: "להפוך הרשאה לגבול פלטפורמה, לא להרגל בתוך Controller.",
      },
      why: {
        en: "Student, instructor and administrative surfaces share data while requiring very different authority. Ad-hoc checks do not scale with that overlap.",
        he: "ממשקי תלמידים, מנחים ומנהלים חולקים נתונים אך דורשים סמכויות שונות מאוד. בדיקות נקודתיות אינן גדלות היטב עם החפיפה הזו.",
      },
      tradeoff: {
        en: "Policy wiring adds ceremony, but makes the security decision inspectable in one place.",
        he: "חיבור Policies מוסיף טקסיות, אבל הופך את החלטת האבטחה לניתנת לבדיקה במקום אחד.",
      },
      revisit: {
        en: "When a new role or portal cannot be described by the current policy model.",
        he: "כאשר תפקיד או פורטל חדש לא יוכל להיות מתואר במודל המדיניות הנוכחי.",
      },
    },
    {
      id: "D-03",
      date: "2026-07",
      title: {
        en: "Treat touch support as behavior, not responsive styling.",
        he: "להתייחס לתמיכה במגע כהתנהגות, לא כעיצוב רספונסיבי.",
      },
      why: {
        en: "A collaborative flowchart can fit on a phone and still be unusable if its drag, selection and connection model assumes a mouse.",
        he: "תרשים זרימה שיתופי יכול להיכנס למסך טלפון ועדיין להיות בלתי שמיש אם מודל הגרירה, הבחירה והחיבור מניח עכבר.",
      },
      tradeoff: {
        en: "A more complex pointer model and a larger interaction test surface.",
        he: "מודל מצביע מורכב יותר ושטח בדיקות אינטראקציה גדול יותר.",
      },
      revisit: {
        en: "If the editor adopts a unified interaction engine with equivalent keyboard and touch behavior.",
        he: "אם העורך יעבור למנוע אינטראקציה מאוחד עם התנהגות מקבילה במקלדת ובמגע.",
      },
    },
  ],
  rebuild: {
    en: [
      "Define and preserve a privacy-safe adoption denominator before publishing reach numbers.",
      "Make deployment parity visible so a branch, a release and the live portal cannot quietly diverge.",
      "Keep the public reconstruction generated from fictional fixtures, never from blurred production records.",
    ],
    he: [
      "להגדיר ולשמור מכנה אימוץ בטוח לפרטיות לפני פרסום נתוני חשיפה.",
      "להפוך התאמה בין פריסה לגרסה לגלויה, כדי שענף, גרסה והפורטל החי לא יתפצלו בשקט.",
      "להמשיך לייצר את השחזור הציבורי מנתוני דמה בדיוניים, לעולם לא מרשומות ייצור מטושטשות.",
    ],
  },
};
