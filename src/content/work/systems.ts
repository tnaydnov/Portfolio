import type { Project } from "@/lib/types";

export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner: {
    en: "A real-time parking-enforcement pipeline: motion detection, plate detection, OCR, alerting.",
    he: "צינור אכיפת חניה בזמן אמת: זיהוי תנועה, זיהוי לוחית, OCR והתראות.",
  },
  hook: {
    en: "Real-time computer vision is mostly a scheduling problem wearing a machine-learning costume.",
    he: "ראייה ממוחשבת בזמן אמת היא בעיקר בעיית תזמון שלובשת תחפושת של למידת מכונה.",
  },
  tier: "system",
  stages: ["frame", "build", "prove"],
  domain: ["applied-ai", "platform"],
  role: { en: "Architecture · Build", he: "ארכיטקטורה · בנייה" },
  started: "2025-01",
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
      value: { en: "Real-time", he: "זמן אמת" },
      note: { en: "Continuous video", he: "וידאו רציף" },
    },
    {
      label: { en: "Deploy", he: "פריסה" },
      value: { en: "Compose", he: "Compose" },
      note: { en: "Containerised services", he: "שירותים בקונטיינרים" },
    },
  ],
  stack: ["Python", "YOLOv11", "PaddleOCR", "FastAPI", "Redis", "Docker", "PyQt5"],
  links: { repo: "https://github.com/tnaydnov/License_Plate_Recognition" },
  media: {
    poster: "/images/lpr-preview.png",
    video: "/videos/lpr-demo.mp4",
    alt: {
      en: "License plate recognition operator interface showing a detected plate",
      he: "ממשק המפעיל של מערכת זיהוי הלוחיות מציג לוחית שזוהתה",
    },
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
          "The accuracy question — can a model read a plate — is largely solved by choosing good components. The engineering question is whether the whole chain keeps up with a camera that does not slow down for you.",
          "That reframes the problem. Every stage in the pipeline is a consumer with a fixed time budget, and the design work is deciding what to drop rather than what to compute.",
        ],
        he: [
          "שאלת הדיוק — האם מודל יכול לקרוא לוחית — נפתרת ברובה בבחירת רכיבים טובים. השאלה ההנדסית היא האם כל השרשרת עומדת בקצב של מצלמה שלא מאטה בשבילך.",
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
          "The pipeline is ordered by cost. Motion detection is nearly free and rejects the overwhelming majority of frames, because a parking camera mostly watches nothing happen. Only surviving frames reach plate detection, and only detections reach OCR, which is the most expensive stage and therefore the last.",
          "Splitting the stages into separate services with a queue between them was the decision that made it work. It decouples the stages' rates, so a slow OCR pass creates backpressure instead of dropping the frame that mattered, and it lets each stage be tuned or replaced without disturbing the others.",
          "The operator interface is a desktop client rather than a web app, because the people using it sit in front of one screen in one room and need alerts that survive a browser tab being closed.",
        ],
        he: [
          "הצינור מסודר לפי עלות. זיהוי תנועה כמעט חינמי ודוחה את הרוב המוחלט של הפריימים, כי מצלמת חניה בעיקר מסתכלת על כלום שקורה. רק פריימים ששרדו מגיעים לזיהוי לוחית, ורק זיהויים מגיעים ל־OCR, שהוא השלב היקר ביותר ולכן האחרון.",
          "פיצול השלבים לשירותים נפרדים עם תור ביניהם הייתה ההחלטה שגרמה לזה לעבוד. זה מנתק את הקצבים של השלבים, כך שמעבר OCR איטי יוצר לחץ אחורי במקום להפיל את הפריים שהיה חשוב, וזה מאפשר לכוונן או להחליף כל שלב בלי להפריע לאחרים.",
          "ממשק המפעיל הוא לקוח דסקטופ ולא אפליקציית ווב, כי האנשים שמשתמשים בו יושבים מול מסך אחד בחדר אחד וצריכים התראות ששורדות סגירת טאב.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "Measured on the pipeline, not the model",
        he: "נמדד על הצינור, לא על המודל",
      },
      body: {
        en: [
          "Model accuracy in isolation is the wrong measure. What matters is end-to-end: of the vehicles that actually entered the frame, how many produced a correct plate in time to be useful.",
          "That number is always worse than the model's benchmark, and the gap is where the real engineering is.",
        ],
        he: [
          "דיוק המודל בפני עצמו הוא המדד הלא נכון. מה שחשוב הוא מקצה לקצה: מתוך כלי הרכב שבאמת נכנסו לפריים, כמה הפיקו לוחית נכונה בזמן שהיה בו שימוש.",
          "המספר הזה תמיד גרוע יותר מהמדד של המודל, והפער הוא המקום שבו נמצאת ההנדסה האמיתית.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title: {
        en: "Separate services with a queue, not a single process.",
        he: "שירותים נפרדים עם תור, לא תהליך יחיד.",
      },
      why: {
        en: "The stages have very different costs and rates. Coupling them in one process means the slowest stage sets the frame rate for everything and there is no way to absorb a burst.",
        he: "לשלבים יש עלויות וקצבים שונים מאוד. צימוד שלהם בתהליך אחד אומר שהשלב האיטי ביותר קובע את קצב הפריימים לכולם ואין דרך לספוג פרץ.",
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
    en: "A large team project where the hard part was the specification, not the code.",
    he: "פרויקט צוות גדול שבו החלק הקשה היה האפיון, לא הקוד.",
  },
  tier: "system",
  stages: ["frame", "plan", "build"],
  domain: ["platform"],
  role: { en: "Contributor on a large team", he: "תורם בצוות גדול" },
  team: { en: "University team project", he: "פרויקט צוות אוניברסיטאי" },
  started: "2024-01",
  ended: "2025-08",
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
    video: "/videos/trading-demo.mp4",
    alt: {
      en: "Trading system storefront and management interface",
      he: "חזית החנות וממשק הניהול של מערכת המסחר",
    },
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
          "This was a large team build against a long formal specification, and the lesson it taught was not about e-commerce. It was that on a team of that size, ambiguity in a requirement does not stay a small problem — every developer resolves it differently and the divergence surfaces at integration, which is the most expensive possible moment to find it.",
          "It is listed here as a team project because it was one. I owned parts of it, not all of it, and claiming otherwise would undermine everything else on this site.",
        ],
        he: [
          "זו הייתה בנייה של צוות גדול מול אפיון פורמלי ארוך, והלקח שהיא לימדה לא היה על מסחר אלקטרוני. הוא היה שבצוות בגודל כזה, עמימות בדרישה לא נשארת בעיה קטנה — כל מפתח פותר אותה אחרת והפער צף באינטגרציה, שהיא הרגע היקר ביותר האפשרי לגלות אותו.",
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
          "Strict separation between the service layer and the domain was what made parallel work possible at all. It is a lesson that transferred directly into how I structured Applytide's backend years later.",
        ],
        he: [
          "הפרדה קפדנית בין שכבת השירות לדומיין היא מה שאפשר עבודה מקבילית בכלל. זה לקח שעבר ישירות לאופן שבו בניתי את השרת של Applytide שנים אחר כך.",
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
