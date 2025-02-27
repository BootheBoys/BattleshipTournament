interface GameStatusProps {
  gamePhase: "placement" | "battle" | "ended"
  currentTurn: "player1" | "player2"
  selectedShip: number
  player1Ships: number[]
  player2Ships: number[]
}

export function GameStatus({ gamePhase, currentTurn, selectedShip, player1Ships, player2Ships }: GameStatusProps) {
  return (
    <div className="bg-slate-900 p-4 rounded-lg shadow-xl">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">
            {gamePhase === "placement" && "Ship Placement Phase"}
            {gamePhase === "battle" && "Battle Phase"}
            {gamePhase === "ended" && "Game Over"}
          </h2>
          <p className="text-slate-400">
            {gamePhase === "placement" && `${currentTurn === "player1" ? "Player 1" : "Player 2"} - Place your ships`}
            {gamePhase === "battle" && `${currentTurn === "player1" ? "Player 1" : "Player 2"}'s turn`}
            {gamePhase === "ended" && `${currentTurn === "player1" ? "Player 1" : "Player 2"} wins!`}
          </p>
        </div>
        {gamePhase === "placement" && (
          <div className="text-slate-400">
            Placing ship: {currentTurn === "player1" ? player1Ships[selectedShip] : player2Ships[selectedShip]} units
          </div>
        )}
      </div>
    </div>
  )
}

