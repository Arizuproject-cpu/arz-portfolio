import Hero from "@/components/hero/Hero"
import Architecture from "@/components/sections/Architecture"
import Projects from "@/components/sections/Projects"
import TechStack from "@/components/sections/TechStack"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"

/**
 * Home — page composition
 *
 * Section order (follows DESIGN.md narrative arc):
 *   Hero -> Architecture -> Projects -> TechStack -> Contact -> Footer
 *
 * Direction C: sections below hero are wrapped in a positioned container
 * with z-index: 1 so they render above the hero sticky element.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Architecture />
        <Projects />
        <TechStack />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
