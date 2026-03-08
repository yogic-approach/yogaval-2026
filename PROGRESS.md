# yogaval-2026 — Session Progress

Site: https://yogic-approach.github.io/yogaval-2026/
Repo: https://github.com/yogic-approach/yogaval-2026

---

## Session: 2026-03-08 — La Paloma Resources Section + Bilingual UI (#15, #16, #17)

**Focus:** Build resources section on La Paloma event page; inline audio playback; bilingual page header fixes; talk title rename.

**Completed:**
- **#16** — `resources.json` schema + dynamic resources section in index.html; audio cards (cover art thumbnail, HTML5 inline player, meta line with license/download); PDF section (full sheets visible, compact in collapsible `<details>`); ES before EN ordering; 3-letter lang badges
- **#17** — Exclusive audio playback (starting one track auto-pauses others); cover art modal overlay (click or Esc to dismiss)
- **#15** — Talk title renamed to "Tantric Tools: Tantroktam Devi Suktam for Self-Reflection" (EN) / "Herramientas Tántricas: Tantroktam Devi Suktam para la Autorreflexión" (ES) across events.json, transcripts, source-meta.md
- Bilingual page `<h1>` — switches correctly with language toggle using `data-title-en` / `data-title-es` attributes
- Bilingual "Select another talk" / "Ver otra charla" label
- Language toggle moved above resources section
- Section headings: "Audio Resources" + "Translation Reference" at same visual level
- Sannyasa Peeth reference recording listed as ashram recording (no download; "Listen on Satyam Yoga Prasad →" link); cover art extracted from embedded MP3 tag
- Removed 2 PDFs (ultra-compact Google Docs ES, Transliterated Key Terms EN)
- Committed c72248b (#15) and 7029a80 (#16, #17); pushed to origin/main

**Issues opened:** #17
**Issues closed:** #16, #17 (La Paloma resources section complete)

---

## Session: 2026-03-06 — La Paloma Kirtan Audio: Metadata, Cover Art + Glossary Expansion

**Focus:** Embed metadata and cover art into La Paloma kirtan extracts; expand glossary with La Paloma terms.

**Completed:**
- **#15** — Glossary expanded: 17 new terms from La Paloma talk; La Paloma added as reference [5]; headers updated to "five talks" (EN + ES)
- **#14** — Kirtan audio metadata embedded (title, artist, album, genre, date, track, composer, copyright, comment) via `embed-metadata.ps1`; Piriápolis yoga nidra metadata embedded
- **#14** — Cover art (1000×1000 JPEG, resized from 2048×2048 PNG) embedded into both kirtan m4a files via `embed-cover-art.ps1`
- `audio-metadata.yaml` — master metadata sidecar created at Events/ level (human-editable source of truth)
- `verify-metadata.ps1` — ffprobe read-back verification script
- `original-audio-identified-segments.yaml` — renamed from segments.yaml; header comment added documenting purpose
- `embed-cover-art.ps1`, `embed-metadata.ps1` — PowerShell scripts for re-embedding if metadata changes

**Issues opened:** #16
**Issues closed:** #15 (glossary portion)

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
