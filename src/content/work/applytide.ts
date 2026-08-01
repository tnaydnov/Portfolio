import type { Project } from "@/lib/types";

export const applytide: Project = {
  slug: "applytide",
  title: "Applytide",
  oneLiner: {
    en: "A job-application management platform: pipeline, documents, reminders, analytics and interview prep.",
    he: "פלטפורמה לניהול מועמדויות: צינור מיון, מסמכים, תזכורות, אנליטיקה והכנה לראיונות.",
  },
  hook: {
    en: "A job search is a pipeline with terrible instrumentation. I built the instrumentation.",
    he: "חיפוש עבודה הוא צינור עם מדידה גרועה. בניתי את המדידה.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "platform", "applied-ai"],
  role: {
    en: "Product & architecture · Full-stack build",
    he: "מוצר וארכיטקטורה · בנייה פול־סטאק",
  },
  started: "2025-08",
  ended: "2026-04",
  status: "archived",
  metrics: [
    {
      label: { en: "Services", he: "שירותים" },
      value: { en: "8", he: "8" },
      note: {
        en: "Compose services, including dev mail",
        he: "שירותי Compose, כולל דואר לפיתוח",
      },
    },
    {
      label: { en: "Data models", he: "מודלי נתונים" },
      value: { en: "19", he: "19" },
      note: {
        en: "Mapped SQLAlchemy entities",
        he: "ישויות SQLAlchemy ממופות",
      },
    },
    {
      label: { en: "Router groups", he: "קבוצות ראוטרים" },
      value: { en: "15", he: "15" },
      note: { en: "REST + WebSocket", he: "REST + WebSocket" },
    },
    {
      label: { en: "Locales", he: "שפות" },
      value: { en: "2", he: "2" },
      note: { en: "EN / HE, full RTL", he: "אנגלית / עברית, RTL מלא" },
    },
  ],
  stack: [
    "React 18",
    "TypeScript",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Nginx",
    "OpenAI API",
    "Chrome MV3",
  ],
  links: { repo: "https://github.com/tnaydnov/Applytide" },
  proof: [
    {
      label: { en: "Source record", he: "תיעוד מקור" },
      value: {
        en: "Archived independent project; public repository",
        he: "פרויקט עצמאי בארכיון; מאגר ציבורי",
      },
      href: "https://github.com/tnaydnov/Applytide",
      access: "public",
    },
    {
      label: { en: "Capture record", he: "תיעוד קליטה" },
      value: {
        en: "Chrome extension: JSON-LD → DOM → LLM fallback",
        he: "תוסף Chrome: ‏JSON-LD ← DOM ← גיבוי LLM",
      },
      href: "https://github.com/tnaydnov/Applytide#chrome-extension",
      access: "public",
    },
    {
      label: { en: "Control record", he: "תיעוד בקרה" },
      value: {
        en: "TOTP, session revocation and a Redis-backed AI budget guard",
        he: "TOTP, ביטול סשנים ומגבלת תקציב AI המגובה ב־Redis",
      },
      href: "https://github.com/tnaydnov/Applytide#security",
      access: "public",
    },
  ],
  sections: [
    {
      stage: "signal",
      heading: { en: "The tracking is the job", he: "המעקב הוא העבודה" },
      body: {
        en: [
          "A serious job search is a pipeline—sourcing, qualification, application, follow-up, interview, decision—but people often run its accounting in a spreadsheet or in their head: which CV went where, what was promised, and which applications are still alive.",
          "What I got wrong initially: I assumed the painful step was writing applications. It was not. The painful step was capture — getting a posting out of a browser tab and into a structured record before the tab closed. Everything downstream depends on that one moment being frictionless.",
        ],
        he: [
          "חיפוש עבודה רציני הוא צינור — איתור, סינון, הגשה, מעקב, ראיון, החלטה — אבל אנשים מנהלים לעיתים את החשבונאות שלו בגיליון או בראש: אילו קורות חיים נשלחו לאן, מה הובטח ואילו מועמדויות עדיין חיות.",
          "מה שטעיתי בו בהתחלה: הנחתי שהשלב הכואב הוא כתיבת ההגשות. הוא לא. השלב הכואב היה הקליטה — להוציא משרה מטאב בדפדפן ולהכניס אותה לרשומה מובנית לפני שהטאב נסגר. כל מה שבהמשך תלוי בכך שהרגע הבודד הזה יהיה נטול חיכוך.",
        ],
      },
    },
    {
      stage: "frame",
      heading: {
        en: "Constraints that actually bound the design",
        he: "אילוצים שבאמת תחמו את העיצוב",
      },
      body: {
        en: [
          "Two real constraints shaped almost every decision. The first was cost: any feature calling a language model has an unbounded bill attached to it, and a personal project cannot absorb that. The second was trust: this system holds a user's CV, their employment history, and a list of every company they are quietly talking to. That is a small dataset with a very high blast radius.",
          "So security and cost control were not features to add later — they were framing constraints. That is why the build contains things a side project usually skips: HttpOnly cookie sessions rather than tokens in localStorage, TOTP two-factor, revocable session tracking, global plus sensitive-operation rate limits, and a Redis-backed daily budget guard for AI calls.",
        ],
        he: [
          "שני אילוצים אמיתיים עיצבו כמעט כל החלטה. הראשון היה עלות: לכל פיצ׳ר שקורא למודל שפה מוצמד חשבון בלתי חסום, ופרויקט אישי לא יכול לספוג את זה. השני היה אמון: המערכת הזו מחזיקה את קורות החיים של המשתמש, את היסטוריית ההעסקה שלו, ורשימה של כל חברה שהוא מדבר איתה בשקט. זה מאגר קטן עם רדיוס נזק גבוה מאוד.",
          "לכן אבטחה ובקרת עלויות לא היו פיצ׳רים להוסיף אחר כך — הן היו אילוצי מסגור. בגלל זה הבנייה כוללת דברים שפרויקט צד בדרך כלל מדלג עליהם: סשנים בעוגיות HttpOnly במקום טוקנים ב־localStorage, אימות דו־שלבי מבוסס TOTP, מעקב סשנים ניתן לביטול, הגבלות קצב גלובליות ולפעולות רגישות, ומגבלת תקציב יומית לקריאות AI המגובה ב־Redis.",
        ],
      },
    },
    {
      stage: "plan",
      heading: {
        en: "Capture first, because everything hangs off it",
        he: "קליטה קודם, כי הכול תלוי בה",
      },
      body: {
        en: [
          "Since capture was the load-bearing step, the browser extension was built early rather than as an add-on. Getting a posting into the system in one click is the difference between a tool someone uses and a tool someone means to use.",
          "The rest sequenced along the pipeline itself: capture, then the Kanban stages that model the process, then documents, then the reminder and analytics layers that only become meaningful once there is history to reason about. Analytics last is deliberate — a dashboard over three records is decoration.",
        ],
        he: [
          "מכיוון שהקליטה הייתה השלב הנושא, תוסף הדפדפן נבנה מוקדם ולא כתוספת. להכניס משרה למערכת בלחיצה אחת זה ההבדל בין כלי שמישהו משתמש בו לכלי שמישהו מתכוון להשתמש בו.",
          "השאר תוזמן לאורך הצינור עצמו: קליטה, אחר כך שלבי הקנבן שממדלים את התהליך, אחר כך מסמכים, ואז שכבות התזכורות והאנליטיקה שהופכות משמעותיות רק כשיש היסטוריה להסיק ממנה. אנליטיקה אחרונה זו בחירה מכוונת — דשבורד מעל שלוש רשומות הוא קישוט.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "A reason for every service boundary",
        he: "סיבה לכל גבול בין שירותים",
      },
      body: {
        en: [
          "Compose defines eight services: seven product and infrastructure boundaries plus MailDev for local testing. Behind FastAPI, 15 router groups sit over a domain layer, 19 mapped SQLAlchemy entities and infrastructure for email, LLM access, security and workers.",
          "The hardest problem was extraction: turning an arbitrary job page into structured fields. The naive answer is to send the page to a model. That answer is wrong for reasons covered in the decision log below.",
          "The second hardest was internationalisation. Full Hebrew support means real RTL — not a mirrored stylesheet, but a layout that is correct in both directions, including inputs, charts, and drag-and-drop. Retrofitting that is expensive, which is why it was designed in rather than bolted on.",
        ],
        he: [
          "Compose מגדיר שמונה שירותים: שבעה גבולות מוצר ותשתית ועוד MailDev לבדיקות מקומיות. מאחורי FastAPI, חמש־עשרה קבוצות ראוטרים יושבות מעל שכבת דומיין, תשע־עשרה ישויות SQLAlchemy ממופות ותשתית למיילים, גישה למודל שפה, אבטחה ועובדי רקע.",
          "הבעיה הקשה ביותר הייתה חילוץ: להפוך דף משרה שרירותי לשדות מובנים. התשובה הנאיבית היא לשלוח את הדף למודל. התשובה הזו שגויה מסיבות שמפורטות ביומן ההחלטות למטה.",
          "השנייה בקושי הייתה בינאום. תמיכה מלאה בעברית פירושה RTL אמיתי — לא גיליון סגנונות משוקף, אלא פריסה שנכונה בשני הכיוונים, כולל שדות קלט, גרפים, וגרירה ושחרור. התאמה בדיעבד יקרה, ולכן זה תוכנן פנימה ולא הוברג מבחוץ.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "Budgets, health checks, and the things you cannot unit-test",
        he: "תקציבים, בדיקות תקינות, והדברים שאי אפשר לבדוק ביחידה",
      },
      body: {
        en: [
          "LLM usage is logged per call with token counts and cost attributed to a user, against a configurable daily budget guard. The guard is fail-open if Redis is unavailable, so it bounds normal operation but is not a billing-grade guarantee.",
          "Session management is testable in the same spirit: a user can list their active sessions and revoke them. The question that validates it is not “does the endpoint return 200”, it is “can a user who lost a laptop actually recover”.",
        ],
        he: [
          "שימוש במודל שפה נרשם לכל קריאה עם ספירת טוקנים ועלות המשויכת למשתמש, מול מגבלת תקציב יומית הניתנת להגדרה. המגבלה פתוחה במקרה כשל של Redis, ולכן היא תוחמת פעולה רגילה אך אינה הבטחת חיוב קשיחה.",
          "ניהול סשנים ניתן לבדיקה באותה רוח: משתמש יכול לראות את הסשנים הפעילים שלו ולבטל אותם. השאלה שמאמתת את זה היא לא ״האם נקודת הקצה מחזירה 200״, אלא ״האם משתמש שאיבד מחשב נייד באמת יכול להתאושש״.",
        ],
      },
    },
    {
      stage: "field",
      heading: { en: "Archived on purpose", he: "בארכיון בכוונה" },
      body: {
        en: [
          "Applytide is archived because the remaining work was operational: running infrastructure, absorbing variable AI costs and maintaining a security surface that deserves more than spare evenings. Continuing would have meant committing to operate a product, which is a different decision from building one.",
          "The public repository remains evidence of end-to-end system ownership: architecture, security controls, cost guardrails and a documented set of decisions.",
        ],
        he: [
          "Applytide נמצא בארכיון כי העבודה שנותרה הייתה תפעולית: להריץ תשתית, לספוג עלויות AI משתנות ולתחזק משטח אבטחה שראוי ליותר מערבים פנויים. להמשיך היה אומר להתחייב לתפעל מוצר, וזו החלטה אחרת מלבנות אחד.",
          "המאגר הציבורי נשאר ראיה לבעלות על מערכת מקצה לקצה: ארכיטקטורה, בקרות אבטחה, מגבלות עלות ואוסף מתועד של החלטות.",
        ],
      },
    },
  ],
  architecture: {
    caption: {
      en: "Applytide's runtime topology. Every box had to answer two questions: why does this exist, and what would it take to delete it.",
      he: "טופולוגיית זמן הריצה של Applytide. כל קופסה הייתה חייבת לענות על שתי שאלות: למה זה קיים, ומה יידרש כדי למחוק את זה.",
    },
    nodes: [
      {
        id: "ext",
        label: "Chrome extension",
        sub: "Manifest V3",
        x: 0,
        y: 0,
        kind: "client",
        note: {
          en: "One-click capture from any job page. Exists because capture was the load-bearing step; without it the pipeline never gets populated. Deleting it would mean manual entry, which historically means no entry.",
          he: "קליטה בלחיצה אחת מכל דף משרה. קיים כי הקליטה הייתה השלב הנושא; בלעדיו הצינור לעולם לא מתמלא. מחיקה שלו הייתה אומרת הזנה ידנית, שהיסטורית אומרת אי־הזנה.",
        },
      },
      {
        id: "nginx",
        label: "Nginx",
        sub: "Reverse proxy · rate limit",
        x: 1,
        y: 1,
        kind: "edge",
        note: {
          en: "Rate limiting belongs at the edge, not in application code, so that abuse is rejected before it costs a database connection. Removable only by moving those concerns into a managed edge layer.",
          he: "הגבלת קצב שייכת לקצה, לא לקוד האפליקציה, כדי שניצול לרעה יידחה לפני שהוא עולה חיבור למסד נתונים. ניתן להסרה רק על ידי העברת הדאגות האלה לשכבת קצה מנוהלת.",
        },
      },
      {
        id: "web",
        label: "React SPA",
        sub: "Vite · TS · Tailwind",
        x: 2,
        y: 0,
        kind: "client",
        note: {
          en: "shadcn/ui components over Radix primitives, with full RTL. The authenticated workflow and public routes share one SPA bundle; that simplified deployment at the cost of weaker crawlability for the public surface.",
          he: "רכיבי shadcn/ui מעל פרימיטיבים של Radix, עם RTL מלא. תהליך העבודה המאומת והעמודים הציבוריים חולקים חבילת SPA אחת; זה פישט את הפריסה במחיר של יכולת סריקה חלשה יותר במשטח הציבורי.",
        },
      },
      {
        id: "api",
        label: "FastAPI",
        sub: "15 router groups · domain layer",
        x: 2,
        y: 1,
        kind: "service",
        note: {
          en: "The core. Layered API / domain / db / infra so that LLM access is swappable infrastructure rather than business logic.",
          he: "הליבה. שכבות API / דומיין / מסד / תשתית, כך שגישה למודל שפה היא תשתית ניתנת להחלפה ולא לוגיקה עסקית.",
        },
      },
      {
        id: "mail",
        label: "Email service",
        sub: "Node · React Email",
        x: 2,
        y: 2,
        kind: "service",
        note: {
          en: "Separate because HTML email rendering is a JavaScript ecosystem problem and forcing it into Python would have meant worse templates. The clearest case in the system for a service boundary.",
          he: "נפרד כי רינדור מייל HTML הוא בעיה של המערכת האקולוגית של JavaScript, ולדחוף אותה לפייתון היה מייצר תבניות גרועות יותר. המקרה הברור ביותר במערכת לגבול שירות.",
        },
      },
      {
        id: "worker",
        label: "Scheduler",
        sub: "APScheduler",
        x: 4,
        y: 2,
        kind: "service",
        note: {
          en: "Background jobs, cleanup and reminder dispatch. Split from the API so that a slow job cannot occupy a request worker.",
          he: "עבודות רקע, ניקיון ושליחת תזכורות. הופרד מה־API כדי שעבודה איטית לא תתפוס עובד בקשות.",
        },
      },
      {
        id: "pg",
        label: "PostgreSQL 16",
        sub: "19 mapped entities · Alembic",
        x: 3,
        y: 0,
        kind: "store",
        note: {
          en: "UUID primary keys, UTC timestamps, JSONB for the genuinely variable fields. Migrations under Alembic from the first model.",
          he: "מפתחות ראשיים מסוג UUID, חותמות זמן ב־UTC, JSONB לשדות שבאמת משתנים. מיגרציות תחת Alembic כבר מהמודל הראשון.",
        },
      },
      {
        id: "redis",
        label: "Redis 7",
        sub: "Cache · limits · AI budget",
        x: 3,
        y: 1,
        kind: "store",
        note: {
          en: "Also the normal-operation guard for the daily LLM budget. Cost tracking and rate limits make it useful independently of caching.",
          he: "גם מגבלת הפעולה הרגילה לתקציב היומי של מודל השפה. מעקב עלויות והגבלות קצב הופכים אותו לשימושי בנפרד מהמטמון.",
        },
      },
    ],
    edges: [
      { from: "ext", to: "nginx" },
      { from: "nginx", to: "web" },
      { from: "nginx", to: "api" },
      { from: "nginx", to: "mail" },
      { from: "api", to: "pg" },
      { from: "api", to: "redis" },
      { from: "api", to: "mail", label: "render" },
      { from: "worker", to: "pg" },
      { from: "worker", to: "mail", label: "dispatch" },
    ],
  },
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title: {
        en: "Three-stage extraction cascade (JSON-LD → DOM → LLM) instead of LLM-only parsing.",
        he: "מפל חילוץ תלת־שלבי (JSON-LD ← DOM ← מודל שפה) במקום ניתוח מבוסס מודל בלבד.",
      },
      why: {
        en: "When valid JobPosting structured data is present, parsing it is deterministic and adds no model-call cost. Sending the same page directly to a model would add cost and nondeterministic output, especially risky for fields such as salary.",
        he: "כאשר קיימים נתוני JobPosting מובנים ותקינים, הניתוח שלהם דטרמיניסטי ואינו מוסיף עלות של קריאת מודל. שליחת אותו דף ישירות למודל הייתה מוסיפה עלות ופלט לא דטרמיניסטי, דבר מסוכן במיוחד בשדות כמו שכר.",
      },
      tradeoff: {
        en: "Three code paths and three distinct failure modes to maintain instead of one, in exchange for deterministic extraction without model-call cost whenever structured data or DOM fields are available.",
        he: "שלושה מסלולי קוד ושלושה מצבי כשל נפרדים לתחזוקה במקום אחד, בתמורה לחילוץ דטרמיניסטי ללא עלות קריאת מודל כאשר נתונים מובנים או שדות DOM זמינים.",
      },
      revisit: {
        en: "If model extraction becomes cheap enough that the accounting stops mattering, or if deterministic sources prove too sparse to justify maintaining the cascade.",
        he: "אם חילוץ באמצעות מודל יהפוך לזול מספיק כך שהעלות תפסיק להיות משמעותית, או אם המקורות הדטרמיניסטיים יתבררו כדלילים מכדי להצדיק את תחזוקת המפל.",
      },
    },
    {
      id: "D-02",
      date: "2025",
      title: {
        en: "Redis-backed daily LLM budget guard, with per-user attribution.",
        he: "מגבלת תקציב יומית למודל שפה המגובה ב־Redis, עם ייחוס לכל משתמש.",
      },
      why: {
        en: "Any AI feature exposed to users creates variable cost. A budget guard catches normal runaways before after-the-fact logs do; the current implementation stays available if Redis fails.",
        he: "כל פיצ׳ר AI שחשוף למשתמשים יוצר עלות משתנה. מגבלת תקציב עוצרת חריגות רגילות לפני שרישום בדיעבד עושה זאת; המימוש הנוכחי נשאר זמין אם Redis נכשל.",
      },
      tradeoff: {
        en: "Users can hit the normal-operation ceiling; fail-open behavior preserves availability but weakens the cost guarantee during a Redis outage.",
        he: "משתמשים יכולים להגיע לתקרה בפעולה רגילה; פתיחה במקרה כשל שומרת על זמינות אך מחלישה את הבטחת העלות בזמן השבתת Redis.",
      },
      revisit: {
        en: "Before public operation: decide whether cost protection should fail closed or move to a managed quota layer.",
        he: "לפני הפעלה ציבורית: להחליט אם הגנת העלות צריכה להיסגר בכשל או לעבור לשכבת מכסות מנוהלת.",
      },
    },
    {
      id: "D-03",
      date: "2025",
      title: {
        en: "JWT in HttpOnly cookies, not tokens in localStorage.",
        he: "‏JWT בעוגיות HttpOnly, לא טוקנים ב־localStorage.",
      },
      why: {
        en: "The dataset is a user's employment history and a list of companies they are privately talking to. Any XSS in an SPA turns localStorage tokens into a full account takeover.",
        he: "המאגר הוא היסטוריית ההעסקה של המשתמש ורשימת החברות שהוא מדבר איתן בפרטיות. כל XSS ב־SPA הופך טוקנים ב־localStorage להשתלטות מלאה על החשבון.",
      },
      tradeoff: {
        en: "CSRF becomes a concern that has to be handled explicitly, and cross-origin setups get harder. That is a better class of problem to own.",
        he: "‏CSRF הופך לדאגה שצריך לטפל בה במפורש, והגדרות cross-origin נעשות קשות יותר. זו מחלקת בעיות טובה יותר להיות אחראי עליה.",
      },
      revisit: {
        en: "Not without a very good reason.",
        he: "לא בלי סיבה טובה מאוד.",
      },
    },
    {
      id: "D-04",
      date: "2026-04",
      title: {
        en: "Stop active development rather than operate.",
        he: "לעצור פיתוח פעיל במקום לעבור לתפעול.",
      },
      why: {
        en: "Remaining work was operational — infrastructure, absorbing others' AI costs, and maintaining a security surface that deserves real attention. That is a commitment to operate a product, which is a different decision from building one.",
        he: "העבודה שנותרה הייתה תפעולית — תשתית, ספיגת עלויות בינה מלאכותית של אחרים, ותחזוקת משטח אבטחה שראוי לתשומת לב אמיתית. זו התחייבות לתפעל מוצר, וזו החלטה אחרת מלבנות אחד.",
      },
      tradeoff: {
        en: "No live deployment to show, and no usage metrics. The code, architecture and reasoning remain inspectable.",
        he: "אין פריסה חיה להראות, ואין מדדי שימוש. הקוד, הארכיטקטורה וההנמקה נשארים ניתנים לבדיקה.",
      },
      revisit: {
        en: "If there is a reason to operate it that justifies the running cost and the duty of care.",
        he: "אם תהיה סיבה לתפעל אותו שתצדיק את עלות ההרצה ואת חובת הזהירות.",
      },
    },
  ],
  constraints: {
    question: {
      en: "How should an arbitrary job page become structured data?",
      he: "איך דף משרה שרירותי אמור להפוך לנתונים מובנים?",
    },
    actual: {
      time: 1,
      scope: 1,
      note: {
        en: "Real conditions: solo build, ongoing cost exposure, and a correctness bar high enough that a wrong salary field is worse than no salary field. That combination points at the cascade.",
        he: "התנאים האמיתיים: בנייה לבד, חשיפה מתמשכת לעלות, ורף נכונות גבוה מספיק כדי ששדה שכר שגוי יהיה גרוע יותר משדה שכר חסר. הצירוף הזה מצביע על המפל.",
      },
    },
    scenarios: [
      {
        time: 0,
        scope: 0,
        outcome: {
          en: "LLM-only. One code path and the lowest implementation complexity, while accepting per-job cost and nondeterministic fields. Suitable for a prototype whose purpose is to test whether anyone wants capture at all.",
          he: "מודל שפה בלבד. מסלול קוד אחד ומורכבות המימוש הנמוכה ביותר, תוך קבלת עלות לכל משרה ושדות לא דטרמיניסטיים. מתאים לאב טיפוס שמטרתו לבדוק אם מישהו בכלל רוצה קליטה.",
        },
      },
      {
        time: 0,
        scope: 1,
        outcome: {
          en: "JSON-LD with an LLM fallback. Two paths. Avoids model calls whenever valid structured data is available, for less implementation work than the full cascade — the pragmatic version if the deadline is real.",
          he: "‏JSON-LD עם גיבוי של מודל שפה. שני מסלולים. נמנע מקריאות מודל כאשר נתונים מובנים תקינים זמינים, בפחות עבודת מימוש מהמפל המלא — הגרסה הפרגמטית כשהדדליין אמיתי.",
        },
      },
      {
        time: 0,
        scope: 2,
        outcome: {
          en: "Not coherent. Broad scope on a short clock produces three half-built paths and no reliable one.",
          he: "לא קוהרנטי. היקף רחב בלוח זמנים קצר מייצר שלושה מסלולים חצי־בנויים ואף אחד אמין.",
        },
      },
      {
        time: 1,
        scope: 0,
        outcome: {
          en: "LLM-only, but instrumented properly: per-call cost logging and a budget cap. Cheaper to build, and the telemetry tells you later whether the cascade is worth it.",
          he: "מודל שפה בלבד, אבל עם מדידה כמו שצריך: רישום עלות לכל קריאה ותקרת תקציב. זול יותר לבנייה, והטלמטריה תגיד לך אחר כך אם המפל שווה את זה.",
        },
      },
      {
        time: 1,
        scope: 1,
        outcome: {
          en: "The three-stage cascade — JSON-LD, then DOM parsing, then LLM fallback. What I actually built. Deterministic and model-free when structured data or DOM extraction succeeds, with a paid model fallback for unresolved pages.",
          he: "המפל התלת־שלבי — JSON-LD, אחר כך ניתוח DOM, אחר כך גיבוי של מודל שפה. זה מה שבניתי בפועל: דטרמיניסטי וללא מודל כאשר חילוץ הנתונים המובנים או ה־DOM מצליח, עם גיבוי בתשלום לדפים שלא נפתרו.",
        },
      },
      {
        time: 1,
        scope: 2,
        outcome: {
          en: "Cascade plus per-board adapters for selected sites. More site-specific control, but each adapter is a maintenance liability that can break silently when a site redesigns.",
          he: "מפל בתוספת מתאמים ייעודיים לאתרים נבחרים. יותר שליטה ספציפית לכל אתר, אבל כל מתאם הוא התחייבות תחזוקה שעלולה להישבר בשקט כשהאתר מתעצב מחדש.",
        },
      },
      {
        time: 2,
        scope: 0,
        outcome: {
          en: "Overkill in the wrong direction. Time spent perfecting a single fragile path that structured data would have solved for free.",
          he: "השקעת יתר בכיוון הלא נכון. זמן שמושקע בשכלול מסלול שביר יחיד שנתונים מובנים היו פותרים בחינם.",
        },
      },
      {
        time: 2,
        scope: 1,
        outcome: {
          en: "Cascade with an evaluation harness — a labelled corpus of pages measuring precision per stage, so routing decisions are evidence-based rather than intuited.",
          he: "מפל עם מערך הערכה — קורפוס מתויג של דפים שמודד דיוק לכל שלב, כך שהחלטות ניתוב מבוססות ראיות ולא תחושה.",
        },
      },
      {
        time: 2,
        scope: 2,
        outcome: {
          en: "Cascade, evaluation harness, and a fine-tuned small model for the fallback tier. A measurable route to tuning accuracy per unit cost, and only justifiable at real volume.",
          he: "מפל, מערך הערכה ומודל קטן מכוונן לשכבת הגיבוי. מסלול מדיד לכוונון דיוק ליחידת עלות, שמוצדק רק בנפח אמיתי.",
        },
      },
    ],
  },
  rebuild: {
    en: [
      "Build the evaluation harness for extraction first. I made routing decisions between the three stages on judgement when a labelled corpus of a few hundred pages would have made them measurable.",
      "Start with one locale and add Hebrew at a defined checkpoint. Designing bidirectional from day one was the right call architecturally, but it taxed every single component while the product still had no users.",
      "Cut the admin panel. It was built because it was interesting, and it served one administrator — me. That effort belonged in capture reliability.",
    ],
    he: [
      "לבנות קודם את מערך ההערכה לחילוץ. קיבלתי החלטות ניתוב בין שלושת השלבים על סמך שיקול דעת, בזמן שקורפוס מתויג של כמה מאות דפים היה הופך אותן למדידות.",
      "להתחיל בשפה אחת ולהוסיף עברית בנקודת בדיקה מוגדרת. תכנון דו־כיווני מהיום הראשון היה נכון ארכיטקטונית, אבל הוא הטיל מס על כל רכיב ורכיב בזמן שלמוצר עדיין לא היו משתמשים.",
      "לוותר על פאנל הניהול. הוא נבנה כי הוא היה מעניין, והוא שירת מנהל אחד — אותי. המאמץ הזה היה שייך לאמינות הקליטה.",
    ],
  },
};
