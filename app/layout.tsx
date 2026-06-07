import type { Metadata } from "next"
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Arizu — AI Systems Builder",
  description:
    "Building AI systems, automation workflows, and intelligent orchestration infrastructure.",
  openGraph: {
    title: "Arizu — AI Systems Builder",
    description:
      "Building AI systems, automation workflows, and intelligent orchestration infrastructure.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`
        ${spaceGrotesk.variable}
        ${inter.variable}
        ${jetbrainsMono.variable}
        antialiased
      `}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
