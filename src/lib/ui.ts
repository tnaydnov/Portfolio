/** Shared interface copy. Project details live in their content modules. */
export const ui = {
  "nav": {
    "work": "Work",
    "about": "About",
    "contact": "Contact"
  },
  "common": {
    "skipToContent": "Skip to content",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "toInk": "Switch to ink theme",
    "toPaper": "Switch to paper theme",
    "paper": "Paper",
    "ink": "Ink",
    "stage": "Stage",
    "thesis": "Thesis",
    "evidence": "Evidence",
    "method": "Method",
    "position": "Position",
    "theLoop": "The loop",
    "allWork": "All work",
    "readCase": "Read the case",
    "source": "Source",
    "nextCase": "Next case",
    "role": "Role",
    "span": "Span",
    "status": "Status",
    "team": "Team",
    "solo": "Solo",
    "now": "now",
    "interactive": "Interactive",
    "selected": "Selected",
    "downloadCv": "Download CV",
    "cvPdf": "CV (PDF)",
    "site": "Site",
    "elsewhere": "Elsewhere",
    "currently": "Currently",
    "architecture": "Architecture",
    "decisionLog": "Decision log",
    "tradeoff": "Tradeoff",
    "why": "Why",
    "revisitIf": "Revisit if",
    "entries": "entries",
    "fromTheField": "From the field",
    "whatChanged": "What changed",
    "rebuildToday": "If I rebuilt it today",
    "caseSingular": "case",
    "casePlural": "cases",
    "atThisStage": "at this stage",
    "all": "All",
    "backTo01": "back to 01 - Signal",
    "performanceBudget": "Performance budget"
  },
  "home": {
    "heroWord": "Build",
    "heroPron": "Software · Products · Iteration",
    "heroDefinition": "Useful products start with a clear understanding of the people using them.",
    "heroStatementLead": "Understand the need.",
    "heroStatementBold": "Build something useful.",
    "heroStatementRest": "I love creating products, from understanding people's needs to writing the code and improving what comes next.",
    "seeTheLoop": "See the loop",
    "theEvidence": "The evidence",
    "skipTheLoop": "Skip the loop ↓",
    "loopHeading": "From the first question to the next iteration.",
    "loopIntro": "Understand the workflow, agree on the problem, plan the work, build it, test it and learn from use.",
    "evidenceHeading": "Selected products and systems.",
    "evidenceIntro": "Each case explains the problem, my contribution and the product or code available to review.",
    "positionQuoteLead": "A software engineering foundation. A growing focus on systems and processes.",
    "positionQuoteAccent": "Both inform how I work.",
    "positionBody": [
      "I completed my B.Sc. in Software Engineering in 2025 and am now studying Industrial Engineering & Management at Shenkar."
    ],
    "seeHowIWork": "See how I work →",
    "classroomLabel": "Earlier experience",
    "classroomHeading": "Teaching changed how I explain things.",
    "classroomBody": [
      "Earlier programming instruction taught me to notice where an explanation stopped making sense. I adapted the sequence, examples and level of detail to different learners.",
      "That experience shapes how I build products: understand the people using them, make the next step clear and listen when something needs to change."
    ],
    "classroomRule": "Make the next step understandable."
  },
  "work": {
    "title": "Work",
    "intro": "Products I developed independently and two live products I build with one coworker. Explore the needs, decisions and details behind the software.",
    "selectedTitle": "Selected work",
    "selectedIntro": "A closer look at what I built, how it works and what I contributed.",
    "filterNote": "Explore projects by the stage of work you are interested in.",
    "empty": "No projects match this stage.",
    "repsTitle": "Earlier engineering work",
    "repsSpan": "University projects",
    "repsHeading": "Earlier engineering work.",
    "repsIntro": "Independently developed university projects that shaped my engineering practice.",
    "colProject": "Project",
    "colSpan": "Span",
    "colStack": "Stack",
    "colTaught": "What it taught"
  },
  "system": {
    "title": "System",
    "intro": "A practical path from understanding a need to improving a working product.",
    "sixStages": "The six stages",
    "produces": "What this stage produces",
    "peopleTitle": "Working with people",
    "peopleHeading": "Start with a shared understanding.",
    "peopleBody": [
      "I write requirements in plain language and check them with the people who will use the result.",
      "Clear examples, agreed priorities and early feedback help keep implementation connected to the original need."
    ],
    "nextTitle": "Where to look next",
    "nextEvidence": "The evidence",
    "nextEvidenceBody": "The products, engineering decisions and implementation details.",
    "nextThesis": "About me",
    "nextThesisBody": "My current work, experience and education."
  },
  "about": {
    "title": "About",
    "lede": "I'm a software engineer who loves creating products from scratch. Understanding what people need, exploring ideas, writing the code and seeing it come to life - that's the part that excites me.",
    "thesisLabel": "Approach",
    "thesisBody": [
      "I start with the people who will use a product. I explore ideas, make the requirements clear and build the software, then stay involved through support and the next improvement.",
      "Earlier work in technical support and programming instruction taught me to look past the first symptom and make complicated ideas easier to understand."
    ],
    "teachingLabel": "What teaching taught me",
    "wantLabel": "The work I'm interested in",
    "wantBody": [
      "Software engineering work where I can help shape a product, build it and keep improving it with the people who use it."
    ],
    "getInTouch": "Get in touch",
    "experienceTitle": "Experience",
    "educationTitle": "Education",
    "detailsHint": "Open a role to read its responsibilities.",
    "currentRole": "Current role",
    "currentStudies": "Current studies",
    "roleDetails": "Role details",
    "closeDetails": "Close details",
    "responsibilities": "Responsibilities",
    "fitTitle": "A good fit"
  },
  "contact": {
    "title": "Contact",
    "lede": "A product to build, an idea to explore or an engineering role worth talking about. I'd be glad to hear from you.",
    "based": "Based",
    "basedValue": "Israel time",
    "lookingFor": "Interested in",
    "lookingForValue": "Software engineering and product development, from understanding the need to building, supporting and improving the result.",
    "cv": "CV",
    "downloadPdf": "Download PDF ↓",
    "briefTitle": "The brief",
    "briefHeading": "A few lines are enough.",
    "briefIntro": "Tell me what you're working on and where I could help.",
    "footerNote": "Get in touch about software engineering, product development or an idea worth building."
  },
  "notFound": {
    "label": "No route",
    "title": "Nothing here.",
    "body": "This page could not be found. You can return home or explore the work.",
    "cta": "See the work →",
    "home": "Home"
  }
} as const;

export type UI = typeof ui;
