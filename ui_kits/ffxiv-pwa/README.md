# UI kit — FFXIV 資源站 PWA

The installed-app recreation. Three tabs, one screen each, **nothing scrolls**.

The frame is **390×844** — the logical size of an iPhone 14/15/16. Every screen is designed
to fit that box exactly; check new work against it rather than against a rounded number.

| File | Role |
|---|---|
| `index.html` | Framed showcase (Design System card) |
| `app.html` | Installable app — theme-color, apple-touch-icon, SW registration |
| `manifest.webmanifest` | `start_url: ./app.html`, `scope: ./`, portrait, all-relative icon paths |
| `sw.js` | Cache-first app shell, `ffxiv-resources-v2` |
| `solver-logic.js` | The Mini Cactpot maths, ported from `cactpot/cactpot.js` |
| `PhoneShell.jsx` | `AppShell`, `ScreenHeader`, `IconAction` |
| `HomeScreen.jsx` | Logo, 「kiwi 的 FFXIV 收集用途」, one tool card |
| `SolverScreen.jsx` | The solver — board, arrows, both popups |
| `AboutScreen.jsx` | Three lines: local-only, GitHub, disclaimer |

## The solver flow

Mini Cactpot: a 3×3 grid holding 1–9, each once. The game reveals **one** cell; the player
reveals **three** more; then the player picks **one of eight lines** (3 rows, 3 columns,
2 diagonals) and is paid on that line's sum.

The tool is used **while playing** — one cell at a time:

1. **Reveal phase** (fewer than 4 cells entered). Tap a cell → a centred 3×3 digit popup.
   The solver marks the cell worth revealing next with a **hairline green ring only** — no
   fill, no banner. Below the board: 「還要翻 2 格」.
2. **Line phase** (4 cells entered). The eight arrows ringing the board go live; the
   recommended one turns green, the rest fade. Tap any arrow → a popup with that line's
   expected MGP and its top payout outcomes.

Reset lives as a single icon in the header, and only appears once something is entered.

## Rules this kit follows

- **One screen, no scroll.** If content does not fit, the screen is wrong.
- **The board is the hero.** Everything else is one line of muted text.
- **All interaction is a centred popup.** No bottom sheets, no inline panels, no drill-down pages.
- Green means "recommended" and appears in exactly two places: the ring on one cell, and one arrow.

## Not built

Records/history was cut on request. The upstream repo has no such feature either.
