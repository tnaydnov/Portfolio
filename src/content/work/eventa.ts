import type { Project } from "@/lib/types";

export const eventa: Project = {
  slug: "eventa",
  title: "Eventa",
  oneLiner: {
    en: "A mobile-first social layer for live events: QR entry, guest profiles, matching, private messaging and an organizer back office.",
    he: "שכבה חברתית מובייל־תחילה לאירועים: כניסה ב־QR, פרופילי אורחים, התאמות, הודעות פרטיות וממשק למארגנים.",
  },
  hook: {
    en: "I built it, operated it, shut it down—and published the system so the work can still be inspected.",
    he: "בניתי אותו, הפעלתי אותו, סגרתי אותו — ופרסמתי את המערכת כדי שעדיין יהיה אפשר לבחון את העבודה.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "platform"],
  role: {
    en: "Independent product · Design · Engineering · Go-to-market",
    he: "מוצר עצמאי · עיצוב · הנדסה · יציאה לשוק",
  },
  started: "2026-01",
  dateLabel: {
    en: "2026 · former live service, now offline",
    he: "2026 · שירות שהיה פעיל וכיום אינו מקוון",
  },
  status: "offline",
  metrics: [
    {
      label: { en: "Product surfaces", he: "משטחי מוצר" },
      value: { en: "3", he: "3" },
      note: {
        en: "Guest · organizer · operator",
        he: "אורח · מארגן · תפעול",
      },
    },
    {
      label: { en: "Test record", he: "מערך בדיקות" },
      value: { en: "106 + 28", he: "106 + 28" },
      note: {
        en: "Unit/integration files + E2E specs",
        he: "קובצי יחידה/אינטגרציה + תרחישי E2E",
      },
    },
    {
      label: { en: "Data lifecycle", he: "מחזור חיי מידע" },
      value: { en: "7 days", he: "7 ימים" },
      note: {
        en: "Personal data scheduled for deletion after an event",
        he: "מחיקת מידע אישי מתוזמנת לאחר אירוע",
      },
    },
    {
      label: { en: "Primary market", he: "שוק ראשי" },
      value: { en: "HE / RTL", he: "עברית / RTL" },
      note: { en: "Built for Israel", he: "נבנה עבור השוק הישראלי" },
    },
  ],
  stack: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Realtime",
    "PWA",
    "Playwright",
  ],
  links: { repo: "https://github.com/tnaydnov/eventa" },
  media: {
    poster: "/images/eventa/entrance-scanning.png",
    alt: {
      en: "Eventa product material illustrating QR entry at a wedding",
      he: "חומר מוצר של Eventa המדגים כניסה באמצעות QR בחתונה",
    },
    caption: {
      en: "CONCEPT VISUAL / QR entry scenario",
      he: "הדמיית קונספט / תרחיש כניסה באמצעות QR",
    },
    kind: "concept",
  },
  gallery: [
    {
      poster: "/images/eventa/brand-card.png",
      alt: {
        en: "Eventa brand mark and Hebrew tagline",
        he: "סמל המותג Eventa והסלוגן בעברית",
      },
      caption: {
        en: "BRAND RECORD / Hebrew-first service",
        he: "תיעוד מותג / שירות שנבנה קודם בעברית",
      },
      kind: "interface",
    },
  ],
  proof: [
    {
      label: { en: "Product record", he: "תיעוד מוצר" },
      value: {
        en: "Built and operated as a Hebrew service; now offline",
        he: "נבנה והופעל כשירות בעברית; כיום לא מקוון",
      },
      href: "https://github.com/tnaydnov/eventa#what-this-is",
      access: "public",
    },
    {
      label: { en: "Delivery record", he: "תיעוד מסירה" },
      value: {
        en: "Guest app, organizer funnel and operator console",
        he: "אפליקציית אורחים, תהליך למארגנים וממשק תפעול",
      },
      href: "https://github.com/tnaydnov/eventa#feature-tour",
      access: "public",
    },
    {
      label: { en: "Quality record", he: "תיעוד איכות" },
      value: {
        en: "CI, security checks, test suites and bundle budgets",
        he: "CI, בדיקות אבטחה, מערכי בדיקה ותקציבי חבילה",
      },
      href: "https://github.com/tnaydnov/eventa#testing",
      access: "public",
    },
  ],
  sections: [
    {
      stage: "signal",
      heading: {
        en: "The context was more interesting than the feature",
        he: "ההקשר היה מעניין יותר מהפיצ׳ר",
      },
      body: {
        en: [
          "A wedding already contains a high-trust network, a shared physical space and a time-bounded event window. Eventa started from that specific situation—not from a plan to build another general social app.",
          "The practical question was whether a guest could move from a printed QR code to a useful profile quickly enough that the room, not the setup flow, remained the main event.",
        ],
        he: [
          "בחתונה כבר קיימים רשת של אמון, מרחב פיזי משותף וחלון זמן תחום של אירוע. Eventa התחיל מהסיטואציה המסוימת הזו — לא מתוכנית לבנות עוד רשת חברתית כללית.",
          "השאלה המעשית הייתה האם אורח יכול לעבור מקוד QR מודפס לפרופיל שימושי מספיק מהר, כך שהאירוע יישאר במרכז ולא תהליך ההרשמה.",
        ],
      },
    },
    {
      stage: "frame",
      heading: {
        en: "No install. No permanent social graph.",
        he: "בלי התקנה. בלי גרף חברתי קבוע.",
      },
      body: {
        en: [
          "The product was scoped around one event. Guests entered from a QR code, saw only people from that event, and their personal data was scheduled for deletion one week after it ended.",
          "That boundary shaped the mobile web choice, the event-scoped identity model, privacy defaults and the decision to build graceful fallbacks for unreliable venue Wi-Fi.",
        ],
        he: [
          "המוצר הוגדר סביב אירוע אחד. אורחים נכנסו מקוד QR, ראו רק אנשים מאותו אירוע, והמידע האישי שלהם תוכנן למחיקה שבוע לאחר סיומו.",
          "הגבול הזה עיצב את הבחירה בווב למובייל, את מודל הזהות המוגבל לאירוע, את ברירות המחדל לפרטיות ואת מנגנוני הגיבוי עבור Wi-Fi לא יציב באולם.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "One product, three working surfaces",
        he: "מוצר אחד, שלושה ממשקי עבודה",
      },
      body: {
        en: [
          "The public repository contains the guest PWA, an organizer purchase and setup flow, and an operator console for lifecycle, analytics, messaging and moderation. They share one Next.js application and one event-scoped data model.",
          "The engineering depth is visible rather than implied: 49 committed database migrations, realtime messaging with an offline outbox, row-level security, scheduled deletion, provider adapters and explicit failure modes.",
        ],
        he: [
          "המאגר הציבורי כולל PWA לאורחים, תהליך רכישה והקמה למארגנים וממשק תפעול לניהול מחזור חיים, אנליטיקה, הודעות ומודרציה. כולם חולקים אפליקציית Next.js אחת ומודל מידע מוגבל לאירוע.",
          "העומק ההנדסי גלוי ולא מרומז: 49 מיגרציות מתועדות, הודעות בזמן אמת עם תור לא מקוון, אבטחה ברמת שורה, מחיקה מתוזמנת, מתאמים לספקים ומצבי כשל מפורשים.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "The repository is part of the case study",
        he: "המאגר הוא חלק ממקרה הבוחן",
      },
      body: {
        en: [
          "The test record is public: 106 unit and integration files, 28 end-to-end specs, CI, CodeQL, audit checks, a bundle-size budget and an automated check that every table receives Row-Level Security.",
          "Those checks do not prove market fit. They do prove that the product was treated as an operating system with privacy, failure and maintenance costs—not as a sequence of polished screens.",
        ],
        he: [
          "תיעוד הבדיקות ציבורי: 106 קובצי יחידה ואינטגרציה, 28 תרחישי קצה־לקצה, CI, CodeQL, בדיקות audit, תקציב גודל חבילה ובדיקה אוטומטית שכל טבלה מקבלת Row-Level Security.",
          "הבדיקות האלה אינן מוכיחות התאמה לשוק. הן כן מוכיחות שהמוצר טופל כמערכת פעילה עם עלויות פרטיות, כשל ותחזוקה — לא כרצף של מסכים מלוטשים.",
        ],
      },
    },
    {
      stage: "field",
      heading: {
        en: "Shipping also means knowing when to stop",
        he: "לשלוח פירושו גם לדעת מתי לעצור",
      },
      body: {
        en: [
          "Eventa was operated as a Hebrew service and then taken offline. The code was stripped of operator identity and credentials and published as a read-only portfolio artifact.",
          "That ending is part of the work. A shut-down product with a public source record, a maintained architecture story and explicit lessons says more than an indefinitely ‘coming soon’ demo.",
        ],
        he: [
          "Eventa הופעל כשירות בעברית ולאחר מכן הורד מהאוויר. הקוד נוקה מזהות המפעיל ומפרטי גישה ופורסם כתיעוד תיק עבודות לקריאה.",
          "הסיום הזה הוא חלק מהעבודה. מוצר שנסגר עם תיעוד מקור ציבורי, סיפור ארכיטקטורה מסודר ולקחים מפורשים אומר יותר מדמו שנשאר ‘בקרוב’ ללא סוף.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026",
      title: {
        en: "Mobile web and QR entry instead of a native app",
        he: "ווב למובייל וכניסה ב־QR במקום אפליקציה נייטיבית",
      },
      why: {
        en: "The product had to work at the moment of use. An app-store download and permanent account would spend the entire attention budget before the guest reached the room.",
        he: "המוצר היה חייב לעבוד ברגע השימוש. הורדה מחנות וחשבון קבוע היו מבזבזים את כל תקציב הקשב לפני שהאורח הגיע לחדר.",
      },
      tradeoff: {
        en: "Less device integration and a harder notification story, in exchange for immediate access on any modern phone.",
        he: "פחות אינטגרציה עם המכשיר וסיפור התראות מורכב יותר, בתמורה לכניסה מיידית מכל טלפון מודרני.",
      },
      revisit: {
        en: "Only if guests could be onboarded before the event through a venue or planner relationship.",
        he: "רק אם ניתן יהיה לצרף אורחים לפני האירוע דרך שיתוף פעולה עם אולם או מפיק.",
      },
    },
    {
      id: "D-02",
      date: "2026",
      title: {
        en: "Delete personal data after the event",
        he: "למחוק מידע אישי לאחר האירוע",
      },
      why: {
        en: "The value was event-scoped. Retaining profiles and messages after that context ended created privacy risk without improving the core experience.",
        he: "הערך היה מוגבל לאירוע. שמירת פרופילים והודעות לאחר שההקשר הסתיים יצרה סיכון לפרטיות בלי לשפר את החוויה המרכזית.",
      },
      tradeoff: {
        en: "No persistent network and less opportunity for long-term engagement, in exchange for a clearer trust contract.",
        he: "בלי רשת קבועה ופחות אפשרות למעורבות ארוכת טווח, בתמורה להסכם אמון ברור יותר.",
      },
      revisit: {
        en: "If users explicitly opted into a separate post-event product with a new consent boundary.",
        he: "אם משתמשים יבחרו במפורש במוצר נפרד לאחר האירוע, עם גבול הסכמה חדש.",
      },
    },
    {
      id: "D-03",
      date: "2026",
      title: {
        en: "One shared guard for participant-facing secure routes",
        he: "שומר משותף אחד לנתיבים המאובטחים של המשתתפים",
      },
      why: {
        en: "Participant-facing secure routes share a central guard for CSRF/origin, session, rate limiting, ban/session-epoch and event-status checks. Admin, auth, payments and cron use their own trust boundaries.",
        he: "הנתיבים המאובטחים של המשתתפים חולקים שומר מרכזי לבדיקות CSRF/מקור, סשן, הגבלת קצב, חסימה/עידן סשן ומצב אירוע. ניהול, אימות, תשלומים ו־cron משתמשים בגבולות אמון משלהם.",
      },
      tradeoff: {
        en: "A central dependency and a stricter route contract, in exchange for one auditable place to enforce cross-cutting rules.",
        he: "תלות מרכזית וחוזה נתיב קשיח יותר, בתמורה למקום אחד שניתן לבקר בו את כל הכללים הרוחביים.",
      },
      revisit: {
        en: "If the application were split into independently deployed services with different trust models.",
        he: "אם האפליקציה תפוצל לשירותים נפרדים בפריסה עם מודלי אמון שונים.",
      },
    },
  ],
  rebuild: {
    en: [
      "Run a much narrower paid pilot before building the full organizer and operator automation.",
      "Instrument the QR-to-profile funnel from the first field test, so onboarding decisions have measured drop-off rather than only observation.",
      "Keep the event-scoped privacy model. It is the clearest product decision in the system.",
    ],
    he: [
      "להריץ פיילוט בתשלום צר בהרבה לפני בניית כל האוטומציה למארגנים ולתפעול.",
      "למדוד את המשפך מה־QR ועד לפרופיל כבר בבדיקת השטח הראשונה, כדי שהחלטות על ההרשמה יתבססו על נשירה מדודה ולא רק על תצפית.",
      "לשמור על מודל הפרטיות המוגבל לאירוע. זו החלטת המוצר הברורה ביותר במערכת.",
    ],
  },
};
