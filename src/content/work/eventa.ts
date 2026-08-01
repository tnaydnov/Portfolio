import type { Project } from "@/lib/types";

export const eventa: Project = {
  slug: "eventa",
  title: "Eventa",
  oneLiner: {
    en: "A mobile-first web platform for social connection at weddings — QR onboarding, guest profiles, matching and private messaging.",
    he: "פלטפורמת ווב מובייל־תחילה לחיבור חברתי בחתונות — כניסה בקוד QR, פרופילי אורחים, התאמה והודעות פרטיות.",
  },
  hook: {
    en: "A wedding puts a hundred and fifty strangers in one room and gives them no way to meet each other.",
    he: "חתונה מכניסה מאה וחמישים זרים לחדר אחד ולא נותנת להם שום דרך להכיר.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "prove", "field"],
  domain: ["product"],
  role: { en: "Product · Design · Build", he: "מוצר · עיצוב · בנייה" },
  started: "2026-01",
  status: "ongoing",
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
      value: { en: "In build", he: "בבנייה" },
      note: { en: "Actively developed", he: "בפיתוח פעיל" },
    },
  ],
  stack: ["TypeScript", "Mobile web", "QR onboarding", "Realtime messaging"],
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
          "Weddings assemble a hundred and fifty people who have been pre-filtered by two people who know them all well, seat them by family politics, and then provide no mechanism whatsoever for them to meet.",
          "The existing behaviour is the signal: guests already do this manually and badly. They ask the couple about someone across the room. They get seated next to a stranger and spend the evening finding out whether there was anything there. The couple fields matchmaking requests for weeks afterwards.",
          "The interesting constraint is that this is a two-hour window with a hard start and a hard end, inside a physical space, among people with a real social connection to the same two hosts. That is a completely different problem from general-purpose dating, and treating it as one would produce a much worse product.",
        ],
        he: [
          "חתונות מכנסות מאה וחמישים אנשים שסוננו מראש על ידי שני אנשים שמכירים את כולם היטב, מושיבות אותם לפי פוליטיקה משפחתית, ואז לא מספקות שום מנגנון שיאפשר להם להכיר.",
          "ההתנהגות הקיימת היא האיתות: אורחים כבר עושים את זה ידנית ורע. הם שואלים את הזוג על מישהו מהצד השני של האולם. הם מושבים ליד זר ומבלים את הערב בלגלות אם היה שם משהו. הזוג מקבל בקשות שידוך במשך שבועות אחר כך.",
          "האילוץ המעניין הוא שמדובר בחלון של שעתיים עם התחלה קשיחה וסוף קשיח, בתוך מרחב פיזי, בין אנשים עם קשר חברתי אמיתי לאותם שני מארחים. זו בעיה שונה לחלוטין מהיכרויות כלליות, והתייחסות אליה ככזו הייתה מייצרת מוצר גרוע בהרבה.",
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
          "The metric that matters is completion rate through onboarding, and I would rather know it is low before an event than discover it afterwards from a couple who trusted me with their wedding.",
        ],
        he: [
          "אי אפשר לבצע איטרציות על המוצר הזה כמו על תוכנה רגילה. אירוע קורה פעם אחת, אי אפשר לשחזר אותו, וכישלון במהלכו אינו ניתן לתיקון — אין ניסיון שני בחתונה.",
          "לכן האימות חייב לקרות לפני האירוע ולא במהלכו: ללכת את כל המסלול על הטלפון הישן והזול ביותר שיש, בתאורה גרועה, על ה־wifi של האולם, מתוך הנחה שמי שמחזיק אותו מעולם לא ראה את המוצר ולא יקרא שום דבר.",
          "המדד שחשוב הוא שיעור ההשלמה של הכניסה, ואני מעדיף לדעת שהוא נמוך לפני אירוע מאשר לגלות את זה אחר כך מזוג שהפקיד בידיי את החתונה שלו.",
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
          "The work so far has been repeatedly cutting the path between scanning a code and being present in the room. Almost every change has removed a step rather than adding a capability.",
          "The same has applied to how the product describes itself. Messaging that sounds appealing in isolation reads very differently on a table card at someone's wedding, and getting the tone wrong makes people opt out before they have seen anything. That copy has gone through as many revisions as the onboarding flow itself.",
          "This one is still in build, and it is listed here as in-progress rather than dressed up as finished.",
        ],
        he: [
          "העבודה עד כה הייתה קיצור חוזר ונשנה של המסלול בין סריקת קוד לבין נוכחות בחדר. כמעט כל שינוי הסיר שלב במקום להוסיף יכולת.",
          "אותו דבר חל על האופן שבו המוצר מתאר את עצמו. ניסוח שנשמע מושך בפני עצמו נקרא אחרת לגמרי על כרטיס שולחן בחתונה של מישהו, וטון שגוי גורם לאנשים לוותר עוד לפני שראו משהו. הטקסט הזה עבר לא פחות גרסאות מזרימת הכניסה עצמה.",
          "זה עדיין בבנייה, והוא מופיע כאן כבתהליך ולא מולבש כגמור.",
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
