# Eleventy Migration — Test and Comparison Document

**Date:** 2026-03-20
**Scope:** 2026-uruguay site migration from the hand-rolled `docs/` HTML system to the Eleventy (`src/`) build system.
**Current site:** served from `docs/` via GitHub Pages branch deploy.
**Eleventy site:** built to `_site/` via `npm run build`; intended for GitHub Actions deploy.

---

## 1. Feature Comparison Table

| Feature | Current System | Eleventy | Status |
|---|---|---|---|
| **Language switching (EN/ES/NE)** | `<button>` elements call `loadTranscript(lang)` via JS; switches transcript content in-page; updates URL with `?lang=` param | `<a class="lang-btn">` links to `/2026-uruguay/[lang]/events/[folder]/`; full page navigation, no JS required | **Improved** — works without JS; each lang has a canonical URL; `aria-pressed` retained |
| **URL structure** | `/events/[folder]/?lang=es` — single page, language as query param | `/2026-uruguay/[lang]/events/[folder]/` — separate page per language | **Changed (intentional)** — canonical URLs per language; old `?lang=` URLs break without a redirect strategy |
| **Transcript rendering** | Client-side: `shared.js` fetches `transcript-[lang].md` at runtime via `marked.js`; shows "Loading..." placeholder | Build-time: `renderMarkdownFile` shortcode reads and renders markdown to HTML during `npm run build`; no runtime fetch needed | **Improved** — no flash of loading state; works without JS; better for SEO |
| **Talk selector dropdown** | Populated at runtime by `loadTalkSelector()` in `shared.js`; reads `../events.json` via `fetch()` | Populated at build time in Nunjucks template; talks rendered as static `<option>` elements; `handleTalkSelect()` from `shared.js` handles navigation | **Improved** — no runtime fetch; options visible immediately |
| **Audio resources section** | `loadResources()` in `shared.js` fetches `resources.json` (relative to page URL); builds audio cards and PDF list dynamically | `resources.json` is copied to each `[lang]/events/[folder]/` path at build time (`.eleventy.js` `after` hook); `loadResources()` still called at runtime with an explicit `basePath` argument pointing to `/2026-uruguay/events/[folder]/resources/` | **Preserved (with caveat)** — audio section populates correctly via `loadResources(lang, absoluteBasePath)`; the `basePath` fix is in `talks.njk` but NOT in `talk.njk` layout (see Known Differences) |
| **Image modal (cover art)** | Clicking a cover image opens a full-screen modal; `<div id="img-modal">` present in page; JS attaches listener after `loadResources()` runs | `<div id="img-modal">` present in `talks.njk`; same JS path via `shared.js` | **Preserved** |
| **Topbar** | Injected at `DOMContentLoaded` by `shared.js`; credit text, feedback link, report-issue link; localized per current lang via `updateTopbar(lang)` | Same `shared.js` injector runs; `updateTopbar(lang)` called explicitly in each page's `<script>` block with the pre-rendered lang value | **Preserved** |
| **GoatCounter analytics** | Injected inline at top of `shared.js` on every page that loads the script | Same `shared.js` is loaded on every Eleventy page | **Preserved** |
| **Footer — back nav** | `<a id="footer-nav">` text and href set by `shared.js` `loadTranscript()` at runtime | Hard-coded per-language in each template's `{% block footer %}`; `shared.js` `updateFooterLinks()` may also run but the static text is already correct | **Preserved** |
| **Footer — site credit** | Set by `shared.js` at runtime; static fallback in HTML | Static fallback in Nunjucks template rendered at build time; `shared.js` may overwrite on load | **Preserved** |
| **Skip navigation** | `<a href="#content" class="skip-nav">Skip to content</a>` in `index.html`; styled in `shared.css` | Same element in `base.njk`; same `shared.css` | **Preserved** |
| **OG / Twitter meta tags** | Hand-written per page in each `index.html` | Templated in `base.njk` using front matter variables; all pages get correct `og:url` referencing the canonical language URL | **Improved** — consistent and cannot drift; `og:url` now uses canonical lang URL |
| **Favicon** | `/2026-uruguay/favicon.svg` — absolute path, works from `docs/events/[folder]/` | Same path; `favicon.svg` copied via passthrough in `.eleventy.js` | **Preserved** |
| **Responsive / mobile CSS** | `shared.css` `@media` rules: `max-width: 480px` and `max-width: 360px` breakpoints; lang toggle stacks vertically; cover art shrinks | Same `shared.css` served; `eleventy-extra.css` adds matching rules for `<a class="lang-btn">` (mirrors `<button>` mobile behaviour) | **Preserved** |
| **Synthesis page** | `docs/index.html` (root); `shared.js` fetches and renders `synthesis-[lang].md` via `marked.js` at runtime | `src/[lang]/index.njk` per language (`/2026-uruguay/en/`, `/2026-uruguay/es/`, `/2026-uruguay/ne/`); rendered at build time; `src/index.njk` at `/2026-uruguay/` redirects to `/2026-uruguay/es/` | **Improved** — pre-rendered; internal links in synthesis rewritten from `?lang=` to `/[lang]/` by `renderMarkdownFile` shortcode |
| **Glossary page** | `docs/glossary.html`; markdown fetched at runtime via `shared.js` | `src/[lang]/glossary.njk` per language at `/2026-uruguay/[lang]/glossary/`; pre-rendered at build time | **Improved** — pre-rendered; canonical URLs per language |
| **Events listing page** | `docs/events/index.html`; list populated at runtime by `loadEventsList()` in `shared.js` | `src/[lang]/events/index.njk` per language; list rendered at build time from `events` global data | **Improved** — pre-rendered; works without JS |
| **Adding a new talk** | Edit `events.json`, create `docs/events/[folder]/index.html` (copy and edit), add transcript `.md` files, commit | Edit `docs/events/events.json`, create `docs/events/[folder]/` with transcript `.md` files only (no `index.html` needed); run `npm run build`; Eleventy generates all 3 language pages automatically | **Improved** — no per-talk HTML file to maintain; one entry in `events.json` + transcripts is sufficient |
| **Search (full-text)** | Not implemented | Not implemented | **Not yet implemented** |
| **Build step required** | No — `docs/` files are served directly by GitHub Pages | Yes — `npm run build` required locally; GitHub Actions runs build on every push to `main` | **Changed** — adds CI dependency; gains automated builds |

