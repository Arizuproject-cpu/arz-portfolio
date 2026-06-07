# Hero Implementation Plan
## Arizu Portfolio — Neo-Brutalist AI Builder

---

## 1. Reference Image Analysis

The contact sheet (`public/reference/arizu-reference.png`) confirms:

- **9 frames**: 02 → 10, labelled explicitly
- **Aspect ratio**: 9:16 (portrait — tall, narrow)
- **Style**: Realistic cinematic portrait, soft studio key light, dark neutral background
- **Subject**: Black hoodie, wavy/curly dark hair, slight facial hair, dark sunglasses
- **Motion arc**:
  - Frame 02: Head nod down — no glasses visible
  - Frame 03: Glasses begin to fall from hair
  - Frame 04: Mid fall
  - Frame 05: Near eyes
  - Frame 06: Land on eyes
  - Frame 07: Adjust moment
  - Frame 08: Look up (confident)
  - Frame 09: Final pose — glasses settled, direct gaze
  - Frame 10: Alternate final — wide smile, looking slightly sideways

**Final frame: Frame 10** (wide smile included as the natural end of the sequence — the full arc from head-down to confident grin)

---

## 2. Visual Direction

### Hero Layout: Two-Column, Full Viewport

```
┌─────────────────────────────────────────────────────┐
│                    100vw × 100vh                     │
│  ┌──────────────────────┐  ┌───────────────────────┐ │
│  │   LEFT COLUMN 55%    │  │   RIGHT COLUMN 45%    │ │
│  │                      │  │                       │ │
│  │  HEY, I'M ARIZU      │  │  ┌─────────────────┐ │ │
│  │                      │  │  │                 │ │ │
│  │  Building AI Systems,│  │  │  [CANVAS 9:16]  │ │ │
│  │  Automation Workflows│  │  │                 │ │ │
│  │                      │  │  │  Frame sequence │ │ │
│  │  [View Projects]     │  │  │  scrub-driven   │ │ │
│  │  [Contact]           │  │  │                 │ │ │
│  │                      │  │  └─────────────────┘ │ │
│  └──────────────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

The canvas sits in the right column with a hard black border (`3px solid #111`) and an `8px 8px 0px #111` drop shadow — consistent with the neo-brutalist card system.

The canvas is **not full-screen**. It is a contained portrait card. This is intentional: full-screen sequences are overdone; a contained card feels more editorial and structured.

### Color Application to Hero
- Background: `#F7F7F2` (warm off-white)
- Left col text: `#111111`
- Canvas border: `#111111` 3px solid
- Canvas card shadow: `8px 8px 0px #111111`
- Accent on CTA button: `#C8FF00` (yellow-green)

---

## 3. Frame Count Decision

**Use all 9 frames (02–10).** Reasoning:

| Option | Frames | Pros | Cons |
|--------|--------|------|------|
| Minimal | 4–5 | Fewer assets | Jumpy, cheap feel |
| Standard | 9 | Smooth arc, full story | Needs proper image gen |
| Extended | 15–20 | Cinema-smooth | Overkill for this motion |

9 frames is the right count. The motion (glasses falling) is not hyper-complex — it doesn't need 60 frames. The GSAP scrub will distribute these 9 frames across the scroll distance, giving perceived smoothness without asset bloat.

**With optional crossfade interpolation** between adjacent frames during playback, the 9-frame sequence will feel fluid even when scrubbing fast.

---

## 4. Asset Generation Workflow

### Step 1 — Generate Frames

Use the reference contact sheet as the style guide. Each frame must be generated individually with consistent identity:

**Generation parameters:**
- Model: Flux 1.1 Pro / Midjourney v7 / DALL-E 3 (any works, consistency matters)
- Prompt base: `"Realistic cinematic portrait, male, wavy dark hair, slight facial hair, black hoodie, soft studio key light, dark neutral background, 9:16"`
- Each frame prompt adds the specific state: e.g., `"sunglasses mid-fall from hairline, not yet on face"`
- Use `--seed` (same seed for all frames if using Midjourney) to maximize consistency
- Reference image: upload `arizu-reference.png` as style/character reference

