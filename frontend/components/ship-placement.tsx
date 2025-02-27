import { Button } from "@/components/ui/button"

interface ShipPlacementProps {
  ships: number[]
  selectedShip: number
  onSelectShip: (index: number) => void
}

export function ShipPlacement({ ships, selectedShip, onSelectShip }: ShipPlacementProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ships.map((length, index) => (
        <Button
          key={index}
          variant={selectedShip === index ? "default" : "outline"}
          className={`
            ${selectedShip === index ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600"}
            flex-1
          `}
          onClick={() => onSelectShip(index)}
        >
          Ship {length}
        </Button>
      ))}
    </div>
  )
}

