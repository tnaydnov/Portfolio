# Eventa: four product worlds, one event lifecycle

Audited 2026-09-12. Source repository `tnaydnov/eventa`, clean `main`, revision `103f9daeb56d30db13c7277a7d8259f2ed9d287c` - unchanged from the earlier capture. Original checkout was read only. Runtime evidence comes from an isolated snapshot, local Supabase and fictional people/events. No external order, payment, SMS, email or paid model request was submitted.

## Coverage and confidence

`file-coverage-ledger.md` inventories all **627 tracked files**, including 396 authored-source files, 137 authored tests, 12 authored tooling files, 21 configuration files, seven documents, three generated metadata files, 50 binary assets and one embedded font. `files.json` includes complete-path classification, byte sizes, SHA-256 hashes, line counts and structural anchors. Every non-binary text file received a full-file structural indexing pass. Domain indexes span all eleven application/infrastructure domains. Focused semantic review covers the important production paths described below; the ledger records those separately. This is **not** a claim that every one of roughly 100,000 text lines was manually reviewed or that all 137 tests were run.

The selected manifest has 14 screens and three edited films. Source citations are pinned to the revision. Runtime assertions are in `organizer-clean-verification.json`, `customer-clean-verification.json`, `guest-clean-verification.json`, `operator-assets.json`, `report-verification.json` and `media-playback-checks.json`. All screenshot pixels originate in the actual product; editorial film rails and crops surround those pixels. Original full views and raw PNG recordings remain available.

## Correct audience map

| Audience | Surface | Actual job and boundary |
|---|---|---|
| Prospective customer / event owner | `/`, `/how-it-works`, order wizard | Understand the concept, configure event details, preview a background, select a printed QR-poster design and review the order. The public phone demo is authored illustration, not the attendee app. |
| Organizer / client | `/portal/[token]`, `/portal/[token]/report` | Prepare and manage the guest list through an event-specific bearer link; see the later client report. This person is not granted the admin console. |
| Event guest | `/[eventSlug]` mobile app | Join an event, establish a profile, discover participants, like/connect, chat and control personal boundaries. |
| Platform operator | `/admin` | Manage events/orders/participants, inspect conversion and safety analytics, manage reports and provider-dependent operations. Admin authentication and role/session checks are separate from guest/portal access. |

