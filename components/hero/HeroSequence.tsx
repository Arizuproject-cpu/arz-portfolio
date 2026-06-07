"use client"

/**
 * components/hero/HeroSequence.tsx
 *
 * Right column of the hero section.
 *
 * Phase 3A — Structural scaffold:
 *   - Wires useImageSequence for priority preloading
 *   - Mobile branch: static <img> fallback (frame 09)
 *   - Desktop branch: <canvas> element + initial first-frame paint
 *   - Loading progress bar, error state
 *   - scrollProgress prop accepted for API stability (unused until 3B)
 *
 * Phase 3B — Canvas animation:
 *   - GSAP ScrollTrigger scrub replaces the stub useEffect
 *   - 2-layer crossfade, DPR 2×, cover-mode drawing
 */

import { useRef, useEffect } from "react"
import Image from "next/image"
import { useImageSequence } from "@/hooks/useImageSequence"
import { SEQUENCE_CONFIG } from "@/lib/sequence"

// ─── Types ───────────────────────────────────────────────────────────────────

interface HeroSequenceProps {
  /**
   * Scroll progress 0–1 injected by the parent ScrollTrigger (Phase 3B).
   * Accepted here so the prop API is stable — not used in Phase 3A.
   */
  scrollProgress?: number
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroSequence({
  scrollProgress = 0,
  className = "",
}: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const {
    isFullyLoaded,
    loadProgress,
    hasError,
    isMobile,
    firstImage,
    fallbackImage,
  } = useImageSequence()

  // ── Phase 3A: paint first frame once it loads ─────────────────────────────
  // Phase 3B replaces this with the full GSAP ScrollTrigger draw loop.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isMobile || !firstImage) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas resolution to native image dimensions.
    // Phase 3B will cap DPR at 2× and use cover-mode drawing.
    canvas.width  = firstImage.naturalWidth
    canvas.height = firstImage.naturalHeight
    ctx.drawImage(firstImage, 0, 0)
  }, [firstImage, isMobile])

  // ── Phase 3A stub: scrollProgress consumed to avoid unused-var lint ───────
  void scrollProgress

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={["flex justify-center lg:justify-end", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Portrait card — 9:16 ratio, max 420px wide on desktop */}
      <div
        className="relative w-full"
        style={{ maxWidth: "420px", aspectRatio: "9 / 16" }}
      >
        <div
          className="absolute inset-0 border-[3px] border-primary overflow-hidden"
          style={{
            background: "#0C0C0C",
            boxShadow: "8px 8px 0px #111111",
          }}
        >

          {/* ── Error state ───────────────────────────────────────────────── */}
          {hasError && (
            <div
              className="absolute inset-0 flex items-center justify-center p-8"
              role="alert"
            >
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#3a3a3a] text-center">
                Sequence unavailable
              </p>
            </div>
          )}

          {/* ── Mobile: static fallback image ─────────────────────────────── */}
          {isMobile && !hasError && (
            <Image
              src={
                fallbackImage
                  ? fallbackImage.src
                  : SEQUENCE_CONFIG.fallbackFrame.src
              }
              alt="Arizu — AI Systems Builder"
              fill
              className="object-cover object-top"
              priority={false}
              draggable={false}
            />
          )}

          {/* ── Desktop: canvas sequence ───────────────────────────────────── */}
          {!isMobile && !hasError && (
            <canvas
              ref={canvasRef}
              aria-label="Arizu — hero portrait sequence"
              role="img"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: loadProgress > 0 ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          )}

          {/* ── Loading progress bar ───────────────────────────────────────── */}
          {!isFullyLoaded && !hasError && (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] bg-accent"
              style={{
                width: `${loadProgress}%`,
                transition: "width 0.25s ease",
              }}
            />
          )}

        </div>
      </div>
    </div>
  )
}
