import type { Project } from "@/lib/types";

export const eventa: Project = {
  slug: "eventa",
  title: "Eventa",
  oneLiner: {
    en: "A mobile-first web platform for social connection at weddings — QR onboarding, guest profiles, matching and private messaging.",
    he: "פלטפורמת ווב מובייל־תחילה לחיבור חברתי בחתונות — כניסה בקוד QR, פרופילי אורחים, התאמה והודעות פרטיות.",
  },
  hook: {
    en: "A wedding can put strangers in one room while giving them no natural way to meet.",
    he: "חתונה יכולה להכניס זרים לחדר אחד בלי לתת להם דרך טבעית להכיר.",
  },
  snapshot: {
    problem: {
      en: "People can share a room, a host and a moment while still lacking the context that would make a conversation feel natural.",
      he: "אנשים יכולים לחלוק חדר, מארחים ורגע — ועדיין לחסר את ההקשר שיהפוך שיחה לטבעית.",
    },
    move: {
      en: "Use the event itself as the trust boundary: a QR opens a short, event-scoped path from arrival to a relevant introduction.",
      he: "להשתמש באירוע עצמו כגבול האמון: QR פותח מסלול קצר ומוגבל לאירוע מהגעה ועד היכרות רלוונטית.",
    },
    contribution: {
      en: "I independently conceived, designed, built and operated Eventa end to end: onboarding, profiles, matching, messaging, privacy and organizer controls.",
      he: "הגיתי, עיצבתי, בניתי ותפעלתי את Eventa באופן עצמאי מקצה לקצה: כניסה, פרופילים, התאמות, הודעות, פרטיות וכלי מארגנים.",
    },
    proof: {
      en: "A published source snapshot with product, operations, privacy, testing and CI documentation. The service itself has been discontinued.",
      he: "צילום מצב של קוד מקור שפורסם עם תיעוד מוצר, תפעול, פרטיות, בדיקות ו־CI. השירות עצמו הופסק.",
    },
  },
  tier: "flagship",
  stages: ["signal", "frame", "prove", "field"],
  domain: ["product"],
  role: {
    en: "Product · design · full-stack build · operation",
    he: "מוצר · עיצוב · בנייה פול־סטאק · תפעול",
  },
  team: { en: "Solo project · sole creator", he: "פרויקט עצמאי · יוצר יחיד" },
  started: "2026",
  ended: "2026",
  status: "discontinued",
  statusLabel: { en: "Discontinued · source public", he: "הופסק · הקוד ציבורי" },
  statusDetail: {
    en: "Owner-provided records - the source CV and project README - describe it as formerly live. It is now discontinued and published as an unmaintained source snapshot.",
    he: "מסמכים שסופקו על ידי הבעלים - קורות החיים המקוריים וקובץ ה־README של הפרויקט - מתארים אותו כמי שהיה פעיל בעבר. כיום הוא הופסק ופורסם כצילום מצב לא מתוחזק של קוד המקור.",
  },
  evidenceNote: {
    en: "Tomer confirms he was Eventa's sole creator and describes it as formerly operated and later discontinued. The public source snapshot verifies the implemented product surface; no user, match or event outcome is claimed.",
    he: "תומר מאשר שהוא היוצר היחיד של Eventa ומתאר אותו כמוצר שפעל בעבר ולאחר מכן הופסק. צילום המצב הציבורי מאמת את פני המוצר שמומשו; אין טענה למספר משתמשים, התאמות או תוצאות אירוע.",
  },
  metrics: [
    {
      label: { en: "Surface", he: "פלטפורמה" },
      value: { en: "Mobile-first", he: "מובייל־תחילה" },
      note: { en: "No install, no app store", he: "בלי התקנה, בלי חנות" },
    },
    {
      label: { en: "Onboarding", he: "כניסה" },
      value: { en: "QR", he: "QR" },
      note: { en: "Table card to profile", he: "מכרטיס שולחן לפרופיל" },
    },
    {
      label: { en: "State", he: "מצב" },
      value: { en: "Discontinued", he: "הופסק" },
      note: {
        en: "Source preserved for review",
        he: "הקוד נשמר לצורך סקירה",
      },
    },
  ],
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Playwright", "Vitest"],
  links: { repo: "https://github.com/tnaydnov/eventa" },
  sections: [
    {
      stage: "signal",
      heading: {
        en: "The room is already full of the right people",
        he: "החדר כבר מלא באנשים הנכונים",
      },
      body: {
        en: [
          "The product hypothesis begins with a room of people connected to the same hosts but separated by table plans, family groups and incomplete information about one another.",
          "That creates a short, event-bound interaction rather than a general-purpose dating context. The source reflects that framing through QR entry, event-scoped profiles, matching and private messaging.",
        ],
        he: [
          "השערת המוצר מתחילה בחדר של אנשים שמחוברים לאותם מארחים, אך מופרדים על ידי סידורי שולחן, קבוצות משפחתיות ומידע חלקי זה על זה.",
          "זה יוצר אינטראקציה קצרה ומוגבלת לאירוע, לא הקשר היכרויות כללי. קוד המקור משקף את המסגור הזה באמצעות כניסה ב־QR, פרופילים מוגבלי אירוע, התאמה והודעות פרטיות.",
        ],
      },
    },
    {
      stage: "frame",
      heading: {
        en: "Onboarding is the entire product risk",
        he: "הכניסה היא כל הסיכון המוצרי",
      },
      body: {
        en: [
          "Everything depends on one number: how many guests get through onboarding during an event. If that fails, no feature downstream matters, because a matching product with four participants is not a product.",
          "That framing rules out an enormous amount. No app store install — nobody downloads an app at a wedding. No account creation with email verification. No password. The path from a QR code on a table card to a usable profile has to be short enough to complete while standing up, holding a drink, in bad lighting.",
          "It also made privacy a framing constraint rather than a settings screen. These are not anonymous strangers; they are the bride's cousin and the groom's colleague, and they will all see each other again. A social product for a room full of people with mutual acquaintances has to be built on the assumption that every interaction is semi-public and permanently attributable. Visibility and messaging had to be designed with that in mind from the start, not softened later.",
          "Accessibility sits in the same category. A wedding crowd spans every age and every level of comfort with technology, in a dim room, on whatever phone they happen to own. That is not an edge case — it is the median user.",
        ],
        he: [
          "הכול תלוי במספר אחד: כמה אורחים עוברים את תהליך הכניסה במהלך אירוע. אם זה נכשל, שום פיצ׳ר בהמשך לא משנה, כי מוצר התאמה עם ארבעה משתתפים הוא לא מוצר.",
          "המסגור הזה פוסל כמות עצומה של אפשרויות. בלי התקנה מחנות אפליקציות — אף אחד לא מוריד אפליקציה בחתונה. בלי יצירת חשבון עם אימות מייל. בלי סיסמה. המסלול מקוד QR על כרטיס שולחן ועד פרופיל שמיש חייב להיות קצר מספיק כדי להשלים אותו בעמידה, עם כוס ביד, בתאורה גרועה.",
          "זה גם הפך את הפרטיות לאילוץ מסגור ולא למסך הגדרות. אלה לא זרים אנונימיים; אלה בת הדודה של הכלה והקולגה של החתן, וכולם ייפגשו שוב. מוצר חברתי לחדר מלא באנשים עם מכרים משותפים חייב להיבנות על ההנחה שכל אינטראקציה היא חצי־פומבית וניתנת לייחוס לצמיתות. נראוּת והתכתבות היו חייבות להיות מתוכננות עם זה בראש מההתחלה, לא לרכך אחר כך.",
          "נגישות יושבת באותה קטגוריה. קהל בחתונה משתרע על כל גיל וכל רמת נוחות עם טכנולוגיה, בחדר חשוך, על כל טלפון שבמקרה יש להם. זה לא מקרה קצה — זה המשתמש החציוני.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "The only test that counts happens once",
        he: "הבדיקה היחידה שנחשבת קורית פעם אחת",
      },
      body: {
        en: [
          "This product cannot be iterated the way normal software is. An event happens once, it cannot be replayed, and a failure during it is not recoverable — you do not get a second attempt at a wedding.",
          "So validation has to happen before the event rather than during it: walking the full path on the oldest and cheapest phone available, in poor lighting, on venue wifi, with the assumption that the person holding it has never seen the product and will not read anything.",
          "The metric that would matter is completion rate through onboarding, and it should be measured before any live-event claim is made.",
        ],
        he: [
          "אי אפשר לבצע איטרציות על המוצר הזה כמו על תוכנה רגילה. אירוע קורה פעם אחת, אי אפשר לשחזר אותו, וכישלון במהלכו אינו ניתן לתיקון — אין ניסיון שני בחתונה.",
          "לכן האימות חייב לקרות לפני האירוע ולא במהלכו: ללכת את כל המסלול על הטלפון הישן והזול ביותר שיש, בתאורה גרועה, על ה־wifi של האולם, מתוך הנחה שמי שמחזיק אותו מעולם לא ראה את המוצר ולא יקרא שום דבר.",
          "המדד שהיה חשוב הוא שיעור ההשלמה של הכניסה, ויש למדוד אותו לפני שמעלים טענה כלשהי על אירוע חי.",
        ],
      },
    },
    {
      stage: "field",
      heading: {
        en: "Iterating on the journey, not the feature list",
        he: "איטרציה על המסע, לא על רשימת הפיצ׳רים",
      },
      body: {
        en: [
          "The source snapshot shows a deliberately short path from QR entry to an event-scoped profile, with product copy and onboarding treated as part of the same interaction.",
          "That is evidence of implementation, not evidence that guests completed the flow, that conversations occurred or that an event produced an outcome.",
          "Eventa was later discontinued. I published the source as a portfolio artifact rather than presenting an unavailable service as a live product.",
        ],
        he: [
          "צילום המצב של קוד המקור מציג מסלול קצר בכוונה מכניסה ב־QR לפרופיל מוגבל לאירוע, כאשר הטקסט והכניסה מטופלים כחלק מאותה אינטראקציה.",
          "זו ראיה למימוש, לא ראיה לכך שאורחים השלימו את התהליך, שנוצרו שיחות או שאירוע הפיק תוצאה.",
          "Eventa הופסק בהמשך. פרסמתי את קוד המקור כארטיפקט לפורטפוליו במקום להציג שירות שאינו זמין כמוצר חי.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026",
      title: {
        en: "Mobile web with QR entry. No native app.",
        he: "ווב מובייל עם כניסה ב־QR. בלי אפליקציה נייטיב.",
      },
      why: {
        en: "Install friction at the moment of use is fatal. The product has a two-hour window and competes with an open bar; a download plus an account is more steps than the situation can support.",
        he: "חיכוך התקנה ברגע השימוש הוא קטלני. למוצר יש חלון של שעתיים והוא מתחרה בבר פתוח; הורדה בתוספת חשבון היא יותר שלבים ממה שהמצב יכול לשאת.",
      },
      tradeoff: {
        en: "No push notifications, no home-screen presence, and less capable device access. All acceptable next to actually getting people through the door.",
        he: "בלי התראות פוש, בלי נוכחות במסך הבית, וגישה מוגבלת יותר למכשיר. הכול מקובל לעומת באמת להכניס אנשים בדלת.",
      },
      revisit: {
        en: "If a venue or planner partnership makes it possible to onboard guests before the event rather than during it.",
        he: "אם שיתוף פעולה עם אולם או מפיק יאפשר להכניס אורחים לפני האירוע ולא במהלכו.",
      },
    },
    {
      id: "D-02",
      date: "2026",
      title: {
        en: "Treat privacy as a framing constraint, not a settings page.",
        he: "להתייחס לפרטיות כאילוץ מסגור, לא כדף הגדרות.",
      },
      why: {
        en: "Everyone in the room shares mutual acquaintances and will meet again. A visibility model that suits anonymous strangers is actively wrong here, and retrofitting one is not possible once behaviour has formed around the loose version.",
        he: "לכל מי שבחדר יש מכרים משותפים והם ייפגשו שוב. מודל נראוּת שמתאים לזרים אנונימיים פשוט שגוי כאן, ואי אפשר להתאים אותו בדיעבד ברגע שההתנהגות התגבשה סביב הגרסה הרופפת.",
      },
      tradeoff: {
        en: "A more conservative default that shows less and converts more slowly than a fully open directory would.",
        he: "ברירת מחדל שמרנית יותר שמציגה פחות וממירה לאט יותר ממה שספרייה פתוחה לגמרי הייתה עושה.",
      },
      revisit: {
        en: "Only with evidence from real events that the conservative default is suppressing the core interaction.",
        he: "רק עם ראיות מאירועים אמיתיים שברירת המחדל השמרנית מדכאת את האינטראקציה המרכזית.",
      },
    },
    {
      id: "D-03",
      date: "2026",
      title: {
        en: "Optimise for the median guest, not the ideal user.",
        he: "לְמַטֵּב לאורח החציוני, לא למשתמש האידיאלי.",
      },
      why: {
        en: "The realistic user is any age, in a dim room, on an unfamiliar phone, mildly distracted. Designing for a comfortable 28-year-old on a new device produces something that fails for most of the room.",
        he: "המשתמש הריאלי הוא בכל גיל, בחדר חשוך, על טלפון לא מוכר, מוסח קלות. עיצוב לבן 28 שנוח לו עם מכשיר חדש מייצר משהו שנכשל עבור רוב החדר.",
      },
      tradeoff: {
        en: "Larger targets, plainer language and fewer gestures than the design would otherwise use — visually less interesting, functionally correct.",
        he: "מטרות מגע גדולות יותר, שפה פשוטה יותר ופחות מחוות ממה שהעיצוב היה בוחר אחרת — פחות מעניין ויזואלית, נכון פונקציונלית.",
      },
      revisit: { en: "No.", he: "לא." },
    },
  ],
  rebuild: {
    en: [
      "Instrument onboarding drop-off per step before building anything past onboarding. It is the number the entire product depends on and it deserved measurement first.",
      "Write the table-card copy before the interface. The first thing a guest reads is six words on a piece of card, and that is doing more work than any screen in the product.",
      "Test on a five-year-old phone from day one rather than at the end. Every performance decision would have been different.",
    ],
    he: [
      "למדוד נשירה בכניסה לכל שלב לפני שבונים משהו אחרי הכניסה. זה המספר שכל המוצר תלוי בו והוא היה ראוי למדידה קודם.",
      "לכתוב את הטקסט של כרטיס השולחן לפני הממשק. הדבר הראשון שאורח קורא הוא שש מילים על פיסת קרטון, והן עושות יותר עבודה מכל מסך במוצר.",
      "לבדוק על טלפון בן חמש שנים מהיום הראשון ולא בסוף. כל החלטת ביצועים הייתה יוצאת אחרת.",
    ],
  },
};
