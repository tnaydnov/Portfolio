import type { Project } from "@/lib/types";

export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner: {
    en: "A streaming parking-enforcement prototype: motion detection, plate detection, OCR and alerting.",
    he: "אב־טיפוס זורם לאכיפת חניה: זיהוי תנועה, זיהוי לוחית, OCR והתראות.",
  },
  hook: {
    en: "In a streaming vision pipeline, scheduling becomes as important as model choice.",
    he: "בצינור ראייה זורם, התזמון חשוב כמו בחירת המודל.",
  },
  tier: "system",
  stages: ["frame", "build", "prove"],
  domain: ["applied-ai", "platform"],
  role: {
    en: "Motion detection · Operator UI · Service architecture",
    he: "זיהוי תנועה · ממשק מפעיל · ארכיטקטורת שירותים",
  },
  team: {
    en: "BGU team project · credited to the original project team",
    he: "פרויקט צוות ב־BGU · קרדיט לצוות הפרויקט המקורי",
  },
  started: "2024-11",
  ended: "2025-07",
  status: "archived",
  metrics: [
    {
      label: { en: "Stages", he: "שלבים" },
      value: { en: "4", he: "4" },
      note: {
        en: "Motion → detect → OCR → alert",
        he: "תנועה ← זיהוי ← OCR ← התראה",
      },
    },
    {
      label: { en: "Mode", he: "מצב" },
      value: { en: "Streaming", he: "זרימה" },
      note: {
        en: "Continuous-video design · no published latency benchmark",
        he: "תכנון לווידאו רציף · ללא מדד השהיה שפורסם",
      },
    },
    {
      label: { en: "Deploy", he: "פריסה" },
      value: { en: "Compose", he: "Compose" },
      note: { en: "Containerised services", he: "שירותים בקונטיינרים" },
    },
  ],
  stack: ["Python", "YOLOv11", "PaddleOCR", "FastAPI", "Redis", "Docker", "PyQt5"],
  links: { repo: "https://github.com/tnaydnov/License_Plate_Recognition" },
  proof: [
    {
      label: { en: "Demo record", he: "תיעוד הדגמה" },
      value: {
        en: "Recorded end-to-end detection run",
        he: "הקלטת ריצה מלאה של תהליך הזיהוי",
      },
      access: "public",
    },
    {
      label: { en: "Team record", he: "תיעוד צוות" },
      value: {
        en: "Original BGU project history and contributor record",
        he: "היסטוריית הפרויקט המקורי ב־BGU ותיעוד התורמים",
      },
      href: "https://github.com/BGU-LPR-Project/lpr_final_project",
      access: "public",
    },
  ],
  media: {
    poster: "/images/lpr-preview.png",
    video: "/videos/lpr-demo-web.mp4",
    alt: {
      en: "License plate recognition operator interface showing a detected plate",
      he: "ממשק המפעיל של מערכת זיהוי הלוחיות מציג לוחית שזוהתה",
    },
    caption: {
      en: "DEMO RECORD / End-to-end detection run",
      he: "תיעוד הדגמה / ריצת זיהוי מקצה לקצה",
    },
    kind: "demo",
  },
  sections: [
    {
      stage: "frame",
      heading: {
        en: "The constraint is the frame budget",
        he: "האילוץ הוא תקציב הפריימים",
      },
      body: {
        en: [
          "Choosing detection and OCR components is only part of the problem. The engineering question is whether the whole chain keeps up with a camera that does not slow down for you.",
          "That reframes the problem. Every stage in the pipeline is a consumer with a fixed time budget, and the design work is deciding what to drop rather than what to compute.",
        ],
        he: [
          "בחירת רכיבי הזיהוי וה־OCR היא רק חלק מהבעיה. השאלה ההנדסית היא האם כל השרשרת עומדת בקצב של מצלמה שלא מאטה בשבילך.",
          "זה ממסגר מחדש את הבעיה. כל שלב בצינור הוא צרכן עם תקציב זמן קבוע, ועבודת התכנון היא להחליט ממה לוותר ולא מה לחשב.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "Cheap gates before expensive ones",
        he: "שערים זולים לפני יקרים",
      },
      body: {
        en: [
          "The pipeline was ordered by expected cost. Motion detection was treated as a cheap early gate intended to skip unchanged frames. Only surviving frames reach plate detection, and OCR was treated as the expensive final stage, so only detections reach it.",
          "Redis decouples video ingestion from edge processing, while a bounded 30-frame worker queue prevents unbounded memory growth and deliberately drops frames under saturation. OCR remains a synchronous service call, so capture under load is the metric that still needs measurement.",
          "The prototype assumes a dedicated operator workstation, so its interface is a desktop client rather than a web app and its alerts do not depend on a browser tab remaining open.",
        ],
        he: [
          "הצינור סודר לפי העלות הצפויה. זיהוי תנועה טופל כשער מוקדם וזול שנועד לדלג על פריימים שלא השתנו. רק פריימים ששרדו מגיעים לזיהוי לוחית, וה־OCR טופל כשלב הסופי והיקר, כך שרק זיהויים מגיעים אליו.",
          "Redis מנתק את קליטת הווידאו מעיבוד הקצה, בעוד תור עובדים תחום ל־30 פריימים מונע צמיחת זיכרון בלתי מוגבלת ומשמיט פריימים במכוון תחת עומס. OCR נשאר קריאת שירות סינכרונית, ולכן לכידה תחת עומס היא המדד שעדיין צריך למדוד.",
          "אב־הטיפוס מניח עמדת מפעיל ייעודית, ולכן הממשק הוא לקוח דסקטופ ולא אפליקציית ווב, וההתראות אינן תלויות בכך שטאב בדפדפן יישאר פתוח.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "The missing metric is end-to-end capture",
        he: "המדד החסר הוא לכידה מקצה לקצה",
      },
      body: {
        en: [
          "The public repository and demo show the pipeline architecture and a working detection flow; they do not publish an end-to-end latency or capture-rate benchmark. The next useful test is the share of vehicles entering frame that produce a correct plate within an operational time budget.",
        ],
        he: [
          "המאגר הציבורי וההדגמה מציגים את ארכיטקטורת הצינור ותהליך זיהוי עובד; הם אינם מפרסמים מדד השהיה או שיעור לכידה מקצה לקצה. הבדיקה השימושית הבאה היא שיעור כלי הרכב שנכנסים לפריים ומפיקים לוחית נכונה בתוך תקציב זמן תפעולי.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title: {
        en: "Separate services with bounded buffering.",
        he: "שירותים נפרדים עם חציצה תחומה.",
      },
      why: {
        en: "The stages have different costs and rates. Redis separates ingestion from edge work, and the bounded worker queue makes the overload behavior explicit rather than allowing memory to grow without limit.",
        he: "לשלבים יש עלויות וקצבים שונים. Redis מפריד בין הקליטה לעבודת הקצה, ותור העובדים התחום הופך את התנהגות העומס למפורשת במקום לאפשר לזיכרון לצמוח ללא גבול.",
      },
      tradeoff: {
        en: "Operational complexity, serialisation overhead between stages, and a much harder debugging story than a single script.",
        he: "מורכבות תפעולית, תקורת סריאליזציה בין השלבים, וסיפור דיבוג קשה בהרבה מסקריפט יחיד.",
      },
      revisit: {
        en: "If deployed to a single edge device where the network hop costs more than the decoupling is worth.",
        he: "אם נפרס למכשיר קצה יחיד שבו קפיצת הרשת עולה יותר משהניתוק שווה.",
      },
    },
    {
      id: "D-02",
      date: "2025",
      title: {
        en: "Motion gate before detection.",
        he: "שער תנועה לפני זיהוי.",
      },
      why: {
        en: "A fixed parking camera shows an empty scene most of the time. Running detection on every frame spends the entire compute budget confirming nothing happened.",
        he: "מצלמת חניה קבועה מראה סצנה ריקה רוב הזמן. הרצת זיהוי על כל פריים מוציאה את כל תקציב החישוב על אישור שכלום לא קרה.",
      },
      tradeoff: {
        en: "A slow-moving or partially occluded vehicle can be missed at the gate, and that failure is invisible downstream — nothing logs a frame that was never considered.",
        he: "רכב שנע לאט או מוסתר חלקית עלול להתפספס בשער, והכשל הזה בלתי נראה בהמשך — שום דבר לא מתעד פריים שמעולם לא נשקל.",
      },
      revisit: {
        en: "If false negatives at the gate turn out to be a real source of missed vehicles rather than a theoretical one.",
        he: "אם שליליים־שגויים בשער יתבררו כמקור אמיתי לרכבים שהוחמצו ולא כתיאורטי.",
      },
    },
  ],
  rebuild: {
    en: [
      "Instrument the motion gate's rejections. It is the one stage whose failures leave no trace, which makes it the least trustworthy part of the system.",
      "Measure end-to-end capture rate from the beginning instead of component accuracy. It is the only number that describes whether the system works.",
    ],
    he: [
      "למדוד את הדחיות של שער התנועה. זה השלב היחיד שהכשלים שלו לא משאירים עקבות, מה שהופך אותו לחלק הכי פחות אמין במערכת.",
      "למדוד שיעור לכידה מקצה לקצה מההתחלה במקום דיוק רכיבים. זה המספר היחיד שמתאר אם המערכת עובדת.",
    ],
  },
};

export const tradingSystem: Project = {
  slug: "trading-system",
  title: "Trading System",
  oneLiner: {
    en: "A multi-store e-commerce platform: store management, roles and permissions, carts, purchases and supplier integration.",
    he: "פלטפורמת מסחר רב־חנויות: ניהול חנויות, תפקידים והרשאות, עגלות, רכישות ואינטגרציית ספקים.",
  },
  hook: {
    en: "A university team project where the hard part was the specification, not the code.",
    he: "פרויקט צוות אוניברסיטאי שבו החלק הקשה היה האפיון, לא הקוד.",
  },
  tier: "system",
  stages: ["frame", "plan", "build"],
  domain: ["platform"],
  role: { en: "Contributor on a university team", he: "תורם בצוות אוניברסיטאי" },
  team: { en: "University team project", he: "פרויקט צוות אוניברסיטאי" },
  started: "2024-05",
  ended: "2024-07",
  status: "archived",
  metrics: [
    {
      label: { en: "Scope", he: "היקף" },
      value: { en: "Multi-store", he: "רב־חנויות" },
      note: { en: "Roles, carts, suppliers", he: "תפקידים, עגלות, ספקים" },
    },
    {
      label: { en: "Mode", he: "מצב" },
      value: { en: "Team", he: "צוות" },
      note: { en: "Not solo work", he: "לא עבודה עצמאית" },
    },
  ],
  stack: ["Java", "JavaScript", "REST", "Layered architecture"],
  links: { repo: "https://github.com/tnaydnov/Trading_System" },
  media: {
    poster: "/images/trading-preview.png",
    video: "/videos/trading-demo-web.mp4",
    alt: {
      en: "Trading system storefront and management interface",
      he: "חזית החנות וממשק הניהול של מערכת המסחר",
    },
    caption: {
      en: "DEMO RECORD / Storefront and management flow",
      he: "תיעוד הדגמה / תהליך חנות וניהול",
    },
    kind: "demo",
  },
  sections: [
    {
      stage: "frame",
      heading: {
        en: "Requirements as the actual deliverable",
        he: "הדרישות כתוצר האמיתי",
      },
      body: {
        en: [
          "This was a team build against a long formal specification, and the lesson it taught was not about e-commerce. Ambiguity in a requirement does not stay small: each contributor can resolve it differently, and the divergence surfaces at integration.",
          "It is listed here as a team project because it was one. I owned parts of it, not all of it, and claiming otherwise would undermine everything else on this site.",
        ],
        he: [
          "זו הייתה בניית צוות מול אפיון פורמלי ארוך, והלקח שהיא לימדה לא היה על מסחר אלקטרוני. עמימות בדרישה לא נשארת קטנה: כל תורם יכול לפתור אותה אחרת, והפער צף באינטגרציה.",
          "זה מופיע כאן כפרויקט צוות כי זה מה שהוא היה. הייתי אחראי על חלקים ממנו, לא על כולו, וטענה אחרת הייתה מערערת כל דבר אחר באתר הזה.",
        ],
      },
    },
    {
      stage: "plan",
      heading: {
        en: "Permissions are the real domain model",
        he: "ההרשאות הן מודל הדומיין האמיתי",
      },
      body: {
        en: [
          "The genuinely difficult part of a multi-store system is not transactions, it is authority: who may appoint whom, what a store owner can delegate, what happens to permissions granted by someone who is later removed.",
          "Getting that model wrong early is expensive because it is load-bearing for every feature above it.",
        ],
        he: [
          "החלק הקשה באמת במערכת רב־חנויות הוא לא עסקאות, אלא סמכות: מי רשאי למנות את מי, מה בעל חנות יכול להאציל, ומה קורה להרשאות שניתנו על ידי מישהו שהוסר אחר כך.",
          "טעות במודל הזה מוקדם יקרה, כי הוא נושא את כל הפיצ׳רים שמעליו.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "Layers that hold under a team",
        he: "שכבות שמחזיקות תחת צוות",
      },
      body: {
        en: [
          "Strict separation between the service layer and the domain was what made parallel work possible at all. The lesson transferred directly into how I structured Applytide's backend later.",
        ],
        he: [
          "הפרדה קפדנית בין שכבת השירות לדומיין היא מה שאפשר עבודה מקבילית בכלל. הלקח עבר ישירות לאופן שבו בניתי את השרת של Applytide מאוחר יותר.",
        ],
      },
    },
  ],
  rebuild: {
    en: [
      "Resolve specification ambiguity in writing before implementation starts. Every integration problem on this project traces back to a sentence two people read differently.",
      "Build the permission model first and test it hardest. It was underneath everything else and got the least dedicated attention.",
    ],
    he: [
      "לפתור עמימות באפיון בכתב לפני שהמימוש מתחיל. כל בעיית אינטגרציה בפרויקט הזה מתחקה חזרה למשפט ששני אנשים קראו אחרת.",
      "לבנות את מודל ההרשאות ראשון ולבדוק אותו הכי חזק. הוא היה מתחת לכל השאר וקיבל את תשומת הלב הייעודית הפחותה ביותר.",
    ],
  },
};
