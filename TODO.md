# TODO — 2026-uruguay

Structured task list. Quick captures go in `TODO.txt` first; this file tracks issues and priorities.
See `PROGRESS.md` for completed work and `PENDING-TASK.md` for in-progress session plan.

---

## Open Issues

| # | Title | Status |
|---|-------|--------|
| #27 | Floating toolbar + Web Share API on text selection | Open |
| #28 | Site audit: comprehensive review (parent) | Open |
| #29 | Accessibility: focus, aria, lang attr, skip nav, alt text | Open — `audit-fixes` branch |
| #30 | SEO & social meta tags | Open — `audit-fixes` branch |
| #31 | Security: marked.js SRI, modal onclick refactor | Open — `audit-fixes` branch |
| #32 | Responsiveness & mobile: media queries, touch targets | Open — `audit-fixes` branch |
| #33 | Performance & caching: image reload bug, favicon | Open — `audit-fixes` branch |
| #34 | Code cleanup: inline styles, dead code, error class | Open — `audit-fixes` branch |
| #35 | Framework research: Eleventy + Pagefind migration | Open — research complete, ready to plan |
| #37 | Regression test checklist | Open — run before merging audit-fixes |

---

## Backlog (not yet issues)

- Glossary: add link-out pages for lineage figures (Swami Niranjanananda, Swami Satyananda, etc.)
- Glossary: continue expanding as new talks are processed
- Git LFS for audio files — deferred; using YouTube links for now
- Automated transcription pipeline: audio → Whisper → raw/ → transcript generation
- New talk intake: process any talks from Uruguay series not yet transcribed
- GoatCounter: add to Das Mahavidya repo (see memory)

---

## Workflow Reminders

- New talk → create `raw/FOLDER/source.md` + `docs/events/FOLDER/` → use `prompts/transcript-en.md` → user confirms → `prompts/transcript-es.md` → `prompts/transcript-ne.md` → update `events.json`, glossary, synthesis
- Every task gets a GH issue before work begins
- Scan `TODO.txt` at pause points → convert to GH issues → prepend `#N` and append URL to each line
- After NE transcript: check `title_ne` and `title_short_ne` in events.json are in Devanagari
- Audit fixes go on `audit-fixes` branch; merge to main only after regression checklist (#37) passes
- Rollback point: `git checkout v1.0-stable`
