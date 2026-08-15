# tomernaydnov.com

A one-page portfolio. About 300 words, in English and Hebrew.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things are

| | |
|---|---|
| `src/content/cv.ts` | **The entire site's content.** Bio, "now", skills, timeline, projects. Both languages. If you want to change what the site says, this is the only file you need. |
| `src/app/[locale]/page.tsx` | The one page. |
| `src/app/[locale]/work/[slug]/page.tsx` | A short page per project, generated from `projects` in `cv.ts`. |
| `src/components/Timeline.tsx` | The year strip and the unfolding rows. |
| `src/components/CopyEmail.tsx` | The only client-side JavaScript on the home page. |
| `src/app/globals.css` | Colours, two fonts, the spring, the print stylesheet. |

## Rules this site is built on

**Keep it short.** The home page is ~300 visible words. It was ~7,000 once, which is
why nobody read it. Adding a section means asking what it replaces.

**Don't overclaim.** Verbs used: *built, taught, kept running, supported, studied,
wrote, fixed*. Verbs avoided: *architected, owned, drove, scaled, spearheaded,
delivered end-to-end*. "Founded" doesn't appear anywhere — he built Arc and kept it
running, which is true and smaller. No invented methodology, no framework, no
aphorisms.

**Skills are contexts, not levels.** "I build with / I studied with / I teach" —
those are facts. A progress bar reading "Python 85%" is an opinion, and it is the
thing that makes early-career portfolios read as junior. Deliberately not listed:
`OOP` and `algorithms` (course names every graduate has), and `microservices` /
`LLM integration` (true, but as badges they read senior-architect). Those appear as
plain verbs inside project descriptions instead.

**Work and study are one list.** Not two. Ben-Gurion 2021–2025 sitting directly
underneath Isracard, Nitzanim and Leyman is what shows he worked through his degree.
Two lists would hide it.

**Every project page ends with what he'd do differently.** A page with only wins on
it is an advert.

## Adding a project

Append to `projects` in `src/content/cv.ts`. The route, the sitemap entry and the
home-page card all follow automatically. `detail` is three short paragraphs;
`rebuild` is required.

## Notes

- Bilingual EN/HE with real RTL. Every string is typed `Record<'en'|'he', string>`,
  so a missing translation is a compile error rather than a hole in the page.
- Timeline rows use native `<details>`. The spring open is Chromium-only
  (`interpolate-size`); everywhere else the row snaps open, which is fine.
- `Ctrl+P` prints a clean A4 résumé — every row is forced open in CSS, so it needs
  no JavaScript.
- Four runtime dependencies: `next`, `react`, `react-dom`, `@vercel/analytics`.
