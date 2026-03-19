# Pending Task — yogaval-2026

This file tracks the **current in-progress plan**. Written before any execution begins.
Session resume point — contains full plan so work can restart from scratch if context is lost.

---

## Status: No active task — clean close as of 2026-03-19

All work from today's session is committed, pushed, and tagged.

**Last commit:** c3f00e0 (Fix resources not re-rendering on language switch)
**Stable tag:** `v1.0-stable` — rollback point before audit-fixes work begins
**Active branch for next work:** `audit-fixes`

---

## Next session: Audit fixes (#28–#34) + #27 floating toolbar

Work should happen on the `audit-fixes` branch. Run regression checklist (#37) before merging to main.

**Safe to run in parallel:**
- #30 (SEO meta tags) + #32 (responsiveness) — no file overlap
- #31 (security) can run alongside #30/#32

**Do NOT run together:**
- #29 (accessibility) + #34 (code cleanup) — both touch shared.css

**After audit-fixes merged:**
- #27 — Floating toolbar + Web Share API
- #35 — Eleventy migration (separate branch, larger effort)
- #36 — GoatCounter ✅ DONE

---

## Other open items

- GoatCounter also needed on Das Mahavidya repo (saved in memory)
- Analytics: confirm GoatCounter is registering visits after deploy
- Framework research (#35): Eleventy + Pagefind recommended, Option B (directory-based language routes), GitHub Actions from day one, local build also supported
