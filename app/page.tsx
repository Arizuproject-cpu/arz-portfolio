import Hero from "@/components/hero/Hero"

/**
 * Home — page composition
 *
 * Section order (follows DESIGN.md narrative arc):
 *   Hero -> About -> Architecture -> Projects -> TechStack
 *
 * Phase 2: Hero scaffold done
 * Phase 5: Content sections
 */
export default function Home() {
  return (
    <main>
      <Hero />
      {/* Phase 5: About */}
      {/* Phase 5: Architecture */}
      {/* Phase 5: Projects */}
      {/* Phase 5: TechStack */}
    </main>
  )
}
