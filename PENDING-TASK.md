# Pending Task — yogaval-2026

This file tracks the **current in-progress plan**. Written before any execution begins.
Session resume point — contains full plan so work can restart from scratch if context is lost.

---

## Session Context (as of 2026-03-05)

### Branch: `main`
### Last commit: `44946dd` (State tracking files, #11)
### GH issues through: #11

---

## Current Task: Whisper file copy + La Paloma event setup (#12, #13)

### Goal
1. Copy primary .text and .srt Whisper files from working directory into repo raw/ folders (renamed to whisper.txt / whisper.srt)
2. Set up new La Paloma event: raw/ folder, docs/events/ folder, resources/ (PDFs), index.html, events.json entry
3. Open GH issue for audio diarization research

### Source → Target Mapping
- `20260209 - Escuela de Yoga Satyam / Kosha Talk - ...Feb 9 at 18-30.{srt,text}` → `raw/20260209-koshas-escuela-de-yoga-satyam/whisper.{srt,txt}`
- `20260210 - Yoga Carrasco / Habitar el cuerpo...{srt,text}` → `raw/20260210-living-fully-in-yourself-yoga-carrasco/whisper.{srt,txt}`
- `20260211 - MACA / 20260211 - SCA at MACA...{srt,text}` → `raw/20260211-koshas-and-ai-maca/whisper.{srt,txt}`
- `20260223 - Piriapolis / Koshas - Piriapolis...{srt,text}` → `raw/20260223-koshas-piriopolis/whisper.{srt,txt}`
- `20260218 - La Paloma / audio-video-text / ...ORIG-timestamps.{srt,text}` → `raw/20260218-tantroktam-devi-suktam-la-paloma/whisper.{srt,txt}`

### La Paloma Event Details
- Slug: `20260218-tantroktam-devi-suktam-la-paloma`
- Title EN: "Tantroktam Devi Suktam"
- Title ES: "Tantroktam Devi Suktam"
- Host: SitaRam Darshan, La Paloma
- Date: February 18, 2026
- YouTube: not yet published
- 5 PDFs → docs/events/FOLDER/resources/
- No transcript yet — raw files only for now

### Steps
- [x] Create GH issues (#12 audio diarization, #13 file copy + La Paloma)
- [x] Copy whisper files for 4 existing events (renamed to whisper-eng.txt / whisper-eng.srt)
- [x] Create raw/20260218.../whisper-spa.txt + whisper-spa.srt + source.md
- [x] Create docs/events/20260218-tantroktam-devi-suktam-la-paloma/
- [x] Copy 5 PDFs to docs/events/FOLDER/resources/
- [x] Create index.html for La Paloma
- [x] Update events.json (inserted La Paloma after Feb 11, before Feb 23)
- [ ] Commit and push

---

## Issue Queue

- **#12** — Audio diarization research (new)
- **#13** — Whisper file copy + La Paloma setup (new)
- Glossary: living dictionary expansion (greetings, future link-out to guru pages)

---