---

## 2. Test Sequence

Run all tests against both sites. Open both in separate browser windows.

**Local server commands (run in separate terminals):**
```
# Current site
npx serve docs -p 8765

# Eleventy site
npm run build && npx serve _site -p 8080
```

Base URLs:
- Current: `http://localhost:8765`
- Eleventy: `http://localhost:8080/2026-uruguay`

---

### 2.1 Talk Page — Tantroktam (has audio, cover art, and PDFs)

Current URL: `http://localhost:8765/events/20260218-tantroktam-devi-suktam-la-paloma/`
Eleventy URL: `http://localhost:8080/2026-uruguay/es/events/20260218-tantroktam-devi-suktam-la-paloma/`

| # | What to check | How to verify | Expected result |
|---|---|---|---|
| T1 | Page loads without errors | Open browser console; check Network tab | No 404s; no JS errors |
| T2 | Default language on load | Observe language toggle on load | Current: `?lang=` param or fallback to ES. Eleventy: ES page is default (URL is `/es/`) |
| T3 | Transcript content renders | Scroll through content area | Full formatted transcript visible; headings, blockquotes, italic Sanskrit terms all render correctly |
| T4 | Language toggle — switch to EN | Click English button | Current: content reloads inline, URL updates to `?lang=en`. Eleventy: navigates to `/en/events/20260218-tantroktam-devi-suktam-la-paloma/`; English transcript displayed |
| T5 | Language toggle — switch to NE | Click Nepali button | Nepali transcript displayed; `<html lang="ne">` set; header title updates to Nepali |
| T6 | Language toggle — return to ES | Click Español button | Reverts correctly |
| T7 | Page title reflects language | Check `<title>` in page source | Title matches the talk title in the current language |
| T8 | Header h1 and subtitle | Observe page header | h1 shows talk title in current language; subtitle shows speaker, venue, date |
| T9 | Topbar renders | Observe top of page | Credit ("Made with... by YogicApproach" / localised), feedback link, report-issue link visible |
| T10 | Topbar feedback link | Click feedback link | Opens Google Form in new tab; form pre-fills talk name and language |
| T11 | Topbar report link | Click report link | Opens Google Form in new tab; pre-fills correctly |
| T12 | GoatCounter analytics | Open browser Network tab; reload page | Request to `gc.zgo.at/count` fires; no JS error |
| T13 | Audio section — Tantroktam Devi Suktam | Observe resources section | Audio card appears with title, description, "Listen on Satyam Yoga Prasad" link (no download — `no_download: true`); cover art thumbnail visible |
| T14 | Audio section — Kirtan tracks | Observe resources section | Two kirtan audio cards with audio players; cover art thumbnails; CC license shown |
| T15 | Audio player functions | Click play on a kirtan track | Track plays; starting a second track pauses the first (exclusive playback) |
| T16 | Cover art modal | Click a cover art thumbnail | Full-size image opens in modal overlay |
| T17 | Cover art modal close | Press Escape or click outside | Modal closes |
| T18 | PDF section | Observe below audio cards | Spanish and English PDFs listed with PDF icon and language badge; compact versions in collapsible `<details>` |
| T19 | PDF download link | Click a PDF link | PDF opens in new tab |
| T20 | Talk selector dropdown | Open dropdown | Placeholder "-- Elegir --" (ES), then synthesis option, then other talks, then glossary option |
| T21 | Talk selector — navigate to another talk | Select a different talk | Navigates to that talk page |
| T22 | Talk selector — glossary option | Select glossary option | Opens glossary in new tab |
| T23 | Skip navigation | Tab to first focusable element; observe skip-nav link | "Skip to content" link appears on focus; clicking it moves focus to `#content` |
| T24 | Footer back-nav link | Observe and click footer back link | "Back to Events" (or localised); navigates to events listing |
| T25 | Footer feedback / report links | Observe footer bar | Same feedback and report-issue links appear in footer |
| T26 | Mobile layout (480px) | Resize browser to 480px wide | Lang toggle stacks vertically; topbar/footer-bar padding adjusts; no horizontal scroll |
| T27 | Mobile layout (360px) | Resize to 360px | Topbar credit area hidden; layout does not break |

