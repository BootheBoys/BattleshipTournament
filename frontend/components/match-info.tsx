import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MatchInfoProps {
  player1: string
  player2: string
  gameState: {
    status: string
    turn: number
    currentPlayer: string
    winner: string | null
  }
}

export function MatchInfo({ player1, player2, gameState }: MatchInfoProps) {
  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Match Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Player 1:</span>
            <Badge
              variant={gameState.currentPlayer === "player1" ? "default" : "outline"}
              className={cn(gameState.currentPlayer === "player1" ? "bg-primary" : "border-primary/20")}
            >
              {player1}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Player 2:</span>
            <Badge
              variant={gameState.currentPlayer === "player2" ? "default" : "outline"}
              className={cn(gameState.currentPlayer === "player2" ? "bg-primary" : "border-primary/20")}
            >
              {player2}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Game Status:</span>
            <Badge
              variant={gameState.status === "playing" ? "default" : "secondary"}
              className={gameState.status === "playing" ? "bg-primary" : ""}
            >
              {gameState.status.charAt(0).toUpperCase() + gameState.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Current Turn:</span>
            <span className="text-sm font-medium">{gameState.turn}</span>
          </div>
        </div>
        {gameState.winner && (
          <div className="pt-2 border-t border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/60">Winner:</span>
              <Badge variant="default" className="bg-primary">
                {gameState.winner === "player1" ? player1 : player2}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

