# Pending Task — 2026-uruguay

This file tracks the **current in-progress plan**. Written before any execution begins.
Session resume point — contains full plan so work can restart from scratch if context is lost.

---

## Status: Active — Eleventy migration (feature/35-eleventy), 2026-03-20

**Current branch:** `feature/35-eleventy` (all Eleventy work is uncommitted — user must test before commit)
**Last stable commit on main:** `8863a61` (Update synthesis date label)
**GH issues driving this work:** #35 (Eleventy migration), #41 (URL redirect strategy), #44 (Pagefind search)

---

## What is built and working (not yet committed)

All changes are in the working directory on `feature/35-eleventy`. The Eleventy build runs via `npm run build` and outputs to `_site/`.

- [x] Eleventy v3 scaffold — `src/`, `.eleventy.js`, `package.json`
- [x] 15 talk pages generated (5 talks × 3 langs) from `src/talks.njk`
- [x] Synthesis pages (3 langs) — `src/{en,es,ne}/index.njk`
- [x] Glossary pages (3 langs) — `src/{en,es,ne}/glossary/index.njk`
- [x] Events listing pages (3 langs) — `src/{en,es,ne}/events/index.njk`
- [x] CSS/JS/favicon passthrough copies to `_site/2026-uruguay/` (correct paths)
- [x] Binary resources copied to `_site/2026-uruguay/events/[folder]/resources/`
- [x] `resources.json` copied to each lang path per event
- [x] Language redirect stubs — `/2026-uruguay/events/[folder]/` → lang-specific
- [x] Smart `static/404.html` — instant redirect for known patterns; 5-second countdown to events page for unknown URLs; whitelist prevents infinite redirect loop
- [x] `src/search.njk` — Pagefind search page at `/2026-uruguay/search/`
- [x] Pagefind index built into `_site/pagefind/` (15 talk pages indexed, 10,372 words, 3 langs)
- [x] Search link added to events listing pages (EN/ES/NE)

## Awaiting user test before committing

User needs to run `npm run serve` and verify locally:
1. Talk pages render correctly with transcript content
2. Language toggle switches between EN/ES/NE
3. Talk selector dropdown navigates correctly
4. Resources section loads audio/PDFs
5. Synthesis and glossary pages render
6. `/2026-uruguay/search/` — Pagefind search box works, returns results
7. Bad URL → 5-second countdown → events listing (no infinite loop)
8. Known folder without lang (e.g. `/2026-uruguay/events/20260223-koshas-piriopolis/`) → instant redirect

## Comparison test suite

A background agent was launched to produce a full PASS/FAIL report comparing `_site/` (Eleventy) vs `docs/` (legacy). Report pending — will surface when agent completes.

---

## Open issues to implement next (after Eleventy is merged)

| Issue | Title | Notes |
|-------|-------|-------|
| #41 | URL migration plan: legacy docs/ redirects | Decide fate of docs/ after Eleventy goes live |
| #42 | SEO: sitemap.xml, robots.txt, hreflang | Also applies to yogicapproach.com |
| #43 | LLM/agentic discoverability: llms.txt, JSON-LD | Also applies to yogicapproach.com |
| #45 | Voice AI Q&A over corpus (Cloudflare Workers AI + RAG) | Builds on #44 Pagefind; needs Cloudflare account setup |
| #38 | Update favicon to YogicApproach logo | Waiting on user to provide logo file |
| #27 | Floating toolbar / Web Share API | On `feature/27-web-share`, not started |
| #39 | Migrate npm → Bun | Not started |

---

## Deferred / background

- GoatCounter on Das Mahavidya repo (saved in memory — needs repo name confirmed)
- #40 — Auto-approve read-only Claude Code operations in VS Code
- #12 — Audio diarization research
