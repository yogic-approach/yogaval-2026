# Yogaval 2026

Bilingual transcript archive for yoga talks delivered in Uruguay during February 2026 by Satchidananda. Published via GitHub Pages.

**Live site:** https://yogic-approach.github.io/yogaval-2026/

## Structure

```
docs/
├── index.html                  ← Landing page
└── events/
    ├── events.json             ← Shared event listing (date, title, folder)
    ├── 20260209-koshas-escuela-de-yoga-satyam/
    ├── 20260210-living-fully-in-yourself-yoga-carrasco/
    ├── 20260211-koshas-and-ai-maca/
    ├── 20260212-annamaya-kosha-day-yoga-104/
    └── 20260223-koshas-piriopolis/
```

Each event folder contains:
- `index.html` — Lightweight bilingual viewer with language toggle (English / Espanol)
- `transcript-en.md` — English transcript
- `transcript-es.md` — Spanish transcript

## How It Works

- Each `index.html` uses [marked.js](https://github.com/markedjs/marked) (CDN) to render markdown as styled HTML in the browser
- Language defaults to Spanish; switchable via buttons or `?lang=en` / `?lang=es` URL parameter
- Cross-links to other talks are loaded dynamically from `events/events.json` — only this file needs updating when a new event is added
- No build step, no frameworks, no dependencies beyond the CDN

## Adding a New Event

1. Create a folder under `docs/events/` using the naming convention: `YYYYMMDD-topic-venue`
2. Add `transcript-en.md` and `transcript-es.md`
3. Copy an existing `index.html` and update the `<title>`, `<h1>`, and `<p>` header fields
4. Add the event to `docs/events/events.json`
5. Commit and push — GitHub Pages deploys automatically

## Folder Naming Convention

Lowercase, hyphen-separated, no spaces: `YYYYMMDD-topic-venue`

This keeps URLs clean on GitHub Pages (no `%20` encoding).
