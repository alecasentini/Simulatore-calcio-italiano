# Simulatore Calcio Italiano — Design System

## Product Overview

**Simulatore Calcio Italiano** is a browser-based Italian football league simulator. It is a single-page web application (no framework, vanilla JS + CSS) that lets users simulate entire seasons of Serie A, Serie B, and Serie C — 60 teams across three tiers.

### Key Features
- Full season simulation (round-robin, home/away legs)
- Player management: rosters, contracts, personalities, injury/suspension tracking
- Transfer market: AI-driven transfers, player scouting, managerial market modal
- Coppa Italia knockout tournament
- Hall of Fame / historical titles ("Albo d'Oro")
- Player database with filters
- Match detail modal with lineups, goals, cards
- Team selection: user picks a team and manages it (or watches as spectator)

### Source
- **Codebase**: `Simulatore-calcio-italiano/` (local filesystem mount)
  - `index.html` — single HTML entry point
  - `assets/css/style.css` — all styles (~789 lines)
  - `assets/js/main.js` — all logic (~3,439 lines, vanilla JS)
- No external design system, no framework, no icon library, no custom fonts

---

## CONTENT FUNDAMENTALS

### Language
The UI is entirely in **Italian**. All labels, button text, section headers, and game events are in Italian.

### Tone & Voice
- **Direct and functional** — no marketing language, purely informational
- **Third-person / impersonal** for system messages: *"Juventus acquista Marco Rossi per 4.5M€"*
- **Second person (tu)** for player-facing prompts: *"Inizia Stagione"*, *"Simula Tutto"*, *"Rinnova"*
- **Concise**: labels are minimal — *"Forza"* (strength), *"Età"* (age), not full sentences
- **Emojis used sparingly** as semantic icons in log entries: ⚽ goal, 💰 transfer, 📋 contract, 🟨 yellow card, 🟥 red card, 🏆 trophy, ✅ confirmed, ⚠️ warning
- No decorative emoji — only functional ones with semantic meaning

### Copy Examples
- Button: *"Inizia Stagione"*, *"Simula Tutto ▶▶"*
- Status: *"in uscita"*, *"rinnovato"*, *"pre-contratto"*, *"scad."*
- Alerts: *"⚠️ Ruoli sotto il minimo: DIF — la rosa sarà integrata con giovani"*
- Transfers: *"💰 Inter acquista Marco Rossi (24 anni, Forza: 78) da Juventus per 8.5M€"*
- Casing: **Sentence case** for all UI text; **ALL CAPS** used only for column headers in small tables (*RUOLO, FORZA, ETÀ*)

---

## VISUAL FOUNDATIONS

### Colors
- **Primary blue**: `#007bff` — main CTA buttons, active states, highlighted matchdays
- **Primary blue hover**: `#0056b3`
- **Dark navy**: `#0d1b2a` — team selection overlay background, modal headers
- **Link/interactive blue**: `#1a6fc4` — clickable player names, tab active state
- **Deep navy button**: `#1a4a8a` — confirm buttons, team badge pill
- **Secondary gray**: `#6c757d` — secondary buttons (Simula Tutto)
- **Success green**: `#2ecc71` / `#27ae60` — accept/renew actions, promotion zone
- **Danger red**: `#e74c3c` / `#c0392b` — reject/release actions, relegation zone, red cards
- **Warning amber**: `#f39c12` — medium-probability labels, out-of-position tag
- **Gold**: `#f0c040` — league section headers in team selection, Coppa winner badge (`gold`)
- **Background default**: `#ffffff`
- **Background subtle**: `#f7f9fc` / `#f4f6fa` — table headers, modal tabs, card backgrounds
- **Border**: `#ddd` / `#dde2ec` — table borders, card outlines
- **Text primary**: inherited browser default (`#222` / `#000`)
- **Text secondary**: `#666` / `#888` — metadata, timestamps, scorer lines
- **Text muted**: `#aaa` / `#999` — empty states, ranking numbers

### Typography
- **Font family**: `sans-serif` (system sans — no custom webfont defined)
- **Base size**: browser default (16px)
- **Scale used**: `0.7rem`, `0.75rem`, `0.78rem`, `0.82rem`, `0.85rem`, `0.88rem`, `0.9rem`, `0.95rem`, `1rem`, `1.05rem`, `1.2rem`, `1.3rem`, `1.8rem`, `2rem`
- **Font weights**: `400` (normal), `600` (semibold), `700` (bold), `900` (score display)
- **Line heights**: tight — information-dense layout
- **Letter spacing**: `.06em`–`.08em` on uppercase section labels

### Spacing & Layout
- Body padding: `20px` (top `60px` to clear sticky button)
- Cards/modals: `8–10px` padding for compact rows, `20–30px` for modal content
- Grid gap: `15px` (rounds grid), `20px` (hall of fame, hof-grid)
- Section separators: `border-top: 4px solid #eee` with `margin-top: 50px`

