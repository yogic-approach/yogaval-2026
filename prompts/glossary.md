# Prompt: Generate or Update the Glossary

Use this prompt when adding a new talk to the glossary, regenerating from scratch, or adding missing terms.

---

## Context

Provide all transcript files that should be included. For each, include:
- The full transcript markdown (English version)
- The event date, location, and title

---

## Prompt

```
You are helping maintain a bilingual glossary of yoga and Sanskrit terms for a series of talks.

## Input

I am providing you with [N] English transcripts of talks by Satchidananda delivered in Uruguay during February 2026.

[Paste or attach the transcript files here]

## Task

Generate two files: `glossary-en.md` (English) and `glossary-es.md` (Spanish).

## Structure and Format

### Header

```markdown
# Glossary of Terms
## From the Talks by Satchidananda
### Uruguay, February 2026

---

**Note on This Glossary:** This glossary indexes Sanskrit, yogic, and non-obvious terms as they were used across [N] talks delivered in Uruguay in February 2026. Definitions are drawn from the talks themselves wherever possible; where the speaker elaborated in multiple talks, the richest explanation is used. Citations \[1\]–\[N\] link to the original transcripts.

| # | Date | Location | Talk |
|---|------|----------|------|
| \[1\] | Feb 9 | Escuela de Yoga Satyam | [Talk Title](events/FOLDER/?lang=en) |
| \[2\] | Feb 10 | ... | ... |
...

---
```

Spanish header uses the same structure with translated text:
- "# Glosario de Términos"
- "## De las Charlas de Satchidananda"
- "### Uruguay, febrero de 2026"
- Note text translated with proper Spanish accents
- Table column headers: `# | Fecha | Lugar | Charla`
- Table links use `?lang=es`

### Entries

- Organize alphabetically with H2 section headings for each letter (`## A`, `## B`, etc.)
- Skip letters with no entries
- Each entry format:

```markdown
**Term** — *Language tag.* Definition text. "Direct quote from the speaker." [N] See also: *Related Term*.
```

- Language tag: `*Sanskrit.*`, `*Hindi.*`, `*English.*`, or omit if a plain English term
- Definitions should come from the talks themselves — use the speaker's own explanation wherever possible
- Include direct quotes in double quotation marks followed by the citation number: `"Quote text." [N]`
- When multiple citations apply, separate with commas: `[1], [2]` (NOT `[1, 2]` — this causes markdown parsing issues)
- Include "See also:" cross-references where useful (italicized term names)
- For Spanish: translate definitions but keep Sanskrit/Hindi terms in their original form; add a Spanish language tag where the English version uses one (e.g., `*Sánscrito.*`)

### What to include

Include all of:
- Sanskrit and yogic technical terms (koshas, pranas, chakras, etc.)
- Practice names (Yoga Nidra, Nadi Shodhana, Shanti Patha, etc.)
- Traditional concepts and frameworks (ashramas, shaktis, etc.)
- Non-obvious English terms used with specific meaning in the talks (e.g., "Review of the Day", "kosha scanning", "SWAN")
- Named techniques or metaphors that recur across talks

Omit:
- Common English words used in their ordinary sense
- Proper nouns that are self-explanatory (city names, common names)

### Footer

```markdown
---

*Generated: [Month Day, Year]*

[1]: events/FOLDER/?lang=en "Talk Title — Location"
[2]: events/FOLDER/?lang=en "Talk Title — Location"
...
```

These reference-link definitions at the bottom make every `[N]` citation in the body clickable.

Spanish version uses `?lang=es` in all reference links.

## Style Guidelines

- Keep definitions concise — 1–4 sentences per entry
- Lead with the most essential meaning, then context or nuance
- Preserve the speaker's phrasing where quoted
- Do not add content that wasn't in the talks
- Use em-dashes (—) to separate term from definition
- Italicize cross-referenced terms in "See also:" lists
```

---

## Updating an Existing Glossary

When a new talk is added:

1. Assign it the next citation number (e.g., `[5]`)
2. Add the new talk to the talks table in the header
3. Add the reference-link definition at the footer
4. Scan the new transcript for any terms not yet in the glossary and add them
5. For existing entries, add `[5]` citations where the new talk provides relevant context or a better quote
6. Update the "Generated" date

---

## After Generation

1. Verify all citation numbers match the correct talk
2. Confirm `[N], [N]` format throughout — never `[N, N]`
3. Verify reference-link URLs match existing event folder names
4. Test that `[N]` citations render as clickable links when viewed via marked.js
5. Confirm the Spanish version preserves all Sanskrit terms verbatim
6. Update `README.md` if the talk list has changed
