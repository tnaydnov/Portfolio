# Arc: product-depth audit and capture evidence

## Scope and provenance

Audited repository: private `ninasokolov8/step-up`, original checkout left on `dev` at **511cf99992f559aed4bbfd10216f58ec80e3e2cc**, matching fetched `origin/dev`. The capture runtime is the existing isolated snapshot **43dfaf6e0a548f9e382a96744aad12a8611aad43**. Comparing these commits found nine deployment/CI/test-documentation changes and **no product UI or domain-code changes**. The films therefore show the earlier runtime with verified UI/domain equivalence; they do not claim to run the new deployment revision.

Final check: the original checkout and `origin/dev` advanced externally to **5549bf960754130c6dfe06b0b7bab1fb6a756d7f** during this task. I did not change that checkout. The additional commit only changes waits in `src/tests/Browser/AdminQuestionnaireScoringTest.php`; the diff was read. The final inventory/manifest records this final audited revision. From capture runtime to this revision, the ten changed files are deployment/CI/documentation and browser-test timing; UI/domain equivalence is unchanged. The original worktree remains clean on `dev`.

`file-inventory.json` inventories all **6,301 tracked files**. Initial classification: 4,077 authored source/configuration; 457 tests; 205 documentation; 621 generated outputs/locks; 217 binary/assets; 722 operational-storage paths; one sensitive configuration path; one vendor-path file. `source-structure.json` structurally indexes the complete text of **4,739 authored files** (about 612,000 lines), recording hashes, declarations, dependencies and documentation headings. `coverage-ledger.csv` is file-backed and distinguishes inventory, structural indexing and selective semantic reading.

**Coverage boundary:** this is a repository-wide inventory and subsystem audit with focused semantic verification of product claims. It is not a claim that every one of roughly 612,000 lines received a manual correctness review, nor a fresh security audit or full test-suite run. Generated files, private storage, uploads, credentials and operational logs were excluded from content review. Authored tests were indexed and relevant theme/quiz cases read; the full Arc test suite was not run for this media task.

Browser skill was read before browser work. Its runtime reported no available browser (`agent.browsers.list()` returned an empty list); the explicitly authorized standalone Playwright fallback was used. Browser contexts were independent and allowed only local URLs. The local PHP/SQLite capture containers were isolated from external services. No paid AI, production API, email, game-service or external code-execution call was made.

## The strongest product stories

### 1. Students choose an entire learning environment

**Verified in source and the real UI:** Aurora, Aurora Light, Neon Hacker, Magic Forest and Space. The preference is saved to the student record through the theme endpoint, validated against the configured registry, and resolved with a safe default. Space and Magic Forest visibly change the learning environment, including navigation, progress and atmosphere. Neon Hacker provides a compact technical aesthetic. The theme is not a separate curriculum or new game world.

Evidence: `src/config/themes.php:147`, `:290`, `:434`, `:577`, `:725`; `src/app/Platform/Domain/Theming/ThemeManager.php`; `src/app/Platform/Portals/Student/Controllers/StudentThemeController.php`; `src/resources/views/components/theme-selector.blade.php`; `src/resources/js/theme-switcher.js`; `src/tests/Feature/Student/StudentThemeTest.php:1–128`.

Capture: five actual dashboard variants, plus a film sequence switching Space → Magic Forest → Neon Hacker through the native picker. All displayed names/history belong to synthetic seed accounts.

### 2. Different activities support different ways of thinking

**UI verified:** a five-node diagram built from the native shape palette, editable labels and connected decision branches; matching pairs that persist as a submitted version; session-finale identity/reflection cards. The selected diagram still is the original coherent five-node draft; unsuccessful later capture rehearsals are excluded from delivery. The student film uses the clearer matching interaction and a saved-version view.

**Source verified, not all executed:** text/table/file/recording work, drawing, image/vision boards, questionnaire tasks, sorting/ranking/classification, individual branching, coding, external launches, games, escape rooms and teacher-led shared activities. These have different submission paths. Canvas and flowchart submit exported visual work through a file/submission service; programming runs can be generated server-side through Browser Coder; live activities finalize participation into submissions.

