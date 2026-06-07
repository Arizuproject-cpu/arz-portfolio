"use client"

import { type HTMLAttributes, forwardRef } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift on hover with shadow animation */
  interactive?: boolean
  /** Override default padding */
  padding?: string
}

/**
 * Neo-brutalist card
 *
 * - White background
 * - 3px solid black border
 * - 8px 8px 0px #111 hard shadow (no blur)
 * - Optional interactive lift on hover
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      interactive = false,
      padding = "p-8",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "card-base",
          padding,
          interactive ? "card-interactive cursor-pointer" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

/* ── Card Header ── */
const CardHeader = ({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={["mb-4", className].filter(Boolean).join(" ")}
    {...props}
  >
    {children}
  </div>
)
CardHeader.displayName = "CardHeader"

/* ── Card Title ── */
const CardTitle = ({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={["font-heading text-[22px] font-bold text-primary leading-tight", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </h3>
)
CardTitle.displayName = "CardTitle"

/* ── Card Body ── */
const CardBody = ({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={["text-secondary leading-relaxed", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </div>
)
CardBody.displayName = "CardBody"

/* ── Card Footer ── */
const CardFooter = ({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={["mt-6 flex items-center gap-3", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </div>
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardBody, CardFooter }
export type { CardProps }
