"use client"

import { cn } from "@/lib/utils"

interface GameBoardProps {
  board: string[]
  interactive?: boolean
  onCellClick?: (index: number) => void
}

export function GameBoard({ board, interactive = false, onCellClick }: GameBoardProps) {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0">
        <div className="grid h-full w-full grid-cols-10 grid-rows-10 gap-1 rounded-lg p-2 bg-background/50 border border-primary/20 radar-sweep">
          {board.map((cell, index) => (
            <button
              key={index}
              className={cn(
                "relative aspect-square rounded transition-colors",
                cell === "empty" && "bg-muted hover:bg-muted/80",
                cell === "ship" && "bg-primary/80",
                cell === "hit" && "bg-destructive/80",
                cell === "miss" && "bg-accent",
                interactive && "cursor-pointer hover:opacity-80",
                !interactive && "cursor-default",
              )}
              disabled={!interactive}
              onClick={() => onCellClick?.(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

