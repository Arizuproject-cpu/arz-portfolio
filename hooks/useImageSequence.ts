/**
 * hooks/useImageSequence.ts
 *
 * Preloads the hero image sequence in priority order and tracks per-frame
 * load state. Detects mobile viewport to gate canvas rendering.
 *
 * SSR-safe — all browser API access is inside useEffect / useSyncExternalStore.
 * Phase 3B adds canvas draw calls; this hook only manages asset loading.
 *
 * Phase 4B: isFullyLoaded now treats settled frames (loaded OR error) as done
 * so a partial load failure does not leave the progress bar visible forever.
 */

import { useState, useEffect, useSyncExternalStore } from "react"
import {
  SEQUENCE_CONFIG,
  PRELOAD_PRIORITY,
  buildInitialLoadStates,
  calcLoadProgress,
  type FrameLoadState,
  type SequenceConfig,
} from "@/lib/sequence"

// ─── Media-query store (mobile detection) ────────────────────────────────────────

const MQ = "(max-width: 1023px)"

function subscribeMobileQuery(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const mq = window.matchMedia(MQ)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

const getMobileSnapshot = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(MQ).matches

const getMobileServerSnapshot = (): boolean => false

// ─── Public API types ────────────────────────────────────────────────────────────

export interface UseImageSequenceResult {
  /** Per-frame load state in animation order (length === config.frames.length). */
  frames: FrameLoadState[]
  /** Count of frames with status "loaded". */
  loadedCount: number
  /** Total frame count. */
  totalCount: number
  /** Integer 0–100 load progress. */
  loadProgress: number
  /**
   * True when every frame has settled (loaded or error).
   * Phase 4B: partial errors no longer keep this false indefinitely.
   */
  isFullyLoaded: boolean
  /** True when at least one frame has status "error". */
  hasError: boolean
  /** Loaded HTMLImageElement for frame 02 (first visible frame). */
  firstImage: HTMLImageElement | null
  /** Loaded HTMLImageElement for the mobile fallback frame (frame 09). */
  fallbackImage: HTMLImageElement | null
  /** True on viewports narrower than the lg breakpoint (< 1024px). */
  isMobile: boolean
}

// ─── Hook ────────────────────────────────────────────────────────────────────────

export function useImageSequence(
  config: SequenceConfig = SEQUENCE_CONFIG,
): UseImageSequenceResult {
  const [frames, setFrames] = useState<FrameLoadState[]>(() =>
    buildInitialLoadStates(config),
  )

  // useSyncExternalStore: SSR-safe, lint-clean media query subscription.
  const isMobile = useSyncExternalStore(
    subscribeMobileQuery,
    getMobileSnapshot,
    getMobileServerSnapshot,
  )

  // ── Priority preloading ───────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return

    let cancelled = false

    const loadFrame = (priorityIdx: number) => {
      const frameIdx = PRELOAD_PRIORITY[priorityIdx]
      const descriptor = config.frames[frameIdx]
      if (!descriptor) return

      // Mark loading
      setFrames((prev) => {
        const next = [...prev]
        next[frameIdx] = { ...next[frameIdx], status: "loading" }
        return next
      })

      const img = new window.Image()

      img.onload = () => {
        if (cancelled) return
        setFrames((prev) => {
          const next = [...prev]
          next[frameIdx] = {
            ...next[frameIdx],
            status: "loaded",
            image: img,
            error: null,
          }
          return next
        })
      }

      img.onerror = () => {
        if (cancelled) return
        setFrames((prev) => {
          const next = [...prev]
          next[frameIdx] = {
            ...next[frameIdx],
            status: "error",
            image: null,
            error: `Failed to load frame ${descriptor.id}`,
          }
          return next
        })
      }

      // Setting src kicks off the browser fetch.
      img.src = descriptor.src
    }

    // All loads kicked off immediately; browser manages concurrency.
    for (let i = 0; i < PRELOAD_PRIORITY.length; i++) {
      loadFrame(i)
    }

    return () => {
      // Prevent state updates after unmount. In-flight requests cannot be
      // aborted via HTMLImageElement, but the flag stops React state mutations.
      cancelled = true
    }
  }, [config])

  // ── Derived values ────────────────────────────────────────────────────────
  const loadedCount = frames.filter((f) => f.status === "loaded").length
  const errorCount  = frames.filter((f) => f.status === "error").length
  const hasError    = errorCount > 0

  // Phase 4B: a frame that fails to load is still "settled" — don't block
  // isFullyLoaded (and the progress bar) on permanent load errors.
  const isFullyLoaded = (loadedCount + errorCount) >= config.frames.length

  const loadProgress  = calcLoadProgress(frames)

  const firstIdx    = config.frames.indexOf(config.firstFrame)
  const fallbackIdx = config.frames.indexOf(config.fallbackFrame)

  return {
    frames,
    loadedCount,
    totalCount:    config.frames.length,
    loadProgress,
    isFullyLoaded,
    hasError,
    firstImage:    frames[firstIdx]?.image    ?? null,
    fallbackImage: frames[fallbackIdx]?.image ?? null,
    isMobile,
  }
}
