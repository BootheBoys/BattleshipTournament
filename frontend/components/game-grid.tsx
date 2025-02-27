interface GameGridProps {
  board: ("empty" | "ship" | "hit" | "miss")[]
  onClick: (index: number) => void
  interactive: boolean
}

export function GameGrid({ board, onClick, interactive }: GameGridProps) {
  return (
    <div className="aspect-square bg-slate-900 p-2 rounded-lg shadow-xl">
      <div className="grid grid-cols-10 gap-1 h-full">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`
              rounded-sm transition-colors
              ${cell === "empty" ? "bg-slate-800 hover:bg-slate-700" : ""}
              ${cell === "ship" ? "bg-blue-600" : ""}
              ${cell === "hit" ? "bg-red-600" : ""}
              ${cell === "miss" ? "bg-slate-600" : ""}
              ${!interactive && "cursor-default"}
            `}
            onClick={() => interactive && onClick(index)}
            disabled={!interactive}
          />
        ))}
      </div>
    </div>
  )
}

