# Prompt: Generate Nepali Transcript

Use this prompt to go from a confirmed master English transcript to `transcript-ne.md`. This is Phase 3. Complete Phase 1 (`prompts/transcript-en.md`) and Phase 2 (`prompts/transcript-es.md`) first, and have the user confirm the English version before proceeding here.

---

## Inputs Needed

1. The confirmed `transcript-en.md` (the master English version)

No Whisper file is needed — the Nepali version is a translation from English, not a reconstruction from audio.

---

## Prompt

```
I am providing the confirmed master English transcript (transcript-en.md).

[Paste or attach the file]

Please generate transcript-ne.md — the Nepali version — following the rules below.
```

---

## Translation Rules

### What to Translate

Translate all of Satchidananda's English words into Nepali. This is a yoga audience familiar with Sanskrit; use clear, accessible Nepali.

**Voice and register:**
- Conversational, warm — not formal or academic
- Preserve humor, asides, and incomplete sentences where they reflect natural speech
- First person singular throughout — never "उनले भन्छन्" (he says) or similar

### Script Rule: Devanagari First

**The core principle: if the word is Sanskrit or Nepali in origin, write it in Devanagari. Only genuine English words stay in Roman script.**

This includes:
- All Sanskrit terms (kosha, pranayama, Om, mantra, etc.) → Devanagari
- All Sanskrit proper names (Satchidananda, Satyananda, Niranjanananda, etc.) → Devanagari
- Sanskrit mantras → Devanagari
- Nepali words → Devanagari
- "Swami" and "Sw." → स्वामी

English words that stay Roman: genuine English vocabulary (science, AI, YouTube, etc.) and proper nouns of English/Western origin (MACA Museum, La Paloma, etc.).

### Sanskrit and Mantra Terms — Standard Mappings

| Roman | Devanagari | Notes |
|-------|-----------|-------|
| OM / Om / Aum | ॐ | Always; never write "OM" in NE files |
| Shanti Shanti Shanti | शान्तिः शान्तिः शान्तिः | Closing mantra uses visarga (ः); "Hi" at end is a Whisper artifact — omit |
| Hari Om Tat Sat | हरि ॐ तत् सत् | Compound phrase — convert as a unit |
| Swami / Sw. | स्वामी | Both long form and abbreviation |
| Satchidananda | सत्चिदानन्द | |
| Satyananda | सत्यानन्द | |
| Niranjanananda | निरञ्जनानन्द | |
| Saraswati | सरस्वती | |
| Bihar School of Yoga | बिहार योग विद्यालय | Institution — convert fully |
| Rikhiapeeth | ऋखिया पीठ | Ashram in Deoghar, Jharkhand |
| Kosha / Koshas | कोश / कोशहरू | |
| Annamaya Kosha | अन्नमय कोश | |
| Pranamaya Kosha | प्राणमय कोश | |
| Manomaya Kosha | मनोमय कोश | |
| Vijnanamaya Kosha | विज्ञानमय कोश | |
| Anandamaya Kosha | आनन्दमय कोश | |
| Pranayama | प्राणायाम | |
| Yoga Nidra | योग निद्रा | |
| Shantipat | शान्तिपात | |
| Sankalpa | सङ्कल्प | |
| Asana | आसन | |
| Bhakti | भक्ति | |
| Bhavana / Pratipaksha Bhavana | भावना / प्रतिपक्ष भावना | |
| Dharma / Svadharma | धर्म / स्वधर्म | |
| Samskara | संस्कार | |
| Ashram | आश्रम | |
| Guru | गुरु | |
| Chakra | चक्र | |
| Shakti | शक्ति | |
| Devi | देवी | |
| Prana | प्राण | |
| Manas | मनस् | |
| Chitta | चित्त | |
| Buddhi | बुद्धि | |
| Ahamkara | अहङ्कार | |
| Nadi | नाडी | |
| Kundalini | कुण्डलिनी | |
| Vanaprastha | वानप्रस्थ | |
| Brahmacharya | ब्रह्मचर्य | |
| Grihastha | गृहस्थ | |
| Sannyasa | संन्यास | |
| Bhaja Mana Ma | भज मन माँ | Kirtan; "Bajomana Ma" is a Whisper mishear — always use this form |
| SitaRam Darshan | सीताराम दर्शन | Venue name — convert as a unit |

**SWAN acronym:** Keep as SWAN; add Nepali expansion in parentheses on first use: SWAN (शक्ति, कमजोरी, महत्त्वाकांक्षा, आवश्यकता).

### Anatomy and Body Terms

