# Prompt: Generate or Update the Synthesis Document

Use this prompt when adding a new talk to the synthesis or regenerating from scratch.

---

## Context

Provide all transcript files that should be included. For each, include:
- The full transcript markdown (English version)
- The event date, location, and title

---

## Prompt

```
You are helping maintain a bilingual synthesis document for a series of yoga talks.

## Input

I am providing you with [N] English transcripts of talks by Satchidananda delivered in Uruguay during February 2026. Each explores the koshas (five yogic bodies).

[Paste or attach the transcript files here]

## Task

Generate two files: `synthesis-en.md` (English) and `synthesis-es.md` (Spanish).

## Structure and Format

Follow this exact structure for both files:

### Header (English)
```markdown
# [Overall Title]
## Synthesis of Talks by Satchidananda
### Uruguay, February 2026

---

**Note on This Synthesis:** This document synthesizes [N] talks delivered by Satchidananda across Uruguay in February 2026, exploring the koshas (five yogic bodies) as a framework for wholeness and self-awareness. It was created through human-AI collaboration. Numbered citations \[1\]–\[N\] link to the original talk transcripts. For the speaker's exact words, please refer to the individual transcripts listed in the Sources section.

---
```

### Header (Spanish)
```markdown
# [Titulo General]
## Sintesis de Charlas de Satchidananda
### Uruguay, febrero de 2026

---

**Nota sobre esta Sintesis:** Este documento sintetiza [N] charlas impartidas por Satchidananda en Uruguay en febrero de 2026, explorando los koshas (los cinco cuerpos yoguicos) como marco para la totalidad y la autoconciencia. Fue creado mediante colaboracion humano-IA. Las citas numeradas \[1\]–\[N\] enlazan a las transcripciones originales de las charlas. Para las palabras exactas del orador, consulte las transcripciones individuales listadas en la seccion de Fuentes.

---
```

Note: The Spanish header above has accents stripped for this template. Apply proper Spanish accents (tildes, acutes) in the actual output.

### Body

- Identify major themes that weave across multiple talks
- Each theme becomes an H2 section (`##`)
- Use H3 (`###`) for sub-themes within sections
- Include direct quotes from the speaker in quotation marks, followed by the citation number: `"Quote text." [N]`
- When multiple citations apply, separate with commas: `[1], [2]` (NOT `[1][2]` — this causes markdown parsing issues)
- Quotes should be plain text (no links wrapping them)
- Write in a narrative style that connects ideas across talks, not a talk-by-talk summary
- Maintain the speaker's voice in quotes but use third-person narrative for synthesis prose

### Talks Table and Glossary Link

The talks table appears immediately after the Note, with source numbers in the first column and hyperlinked titles. Immediately after the table, add a glossary link on its own line using inline HTML (required for `target="_blank"`):

**English:**
```markdown
| # | Date | Location | Talk |
|---|------|----------|------|
| \[1\] | Feb 9 | Escuela de Yoga Satyam | [Talk Title](events/FOLDER/?lang=en) |
| \[2\] | Feb 10 | ... | ... |
...

*New to these terms? See the <a href="glossary.html?lang=en" target="_blank">Glossary of Terms</a> for definitions drawn from the talks.*
```

**Spanish:**
```markdown
| # | Fecha | Lugar | Charla |
|---|-------|-------|--------|
| \[1\] | 9 de feb | Escuela de Yoga Satyam | [Título de la Charla](events/FOLDER/?lang=es) |
...

*¿Nuevo en estos términos? Consulta el <a href="glossary.html?lang=es" target="_blank">Glosario de Términos</a> con definiciones tomadas de las charlas.*
```

There is no separate "Sources" section — the talks table serves that purpose. Spanish version links to `?lang=es`.

### Footer

```markdown
---

*Generated: [Month Day, Year]*

[1]: events/FOLDER/?lang=en "Talk Title"
[2]: events/FOLDER/?lang=en "Talk Title"
...
```

These reference-link definitions at the bottom make every `[N]` citation in the body clickable.

Spanish version uses `?lang=es` in reference links.

## Style Guidelines

- Tone: Reflective, accessible, intellectually honest
- Balance conceptual explanation with practical application
- Preserve the speaker's metaphors and teaching style
- Do not add content that wasn't in the talks
- Do not editorialize or evaluate — synthesize and connect
- Use em-dashes (—) for asides, not parentheses
- Horizontal rules (`---`) between major sections
```

---

## After Generation

1. Review both files for accuracy against the source transcripts
2. Verify all citation numbers match the correct talk
3. Verify reference-link URLs match existing event folder names
4. Test that `[N]` citations render as clickable links when viewed via marked.js
5. Update the "Generated" date
6. Update `README.md` if the talk list has changed