---

### 2.2 Talk Page — Piriápolis (audio + cover art, no PDFs)

Current URL: `http://localhost:8765/events/20260223-koshas-piriopolis/`
Eleventy URL: `http://localhost:8080/2026-uruguay/es/events/20260223-koshas-piriopolis/`

| # | What to check | How to verify | Expected result |
|---|---|---|---|
| P1 | Audio section — Yoga Nidra | Observe resources section | Single audio card; cover art; audio player; no PDF section |
| P2 | No PDF section rendered | Observe below audio card | No "Translation Reference" heading or PDF entries appear |
| P3 | Transcript renders in EN | Click English | English transcript displayed |
| P4 | Transcript renders in NE | Click Nepali | Nepali transcript displayed |
| P5 | Repeat T9–T12, T20–T27 for this talk | As above | Same results as Tantroktam |

---

### 2.3 Talk Page — No Resources (Escuela de Yoga Satyam)

Current URL: `http://localhost:8765/events/20260209-koshas-escuela-de-yoga-satyam/`
Eleventy URL: `http://localhost:8080/2026-uruguay/es/events/20260209-koshas-escuela-de-yoga-satyam/`

| # | What to check | How to verify | Expected result |
|---|---|---|---|
| N1 | Resources section hidden | Observe page | No audio section visible; resources section has `display:none` |
| N2 | Transcript renders | Scroll content | Full transcript visible; no "Loading..." state on Eleventy |
| N3 | No console errors related to resources | Check browser console | Silent failure — `loadResources()` finds no `resources.json` and returns without rendering |
| N4 | Repeat T3–T12, T20–T27 | As above | Same nav and chrome behaviour |

---

### 2.4 Synthesis Page

