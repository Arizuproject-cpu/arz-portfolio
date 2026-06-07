import { type ButtonHTMLAttributes, forwardRef } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

/**
 * Neo-brutalist button
 *
 * primary  — black background, lime (#C8FF00) shadow on hover
 * secondary — white background, black border + shadow
 * ghost    — no background, black border, no shadow
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    }

    const variantStyles: Record<ButtonVariant, string> = {
      primary: [
        "bg-[#111111] text-[#F7F7F2]",
        "shadow-[4px_4px_0px_#111111]",
        "hover:bg-[#111111] hover:shadow-[6px_6px_0px_#C8FF00]",
        "focus-visible:shadow-[6px_6px_0px_#C8FF00]",
      ].join(" "),

      secondary: [
        "bg-[#FFFFFF] text-[#111111]",
        "shadow-[4px_4px_0px_#111111]",
        "hover:shadow-[6px_6px_0px_#111111]",
        "focus-visible:shadow-[6px_6px_0px_#111111]",
      ].join(" "),

      ghost: [
        "bg-transparent text-[#111111]",
        "shadow-none",
        "hover:bg-[#111111] hover:text-[#F7F7F2]",
      ].join(" "),
    }

    return (
      <button
        ref={ref}
        className={[
          "btn-base",
          sizeStyles[size],
          variantStyles[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