Evidence: [customer explanation](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/how-it-works/page.tsx#L19), [portal entry](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/portal/%5Btoken%5D/page.tsx), [portal token creation](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/admin/events/%5BeventId%5D/portal-token/route.ts), [secure request guard](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/route-helpers.ts#L223), [operator sidebar](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/admin/_components/Sidebar.tsx).

## The most useful portfolio stories

### 1. Make it your event - customer website

The strongest customer story is personalization that carries from screen to venue. The original wizard accepts a background image, opens a portrait cropper, previews the result on a phone, offers distinct QR-poster templates and supports a design note before an editable order summary. This is more concrete than a generic landing-page scroll. The native how-it-works page supplies context but its embedded phones must remain labelled as the marketing-site demo.

Verified: actual original upload/crop controls, background preview, template selection, detail modal, design note and editable summary. The flow stops before submission. Film `customer-personalization.mp4` (21.4s) and selected three configuration screens cover this sequence. Native keyboard activation was used during lossless CDP recording because that capture mode affected pointer coordinates; no product handlers or DOM state were replaced.

Source: [StepBackground](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/_components/wizard/steps/StepBackground.tsx#L152), [StepPoster](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/_components/wizard/steps/StepPoster.tsx#L80), [StepSummary](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/_components/wizard/steps/StepSummary.tsx), [ImageCropper](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/components/ImageCropper.tsx#L90).

### 2. Prepare the room - real organizer portal

The portal has its own event identity, contact consent gate, template/upload UI, actionable validation result, paginated guest list, timing explanation and built-in invitation preview. Source enforces a five-hour preparation lock before the event, plus archived-event restrictions. Contact fields are encrypted with searchable phone blind indexes. The isolated planning fixture has messaging-enabled access because the route currently requires that flag; outbound delivery remains disabled.

Verified: UI consent acceptance; import of a fictional 14-row CSV resulting in 12 valid contacts, one in-file duplicate and one invalid row; encrypted stored phone values; original list and invitation preview. The invitation is a built-in illustration, not a sent SMS or WhatsApp message. A separate ended-event fixture provides the report chapter; the film does not claim the event took place during recording.

Source: [consent UI](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/guest-upload/%5Bslug%5D/_components/GuestConsentGate.tsx), [portal lock/access and encrypted list](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/guest-portal/%5Btoken%5D/route.ts#L20), [encrypted upload writes](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/guest-portal/%5Btoken%5D/route.ts#L374), [parser/validation](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/guest-upload.ts), [invitation preview](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/guest-upload/%5Bslug%5D/_components/MessagePreview.tsx).

Important limits: the consent acknowledgement is stored, but the upload branch does not visibly enforce a prior consent record. Cross-file deduplication still queries removed plaintext `phone`, with the query error ignored; only within-upload deduplication was verified. The single-contact branch similarly writes stale `guest_name`; it was not presented as working. Name search is deliberately skipped after encryption although the placeholder still implies it. The invitation has an encryption badge despite an SMS disclaimer; do not repeat this as an end-to-end encryption claim.

### 3. Meet on your terms - actual attendee app

The guest surface supports event-scoped identity, profile photos/preferences, discovery, likes, mutual connections and conversation. The deeper story is that connection and personal control share the same product: a text draft survives an interruption, reconnecting persists it once, and a deliberate block removes the relationship and its conversation.

Verified through two real browser sessions: a failed offline send remains in a durable outbox; reconnection delivers it to the second browser; the database has exactly one matching persisted message. Then the original block confirmation creates a block with `had_like`, `had_match`, `had_conversation`, removes the pair's conversation and removes its messages. These assertions apply to fictional profiles only. The final film preserves the product's offline banner and retry state. Only the Next.js development issue badge caused by the intentional network failure was hidden from the capture.

Source: [durable text outbox and stable idempotency key](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/chat-outbox.ts#L1), [secure likes/matching](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/secure/likes/route.ts), [conversation boundary](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/secure/conversations/route.ts), [block context and cascade](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/secure/blocks/route.ts#L36), [confirmation copy](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/components/BlockConfirmDialog.tsx).

Privacy distinction: self-deletion is not the same operation as blocking. Despite stale comments/docs describing total deletion, the account route intentionally retains likes, blocks, conversations, messages and activity for analytics, deletes photos/notifications and anonymizes the participant's personal fields. Do not claim immediate total erasure. The text outbox has a 50-entry bound; image recovery has narrower session persistence and was not generalized from this successful text test. [Actual account deletion](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/account/delete/route.ts#L64).

### 4. Understand the night - client reporting and operator oversight

Six analytic modules produce event engagement, conversion, timing, demographic/crosstab, connection-network and safety information. A curated subset becomes a persisted client report. The operator retains the broader dashboard and safety/conversion views. These are separate audiences, not a single interchangeable admin screenshot.

Verified: the original report generation route computed a report from local synthetic records with AI disabled; the client page rendered report totals, funnel and demographic breakdowns; the admin navigation rendered original conversion and safety views. Numbers are fixture outputs, not adoption or business results. Funnel stage rows, including OTP stages, were seeded deliberately; they do not prove SMS delivery. The report's funnel implementation counts stage rows despite a unique-session comment, so repeated telemetry can inflate values. Do not market the displayed funnel as a validated unique-person conversion metric.

The client PDF button did not produce a download in two local attempts. The server PDF endpoint returned HTTP 200 and a document, but rendered numeric glyphs were missing. It is retained only as diagnostic evidence, not selected media. The client hourly chart had no visible bars even though payload and peak label were present. Selected closeups focus on working funnel and audience graphs; the original full report remains available rather than a fabricated repair.

Source: [report generator](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/report/generate.ts), [curation](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/report/curate.ts), [optional AI](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/report/ai-summary.ts), [funnel computation](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/analytics/funnel.ts), [client report](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/portal/%5Btoken%5D/report/page.tsx), [operator analytics](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/admin/_components/analytics/AnalyticsDashboard.tsx).

## Decisions and wider domains

| Decision visible in source | Value | Cost / actual proof boundary |
|---|---|---|
| Separate customer, client-token, guest-session and operator surfaces | Each audience receives its own task and authority model. | Access paths are implemented separately and need separate validation; portal consent is not a complete server gate. |
| Encrypt contact values and retain searchable blind indexes | Organizer data can be stored without plaintext phone/name columns. | Encryption migration left stale query/write paths and curtailed name search; verified import used the functioning encrypted bulk path. |
| Stable text-message idempotency keys plus local outbox | Retry after a network interruption without duplicated text. | Requires local persistence and replay coordination; proved through two browsers plus DB, not generalized to every asset type. |
| Capture interaction context before destructive blocking | Safety analytics retain the relationship context while the conversation is removed. | Self-deletion uses different retention rules; they must be explained accurately. |
| Separate curated client reporting from operator analytics | Event organizers can receive a readable summary without full admin access. | PDF export and hourly chart currently need repair; summary text can depend on optional AI. |
| Provider adapters and scheduled dispatch/reconciliation | Payment/SMS/email/moderation operations have explicit server boundaries. | No provider outcomes were executed or measured by this capture. |

**Moderation and safety:** the moderation engine has an OpenAI moderation call and optional second opinion, explicit thresholds and different precheck/postcheck handling; provider errors can defer/fail open. A moderation queue exists, but no synthetic model score was staged as a real decision. No model request occurred. [Engine](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/moderation/index.ts), [queue](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/admin/_components/moderation/AdminModerationQueue.tsx).

**Payments and operations:** Invoice4U callback/webhook processing verifies provider state rather than trusting a browser return. The reconciliation cron is read-only anomaly detection (bounded batch/time); it does not silently repair money state. Customer checkout screens were inspected but no order was submitted. [Webhook](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/payment/webhook/route.ts), [reconciliation](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/app/api/cron/reconcile-payments/route.ts).

**Notifications:** OTP, pre-event invitations, in-app notifications, reminder/report email and SMS dispatch code are separately inventoried. TextMe's disabled mode returns a stub success, which must never be described as delivery. The local heartbeat also logged a missing `pending_sms.dispatch_after` field; that unexercised provider pipeline was not repaired for media. [SMS provider](https://github.com/tnaydnov/eventa/blob/103f9daeb56d30db13c7277a7d8259f2ed9d287c/src/lib/messaging/sms-provider.ts).

**Unwired operational UI:** `CalendarView` and `AdminReliabilityView` are present in source but repository search found no imports into current admin navigation. They are source-only work, not available screens in this capture. Do not promise a demonstrated calendar/reliability workflow.

**Data and delivery:** Supabase migrations, schema/config, deployment configuration, service-worker/retry code, telemetry and test domains are recorded in their coverage indexes. The isolated runtime needed the previously documented base-schema/bootstrap compatibility adjustments and local image handling. It is not a claim that a fresh clone starts without setup or that all migration/provider paths are production ready.

## Source-to-runtime architecture

1. Four original Next.js/React interfaces: public customer wizard, event-token client portal, event-scoped attendee app and operator console.
2. Server route boundaries validate inputs and event/session/role context; matching, messages and block writes persist via server-backed APIs. Guest text outbox and realtime subscriptions handle delivery/recovery.
3. Supabase Postgres stores event identity/relationships/messages/contacts/reports; Storage holds images; Realtime distributes changes. SMS, SMTP, Invoice4U and optional moderation/report AI remain external adapters, disabled or blocked for these captures.

The final capture preserves the actual Hebrew UI and uses English editorial captions. Desktop source PNGs are 3200×2000; the clean guest film source is 780×1688. Some still-only mobile captures are 1170×2532. Films are 1600×1000, 30fps H.264 CRF18, yuv420p, MP4 faststart. Each lossless PNG segment is encoded once, then concatenated without re-encoding. `manifest.json` contains scene chapters and exact source-pixel focus rectangles. Original capture scripts and data are retained under ignored QA directories.
