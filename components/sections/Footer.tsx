"use client"

/**
 * components/sections/Footer.tsx
 *
 * Phase 10 — Minimal neo-brutalist footer.
 *
 * Content: © 2026 Arizu | AI Systems Builder
 * Style: black background, cream text, top border 3px #111111
 */

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-[#111111]"
      style={{ borderTop: "3px solid #111111" }}
    >
      <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Wordmark */}
        <span
          className="font-heading font-bold text-[15px] tracking-tight"
          style={{ color: "#F7F7F2", letterSpacing: "-0.02em" }}
        >
          ARIZU
        </span>

        {/* Centre: role */}
        <span
          className="font-code text-[11px] tracking-[0.12em] uppercase"
          style={{ color: "#555555" }}
        >
          AI Systems Builder
        </span>

        {/* Copyright */}
        <span
          className="font-code text-[11px]"
          style={{ color: "#444444" }}
        >
          © 2026 Arizu
        </span>

      </div>
    </footer>
  )
}