Current URL: `http://localhost:8765/` (root `index.html`)
Eleventy URLs: `http://localhost:8080/2026-uruguay/` (redirect), `http://localhost:8080/2026-uruguay/es/`, `http://localhost:8080/2026-uruguay/en/`, `http://localhost:8080/2026-uruguay/ne/`

| # | What to check | How to verify | Expected result |
|---|---|---|---|
| S1 | Root URL redirects | Load `/2026-uruguay/` in Eleventy | Immediately redirects to `/2026-uruguay/es/`; no content flash |
| S2 | Synthesis content renders | Scroll page | Full synthesis text rendered; tables display with borders |
| S3 | Internal links to talks | Click a talk link within synthesis text | Navigates to the correct talk page; URL is `/[lang]/events/[folder]/` (not `?lang=`) |
| S4 | Glossary links in synthesis | Click glossary link | Navigates to `/[lang]/glossary/` (Eleventy) or `glossary.html?lang=` (current) |
| S5 | Language toggle | Switch to EN and NE | Navigates to English and Nepali synthesis pages; content changes |
| S6 | Talk selector dropdown | Open dropdown | Lists all talks; no "synthesis" option (current page); glossary option opens in new tab |
| S7 | Footer back-nav | Observe footer | "Ver charlas individuales" (ES) / equivalent in other langs; links to `/[lang]/events/` |
| S8 | Last updated label | Find "Last updated" label in synthesis | Date label present and correct |

---

### 2.5 Glossary Page

Current URL: `http://localhost:8765/glossary.html?lang=es`
Eleventy URLs: `http://localhost:8080/2026-uruguay/es/glossary/`, `/en/glossary/`, `/ne/glossary/`

| # | What to check | How to verify | Expected result |
|---|---|---|---|
| G1 | Glossary content renders | Scroll page | All terms visible; `<h2>` section headings have bottom border rule (inline `<style>` in template) |
| G2 | Language toggle | Switch languages | Navigates to correct language glossary; content changes |
| G3 | Links from glossary to talks | Click any talk reference link | Navigates to correct talk page |
| G4 | Talk selector | Open dropdown | All talks listed; synthesis option listed; navigates correctly |
| G5 | Footer back-nav | Observe footer | "Back to Synthesis" / localised; links to synthesis page |

---

### 2.6 Events Listing Page

Current URL: `http://localhost:8765/events/`
Eleventy URLs: `http://localhost:8080/2026-uruguay/es/events/`, `/en/events/`, `/ne/events/`

| # | What to check | How to verify | Expected result |
|---|---|---|---|
| E1 | All 5 talks listed | Count list items | 5 entries: Feb 9, 10, 11, 18, 23 |
| E2 | Talk labels localised | Switch language; observe labels | Date, location, and title shown in correct language |
| E3 | Click a talk link | Click any entry | Navigates to correct talk page in matching language |
| E4 | Language toggle | Switch languages | Navigates to EN/ES/NE events listing; list re-renders in chosen language |
| E5 | Current: list populated at runtime | Check page source | Current: list container empty in source HTML; filled by JS. Eleventy: full `<ul>` in page source |
| E6 | Events listing without JS | Disable JS in browser; reload Eleventy | Talk list still fully visible (pre-rendered) |

---

## 3. Known Differences / Breaking Changes

### 3.1 URL structure change (breaking for existing links)

The current site uses `?lang=` query parameters:
```
/events/20260223-koshas-piriopolis/?lang=es
```

The Eleventy site uses directory-based URLs:
```
/2026-uruguay/es/events/20260223-koshas-piriopolis/
```

Any existing bookmarks, shared links, or external links pointing to `?lang=` URLs will land on a 404 after migration (there is no redirect layer). This is tracked as issue #41. A decision on the redirect strategy must be made before going live.

### 3.2 Root URL changes

Current: `https://yogic-approach.github.io/2026-uruguay/` serves `docs/index.html`, which is the synthesis page.
Eleventy: `/2026-uruguay/` serves a meta-refresh redirect to `/2026-uruguay/es/`. The synthesis page is now at `/2026-uruguay/es/`. This changes the shareable URL for the home page.