Evidence: `src/app/Platform/Domain/Task/TaskType.php:18–38`; `TaskTypeRegistry.php`; `Handlers/CanvasTaskHandler.php`; `Handlers/FlowchartTaskHandler.php`; `Handlers/MatchingTaskHandler.php`; `Handlers/SortingRankingTaskHandler.php`; `Handlers/ProgrammingTaskHandler.php`; `Handlers/SessionFinaleTaskHandler.php`; `packages/flowchart-editor/src/FlowchartEditor.tsx`; `packages/flowchart-editor/src/useExport.ts:1–127`; `src/app/Platform/Domain/Submission/SubmissionService.php:1–172`.

**Catalogue caution:** the enum contains 21 canonical types, including `arc_game`. The seeded demo pack happens to contain 21 distinct strings but substitutes legacy `peer_review` for `arc_game`. Peer review is a real separate orchestration over submissions; that raw fixture string is not proof of another registered standalone editor. Do not advertise “21 equally complete activity editors.” Prefer named examples and distinguish individual work, instructor-led sessions and external integrations.

**Observed limitation:** starting another flowchart version opened a blank editor in this capture. Earlier submitted work remained viewable. Do not describe an automatic editable diagram copy-forward unless separately verified. The older text submission → feedback → revision film remains valid evidence for text revision.

### 3. A teacher can conduct a shared session

**Source and UI verified:** instructor created/started a Quiz Battle; Jordan and Liam used independent student sessions; the instructor closed question one and advanced; both student screens advanced without manual navigation and both answered question two; the teacher ended the session using the native confirmation. The server stored participant work. Screens show the actual teacher controls, student selection and leaderboard.

Evidence: `src/app/Platform/Domain/QuizBattle/QuizBattleSessionService.php:22–140` and its close/advance/end methods; `QuizBattleAnswerService.php:1–95`; `QuizBattleSubmissionService.php:1–90`; `src/resources/js/student-quiz-battle/answers.js`; `realtime.js`; `src/resources/js/instructor-quiz-battle/lifecycle.js:1–130`; `requests.js:36–40`; `src/tests/Feature/Student/StudentQuizBattleTest.php:1–155`.

The backend enforces active state, question identity, membership, duplicate-answer protection and server timing. The recorded runtime used **Arc's built-in three-second polling fallback**, because Reverb was not started. This demonstrates real shared state and automatic updates, not a tested WebSocket transport. One first-round answer did not become a scored leaderboard entry before the timing boundary; the film avoids claiming both students scored in every round. Both participated in round two. The finalized session is `ended`; participant submission records were checked.

**Additional shared modes, source-only for this task:** Live Cloud bounds answers per student and lets instructors moderate repeated text; heatmaps normalize positions and broadcast without student IDs; debate constrains one contribution per student/round and side choice; class branching uses shared voting; escape rooms enforce clues, normalized answers and lockouts. These are distinct classroom workflows, not interchangeable quiz skins.

Evidence: `Domain/LiveCloud/LiveCloudAnswerService.php:1–161`; `Domain/Heatmap/HeatmapResponseService.php`; `Domain/Debate/DebateContributionService.php`; `Domain/BranchingScenario/BranchingSessionService.php:22–205`; `Domain/EscapeRoom/EscapeRoomAnswerService.php:28–177`; `Domain/Realtime/ChannelAuthorizationService.php:1–61`; `Domain/Realtime/LiveLessonService.php:1–108`.

### 4. Assemble a syllabus, then inspect it before teaching

**Source and UI verified:** author sets a goal, lesson count, activity preferences and priorities; the smart builder selects existing tagged activities; the resulting draft stays editable. The capture generated **Think, Make, Reflect**, three lessons and nine sample activities. The opening lesson was renamed through the native form. The preview retains source-pack context and shows the activity mix. The teaching-readiness screen identifies missing mini-lessons/general lesson materials.

Evidence: `Domain/ContentBuilder/SmartDraftGeneratorService.php:1–221`, `:386–440`; `Domain/ContentBuilder/ContentPackDraftPublishingService.php:1–141`; `src/resources/views/admin/content-builder/drafts/editor/lesson-title.blade.php:1–40`; `drafts/coverage/lesson.blade.php`; `Domain/ContentPack/ContentPackAssignmentService.php`; `Domain/Classroom/ClassroomContentService.php:1–54`; `Domain/Lesson/LessonReleaseService.php:1–112`.

