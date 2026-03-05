# TODO — yogaval-2026

Structured task list. Quick captures go in `TODO.txt` first; this file tracks issues and priorities.
See `PROGRESS.md` for completed work and `PENDING-TASK.md` for in-progress session plan.

---

## Open Issues

| # | Title | Status |
|---|-------|--------|
| #11 | State tracking files (PROGRESS, PENDING-TASK, TODO) | In progress |

---

## Backlog (not yet issues)

- Glossary: add link-out pages for lineage figures (Swami Niranjanananda, Swami Satyananda, etc.)
- Glossary: continue expanding as new talks are processed (greetings, recurring terms)
- Git LFS for audio files — deferred; using YouTube links for now
- Automated transcription pipeline: audio → Whisper → raw/ → transcript generation
- New talk intake: process any talks from Uruguay series not yet transcribed

---

## Workflow Reminders

- New talk → create `raw/FOLDER/source.md` + `docs/events/FOLDER/` → use `prompts/transcript-en.md` → user confirms → `prompts/transcript-es.md` → update `events.json`, glossary, synthesis
- Every task gets a GH issue before work begins
- Scan `TODO.txt` at pause points → convert to GH issues → prepend `#N` and append URL to each line
