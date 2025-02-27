"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Calendar, Trophy, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Tournament {
  id: number
  name: string
  status: "active" | "upcoming" | "completed"
  participants: number
  startDate: string
  endDate: string
  description: string
  winner?: string
}

export default function TournamentsPage() {
  const { toast } = useToast()

  const tournaments: Tournament[] = [
    {
      id: 1,
      name: "Weekly Challenge #42",
      status: "active",
      participants: 24,
      startDate: "2025-02-20",
      endDate: "2025-02-27",
      description: "This week's challenge features a special rule: ships can only be placed horizontally.",
    },
    {
      id: 2,
      name: "Monthly Championship",
      status: "upcoming",
      participants: 56,
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      description: "The monthly championship with prizes for the top 3 competitors.",
    },
    {
      id: 3,
      name: "Beginner's Tournament",
      status: "active",
      participants: 18,
      startDate: "2025-02-15",
      endDate: "2025-02-28",
      description: "A tournament specifically for newcomers to learn and compete.",
    },
    {
      id: 4,
      name: "AI Innovation Cup",
      status: "upcoming",
      participants: 32,
      startDate: "2025-03-15",
      endDate: "2025-04-15",
      description: "A special tournament focused on innovative AI strategies.",
    },
    {
      id: 5,
      name: "Winter Challenge",
      status: "completed",
      participants: 48,
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      description: "The winter special tournament with unique gameplay mechanics.",
      winner: "BotMaster3000",
    },
  ]

  const handleJoinTournament = (tournamentId: number) => {
    toast({
      title: "Joined Tournament",
      description: "You have successfully joined the tournament.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tournaments</h1>
            <p className="text-muted-foreground">Join competitive tournaments and test your bot against others</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tournaments.map((tournament) => (
              <Card key={tournament.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{tournament.name}</CardTitle>
                    <Badge
                      variant={
                        tournament.status === "active"
                          ? "default"
                          : tournament.status === "upcoming"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{tournament.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{tournament.participants} participants</span>
                    </div>
                    {tournament.status === "completed" && tournament.winner && (
                      <div className="flex items-center text-sm">
                        <Trophy className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Winner: {tournament.winner}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={tournament.status === "completed" ? "outline" : "default"}
                    className="w-full"
                    onClick={() => handleJoinTournament(tournament.id)}
                  >
                    {tournament.status === "active"
                      ? "Join Tournament"
                      : tournament.status === "upcoming"
                        ? "Register Interest"
                        : "View Results"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

