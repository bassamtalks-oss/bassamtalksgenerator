

# 🎬 Director's Console — Web Edition

A unified cinema prompt engineering and storyboard planning tool, rebuilt for the browser. Every prompt is grounded in real cinematography — real cameras, real lenses, real film stocks, real lighting — with a rules engine that enforces what is physically and historically possible.

---

## Phase 1: CPE Rules Engine & Prompt Builder

### Cinema Configuration Panel
- **Camera Selection** — Pick from a curated starter set (~15 cameras across digital, film, and IMAX). Each camera has type, sensor size, weight class, and manufacturer metadata.
- **Lens Selection** — ~15 lens families with mount type, focal range, and manufacturer. Options dynamically filter based on selected camera (e.g., Panavision cameras only show Panavision lenses).
- **Film Stock** — ~10 film stocks. Only available when a film camera is selected; automatically hidden for digital cameras.
- **Lighting Setup** — Light source and lighting style selection. Era-appropriate filtering (no LED before 2002, no HMI before 1972). Natural light constrained by time of day.
- **Shot Configuration** — Shot size, composition style, camera movement (equipment + movement type + timing), mood, and color tone selectors.
- **Aspect Ratio** — Auto-suggested based on camera/lens combination, with manual override where valid.

### The Rules Engine (Core Feature)
- **56+ validation rules** implemented in TypeScript covering:
  - Camera ↔ lens ecosystem compatibility (Panavision closed ecosystem, Alexa 65 restrictions)
  - Camera ↔ film stock requirements (film cameras require stock, digital cameras can't have one)
  - Weight-based movement constraints (heavy cameras can't be handheld/gimbal/drone)
  - Era-appropriate technology (lighting sources matched to time period)
  - Natural light physics (no sun at night, no moonlight at midday)
  - Optical warnings (wide lenses on close-ups, long lenses on wide shots)
  - Animation-specific constraints
- **Three severity levels**: HARD (blocks), WARNING (flags), INFO (notes)
- **Dynamic option filtering** — Invalid options are greyed out in real-time as you build your configuration. When you select a Panavision camera, non-Panavision lenses become unselectable.
- **Validation panel** — Shows all active rule violations/warnings for current configuration.

### Prompt Generation
- **Structured prompt output** from all selected parameters — no free-text guessing
- **Model-specific formatting** for: Midjourney, FLUX, SDXL, Wan 2.2, Runway Gen-3, CogVideoX, HunyuanVideo
- **One-click copy** to clipboard
- **Prompt preview** panel showing the generated text in real-time as you adjust settings

### Film & Animation Presets
- **~15 live-action presets** to start (spanning silent era to modern digital — e.g., Blade Runner, The Godfather, Parasite, Mad Max)
- **~10 animation presets** (Studio Ghibli, Akira, Spider-Verse, Pixar, Arcane, etc.)
- Each preset auto-loads all matching parameters (camera, lens, stock, lighting, aspect ratio, mood, color tone)
- **Preset browser** with film year, poster/thumbnail, and cinematographer info
- Presets serve as learning tool — see what real productions used

---

## Phase 2: Storyboard Canvas

### Infinite Canvas
- **Free-floating workspace** with zoom (mouse wheel) and pan (click-drag)
- **Draggable, resizable panels** that can be freely positioned on the canvas
- **Multi-select** panels with Ctrl+Click or marquee selection
- **Alignment tools** — snap guides and alignment toolbar for selected panels

### Panel System
- Each panel is an independent production unit with:
  - **Custom name** (e.g., "Hero_Shot", "Establishing_Wide")
  - **Own CPE configuration** — each panel stores its own camera/lens/lighting/prompt settings
  - **Image slot** — Upload reference images or paste generated results
  - **Image history** — Navigate through multiple versions with forward/back arrows
  - **Star rating** (1-5 stars) for quick review
  - **Markdown notes** — Attach production notes with edit/view toggle
  - **Generated prompt** — The panel's CPE prompt is always visible and copyable

### Project Management
- **Save/Load projects** — All panel positions, configurations, images, ratings, and notes persisted to browser localStorage
- **Project naming and metadata**
- **Export** — Print-ready storyboard layouts with configurable grid (1-4 panels per row), page size, orientation, and optional notes

---

## App Layout & Design

- **Sidebar navigation** — Switch between CPE Prompt Builder, Storyboard Canvas, and Presets Browser
- **Dark theme** with a professional, cinematic aesthetic (dark grays, subtle accent colors)
- **Responsive** — Full desktop experience with the sidebar, compact layout on tablets
- **All data lives in the browser** — No backend needed for the core experience, keeping it fast and self-contained

