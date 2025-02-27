import type React from "react"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Battleship AI Arena",
  description: "Test your AI-powered Battleship bots against others in a competitive environment",
  themeColor: "#030711", // This matches our dark blue background
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} dark bg-[#030711]`}>{children}</body>
    </html>
  )
}



import './globals.css'