When confident of the Nepali equivalent: **Nepali-first (English in parentheses)**
- *स्थूल* (gross), *सूक्ष्म* (subtle), *कारण* (causal)
- *अगाडिको मानसिक मार्ग* (frontal psychic passage)
- *भ्रूमध्य केन्द्र* (eyebrow center)
- *श्रोणि तल* (pelvic floor)
- *पुँछे हाड्* (tailbone)
- *आनन्दमय* (blissful) — used as a quality descriptor, not as a kosha name

When uncertain: **English-first (Nepali guess with ?)**
- pubic bone (जघन हाड्?)
- sit bones (नितम्ब हाड्?)
- squatting (उक्र्याँसो?)

### Header (exact format)

```markdown
# [शीर्षक नेपालीमा]
## सत्चिदानन्दद्वारा प्रवचन
### [Host/Organization नेपालीमा वा मूल नाम], [City]
### [Nepali month abbreviation] [Nepali numeral], [Nepali year]

---

**यस प्रतिलेखको बारेमा नोट:** यो दस्तावेज Whisper ट्रान्सक्रिप्शन प्रविधि प्रयोग गरी मानव-AI सहकार्यमा सिर्जना गरिएको हो। मूल वार्तालाप अंग्रेजीमा प्रस्तुत गरिएको थियो र तत्काल स्पेनी अनुवादसहित। सटीकता सुनिश्चित गर्न प्रयास गरिएको छ, तर ट्रान्सक्रिप्शन त्रुटिहरू हुन सक्छन्। कृपया मूल भिडियो रेकर्डिङलाई निश्चित स्रोतको रूपमा हेर्नुहोस्: [URL]

*यस वार्तालापका योग शब्दहरूमा नयाँ हुनुहुन्छ? <a href="../../glossary.html?lang=ne" target="_blank">शब्दावली</a> हेर्नुहोस्।*

---
```

**Nepali month abbreviations:** फेब ९, फेब १०, फेब ११, फेब १८, फेब २३

**Hosted-by line:** Use the original venue name where it is a proper noun (SitaRam Darshan, Escuela de Yoga Satyam). Translate generic parts if natural.

### PRACTICE Blockquote Headers

Replace `PRACTICE` with `अभ्यास` in all practice blockquotes:

```markdown
> *अभ्यास — [practice type in Nepali or Devanagari]*
```

If the practice type is a Sanskrit term, convert it. If genuinely English (e.g., a technique name with no Nepali equivalent), keep Roman.

### RECONSTRUCTED Blocks

Translate from the English RECONSTRUCTED block. Keep the confirmation note in Nepali:

```markdown
> **⚠ अनुवादकको अडियोबाट पुनर्निर्माण गरिएको — कृपया पुष्टि गर्नुहोस् कि यो तपाईंले भन्नुभएको कुरालाई प्रतिबिम्बित गर्छ।**
>
> [Nepali translation of the reconstructed content]
```

### Footer (exact)

```markdown
---

*मानव-AI सहकार्यमा ट्रान्सक्रिप्शन र ढाँचाकरण*
```

---

## Conversion Pitfalls — Lessons Learned

**Protect links before any substitution.** Both inline links `[text](url)` AND reference-style definitions `[label]: url` must be preserved. Word-boundary substitution can corrupt folder paths (e.g., `koshas` → `कोशहरू` inside a URL).

**Compound phrases before individual words.** Substitute multi-word phrases (e.g., `Hari Om Tat Sat`, `SitaRam Darshan`) before individual words. Otherwise a partial substitution prevents the compound from matching.

**Watch for abbreviated forms.** `Sw.` (abbreviation for Swami) is not caught by `\bSwami\b`. Check for it explicitly.

**No double-conversion.** If a term appears in both a compound pattern and a single-word pattern, ensure only one fires per occurrence.

---

## After Generation: Checklist

- [ ] All Sanskrit and Nepali-origin terms are in Devanagari — not Roman
- [ ] OM/Om/Aum → ॐ throughout
- [ ] Closing Shantipat mantra ends with शान्तिः शान्तिः शान्तिः (visarga), not "Hi"
- [ ] Swami (and any "Sw." abbreviations) → स्वामी
- [ ] PRACTICE → अभ्यास in all blockquote headers
- [ ] Anatomy terms follow Nepali-first convention where confident
- [ ] Header uses `## सत्चिदानन्दद्वारा प्रवचन` (NOT `## Talk by Satchidananda`)
- [ ] Header uses Nepali month abbreviation and Nepali numerals
- [ ] Glossary link uses `?lang=ne`
- [ ] Connective "and" in Nepali text → `र` (not English "and")
- [ ] Footer is present
- [ ] No URL corruption in reference-style link definitions
