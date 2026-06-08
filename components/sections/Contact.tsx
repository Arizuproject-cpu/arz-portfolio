"use client"

import { Card, CardBody } from "@/components/ui/Card"

// ─── Contact item data ────────────────────────────────────────────────────────

interface ContactItem {
  label: string
  value: string
  href: string
  tag: string
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    label: "Email",
    value: "inzaghi.project@gmail.com",
    href: "mailto:inzaghi.project@gmail.com",
    tag: "EMAIL",
  },
  {
    label: "GitHub",
    value: "github.com/arizu",
    href: "https://github.com/arizu",
    tag: "GITHUB",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/arizu",
    href: "https://www.linkedin.com/in/arizu",
    tag: "LINKEDIN",
  },
  {
    label: "Telegram",
    value: "@arizu",
    href: "https://t.me/arizu",
    tag: "TELEGRAM",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContactItemCard({ item }: { item: ContactItem }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        className="card-base card-interactive p-6 flex flex-col gap-3"
        style={{ borderWidth: "3px" }}
      >
        {/* Tag */}
        <span
          className="font-code text-xs font-medium tracking-widest uppercase"
          style={{ color: "#555555" }}
        >
          {item.tag}
        </span>

        {/* Value */}
        <p
          className="font-heading font-semibold text-base leading-tight break-all"
          style={{
            color: "#111111",
            fontSize: "clamp(14px, 1.2vw, 16px)",
          }}
        >
          {item.value}
        </p>

        {/* Arrow indicator */}
        <span
          className="font-code text-xs font-medium"
          style={{ color: "#C8FF00" }}
        >
          →
        </span>
      </div>
    </a>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      className="bg-background pt-32 lg:pt-40 pb-32 lg:pb-40"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col gap-4 mb-16">
          <span
            className="font-code text-xs font-medium tracking-widest uppercase"
            style={{ color: "#555555" }}
          >
            LET&apos;S BUILD
          </span>

          <h2
            id="contact-title"
            className="font-heading font-bold leading-[0.95] tracking-tight"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#111111",
              maxWidth: "720px",
            }}
          >
            Open for AI systems,{" "}
            <br className="hidden sm:block" />
            automation, and orchestration projects.
          </h2>
        </div>

        {/* Main CTA card */}
        <Card className="mb-12">
          <CardBody>
            <div className="flex flex-col gap-8 p-2">
              {/* Lime accent bar */}
              <div
                className="w-16 h-2"
                style={{
                  background: "#C8FF00",
                  border: "2px solid #111111",
                }}
                aria-hidden="true"
              />

              {/* Description */}
              <p
                className="font-body leading-relaxed"
                style={{
                  fontSize: "clamp(16px, 1.4vw, 20px)",
                  color: "#555555",
                  maxWidth: "640px",
                }}
              >
                I&apos;m available for collaboration around AI workflows,
                automation systems, and intelligent assistant infrastructure.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:inzaghi.project@gmail.com"
                  className="btn-base px-8 py-4 text-base bg-[#111111] text-[#F7F7F2] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#C8FF00] focus-visible:shadow-[6px_6px_0px_#C8FF00]"
                >
                  Contact Me
                </a>
                <a
                  href="https://github.com/arizu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base px-8 py-4 text-base bg-[#FFFFFF] text-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] focus-visible:shadow-[6px_6px_0px_#111111]"
                >
                  View GitHub
                </a>
              </div>

              {/* Divider */}
              <div
                className="w-full"
                style={{ height: "2px", background: "#111111" }}
                aria-hidden="true"
              />

              {/* Contact items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CONTACT_ITEMS.map((item) => (
                  <ContactItemCard key={item.tag} item={item} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Footer note */}
        <p
          className="font-code text-xs"
          style={{ color: "#555555" }}
        >
          Available for freelance, contract, and collaboration work.
        </p>
      </div>
    </section>
  )
}
