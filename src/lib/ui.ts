import type { LS, LSA } from "./i18n";

/** Every string of site chrome. Content prose lives with the content. */
export const ui = {
  nav: {
    work: { en: "Work", he: "עבודה" },
    about: { en: "About", he: "אודות" },
    contact: { en: "Contact", he: "יצירת קשר" },
  } satisfies Record<string, LS>,

  common: {
    skipToContent: { en: "Skip to content", he: "דילוג לתוכן" },
    openMenu: { en: "Open menu", he: "פתיחת תפריט" },
    closeMenu: { en: "Close menu", he: "סגירת תפריט" },
    toInk: { en: "Switch to ink theme", he: "מעבר לערכת דיו" },
    toPaper: { en: "Switch to paper theme", he: "מעבר לערכת נייר" },
    paper: { en: "Paper", he: "נייר" },
    ink: { en: "Ink", he: "דיו" },
    stage: { en: "Stage", he: "שלב" },
    thesis: { en: "Thesis", he: "התזה" },
    evidence: { en: "Evidence", he: "ראיות" },
    method: { en: "Method", he: "שיטה" },
    position: { en: "Position", he: "עמדה" },
    theLoop: { en: "The loop", he: "הלולאה" },
    allWork: { en: "All work", he: "כל העבודות" },
    readCase: { en: "Read the case", he: "לקריאת המקרה" },
    source: { en: "Source", he: "קוד מקור" },
    nextCase: { en: "Next case", he: "המקרה הבא" },
    role: { en: "Role", he: "תפקיד" },
    span: { en: "Span", he: "תקופה" },
    status: { en: "Status", he: "סטטוס" },
    team: { en: "Team", he: "צוות" },
    solo: { en: "Solo", he: "לבד" },
    now: { en: "now", he: "היום" },
    interactive: { en: "Interactive", he: "אינטראקטיבי" },
    selected: { en: "Selected", he: "נבחר" },
    downloadCv: { en: "Download CV", he: "הורדת קורות חיים" },
    cvPdf: { en: "CV (PDF)", he: "קורות חיים (PDF)" },
    site: { en: "Site", he: "אתר" },
    elsewhere: { en: "Elsewhere", he: "במקומות אחרים" },
    currently: { en: "Currently", he: "כרגע" },
    architecture: { en: "Architecture", he: "ארכיטקטורה" },
    decisionLog: { en: "Decision log", he: "יומן החלטות" },
    tradeoff: { en: "Tradeoff", he: "פשרה" },
    why: { en: "Why", he: "למה" },
    revisitIf: { en: "Revisit if", he: "לבחון מחדש אם" },
    entries: { en: "entries", he: "רשומות" },
    fromTheField: { en: "From the field", he: "מהשטח" },
    whatChanged: { en: "What changed", he: "מה השתנה" },
    rebuildToday: {
      en: "If I rebuilt it today",
      he: "אילו הייתי בונה את זה היום",
    },
    caseSingular: { en: "case", he: "מקרה" },
    casePlural: { en: "cases", he: "מקרים" },
    atThisStage: { en: "at this stage", he: "בשלב הזה" },
    all: { en: "All", he: "הכול" },
    backTo01: { en: "back to 01 — Signal", he: "חזרה ל־01 — איתות" },
    performanceBudget: { en: "Performance budget", he: "תקציב ביצועים" },
  } satisfies Record<string, LS>,

  home: {
    heroWord: { en: "מִכְלוֹל", he: "מִכְלוֹל" },
    heroPron: { en: "/mikhlol/ · noun", he: "/מִכְלוֹל/ · שם עצם" },
    heroDefinition: {
      en: "the whole formed by the combination of all its parts.",
      he: "השלם הנוצר מצירוף כל חלקיו.",
    },
    heroStatementLead: {
      en: "That’s the job. Not the code, not the plan —",
      he: "זו העבודה. לא הקוד, לא התוכנית —",
    },
    heroStatementBold: { en: "the combination.", he: "הצירוף." },
    heroStatementRest: {
      en: "I find the need, define the shape, plan the path, build the thing, prove it works, and fix what the field says is wrong.",
      he: "אני מוצא את הצורך, מגדיר את הצורה, מתכנן את הדרך, בונה את הדבר, מוכיח שהוא עובד, ומתקן את מה שהשטח אומר שלא בסדר.",
    },
    seeTheLoop: { en: "See the loop", he: "לראות את הלולאה" },
    theEvidence: { en: "The evidence", he: "הראיות" },
    skipTheLoop: { en: "Skip the loop ↓", he: "דילוג על הלולאה ↓" },
    loopHeading: {
      en: "Six stages. Most people own two of them.",
      he: "שישה שלבים. רוב האנשים אחראים על שניים מהם.",
    },
    loopIntro: {
      en: "Industrial Engineering calls this a value stream. It is the same six steps every time, and the value is in owning all of them — including the last one, which is where projects become products.",
      he: "בהנדסת תעשייה וניהול קוראים לזה שרשרת ערך. אלה אותם שישה שלבים בכל פעם, והערך הוא באחריות על כולם — כולל האחרון, שבו פרויקטים הופכים למוצרים.",
    },
    evidenceHeading: {
      en: "Three products. Every claim above is one of these.",
      he: "שלושה מוצרים. כל טענה למעלה נשענת על אחד מהם.",
    },
    evidenceIntro: {
      en: "Each carries a decision log — what I chose, what I gave up for it, and the condition that would make me change my mind.",
      he: "לכל אחד יש יומן החלטות — מה בחרתי, על מה ויתרתי בשבילו, ומה יגרום לי לשנות את דעתי.",
    },
    positionQuoteLead: {
      en: "Software Engineering gave me the build. Industrial Engineering gave me the system.",
      he: "הנדסת תוכנה נתנה לי את הבנייה. הנדסת תעשייה וניהול נתנה לי את המערכת.",
    },
    positionQuoteAccent: {
      en: "The value is the combination.",
      he: "הערך הוא הצירוף.",
    },
    positionBody: {
      en: [
        "Two degrees that read as unrelated are one argument: software is the tool, systems are the subject. I did not move away from engineering — I went and got the half that makes engineering land.",
      ],
      he: [
        "שני תארים שנראים לא קשורים הם טענה אחת: תוכנה היא הכלי, מערכות הן הנושא. לא התרחקתי מהנדסה — הלכתי להשלים את החצי שגורם להנדסה לנחות במקום הנכון.",
      ],
    } satisfies LSA,
    seeHowIWork: { en: "See how I work →", he: "איך אני עובד ←" },
    classroomLabel: { en: "The classroom", he: "הכיתה" },
    classroomHeading: {
      en: "I learned requirements in front of a room of sixteen-year-olds.",
      he: "למדתי אפיון דרישות מול כיתה של בני שש־עשרה.",
    },
    classroomBody: {
      en: [
        "Teaching programming, alongside work on syllabuses, lesson plans, exercises and instructor guides, has been the most useful professional training I have had — and not for the reason people assume.",
        "Teaching is requirements engineering with a thirty-second feedback loop. A room shows you immediately which part of an explanation was carrying a hidden assumption.",
        "But a room never learns in one way. Every student arrives with a different starting point, pace and way of making sense of a problem. I learned to change the wording, sequence, medium or level of abstraction until the idea lands — without changing the goal.",
        "That habit travels beyond the classroom. Students, instructors, coordinators, clients and engineers do not need the same explanation or interface. Understanding the audience is part of understanding the requirement.",
      ],
      he: [
        "הוראת תכנות, לצד עבודה על סילבוסים, מערכי שיעור, תרגילים ומדריכים למנחים, הייתה ההכשרה המקצועית השימושית ביותר שעברתי — ולא מהסיבה שמניחים.",
        "הוראה היא אפיון דרישות עם לולאת משוב של שלושים שניות. כיתה שלמה מראה מיד איזה חלק בהסבר נשען על הנחה סמויה.",
        "אבל כיתה אינה לומדת בדרך אחת. כל תלמיד מגיע עם נקודת פתיחה, קצב ודרך חשיבה שונים. למדתי לשנות את הניסוח, הרצף, המדיום או רמת ההפשטה עד שהרעיון נקלט — בלי לשנות את המטרה.",
        "ההרגל הזה ממשיך מעבר לכיתה. תלמידים, מנחים, רכזים, לקוחות ומהנדסים אינם צריכים את אותו הסבר או אותו ממשק. הבנת הקהל היא חלק מהבנת הדרישה.",
      ],
    } satisfies LSA,
    classroomRule: {
      en: "A requirement is not finished until the people it is for can understand and use it.",
      he: "דרישה אינה גמורה עד שהאנשים שעבורם נכתבה יכולים להבין אותה ולהשתמש בה.",
    },
  },

  work: {
    title: { en: "Work", he: "עבודה" },
    intro: {
      en: "Three product stories, two engineering systems, and the earlier work that built the craft. Start with the decision; open the evidence when you want the depth.",
      he: "שלושה סיפורי מוצר, שתי מערכות הנדסיות והעבודות המוקדמות שבנו את המלאכה. מתחילים בהחלטה; פותחים את הראיות כשרוצים עומק.",
    },
    selectedTitle: { en: "Selected product work", he: "עבודות מוצר נבחרות" },
    selectedIntro: {
      en: "Real systems, presented around what was broken, what I owned and what can be inspected today.",
      he: "מערכות אמיתיות, מוצגות סביב מה היה שבור, על מה לקחתי אחריות ומה אפשר לבדוק היום.",
    },
    engineeringTitle: { en: "Engineering systems", he: "מערכות הנדסיות" },
    engineeringIntro: {
      en: "Focused proof of architecture, team engineering and implementation depth.",
      he: "הוכחה ממוקדת לעומק בארכיטקטורה, הנדסת צוות ומימוש.",
    },
    teachingTitle: { en: "Teaching is part of the work", he: "הוראה היא חלק מהעבודה" },
    teachingBody: {
      en: "Repeated live explanations taught me to detect hidden assumptions quickly. Curriculum, instructor tools and classroom behavior are not side notes to the product story; they are where much of it came from.",
      he: "הסברים חיים שחזרו שוב ושוב לימדו אותי לזהות הנחות סמויות במהירות. תוכניות לימוד, כלי מנחים והתנהגות בכיתה אינם הערת שוליים לסיפור המוצר; משם הגיע חלק גדול ממנו.",
    },
    filterNote: {
      en: "Filtered by stage of delivery, not by technology — because the stack is the least interesting thing about any of these.",
      he: "מסונן לפי שלב באספקה, לא לפי טכנולוגיה — כי הסטאק הוא הדבר הכי פחות מעניין בכל אחד מהם.",
    },
    empty: {
      en: "Nothing at this stage yet. That is the honest answer rather than a padded one.",
      he: "אין עדיין כלום בשלב הזה. זו התשובה הכנה, לא תשובה מרופדת.",
    },
    repsTitle: { en: "Earlier engineering work", he: "עבודות הנדסיות מוקדמות" },
    repsSpan: { en: "2022 — 2023 · University", he: "2022 — 2023 · אוניברסיטה" },
    repsHeading: {
      en: "Foundations, at the right weight.",
      he: "היסודות, במשקל הנכון.",
    },
    repsIntro: {
      en: "Coursework stays visible for technical reviewers without competing with products that met real operational constraints.",
      he: "עבודות הקורס נשארות זמינות לסקירה טכנית בלי להתחרות במוצרים שפגשו אילוצים תפעוליים אמיתיים.",
    },
    colProject: { en: "Project", he: "פרויקט" },
    colSpan: { en: "Span", he: "תקופה" },
    colStack: { en: "Stack", he: "טכנולוגיות" },
    colTaught: { en: "What it taught", he: "מה זה לימד" },
  },

  system: {
    title: { en: "System", he: "שיטה" },
    intro: {
      en: "Delivery is not a talent, it is a process — and a process can be written down, taught, and improved. This is mine. It is the same six stages every time, and it is the reason the work on this site looks consistent despite spanning education, infrastructure and consumer product.",
      he: "אספקה היא לא כישרון, היא תהליך — ותהליך אפשר לכתוב, ללמד ולשפר. זה שלי. אלה אותם שישה שלבים בכל פעם, וזו הסיבה שהעבודות באתר הזה נראות עקביות למרות שהן משתרעות על חינוך, תשתיות ומוצר צרכני.",
    },
    sixStages: { en: "The six stages", he: "ששת השלבים" },
    produces: { en: "What this stage produces", he: "מה השלב הזה מייצר" },
    peopleTitle: { en: "Working with people", he: "עבודה עם אנשים" },
    peopleHeading: {
      en: "Most requirements fail as translation, not as analysis.",
      he: "רוב הדרישות נכשלות בתרגום, לא בניתוח.",
    },
    peopleBody: {
      en: [
        "When a client and a developer disagree, it is almost never because one of them is wrong. It is because a word in the spec means two different things and nobody has noticed yet. My job in that room is to find the word.",
        "So I write things down, in plain language, and read them back to the people who will live with the result. It is unglamorous and it prevents most of the expensive failures.",
      ],
      he: [
        "כשלקוח ומפתח לא מסכימים, זה כמעט אף פעם לא כי אחד מהם טועה. זה כי מילה אחת באפיון אומרת שני דברים שונים ואף אחד עוד לא שם לב. התפקיד שלי בחדר הזה הוא למצוא את המילה.",
        "אז אני כותב דברים, בשפה פשוטה, ומקריא אותם בחזרה לאנשים שיחיו עם התוצאה. זה לא זוהר, וזה מונע את רוב הכישלונות היקרים.",
      ],
    } satisfies LSA,
    nextTitle: { en: "Where to look next", he: "לאן להמשיך" },
    nextEvidence: { en: "The evidence", he: "הראיות" },
    nextEvidenceBody: {
      en: "Case studies filtered by stage, each with a decision log and a rebuild list.",
      he: "מקרי בוחן מסוננים לפי שלב, כל אחד עם יומן החלטות ורשימת בנייה מחדש.",
    },
    nextThesis: { en: "The thesis", he: "התזה" },
    nextThesisBody: {
      en: "Why a software engineer went and got an Industrial Engineering degree.",
      he: "למה מהנדס תוכנה הלך ללמוד הנדסת תעשייה וניהול.",
    },
  },

  about: {
    title: { en: "About", he: "אודות" },
    lede: {
      en: "I work where product decisions, systems and implementation stop being separate conversations.",
      he: "אני עובד במקום שבו החלטות מוצר, מערכות ומימוש מפסיקים להיות שיחות נפרדות.",
    },
    thesisLabel: { en: "The thesis", he: "התזה" },
    thesisBody: {
      en: [
        "I completed a B.Sc. in Software Engineering and am now studying toward an M.Sc. in Industrial Engineering & Management. That is not a pivot away from engineering; it is a closer look at what engineering is for.",
        "Industrial Engineering is the discipline of designing, measuring and improving systems and processes. It is the formal version of the thing I kept running into at work: the code was rarely the bottleneck. The bottleneck was an undefined requirement, a handoff nobody owned, or a workaround that had quietly become policy. I had been solving those problems by instinct. I went and learned to do it properly.",
        "So the two degrees are one argument. **Software is the tool. Systems are the subject.** Being able to write the code is what stops the systems thinking from becoming a slide deck; understanding the system is what stops the code from being beautifully built and pointed at the wrong problem.",
        "In practice this means I am not looking for a role where I only write tickets, and not one where I only close them. The work I am good at is the whole loop — finding the need, framing it, sequencing it, building it, proving it, and then sitting with the people who use it while they tell me what I got wrong.",
      ],
      he: [
        "סיימתי B.Sc. בהנדסת תוכנה וכעת אני לומד לתואר M.Sc. בהנדסת תעשייה וניהול. זו לא פנייה החוצה מהנדסה; זו התבוננות קרובה יותר בשאלה בשביל מה הנדסה קיימת.",
        "הנדסת תעשייה היא הדיסציפלינה של תכנון, מדידה ושיפור של מערכות ותהליכים. זו הגרסה הפורמלית של הדבר שנתקלתי בו שוב ושוב בעבודה: הקוד כמעט אף פעם לא היה צוואר הבקבוק. צוואר הבקבוק היה דרישה לא מוגדרת, העברת אחריות שאף אחד לא לקח עליה בעלות, או עקיפה שהפכה בשקט לנוהל. פתרתי את הבעיות האלה באינטואיציה. הלכתי ללמוד לעשות את זה כמו שצריך.",
        "אז שני התארים הם טענה אחת. **תוכנה היא הכלי. מערכות הן הנושא.** היכולת לכתוב את הקוד היא מה שמונע מחשיבה מערכתית להפוך למצגת; הבנת המערכת היא מה שמונע מהקוד להיבנות יפה ולהיות מכוון לבעיה הלא נכונה.",
        "בפועל זה אומר שאני לא מחפש תפקיד שבו אני רק כותב משימות, ולא כזה שבו אני רק סוגר אותן. העבודה שאני טוב בה היא הלולאה כולה — למצוא את הצורך, למסגר אותו, לתזמן אותו, לבנות אותו, להוכיח אותו, ואז לשבת עם האנשים שמשתמשים בו בזמן שהם מספרים לי מה פספסתי.",
      ],
    } satisfies LSA,
    teachingLabel: { en: "What teaching taught me", he: "מה ההוראה לימדה אותי" },
    wantLabel: { en: "What I want next", he: "מה אני מחפש עכשיו" },
    wantBody: {
      en: [
        "A technical product role, on a small team, where the distance between noticing a problem and shipping something about it is short. I want to own outcomes rather than tickets, and I want to be close enough to the users that the feedback arrives directly rather than through a summary.",
        "I am comfortable being the person who writes the spec and then has to implement it. I think that combination is rarer than it should be, and it is the entire reason this site is organised the way it is.",
      ],
      he: [
        "תפקיד מוצר טכני, בצוות קטן, שבו המרחק בין לשים לב לבעיה לבין לשלוח משהו בנוגע אליה הוא קצר. אני רוצה להיות אחראי על תוצאות ולא על משימות, ואני רוצה להיות מספיק קרוב למשתמשים כדי שהמשוב יגיע ישירות ולא דרך סיכום.",
        "נוח לי להיות האדם שכותב את האפיון ואז צריך לממש אותו. אני חושב שהצירוף הזה נדיר יותר משהוא צריך להיות, וזו כל הסיבה שהאתר הזה מסודר כפי שהוא מסודר.",
      ],
    } satisfies LSA,
    getInTouch: { en: "Get in touch →", he: "ליצירת קשר ←" },
    capabilitiesTitle: { en: "What I actually do", he: "מה אני עושה בפועל" },
    experienceTitle: { en: "Experience", he: "ניסיון מקצועי" },
    educationTitle: { en: "Education", he: "השכלה" },
    detailsHint: {
      en: "Hover, focus or tap a role to read the details.",
      he: "העבירו עכבר, עברו עם המקלדת או הקישו על תפקיד כדי לקרוא את הפירוט.",
    },
    currentRole: { en: "Current role", he: "תפקיד נוכחי" },
    currentStudies: { en: "Current studies", he: "לימודים נוכחיים" },
    roleDetails: { en: "Role details", he: "פרטי התפקיד" },
    closeDetails: { en: "Close details", he: "סגירת הפירוט" },
    responsibilities: { en: "What I do", he: "מה אני עושה" },
    fitTitle: { en: "Where I do my best work", he: "איפה אני עובד הכי טוב" },
  },

  contact: {
    title: { en: "Contact", he: "יצירת קשר" },
    lede: {
      en: "If the role needs someone who can move from the real problem to a shipped system, let’s talk.",
      he: "אם התפקיד צריך מישהו שיכול לעבור מהבעיה האמיתית למערכת שעובדת — בואו נדבר.",
    },
    based: { en: "Based", he: "מיקום" },
    basedValue: {
      en: "Israel time\nSunday to Thursday",
      he: "שעון ישראל\nראשון עד חמישי",
    },
    lookingFor: { en: "Looking for", he: "מחפש" },
    lookingForValue: {
      en: "Technical product roles on small teams. Discovery through delivery, with the iteration after it.",
      he: "תפקידי מוצר טכני בצוותים קטנים. מגילוי ועד אספקה, כולל האיטרציה שאחריה.",
    },
    cv: { en: "CV", he: "קורות חיים" },
    downloadPdf: { en: "Download PDF ↓", he: "הורדת PDF ↓" },
    briefTitle: { en: "The brief", he: "הבריף" },
    briefHeading: {
      en: "The job description I would write, if I were writing it.",
      he: "תיאור המשרה שהייתי כותב, אילו אני הייתי כותב אותו.",
    },
    briefIntro: {
      en: "Most candidates read a role spec and try to match it. I find it more useful to publish mine, so we can both see the gap early rather than four weeks into a process.",
      he: "רוב המועמדים קוראים אפיון תפקיד ומנסים להתאים את עצמם אליו. לי יותר שימושי לפרסם את שלי, כדי ששנינו נראה את הפער מוקדם ולא אחרי ארבעה שבועות בתהליך.",
    },
    footerNote: {
      en: "Open to technical product and product-minded engineering roles with real ownership, close users and room to build.",
      he: "פתוח לתפקידי מוצר טכני והנדסה עם חשיבה מוצרית, בעלות אמיתית, קרבה למשתמשים ומקום לבנות.",
    },
  },

  notFound: {
    label: { en: "No route", he: "אין נתיב" },
    title: { en: "Nothing here.", he: "אין כאן כלום." },
    body: {
      en: "This page does not exist, which is a small failure at the Prove stage. The work is where you probably meant to go.",
      he: "הדף הזה לא קיים, וזה כשל קטן בשלב ההוכחה. כנראה התכוונתם להגיע לעבודות.",
    },
    cta: { en: "See the work →", he: "לעבודות ←" },
    home: { en: "Home", he: "דף הבית" },
  },
} as const;

export type UI = typeof ui;
