# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned — Phase 2: Hero Scaffold
- Two-column hero layout (`150vh`, pinned)
- `Hero.tsx` scroll container with ScrollTrigger pin
- `HeroText.tsx` — heading, subtext, CTA buttons
- Placeholder canvas for right column
- Entrance animation for hero text (GSAP, one-shot)

### Planned — Phase 3: Hero Image Sequence
- `HeroSequence.tsx` — Canvas-based image sequence renderer
- `useImageSequence.ts` — frame preloader hook with `img.decode()`
- GSAP `scrub: 1.2` scroll-driven frame progression
- 2-layer crossfade for smooth inter-frame interpolation
- DPR-aware canvas (capped at `2×`)
- Mobile static fallback (frame-09)

### Planned — Phase 4: Polish
- Hero text entrance animations
- Mobile responsive layout
- Performance audit (Lighthouse)
- `prefers-reduced-motion` support

### Planned — Phase 5: Content Sections
- About section
- Architecture section (system diagram — Arz-Orchestrator)
- Projects section (Arz-Orchestrator, AI Automation Workflows, Autonomous Systems Research)
- Tech Stack section (structured grid)
- Accessibility pass (WCAG AA)

---

## [0.1.0] — 2026-06-08

### Phase 1: Foundation

#### Added

**Dependencies**
- `gsap@3.15.0` — animation engine with ScrollTrigger
- `lenis@1.3.23` — smooth scroll driver

**Design System** (`app/globals.css`)
- Tailwind v4 `@theme` token set: 8 colors, 3 font stacks, spacing scale, shadow system
- Hard-shadow utilities: `--shadow-sm`, `--shadow-card`, `--shadow-lg`
- Base typography styles: `h1`–`h6`, `p`, `code`, `a`
- Shared component primitives: `.btn-base`, `.card-base`, `.card-interactive`
- Layout utilities: `.container`, `.section`
- `prefers-reduced-motion` override block
- On-brand `::selection`, `:focus-visible`, and `::-webkit-scrollbar` styles

**Font Configuration** (`lib/fonts.ts`)
- `Space_Grotesk` — headings, weights 300–700, CSS variable `--font-space-grotesk`
- `Inter` — body text, variable font, CSS variable `--font-inter`
- `JetBrains_Mono` — code / tech tags, weights 400–500, CSS variable `--font-jetbrains-mono`

**GSAP Singleton** (`lib/gsap.ts`)
- Single registration point for `gsap` + `ScrollTrigger`
- SSR guard (`typeof window !== "undefined"`)

**Lenis Provider** (`app/providers.tsx`)
- Client component; boots Lenis with `autoRaf: false`
- Wired into GSAP ticker via `gsap.ticker.add()`
- `gsap.ticker.lagSmoothing(0)` for accurate scrub timing
- Cleanup on unmount (`lenis.destroy()`, `gsap.ticker.remove()`)

**Root Layout** (`app/layout.tsx`)
- Font CSS variables applied to `<html>`
- `<Providers>` wraps the tree
- OpenGraph metadata

**UI Components** (`components/ui/`)
- `Button` — primary / secondary / ghost variants; sm / md / lg sizes; hard shadow + translate hover
- `Card` — with `CardHeader`, `CardTitle`, `CardBody`, `CardFooter`; optional `interactive` lift
- `Tag` — default / accent / outline; `font-code`, bordered

**Documentation**
- `PLAN.md` — full implementation plan with architecture, asset strategy, GSAP config
- `DESIGN.md` — design system specification
- `README.md` — project overview, stack, structure, build status
- `CHANGELOG.md` — this file
- `docs/architecture.md` — component and system architecture
- `docs/hero-sequence.md` — image sequence technical specification
- `docs/design-decisions.md` — rationale for key choices

#### Changed
- Replaced boilerplate `layout.tsx` (Geist fonts, placeholder metadata)
- Replaced boilerplate `globals.css` (default Tailwind reset)
- Replaced boilerplate `page.tsx` (Next.js starter content)
- `DESIGN.md` — hero height updated `200vh` → `150vh`
- `DESIGN.md` — hero copy updated to "...and Intelligent Orchestration."
- `DESIGN.md` — section order: Architecture moved before Projects
