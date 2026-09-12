# Applytide: deeper product evidence

Audited 12 September 2026. Source: https://github.com/tnaydnov/Applytide at `a040d14d5c45491e3db1651c0d4daa67a218c32f`. Original `main`, local HEAD and freshly fetched `origin/main` match the previous capture revision. The original checkout was preserved, including its existing untracked `docker-compose.override.yml`.

## Coverage and its limits

`coverage-ledger.json` inventories and hashes **all 521 tracked files**. Classification: 448 authored-source candidates, 18 operations/config, 21 documentation, 1 test script, 22 vendor/adapted UI, 3 dependency locks, 3 generated source snapshots, 5 binary assets. The authored-source label distinguishes product files from generated/vendor material; it does not establish individual authorship. The three `*-content.txt` files duplicate source and contribute 27,060 lines, excluded from authored-source totals. Mozilla Readability and adapted UI primitives are separately classified.

All 516 text files were read by the structural scanner for declarations, routes and incomplete/demo markers. `structural-index.json` records that pass. Key product paths received manual focused source reading, including the extension, extraction orchestration, document analysis/cache/storage, frontend flows, auth/session/security, rate limiting/accounting, notifications/workers, admin controls and local operations. This is **not a claim of line-by-line semantic review of every one of the 124,347 candidate authored lines**. That distinction is preserved in the per-file ledger. The only tracked test-named file is a manual React email renderer/fallback integration script, not a broad automated regression suite (`backend/app/scripts/test_react_email.py:11–136`).

Git history attributes 519 commits to Tomer's `tomernay` identity and 21 to `tnaydnov`, plus two machine-authored commits. This supports broad owner/developer positioning; commit counts do not prove each borrowed component or every line was independently authored. The latest release commit fixes auth UX/upload permissions/nginx headers. `fb51207` explicitly removes server/CI/CD/production infrastructure; current local-first status should not be described as a presently operated public SaaS.

## The strongest visitor-facing story

1. **Capture an opportunity where you find it.** Show the installed extension beside the actual fictional input page, then the saved record in the original web app. This is more distinctive than another Add Job form.
2. **Review the document for a specific role.** Preview the actual sample PDF; select a saved role in the original analysis dialog; show the category and keyword explanations. The recorded result uses the existing **local rule-based fallback**, not a model or employer ATS.
3. **Keep the application history together.** Reuse the previous real pipeline/document/stage-note/reminder film as a short supporting chapter. Avoid replaying the same CRUD operations at length.
4. **Build for account boundaries and operating costs.** Use a source-backed diagram for layered extraction, optional providers, content-sensitive cache, ownership checks and short-lived connection tickets. Keep unexercised infrastructure claims separate from filmed product behavior.

## Implemented and demonstrated

### Installed extension → actual saved opportunity

The original Manifest V3 extension ran in an isolated Playwright Chromium profile. Only API/login loopback origins and explicit local host permission were remapped in a copied extension. Original popup, capture logic, auth handling and save calls were retained. A clearly labeled fictional Northstar Studio posting provided DOM and JSON-LD input. Clicking Save Current Job invoked the actual backend and persisted a Product Engineer opportunity for Alex Morgan. The original web UI then opened that same record. `extension-verification.json` records the authenticated API readback, including the same saved UUID shown by the popup.

The extraction architecture is more interesting than the button: per-tab concurrency guard and a 60-second capture cache (`chrome-extension/background.js:5–8,1549–1575`); structured data collection plus Readability and rendered DOM (`background.js:480–507,888–1035`); authenticated persistence (`background.js:219–237`); staged HTML extraction and merging (`backend/app/domain/jobs/extraction/service/orchestrator.py:271–347,445–450,497–551`). The HTML path works without a configured model; the manual pasted-text path explicitly requires one (`orchestrator.py:162–164`). The endpoint does require a current user despite an outdated docstring (`backend/app/api/routers/ai.py:68–73,177–192`).

Limits: the captured record had useful title/company/location/remote/source information and a requirement, but `skills` stayed empty and description extraction repeated some page content. JSON-LD mapping itself leaves requirements/skills empty (`.../jsonld.py:276–285`). Do not repeat the original banner's “Works on All Job Boards” as a verified portfolio claim. No live third-party job board was needed or tested.

### Original PDF → selected-role heuristic review

The original document viewer opened the uploaded 72-word fictional resume. In the **analysis modal itself**, Job-Specific Analysis → Fieldnote's Frontend Engineer role → Start Analysis sent the selected `job_id` to the real backend. `document-verification.json` records the actual response. Result: overall 64/100, formatting 80, keywords 34, readability 60, technical skills 100, soft skills 0; role summary technical 100%, requirements 40%, keywords 34%. The film shows the existing category reasons and found/missing term lists.

All model keys were absent and the backend was isolated from external provider egress. The application header still says “Advanced AI Analysis”; the film's persistent editorial band explicitly identifies **LOCAL RULE-BASED FALLBACK / NO MODEL CALL**. These are the app's own checks, not measured hiring outcomes, a certified ATS score, or AI output. The rule engine uses contact/section/action-word/bullet/date and role term checks (`backend/app/domain/documents/service/analysis.py`). The role-aware cache includes document/job IDs plus SHA-256-derived resume and job-context hashes and expires after 30 days (`.../cache.py:44,73–147,220–236`).

The separate DocumentsPage Compare-to-Job shortcut does not retain its selected job (`newfront/pages/documents/DocumentsPage.tsx:110`); the successful film uses the modal's actual selector. The document list's status early return also bypasses its later text search. These paths were not portrayed as successful.

## Source-backed depth beyond the films

