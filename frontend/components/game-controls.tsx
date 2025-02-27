interface GameControlsProps {
  gameState: {
    status: string
    turn: number
    currentPlayer: string
    winner: string | null
  }
  onStart: () => void
  onReset: () => void
}

export function GameControls({ gameState, onStart, onReset }: GameControlsProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-card/50 border border-primary/20">
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="text-foreground/60">Status: </span>
          <span className="font-medium">{gameState.status.charAt(0).toUpperCase() + gameState.status.slice(1)}</span>
        </div>
        <div className="text-sm">
          <span className="text-foreground/60">Turn: </span>
          <span className="font-medium">{gameState.turn}</span>
        </div>
        <div className="text-sm">
          <span className="text-foreground/60">Current Player: </span>
          <span className="font-medium">{gameState.currentPlayer === "player1" ? "You" : "Opponent"}</span>
        </div>
      </div>
      {gameState.winner && (
        <div className="text-sm font-medium text-primary">
          Winner: {gameState.winner === "player1" ? "You" : "Opponent"}
        </div>
      )}
    </div>
  )
}