**Important interpretation:** Smart Build is deterministic rule-based selection/ranking, not generative AI pedagogy. Preferred task types boost scores rather than forming an exclusive filter. Required tags influence ranking; do not imply a guaranteed hard tag constraint without a dedicated test. The generated sample genuinely has nine activities missing teaching materials; the film presents the warning as a useful review feature. It does not imply the sample curriculum is ready to teach. No draft was published or assigned. Publication creates a pack; classroom assignment and task/lesson release are separate operations.

Synthetic preparation: 26 activities in the isolated sample pack received appropriate Creativity/Drawing/Reflection/Group Activity/Technical Skill/Programming tags so the real selector had meaningful fixture metadata. This changed only capture data, not app source or external records. Helper: `prepare-tags.php`.

### 5. Preserve the work behind the report

**Source verified; earlier tour already has real dashboard captures:** school managers can drill from scoped schools/classrooms into student activity and submission previews, with published review context. Analytics V3 has Overview, Grading and Progress; older admin V2 includes deeper learning-friction analyses. Scopes are intersected and included in cache identity. Metrics are operational indicators, not evidence of improved learning outcomes.

Evidence: `Domain/Analytics/V3/AnalyticsV3Service.php:1–170`; `Domain/Analytics/V3/ActorScopeRestrictions.php:1–161`; `Domain/Analytics/Metrics/LearningFrictionMetrics.php:1–210`; `Portals/SchoolManager/Services/SchoolManagerDashboardPage.php:1–87`; `SchoolManagerSubmissionPreviewPage.php:1–61`; `SchoolManagerSubmissionPreviewPresenter.php`; `src/config/system_users.php:20–153`.

Questionnaires include configurable scores, charts and reflection/engineer profile outputs, with locale-aware custom wording and visibility choices. Do not market the profile labels as a clinically or psychometrically validated assessment. Evidence: `Domain/Questionnaire/QuestionnaireResultsCompiler.php:1–133`; `EngineerProfileService.php:1–165`; `ReflectionProfileService.php:174–285`.

## Older capability/developer overview: what changed

Located `/documentation` through `Domain/Documentation/DocumentationCatalog.php` and the public documentation controller; `developer-portal` maps to `docs/DEVELOPER_PORTAL_FEATURE_REPORT.md`. Read that report and the student overview as grounding, then compared implementation rather than repeating counters.

| Older overview statement | Current evidence / editorial treatment |
|---|---|
| Three or four themes depending on page | Five configured themes, all exercised in UI. |
| Eight student activity types | Canonical enum 21, heterogeneous handlers and external/session modes; show named verified examples. |
| Hebrew-only student portal | English fixture UI and English locale resources operate today. |
| Original questionnaire API: 15 endpoints/six scopes | Report now itself says consult the live specification. `src/routes/api.php` also includes external groups, per-student mobile endpoints and partner directory scopes. Avoid frozen API counts. |
| Every API request is logged | `ApiTokenAuth.php` returns early for missing/unknown tokens; recognised-token scope/IP failures and downstream responses are logged. Logging can fail softly. Avoid unconditional “every request.” |
| Broad security/autoscaling/test-count claims | Repository services and test files are evidence of implementation, not evidence that every production dependency is configured or that this capture ran the full suite. |

Evidence: `src/resources/lang/en/documentation.php`; `docs/STUDENT_PORTAL_FEATURE_REPORT.md:1–170`; `docs/DEVELOPER_PORTAL_FEATURE_REPORT.md:1–240`; `src/routes/api.php:1–114`; `Infrastructure/Http/Middleware/ApiTokenAuth.php:22–151`; `Api/Controllers/StudentMobileApiController.php:1–115`.

## Broader source architecture and decisions

