# TODO — yogaval-2026

Structured task list. Quick captures go in `TODO.txt` first; this file tracks issues and priorities.
See `PROGRESS.md` for completed work and `PENDING-TASK.md` for in-progress session plan.

---

## Open Issues

| # | Title | Status |
|---|-------|--------|
| #4 | ? | Open — verify still relevant |
| #10 | ? | Open — verify still relevant |
| #12 | ? | Open — verify still relevant |

---

## Backlog (not yet issues)

- Synthesis: add La Paloma section to ES and NE versions (EN done)
- Glossary: add link-out pages for lineage figures (Swami Niranjanananda, Swami Satyananda, etc.)
- Glossary: continue expanding as new talks are processed (greetings, recurring terms)
- Git LFS for audio files — deferred; using YouTube links for now
- Automated transcription pipeline: audio → Whisper → raw/ → transcript generation
- New talk intake: process any talks from Uruguay series not yet transcribed

---

## Workflow Reminders

- New talk → create `raw/FOLDER/source.md` + `docs/events/FOLDER/` → use `prompts/transcript-en.md` → user confirms → `prompts/transcript-es.md` → `prompts/transcript-ne.md` → update `events.json`, glossary, synthesis
- Every task gets a GH issue before work begins
- Scan `TODO.txt` at pause points → convert to GH issues → prepend `#N` and append URL to each line
- After NE transcript: check `title_ne` and `title_short_ne` in events.json are in Devanagari
