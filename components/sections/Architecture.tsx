"use client"

/**
 * components/sections/Architecture.tsx
 *
 * Phase 5 — Architecture Section
 *
 * Shows Arz-Orchestrator as an AI orchestration system via a
 * neo-brutalist system diagram.
 *
 * Layout:
 *   Desktop — horizontal spine (User Input → Core → Output)
 *             + lime divider line + 5-node subsystems grid (3 columns)
 *   Mobile  — vertical stack, all 8 nodes in order
 *
 * No animation. No GSAP. No new dependencies.
 * Styling mirrors the existing Card / Tag primitives.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArchNode {
  number: string
  title: string
  description: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const USER_INPUT: ArchNode = {
  number: "01",
  title: "User Input",
  description: "Telegram, web, voice, and structured commands.",
}

const ORCHESTRATOR: ArchNode = {
  number: "02",
  title: "Orchestrator Core",
  description:
    "Coordinates intent, planning, task state, and execution flow.",
}

const OUTPUT: ArchNode = {
  number: "08",
  title: "Output",
  description:
    "Delivers useful responses, documents, workflows, and task results.",
}

const SUBSYSTEMS: ArchNode[] = [
  {
    number: "03",
    title: "Model Router",
    description:
      "Routes requests to the right model based on complexity, cost, and capability.",
  },
  {
    number: "04",
    title: "Memory Layer",
    description:
      "Stores relevant project context, user preferences, and long-term system knowledge.",
  },
  {
    number: "05",
    title: "Tool Registry",
    description:
      "Provides safe access to external tools, APIs, documents, and automations.",
  },
  {
    number: "06",
    title: "Worker Queue",
    description:
      "Handles long-running jobs through queue-based asynchronous execution.",
  },
  {
    number: "07",
    title: "Observability",
    description:
      "Tracks logs, traces, cost, errors, and execution quality.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Standard white node card */
function NodeCard({
  node,
  className = "",
}: {
  node: ArchNode
  className?: string
}) {
  return (
    <div
      className={[
        "p-6 bg-[#FFFFFF] border-[3px] border-[#111111]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ boxShadow: "8px 8px 0px #111111" }}
    >
      <span className="block font-code text-[11px] tracking-[0.2em] text-[#555555] mb-3">
        /{node.number}
      </span>
      <h3 className="font-heading font-bold text-[18px] leading-tight text-[#111111] mb-2">
        {node.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#555555]">
        {node.description}
      </p>
    </div>
  )
}

/**
 * Hub card — Orchestrator Core
 * Black background + lime shadow: visually dominant as the central node.
 */
function HubCard({
  node,
  className = "",
}: {
  node: ArchNode
  className?: string
}) {
  return (
    <div
      className={[
        "p-6 bg-[#FFFFFF] border-[3px] border-[#111111]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ boxShadow: "8px 8px 0px #C8FF00" }}
    >
      {/* Lime accent bar — hub indicator */}
      <div className="h-1 w-8 bg-[#C8FF00] mb-3" aria-hidden="true" />
      <span className="block font-code text-[11px] tracking-[0.2em] text-[#555555] mb-3">
        /{node.number}
      </span>
      <h3 className="font-heading font-bold text-[18px] leading-tight text-[#111111] mb-2">
        {node.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#555555]">
        {node.description}
      </p>
    </div>
  )
}

/**
 * Output card — white background, cyan shadow accent.
 * Distinguishes the exit node from the generic white nodes.
 */
function OutputCard({
  node,
  className = "",
}: {
  node: ArchNode
  className?: string
}) {
  return (
    <div
      className={[
        "p-6 bg-[#FFFFFF] border-[3px] border-[#111111]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ boxShadow: "8px 8px 0px #00D9FF" }}
    >
      <span className="block font-code text-[11px] tracking-[0.2em] text-[#555555] mb-3">
        /{node.number}
      </span>
      <h3 className="font-heading font-bold text-[18px] leading-tight text-[#111111] mb-2">
        {node.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#555555]">
        {node.description}
      </p>
    </div>
  )
}

/**
 * Horizontal arrow — visible only on desktop (lg+).
 * Connects spine nodes left-to-right.
 */
function ArrowRight() {
  return (
    <div
      className="hidden lg:flex items-center justify-center shrink-0 px-3"
      aria-hidden="true"
    >
      <svg
        width="36"
        height="16"
        viewBox="0 0 36 16"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="8"
          x2="28"
          y2="8"
          stroke="#C8FF00"
          strokeWidth="2"
        />
        <polyline
          points="20,2 28,8 20,14"
          stroke="#C8FF00"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/**
 * Vertical down arrow — visible only on mobile.
 * Replaces the horizontal arrow between spine nodes.
 */
function ArrowDown() {
  return (
    <div
      className="flex lg:hidden items-center justify-center py-1"
      aria-hidden="true"
    >
      <svg
        width="16"
        height="36"
        viewBox="0 0 16 36"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="8"
          y1="0"
          x2="8"
          y2="28"
          stroke="#C8FF00"
          strokeWidth="2"
        />
        <polyline
          points="2,20 8,28 14,20"
          stroke="#C8FF00"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Architecture() {
  return (
    <section
      id="architecture"
      aria-label="Architecture"
      className="bg-background pt-32 lg:pt-40 pb-32 lg:pb-40"
      style={{ borderTop: "3px solid #111111" }}
    >
      <div className="container">

        {/* ── Section Header ── */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <div className="flex items-center gap-3 mb-6" aria-hidden="true">
            <span className="font-code text-[11px] text-secondary tracking-[0.04em]">
              {"// 01 — system.arch"}
            </span>
          </div>
          <h2
            className="font-heading font-bold text-primary leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 72px)" }}
          >
            How Design Intelligent Orchestration
          </h2>
          <p
            className="text-secondary leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.1vw, 20px)", maxWidth: "55ch" }}
          >
            A modular AI system architecture built around routing, memory,
            tools, workers, and observable execution.
          </p>
        </div>

        {/* ── Diagram ── */}
        <div>

          {/* ── Spine row: User Input → Orchestrator Core → Output ── */}
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-0">
            <NodeCard node={USER_INPUT} className="flex-1" />
            <ArrowRight />
            <ArrowDown />
            <HubCard node={ORCHESTRATOR} className="flex-1" />
            <ArrowRight />
            <ArrowDown />
            <OutputCard node={OUTPUT} className="flex-1" />
          </div>

          {/* ── Divider: lime line + SUBSYSTEMS label ── */}
          {/*
           * Communicates that the cards below are sub-systems of the
           * Orchestrator Core, without complex connector-line math.
           */}
          <div
            className="flex items-center gap-4 my-6 lg:my-8"
            aria-hidden="true"
          >
            <div className="h-[2px] flex-1 bg-[#C8FF00]" />
            <span className="font-code text-[11px] uppercase tracking-[0.2em] text-[#555555] shrink-0">
              Subsystems
            </span>
            <div className="h-[2px] flex-1 bg-[#C8FF00]" />
          </div>

          {/* ── Subsystems grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {SUBSYSTEMS.map((node) => (
              <NodeCard key={node.number} node={node} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
