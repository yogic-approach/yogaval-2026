# yogaval-2026 — Session Progress

Site: https://yogic-approach.github.io/yogaval-2026/
Repo: https://github.com/yogic-approach/yogaval-2026

---

## Session: 2026-03-05 — La Paloma Event Transcripts + Whisper File Organization

**Focus:** Complete La Paloma event (#15); yoga nidra audio extraction; raw/ file naming standardization.

**Completed:**
- **#13** — Whisper files renamed to `whisper-eng.txt/srt` (3-letter ISO lang codes) across all 5 events; La Paloma event set up (raw/, docs/events/, resources/, index.html, events.json)
- **#14** — Yoga nidra audio extracted from Piriápolis recording (00:28:53–01:06:40) via ffmpeg; segments.yaml created in working folder
- **#15** — La Paloma transcript-en.md and transcript-es.md generated and committed; audience responses restored; grandmother/grandfather phrasing preserved; "Anandamayi" corrected from whisper "Ananda Mahi"
- Renamed all raw/*/source.md → source-meta.md (architecture: no intermediate transcripts in raw/)
- Added .gitignore to exclude .claude/

**Issues opened:** #12, #13, #14, #15
**Issues closed:** #13, #15

---

## Session: 2026-03-05 — Setup, Glossary, Prompts, Raw Structure

**Focus:** Bring transcript workflow into VSCode/Claude Code; expand glossary; set up raw/ source structure.

**Completed:**
- **#5** — Bilingual glossary (glossary-en.md, glossary-es.md, glossary.html); multi-citation fix `[1, 2]` → `[1], [2]`; synthesis table consolidation; talk dropdown synthesis link
- **#6** — Glossary added to talk dropdown (opens in new window via handleTalkSelect())
- **#7** — Glossary link added to Note section of all 8 event transcripts (EN + ES)
- **#8** — prompts/glossary.md — template for generating/updating glossary
- **#9** — prompts/transcript-en.md (Phase 1: raw Whisper → master EN transcript); prompts/transcript-es.md (Phase 2: master EN → ES translation); raw/README.md
- **#10** — raw/FOLDER/source.md placeholders for all 4 events; Satchidananda entry added to glossary (EN + ES); Swami lineage entries added (Niranjanananda, Satyananda, Satyasangananda, Sivananda, Swamiji); spelling corrected to Niranjanananda

**Issues opened:** #5–#10
**Issues closed:** #5, #6, #7, #8, #9, #10

---

## Session: Prior (Claude Desktop workflow)

**Focus:** Initial site build, transcript processing, synthesis.

**Completed:**
- Site scaffold: GitHub Pages from docs/, events.json, shared.js, event index.html template
- 4 event transcript pairs processed (EN + ES): Satyam, Yoga Carrasco, MACA, Piriápolis
- Transcript header standardization across all talks
- synthesis-en.md and synthesis-es.md
- prompts/synthesis.md and prompts/event-index-html.md
- **#1** — Initial repo setup
- **#2** — Synthesis commit
- **#3** — Prompts folder
- **#4** — Transcript header fixes, YouTube TBC placeholder

---
