/**
 * lib/canvas.ts
 *
 * Canvas rendering utilities for the hero image sequence.
 *
 * Responsibilities:
 *   resizeCanvas — sync buffer dimensions to CSS size × DPR (DPR capped at 2×)
 *   drawCover    — paint an image in cover mode (analogous to object-fit: cover)
 *
 * Both functions are pure and side-effect-free beyond their canvas arguments.
 * Used by HeroSequence.tsx; nothing else should call these directly.
 */

// ─── Buffer sizing ────────────────────────────────────────────────────────────

/**
 * Ensures the canvas pixel buffer matches its CSS display size scaled by dpr.
 * Skips the assignment (and the implicit clear) when dimensions are unchanged.
 *
 * Call this at the start of every draw cycle, before any ctx operations.
 *
 * @param canvas  The canvas element to resize
 * @param dpr     Device pixel ratio, already capped by the caller (e.g. min(dpr, 2))
 * @returns       Physical buffer dimensions used for the draw cycle
 */
export function resizeCanvas(
  canvas: HTMLCanvasElement,
  dpr: number,
): { width: number; height: number } {
  const cssW = canvas.clientWidth
  const cssH = canvas.clientHeight
  const bufW = Math.round(cssW * dpr)
  const bufH = Math.round(cssH * dpr)

  if (canvas.width !== bufW || canvas.height !== bufH) {
    canvas.width  = bufW
    canvas.height = bufH
  }

  return { width: bufW, height: bufH }
}

// ─── Cover-mode drawing ───────────────────────────────────────────────────────

/** Vertical alignment used when the image is taller than the canvas. */
export type VerticalAlign = "top" | "center" | "bottom"

/**
 * Draws `image` onto `ctx` in CSS `object-fit: cover` mode.
 *
 * The image is scaled uniformly so that neither dimension is smaller than
 * the corresponding canvas dimension, then cropped by `alignY`.
 *
 * Uses `alignY = "top"` by default so the face/hair stay in frame on
 * portrait crops — matching the mobile fallback's `object-position: top`.
 *
 * @param ctx      2D context to draw into (expects identity transform)
 * @param image    Fully loaded HTMLImageElement
 * @param canvasW  Physical buffer width (post-DPR)
 * @param canvasH  Physical buffer height (post-DPR)
 * @param alignY   Vertical crop anchor (default: "top")
 */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasW: number,
  canvasH: number,
  alignY: VerticalAlign = "top",
): void {
  const imgW = image.naturalWidth
  const imgH = image.naturalHeight

  if (imgW === 0 || imgH === 0 || canvasW === 0 || canvasH === 0) return

  const imgAspect    = imgW / imgH
  const canvasAspect = canvasW / canvasH

  let drawW: number
  let drawH: number

  if (imgAspect > canvasAspect) {
    // Image is wider relative to canvas → scale by height, crop sides
    drawH = canvasH
    drawW = canvasH * imgAspect
  } else {
    // Image is taller relative to canvas → scale by width, crop top/bottom
    drawW = canvasW
    drawH = canvasW / imgAspect
  }

  // Horizontal: always centered
  const offsetX = (canvasW - drawW) / 2

  // Vertical: controlled by alignY
  let offsetY: number
  if (alignY === "bottom") {
    offsetY = canvasH - drawH
  } else if (alignY === "center") {
    offsetY = (canvasH - drawH) / 2
  } else {
    offsetY = 0 // "top"
  }

  ctx.drawImage(image, offsetX, offsetY, drawW, drawH)
}
