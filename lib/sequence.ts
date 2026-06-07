/**
 * lib/sequence.ts
 *
 * Frame manifest, config constants, and utility types for the hero image sequence.
 *
 * Frames : 9 total (02–10), stored as WebP in /public/sequence/
 * Motion : sunglasses fall from hair to eyes
 * Phase 3B : canvas rendering + GSAP ScrollTrigger integration
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Describes a single frame asset. */
export interface FrameDescriptor {
  /** Zero-based sequential index (0 = frame 02, 8 = frame 10). */
  index: number
  /** Asset filename stem e.g. "02", "10". */
  id: string
  /** Public URL passed to HTMLImageElement.src or next/image. */
  src: string
}

/** Lifecycle of a single frame load. */
export type LoadStatus = "idle" | "loading" | "loaded" | "error"

/** Per-frame load state tracked in useImageSequence. */
export interface FrameLoadState {
  descriptor: FrameDescriptor
  status: LoadStatus
  /** Populated once status === "loaded". */
  image: HTMLImageElement | null
  error: string | null
}

/** Top-level sequence configuration passed to the hook. */
export interface SequenceConfig {
  /** All frames in animation order (index 0 → last). */
  frames: FrameDescriptor[]
  /** Frame at scroll progress 0 — sunglasses on hair (frame 02). */
  firstFrame: FrameDescriptor
  /** Frame at scroll progress 1 — sunglasses on eyes (frame 10). */
  lastFrame: FrameDescriptor
  /** Mobile static fallback — sunglasses nearly on (frame 09). */
  fallbackFrame: FrameDescriptor
  /** Public asset directory root. */
  dir: string
}

// ─── Frame manifest ─────────────────────────────────────────────────────────────

const SEQUENCE_DIR = "/sequence"

/** Builds descriptors for frames 02–10. */
function buildFrames(): FrameDescriptor[] {
  return Array.from({ length: 9 }, (_, i) => {
    const id = String(i + 2).padStart(2, "0")
    return { index: i, id, src: `${SEQUENCE_DIR}/${id}.webp` }
  })
}

export const SEQUENCE_CONFIG: SequenceConfig = (() => {
  const frames = buildFrames()
  return {
    frames,
    firstFrame:    frames[0], // 02 — sunglasses on hair
    lastFrame:     frames[8], // 10 — sunglasses on eyes
    fallbackFrame: frames[7], // 09 — sunglasses nearly on (mobile)
    dir: SEQUENCE_DIR,
  }
})()

// ─── Preload priority ────────────────────────────────────────────────────────────

/**
 * Indices into SEQUENCE_CONFIG.frames[], in order of load priority.
 *
 * 1. index 0  (frame 02) — first visible frame, shown immediately
 * 2. index 8  (frame 10) — final resting state
 * 3. index 7  (frame 09) — mobile fallback
 * 4. Remaining in animation order so mid-scroll frames arrive early
 */
export const PRELOAD_PRIORITY: readonly number[] = [0, 8, 7, 1, 2, 3, 4, 5, 6]

// ─── Utilities ───────────────────────────────────────────────────────────────────

/**
 * Maps a 0–1 scroll progress value to a frame array index.
 * Clamped and rounded.
 */
export function progressToFrameIndex(
  progress: number,
  frameCount: number = SEQUENCE_CONFIG.frames.length,
): number {
  const clamped = Math.max(0, Math.min(1, progress))
  return Math.round(clamped * (frameCount - 1))
}

/**
 * Returns an integer 0–100 representing how many frames have loaded.
 */
export function calcLoadProgress(states: FrameLoadState[]): number {
  if (states.length === 0) return 0
  const loaded = states.filter((s) => s.status === "loaded").length
  return Math.round((loaded / states.length) * 100)
}

/**
 * Produces the initial FrameLoadState array — all frames idle.
 */
export function buildInitialLoadStates(
  config: SequenceConfig = SEQUENCE_CONFIG,
): FrameLoadState[] {
  return config.frames.map((descriptor) => ({
    descriptor,
    status: "idle",
    image: null,
    error: null,
  }))
}
