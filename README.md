# arz-portfolio

Personal portfolio for **Arizu** — AI Systems Builder, Automation Engineer, and Orchestration Architect.

Built to communicate one thing clearly: this is someone who designs and ships intelligent infrastructure.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP 3.15 + ScrollTrigger |
| Smooth Scroll | Lenis 1.3 |
| Fonts | Space Grotesk · Inter · JetBrains Mono |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

Runs on [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
arz-portfolio/
├── app/
│   ├── globals.css          # Design tokens + base styles (Tailwind v4 @theme)
│   ├── layout.tsx           # Root layout — fonts, metadata, Lenis provider
│   ├── page.tsx             # Page shell — section composition
│   └── providers.tsx        # Client provider — Lenis + GSAP ticker
│
├── components/
│   ├── hero/                # [Phase 2–3] Hero section + image sequence
│   ├── sections/            # [Phase 5] About, Architecture, Projects, TechStack
│   └── ui/
│       ├── Button.tsx       # Neo-brutalist button — primary / secondary / ghost
│       ├── Card.tsx         # Hard-shadow card with sub-components
│       └── Tag.tsx          # Tech stack pill — monospace, bordered
│
├── lib/
│   ├── fonts.ts             # next/font/google configuration
│   └── gsap.ts              # GSAP + ScrollTrigger singleton (SSR-safe)
│
├── public/
│   ├── frames/              # [Phase 3] Hero image sequence — frame-02.webp → frame-10.webp
│   └── reference/           # Design reference assets
│
└── docs/
    ├── architecture.md      # Component architecture + design system
    ├── hero-sequence.md     # Image sequence implementation spec
    └── design-decisions.md  # Rationale for key technical choices
```

---

## Design System

Style: **Neo-Brutalist Professional** — inspired by Linear, Vercel, Stripe, Railway.

| Token | Value |
|---|---|
| Background | `#F7F7F2` |
| Primary | `#111111` |
| Secondary | `#555555` |
| Accent | `#C8FF00` |
| Secondary Accent | `#00D9FF` |
| Card | `#FFFFFF` |
| Border | `3px solid #111111` |
| Shadow | `8px 8px 0px #111111` |

Full token reference: [`app/globals.css`](app/globals.css)

---

## Build Status

| Phase | Status | Description |
|---|---|---|
| Phase 1 — Foundation | ✅ Complete | Design tokens, fonts, layout, base UI components |
| Phase 2 — Hero Scaffold | 🔲 Pending | Two-column layout, 150vh pin, text animation |
| Phase 3 — Image Sequence | 🔲 Pending | Canvas rendering, GSAP scrub, 9-frame sequence |
| Phase 4 — Polish | 🔲 Pending | Mobile fallback, entrance animations, performance |
| Phase 5 — Content Sections | 🔲 Pending | About, Architecture, Projects, TechStack |

---

## Documentation

- [Architecture](docs/architecture.md) — component structure, design system, motion stack
- [Hero Sequence](docs/hero-sequence.md) — image sequence spec, GSAP config, asset pipeline
- [Design Decisions](docs/design-decisions.md) — rationale for key technical and visual choices

---

## Featured Project — Arz-Orchestrator

The portfolio's primary case study is **Arz-Orchestrator** — a personal AI operating system built around:

- Multi-agent architecture with a central routing layer
- Persistent memory systems
- Tool orchestration and event-driven task execution
- Voice interaction interface
- Autonomous workflow automation via Telegram

---

## License

Private. All rights reserved.
