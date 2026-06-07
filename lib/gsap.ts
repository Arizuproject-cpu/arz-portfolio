/**
 * GSAP singleton — registers plugins once, safe for Next.js SSR.
 *
 * Import gsap and ScrollTrigger exclusively from this module
 * to avoid duplicate plugin registration warnings.
 */
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
