"use client"

import { type HTMLAttributes } from "react"

type TagVariant = "default" | "accent" | "outline"

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
}

/**
 * Tag — tech stack pill / label
 *
 * default  — white bg, black border, monospace font
 * accent   — lime (#C8FF00) bg, black border
 * outline  — transparent bg, black border (ghost)
 */
function Tag({
  variant = "default",
  className = "",
  children,
  ...props
}: TagProps) {
  const variantStyles: Record<TagVariant, string> = {
    default:
      "bg-[#FFFFFF] text-[#111111] border-[2px] border-[#111111]",
    accent:
      "bg-[#C8FF00] text-[#111111] border-[2px] border-[#111111]",
    outline:
      "bg-transparent text-[#111111] border-[2px] border-[#111111]",
  }

  return (
    <span
      className={[
        "inline-flex items-center",
        "px-3 py-1",
        "font-code text-xs font-medium",
        "leading-none tracking-wide",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  )
}

export { Tag }
export type { TagProps, TagVariant }