**Frame prompts (brief):**
| Frame | Prompt add-on |
|-------|---------------|
| 02 | head slightly bowed, no sunglasses visible |
| 03 | sunglasses beginning to slide down from top of head, forehead |
| 04 | sunglasses at mid-face, bridge of nose area, slightly crooked |
| 05 | sunglasses almost at eyes, nearly in position |
| 06 | sunglasses just landing on face, slightly askew |
| 07 | hand slightly raised adjusting sunglasses, micro-expression |
| 08 | head raised, sunglasses on, looking slightly up, confident |
| 09 | direct confident gaze, sunglasses fully on, slight smile |
| 10 | wide smile, sunglasses on, head turned slightly (alt final) |

### Step 2 — Prepare Assets

After generation:
1. Crop all to identical 9:16 bounding box — crop from center
2. Match color grading across frames (use Lightroom or a simple LUT)
3. Export as **WebP** at quality 85
4. Target: ≤120KB per frame, ≤1MB total
5. Resolution: `600×1067px` (600px wide at 9:16)
   - Retina will scale via canvas devicePixelRatio

### Step 3 — File Naming Convention

```
public/
  frames/
    frame-02.webp
    frame-03.webp
    frame-04.webp
    frame-05.webp
    frame-06.webp
    frame-07.webp
    frame-08.webp
    frame-09.webp
    frame-10.webp
```

### Step 4 — Mobile Static Fallback

Export Frame 09 as `public/frames/frame-fallback.webp` at `400×711px` for mobile.

---

## 5. GSAP Architecture

### Scroll Mechanic

The hero section is `150vh` tall. The inner content is **pinned** to the viewport for the full scroll distance. This means:

- User arrives at hero → content locks in place
- User scrolls 150vh → image sequence plays through frames 02→10
- User continues scrolling → hero unpins, next section enters

```
0vh    ──► Page enters hero, frame 02 shows (head down)
75vh   ──► Frame 05-06 (glasses landing)
150vh  ──► Frame 10 (final wide smile), hero unpins
```

### ScrollTrigger Configuration

```
trigger:   #hero-section
start:     "top top"
end:       "+=" + (window.innerHeight * 0.5) (150vh total)
pin:       #hero-inner
scrub:     1.2  (slight lag = more cinematic feel, not too snappy)
```

The `scrub: 1.2` value adds a subtle ease-lag so the frames don't feel mechanical when scrolling. A value of `true` would be instantaneous.

### Frame Drawing on Canvas

