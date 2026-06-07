# Architecture

Technical architecture for the Arizu portfolio — a Next.js 16 App Router application with a GSAP-driven hero image sequence and a Neo-Brutalist design system.

---

## Directory Structure

```
arz-portfolio/
├── app/                     # Next.js App Router
│   ├── globals.css          # Design tokens (Tailwind v4 @theme) + base styles
│   ├── layout.tsx           # Root Server Component — fonts, metadata
│   ├── page.tsx             # Home page — section assembly
│   └── providers.tsx        # Root Client Component — Lenis + GSAP boot
│
├── components/
│   ├── hero/                # Hero section (Phase 2–3)
│   │   ├── Hero.tsx             # Layout shell — 150vh section, ScrollTrigger pin
│   │   ├── HeroText.tsx         # Left column — heading, subtext, CTAs
│   │   ├── HeroSequence.tsx     # Right column — Canvas image sequence
│   │   └── useImageSequence.ts  # Hook — frame preloading, decode, progress binding
│   │
│   ├── sections/            # Content sections (Phase 5)
│   │   ├── About.tsx
│   │   ├── Architecture.tsx
│   │   ├── Projects.tsx
│   │   └── TechStack.tsx
│   │
│   └── ui/                  # Base design system components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Tag.tsx
│
├── lib/
│   ├── fonts.ts             # next/font/google — Space Grotesk, Inter, JetBrains Mono
│   └── gsap.ts              # GSAP + ScrollTrigger singleton (SSR-safe)
│
└── public/
    ├── frames/              # Hero image sequence assets (Phase 3)
    │   ├── frame-02.webp … frame-10.webp
    │   └── frame-fallback.webp   # Mobile static fallback (frame 09 content)
    └── reference/           # Design reference assets
```

---

## Runtime Architecture

### Server / Client boundary

```
RootLayout (Server Component)
└── <html> — font CSS variables applied
    └── <body>
        └── Providers (Client Component) ← Lenis + GSAP boot
            └── page.tsx (Server Component)
                ├── Hero (Client Component)     ← GSAP ScrollTrigger
                ├── About (Server Component)
                ├── Architecture (Server Component)
                ├── Projects (Server Component)
                └── TechStack (Server Component)
```

Only components that require browser APIs (`useEffect`, `useRef`, `window`) are Client Components. Content sections are Server Components by default — no unnecessary JavaScript sent to the client.

### Motion stack

```
Lenis (smooth scroll)
  └── raf(time * 1000)
        └── gsap.ticker ← GSAP owns the RAF loop
              └── ScrollTrigger ← reads virtual scroll position
                    └── HeroSequence ← canvas drawImage per frame
```

Lenis feeds its virtual scroll position into GSAP's RAF ticker. ScrollTrigger consumes GSAP's position, not `window.scrollY` directly. This ensures the scrubbed image sequence stays in sync with Lenis's eased scroll — no jitter or drift.

---

## Design System

### Tailwind v4 `@theme` tokens

All design tokens are declared in `app/globals.css` under `@theme`. Tailwind v4 maps these directly to utility classes.

```css
@theme {
  /* Colors — accessible as bg-background, text-primary, etc. */
  --color-background: #F7F7F2;
  --color-foreground: #111111;
  --color-primary:    #111111;
  --color-secondary:  #555555;
  --color-accent:     #C8FF00;
  --color-accent-2:   #00D9FF;
  --color-card:       #FFFFFF;

  /* Fonts — CSS variables injected by next/font/google */
  --font-heading: var(--font-space-grotesk), "Space Grotesk", sans-serif;
  --font-body:    var(--font-inter), "Inter", sans-serif;
  --font-code:    var(--font-jetbrains-mono), "JetBrains Mono", monospace;

  /* Shadows (hard, no blur) */
  --shadow-card: 8px 8px 0px #111111;
  --shadow-sm:   4px 4px 0px #111111;
  --shadow-lg:   12px 12px 0px #111111;
}
```

### Border system

All structural cards use a consistent `3px solid #111111` border. Soft borders, gradients, and glassmorphism are explicitly excluded from the design spec.

### Shadow system

Shadows are hard-offset with zero blur radius — the defining characteristic of Neo-Brutalist UI. Interactive elements shift on hover:

```
default: box-shadow: 4px 4px 0px #111111
hover:   transform: translate(-2px, -2px)
         box-shadow: 6px 6px 0px #111111
active:  transform: translate(2px, 2px)
```

---

## Component API Reference

### `Button`

```tsx
<Button variant="primary" size="md">View Projects</Button>
<Button variant="secondary" size="lg">Contact</Button>
<Button variant="ghost" size="sm">Learn More</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary \| secondary \| ghost` | `primary` | Visual style |
| `size` | `sm \| md \| lg` | `md` | Padding + font size |

### `Card`

```tsx
<Card interactive>
  <CardHeader>
    <CardTitle>Arz-Orchestrator</CardTitle>
  </CardHeader>
  <CardBody>Personal AI operating system.</CardBody>
  <CardFooter>
    <Tag>Multi-agent</Tag>
    <Tag variant="accent">Active</Tag>
  </CardFooter>
</Card>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `interactive` | `boolean` | `false` | Enables hover lift animation |
| `padding` | `string` | `p-8` | Tailwind padding override |

### `Tag`

```tsx
<Tag>Next.js</Tag>
<Tag variant="accent">Core</Tag>
<Tag variant="outline">Redis</Tag>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `default \| accent \| outline` | `default` | Background treatment |

---

## Page Section Order

The page renders sections in this sequence, reflecting the narrative arc from identity → systems thinking → execution evidence:

1. **Hero** — Identity + animated image sequence (150vh, pinned)
2. **About** — Who Arizu is and what he builds
3. **Architecture** — Arz-Orchestrator system diagram
4. **Projects** — Technical project showcase
5. **TechStack** — Infrastructure and tooling grid

Architecture is intentionally placed before Projects. The system diagram establishes depth of thinking before the project cards present outputs.

---

## Performance Targets

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | 0 (explicit canvas dimensions prevent shift) |
| Total JS (gzip) | < 150KB |
| Hero frames total | ≤ 1.0MB (9 × WebP @85%) |
| Lighthouse Performance | ≥ 90 |
