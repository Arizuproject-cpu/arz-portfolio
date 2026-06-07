import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"

/**
 * Space Grotesk — headings
 * Weights: 300 (light), 400 (regular), 500 (medium), 600 (semi), 700 (bold)
 */
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

/**
 * Inter — body text
 * Variable font — full weight range
 */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

/**
 * JetBrains Mono — code / tech stack tags
 * Weights: 400 (regular), 500 (medium)
 */
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})
