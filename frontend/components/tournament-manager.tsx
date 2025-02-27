"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Pause, Settings, Trophy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Bot {
  id: number
  name: string
  author: string
  wins: number
  losses: number
  status: "ready" | "playing" | "error"
}

interface TournamentMatch {
  id: number
  bot1: string
  bot2: string
  status: "scheduled" | "in_progress" | "completed"
  winner?: string
}

export function TournamentManager() {
  const [isRunning, setIsRunning] = useState(false)
  const { toast } = useToast()

  const bots: Bot[] = [
    { id: 1, name: "AlphaBot", author: "John Doe", wins: 15, losses: 5, status: "ready" },
    { id: 2, name: "BetaBot", author: "Jane Smith", wins: 12, losses: 8, status: "playing" },
    { id: 3, name: "GammaBot", author: "Bob Wilson", wins: 10, losses: 10, status: "ready" },
    { id: 4, name: "DeltaBot", author: "Alice Brown", wins: 8, losses: 12, status: "error" },
  ]

  const matches: TournamentMatch[] = [
    { id: 1, bot1: "AlphaBot", bot2: "BetaBot", status: "in_progress" },
    { id: 2, bot1: "GammaBot", bot2: "DeltaBot", status: "scheduled" },
    { id: 3, bot1: "AlphaBot", bot2: "DeltaBot", status: "completed", winner: "AlphaBot" },
  ]

  const toggleTournament = () => {
    setIsRunning(!isRunning)
    toast({
      title: isRunning ? "Tournament Paused" : "Tournament Started",
      description: isRunning ? "The tournament has been paused." : "The tournament is now running.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tournament Control Panel</h2>
          <p className="text-muted-foreground">Manage active tournaments and monitor bot performance</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button onClick={toggleTournament}>
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? "Pause Tournament" : "Start Tournament"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Bots</CardTitle>
            <CardDescription>Currently registered bots and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bot Name</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>W/L</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bots.map((bot) => (
                  <TableRow key={bot.id}>
                    <TableCell className="font-medium">{bot.name}</TableCell>
                    <TableCell>{bot.author}</TableCell>
                    <TableCell>
                      {bot.wins}/{bot.losses}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bot.status === "ready" ? "default" : bot.status === "playing" ? "secondary" : "destructive"
                        }
                      >
                        {bot.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Matches</CardTitle>
            <CardDescription>Ongoing and upcoming matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      {match.bot1} vs {match.bot2}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {match.status === "completed" && match.winner && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4 mr-1" />
                        {match.winner}
                      </div>
                    )}
                    <Badge
                      variant={
                        match.status === "in_progress"
                          ? "default"
                          : match.status === "scheduled"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {match.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

