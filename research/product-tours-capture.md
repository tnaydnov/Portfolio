# Real product tours — September 2026

This implementation follows the feasibility audit in `product-media-feasibility.md`. The four products were operated from isolated source snapshots with fictional data. The portfolio presents the original applications through 25 screenshots, six edited recordings and technical explanations.

## What the tours demonstrate

| Product | Visitor journey | Actual behavior verified |
| --- | --- | --- |
| Arc | Student lesson → instructor review → student revision; authoring, school and program views | A first submission, published revision request and second submitted version were verified in the local database. |
| Browser Coder | Write/run → pause/inspect → compare history; draw/replay | Python returned the expected result; the debugger paused and stepped through a real session; Turtle replay used the recorded command stream. |
| Applytide | Save an opportunity → attach a resume → advance the application → note → reminder | The original forms performed real backend mutations. Application state, note, PDF attachment and reminder survived a new authenticated browser context. |
| Eventa | Customer website/setup → event entry → profiles/matching → conversation; organizer analytics | A reciprocal like created a connection; two separately authenticated users exchanged messages that persisted and survived reload. |

## Evidence and source revisions

Each public media directory contains `capture-manifest.json`, with the source revision, exact asset dimensions, chapter times, demonstrated behavior and capture limitations:

- [Arc manifest](../public/media/projects/arc/capture-manifest.json) — development `43dfaf6e0a548f9e382a96744aad12a8611aad43`.
- [Browser Coder manifest](../public/media/projects/browser-coder/capture-manifest.json) — main `7d3cae91ff9cc73001d7fcfa0aa3b315cebb2aeb`.
- [Applytide manifest](../public/media/projects/applytide/capture-manifest.json) — archived `a040d14d5c45491e3db1651c0d4daa67a218c32f`.
- [Eventa manifest](../public/media/projects/eventa/capture-manifest.json) — main `103f9daeb56d30db13c7277a7d8259f2ed9d287c`.

These are source snapshots. Arc production follows a separate release. Applytide remains archived and Eventa remains discontinued; running them for capture does not change their public lifecycle.

## Capture and editing

Desktop screenshots are 3200 × 2000, captured from a 1600 × 1000 browser viewport at device scale factor 2. Eventa's guest screenshots use a phone viewport with retina source pixels. WebP exports preserve the original UI and are available at full resolution through the portfolio's screenshot viewer.

Recordings show original controls and actual state changes. Setup screens and idle time are trimmed; chapter bands sit outside the app's pixels. The final videos use H.264, yuv420p and faststart for browser playback. Browser Coder, Applytide and Eventa's customer film use lossless Chromium compositor frames before a single video encode to preserve small text. Eventa's attendee film uses retina PNG frames and preserves the phone's portrait orientation. Arc's native recording was inspected at output size and retains readable response and feedback text. Individual manifests describe timing changes and the exact capture method.

Browser Coder's editor font size was increased through the existing Monaco options for presentation. It runs two original sample Python programs; the tour does not claim that all six source language adapters were executed.

Applytide's personal workspace belongs to one fictional account. The film creates internal application records and a reminder; nothing is sent to an employer. The original dashboard's status/weekly-metric inconsistencies are documented and the dashboard is omitted from the selected tour. The UI was not redrawn to conceal them.

Eventa's original interface is preserved in its original language. The portfolio's headings, explanations and tour navigation remain English. Its existing customer-site preview is identified as a website feature, separate from the real locally running attendee application.

## Local restoration boundaries

- **Arc:** fresh SQLite and storage, current English demo curriculum, fictional role accounts and classroom history. A nested PostCSS configuration prevents the archived package build from inheriting the portfolio's configuration. Production data and storage were not used.
- **Browser Coder:** original browser workspace and local Node execution service with Python. Files are prepared through the app workspace API; Run, Debug, history and replay use the original controls.
- **Applytide:** original frontend and FastAPI source, dedicated PostgreSQL/Redis and document storage. The fresh migration baseline required three missing user columns to match the current ORM. These repairs stayed in the disposable capture setup.
- **Eventa:** original Next.js source and a separate local Supabase stack, with synthetic events, profiles, likes, conversations and analytics. Hosted image-transform assumptions were adapted to local signed original storage files. Capture uses the production single-mount lifecycle for realtime subscriptions; provider integrations are not represented as tested.

External SMS, payments, outbound email, OAuth/Calendar and paid AI calls were disabled or unused. A source-level architecture explanation can describe those integrations without suggesting the recording executed them.

The original project checkouts were preserved. Credentials, local databases, signed fixture links, raw recordings and source archives remain in ignored capture directories. Only selected media and public capture metadata are part of the portfolio.

## Portfolio delivery

`src/content/tours/media.json` contains the curated asset metadata; `index.ts` supplies concise product framing and technology layers. `ProductTourPage.tsx` provides immediate tour/engineering links, real product imagery, portal navigation and progressively disclosed technical detail. Home and Work covers use actual captured screens.

Screenshots have a native dialog with fit, full-pixel zoom, previous/next controls and focus restoration. Video files are loaded only after activation. Visitors can seek chapters, use native controls, download recordings and read text walkthroughs. Starting another film pauses the previous one. Direct screenshot and video links remain available without JavaScript.

The avatar was regenerated separately from the supplied identity photo. Its source dimensions, quality settings, generation brief and 2.5D rendering behavior are documented in [the portrait provenance](../public/images/README.md).

## Validation

The production build, TypeScript, ESLint and publication truth checks pass. All 30 Playwright tests pass, covering public routes at 320, 390, 768, 1366 and 2560 pixels, portrait behavior, accessible navigation, lazy media, chapter seeking, screenshot inspection and no-JavaScript fallbacks.

Additional Chromium and WebKit checks exercise all six films, chapter seeking and full-resolution screenshot inspection at 1440 and 390 pixels. No page errors or horizontal overflow were observed. A separate file audit confirms all 25 screenshot dimensions, six video dimensions/durations/codecs, posters and caption timestamps. The selected media totals approximately 13.3 MiB; videos are fetched only when activated. Browser emulation is not a physical-device performance benchmark.

## Technical references

The capture workflow uses [Playwright screenshots](https://playwright.dev/docs/screenshots), [Chromium's screencast protocol](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-startScreencast), [FFmpeg's documented filters](https://ffmpeg.org/ffmpeg-filters.html) and [Next.js image delivery controls](https://nextjs.org/docs/app/api-reference/components/image). Local runtime and source checks determine what each tour can actually demonstrate.
