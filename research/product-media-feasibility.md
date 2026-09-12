# Real product media and demos for the portfolio

Research and local checks: 12 September 2026. Scope: the four featured projects, Arc, Browser Coder, Applytide and Eventa.

**Yes: the setup, sample data, browser operation, screenshots and recordings can be handled autonomously. Tomer does not need to start the apps or record them manually.** Repository access is available, and the current machine has browser automation and the relevant runtime foundations. A complete public demo is feasible for selected workflows, but requires more preparation than recording an app locally.

This investigation includes a successful local Browser Coder run and media capture. Arc, Eventa and Applytide were inspected for readiness; their complete local workflows have not yet been run. Recommendations below distinguish those observations from proposed implementation.

## Three useful deliverables

| Format | What the visitor gets | What it demonstrates |
| --- | --- | --- |
| Actual screenshots and short recordings | Immediate visual evidence, with no product login or backend loading time | The original app operated in a documented environment. Captions distinguish real backend behavior from simulated integrations. |
| Interactive demo using the original interface | Working navigation and a small, resettable scenario using fictional data | Original frontend behavior. A local data adapter can preserve the actual components, styles and interactions without operating every original service. |
| Separate working application | Real forms, execution, persistence and supported multi-user behavior | The complete supported flow, running on an isolated demo backend. This needs hosting, session isolation and ongoing maintenance. |

