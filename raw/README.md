# Raw Source Files

This folder contains the original Whisper transcription output for each talk. It is **not web-visible** — GitHub Pages serves from `docs/` only, so files here are version-controlled but not publicly accessible.

## Folder Structure

Each subfolder mirrors the corresponding event folder name in `docs/events/`:

```
raw/
  YYYYMMDD-talk-slug-venue-slug/
    whisper.txt    ← raw Whisper plain text output
    whisper.srt    ← Whisper subtitle file with timestamps
```

**Example:**
```
raw/
  20260209-koshas-escuela-de-yoga-satyam/
    whisper.txt
    whisper.srt
  20260210-living-fully-in-yourself-yoga-carrasco/
    whisper.txt
    whisper.srt
```

## Naming Convention

Folder names: `YYYYMMDD-talk-slug-venue-slug/`
- Date prefix enables chronological sorting
- Lowercase, hyphen-separated words
- Match the event folder name in `docs/events/` exactly

## Future

When audio-to-text automation is added, the source audio file (`audio.m4a`, `audio.mp3`, etc.) will also live here. The transcript generation workflow will use these files directly as input rather than requiring manual Whisper output.

## Usage

When generating a new transcript, provide the contents of `whisper.txt` (and optionally `whisper.srt`) as input to the prompt in `prompts/transcript-en.md`.

The raw Whisper file is also needed during Phase 2 (Spanish translation) to recover any original Spanish audio segments for RECONSTRUCTED blocks.