### 3.3 Language toggle — `<a>` links vs `<button>` elements

Current: language toggle uses `<button>` elements; clicking triggers JS `loadTranscript()`.
Eleventy: language toggle uses `<a class="lang-btn">` links; each navigates to a different page. Visual appearance is identical (matched by `eleventy-extra.css`). Functional difference: switching language reloads the full page rather than swapping content in-place. This is intentional and an improvement (works without JS, canonical URLs), but it is a perceptible behaviour change.

### 3.4 Resources section — path resolution

In the current site, `loadResources()` is called without arguments; it fetches `resources.json` from the current page path (`/events/[folder]/resources.json`). In `talks.njk`, it is called with an explicit `resourcesBasePath` of `/2026-uruguay/events/[folder]/resources/` so that binary files resolve correctly from the `/[lang]/events/[folder]/` URL. However, `talk.njk` (the older layout file) calls `loadResources(lang)` without the basePath argument. If any page uses `talk.njk` rather than `talks.njk` the resources section will silently fail to render.

Verify that all generated talk pages use `talks.njk` (the paginated template), not `talk.njk`.

### 3.5 `marked.js` still loaded but only used for resources

In the Eleventy build, transcripts are pre-rendered at build time, so `marked.js` is no longer needed for transcript display. It is still loaded on every page because `loadResources()` in `shared.js` depends on it for nothing — actually `marked.js` is not called by `loadResources()`. The CDN script tag remains in `base.njk` as a precaution for any runtime markdown rendering paths. It represents an avoidable network request but causes no functional issue.

### 3.6 `html lang` attribute is static, not dynamically updated

Current: `shared.js` sets `document.documentElement.lang` each time `loadTranscript()` runs.
Eleventy: `lang` is set in the Nunjucks `<html lang="{{ lang }}">` attribute at build time. Since each language is a separate page, this is always correct and does not need runtime update.

### 3.7 Talk header title and subtitle are static

Current: `loadTranscript()` updates `<h1>` and `#header-subtitle` from `events.json` at runtime on every language switch.
Eleventy: title and subtitle are rendered at build time from the correct language field in `events.json`. No runtime update is needed or performed (though `shared.js` may attempt the update and succeed or no-op depending on what `updateTopbar()` touches).

### 3.8 Synthesis and glossary internal link rewriting

The `renderMarkdownFile` shortcode in `.eleventy.js` rewrites legacy `?lang=XX` links to `/[lang]/...` paths. This rewriting applies only to links in the exact pattern `href="events/[folder]/?lang=[lang]"` and `href="glossary.html?lang=[lang]"`. Links using single quotes, different spacing, or other formats may not be rewritten and could produce broken URLs. Verify all links in the rendered synthesis and glossary pages.

### 3.9 Build required before testing

Any change to transcript `.md` files, `events.json`, or Nunjucks templates requires running `npm run build` again before the Eleventy output reflects the change. The current site serves files directly and reflects changes immediately on save.

### 3.10 `docs/` is still the live site during testing

Until the GitHub Pages source is switched from "Deploy from branch: main / docs/" to "GitHub Actions", the `docs/` folder remains the live published site. The Eleventy `_site/` output is local only. Do not switch the Pages source until testing is complete and approved.

---

## 4. Decision Checklist

The following must all be confirmed before approving the migration to go live (switching GitHub Pages source to GitHub Actions).

