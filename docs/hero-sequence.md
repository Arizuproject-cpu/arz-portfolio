# Hero Image Sequence

Technical specification for the scroll-driven image sequence in the hero section.

---

## Overview

The hero right column renders a 9-frame portrait sequence (frames 02–10) on an HTML `<canvas>` element. Scroll progress drives frame selection via GSAP ScrollTrigger. The effect: as the user scrolls, sunglasses fall from the subject's hair to their eyes, ending in a confident pose.

This is a client-side Canvas API implementation — not CSS, not video, not WebGL.

---

## Scroll Mechanic

The hero section is `150vh` tall. The inner content is pinned to the viewport for the full scroll distance.

```
Scroll 0%   → Frame 02 (head down, no glasses visible)
Scroll ~45% → Frame 05–06 (glasses landing)
Scroll 100% → Frame 10 (final wide smile), hero unpins
```

After 150vh, the pin releases and the user scrolls naturally into the About section.

### ScrollTrigger configuration

```typescript
ScrollTrigger.create({
  trigger: heroSectionRef.current,
  start: "top top",
  end: `+=${window.innerHeight * 0.5}`,   // 150vh total
  pin: heroInnerRef.current,
  scrub: 1.2,                              // 1.2s lag — cinematic, not mechanical
  onUpdate: (self) => {
    drawFrame(self.progress)
  },
})
```

`scrub: 1.2` adds a subtle ease-lag between physical scroll and animation progress. This prevents the sequence from feeling like a mechanical slideshow.

---

## Canvas Rendering

### Frame selection

```typescript
const totalFrames = images.length  // 9

function drawFrame(progress: number) {
  const rawIndex = progress * (totalFrames - 1)
  const currentIndex = Math.floor(rawIndex)
  const nextIndex = Math.min(currentIndex + 1, totalFrames - 1)
  const blend = rawIndex % 1   // fractional position between frames

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Bottom layer — current frame
  ctx.globalAlpha = 1
  ctx.drawImage(images[currentIndex], 0, 0, displayW, displayH)

  // Top layer — next frame blended in
  if (blend > 0) {
    ctx.globalAlpha = blend
    ctx.drawImage(images[nextIndex], 0, 0, displayW, displayH)
    ctx.globalAlpha = 1
  }
}
```

The 2-layer crossfade makes the transition between frames feel like a smooth dissolve rather than a hard cut, at zero additional asset cost.

### DPR (Retina sharpness)

```typescript
const dpr = Math.min(window.devicePixelRatio, 2)   // cap at 2× — 3× wastes GPU memory

canvas.width  = displayWidth  * dpr
canvas.height = displayHeight * dpr
canvas.style.width  = `${displayWidth}px`
canvas.style.height = `${displayHeight}px`

ctx.scale(dpr, dpr)
```

### Canvas sizing

The canvas fills the right column but respects the 9:16 aspect ratio:

```typescript
const displayWidth  = Math.min(containerWidth, 600)
const displayHeight = displayWidth * (16 / 9)
```

Maximum rendered width: 600px. Beyond this, additional pixel density yields no perceptible quality improvement for portrait photos.

---

## Frame Loading — `useImageSequence`

```typescript
// components/hero/useImageSequence.ts

function useImageSequence(urls: string[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const imgs = urls.map((url) => {
      const img = new Image()
      img.src = url
      return img
    })

    // Prioritise first 4 frames — needed for early scroll
    const priority = imgs.slice(0, 4)
    const deferred = imgs.slice(4)

    Promise.all(priority.map((img) => img.decode()))
      .then(() => {
        setImages(imgs)
        setLoaded(true)
        // Load remaining frames in the background
        deferred.forEach((img) => img.decode())
      })

    return () => {
      imgs.forEach((img) => { img.src = "" })
    }
  }, [urls])

  return { images, loaded }
}
```

`img.decode()` guarantees the image is fully decoded into GPU memory before the first canvas draw — preventing a blank flash on the first scroll tick.

---

## Frame Assets

### File locations

```
public/frames/
├── frame-02.webp   # Head down, no glasses
├── frame-03.webp   # Glasses begin to fall
├── frame-04.webp   # Mid fall
├── frame-05.webp   # Near eyes
├── frame-06.webp   # Land on eyes
├── frame-07.webp   # Adjust moment
├── frame-08.webp   # Look up, confident
├── frame-09.webp   # Final pose — direct gaze
├── frame-10.webp   # Final pose — wide smile
└── frame-fallback.webp   # Mobile static (frame 09 content, 400×711px)
```

### Specifications

| Property | Value |
|---|---|
| Format | WebP |
| Quality | 85% |
| Dimensions | 600 × 1067px (9:16) |
| Max size per frame | 120KB |
| Total budget | ≤ 1.0MB |
| Mobile fallback | 400 × 711px, ≤ 60KB |

### Generation guide

Reference file: `public/reference/arizu-reference.png`

Each frame must be generated with consistent identity, lighting, and background:

| Frame | Motion state |
|---|---|
| 02 | Head slightly bowed, no sunglasses visible |
| 03 | Sunglasses beginning to slide from hairline |
| 04 | Sunglasses at mid-face, slightly crooked |
| 05 | Sunglasses near eyes, almost in position |
| 06 | Sunglasses just landing, slightly askew |
| 07 | Hand adjusting glasses, micro-expression |
| 08 | Head raised, glasses on, looking slightly up |
| 09 | Direct gaze, glasses settled, slight smile |
| 10 | Wide smile, head slightly turned |

**Consistency requirements:** same `--seed` across frames (Midjourney) or consistent ControlNet reference (ComfyUI/Flux). Use the reference image as character/style anchor.

---

## Mobile Fallback

### Detection

```typescript
const isMobile = useMediaQuery("(max-width: 768px)")
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

const useStaticFallback = isMobile || prefersReducedMotion
```

Data-saver mode: `navigator.connection?.saveData === true` also triggers fallback.

### Fallback behaviour

- Canvas replaced with `<img src="/frames/frame-fallback.webp" />`
- No ScrollTrigger pin — hero is `height: auto`
- No GSAP sequence — Lenis smooth scroll remains active
- Layout: single column stack (text above image)

The fallback frame (09) shows the subject with glasses on and a direct gaze — the most representative final state.

---

## Component Structure

```
components/hero/
├── Hero.tsx              # 150vh section wrapper, pin setup
├── HeroText.tsx          # Left column — heading, copy, CTAs
├── HeroSequence.tsx      # Right column — canvas + fallback logic
└── useImageSequence.ts   # Frame preloading hook
```

### Data flow

```
Hero.tsx
  └── initialises ScrollTrigger pin
  └── passes scrollProgress (0→1) to HeroSequence
        └── HeroSequence reads images from useImageSequence
        └── calls drawFrame(progress) on canvas
```
