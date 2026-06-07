import HeroText from "./HeroText"
import HeroSequencePlaceholder from "./HeroSequencePlaceholder"

/**
 * Hero — primary landing section.
 *
 * Layout:
 *   - Desktop: two-column grid (55 / 45), sticky inner content
 *   - Mobile:  single-column stack, natural scroll
 *
 * Scroll mechanics:
 *   - The outer <section> is 150vh — gives the inner content room to pin
 *   - The inner div uses CSS `sticky` as a Phase 2 scaffold
 *   - Phase 3 replaces `lg:sticky` with a GSAP ScrollTrigger pin and
 *     mounts the Canvas image sequence in place of HeroSequencePlaceholder
 */
export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative bg-background min-h-screen lg:min-h-[150vh]"
    >
      {/* ── Sticky shell ────────────────────────────────────────────────
          Pins to the top of the viewport while the parent scrolls.
          Phase 3: swap `lg:sticky lg:h-screen` for ScrollTrigger pin.
      ─────────────────────────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-24 lg:py-0">
        <div className="container w-full">
          <div
            className={[
              "grid grid-cols-1 lg:grid-cols-[55fr_45fr]",
              "items-center",
              "gap-16 xl:gap-24",
            ].join(" ")}
          >
            <HeroText />
            <HeroSequencePlaceholder />
          </div>
        </div>
      </div>
    </section>
  )
}