Browser automation can operate the interface, assert a result, and export screenshots and video. Explicit capture dimensions keep recordings sharp; the video file is finalized when its browser context closes. [Playwright screenshots](https://playwright.dev/docs/screenshots), [Playwright videos](https://playwright.dev/docs/videos).

An original-interface demo can substitute deterministic sample API responses while using the application's existing rendering code. This makes reliable capture possible without sending real SMS, email or payment requests. It must be described as a demo with simulated services; it does not establish that those external services worked. [Playwright API mocking](https://playwright.dev/docs/mock).

## Findings by project

### Browser Coder: demonstrated locally

The original editor and execution server were started from a disposable source archive. A harmless Python program was entered through the real interface and executed locally. Its input was `[2, 4, 6]`, squared output `[4, 16, 36]`, and sum `56`; the run exited successfully. The [screenshot](proof/browser-coder/browser-coder-python.png) and [8-second recording](proof/browser-coder/browser-coder-python.webm) show that real run. The [capture manifest](proof/browser-coder/README.md) documents the environment and two unrelated starter-preload errors.

Source: [Browser Coder at the captured revision](https://github.com/ninasokolov8/browser-coder/tree/7d3cae91ff9cc73001d7fcfa0aa3b315cebb2aeb). This verifies Python execution for that scenario, not every supported language, debugger operation or integration.

**Best media:** an editor-and-output still; a short edit/run recording; a separate verified debugger demonstration; a Turtle result once its drawing/replay workflow has been exercised. The first two are already proven possible here.

**Best interactive option:** the original editor in its existing embedding mode, backed by a separate, constrained execution environment. The currently linked server responds over HTTP but did not accept HTTPS in this check. An HTTPS portfolio cannot directly embed an HTTP application; the demo needs HTTPS for its page and API, plus an explicitly permitted host origin. [MDN mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content).

The execution service runs submitted programs. A public version needs resource limits, restricted network access and session isolation. This is a deployment requirement, not an obstacle to recording harmless programs locally.

### Arc: strong demo foundations, fresh instance still to verify

Arc's source supplies English sample lessons, synthetic classroom activity, submission/review history and role-specific demo access. Cached Docker tooling can run PHP and SQLite. These are concrete ingredients for capturing populated original screens without borrowing real learner records.

**Best media:** one clear learning loop, student submission → instructor feedback → student revision. Add focused stills for content authoring, classroom management and program reporting. This connects the product to Tomer's current work in EdTech leadership and content development better than a collection of unrelated dashboard screenshots.

**Next implementation:** provision a new source snapshot, database, storage directory and local fixture accounts; build assets; seed the English example; then operate the real roles in separate browser sessions. The existing shared Arc installation was left untouched. A fresh migrated, populated instance has not yet been booted in this investigation.

Current development and main revisions differ. Media from a development build must be labeled accordingly, rather than automatically presented as the production release. Detailed private-repository evidence remains in the local audit notes.

**Best interactive option:** a separate seeded demo opened from the case study. The existing product sends headers that prevent embedding in this portfolio. An iframe cannot override the application's own embedding policy. A writable demo also needs independent visitor state, rather than a single shared account whose sample work everyone can change. [MDN frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

### Applytide: frontend builds; demo data needs to be created

The original production frontend built successfully during this audit. Its job board, application pipeline, documents, analytics and reminders are present in source. The backend has a connected migration history and a local Docker setup, but a fresh full-stack startup and usable seeded account remain unverified. No ready-made capture fixture suite was found.

Source: [Applytide at the audited revision](https://github.com/tnaydnov/Applytide/tree/a040d14d5c45491e3db1651c0d4daa67a218c32f).

**Best media:** add a fictional job → move its application through the pipeline → add a note/document → create a reminder. This flow can demonstrate the core product without paid AI or live email. A second capture can show the browser extension importing a sample listing, once that integration has been exercised. Extension automation is supported in a separate persistent Chromium context; it does not require using Tomer's personal browser profile. [Playwright Chrome extensions](https://playwright.dev/docs/chrome-extensions).

**Best interactive option:** the original frontend with a small stateful sample-data adapter. Keep a useful subset of the actual routes and reset the dataset per visitor. A full backend demo is also plausible after isolated database setup, authentication and provider containment are tested. The extension itself belongs in a video or separate extension demonstration; it cannot be installed inside a portfolio iframe.

AI-generated documents and notification delivery should only appear as executed features if actually verified. Sample AI responses can be included with clear labeling. The project is archived, so footage should describe its preserved implementation rather than imply ongoing product development.

### Eventa: existing capture scaffolding; backend setup needs work

TypeScript passed during the audit. The source already includes browser scenarios and API fixtures for joining, profiles, attendees, matches, chat and organizer views. These need refreshed fictional dates, local fixture photos, consistent state changes and stronger visible-result checks before producing polished recordings.

Source: [Eventa at the audited revision](https://github.com/tnaydnov/eventa/tree/103f9daeb56d30db13c7277a7d8259f2ed9d287c).

**Best media:** a mobile event journey, join → profile → discover → mutual match → conversation, plus a compact organizer overview. Use two separate sample participants when demonstrating actual mutual matching and messages.

**Best interactive option:** a resettable event with a few fictional attendees and the original participant interface. Initially it can use a stateful fixture adapter. A complete demo needs a separate database, authentication, storage and realtime environment. Supabase's CLI and Docker support a local stack for this purpose; the repository's particular schema/bootstrap still needs to be reconciled and tested. [Supabase local development](https://supabase.com/docs/guides/local-development).

Existing seed scripts should not be pointed at an existing database. New capture fixtures must target a disposable instance. SMS, payments and mail need explicit local test substitutes. The existing mocked chat scenarios do not establish functioning multi-user realtime; that requires a separate real-backend test with two browser sessions and persistence checks.

## Recommended portfolio treatment

Keep the work page compact. Each project gets one excellent real screen, a one-line explanation and a clear link to its case study. The richer media belongs inside that case study:

1. **See it immediately:** a crisp poster frame showing the most understandable product state.
2. **Understand the flow:** a 20–40 second, user-controlled recording with concise captions.
3. **Inspect details:** three to five selected screenshots with one useful sentence each.
4. **Try it optionally:** an original-interface sandbox where it adds value. Open a larger dedicated view on phones to avoid cramped controls and nested scrolling.

These are proposed deliverable sizes, not already completed media sets. Use responsive WebP/AVIF stills and compressed MP4/WebM with poster images, native controls and on-demand loading. Keep essential facts readable without watching a video. Avoid loading several live apps or autoplaying several recordings on the work page.

The product screens should retain their own visual identity. The portfolio supplies consistent framing, captions and spacing; it should not recolor or redraw the applications to imply UI that was never built.

## Autonomous production workflow

Create isolated copies of the chosen source revisions, install from lockfiles, supply fresh local configuration, and build repeatable fictional datasets. Then automate a short scenario, assert the visible result, capture desktop/mobile compositions and trim the successful recording. Review every exported frame for legibility, clipping, loading errors and accidental personal data before adding it to the portfolio.

Every asset should have a small manifest recording the source revision, capture date, viewport, scenario, sample-data origin and whether backend/provider behavior was real or simulated. Generated avatar artwork is unrelated to these product captures: product proof comes from running the product.

Recommended order: Browser Coder → Arc → Eventa → Applytide. This starts with the demonstrated runtime, then the strongest built-in sample-data support, then the existing browser fixture suite, and finally the project needing a new fixture harness. Capture useful media first; select public interactive deployments after their local flows work.

There is no identified requirement for Tomer to manually operate or record these four apps. Missing account access, non-exportable assets or an external service challenge could still require a specific input if encountered. Public hosting choices and any service costs are separate from the local capture work. The research does not claim that all four public demos have already been deployed.
