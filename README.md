# Yogaval 2026

Bilingual transcript archive for yoga talks delivered in Uruguay during February 2026 by Satchidananda. Published via GitHub Pages.

**Live site:** https://yogic-approach.github.io/yogaval-2026/

## Synthesis

The landing page presents a synthesis of all four talks, exploring the koshas (five yogic bodies) as a framework for self-awareness and daily practice. The synthesis uses footnote-style citations linking back to the original transcripts.

- **Source documents:** `docs/synthesis-en.md` (English), `docs/synthesis-es.md` (Spanish)
- **Generated:** February 26, 2026
- **Talks included:**
  - Feb 9 — Escuela de Yoga Satyam — *The Five Koshas: A Practical Framework for Wholeness*
  - Feb 10 — Clínica Vitola, Yoga Carrasco — *Living Fully In Yourself*
  - Feb 11 — MACA Museum — *The Levels of the Human Being According to Yoga and Their Dialogue with AI*
  - Feb 23 — Piriápolis — *The Koshas: A Map of the Inner World*

## Structure

```
docs/
├── index.html                  ← Landing page (renders synthesis-en.md)
├── synthesis-en.md             ← Synthesis of all talks with citations (English)
├── synthesis-es.md             ← Synthesis of all talks with citations (Spanish)
└── events/
    ├── events.json             ← Shared event listing (date, title, folder)
    ├── shared.js               ← Shared JS for navigation and event listing
    ├── index.html              ← Events directory page
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

- The landing page uses [marked.js](https://github.com/markedjs/marked) (CDN) to render `synthesis-en.md` as styled HTML
- Each event `index.html` uses the same approach for individual transcripts
- Language defaults to Spanish on event pages; switchable via buttons or `?lang=en` / `?lang=es` URL parameter
- Cross-links to other talks are loaded dynamically from `events/events.json` via `shared.js` — only `events.json` needs updating when a new event is added
- No build step, no frameworks, no dependencies beyond the CDN

## Adding a New Event

1. Create a folder under `docs/events/` using the naming convention: `YYYYMMDD-topic-venue`
2. Add `transcript-en.md` and `transcript-es.md`
3. Copy an existing `index.html` and update the `<title>`, `<h1>`, and `<p>` header fields
4. Add the event to `docs/events/events.json`
5. Update `docs/synthesis-en.md` and `docs/synthesis-es.md` if the new talk should be included in the synthesis
6. Commit and push — GitHub Pages deploys automatically

## Folder Naming Convention

Lowercase, hyphen-separated, no spaces: `YYYYMMDD-topic-venue`

This keeps URLs clean on GitHub Pages (no `%20` encoding).
