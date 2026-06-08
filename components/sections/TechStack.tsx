"use client"

/**
 * components/sections/TechStack.tsx
 *
 * Phase 7 — Tech Stack Section
 *
 * Five tech groups as neo-brutalist cards in a responsive 3-col grid.
 * Uses existing Card and Tag UI primitives. No new dependencies.
 */

import { Card } from "@/components/ui/Card"
import { Tag } from "@/components/ui/Tag"

// ─── Types ────────────────────────────────────────────────────────────────────

type GroupAccent = "lime" | "cyan" | "none"

interface TechGroup {
  number: string
  name: string
  items: string[]
  accent: GroupAccent
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TECH_GROUPS: TechGroup[] = [
  {
    number: "01",
    name: "Frontend",
    items: ["Next.js", "TypeScript", "Tailwind CSS"],
    accent: "none",
  },
  {
    number: "02",
    name: "AI & Models",
    items: ["OpenRouter", "Gemini", "Claude", "Prompt Routing"],
    accent: "lime",
  },
  {
    number: "03",
    name: "Backend & Data",
    items: ["Supabase", "Redis", "BullMQ", "Vector Search"],
    accent: "none",
  },
  {
    number: "04",
    name: "Automation & Tools",
    items: ["Telegram Bot", "n8n", "MCP", "Cloudflare Tunnel"],
    accent: "cyan",
  },
  {
    number: "05",
    name: "Observability",
    items: ["Langfuse", "Logging", "Cost Tracking"],
    accent: "none",
  },
]

// ─── Accent color map ─────────────────────────────────────────────────────────

const ACCENT_BG: Record<GroupAccent, string> = {
  lime: "#C8FF00",
  cyan: "#00D9FF",
  none: "#111111",
}

// ─── Group Card ───────────────────────────────────────────────────────────────

function TechGroupCard({ group }: { group: TechGroup }) {
  const accentBg = ACCENT_BG[group.accent]

  return (
    <Card interactive>
      {/* Header: accent dot + number + name */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="inline-block w-2.5 h-2.5 shrink-0"
          style={{ background: accentBg, border: "2px solid #111111" }}
          aria-hidden="true"
        />
        <span className="font-code text-[11px] text-[#999999]">{group.number}</span>
        <h3 className="font-heading font-bold text-[17px] text-primary leading-tight tracking-tight">
          {group.name}
        </h3>
      </div>

      {/* Divider */}
      <div
        className="mb-5"
        style={{ height: "2px", background: "#111111" }}
        aria-hidden="true"
      />

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Tag key={item} variant="default">
            {item}
          </Tag>
        ))}
      </div>
    </Card>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TechStack() {
  return (
    <section
      id="stack"
      aria-label="Tech Stack"
      className="bg-background pt-32 lg:pt-40 pb-32 lg:pb-40"
      style={{ borderTop: "3px solid #111111" }}
    >
      <div className="container">

        {/* ── Section Header ── */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <div className="flex items-center gap-3 mb-6" aria-hidden="true">
            <span className="font-code text-[11px] text-secondary tracking-[0.04em]">
              {"// 03 — stack.config"}
            </span>
          </div>

          <h2
            className="font-heading font-bold text-primary leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 72px)" }}
          >
            Tools and
            <br />
            Technologies
          </h2>

          <p
            className="text-secondary leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.1vw, 20px)", maxWidth: "55ch" }}
          >
            The infrastructure I use to build AI systems, automation pipelines,
            and intelligent orchestration layers.
          </p>
        </div>

        {/* ── Group Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_GROUPS.map((group) => (
            <TechGroupCard key={group.number} group={group} />
          ))}
        </div>

      </div>
    </section>
  )
}
