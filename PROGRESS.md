# Portfolio — Progress & Status

## Overview

Multi-page HTML portfolio at `C:\Users\youness\.local\bin\Portfolio\`.  
Bilingual DE/EN. Shared design system via `styles.css`. React 18 + Babel CDN for tweaks panel.

---

## File Structure

```
Portfolio/
├── index.html          — Overview page (masthead, hero, career arc, KPI band, 7 project rows, contact)
├── styles.css              — Shared CSS for all pages (design tokens, components, lightbox, nav)
├── gallery.js              — Lightbox implementation (click to zoom, ESC to close, backdrop blur)
├── PROGRESS.md             — This file
├── images/                 — All screenshots referenced by project pages
│   ├── 01-sonderanfertigung-form.png
│   ├── 01-sonderanfertigung-standalone.png
│   ├── 02-produktionsplaner.png
│   ├── 03-stuecklisten-korrekturen.png
│   ├── 03-stuecklisten-visual.png
│   ├── 04-reparatur-website.png
│   ├── 04-reparatur-info.png
│   ├── 06-kanban-app.png
│   ├── 07-analyse-overview.png
│   └── 07-analyse-charts.png
└── projects/
    ├── sonderanfertigung.html      — 01
    ├── produktionsplaner.html      — 02
    ├── stucklisten-analyse.html    — 03
    ├── reparaturservice.html       — 04
    ├── kundeninformation.html      — 05
    ├── kanban-system.html          — 06
    └── verkaufsdaten-analyse.html  — 07
```

Screenshot scripts live in `C:\Users\youness\.local\bin\`:
- `screenshot.js` — main batch script (SHOTS array)
- `screenshot-07.js` — project 07 specific (scrolled views of Analyse_Bericht.html)
- `preview-nav.js` — masthead + pagination preview shots

---

## Project Status

| # | Title | Page | Screenshots | Notes |
|---|-------|------|-------------|-------|
| 01 | Sonderanfertigungsformular | ✅ | ✅ 2 images | `order-form-snapshot.html` used (standalone, no DB needed) |
| 02 | Produktionsplaner | ✅ | ✅ 1 image | `Produktionsplanner.html` standalone |
| 03 | Stücklisten-Analyse | ✅ | ✅ 2 images | Korrekturen view + visual summary |
| 04 | Reparaturservice | ✅ | ✅ 2 images | Website + info/process page |
| 05 | Sonderanfertigung — Kundeninformation | ✅ | ❌ placeholders | `sonderanfertigung_website/` folder is empty — screenshots pending |
| 06 | Kanban-System | ✅ | ✅ 1 image | `06-kanban-app.png`; warehouse photo intentionally excluded |
| 07 | Verkaufsdaten-Analyse & Trenderkennung | ✅ | ✅ 2 images | Generated from `CSV_Analyse/Analyse_Bericht.html` |

---

## Features Implemented

- **Multi-page structure** — overview links to individual project pages
- **Bilingual DE/EN** — `data-de` / `data-en` on every text element, toggled via `toggleLang()`
- **Tweaks panel** — React 18 CDN + Babel standalone; accent color, paper tone, grain, name style (overview only)
- **Lightbox** — click any gallery image to zoom; ESC or backdrop click to close; `gallery.js` injected on each project page
- **Keyboard navigation** — `ArrowLeft`/`ArrowRight` between project pages via `gallery.js`; disabled while lightbox is open; all pages show correct `0X / 07` count
- **Language persistence** — choice saved to `localStorage` (`portfolio-lang` key) on toggle, restored on every page load; defaults to DE
- **Project navigation** — masthead prev/next arrows + bottom pagination block on all project pages
- **Reveal animations** — IntersectionObserver fade-in on `.project`, `.kpi`, `.arc-step` etc.
- **KPI band** — 40+ Filialen, 90% Zeitersparnis, 07 Projekte, 01 Systemproblem
- **Career arc** — timeline from 2023 production worker → current assistant to head of Shoes & Furniture
- **Open Graph meta tags** — `og:title`, `og:description`, `og:image`, `og:type`, `og:locale` + `twitter:card` on all 8 pages (index.html + 7 project pages); `og:image` omitted for project 05 (no screenshot yet)
- **Print stylesheet** — `@media print` in `styles.css`; strips masthead, tweaks panel, bigword, pagination, footer; preserves two-column layout and gallery images; page-break hints on detail blocks and sections
- **Tweaks panel removed** — dead code (file never existed); React, ReactDOM, Babel CDN scripts and all inline tweaks blocks stripped from all 8 pages
- **Stat callout blocks** — accent-tinted before/after stat panels on projects 01, 03, 06; bilingual labels; stack on mobile
- **Project 06 gallery** — warehouse placeholder removed; single app screenshot only

---

## Known Gaps / Pending

- **Project 05 screenshots** — `sonderanfertigung_website/` is empty; add files and re-run screenshot script

---

## Improvement Ideas (not yet implemented)

- **Absolute OG image URLs** — `og:image` uses relative paths; update to absolute URLs once the portfolio is deployed to a host

---

## Technical Notes

### Puppeteer / Screenshots
- Puppeteer installed in `Sonderanfertigung/node_modules/puppeteer`
- No Chrome downloaded; uses system Edge via `executablePath`:
  ```
  C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
  ```
- Viewport: `1440 × 900`, `deviceScaleFactor: 2` (retina-quality output)
- All scripts use `fileUrl()` helper to convert Windows paths to `file:///` URLs

### Design System (CSS custom properties)
```
--ink, --ink-faint          text
--paper, --cream            backgrounds
--accent, --accent-dark, --accent-soft   theme colour (default: forest green)
--serif: 'DM Serif Display'
--sans:  'Inter'
--mono:  'JetBrains Mono'
```

### Navigation Chain
```
01 sonderanfertigung ↔ 02 produktionsplaner ↔ 03 stucklisten-analyse
  ↔ 04 reparaturservice ↔ 05 kundeninformation ↔ 06 kanban-system
  ↔ 07 verkaufsdaten-analyse → back to overview
```
