/**
 * HeroSequencePlaceholder — right column of the hero section.
 *
 * Holds the space and styling for the Phase 3 Canvas image sequence.
 * Maintains the 9:16 portrait aspect ratio and neo-brutalist card treatment.
 *
 * Phase 3 replacement: HeroSequence.tsx (Canvas API + GSAP scrub)
 */
export default function HeroSequencePlaceholder() {
  return (
    <div
      className="flex justify-center lg:justify-end"
      aria-hidden="true"
    >
      {/* Portrait card — 9:16, max 420px wide on desktop */}
      <div
        className="relative w-full"
        style={{ maxWidth: "420px", aspectRatio: "9 / 16" }}
      >

        {/* ── Neo-brutalist card shell ── */}
        <div
          className="absolute inset-0 border-[3px] border-primary flex flex-col p-6"
          style={{
            background: "#0C0C0C",
            boxShadow: "8px 8px 0px #111111",
          }}
        >

          {/* Top meta row */}
          <div className="flex items-center justify-between">
            <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#3a3a3a]">
              Canvas
            </span>
            <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#3a3a3a]">
              9 : 16
            </span>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-10">

            {/* Frame range badge */}
            <div
              className="border border-[#242424] px-6 py-3"
              style={{ boxShadow: "none" }}
            >
              <p className="font-code text-[#404040] text-sm tracking-[0.35em] text-center">
                02 → 10
              </p>
            </div>

            {/* Visual frame ladder */}
            <div className="flex flex-col items-center gap-[6px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="block rounded-full"
                  style={{
                    width: i === 4 ? "24px" : "6px",
                    height: "2px",
                    background: `rgba(255, 255, 255, ${0.06 + i * 0.018})`,
                  }}
                />
              ))}
            </div>

            {/* Tech labels */}
            <div className="flex flex-col items-center gap-2">
              <p className="font-code text-[10px] uppercase tracking-[0.25em] text-[#2c2c2c]">
                GSAP ScrollTrigger
              </p>
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#1e1e1e]">
                scrub · crossfade · dpr
              </p>
            </div>

          </div>

          {/* Bottom meta row */}
          <div className="flex items-center justify-between">
            <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#2a2a2a]">
              Phase 3
            </span>
            <span className="font-code text-[10px] uppercase tracking-[0.2em] text-[#2a2a2a]">
              Image Sequence
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
