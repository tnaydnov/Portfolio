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
  team: { en: "Two contributors", he: "שני תורמים" },
  started: "2025-01",
  ended: "2026-04",
  status: "archived",
  metrics: [
    {
      label: { en: "Services", he: "שירותים" },
      value: { en: "6", he: "6" },
      note: { en: "Compose topology", he: "טופולוגיית Compose" },
    },
    {
      label: { en: "Data models", he: "מודלי נתונים" },
      value: { en: "20", he: "20" },
      note: { en: "PostgreSQL, UUID keys", he: "PostgreSQL, מפתחות UUID" },
    },
    {
      label: { en: "API routers", he: "ראוטרים ב־API" },
      value: { en: "14", he: "14" },
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
  sections: [
    {
      stage: "signal",
      heading: { en: "The tracking is the job", he: "המעקב הוא העבודה" },
      body: {
        en: [
          "Anyone running a serious job search is operating a pipeline: sourcing, qualification, application, follow-up, interview, decision. It has stages, conversion rates, and a cycle time. It is a process, and people run it in a spreadsheet or in their head.",
          "The friction is not finding jobs. It is the accounting around them — which version of the CV went where, what you said in the cover letter, when you promised to follow up, and which of forty applications is actually still alive. That work is boring, high-frequency, and exactly what software is for.",
          "What I got wrong initially: I assumed the painful step was writing applications. It was not. The painful step was capture — getting a posting out of a browser tab and into a structured record before the tab closed. Everything downstream depends on that one moment being frictionless.",
        ],
        he: [
          "כל מי שמנהל חיפוש עבודה רציני מפעיל צינור: איתור, סינון, הגשה, מעקב, ראיון, החלטה. יש לו שלבים, שיעורי המרה, וזמן מחזור. זה תהליך, ואנשים מריצים אותו בגיליון אלקטרוני או בראש.",
          "החיכוך הוא לא במציאת משרות. הוא בהנהלת החשבונות סביבן — איזו גרסה של קורות החיים הלכה לאן, מה כתבת במכתב המקדים, מתי הבטחת לחזור, ואיזו מתוך ארבעים הגשות עדיין חיה. העבודה הזו משעממת, בתדירות גבוהה, ובדיוק בשביל זה יש תוכנה.",
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
          "So security and cost control were not features to add later — they were framing constraints. That is why the build contains things a side project usually skips: HttpOnly cookie sessions rather than tokens in localStorage, TOTP two-factor, revocable session tracking, per-endpoint rate limits, and a hard daily spending cap on AI calls enforced in Redis.",
          "Explicitly out of scope: automated applying. It was the most-requested idea and I refused it. Mass-applying is a strategy that fails candidates and annoys employers, and building it would have made the product worse at the thing it was for.",
        ],
        he: [
          "שני אילוצים אמיתיים עיצבו כמעט כל החלטה. הראשון היה עלות: לכל פיצ׳ר שקורא למודל שפה מוצמד חשבון בלתי חסום, ופרויקט אישי לא יכול לספוג את זה. השני היה אמון: המערכת הזו מחזיקה את קורות החיים של המשתמש, את היסטוריית ההעסקה שלו, ורשימה של כל חברה שהוא מדבר איתה בשקט. זה מאגר קטן עם רדיוס נזק גבוה מאוד.",
          "לכן אבטחה ובקרת עלויות לא היו פיצ׳רים להוסיף אחר כך — הן היו אילוצי מסגור. בגלל זה הבנייה כוללת דברים שפרויקט צד בדרך כלל מדלג עליהם: סשנים בעוגיות HttpOnly במקום טוקנים ב־localStorage, אימות דו־שלבי מבוסס TOTP, מעקב סשנים ניתן לביטול, הגבלות קצב לכל נקודת קצה, ותקרת הוצאה יומית קשיחה לקריאות בינה מלאכותית שנאכפת ב־Redis.",
          "מחוץ להיקף במפורש: הגשה אוטומטית. זה היה הרעיון המבוקש ביותר וסירבתי לו. הגשה המונית היא אסטרטגיה שמכשילה מועמדים ומעצבנת מעסיקים, ובנייה שלה הייתה הופכת את המוצר לגרוע יותר בדבר שלשמו הוא נועד.",
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
          "The architecture was planned as separate services from the start where the boundaries were genuinely different: HTML email rendering is a Node concern, background scheduling is not an API concern, and the reverse proxy is where rate limiting belongs.",
        ],
        he: [
          "מכיוון שהקליטה הייתה השלב הנושא, תוסף הדפדפן נבנה מוקדם ולא כתוספת. להכניס משרה למערכת בלחיצה אחת זה ההבדל בין כלי שמישהו משתמש בו לכלי שמישהו מתכוון להשתמש בו.",
          "השאר תוזמן לאורך הצינור עצמו: קליטה, אחר כך שלבי הקנבן שממדלים את התהליך, אחר כך מסמכים, ואז שכבות התזכורות והאנליטיקה שהופכות משמעותיות רק כשיש היסטוריה להסיק ממנה. אנליטיקה אחרונה זו בחירה מכוונת — דשבורד מעל שלוש רשומות הוא קישוט.",
          "הארכיטקטורה תוכננה כשירותים נפרדים מלכתחילה במקומות שבהם הגבולות היו באמת שונים: רינדור מייל HTML הוא עניין של Node, תזמון רקע הוא לא עניין של ה־API, והפרוקסי ההפוך הוא המקום שאליו שייכת הגבלת הקצב.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "Six containers, and a defence for each",
        he: "שישה קונטיינרים, והגנה לכל אחד",
      },
      body: {
        en: [
          "The system runs as a Docker Compose topology: Nginx terminating and rate-limiting, a React SPA, a FastAPI backend, a Node email microservice, PostgreSQL, Redis, and a scheduler process for background work.",
          "The backend is layered rather than flat — an API layer of 14 routers with Pydantic schemas at the boundary, a domain layer holding business logic, a persistence layer of 20 SQLAlchemy models under Alembic migrations, and an infrastructure layer for email, LLM access, security and workers. The point of that separation is that the LLM integration is infrastructure, not business logic; it can be swapped or disabled without touching the domain.",
          "The hardest problem was extraction: turning an arbitrary job page into structured fields. The naive answer is to send the page to a model. That answer is wrong for reasons covered in the decision log below.",
          "The second hardest was internationalisation. Full Hebrew support means real RTL — not a mirrored stylesheet, but a layout that is correct in both directions, including inputs, charts, and drag-and-drop. Retrofitting that is expensive, which is why it was designed in rather than bolted on.",
        ],
        he: [
          "המערכת רצה כטופולוגיית Docker Compose: Nginx שמסיים חיבורים ומגביל קצב, SPA ב־React, שרת FastAPI, מיקרו־שירות מיילים ב־Node, PostgreSQL, Redis, ותהליך מתזמן לעבודות רקע.",
          "השרת בנוי בשכבות ולא שטוח — שכבת API של 14 ראוטרים עם סכמות Pydantic בגבול, שכבת דומיין שמחזיקה את הלוגיקה העסקית, שכבת התמדה של 20 מודלי SQLAlchemy תחת מיגרציות Alembic, ושכבת תשתית למיילים, גישה למודל שפה, אבטחה ועובדי רקע. הנקודה בהפרדה הזו היא שאינטגרציית מודל השפה היא תשתית, לא לוגיקה עסקית; אפשר להחליף אותה או לכבות אותה בלי לגעת בדומיין.",
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
          "Some of this was conventional: Pydantic schemas validating every endpoint boundary, parameterised queries throughout, a health endpoint checking both Postgres and Redis.",
          "The parts I care more about are the ones that catch failures a test suite would not. LLM usage is logged per call with token counts and cost attributed to a user, against a configurable daily budget. That is not observability theatre — it is the mechanism that makes an AI feature safe to leave running unattended.",
          "Session management is testable in the same spirit: a user can list their active sessions and revoke them. The question that validates it is not “does the endpoint return 200”, it is “can a user who lost a laptop actually recover”.",
        ],
        he: [
          "חלק מזה היה שגרתי: סכמות Pydantic שמאמתות כל גבול של נקודת קצה, שאילתות פרמטריות לכל אורך הדרך, נקודת קצה לבדיקת תקינות שבודקת גם את Postgres וגם את Redis.",
          "החלקים שחשובים לי יותר הם אלה שתופסים כשלים שחבילת טסטים לא הייתה תופסת. שימוש במודל שפה נרשם לכל קריאה עם ספירת טוקנים ועלות המשויכת למשתמש, מול תקציב יומי הניתן להגדרה. זה לא תיאטרון תצפיתיות — זה המנגנון שהופך פיצ׳ר בינה מלאכותית לבטוח להשארה ללא השגחה.",
          "ניהול סשנים ניתן לבדיקה באותה רוח: משתמש יכול לראות את הסשנים הפעילים שלו ולבטל אותם. השאלה שמאמתת את זה היא לא ״האם נקודת הקצה מחזירה 200״, אלא ״האם משתמש שאיבד מחשב נייד באמת יכול להתאושש״.",
        ],
      },
    },
    {
      stage: "field",
      heading: { en: "Archived on purpose", he: "בארכיון בכוונה" },
      body: {
        en: [
          "Applytide is archived, and I would rather say why than quietly leave it looking active.",
          "It reached the point where it did what it was designed to do, and the remaining work was operational — running infrastructure, absorbing AI costs for other people, and maintaining a security surface that deserves real attention rather than spare evenings. Continuing would have meant committing to operate a product, which is a different decision from building one.",
          "What it produced instead is the clearest evidence I have of end-to-end system ownership: a real architecture, real security posture, real cost controls, and a documented set of decisions I can still defend.",
        ],
        he: [
          "Applytide נמצא בארכיון, ואני מעדיף להגיד למה מאשר להשאיר אותו בשקט נראה פעיל.",
          "הוא הגיע לנקודה שבה עשה את מה שנועד לעשות, והעבודה שנותרה הייתה תפעולית — להריץ תשתית, לספוג עלויות בינה מלאכותית עבור אנשים אחרים, ולתחזק משטח אבטחה שראוי לתשומת לב אמיתית ולא לערבים פנויים. להמשיך היה אומר להתחייב לתפעל מוצר, וזו החלטה אחרת מלבנות אחד.",
          "מה שהוא ייצר במקום זה הראיה הברורה ביותר שיש לי לבעלות על מערכת מקצה לקצה: ארכיטקטורה אמיתית, עמדת אבטחה אמיתית, בקרות עלות אמיתיות, ואוסף מתועד של החלטות שאני עדיין יכול להגן עליהן.",
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
        sub: "Reverse proxy · TLS · rate limit",
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
          en: "48 shadcn/ui components over Radix primitives, with full RTL. Kept as an SPA rather than SSR because the app is entirely behind auth — there is nothing to serve to a crawler.",
          he: "‏48 רכיבי shadcn/ui מעל פרימיטיבים של Radix, עם RTL מלא. נשאר SPA ולא SSR כי האפליקציה כולה מאחורי הזדהות — אין מה להגיש לזחלן.",
        },
      },
      {
        id: "api",
        label: "FastAPI",
        sub: "14 routers · domain layer",
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
        sub: "20 models · Alembic",
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
          en: "Also the enforcement point for the daily LLM spending cap. That single use justifies it independently of caching.",
          he: "גם נקודת האכיפה לתקרת ההוצאה היומית על מודל השפה. השימוש הבודד הזה מצדיק אותו בנפרד מהמטמון.",
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
        en: "A large share of job boards already publish valid JobPosting structured data, which is free, instant and exact. Sending those pages to a model would mean paying per job for a worse answer, and models hallucinate confidently on fields like salary where being wrong is costly.",
        he: "חלק גדול מלוחות המשרות כבר מפרסמים נתונים מובנים תקינים של JobPosting, שהם חינמיים, מיידיים ומדויקים. לשלוח את הדפים האלה למודל פירושו לשלם לכל משרה על תשובה גרועה יותר, ומודלים ממציאים בביטחון בשדות כמו שכר, שבהם טעות עולה ביוקר.",
      },
      tradeoff: {
        en: "Three code paths and three distinct failure modes to maintain instead of one, in exchange for lower cost and higher precision on the majority path.",
        he: "שלושה מסלולי קוד ושלושה מצבי כשל נפרדים לתחזוקה במקום אחד, בתמורה לעלות נמוכה יותר ודיוק גבוה יותר במסלול הרוב.",
      },
      revisit: {
        en: "If model cost per extraction falls far enough that the accounting stops mattering, or if structured-data coverage across boards collapses.",
        he: "אם עלות המודל לחילוץ תרד מספיק כדי שהחשבון יפסיק להיות משמעותי, או אם כיסוי הנתונים המובנים בלוחות יקרוס.",
      },
    },
    {
      id: "D-02",
      date: "2025",
      title: {
        en: "Hard daily LLM budget enforced in Redis, with per-user attribution.",
        he: "תקציב יומי קשיח למודל שפה שנאכף ב־Redis, עם ייחוס לכל משתמש.",
      },
      why: {
        en: "Any AI feature exposed to users is an uncapped liability. Logging token usage after the fact tells you what went wrong; a budget stops it.",
        he: "כל פיצ׳ר בינה מלאכותית שחשוף למשתמשים הוא התחייבות ללא תקרה. רישום צריכת טוקנים בדיעבד מספר לך מה השתבש; תקציב עוצר את זה.",
      },
      tradeoff: {
        en: "Users can hit a ceiling and see a degraded experience on a bad day, which is a worse product moment than silently paying. I preferred a bounded bill.",
        he: "משתמשים יכולים להיתקל בתקרה ולחוות חוויה מדורדרת ביום גרוע, וזה רגע מוצרי גרוע יותר מלשלם בשקט. העדפתי חשבון חסום.",
      },
      revisit: {
        en: "If usage patterns become predictable enough to move from a hard cap to per-user quotas.",
        he: "אם דפוסי השימוש יהפכו צפויים מספיק כדי לעבור מתקרה קשיחה למכסות לכל משתמש.",
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
      date: "2025",
      title: {
        en: "Refused automated mass-applying, the most requested feature.",
        he: "סירבתי להגשה המונית אוטומטית, הפיצ׳ר המבוקש ביותר.",
      },
      why: {
        en: "It optimises the metric the product displays while making the user's actual outcome worse, and it degrades the ecosystem it operates in. A tool for running a search well should not ship a feature that runs it badly at scale.",
        he: "זה ממטב את המדד שהמוצר מציג בזמן שהוא מחמיר את התוצאה האמיתית של המשתמש, והוא פוגע במערכת שבה הוא פועל. כלי להרצת חיפוש טוב לא צריך לשלוח פיצ׳ר שמריץ אותו רע בקנה מידה.",
      },
      tradeoff: {
        en: "Gave up the single most obviously marketable capability and the growth story attached to it.",
        he: "ויתרתי על היכולת הכי מובנת מאליה מבחינה שיווקית ועל סיפור הצמיחה שמוצמד אליה.",
      },
      revisit: { en: "No.", he: "לא." },
    },
    {
      id: "D-05",
      date: "2026-04",
      title: {
        en: "Archive rather than operate.",
        he: "לארכב במקום לתפעל.",
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
          en: "LLM-only. One code path, ships in an afternoon, and you accept both the per-job cost and the hallucinated fields. Correct choice for a prototype whose purpose is to test whether anyone wants capture at all.",
          he: "מודל שפה בלבד. מסלול קוד אחד, נשלח בצוהריים אחד, ואתה מקבל גם את העלות לכל משרה וגם את השדות המומצאים. הבחירה הנכונה לאב טיפוס שמטרתו לבדוק אם מישהו בכלל רוצה קליטה.",
        },
      },
      {
        time: 0,
        scope: 1,
        outcome: {
          en: "JSON-LD with an LLM fallback. Two paths. Captures most of the cost saving for a fraction of the work — the pragmatic version if the deadline is real.",
          he: "‏JSON-LD עם נפילה למודל שפה. שני מסלולים. תופס את רוב החיסכון בעלות בשבריר מהעבודה — הגרסה הפרגמטית אם הדדליין אמיתי.",
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
          en: "The three-stage cascade — JSON-LD, then DOM parsing, then LLM fallback. What I actually built. Free and exact on the majority path, degrading gracefully to paid-and-fuzzy only when it has to.",
          he: "המפל התלת־שלבי — JSON-LD, אחר כך ניתוח DOM, אחר כך נפילה למודל שפה. מה שבאמת בניתי. חינמי ומדויק במסלול הרוב, מתדרדר בחן למשולם־ומעורפל רק כשהוא חייב.",
        },
      },
      {
        time: 1,
        scope: 2,
        outcome: {
          en: "Cascade plus per-board adapters for the top sites. Better accuracy, but each adapter is a maintenance liability that breaks silently when a site redesigns.",
          he: "מפל בתוספת מתאמים ייעודיים לאתרים המובילים. דיוק טוב יותר, אבל כל מתאם הוא התחייבות תחזוקה שנשברת בשקט כשאתר מתעצב מחדש.",
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
          en: "Cascade, evaluation harness, and a fine-tuned small model for the fallback tier. Best accuracy per unit cost, and only justifiable at real volume.",
          he: "מפל, מערך הערכה, ומודל קטן מכוונן לשכבת הנפילה. הדיוק הטוב ביותר ליחידת עלות, ומוצדק רק בנפח אמיתי.",
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
