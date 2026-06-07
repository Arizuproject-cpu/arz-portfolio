import { Button } from "@/components/ui/Button"

/**
 * HeroText — left column of the hero section.
 *
 * Contains the eyebrow label, headline, subtext, and CTA buttons.
 * Phase 4 will add GSAP entrance animations (opacity + translateY, one-shot).
 */
export default function HeroText() {
  return (
    <div className="flex flex-col gap-8 lg:gap-10">

      {/* ── Eyebrow ── */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block h-px w-10 shrink-0 bg-primary" />
        <span className="font-code text-[11px] uppercase tracking-[0.2em] text-secondary">
          AI Systems · Automation · Orchestration
        </span>
      </div>

      {/* ── Headline ── */}
      <div className="flex flex-col gap-3">
        {/* Primary — large display heading */}
        <h1
          className="font-heading font-bold text-primary leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(52px, 6.5vw, 100px)" }}
        >
          HEY, I&apos;M ARIZU
        </h1>

        {/* Secondary — role descriptor */}
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

      {/* ── Subtext ── */}
      <p
        className="text-secondary leading-relaxed"
        style={{ fontSize: "clamp(16px, 1.1vw, 20px)", maxWidth: "50ch" }}
      >
        I design and build AI-powered systems that automate workflows, route
        tools, manage memory, and turn ideas into reliable execution.
      </p>

      {/* ── CTAs ── */}
      <div className="flex flex-wrap gap-4 pt-2">
        <a href="#projects" tabIndex={-1}>
          <Button variant="primary" size="lg">
            View Projects
          </Button>
        </a>
        <a href="#architecture" tabIndex={-1}>
          <Button variant="secondary" size="lg">
            Explore Architecture
          </Button>
        </a>
      </div>

    </div>
  )
}