On every RAF tick (driven by GSAP's onUpdate via ScrollTrigger progress):

```
frameIndex = clamp(floor(scrollProgress * (totalFrames - 1)), 0, totalFrames - 1)
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.drawImage(loadedImages[frameIndex], 0, 0, canvasWidth, canvasHeight)
```

**Optional crossfade layer:**
For smoother interpolation between frames, render two canvas layers:
- Bottom: current frame at opacity 1
- Top: next frame at `opacity = (scrollProgress * (totalFrames-1)) % 1`
- This makes the transition feel like soft dissolve rather than a hard cut

This is the **Apple iPhone teardown page** technique, but simpler since we have 9 frames not 147.

### Canvas DPR (Retina Sharpness)

```
const dpr = Math.min(window.devicePixelRatio, 2)  // cap at 2× to avoid massive canvas
canvas.width  = displayWidth  * dpr
canvas.height = displayHeight * dpr
ctx.scale(dpr, dpr)
```

Cap at `2×` — 3× is unnecessary and wastes GPU memory.

### GSAP Plugin Registration

Register plugins once in a shared `lib/gsap.ts` module to avoid duplicate registration issues in Next.js SSR:

```typescript
// lib/gsap.ts
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

### Text Animation

The left column text enters during the first `0–20%` of scroll progress:
- Headline: `y: 40 → 0`, `opacity: 0 → 1`, stagger per word
- Subtext: `opacity: 0 → 1` with slight delay
- CTAs: slide up after subtext

These are one-shot entrance animations (not scrubbed), triggered when the hero enters the viewport. They do not loop or reverse.

---

## 6. Component Architecture

```
app/
├── page.tsx                     ← Assembles sections
├── layout.tsx                   ← Fonts, Lenis init, metadata
├── globals.css                  ← CSS variables, base styles
│
├── components/
│   ├── hero/
│   │   ├── Hero.tsx             ← Layout shell: two columns, 200vh section
│   │   ├── HeroText.tsx         ← Left col: heading, subtext, CTAs
│   │   ├── HeroSequence.tsx     ← Right col: canvas wrapper + image sequence logic
│   │   └── useImageSequence.ts  ← Hook: loads frames, returns {canvasRef, imagesLoaded}
│   │
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Architecture.tsx
│   │   ├── Projects.tsx
│   │   └── TechStack.tsx
│   │
│   └── ui/
│       ├── Button.tsx           ← Neo-brutalist button (border + hard shadow)
│       ├── Card.tsx             ← White bg, black border, hard shadow
│       └── Tag.tsx              ← Tech stack pill
│
└── lib/
    ├── gsap.ts                  ← GSAP + ScrollTrigger singleton registration
    └── fonts.ts                 ← Space Grotesk, Inter, JetBrains Mono config
```

### Key Component Responsibilities

**`Hero.tsx`**
- Sets `min-height: 150vh`
- Holds outer scroll container ref
- Initializes ScrollTrigger pin on inner content ref
- Passes `scrollProgress` (0→1) down to `HeroSequence`

**`HeroSequence.tsx`**
- Renders `<canvas>` element
- Applies neo-brutalist card styling (border, shadow)
- Reads `scrollProgress` prop and draws correct frame
- Handles DPR scaling on mount/resize

**`useImageSequence.ts`**
- Accepts array of frame URLs
- Loads all `Image` objects, tracks ready state
- Uses `img.decode()` for guaranteed decode before first paint
- Returns `{ images, loaded, loadingProgress }`

**Loading sequence:**
1. Frame 02 loads immediately (shown on page load)
2. Frames 03–05 load with high priority (needed early in scroll)
3. Frames 06–10 load in background after initial render

---

## 7. Mobile Fallback Strategy

### Detection Criteria

Trigger static fallback on **any** of:
1. Viewport width < 768px
2. `prefers-reduced-motion: reduce` media query matches
3. `navigator.connection.saveData === true` (data saver mode)

### Mobile Layout

```
┌────────────────────┐
│  HEY, I'M ARIZU    │  ← text first on mobile
│  Building AI...    │
│  [View Projects]   │
│  [Contact]         │
│                    │
│  ┌──────────────┐  │
│  │  frame-09    │  │  ← static image, centered portrait card
│  │  (static)    │  │
│  └──────────────┘  │
└────────────────────┘
```

- Single column stack
- Canvas replaced with `<img src="/frames/frame-fallback.webp">`
- No ScrollTrigger pin (would break mobile UX)
- Hero height: `auto` not `200vh`
- No canvas, no GSAP sequence — Lenis still active for smooth scroll

### Implementation Pattern

```tsx
// HeroSequence.tsx
const isMobile = useMediaQuery("(max-width: 768px)")
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
const useStaticFallback = isMobile || prefersReducedMotion

if (useStaticFallback) {
  return <img src="/frames/frame-fallback.webp" ... />
}
return <canvas ref={canvasRef} ... />
```

---

## 8. Smooth Scroll — Lenis

Lenis wraps the entire document for buttery scroll. Configuration:

```typescript
// layout.tsx or a client wrapper
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

// Connect to GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

Lenis + GSAP ticker is the canonical integration pattern. ScrollTrigger reads from GSAP's internal scroll position which Lenis updates via the RAF loop.

---

## 9. Performance Budget

| Asset | Size Target |
|-------|-------------|
| Per frame WebP (600px) | ≤ 120KB |
| 9 frames total | ≤ 1.0MB |
| Frame fallback (mobile) | ≤ 60KB |
| GSAP bundle (tree-shaken) | ~30KB gzip |
| Lenis bundle | ~8KB gzip |

### Optimization Checklist
- [ ] All frames in WebP (not PNG/JPEG)
- [ ] Next.js `<Image>` NOT used for canvas frames (canvas reads raw `HTMLImageElement`)
- [ ] `img.decode()` called before first render
- [ ] Canvas size capped: `min(containerWidth, 600)` × `9/16 ratio`
- [ ] DPR capped at `2`
- [ ] No layout shift: canvas container has explicit dimensions before images load
- [ ] `will-change: contents` on canvas wrapper (not `transform` — canvas doesn't benefit from transform layering the same way)

---

## 10. Dependencies to Install

```bash
npm install gsap lenis
```

Packages breakdown:
- `gsap` — v3.12.x (ScrollTrigger included, tree-shakeable)
- `lenis` — smooth scroll driver (official maintained package, replaces @studio-freight/lenis)

No other runtime dependencies needed. The stack stays lean.

---

## 11. Implementation Order (Phase Plan)

### Phase 1 — Foundation
1. Install GSAP + Lenis
2. Configure `lib/gsap.ts` singleton
3. Set up font loading in `layout.tsx` (Space Grotesk, Inter, JetBrains Mono)
4. Establish CSS variables from DESIGN.md color system
5. Create base UI components: `Button`, `Card`

### Phase 2 — Hero Scaffold
6. Build `Hero.tsx` two-column layout (150vh, pinned)
7. Build `HeroText.tsx` with static content first
8. Create placeholder canvas (solid dark rectangle) for the right column
9. Verify pin behavior and scroll mechanic end-to-end

### Phase 3 — Image Sequence
10. Implement `useImageSequence.ts` hook
11. Wire up frame drawing to scroll progress in `HeroSequence.tsx`
12. Add crossfade interpolation layer
13. Test with placeholder frames (solid colors or numbered)
14. Replace with real generated frames

### Phase 4 — Polish
15. Add entrance animations for hero text
16. Mobile fallback implementation
17. Lenis integration
18. Performance audit (Lighthouse)

### Phase 5 — Content Sections
19. About section
20. Architecture section (before Projects — system diagram)
21. Projects section
22. TechStack section
23. Final accessibility pass

---

## 12. Critical Open Items (Blockers)

| Item | Status | Notes |
|------|--------|-------|
| Frame generation (02–10) | ⚠️ PENDING | Must generate 9 consistent AI portrait frames using reference |
| GSAP license | ✅ Free | GSAP free tier covers all needed plugins (ScrollTrigger included) |
| Lenis v2 API | ✅ Confirm | `lenis` vs `lenis` — use the newer `lenis` package |
| Frame naming discrepancy | ✅ Clarified | Reference has frames 02–10; use `frame-02.webp` through `frame-10.webp` |
| Canvas vs CSS approach | ✅ Decided | Canvas — specified in DESIGN.md, better performance for frame swapping |

---

## Summary of Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frame count | 9 (02–10) | Match reference exactly; optimal asset/smoothness balance |
| Rendering | Canvas API | Spec'd in DESIGN.md; fastest for image frame swapping |
| Scroll mechanic | ScrollTrigger pin, 200vh | Spec'd in DESIGN.md; industry standard for this pattern |
| Crossfade | Yes (2-layer canvas) | Softens hard cuts between frames at no extra asset cost |
| Scrub lag | 1.2s | Cinematic feel; not mechanical |
| DPR | Capped at 2× | Sharpness without GPU waste |
| Mobile fallback | Frame 09 static image | Spec'd in DESIGN.md; best "final state" expression |
| Smooth scroll | Lenis + GSAP ticker | Standard integration pattern; correct RAF ownership |
| Final frame | 10 | Full arc — head down to confident wide smile |
| Asset format | WebP @85% | Best quality/size ratio for photorealistic frames |
| Card styling | 3px border + 8px hard shadow | Neo-brutalist spec from DESIGN.md |
