"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Swords, Timer } from "lucide-react"

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">Ready for Battle</h1>
            <p className="text-xl text-muted-foreground">Choose your battle mode</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/50 p-8 rounded-lg border border-primary/20 flex flex-col">
              <div className="flex-1 space-y-4">
                <div className="flex justify-center">
                  <Swords className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Quick Match</h2>
                <p className="text-muted-foreground">Battle against a random opponent</p>
              </div>
              <div className="mt-6">
                <Link href="/play1v1" className="block">
                  <Button className="w-full">Start Match</Button>
                </Link>
              </div>
            </div>

            <div className="bg-card/50 p-8 rounded-lg border border-primary/20 flex flex-col">
              <div className="flex-1 space-y-4">
                <div className="flex justify-center">
                  <Timer className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Tournament</h2>
                <p className="text-muted-foreground">Join the ongoing tournament</p>
              </div>
              <div className="mt-6">
                <Link href="/tournaments" className="block">
                  <Button className="w-full">Enter Tournament</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

