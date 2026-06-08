"use client"

/**
 * components/hero/Hero.tsx
 *
 * Hero — primary landing section.
 *
 * Layout:
 *   - Desktop: two-column grid (55/45), sticky inner, 160vh section
 *   - Mobile:  single-column stack, natural scroll
 *
 * Scroll: section is 160vh. Inner div is sticky top-[60px] (below navbar),
 * height = calc(100vh - 60px). Animation plays over the first 100vh of scroll.
 * The remaining 60vh gives a brief hold before the next section enters.
 *
 * Direction C: hero section uses z-index:0 (auto) so the sections wrapper
 * in page.tsx (z-index:1) renders above it as the user scrolls past.
 *
 * Terminal ticker: status marquee strip at the bottom of the sticky viewport.
 * Duplicated content creates a seamless loop at -50% translateX.
 */

import { useHeroScrollProgress } from "@/hooks/useHeroScrollProgress"
import HeroText from "./HeroText"
import HeroSequence from "./HeroSequence"

// ─── Ticker content ───────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "sys.status: ONLINE",
  "// ai_builder",
  "model: claude-3-opus",
  "env: production",
  "queue: idle",
  "latency: 42ms",
  "context: 128k tokens",
  "// automation_eng",
  "workers: 3 active",
  "memory: 94% indexed",
  "tools: 12 registered",
  "// sys_architect",
  "uptime: 99.9%",
  "last_deploy: today",
]

const TICKER_STRING =
  TICKER_ITEMS.map((item) => `  ${item}  ·`).join("") + "  "

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const { scrollProgress, sectionRef } = useHeroScrollProgress()

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="hero"
      aria-label="Hero"
      className="relative bg-background"
      style={{ height: "160vh", minHeight: "100vh" }}
    >
      <div
        className="lg:sticky flex flex-col"
        style={{
          top: "60px",
          height: "calc(100vh - 60px)",
        }}
      >
        {/* ── Main grid — fills all available space ── */}
        <div
          className="flex-1 flex items-center"
          style={{
            paddingTop: "clamp(24px, 3vw, 40px)",
            paddingBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          <div className="container w-full">
            <div
              className={[
                "grid grid-cols-1 lg:grid-cols-[55fr_45fr]",
                "items-center",
                "gap-16 xl:gap-24",
              ].join(" ")}
            >
              <HeroText />
              <HeroSequence scrollProgress={scrollProgress} />
            </div>
          </div>
        </div>

        {/* ── Terminal status ticker ── */}
        <div
          aria-hidden="true"
          style={{
            background: "#111111",
            borderTop: "2px solid #C8FF00",
            overflow: "hidden",
            padding: "7px 0",
            flexShrink: 0,
          }}
        >
          <div className="terminal-ticker-track">
            {TICKER_STRING}{TICKER_STRING}
          </div>
        </div>

      </div>
    </section>
  )
}
