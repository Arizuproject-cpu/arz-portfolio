"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/**
 * Providers — client-side shell that boots Lenis smooth scroll
 * and wires it into the GSAP ticker so ScrollTrigger stays in sync.
 *
 * Must be a Client Component; imported into the Server Component layout.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,      // GSAP owns the RAF loop
    })

    // Wire Lenis scroll events into ScrollTrigger so it reads
    // Lenis's virtual position instead of native scrollY.
    // Without this, ScrollTrigger never fires onUpdate.
    lenis.on("scroll", () => ScrollTrigger.update())

    // Feed Lenis into GSAP's RAF — ScrollTrigger reads from here
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
