# Tomer Naydnov - Personal portfolio

An English-only portfolio for a software engineer who loves creating useful products from scratch. The homepage introduces Tomer with a dimensional, animated personal portrait and direct access to his work, background, CV and contact details. His current EdTech role supports that broader identity: understanding people, shaping ideas, building software and continuing to improve it.

## Routes

- `/`: a personal welcome, layered portrait, current EdTech projects and a short approach.
- `/work`: four compact selected projects and an earlier-engineering index.
- `/work/[slug]`: project ownership, real product tours, recorded workflows and optional technical detail.
- `/about`: current responsibilities, experience, education and approach.
- `/contact`: email, copy-email action, CV and external profiles.
- `/system`: permanent redirect to About.

The previous `/en` and `/he` URL prefixes permanently redirect to the equivalent English route and preserve query strings. There is no locale selector, translation layer, alternate language content or language-prefixed canonical URL. The sitemap, metadata, social preview, icon and not-found pages use the same English identity.

## The personal welcome

`src/components/welcome/WelcomeHome.tsx` introduces Tomer through a mist-and-teal technical composition. A modest greeting, role descriptions and immediate Work/About links sit beside his personal portrait; the portrait follows the greeting on small screens. `HomeDetails.tsx` connects his current role to Arc and Browser Coder, then shows his approach and a contact invitation.

`LivingPortrait.tsx` animates custom artwork based on the photo Tomer supplied. This is a **2.5D layered portrait**, not a rigged or rotatable 3D model. A shared portrait supplies the body and hand; an aligned eye layer supplies a blink. An SVG filter keys the white studio background on each image before its wrapper is clipped or animated. Keeping the filter off the moving layers' ancestor avoids WebKit's animated-child compositing bypass ([WebKit issue 219729](https://bugs.webkit.org/show_bug.cgi?id=219729)). The Web Animations API provides a brief welcome wave, while CSS adds occasional blinking and subtle breathing. Real CSS perspective separates the portrait, backdrop and floating panels; mouse movement shifts the view through a small, eased angle.

The greeting wave plays once after the portrait loads and enters view. Visitors can replay it or pause animation. Reduced-motion preferences show a composed still portrait; the greeting button still returns a text hello. Animation pauses offscreen and in hidden tabs. Timers, observers and animations are cleaned up on unmount. There is no audio or camera/microphone access.

The introduction and all navigation/content are server-rendered and remain useful without JavaScript or a loaded portrait. Homepage artwork is served as optimized local WebP; the social preview uses a pre-sized PNG. [Asset provenance and generation prompts](public/images/README.md) are included. Selected project covers use real screenshots; earlier-project illustrations remain code-native. Shared chrome uses cool mist, deep ink and teal. Product studies introduce their own contained palettes: Arc's aurora, Browser Coder's blue workbench, Applytide's paper workspace and Eventa's warm editorial treatment.

## Content and demonstrations

Content lives in `src/content/` as plain English strings and arrays. Ownership and lifecycle remain explicit:

- Arc and Browser Coder are co-developed by Tomer and one coworker, who continue to support and expand both live products. Tomer confirmed on September 13, 2026 that their combined learning platform serves 3,000+ students, instructors and managers. This is one shared audience, including staff; it is not a per-product count or an independently measured active-user metric.
- Browser Coder is the educational coding workspace, with embedding, debugging, execution feedback, graphics and reliability among Tomer's contributions. The public platforms and the inspected capture revisions remain distinguished.
- Applytide is a solo-created, archived job-search platform with public source.
- Eventa is a solo-created, discontinued event-connection product with public source.
- The remaining projects use Tomer's September 13 confirmation of his own development work, retaining the university/capstone context and supplied-framework boundaries of earlier projects. Historical source audits retain their original dated observations.

The four selected products use `ProjectWorldPage.tsx`: actual screenshots and edited recordings captured from their original applications running locally with fictional data. `src/content/tours/*-world.ts` defines each product's visual stories, audience, technical decisions and evidence boundaries; `media.json` records source assets and crop coordinates. Every chapter is directly reachable through sticky navigation. Each product's public media directory includes a pinned source revision, capture manifest, detailed review and downloadable 3200 × 2000 presentation board. Work cards use the actual app imagery.

`ProductMedia.tsx` provides native video controls, chapter seeking, downloadable recordings and a full-resolution screenshot dialog with keyboard navigation and zoom. Videos are requested only after activation; playing another film pauses the previous one. Choosing a chapter brings its video into view and respects reduced-motion preferences. Editorial image crops use original pixels, while the viewer retains the full screenshot. Architecture, trade-offs and limitations use progressively disclosed sections.

The seven earlier projects use `EngineeringStudyPage.tsx`, `EngineeringVisual.tsx` and the source-backed records in `src/content/engineering/`. Their diagrams explain implementation rather than imitating application screenshots. Coalition Race additionally visualizes actual committed fixture totals. No fresh runtime or benchmark is claimed for these source studies. Individual ownership and coursework context remain explicit.

[Capture methods, verified workflows and local restoration notes](research/product-tours-capture.md) document the evidence behind the tours. Private source archives and capture credentials remain outside publication.

The [deeper evidence review](docs/project-evidence-review.md) covers all eleven repositories, the selected capabilities, 46 new screenshots, 12 new edited films and the boundaries of each audit. It distinguishes complete file inventories from focused semantic review, and source behavior from exercised application behavior. The new captures supplement selected earlier evidence; not every historical recording is featured in the current tour.

The private, ignored `TRUTH_SOURCE.md` is the factual ledger. The September 2026 refresh uses the supplied Arc and Browser Coder product demos, authenticated repository audits and the owner’s current-role correction. LinkedIn blocked public access; its current text was not verified. `npm run truth:check` runs before production builds and rejects known blocked claims and Hebrew script in publication sources. Historical language-support facts about the original products remain in their English technical descriptions.

`public/Tomer Naydnov.pdf` is the refreshed one-page CV. `scripts/generate_cv.py` reproduces its layout from verified portfolio facts. Canonical metadata and the sitemap use `https://tomer-naydnov.com`.

## Development

Next.js 15, React 19, TypeScript and Tailwind CSS 4. Next/font serves Space Grotesk, Manrope and JetBrains Mono. Vercel enables analytics.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run truth:check
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium webkit
npm run test:e2e
npm audit
```

Playwright covers Chromium and WebKit, all eleven project routes and the main pages at 320, 390, 768, 1366 and 2560px; identity and immediate navigation; portrait loading, greeting replay and pause/resume; reduced motion; image failure; shared navigation and mouse-depth pause behavior; native touch scrolling; no-JavaScript navigation; source-asset integrity, chapter visibility, captions and screenshot inspection; menu focus; disclosures; clipboard; legacy redirects; metadata, CV and social images. The wave regression checks each image's background filter and inspects three visible hand poses at four widths for exposed white pixels. Browser-specific touch and clipboard checks run in Chromium.

Tests start or reuse a server on port 3000. Set `PLAYWRIGHT_SERVER_COMMAND` to `npm run start -- --hostname 127.0.0.1` to test a production build. Temporary screenshots and traces stay in ignored QA/test-output directories. Browser emulation validates layout and behavior; it is not a physical-device performance benchmark.
