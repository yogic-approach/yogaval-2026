# Eleventy Migration Notes — Yogaval 2026

This document covers the Eleventy (11ty) scaffold added in issue #35. The current
production site still runs from `docs/` (GitHub Pages, branch deploy). The Eleventy
build targets `_site/` and is intended to replace the `docs/` approach once tested.

## Quick start

```bash
# 1. Install dependencies (one-time)
npm install

# 2. Local development server with live reload
npm run serve
# Opens at http://localhost:8080/2026-uruguay/

# 3. Production build only
npm run build
# Output written to _site/

# 4. Clean build output
npm run clean
```

## Source structure

```
src/
  _data/
    events.js          # Reads docs/events/events.json — single source of truth
    talks_matrix.js    # Cross-product of langs × events for pagination
    site.json          # Site-wide config (baseUrl, langs, ogImage, etc.)
  _includes/
    layouts/
      base.njk         # HTML shell: head, topbar hook, header, footer, shared.js/css
      talk.njk         # Extends base; adds lang toggle, resources section, transcript
      listing.njk      # Extends base; static events list from events data
  en/
    index.njk          # /en/ — synthesis (English)
    glossary.njk       # /en/glossary/
    events/
      index.njk        # /en/events/ — events listing
  es/
    index.njk          # /es/ — synthesis (Español)
    glossary.njk       # /es/glossary/
    events/
      index.njk        # /es/events/
  ne/
    index.njk          # /ne/ — synthesis (नेपाली)
    glossary.njk       # /ne/glossary/
    events/
      index.njk        # /ne/events/
  talks.njk            # Pagination template — generates 15 talk pages (5 × 3 langs)
  index.njk            # Root / — meta-refresh redirect to /es/
```

## URL scheme

| Page | URL |
|------|-----|
| Root (redirect) | `/2026-uruguay/` → `/2026-uruguay/es/` |
| Synthesis EN | `/2026-uruguay/en/` |
| Synthesis ES | `/2026-uruguay/es/` |
| Synthesis NE | `/2026-uruguay/ne/` |
| Events list EN | `/2026-uruguay/en/events/` |
| Talk page EN | `/2026-uruguay/en/events/[folder]/` |
| Glossary ES | `/2026-uruguay/es/glossary/` |

## Adding a new talk

1. Add transcript markdown files to `docs/events/[folder]/transcript-{en,es,ne}.md`
2. Add the event entry to `docs/events/events.json`
3. Run `npm run build` — the new talk pages are generated automatically

## Transition to GitHub Actions deploy

The workflow at `.github/workflows/deploy.yml` builds on every push to `main` and
deploys `_site/` to GitHub Pages.

To activate it:
1. Go to repo Settings → Pages
2. Change Source from "Deploy from a branch" to "GitHub Actions"
3. The `docs/` folder becomes inactive as the web root

Until that switch is made, the workflow will build successfully but not serve the site.

## Key design decisions

- `docs/` is untouched during migration — both old and new systems coexist
- `events.json` stays at `docs/events/events.json` (canonical); `src/_data/events.js`
  reads it at build time — no duplication
- `shared.js` and `shared.css` are preserved as-is; only `loadTranscript()` is
  bypassed (transcripts are pre-rendered). Topbar, footer, analytics (GoatCounter)
  all continue to work at runtime
- Lang toggle uses hard `<a>` links (not JS) — works without JavaScript
- `package-lock.json` is gitignored by default; uncomment the line in `.gitignore`
  if you want reproducible CI installs (recommended for production)

## Open issues / follow-up work needed

### Audio resources section (known limitation)

`shared.js` `loadResources()` fetches `resources.json` using a relative URL, then
builds audio/image file paths as `'resources/' + encodeURIComponent(r.file)`. From
the new URL scheme (`/[lang]/events/[folder]/`), this resolves to
`/[lang]/events/[folder]/resources/FILENAME`, but the actual binary files live at
`/events/[folder]/resources/FILENAME`.

Because `encodeURIComponent` encodes slashes, we cannot embed absolute paths in
`r.file` without modifying `loadResources`. The required fix is a small update to
`shared.js`: add an optional `basePath` second parameter to `loadResources()` that
overrides the `'resources/'` prefix. **Until that change is made, the audio/PDF
resources section will silently fail to load on the new Eleventy pages.** Everything
else (transcript, navigation, topbar, analytics) works correctly.

### Synthesis and glossary internal links

The synthesis and glossary markdown files contain internal links of the form
`events/20260218-tantroktam-devi-suktam-la-paloma/?lang=en`. In the Eleventy build
these should be `/2026-uruguay/en/events/20260218-tantroktam-devi-suktam-la-paloma/`.
These links will need to be updated in the markdown files, or a markdown-it plugin
can rewrite them at build time. Tracked as a follow-up task.