### Backgrounds
- No images or illustrations — pure CSS
- Team selection overlay: solid `#0d1b2a` dark navy
- Modal overlays: `rgba(0,0,0,0.6)` scrim
- Subtle backgrounds: `#f7f9fc`, `#f4f6fa`, `#eef7ff` (info banners)

### Cards & Containers
- **Border radius**: `5px` (buttons, small chips), `6–8px` (cards/details), `10–12px` (modals), `20px` (pill badges)
- **Box shadow (modals)**: `0 5px 15px rgba(0,0,0,0.3)`, `0 8px 32px rgba(0,0,0,0.25)`, `0 12px 40px rgba(0,0,0,0.35)`
- **Box shadow (sticky buttons)**: `0 4px 6px rgba(0,0,0,0.1)`
- **Detail/Summary cards**: `border: 1px solid #ccc`, `background: #fff`, `summary bg: #eee`
- **Player cards**: white with `border-radius: 10px`, deep shadow

### Interactions & Hover States
- Buttons: **darken background color** on hover (e.g. `#007bff` → `#0056b3`)
- Clickable rows: `background: #f0f4ff` on hover
- Clickable names: color `#0056b3` on hover + underline decoration
- Tabs: `color: #1a4a8a` + `border-bottom: 3px solid #1a4a8a` when active
- Transitions: `transition: 0.15s` on color, background, border

### Animation
- Minimal — only CSS `transition: 0.15s` for hover color changes
- `<details>` arrow: `transform: rotate(180deg)` with `transition: 0.2s` when open
- No entrance animations, no keyframes, no JavaScript-driven animation

### Borders
- Tables: `1px solid #ddd`
- Table header bottom: `2px solid #dde2ec`
- Sections: `4px solid #eee` (top separator)
- Active tab underline: `3px solid #1a4a8a`
- Modals: no border (shadow only)

### Semantic Zones (Tables)
- **Promotion zone**: `background: #d4edda` (light green)
- **Relegation zone**: `background: #f8d7da` (light red/pink)
- **Own team match highlight**: `background: #e8f2ff` (light blue)

### Iconography
See ICONOGRAPHY section below.

---

## ICONOGRAPHY

The project uses **no icon library or font**. All visual indicators are achieved with:
- **Unicode/Emoji** as semantic markers in dynamic text: ⚽ (goal), 💰 (transfer), 📋 (contract), 🟨 (yellow card), 🟥 (red card), 🏆 (trophy), ✅ (confirmed), ⚠️ (alert), 🎓 (retirement), 🌱 (youth), 🚨 (sacking), 🔍 (scouting)
- **Text characters**: `▶▶` in button label (Simula Tutto), `▼` in summary arrow (CSS `::after` pseudo-element)
- **Jersey swatches**: colored `<div>` squares using team color CSS (two-tone), not SVG icons
- **Role badges**: text abbreviations in styled spans: `POR`, `DIF`, `CEN`, `ATT`

No SVG icons, no PNG icons, no icon font. The visual language relies on text, color, and typographic weight to create hierarchy.

---

## Files

| Path | Description |
|---|---|
| `README.md` | This file — design system overview |
| `colors_and_type.css` | CSS custom properties for colors, typography, spacing |
| `assets/` | No visual assets (no logos/images in source) |
| `preview/` | Design System tab preview cards |
| `ui_kits/simulatore/` | UI kit — interactive recreation of the simulator |
| `SKILL.md` | Agent skill descriptor |

### UI Kits
- **`ui_kits/simulatore/index.html`** — Full interactive recreation of the simulator (team selection → season simulation → standings)

### Preview Cards
See `preview/` folder — 14 cards registered in the Design System tab:

| File | Group | Description |
|---|---|---|
| `preview/colors-brand.html` | Colors | Primary blue, navy, link, confirm |
| `preview/colors-semantic.html` | Colors | Success, danger, warning, gold |
| `preview/colors-surfaces.html` | Colors | Page BG, subtle, hover, zone highlights |
| `preview/type-scale.html` | Type | 0.70rem–2rem full scale |
| `preview/type-weights-labels.html` | Type | 400/600/700/900, uppercase labels |
| `preview/spacing-tokens.html` | Spacing | 4px–60px token scale |
| `preview/spacing-radius-shadows.html` | Spacing | Border radius & shadow system |
| `preview/components-buttons.html` | Components | Primary, action, tabs, db-tabs |
| `preview/components-standings-table.html` | Components | Standings w/ promotion/relegation zones |
| `preview/components-match-rows.html` | Components | Matchday highlight block & match rows |
| `preview/components-player-card.html` | Components | Player card with contract + personality |
| `preview/components-badges-tags.html` | Components | Role badges, status tags, OVR chip |
| `preview/components-market-rows.html` | Components | Transfer market & renewal rows |
| `preview/components-team-selection.html` | Components | Dark navy team selection overlay |