| Area | Concrete current design | Evidence / verification level |
|---|---|---|
| Application | Laravel portal/domain structure, Blade/Alpine frontend with Vite/Tailwind; dedicated React/TypeScript flowchart package. | `docs/ARCHITECTURE.md`; packages/flowchart-editor; source indexed, core services read, selected UI exercised. |
| Identity | Unified Laravel user resolved into a typed actor; permissions and ownership checks for content managers; school/analytics scopes; role-configured landing routes. | `Auth/CurrentActorResolver.php:1–377`; `Portals/System/Controllers/SystemAuthController.php:1–129`; `config/system_users.php`; source verified. |
| Content portability | Lesson bundles reuse pack JSON validation/export; replace-in-place remaps identity; importing as new strips IDs. | `Domain/ContentPack/LessonBundleService.php:1–160`; source verified, import not executed. |
| Version safety | Late autosave does not invent a new draft after submit; published reviews remain associated with a submitted version. | `Domain/Submission/SubmissionService.php:34–44`; existing text-loop capture plus new stored matching/diagram versions. |
| Peer review | Circle-shift assignment over existing submitted work, self-review avoided; instructor publication controls visibility. | `Domain/PeerReview/PeerReviewDistributionService.php`; `PeerReviewResponseService.php`; source verified, not captured. |
| Programming | Submission execution calls Browser Coder server-side and marks trusted run provenance; personal sandbox files are separated from lesson-material masters and restore. | `Domain/Task/CodeRunner.php:1–91`; `Handlers/ProgrammingTaskHandler.php`; `Domain/Sandbox/InstructorSandboxService.php`; source verified, external runtime not invoked. |
| Arc Gaming | Validate task-selected release/deadline, provision classroom assignment and roster, issue launch; room/group context belongs to assignment. | `Domain/ArcGaming/ArcGameLaunchService.php:34–180`; related client/provisioner index; source verified, no external launch. |
| External activity | Validated visit link can mark an external activity visited through first-or-create. | `Domain/ExternalActivity/ExternalActivityLaunchService.php:1–50`; visit is not proof of successful learning in external app. |
| Operational imports | Validate rows, report errors, generate accounts where appropriate. | `Domain/Imports/StudentImportService.php`; source read, no production/account import performed. |
| Account merge | Transactional collision resolution, tombstoned absorbed accounts, preserved audit snapshots; caps apply to audit detail. | `Domain/AccountMerge/MergeExecutor.php:1–230`; source-only; no merge performed. |
| Cross-device visuals | Six-digit, short-lived vision-board pairing state; personal board sharing and presets. | `Domain/VisionBoard/VisionBoardPairingService.php:1–122`; source-only; no camera or personal image uploaded. |
| Upload checks | Type/text/ZIP checks; antivirus is best effort and can be skipped if unavailable. | `Domain/Security/FileUploadSecurityService.php:1–180`; do not claim universal virus scanning. |
| AI assistance | Feedback helper sends instructor draft plus task context; provider boundary supports mock/real providers. | `Domain/AI/Services/FeedbackAssistService.php:1–123`; source-only; no provider called; instructor text can itself contain private information. |
| Development/QA | Local/testing sandbox route gated by environment; test runner has container and in-process paths. | `Portals/Dev/Controllers/DevSandboxController.php:1–38`; `Domain/Testing/TestRunExecutorService.php:1–160`; neither runner invoked. |

All portal families and domain directories appear in `subsystem-index.md`; infrastructure, models, route/view/JS dependencies and authored tests are covered by `source-structure.json`. This ledger deliberately leaves non-reviewed implementation paths marked as structurally indexed rather than implying proof of every edge case.

## Editorial recommendation

Use five visitor-facing groups: **Your learning world**, **Think by doing**, **Run the room**, **Build the curriculum**, **See the work behind the numbers**. Lead with a Space/Forest comparison, then a real visual artifact. Use the live film to explain the shared state across people. Use the syllabus film to show editable intent and practical preparation. Keep management/reporting one level deeper with the existing authentic captures and contextual submission detail.

The three films use lossless PNG compositor frames and one H.264 encode, paced chapter cuts, context views and genuine-pixel detail crops. Editorial copy is outside application pixels. Full original screenshots remain independently accessible. The final manifest contains focus rectangles in original screenshot pixels, chapter descriptions and exact capture/audit revisions. No generated replacement interface is used.

## Runtime and capture limitations

- Synthetic English demo records and deliberately prepared curriculum tags; no real learner data.
- The authoring movie uses an administrator operating the real builder, not an assertion that every content-manager permission combination was tested.
- Shared quiz updates used polling fallback. WebSocket transport, failover under load and production service configuration were not tested.
- Existing text revision evidence and new diagram/matching evidence are separate flows. No automatic curriculum revision from student feedback is claimed.
- The five themes are verified; all catalogue entries are not claimed as fully exercised.
- The isolated runtime remains the older revision with a deployment-only delta. Public materials must label it a development build.
- Rehearsal captures, private fixture links and earlier blocked archive artifacts remain ignored and unpublished. No cleanup of those archives was attempted.
