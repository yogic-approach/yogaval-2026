# Prompt: Generate Master English Transcript

Use this prompt to go from a raw Whisper output file to a clean, formatted `transcript-en.md`. This is Phase 1. The Spanish translation (Phase 2) uses the output of this file as its source — see `prompts/transcript-es.md`.

---

## Before You Begin: Folder Setup

Check if the event folder exists. If not, create it.

**Naming convention:** `YYYYMMDD-talk-slug-venue-slug/` — lowercase kebab-case
**Examples:** `20260223-koshas-piriopolis`, `20260209-koshas-escuela-de-yoga-satyam`

Two folders are needed:
- `docs/events/FOLDER/` — web-visible (create `index.html` using `prompts/event-index-html.md`)
- `raw/FOLDER/` — not web-visible; place `whisper.txt` and `whisper.srt` here

Required metadata for the transcript header (confirm before generating):
- Talk title (English)
- Official Spanish title if different — some talks have a distinct title per language (e.g., a museum event may have a formal Spanish title that differs from the English; confirm both)
- Host name / organization
- Venue name and city
- Date (Month Day, Year)
- YouTube URL (or use `[YouTube link TBC]` if not yet published)

---

## Prompt

```
I am providing you with the raw Whisper transcription output for a yoga talk.

[Paste whisper.txt content here, or attach the file]

Context:
- Speaker: Satchidananda (yoga teacher, Satyananda Yoga tradition)
- All talks delivered in English with real-time Spanish translation
- Talk title: [TITLE]
- Host: [HOST / ORGANIZATION]
- Venue: [VENUE], [CITY]
- Date: [DATE]
- Video: [YOUTUBE URL or "YouTube link TBC"]

Please read the full transcript first and report back:
1. The overall structure you can identify (sections, practices, theory blocks, closing)
2. Any audio gaps — places where a thread of thought appears broken or content seems missing
3. Names (people, places, organizations) that need spell-check
4. Any other edge cases worth noting before you proceed

Do not begin generating the output until I confirm.
```

---

## Phase 1: Reading and Assessment

Before generating any output, Claude will summarize what it sees. Review this carefully:

- **Structure** — confirm the section flow makes sense
- **Audio gaps** — these become RECONSTRUCTED blocks; you decide whether to fill from memory or leave the flag
- **Names** — correct spellings: Satchidananda, Satyananda Yoga, Vijnanamaya Kosha; flag anything uncertain
- **Voice issues** — if Claude flags any pronoun confusion or "he says" phrasing leaking in, confirm you want it cleaned

Once you've reviewed and confirmed, say: *"Go ahead."*

---

## Phase 2: Generation Rules

### Source Language Identification

The raw Whisper file contains a mix of:
1. **Your English** — the primary content; preserve every word exactly
2. **Translator's Spanish auto-translated back to English** — duplicates or third-person paraphrasing; remove these
3. **Translator's Spanish (untranslated)** — large Spanish-only blocks; these become RECONSTRUCTED sections

Giveaways that a segment is translator voice (not yours):
- Third-person phrasing: "he says", "he suggests", "So he says", "the speaker explains"
- **Immediately repeated material** — if something appears twice in quick succession, the second is Whisper auto-translating the Spanish translator back to English. Keep the first occurrence (original English) and remove the duplicate.
- Duplicated greetings — e.g., "Namaste and Hari Om to everyone" followed immediately by "Hari Om. Namaste. Greetings to everyone." — keep only the first
- Register shift — suddenly more formal or more Spanish-inflected phrasing

**Audience responses** can also slip in as if they were the speaker's words:
- Single-word or short-phrase answers to rhetorical questions (e.g., you ask "What do you get when you add the mental dimension?" and "Will." appears as a new paragraph)
- Anything that breaks the monologue flow with an oddly short response
- Remove these from the body text; do not flag, just drop them

When in doubt on translator voice, flag it rather than silently absorb it.

### Formatting Rules

**Header** (exact format):
```markdown
# [Talk Title]
## Talk by Satchidananda
### Hosted by [Host/Organization], [City]
### [Month Day, Year]

---

**Note on This Transcript:** This document was created through human-AI collaboration using Whisper transcription technology. The original talk was delivered in English with real-time Spanish translation. While efforts have been made to ensure accuracy, transcription errors may occur. Please refer to the original video recording as the definitive source: [URL or YouTube link TBC]

*New to the yoga terms in this talk? See the <a href="../../glossary.html?lang=en" target="_blank">Glossary of Terms</a>.*

---
```

**Section headings** — use H2 (`##`) for major sections, H3 (`###`) for subsections
Label as: Opening and Introduction, [Practice Name], Theory: [Topic], Closing, etc.

**Theory vs. practice** — distinguish clearly where practices exist:
- Practice sections open with a blockquote label: `> *PRACTICE — [type, e.g. "Seated meditation", "Nadi Shodhana"]*`
- Theory sections need no special marker but can be labeled in the heading
- Some talks have no formal practices (e.g., a museum lecture format); in that case, omit PRACTICE blocks entirely — section headings still apply

**Sanskrit terms** — italicize in running text: *kosha*, *pranayama*, *Annamaya Kosha*
Use these preferred spellings: Vijnanamaya (not Vijñānamaya), Satchidananda, Satyananda

**Horizontal rules** — use `---` between major sections

**RECONSTRUCTED blocks** — for Spanish-only audio (no English original available):
```markdown
> **⚠ RECONSTRUCTED FROM TRANSLATOR AUDIO — please confirm this reflects what you said.**
>
> [Reconstructed content based on Spanish translator audio]
```

**Footer** (exact):
```markdown
---

*Transcribed and formatted with human-AI collaboration*
```

### Content Rules

- **Keep original words** — do not reword, paraphrase, or improve phrasing
- **Do not add content** — only reconstruct from what is in the raw transcript
- **Sub-headings** — welcome; help readability without changing meaning
- **Conversational tone** — preserve it; do not make it more formal
- **Jokes, asides, humor** — keep them; they're part of the voice
- **Incomplete sentences** — keep them if clearly intentional in speech

---

## After Generation: Checklist

- [ ] All RECONSTRUCTED blocks are clearly marked and you have reviewed them
- [ ] Names are spelled correctly (Satchidananda, Satyananda, etc.)
- [ ] Sanskrit terms are italicized
- [ ] No translator voice has leaked into the body text
- [ ] Practice sections have their blockquote label
- [ ] Header metadata is complete and accurate
- [ ] Glossary link is present in the Note section
- [ ] Footer line is present

Once you confirm the transcript is accurate, proceed to Phase 2: Spanish translation using `prompts/transcript-es.md`.
