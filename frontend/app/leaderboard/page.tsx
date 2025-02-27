import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowUp, ArrowDown, Minus, Trophy } from "lucide-react"

export default function LeaderboardPage() {
  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "DestroyerBot", author: "AlexDev", wins: 142, losses: 23, winRate: 86.1, change: "up" },
    { rank: 2, name: "BattleshipMaster", author: "SamCoder", wins: 136, losses: 29, winRate: 82.4, change: "up" },
    { rank: 3, name: "SeaWolf", author: "MarineTech", wins: 128, losses: 32, winRate: 80.0, change: "down" },
    { rank: 4, name: "NavyCommander", author: "CommanderJS", wins: 121, losses: 34, winRate: 78.1, change: "same" },
    { rank: 5, name: "TorpedoHunter", author: "DeepDive", wins: 118, losses: 36, winRate: 76.6, change: "up" },
    { rank: 6, name: "OceanGuardian", author: "WaveRider", wins: 112, losses: 41, winRate: 73.2, change: "down" },
    { rank: 7, name: "ShipSinker", author: "SinkOrSwim", wins: 108, losses: 45, winRate: 70.6, change: "down" },
    { rank: 8, name: "AquaAttacker", author: "WaterWorks", wins: 103, losses: 48, winRate: 68.2, change: "up" },
    { rank: 9, name: "GridMaster", author: "CoordinateKing", wins: 98, losses: 52, winRate: 65.3, change: "same" },
    { rank: 10, name: "BattleBot", author: "WarGames", wins: 94, losses: 56, winRate: 62.7, change: "up" },
  ]

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
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-muted-foreground">Top performing bots in the Battleship AI Arena</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>Updated daily based on tournament and match results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">W</TableHead>
                    <TableHead className="text-right">L</TableHead>
                    <TableHead className="text-right">Win Rate</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((bot) => (
                    <TableRow key={bot.rank}>
                      <TableCell className="font-medium">
                        {bot.rank === 1 ? (
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                            {bot.rank}
                          </div>
                        ) : bot.rank === 2 ? (
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-1 text-gray-400" />
                            {bot.rank}
                          </div>
                        ) : bot.rank === 3 ? (
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-1 text-amber-700" />
                            {bot.rank}
                          </div>
                        ) : (
                          bot.rank
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/bots/${bot.name}`} className="hover:underline">
                          {bot.name}
                        </Link>
                      </TableCell>
                      <TableCell>{bot.author}</TableCell>
                      <TableCell className="text-right">{bot.wins}</TableCell>
                      <TableCell className="text-right">{bot.losses}</TableCell>
                      <TableCell className="text-right">{bot.winRate}%</TableCell>
                      <TableCell className="text-right">
                        {bot.change === "up" ? (
                          <Badge variant="success" className="bg-green-500">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            Up
                          </Badge>
                        ) : bot.change === "down" ? (
                          <Badge variant="destructive">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            Down
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <Minus className="h-3 w-3 mr-1" />
                            Same
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

