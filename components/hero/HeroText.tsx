"use client"

/**
 * components/hero/HeroText.tsx
 *
 * Left column of the hero section.
 *
 * Direction C: Terminal/CLI vocabulary layered on neo-brutalist foundation.
 * Eyebrow -> ~/home prompt + typewriter "Hello World", subtext -> // comment,
 * CTAs -> bracket style.
 */

import { useRef, useEffect, useState, memo } from "react"
import { gsap } from "@/lib/gsap"

// Typewriter config
const TYPED_TEXT = "Hello World"
const TYPING_SPEED   = 110
const DELETING_SPEED = 65
const PAUSE_AFTER_TYPE   = 1800
const PAUSE_AFTER_DELETE = 500

const HeroText = memo(function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [typed, setTyped]           = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused]     = useState(false)

  useEffect(() => {
    if (isPaused) return
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && typed.length < TYPED_TEXT.length) {
      timeout = setTimeout(
        () => setTyped(TYPED_TEXT.slice(0, typed.length + 1)),
        TYPING_SPEED,
      )
    } else if (!isDeleting && typed.length === TYPED_TEXT.length) {
      setIsPaused(true)
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, PAUSE_AFTER_TYPE)
    } else if (isDeleting && typed.length > 0) {
      timeout = setTimeout(
        () => setTyped(TYPED_TEXT.slice(0, typed.length - 1)),
        DELETING_SPEED,
      )
    } else {
      setIsPaused(true)
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(false)
      }, PAUSE_AFTER_DELETE)
    }

    return () => clearTimeout(timeout)
  }, [typed, isDeleting, isPaused])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const eyebrow = container.querySelector<HTMLElement>("[data-animate='eyebrow']")
      const headline = container.querySelector<HTMLElement>("[data-animate='headline']")
      const subtext  = container.querySelector<HTMLElement>("[data-animate='subtext']")
      const ctas     = container.querySelector<HTMLElement>("[data-animate='ctas']")

      gsap.set([eyebrow, headline, subtext, ctas], { opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 })
      tl.fromTo(eyebrow,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(headline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.75 }, "-=0.3")
        .fromTo(subtext,  { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 },  "-=0.35")
        .fromTo(ctas,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col gap-8 lg:gap-10">

      {/* Eyebrow: terminal prompt + typewriter */}
      <div
        data-animate="eyebrow"
        className="flex items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-code text-[11px] text-secondary tracking-[0.04em]">~/home</span>
        <span className="font-code text-[11px] text-secondary">$</span>
        <span
          className="font-code text-[11px]"
          style={{ color: "#111111", minWidth: "1ch" }}
          aria-hidden="true"
        >
          {typed}
        </span>
        <span className="terminal-cursor" aria-hidden="true" />
      </div>

      {/* Headline */}
      <div data-animate="headline" className="flex flex-col gap-3">
        <h1
          className="font-heading font-bold text-primary leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(52px, 6.5vw, 100px)" }}
        >
          HEY, I&apos;M ARIZU
        </h1>
        <p
          className="font-heading font-medium text-secondary leading-snug tracking-tight"
          style={{ fontSize: "clamp(22px, 2.5vw, 40px)" }}
        >
          Building AI Systems,
          <br />
          Automation Workflows,
          <br />
          and Intelligent Orchestration.
        </p>
      </div>

      {/* Subtext */}
      <p
        data-animate="subtext"
        className="text-secondary leading-relaxed"
        style={{ fontSize: "clamp(16px, 1.1vw, 20px)", maxWidth: "50ch" }}
      >
        <span className="font-code select-none" style={{ fontSize: "0.8em", color: "#AAAAAA" }} aria-hidden="true">
          {"// "}
        </span>
        I design and build AI-powered systems that automate workflows, route
        tools, manage memory, and turn ideas into reliable execution.
      </p>

      {/* CTAs */}
      <div data-animate="ctas" className="flex flex-col gap-4 pt-2">
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="btn-base px-8 py-4 text-base bg-[#111111] text-[#F7F7F2] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#C8FF00] focus-visible:shadow-[6px_6px_0px_#C8FF00]"
            style={{ fontFamily: "var(--font-code)" }}
          >
            [&#x25B6; PROJECTS]
          </a>
          <a
            href="#architecture"
            className="btn-base px-8 py-4 text-base bg-[#FFFFFF] text-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] focus-visible:shadow-[6px_6px_0px_#111111]"
            style={{ fontFamily: "var(--font-code)" }}
          >
            [SYSTEM.MAP]
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {["AI_BUILDER", "AUTOMATION_ENG", "SYS_ARCHITECT"].map((tag) => (
            <span
              key={tag}
              className="font-code"
              style={{ fontSize: "9px", padding: "3px 8px", border: "1.5px solid rgba(17,17,17,0.25)", color: "#666666", letterSpacing: "0.06em" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
})

export default HeroText
