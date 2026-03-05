# Prompt: Generate Spanish Transcript

Use this prompt to go from a confirmed master English transcript to `transcript-es.md`. This is Phase 2. Complete Phase 1 (`prompts/transcript-en.md`) and have the user confirm the English version before proceeding here.

---

## Inputs Needed

1. The confirmed `transcript-en.md` (the master English version)
2. The original `raw/FOLDER/whisper.txt` — needed to recover original Spanish for RECONSTRUCTED blocks

---

## Prompt

```
I am providing two files:

1. The confirmed master English transcript (transcript-en.md)
2. The original raw Whisper file (whisper.txt)

[Paste or attach both files]

Please generate transcript-es.md — the Spanish version — following the rules below.
```

---

## Translation Rules

### What to Translate

Translate all of Satchidananda's English words into Spanish. This is a bilingual yoga audience; use accessible, natural-sounding Spanish.

**Voice and register:**
- Use *tú* form throughout (not *usted*) — broader accessibility
- Preserve conversational tone — not formal or academic
- Preserve humor, asides, incomplete sentences where they reflect natural speech

### What NOT to Translate

- **Sanskrit and Hindi terms** — keep exactly as written: *kosha*, *pranayama*, *Annamaya Kosha*, *Shantipat*, *Om*, *Hari Om Tat Sat*, etc.
- **Mantras** — keep verbatim
- **SWAN acronym** — keep as SWAN; add Spanish expansion in parentheses on first use: SWAN (Fortalezas, Debilidades, Ambiciones y Necesidades)
- **Proper names** — Satchidananda, Satyananda, Jim Carrey, etc.
- **Practice labels** — keep the `> *PRACTICE — [type]*` blockquote header; may translate the type descriptor if natural

### Header (exact format)

```markdown
# [Talk Title in Spanish]
## Talk by Satchidananda
### Organizado por [Host/Organization], [City]
### [Month in Spanish] [Day], [Year]

---

**Nota sobre esta Transcripción:** Este documento fue creado mediante colaboración humano-IA utilizando tecnología de transcripción Whisper. La charla original fue dictada en inglés con traducción simultánea al español. Si bien se han realizado esfuerzos para garantizar la precisión, pueden ocurrir errores de transcripción. Por favor, consulta la grabación de video original como fuente definitiva: [URL o Enlace de YouTube por confirmar]

*¿Nuevo en los términos de yoga de esta charla? Consulta el <a href="../../glossary.html?lang=es" target="_blank">Glosario de Términos</a>.*

---
```

### RECONSTRUCTED Blocks — Two Cases

The raw Whisper file determines which case applies:

**Case A — Original Spanish exists in raw transcript:**
Use the original Spanish directly (lightly clean for readability: remove filler words, fix punctuation). Do not back-translate from the English reconstruction. Keep the confirmation note in Spanish:

```markdown
> **⚠ RECONSTRUIDO DESDE AUDIO DEL TRADUCTOR — por favor confirma que esto refleja lo que dijiste.**
>
> [Original Spanish from raw transcript, lightly cleaned]
```

**Case B — No original Spanish in raw transcript** (Whisper had already auto-translated it to English):
Translate from the English RECONSTRUCTED block and flag it:

```markdown
> **⚠ RECONSTRUIDO DESDE AUDIO DEL TRADUCTOR — por favor confirma que esto refleja lo que dijiste.**
> *(Nota: el audio original en español no fue capturado. Esta versión es una traducción de la reconstrucción en inglés.)*
>
> [Translation of the English reconstruction]
```

### Footer (exact)

```markdown
---

*Transcripción y formato en colaboración humano-IA*
```

---

## After Generation: Checklist

- [ ] *Tú* form used consistently (no *usted*)
- [ ] Sanskrit terms are unchanged from the English version
- [ ] RECONSTRUCTED blocks: Case A uses original Spanish, Case B is flagged as translated from English reconstruction
- [ ] Header metadata is in Spanish with correct month name
- [ ] Glossary link uses `?lang=es`
- [ ] Footer is present
- [ ] Tone is natural and conversational — not academic
