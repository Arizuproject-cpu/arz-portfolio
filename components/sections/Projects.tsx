"use client"

/**
 * components/sections/Projects.tsx
 *
 * Phase 6 — Projects Section
 *
 * Three projects as neo-brutalist cards:
 *   - ARZ Orchestrator: flagship full-width card (top)
 *   - AI Automation Systems + Intelligent Memory Layer: 2-col grid (below)
 *
 * Uses existing Card and Tag UI primitives. No new dependencies.
 */

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card"
import { Tag, type TagVariant } from "@/components/ui/Tag"

// ─── Types ────────────────────────────────────────────────────────────────────

type TypeColor = "lime" | "cyan" | "dark"

interface Project {
  number: string
  type: string
  typeColor: TypeColor
  title: string
  description: string
  stack: string[]
  status: string
  statusVariant: TagVariant
  flagship?: true
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    number: "01",
    type: "AI SYSTEM",
    typeColor: "lime",
    title: "ARZ Orchestrator",
    description:
      "A personal AI operating system designed around routing, memory, tools, workers, and autonomous execution.",
    stack: ["Next.js", "TypeScript", "OpenRouter", "Supabase", "Telegram", "Cloudflare"],
    status: "● ACTIVE DEVELOPMENT",
    statusVariant: "accent",
    flagship: true,
  },
  {
    number: "02",
    type: "AUTOMATION",
    typeColor: "cyan",
    title: "AI Automation Systems",
    description:
      "Workflow systems for task execution, routing, background jobs, and tool-based automation.",
    stack: ["n8n", "APIs", "OpenRouter", "Notion", "Telegram"],
    status: "◑ IN PROGRESS",
    statusVariant: "default",
  },
  {
    number: "03",
    type: "MEMORY",
    typeColor: "dark",
    title: "Intelligent Memory Layer",
    description:
      "Context retrieval and long-term knowledge systems designed to improve relevance and reduce hallucination.",
    stack: ["Supabase", "Vector Search", "RAG", "Context Engine"],
    status: "○ RESEARCH",
    statusVariant: "outline",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_STYLES: Record<TypeColor, string> = {
  lime: "bg-[#C8FF00] text-[#111111] border-[2px] border-[#111111]",
  cyan: "bg-[#00D9FF] text-[#111111] border-[2px] border-[#111111]",
  dark: "bg-[#111111] text-[#F7F7F2] border-[2px] border-[#111111]",
}

function TypeBadge({ type, color }: { type: string; color: TypeColor }) {
  return (
    <span
      className={[
        "font-code text-[11px] font-medium px-3 py-1 leading-none tracking-wider",
        TYPE_STYLES[color],
      ].join(" ")}
    >
      {type}
    </span>
  )
}

// ─── System Overview (flagship only) ─────────────────────────────────────────

const SYSTEM_NODES: [string, string][] = [
  ["Input",        "Telegram · Web · Voice"],
  ["Orchestrator", "Intent · Planning · State"],
  ["Router",       "Model selection · Cost"],
  ["Tools + Memory", "RAG · Workers · Queue"],
  ["Output",       "Tasks · Documents · APIs"],
]

function SystemDiagram() {
  return (
    <div
      className="bg-[#F7F7F2] p-6"
      style={{ border: "3px solid #111111" }}
    >
      <span className="block font-code text-[10px] uppercase tracking-[0.2em] text-[#999999] mb-4">
        System Overview
      </span>
      <div className="flex flex-col gap-2">
        {SYSTEM_NODES.map(([node, detail]) => (
          <div key={node} className="flex items-baseline gap-2">
            <span className="font-code text-[13px] font-medium text-[#111111] min-w-[120px]">
              {node}
            </span>
            <span className="font-code text-[11px] text-[#888888]">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Flagship Card ────────────────────────────────────────────────────────────

function FlagshipCard({ project }: { project: Project }) {
  return (
    <Card interactive padding="p-0" className="overflow-hidden">
      {/* Lime accent bar at top */}
      <div
        className="h-2 w-full bg-[#C8FF00]"
        style={{ borderBottom: "3px solid #111111" }}
        aria-hidden="true"
      />

      <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left column: identity + text + status */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-code text-[11px] text-[#999999]">{project.number}</span>
            <TypeBadge type={project.type} color={project.typeColor} />
          </div>

          <h3
            className="font-heading font-bold text-primary leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(30px, 3.2vw, 48px)" }}
          >
            {project.title}
          </h3>

          <p
            className="text-secondary leading-relaxed"
            style={{ fontSize: "clamp(15px, 1vw, 18px)" }}
          >
            {project.description}
          </p>

          <div>
            <Tag variant={project.statusVariant}>{project.status}</Tag>
          </div>
        </div>

        {/* Right column: diagram + stack */}
        <div className="flex flex-col gap-8">
          <SystemDiagram />

          <div>
            <span className="block font-code text-[11px] uppercase tracking-[0.2em] text-[#999999] mb-3">
              Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech} variant="default">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Regular Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive>
      {/* Header row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-code text-[11px] text-[#999999]">{project.number}</span>
        <TypeBadge type={project.type} color={project.typeColor} />
      </div>

      <CardTitle className="mb-4">{project.title}</CardTitle>
      <CardBody>{project.description}</CardBody>

      {/* Stack */}
      <div className="mt-6">
        <span className="block font-code text-[11px] uppercase tracking-[0.2em] text-[#999999] mb-3">
          Stack
        </span>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Tag key={tech} variant="default">
              {tech}
            </Tag>
          ))}
        </div>
      </div>

      <CardFooter>
        <Tag variant={project.statusVariant}>{project.status}</Tag>
      </CardFooter>
    </Card>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="bg-background pt-32 lg:pt-40 pb-32 lg:pb-40"
      style={{ borderTop: "3px solid #111111" }}
    >
      <div className="container">

        {/* ── Section Header ── */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <div className="flex items-center gap-3 mb-6" aria-hidden="true">
            <span className="font-code text-[11px] text-secondary tracking-[0.04em]">
              {"// 02 — projects.json"}
            </span>
          </div>

          <h2
            className="font-heading font-bold text-primary leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(38px, 4.5vw, 72px)" }}
          >
            Systems Design
            <br />
            and Build
          </h2>

          <p
            className="text-secondary leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.1vw, 20px)", maxWidth: "55ch" }}
          >
            A collection of AI-powered systems focused on orchestration,
            automation, memory, and intelligent execution.
          </p>
        </div>

        {/* ── Projects Grid ── */}
        <div className="flex flex-col gap-8">

          {/* Flagship */}
          <FlagshipCard project={PROJECTS[0]} />

          {/* Two supporting cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.slice(1).map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
