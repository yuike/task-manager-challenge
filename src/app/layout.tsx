import type { Metadata } from "next"

import { Inter } from "next/font/google"
import "./globals.css"

import { Navigation } from "@/components/Navigation"
import { Providers } from "@/libs/providers"

const inter = Inter({ weight: ["600", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task manager",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <main className="grid grid-cols-12">
            <Navigation />
            <section className="col-span-9">{children}</section>
          </main>
        </Providers>
      </body>
    </html>
  )
}
