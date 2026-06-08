"use client"

/**
 * components/nav/Navbar.tsx
 *
 * Fixed top navigation bar — 60px height, backdrop blur.
 *
 * Direction C: nav links styled as Unix path references (~/work),
 * AVAILABLE badge wrapped in bracket notation [AVAILABLE].
 * macOS-style traffic light dots appear left of the wordmark.
 *
 * Phase 10: brand renamed ARIZU, nav Stack → #stack.
 */

import Link from "next/link"

const TRAFFIC_LIGHTS = [
  { color: "#FF5F57" },
  { color: "#FEBC2E" },
  { color: "#28C840" },
]

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "60px",
        background: "rgba(247,247,242,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "2px solid rgba(17,17,17,0.10)",
      }}
    >
      <div className="container h-full flex items-center justify-between">

        {/* Left: traffic lights + wordmark */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-[6px]" aria-hidden="true">
            {TRAFFIC_LIGHTS.map(({ color }) => (
              <span
                key={color}
                style={{
                  display: "inline-block",
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background: color,
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <Link
            href="/"
            className="font-heading font-bold text-lg"
            style={{ letterSpacing: "-0.03em", color: "#111111" }}
          >
            ARIZU
          </Link>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <Link
            href="#projects"
            className="font-code text-[11px] font-medium tracking-[0.04em]"
            style={{ color: "#666666" }}
          >
            ~/work
          </Link>
          <Link
            href="#stack"
            className="font-code text-[11px] font-medium tracking-[0.04em]"
            style={{ color: "#666666" }}
          >
            ~/stack
          </Link>
          <Link
            href="#contact"
            className="font-code text-[11px] font-medium tracking-[0.04em]"
            style={{ color: "#666666" }}
          >
            ~/contact
          </Link>

          <span
            className="font-code text-[10px] font-medium"
            style={{
              background: "#00D9FF",
              border: "2px solid #111111",
              padding: "3px 10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            [AVAILABLE]
          </span>
        </nav>

      </div>
    </header>
  )
}
