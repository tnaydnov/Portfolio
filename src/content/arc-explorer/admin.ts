import type { ArcExplorerPage, ArcPortalDefinition } from "./types";

const portal = "src/app/Platform/Portals/";
const domain = "src/app/Platform/Domain/";
const originalScreens: Record<string, string[]> = {
  overview: ["bi-overview"],
  "analytics/overview": ["bi-overview", "bi-students"],
  "analytics/geography": ["bi-geography"],
  "analytics/lessons": ["bi-lessons"],
  "analytics/students": ["bi-students"],
  "analytics/learning-friction": ["bi-friction", "bi-calculation"],
  "analytics/business-impact": ["bi-impact", "bi-comparison-gate"],
  "reports/grading": ["scoped-grading"],
  "reports/progress": ["scoped-progress"],
};
const page = (
  id: string,
  label: string,
  group: string,
  title: string,
  description: string,
  features: string[],
  sourcePaths: string[],
  media: { screenIds?: string[]; filmIds?: string[]; parentId?: string } = {},
): ArcExplorerPage => ({
  id,
  label,
  group,
  title,
  description,
  features,
  sourcePaths,
  screenIds: originalScreens[id] ?? media.screenIds ?? [],
  filmIds:
    id.startsWith("analytics/") || id.startsWith("reports/")
      ? ["admin-bi-exploration"]
      : (media.filmIds ?? []),
  ...(media.parentId ? { parentId: media.parentId } : {}),
});