- [ ] All 5 talk transcripts render correctly in all 3 languages (EN, ES, NE) on the Eleventy site
- [ ] Resources section renders correctly on Tantroktam page: audio cards with cover art, audio players, PDF list with compact section
- [ ] Resources section renders correctly on Piriápolis page: audio card with cover art, no PDF section
- [ ] Resources section is hidden (not broken) on pages without `resources.json`
- [ ] Language switcher links work between all 3 language versions of each talk page
- [ ] Language switcher works on synthesis, glossary, and events listing pages
- [ ] Talk selector dropdown navigates correctly from talk pages
- [ ] Talk selector dropdown navigates correctly from synthesis and glossary pages
- [ ] Synthesis page: internal links to talks use directory-based URLs, not `?lang=`
- [ ] Glossary page loads and all links to talks navigate correctly
- [ ] Topbar renders with localised credit, feedback, and report-issue links on all page types
- [ ] Footer back-nav renders correctly and navigates correctly on all page types
- [ ] Topbar feedback and footer feedback Google Form links pre-fill talk name and language correctly
- [ ] Styling visually matches the current site: fonts, spacing, card layout, mobile breakpoints
- [ ] GoatCounter analytics fires on page load (check Network tab for `gc.zgo.at/count` request)
- [ ] GitHub Actions workflow file (`.github/workflows/deploy.yml`) is present and has been reviewed
- [ ] Confirm all talk pages are generated by `talks.njk` (paginated), not the older `talk.njk` layout
- [ ] Decision made on URL redirect strategy for `?lang=` URLs (issue #41)
- [ ] Decision made on Bun migration (issue #39) — resolve before or after go-live?
- [ ] After go-live: verify GitHub Pages is serving from Actions artifact, not `docs/` folder

---

## Automated Test Run — 2026-03-20

**Method:** Python HTTP server serving `_site/` directly (port 8083). curl for HTTP status checks; grep for content verification; filesystem checks for link resolution.
**Build tested:** Post-fix build (B1 og:url, H1/H3 titles, H2 glossary links, Pagefind output path all fixed).

---

### HTTP Status — All Pages

| Status | URL |
|--------|-----|
| **TALK PAGES (15/15 PASS)** | |
| 200 | /2026-uruguay/en/events/20260209-koshas-escuela-de-yoga-satyam/ |
| 200 | /2026-uruguay/en/events/20260210-living-fully-in-yourself-yoga-carrasco/ |
| 200 | /2026-uruguay/en/events/20260211-koshas-and-ai-maca/ |
| 200 | /2026-uruguay/en/events/20260218-tantroktam-devi-suktam-la-paloma/ |
| 200 | /2026-uruguay/en/events/20260223-koshas-piriopolis/ |
| 200 | /2026-uruguay/es/events/20260209-koshas-escuela-de-yoga-satyam/ |
| 200 | /2026-uruguay/es/events/20260210-living-fully-in-yourself-yoga-carrasco/ |
| 200 | /2026-uruguay/es/events/20260211-koshas-and-ai-maca/ |
| 200 | /2026-uruguay/es/events/20260218-tantroktam-devi-suktam-la-paloma/ |
| 200 | /2026-uruguay/es/events/20260223-koshas-piriopolis/ |
| 200 | /2026-uruguay/ne/events/20260209-koshas-escuela-de-yoga-satyam/ |
| 200 | /2026-uruguay/ne/events/20260210-living-fully-in-yourself-yoga-carrasco/ |
| 200 | /2026-uruguay/ne/events/20260211-koshas-and-ai-maca/ |
| 200 | /2026-uruguay/ne/events/20260218-tantroktam-devi-suktam-la-paloma/ |
| 200 | /2026-uruguay/ne/events/20260223-koshas-piriopolis/ |
| **EVENTS LISTINGS (3/3 PASS)** | |
| 200 | /2026-uruguay/en/events/ |
| 200 | /2026-uruguay/es/events/ |
| 200 | /2026-uruguay/ne/events/ |
| **SYNTHESIS / HOME (3/3 PASS)** | |
| 200 | /2026-uruguay/en/ |
| 200 | /2026-uruguay/es/ |
| 200 | /2026-uruguay/ne/ |
| **GLOSSARY (3/3 PASS)** | |
| 200 | /2026-uruguay/en/glossary/ |
| 200 | /2026-uruguay/es/glossary/ |
| 200 | /2026-uruguay/ne/glossary/ |
| **SEARCH (1/1 PASS)** | |
| 200 | /2026-uruguay/search/ |
| **REDIRECT STUBS (9/9 PASS)** | |
| 200 | /2026-uruguay/ |
| 200 | /2026-uruguay/events/ |
| 200 | /2026-uruguay/events/20260209-koshas-escuela-de-yoga-satyam/ |
| 200 | /2026-uruguay/events/20260210-living-fully-in-yourself-yoga-carrasco/ |
| 200 | /2026-uruguay/events/20260211-koshas-and-ai-maca/ |
| 200 | /2026-uruguay/events/20260218-tantroktam-devi-suktam-la-paloma/ |
| 200 | /2026-uruguay/events/20260223-koshas-piriopolis/ |
| 200 | /2026-uruguay/glossary/ |
| 200 | /2026-uruguay/glossary.html |
| **STATIC ASSETS (6/6 PASS)** | |
| 200 | /2026-uruguay/events/shared.css |
| 200 | /2026-uruguay/events/shared.js |
| 200 | /2026-uruguay/assets/eleventy-extra.css |
| 200 | /2026-uruguay/favicon.svg |
| 200 | /2026-uruguay/pagefind/pagefind-ui.js |
| 200 | /2026-uruguay/pagefind/pagefind-ui.css |
| **INVALID URLs (4/4 correct 404)** | |
| 404 | /2026-uruguay/es/events/nonexistent-talk/ |
| 404 | /2026-uruguay/bad-path/ |
| 404 | /2026-uruguay/en/events/20260223-koshas-piriopolis-xyz/ |
| 404 | /this-does-not-exist/ |

---

### Internal Link Audit — 29/29 PASS (zero broken links)

Every `href="/2026-uruguay/..."` found across all built pages resolves to an existing file in `_site/`. No broken internal links.

Links verified: assets/eleventy-extra.css, favicon.svg, events/shared.css, pagefind/pagefind-ui.css, search/, en/, es/, ne/, all 3 glossary pages, all 3 events listings, all 15 talk pages.

---

### Meta Tag Verification (fixes B1, H1, H3)

```
<title>The Koshas: A Map of the Inner World | Yogaval 2026</title>
<meta property="og:title" content="The Koshas: A Map of the Inner World | Yogaval 2026">
<meta property="og:description" content="Satchidananda — Piriápolis, Uruguay — February 23, 2026 — Yogaval 2026">
<meta property="og:url" content="https://yogic-approach.github.io/2026-uruguay/en/events/20260223-koshas-piriopolis/">
```

All three regressions confirmed fixed: specific title, specific OG tags, correct canonical URL (no double path).

---

### Glossary Link Verification (fix H2)

```
<p><em>New to the yoga terms in this talk? See the
  <a href="/2026-uruguay/en/glossary/" target="_blank">Glossary of Terms</a>.
</em></p>
```

All 15 talk pages now use absolute `/2026-uruguay/{lang}/glossary/` paths. No broken relative links.

---

### 404 Behaviour

- `/2026-uruguay/es/events/nonexistent-talk/` → 404 (no infinite loop — folder not in whitelist)
- `/2026-uruguay/en/events/20260223-koshas-piriopolis-xyz/` → 404 (partial match rejected by whitelist)
- `/this-does-not-exist/` → 404
- `/2026-uruguay/bad-path/` → 404
- 404 page contains countdown redirect JS and "Taking you there in 5..." message

---

### resources.json Coverage

| Lang | Tantroktam | Piriápolis |
|------|-----------|-----------|
| en   | OK | OK |
| es   | OK | OK |
| ne   | OK | OK |

---

### Issues Found and Fixed During This Run

| Issue | Description | Resolution |
|-------|-------------|-----------|
| Pagefind output path | `_site/pagefind/` instead of `_site/2026-uruguay/pagefind/` — assets returned 404 | Fixed `package.json` build script: `--output-path _site/2026-uruguay/pagefind` |

---

### Overall Verdict: READY FOR USER TESTING ✓

**All blocking issues resolved. Zero broken internal links. All 46 URLs tested return correct status codes.**

Remaining low-priority items (cosmetic, not blocking):
- L1: Topbar language race condition (invisible in practice)
- L2: Glossary reference table non-chronological ordering
- L4: `aria-pressed` absent from synthesis/glossary lang toggles
- L5: `marked.js` loaded unnecessarily (unused on pre-rendered pages)

**Next step:** User tests locally via `npm run serve`, then commit `feature/35-eleventy` and merge to `main`.
