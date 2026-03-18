# Pending Task — yogaval-2026

This file tracks the **current in-progress plan**. Written before any execution begins.
Session resume point — contains full plan so work can restart from scratch if context is lost.

---

## Current Task: Refactor metadata + Add Nepali language (#21)

**Branch:** main
**Last commit:** 7d2eaef
**GH Issues:** #21 (Add Nepali), #20 (selector + footer — completed this session)
**New issues this session:** #22 (language sub-labels), #23 (resources text localization)

### Approach
1. Move per-page title/subtitle out of hardcoded HTML data-attributes into `events.json`
2. Refactor `shared.js`: `loadTranscript(lang)` fetches events.json (cached in `window._eventsCache`), sets h1/subtitle from data — no more per-page data-attrs needed
3. Add Nepali (`ne`) as third language button across all event pages, synthesis, glossary
4. Expand `events.json` titles to full form; add `title_ne`, `date_ne`, `subtitle_en/es/ne` per event
5. Generate `transcript-ne.md` for all 5 talks; `synthesis-ne.md`; `glossary-ne.md`

### Key Decisions
- Short titles (for dropdown selector) kept as `title_short` / `title_short_es` / `title_short_ne`
- Full titles go into `title`, `title_es`, `title_ne` (used in page h1)
- "Select another talk" label: single `<span id="other-talks-label">`, content set by JS
- Nepali button label: `नेपाली`
- Dropdown NE: `-- छान्नुहोस् --`, synthesis: `सबै कुराहरूको सारांश`, glossary: `शब्दावली`
- Transcript header line 2 in NE: `## सत्चिदानन्दद्वारा प्रवचन`
- Sanskrit/mantra terms: Devanagari in NE files, verbatim in EN/ES
- Nepali date format: `फेब ९`, `फेब १०`, `फेब ११`, `फेब १८`, `फेब २३`
- PRACTICE headers → `अभ्यास` in all NE files (blockquote and section heading forms)
- EN Feb 18: "Intermission Kirtan: Bajomana Ma" (was "Intermediate Kirtan")

### Sub-tasks
- [x] Update `events.json`: full titles + NE fields + subtitles for all 5 events
- [x] Refactor `shared.js`: metadata from events.json cache; Nepali strings in loadTalkSelector
- [x] Update 5 event `index.html`: remove data-attrs, add btn-ne, simplify label span
- [x] Update `docs/index.html` (synthesis): add btn-ne, update loadSynthesis for 'ne'
- [x] Update `docs/glossary.html`: add btn-ne, update loadGlossary for 'ne'
- [x] Create `transcript-ne.md` × 5 (all events)
- [x] Create `synthesis-ne.md`
- [x] Create `glossary-ne.md`
- [x] Fix PRACTICE → अभ्यास in all NE files (Feb 9, 10, 18, 23)
- [x] Convert mixed Roman Sanskrit → Devanagari in NE files (Feb 9, 10)
- [x] "Bajomana Ma Intermission Kirtan" applied in EN + NE Feb 18
- [x] GH issues #22, #23 created for new feature requests
- [ ] Test locally (hard refresh, verify NE tab loads on 2+ pages)
- [ ] Commit and push (#21)

---