| Subsystem | Concrete implementation | Evidence boundary |
| --- | --- | --- |
| Personal data | Current-user resolution from cookie/bearer token followed by DB lookup; user-scoped preference storage; document ownership checks | Login, owned jobs/documents demonstrated. No penetration-test claim. `api/deps/auth.py:65–212`; `api/routers/preferences.py:155–164,229–269`; document preview/upload services. |
| Document storage | UUID-oriented file names and sidecar metadata; temp-write then replace; PDF/DOCX parsing paths and preview/download handling | PDF upload/preview and analysis demonstrated. All formats not exercised. `infra/files/document_store.py:248–252,475–498`; `domain/documents/service/crud_upload.py`; `preview.py`. |
| Optional AI | Extraction, cover-letter and time-aware interview preparation provider adapters; prompt context includes selected job, resume and supporting documents | Inspected only. No provider result fabricated. `infra/external/ai_preparation_service.py:414–502`; `ai_cover_letter_provider.py`; `openai_llm.py`. |
| Provider accounting | Usage records retain endpoint/type/user/model/tokens/cost/latency/success; admin endpoints expose filtered records/statistics | Source only. Do not say every provider path is covered. `infra/external/llm_tracker.py:713–777`; `api/routers/admin/llm_usage.py:33–99,114–210`. |
| Cost boundary | Redis daily spend check, accumulation and per-user request limits | Intended controls, not a concurrency-hard spending guarantee. Daily budget check **fails open** on Redis errors (`llm_tracker.py:60–70`); AI/analysis per-user limiters **fail closed** (`infra/security/rate_limiter.py:441–454`). This distinction matters. |
| Session controls | Refresh rotation, revocation, HTTP-only configurable secure/same-site cookies, session listing | Source inspected; basic login used. Refresh cookie route details and all revoke flows not certified. `api/routers/auth/core/refresh.py:178–204,258–272`; `auth/sessions.py`. |
| WebSocket boundary | Random 30-second one-use ticket stored in Redis and consumed with transactional GET+DELETE | Source only; not presented as a recorded realtime delivery. `infra/security/ws_tickets.py:33,49–53,69–86`. |
| Encryption / 2FA | Fernet field adapter; production requires encryption key; TOTP enroll/verify and hashed backup code code | Source only. Actual SecuritySection does not expose full 2FA. Disable path imports a nonexistent singular `security.password` module (`auth/twofa.py:200`). Avoid complete 2FA claim. `infra/security/encryption.py:29–48,89–114`. |
| Operations/admin | Admin dependency requires role; user/email/IP ban records and LLM statistics; local Docker PostgreSQL/Redis/mail sink; scheduled cleanup | Source only beyond the isolated backend run. `api/deps/admin.py:98–121`; `api/routers/admin/users/bans.py`; `main.py:87–115`; `docker-compose.yml`. |
| Notifications | React email templates and an internal renderer with production key gate and template path validation; reminder-related workers | No email/push/calendar delivery demonstrated. Several reminder loops return immediately (`infra/workers/reminders_runner.py:114,235`). Settings UI presence is not delivery proof. `backend/emails/server.js:13–41,50–76`. |

The backend has domain, infrastructure, repository and router divisions. “Layered modular backend” is accurate. Calling the domain pure or the system a collection of independently operated microservices would exceed the actual dependency boundaries. The document optimizer currently appends keyword text/goals (`domain/documents/service/generation.py:144–172`); do not describe it as proven high-quality resume rewriting. Cover-letter code has an explicit template fallback.

## Supporting probes deliberately excluded

`support-verification.json` records a Remote filter request returning HTTP200 but no results despite remote-labeled fixture records. The notification preferences form displayed a success toast after its POST returned HTTP422, and reload did not retain the toggle. This follows the frontend helper not checking `response.ok` (`newfront/features/profile/api.ts:282–289`). The generic preference persistence backend exists, but this UI flow was not successfully demonstrated. Separate job-preference/career-goal update endpoints are stubs (`api/routers/profile/preferences.py:135–149,258–273`). Analytics returned an application total while several charts stayed zero; its built-in demo data was not substituted for backend proof. None of these screens is selected for publication.

## Capture and editorial provenance

Reused the earlier dedicated `portfolio-applytide-tour` Docker project, retained fictional volumes, frontend4340/API4341, PostgreSQL5441, Redis6381 and local MailDev1081. Recipe and the two earlier migration prerequisite repairs remain documented in `.qa/product-tours/applytide/README.md`; no original migration/UI file was changed. The new job fixture used loopback4342. Backend egress and provider keys remained unavailable; no outbound workers were started.

Screenshots are original Playwright Chromium1600×1000 at DPR2 (3200×2000), except the native extension popup380×480 at DPR2 (760×960). Lossless compositor PNG frames, timestamp logs and scripts remain under this ignored directory. Final H.264/yuv420p/faststart films are 1600×1128, approximately25.7 and30.5 seconds. Editorial changes: concise intro slates, chapter bands, original-pixel focus crops for document results, genuine input-page/extension side-by-side composition, 1.25× extension pacing and final holds. No UI was generated, redrawn or replaced. Still originals remain available; focus rectangles are suggestions in source pixels, not altered screenshots.

`manifest.json` is the integration source of truth for final dimensions/durations, chapter descriptions, selected assets and capability groups. Original and edited key frames were visually inspected. Failed probes and the first timed-out recorder selector are kept only as ignored evidence, not presented as app success.

## Diagram recommendation

Use two connected tracks with explicit source-only labels: **browser page → DOM/structured/readable capture → extraction layers → owned job record**; **uploaded document + selected job → content-sensitive cache → optional provider / local rules → category/keyword result**. Below, a narrow boundary line connects current-user checks, Redis rate limits/tickets and usage accounting. This explains the engineering decisions with honest code-native geometry while the original screenshots provide the product evidence.
