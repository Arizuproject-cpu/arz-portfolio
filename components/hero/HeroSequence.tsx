"use client"

/**
 * components/hero/HeroSequence.tsx
 *
 * Right column of the hero section — canvas image sequence.
 *
 * Direction C updates:
 *   - Terminal window header: traffic lights (red/yellow/green) + path + frame counter
 *   - Terminal window footer: scroll_to_animate prompt
 *   - Portrait card height reduced to avoid touching section boundary
 */

import { useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { useImageSequence } from "@/hooks/useImageSequence"
import { SEQUENCE_CONFIG, progressToFrameIndex, type FrameLoadState } from "@/lib/sequence"
import { resizeCanvas, drawCover } from "@/lib/canvas"

interface HeroSequenceProps {
  scrollProgress?: number
  className?: string
}

function resolveFrame(
  frames: FrameLoadState[],
  targetIndex: number,
): FrameLoadState | null {
  const target = frames[targetIndex]
  if (target?.status === "loaded" && target.image) return target
  for (let d = 1; d < frames.length; d++) {
    const lo = frames[targetIndex - d]
    if (lo?.status === "loaded" && lo.image) return lo
    const hi = frames[targetIndex + d]
    if (hi?.status === "loaded" && hi.image) return hi
  }
  return null
}

function frameLabel(index: number): string {
  return String(index + 2).padStart(2, "0")
}

// macOS-style traffic light colors
const TRAFFIC_LIGHTS = [
  { color: "#FF5F57", label: "close"    },
  { color: "#FEBC2E", label: "minimize" },
  { color: "#28C840", label: "maximize" },
]

export default function HeroSequence({
  scrollProgress = 0,
  className = "",
}: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { frames, isFullyLoaded, loadProgress, hasError, isMobile } =
    useImageSequence()

  const currentFrameIndex = progressToFrameIndex(scrollProgress)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const frameState = resolveFrame(frames, currentFrameIndex)
    if (!frameState) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = resizeCanvas(canvas, dpr)
    ctx.clearRect(0, 0, width, height)
    drawCover(ctx, frameState.image!, width, height, "center")
  }, [frames, currentFrameIndex])

  useEffect(() => {
    if (!isMobile) draw()
  }, [draw, isMobile])

  useEffect(() => {
    if (isMobile || typeof window === "undefined") return
    const onResize = () => draw()
    window.addEventListener("resize", onResize, { passive: true })
    return () => window.removeEventListener("resize", onResize)
  }, [draw, isMobile])

  return (
    <div
      className={["flex justify-center lg:justify-end", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/*
       * Portrait card — 9:16 ratio.
       * Max height accounts for: navbar (60px) + ticker (~36px) + padding (96px)
       * = ~192px overhead, so card height ≤ 100vh - 200px, width = height * 9/16.
       * Extra 8px margin-bottom gives visual breathing room from the ticker.
       */}
      <div
        className="relative w-full mx-auto lg:mx-0 mb-16 lg:mb-24"
        style={{
          maxWidth: "min(440px, calc((100vh - 220px) * 9 / 16))",
          maxHeight: "min(780px, calc(100vh - 220px))",
          aspectRatio: "9 / 16",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            border: "3px solid #111111",
            background: "#F7F7F2",
            boxShadow: "8px 8px 0px #111111",
          }}
        >

          {/* ── Terminal window header ──────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "rgba(17,17,17,0.92)",
              borderBottom: "2px solid #C8FF00",
              padding: "7px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 4,
            }}
          >
            {/* Left: traffic lights + path */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {TRAFFIC_LIGHTS.map(({ color, label }) => (
                <span
                  key={label}
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "9px",
                  color: "#888888",
                  letterSpacing: "0.04em",
                  marginLeft: "4px",
                }}
              >
                ~/arizu.webp
              </span>
            </div>

            {/* Right: frame counter + blinking dot */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "9px",
                  color: "#555555",
                  letterSpacing: "0.06em",
                }}
              >
                [{frameLabel(currentFrameIndex)}/10]
              </span>
              <span
                className="terminal-cursor"
                style={{ width: "6px", height: "6px", borderRadius: "50%", border: "none" }}
              />
            </div>
          </div>

          {/* ── Ambient lime glow ────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "10% 10% 20%",
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(200,255,0,0.22), transparent 65%)",
              filter: "blur(32px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* ── Error state ──────────────────────────────────────────────── */}
          {hasError && (
            <div
              className="absolute inset-0 flex items-center justify-center p-8"
              role="alert"
              style={{ zIndex: 2 }}
            >
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#3a3a3a] text-center">
                Sequence unavailable
              </p>
            </div>
          )}

          {/* ── Mobile: static fallback ──────────────────────────────────── */}
          {isMobile && !hasError && (
            <Image
              src={SEQUENCE_CONFIG.fallbackFrame.src}
              alt="Arizu — AI Systems Builder"
              fill
              sizes="(max-width: 1023px) 100vw, 420px"
              className="object-cover object-top"
              priority={false}
              draggable={false}
              style={{ zIndex: 1 }}
            />
          )}

          {/* ── Desktop: canvas sequence ─────────────────────────────────── */}
          {!isMobile && !hasError && (
            <canvas
              ref={canvasRef}
              aria-label="Arizu — hero portrait sequence"
              role="img"
              className="hero-canvas-mask"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                opacity: loadProgress > 0 ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          )}

          {/* ── Loading progress bar ─────────────────────────────────────── */}
          {!isFullyLoaded && !hasError && !isMobile && (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] bg-accent"
              style={{
                width: loadProgress + "%",
                transition: "width 0.25s ease",
                zIndex: 3,
              }}
            />
          )}

          {/* ── Terminal window footer ───────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(17,17,17,0.75)",
              borderTop: "1px solid rgba(200,255,0,0.35)",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              zIndex: 4,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "8px",
                color: "rgba(200,255,0,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              {">"} scroll_to_animate
            </span>
            <span style={{ fontFamily: "var(--font-code)", fontSize: "8px", color: "rgba(200,255,0,0.4)" }}>
              {"▼"}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
