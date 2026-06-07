# Design Decisions

Rationale for key technical and visual choices in the portfolio build.

---

## Visual Direction — Neo-Brutalist Professional

**Decision:** Neo-Brutalist style with hard borders, hard shadows, and a warm off-white background.

**Why:** The target audience for this portfolio is technical — engineers, founders, and hiring managers who build and evaluate infrastructure. Glassmorphism, gradients, and soft shadows read as decorative. Hard-edge Neo-Brutalism reads as precise and intentional, which mirrors the systems-thinking the portfolio is meant to communicate.

The reference set (Linear, Vercel, Stripe, Railway) shares a design language: high contrast, structured hierarchy, minimal decoration. This portfolio sits in that family.

**What was explicitly rejected:**
- Glassmorphism — too decorative, associated with consumer apps
- Cyberpunk / gamer aesthetics — wrong audience signal
- SaaS dashboard styling — too product-UI, not personal
- Full dark mode — the warm off-white `#F7F7F2` is warmer and more editorial than pure white while still reading professional

---

## Hero Height — 150vh (not 200vh)

**Decision:** The hero scroll zone is `150vh`, down from an initial `200vh`.

**Why:** `200vh` requires the user to scroll two full viewport heights before reaching the next section. For a 9-frame sequence, this over-extends the gesture. At `150vh`:

- Each frame occupies roughly one-sixth of a viewport height of scroll travel
- The sequence completes before fatigue sets in
- The next section enters the viewport sooner, reinforcing forward momentum

`150vh` was chosen over `100vh` (which would be too fast to scrub deliberately) and `200vh` (which feels padded).

---

## Canvas API over CSS Opacity Stacking

**Decision:** Render frames via `canvas.drawImage()`, not by stacking `<img>` elements with `opacity`.

**Why:**

| Approach | Layers in DOM | GPU compositing | Frame switching |
|---|---|---|---|
| CSS opacity stack | 9 elements always present | 9 layers composited | Opacity change on each tick |
| Canvas `drawImage` | 1 element | 1 layer composited | Single draw call per tick |

Canvas produces a single composited layer. The browser does not maintain 9 image layers in the GPU compositor. For a sequence that updates every RAF tick during scroll, this is the correct approach.

The crossfade (2-layer `globalAlpha` blend) adds one extra `drawImage` call per tick but no additional compositor layers.

---

## Lenis over Native Smooth Scroll

**Decision:** Use `lenis` for smooth scroll instead of `scroll-behavior: smooth` or the browser's native smooth scroll.

**Why:** GSAP's ScrollTrigger reads from a virtual scroll position. When Lenis controls the RAF loop and feeds into `gsap.ticker`, ScrollTrigger gets the eased position — so the hero sequence scrubs smoothly even when the user scrolls fast. With native smooth scroll, `ScrollTrigger` would read the physical `window.scrollY`, causing the sequence to jump ahead of the visual scroll position.

`lenis` (not `@studio-freight/lenis`) is used — it is the actively maintained successor package with the same API.

The integration pattern:

```typescript
const lenis = new Lenis({ autoRaf: false })

gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

`lagSmoothing(0)` prevents GSAP from skipping ticks during tab-switch recovery, which would cause the sequence to teleport forward.

---

## Frame Count — 9 (02–10, including Frame 10)

**Decision:** Use all 9 frames from the reference contact sheet, ending on Frame 10.

**Why 9 frames:**
- The motion is not complex (glasses fall in a straight path) — 9 frames covers it without over-engineering
- Fewer assets than video or a 30+ frame sequence
- WebP compression at 600px wide keeps total payload under 1MB

**Why Frame 10 as the final frame:**
Frame 10 shows a wide smile and a slight head turn — the natural conclusion of the gesture. Frame 09 (direct gaze, slight smile) is reserved as the mobile static fallback because it is the strongest single-frame representation of the final confident state.

---

## GSAP `scrub: 1.2` — Not `true`

**Decision:** Set `scrub: 1.2` instead of `scrub: true`.

**Why:** `scrub: true` maps physical scroll position to animation progress with zero lag — every scroll tick snaps the frame instantly. This makes the sequence feel mechanical.

`scrub: 1.2` introduces a 1.2-second ease-lag. The animation catches up to the scroll position with a smooth inertia. This is the same technique used on Apple product pages and gives the sequence a cinematic quality without adding complexity to the asset pipeline.

---

## Font Selection

**Decision:** Space Grotesk (headings) + Inter (body) + JetBrains Mono (code/tags).

**Why:**

- **Space Grotesk** is geometric but has deliberate imperfections in its letterforms — it reads technical without being cold. It aligns with the "AI systems" positioning better than a pure geometric sans (e.g., Neue Haas Grotesk) or a humanist sans (e.g., Söhne).
- **Inter** is the standard for technical UIs. It is highly legible at small sizes, designed for screens, and signals seriousness without visual friction.
- **JetBrains Mono** on tech stack tags reinforces the "engineer" framing with a visual code-editor signal. It is not used decoratively — only where a technical, monospace context is appropriate.

---

## Section Order — Architecture Before Projects

**Decision:** Architecture section appears before Projects in the page order.

**Why:** The Architecture section contains the Arz-Orchestrator system diagram — a visual representation of how the system is structured (User → Orchestrator → Router → Tools → Memory → Agents). Showing this first establishes depth of thinking. When the Projects section follows, the reader already has a mental model of the system. The project cards become evidence of a known architecture rather than isolated outputs.

This order reinforces the portfolio's primary message: "This person thinks in systems."

---

## `lib/gsap.ts` Singleton Pattern

**Decision:** All GSAP and ScrollTrigger imports go through `lib/gsap.ts`.

**Why:** Importing `gsap.registerPlugin(ScrollTrigger)` in multiple components causes duplicate registration warnings in GSAP 3. A single module with a browser guard ensures registration happens exactly once, regardless of how many components import from it. Next.js module deduplication guarantees the singleton is not re-evaluated across hot reloads.

---

## No Dashboard UI

The portfolio does not contain charts, tables, status indicators, live data feeds, or any dashboard-style interface elements. These patterns are appropriate for product UIs, not personal portfolios. The presence of dashboard components would undermine the "systems builder" message by signalling "this person makes dashboards" rather than "this person architects systems."
