/**
 * hooks/useHeroScrollProgress.ts
 *
 * Scroll progress hook for the hero image sequence.
 *
 * Phase 3C original: GSAP ScrollTrigger with pin.
 * Phase 9+: Replaced with CSS sticky + native scroll listener.
 *
 * The hero section is 200vh tall (set in Hero.tsx). The inner content
 * is position:sticky so it stays in view. This hook reads window.scrollY
 * and maps the first 100vh of hero scroll to a 0–1 progress value.
 *
 * Why: Lenis + GSAP ScrollTrigger pin has a known integration conflict
 * where onUpdate never fires. CSS sticky is native, reliable, and simpler.
 *
 * Desktop only (≥ 1024px) — mobile renders static fallback.
 * Respects prefers-reduced-motion — jumps to final frame if reduced.
 */

import { useRef, useState, useEffect, type RefObject } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UseHeroScrollProgressResult {
  /** 0–1 scroll progress through the hero pin window */
  scrollProgress: number
  /**
   * Attach to the outermost hero <section>.
   * Used to calculate scroll position relative to the section.
   */
  sectionRef: RefObject<HTMLElement | null>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useHeroScrollProgress(): UseHeroScrollProgressResult {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Respect prefers-reduced-motion — show final frame immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScrollProgress(1)
      return
    }

    // Mobile: no animation — HeroSequence renders static fallback
    if (window.matchMedia("(max-width: 1023px)").matches) return

    const section = sectionRef.current
    if (!section) return

    const calcProgress = () => {
      // getBoundingClientRect().top = 0 when section is at viewport top.
      // As user scrolls DOWN, rect.top becomes negative.
      // We map scrolled distance (0 → innerHeight) to progress (0 → 1).
      const rect = section.getBoundingClientRect()
      const scrolled = -rect.top                          // px scrolled past section top
      const range   = window.innerHeight                  // animate over 1× viewport height
      const progress = Math.max(0, Math.min(1, scrolled / range))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", calcProgress, { passive: true })
    calcProgress() // initial state

    return () => window.removeEventListener("scroll", calcProgress)
  }, [])

  return { scrollProgress, sectionRef }
}
