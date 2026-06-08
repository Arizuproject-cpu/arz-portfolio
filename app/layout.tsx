import type { Metadata } from "next"
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts"
import { Providers } from "./providers"
import Navbar from "@/components/nav/Navbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Arizu — AI Systems Builder",
  description:
    "Personal portfolio focused on AI systems, automation, and intelligent orchestration.",
  openGraph: {
    title: "Arizu — AI Systems Builder",
    description:
      "Personal portfolio focused on AI systems, automation, and intelligent orchestration.",
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
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