export const adminPortal: ArcPortalDefinition = {
  id: "admin",
  label: "Administration",
  subtitle: "Run the learning platform",
  description:
    "Organize people and curriculum, trace learning activity, and understand the work behind a report. This workspace also includes the separate, scoped views available to school and analytics staff.",
  initialPage: "overview",
  pages: [
    page(
      "overview",
      "Overview",
      "Management",
      "A program, with its people in view.",
      "An operational starting point for classrooms, learners, submitted work and the content that supports them.",
      [
        "Dashboard cards for active classrooms, students, today's submissions and submitted versions",
        "Direct access to classrooms, submissions and the content catalog",
        "Separate management, content, data and system navigation",
      ],
      [
        portal + "Admin/ViewModels/AdminDashboardViewModel.php",
        portal + "Admin/ViewModels/AdminNavigationViewModel.php",
      ],
      { screenIds: ["school-overview"] },
    ),
    page(
      "classrooms",
      "Classrooms",
      "Management",
      "Give each classroom the right context.",
      "Search groups by school and instructor, see their learners, and inspect the content assigned to them.",
      [
        "Search and filter by status, school, region, instructor, pack, learner count and creation date",
        "Classroom details, active state and entry-code rotation",
        "Assign instructors and content packs, individually or in bulk",
      ],
      [
        portal + "Admin/Controllers/AdminClassroomController.php",
        portal + "Admin/Controllers/AdminClassroomContentController.php",
      ],
      { screenIds: ["school-overview"] },
    ),
    ...["python-lab", "web-studio", "idea-lab"].map((id) =>
      page(
        `classrooms/${id}`,
        id === "python-lab"
          ? "Python Lab"
          : id === "web-studio"
            ? "Web Studio"
            : "Idea Lab",
        "Management",
        "Inside a classroom.",
        "Learners, teaching responsibility and assigned material stay connected to the same group.",
        [
          "Instructor and content-pack assignments",
          "Learner roster and submitted-work context",
          "School-manager access is independently scoped",
        ],
        [
          portal + "Admin/Controllers/AdminClassroomController.php",
          portal + "SchoolManager/Services/SchoolManagerClassroomPage.php",
        ],
        { parentId: "classrooms", screenIds: ["school-overview"] },
      ),
    ),
    page(
      "instructors",
      "Instructors",
      "Management",
      "Teaching responsibility, clearly assigned.",
      "Find an instructor and understand which classrooms they guide.",
      [
        "Search by name or username; filter active state, school, classroom count and password-reset state",
        "Create and edit instructor records",
        "Manage classroom assignments and account access",
      ],
      [portal + "Admin/Controllers/AdminInstructorController.php"],
    ),
    page(
      "access",
      "People & access",
      "Management",
      "The right workspace for each person.",
      "Analytics staff, school managers and content managers receive explicit permissions and scopes.",
      [
        "Role-specific permissions and landing pages",
        "Scope by region, school, school code and selected classrooms",
        "Separate student-summary and student-detail permissions",
        "Content-pack/questionnaire scope and independent builder-library access",
      ],
      [
        "src/config/system_users.php",
        portal + "Admin/Controllers/AdminSystemUsersController.php",
        domain + "Analytics/V3/ActorScopeRestrictions.php",
      ],
    ),
    page(
      "imports",
      "Import preparation",
      "Management",
      "Catch a bad row before it becomes an account.",
      "Arc separates uploaded spreadsheet validation, preview and commit for classroom, instructor and student records.",
      [
        "Download a template for each supported record type",
        "Preview parsed records and validation errors",
        "Commit a reviewed import or cancel it",
      ],
      [
        portal + "Admin/Controllers/AdminImportController.php",
        domain + "Imports/StudentImportService.php",
        domain + "Imports/ClassroomImportService.php",
        domain + "Imports/InstructorImportService.php",
      ],
    ),
    page(
      "account-merge",
      "Account reconciliation",
      "Management",
      "Keep the learning history when records overlap.",
      "Duplicate-account handling includes target selection, collision review and an audit record. This example stops at review.",
      [
        "Find possible duplicate students and choose a target",
        "Inspect a merge plan and resolve data collisions",
        "Transactional execution with preserved history and absorbed-account records",
        "Review previous merges and reference coverage",
      ],
      [
        portal + "Admin/Controllers/AdminAccountMergeController.php",
        domain + "AccountMerge/MergePlanner.php",
        domain + "AccountMerge/MergeExecutor.php",
      ],
    ),
    page(
      "content-packs",
      "Content packs",
      "Curriculum",
      "A curriculum has more than a list of tasks.",
      "Lessons carry activities, teaching materials and separate coding resources for students and instructors.",
      [
        "Build, duplicate, version, import and export content packs",
        "Arrange lessons and tasks; preview the student experience",
        "Add reusable material as independent copies or linked mirrors",
        "Keep publication, classroom assignment and lesson release separate",
      ],
      [
        portal + "Admin/Controllers/AdminContentPackController.php",
        portal + "Admin/Controllers/AdminContentPackStructureController.php",
        domain + "ContentPack/ContentPackAssignmentService.php",
      ],
      {
        screenIds: ["content-authoring", "syllabus-preview"],
        filmIds: ["syllabus-from-intent-to-review"],
      },
    ),
    page(
      "content-packs/lesson",
      "Lesson materials",
      "Curriculum",
      "Prepare the explanation as well as the activity.",
      "A lesson can hold slides, a teaching plan, notes and attachments alongside its tasks.",
      [
        "Lesson presentation, plan, notes and media",
        "Separate student and instructor sandbox master archives",
        "Portable lesson/task bundles and JSON editing",
        "Task-specific instructions, review configuration and mini-lessons",
      ],
      [
        portal + "Admin/Controllers/AdminContentPackLessonController.php",
        portal + "Admin/Controllers/AdminContentPackTaskController.php",
        portal + "Admin/Controllers/AdminLessonPresentationController.php",
      ],
      {
        parentId: "content-packs",
        screenIds: ["content-authoring", "teaching-readiness"],
      },
    ),
    page(
      "builder",
      "Curriculum builder",
      "Curriculum",
      "Build from reusable pieces. Keep your judgment.",
      "Browse existing lessons and activity templates, assemble a draft and inspect its teaching coverage.",
      [
        "Filter the lesson/task library by search, type, pack, state, required status and tags",
        "Reusable activity templates include duration, solution, review settings and teaching material",
        "Smart Build ranks existing activities from a goal and preferences",
        "Edit the draft, inspect teaching coverage and publish a new pack",
      ],
      [
        domain + "ContentBuilder/SmartDraftGeneratorService.php",
        domain + "ContentBuilder/ContentPackDraftPublishingService.php",
        portal + "Admin/Controllers/AdminContentBuilderController.php",
      ],
      {
        screenIds: [
          "syllabus-direction",
          "syllabus-preview",
          "teaching-readiness",
        ],
        filmIds: ["syllabus-from-intent-to-review"],
      },
    ),
    page(
      "builder/coverage",
      "Teaching coverage",
      "Curriculum",
      "See what is ready to teach.",
      "Coverage distinguishes an activity's mini-lesson, inherited lesson material and missing preparation.",
      [
        "Task-level mini-lessons and lesson-level teaching resources",
        "Advisory gaps that remain visible before publishing",
        "Drafts preserve their source context without changing the reusable original",
      ],
      [
        "src/resources/views/admin/content-builder/drafts/coverage/lesson.blade.php",
        domain + "ContentBuilder/ContentPackDraftPublishingService.php",
      ],
      {
        parentId: "builder",
        screenIds: ["teaching-readiness"],
        filmIds: ["syllabus-from-intent-to-review"],
      },
    ),
    page(
      "questionnaires",
      "Questionnaires",
      "Curriculum",
      "Ask, interpret and keep the context.",
      "Questionnaire definitions, scoring and wording connect to classroom use, external audiences and response analysis.",
      [
        "Question and option editing with configurable scoring and result presentation",
        "Alternative phrasings, scoring profiles and version activation",
        "Classroom/lesson assignments and external access groups",
        "Definition and response import/export",
      ],
      [
        portal + "Admin/Controllers/AdminQuestionnaireController.php",
        portal + "Admin/Controllers/AdminQuestionnaireEditorController.php",
        portal + "Admin/Controllers/AdminQuestionnaireScoringController.php",
        portal + "Admin/Controllers/AdminQuestionnaireVersionsController.php",
      ],
    ),
    page(
      "questionnaires/results",
      "Response analysis",
      "Curriculum",
      "A response is more useful with context.",
      "Explore example distributions and individual responses, with classroom and phrasing context retained.",
      [
        "Response counts, completion time, score distributions and profile breakdowns",
        "Filters for person, role, group, profile, lesson, school, region, instructor, pack, phrasing and date",
        "Repeated-response trends and cross-questionnaire comparisons",
        "Response details and configurable exports",
      ],
      [
        portal + "Admin/Controllers/AdminQuestionnaireAnswersController.php",
        domain + "Questionnaire/QuestionnaireAnswersAnalyticsService.php",
      ],
      { parentId: "questionnaires", screenIds: ["reflection-cards"] },
    ),
    page(
      "questionnaires/access",
      "External groups",
      "Curriculum",
      "Include an audience beyond the classroom roster.",
      "Separate access groups can receive questionnaire links and retain their own response context.",
      [
        "Access codes and configurable response limits",
        "External group links, enabled state and response assignment",
        "Separate group-manager access and group comparisons",
        "No messages or invitations are sent by this explorer",
      ],
      [
        portal + "Admin/Controllers/AdminQuestionnaireAccessController.php",
        portal +
          "Admin/Controllers/AdminQuestionnaireExternalGroupController.php",
        portal +
          "Admin/Controllers/AdminQuestionnaireExternalGroupAnalyticsController.php",
      ],
      { parentId: "questionnaires" },
    ),
    page(
      "questionnaires/reflection",
      "Reflection timelines",
      "Curriculum",
      "Notice a pattern across reflections.",
      "Profile distributions and lesson-linked timelines describe submitted answers, without treating them as a validated diagnosis.",
      [
        "Reflection counts, type distributions and profile pairs",
        "Breakdowns by lesson and program",
        "Individual student timelines and repeated reflections",
      ],
      [
        portal + "Admin/Controllers/AdminReflectionAnalyticsController.php",
        domain + "Questionnaire/ReflectionAnalyticsService.php",
      ],
      { parentId: "questionnaires", screenIds: ["reflection-cards"] },
    ),
    page(
      "submissions",
      "Submitted work",
      "Learning data",
      "The work behind the count.",
      "Inspect example learner records, with drafts, submitted versions and published reviews kept distinct.",
      [
        "Classroom and status filters; supported format tabs",
        "Grouped work with format-specific presentation",
        "CSV format exports and a full Excel export",
        "Version and review context is preserved separately",
      ],
      [
        portal + "Admin/Controllers/AdminSubmissionsController.php",
        portal + "Admin/ViewModels/AdminSubmissionsViewModel.php",
        portal + "Admin/ViewModels/AdminSubmissionGroupPresenter.php",
      ],
      {
        screenIds: ["instructor-review", "student-revision"],
        filmIds: ["learning-loop"],
      },
    ),
    ...[
      [
        "overview",
        "Overview",
        "Understand the program before the exceptions.",
        "Inventory, period activity, lesson-run states and operational health appear together.",
        [
          "Population inventory is separate from date-dependent activity",
          "Started, ended, open and stuck lesson runs",
          "Classrooms without instructors, unassigned instructors and capacity warnings",
        ],
      ],
      [
        "geography",
        "Geography",
        "Compare schools in their regional context.",
        "Move between regional and school breakdowns while keeping the selected population visible.",
        [
          "Region and school breakdowns",
          "Classroom, learner and instructor counts",
          "Average learners per group and groups per instructor",
        ],
      ],
      [
        "lessons",
        "Lessons",
        "A scheduled lesson and a recorded run are different.",
        "Run states, durations and timing help explain what happened during delivery.",
        [
          "Lesson-run statistics and duration analysis",
          "Recent run list with class, lesson, instructor, start and status",
          "Scoped date filters",
        ],
      ],
      [
        "students",
        "Students",
        "Participation is a sequence of actions.",
        "Review activity, submitted work, inactive learners and return patterns.",
        [
          "Population, active learners and submissions",
          "Top and inactive learner lists",
          "Retention and after-hours activity",
        ],
      ],
      [
        "learning-friction",
        "Learning friction",
        "Find where the learning flow slows down.",
        "Nine analysis lenses make different kinds of incomplete, late or unusual work visible.",
        [
          "No-show runs; started without finishing; late completion",
          "Stuck tasks, unusual timing, skipped work and repeated retries",
          "Excellence and early-help signals",
          "Calculation and input disclosures",
        ],
      ],
      [
        "business-impact",
        "Business impact",
        "Show the inputs before making a comparison.",
        "Operational indices compare activity with peers only when the source's minimum-data gates pass.",
        [
          "Program selection with actual input counts",
          "VRI, IER, MIS and Cost of Friction definitions",
          "VRI uses a fixed 0.8 engagement-stability factor in the current calculation, not a measured stability outcome",
          "Peer comparison needs five eligible instructors, each with three instruction hours and ten meaningful submissions; the selected scope also has minimum-data gates",
          "Raw values, formula detail and opportunity-hour estimates; no measured financial return",
        ],
      ],
    ].map(([id, label, title, description, features]) =>
      page(
        `analytics/${id}`,
        label as string,
        "Admin BI",
        title as string,
        description as string,
        features as string[],
        [
          "src/routes/platform/admin.php",
          portal + "Admin/Controllers/AdminAnalyticsV2Controller.php",
          domain + "Analytics/AnalyticsQueryService.php",
          ...(id === "business-impact"
            ? [domain + "Analytics/V2/Services/BusinessImpactServiceV3.php"]
            : id === "learning-friction"
              ? [
                  domain +
                    "Analytics/Presenters/LearningFrictionLensPresenter.php",
                ]
              : []),
        ],
      ),
    ),
    page(
      "reports",
      "Scoped reporting",
      "Scoped workspaces",
      "A useful report starts with the right scope.",
      "The separate analytics portal gives permitted staff Overview, Grading and Progress tabs.",
      [
        "Program and classroom picker with single-class and aggregate views",
        "Statistics and Questionnaire panels reuse the instructor reporting surface",
        "Excel statistics/questionnaire exports and a combined ZIP",
        "Scope and tab permissions remain distinct from admin access",
      ],
      [
        "src/routes/platform/system-portals.php",
        portal + "Analytics/Services/AnalyticsV3OverviewPage.php",
        portal + "Analytics/Controllers/AnalyticsExportController.php",
      ],
      { screenIds: ["program-analytics"] },
    ),
    page(
      "reports/grading",
      "Grading",
      "Scoped workspaces",
      "See the queue, not just the average.",
      "Published feedback, review age and task-level grade patterns describe different parts of the review workload.",
      [
        "Pending, graded, feedback coverage, review time, overdue and revision metrics",
        "Queue-age buckets and grade distribution",
        "Class-by-lesson heatmap, task-type grades and review priority queue",
        "Program, school, class, instructor, lesson, task type and period filters",
      ],
      [
        portal + "Analytics/Services/AnalyticsV3GradingPresenter.php",
        domain + "Analytics/V3/AnalyticsV3Service.php",
      ],
      { parentId: "reports", screenIds: ["instructor-review"] },
    ),
    page(
      "reports/progress",
      "Progress",
      "Scoped workspaces",
      "Follow participation through submitted work.",
      "Lesson progression, activity trends and class comparisons describe movement through the material.",
      [
        "Active learners, participation, completion, improving grades, unfinished drafts and inactivity",
        "Lesson progression and weekly trends",
        "Student segments, class comparison and task-type progress",
        "Date filters describe submission activity; they are not a learning-outcome measure",
      ],
      [
        portal + "Analytics/Services/AnalyticsV3ProgressPresenter.php",
        domain + "Analytics/V3/AnalyticsV3Service.php",
      ],
      { parentId: "reports", screenIds: ["program-analytics"] },
    ),
    page(
      "school-manager",
      "School manager",
      "Scoped workspaces",
      "From a school to the original work.",
      "Managers can inspect their assigned classrooms, with deeper learner access controlled separately.",
      [
        "School and region filters with classroom groups",
        "Learner roster, submitted/draft totals and latest activity",
        "Optional learner detail with lesson/task status and published feedback",
        "Format-specific submission preview when detail permission is granted",
      ],
      [
        portal + "SchoolManager/Controllers/SchoolManagerPortalController.php",
        portal + "SchoolManager/Services/SchoolManagerDashboardPage.php",
        portal + "SchoolManager/Services/SchoolManagerStudentDetailPage.php",
      ],
      { screenIds: ["school-overview", "student-revision"] },
    ),
    page(
      "school-manager/learner",
      "Learner detail",
      "Scoped workspaces",
      "A report can lead back to a learner's work.",
      "This example represents a manager with the additional student-detail permission.",
      [
        "Student detail is not included in the default school-manager permission set",
        "Task and lesson context with submitted versions",
        "Published review and original work previews",
      ],
      [
        "src/config/system_users.php",
        portal +
          "SchoolManager/Services/SchoolManagerStudentDetailPresenter.php",
        portal +
          "SchoolManager/Services/SchoolManagerSubmissionPreviewPage.php",
      ],
      {
        parentId: "school-manager",
        screenIds: ["student-revision"],
        filmIds: ["learning-loop"],
      },
    ),
    page(
      "security",
      "Security & API",
      "System",
      "Operational visibility with explicit controls.",
      "Arc's admin console separates event review, API activity, tests, address management and settings.",
      [
        "Eight tabs: Overview, Insights, Attacks, Timeline, Developer, Tests, IPs and Settings",
        "Period/type/severity filters and event details",
        "API token scopes, expiry, binding and usage records",
        "Block/allow lists, rate limits and detection configuration; displayed read-only here",
      ],
      [
        portal + "Admin/Controllers/AdminSecurityDashboardController.php",
        portal + "Admin/Controllers/AdminSecurityConfigController.php",
        portal + "Admin/Controllers/AdminApiTokenController.php",
        "src/resources/views/admin/security/index.blade.php",
      ],
    ),
    page(
      "integrations",
      "Connected tools",
      "System",
      "Specialist tools, connected to learning context.",
      "Programming, gaming and API access have their own explicit integration boundaries.",
      [
        "Browser Coder learning-platform integration",
        "Arc Gaming connection settings, assignments and directory access",
        "OpenAPI reference and scoped API tokens",
        "No external runtime, credentials or service calls are used by this explorer",
      ],
      [
        portal + "Admin/Controllers/AdminArcGamingSettingsController.php",
        domain + "ArcGaming/ArcGameLaunchService.php",
        "src/routes/api.php",
      ],
    ),
    page(
      "quality",
      "Quality & demo tools",
      "System",
      "Prepare a demonstration and inspect a test run.",
      "Separate admin tools generate demo fixtures and show queued test execution and reporting.",
      [
        "Demo provisioning, link refresh and account-summary exports",
        "QA run selection, status, output, cancellation and history",
        "Security-suite and portal-health views",
        "This explorer neither runs tests nor provisions or deletes accounts",
      ],
      [
        portal + "Admin/Controllers/AdminDemoControlController.php",
        portal + "Admin/Controllers/AdminQaStatusController.php",
        domain + "Testing/TestRunExecutorService.php",
      ],
    ),
    page(
      "documentation",
      "Platform documentation",
      "System",
      "The map behind the platform.",
      "Arc includes a documentation hub covering its portals, curriculum, questionnaires, analytics, security and integrations.",
      [
        "All-platform architecture and feature reports",
        "Admin, instructor, student and content guides",
        "Analytics, security, questionnaire, deployment and API reports",
        "Some older counts and claims are superseded by the current source",
      ],
      [
        "src/routes/platform/public.php",
        domain + "Documentation/DocumentationCatalog.php",
        "src/resources/views/documentation/index.blade.php",
        "src/resources/lang/en/documentation.php",
      ],
    ),
  ],
};
