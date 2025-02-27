import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function DocsPage() {
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
            <h1 className="text-3xl font-bold">Documentation</h1>
            <p className="text-muted-foreground">Learn how to create and deploy your Battleship AI bot</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="flex flex-col space-y-1">
                    <Link href="#getting-started" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                      Getting Started
                    </Link>
                    <Link href="#api-reference" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                      API Reference
                    </Link>
                    <Link href="#bot-examples" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                      Bot Examples
                    </Link>
                    <Link href="#rules" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                      Game Rules
                    </Link>
                    <Link href="#faq" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
                      FAQ
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-3">
              <Tabs defaultValue="getting-started">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="api-reference">API Reference</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                <TabsContent value="getting-started">
                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started with Battleship AI</CardTitle>
                      <CardDescription>Learn how to create your first Battleship AI bot</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Basic knowledge of JavaScript or TypeScript</li>
                          <li>A GitHub account (optional, for version control)</li>
                          <li>Node.js installed on your machine (for local testing)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Step 1: Create a Bot File</h3>
                        <p className="mb-2">
                          Create a new JavaScript or TypeScript file for your bot. Here's a basic template:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>{`// MyFirstBot.js
export default class MyFirstBot {
  constructor() {
    this.name = "MyFirstBot";
    this.author = "Your Name";
  }

  // Called at the start of each game
  initGame() {
    // Initialize your game state
  }

  // Called to place your ships
  placeShips() {
    // Return an array of ship placements
    return [
      { type: "Carrier", position: { x: 0, y: 0 }, orientation: "horizontal" },
      { type: "Battleship", position: { x: 0, y: 1 }, orientation: "horizontal" },
      { type: "Cruiser", position: { x: 0, y: 2 }, orientation: "horizontal" },
      { type: "Submarine", position: { x: 0, y: 3 }, orientation: "horizontal" },
      { type: "Destroyer", position: { x: 0, y: 4 }, orientation: "horizontal" }
    ];
  }

  // Called each turn to make a move
  makeMove(gameState) {
    // Simple strategy: random shots
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return { x, y };
  }
}`}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Step 2: Test Your Bot Locally</h3>
                        <p>You can test your bot locally using our test framework:</p>
                        <div className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>{`npm install -g battleship-ai-tester
battleship-ai-tester --bot=path/to/MyFirstBot.js`}</code>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Step 3: Upload Your Bot</h3>
                        <p>Once you're satisfied with your bot, upload it to our platform:</p>
                        <ol className="list-decimal pl-6 space-y-1">
                          <li>
                            Go to the{" "}
                            <Link href="/upload" className="text-primary hover:underline">
                              Upload page
                            </Link>
                          </li>
                          <li>Enter your bot's name and description</li>
                          <li>Upload your bot file or paste your code</li>
                          <li>Submit your bot</li>
                        </ol>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Step 4: Join Tournaments</h3>
                        <p>
                          Your bot will automatically be eligible for upcoming tournaments. You can also manually
                          register for specific tournaments on the{" "}
                          <Link href="/tournaments" className="text-primary hover:underline">
                            Tournaments page
                          </Link>
                          .
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Link href="/docs/api-reference">
                          <Button>Next: API Reference</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="api-reference">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Reference</CardTitle>
                      <CardDescription>Detailed documentation of the Battleship AI API</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Bot Interface</h3>
                        <p className="mb-2">Your bot must implement the following methods:</p>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">constructor()</h4>
                            <p className="text-sm text-muted-foreground">
                              Initialize your bot and set its name and author.
                            </p>
                          </div>
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">initGame()</h4>
                            <p className="text-sm text-muted-foreground">
                              Called at the start of each game. Use this to reset your bot's state.
                            </p>
                          </div>
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">placeShips()</h4>
                            <p className="text-sm text-muted-foreground">
                              Return an array of ship placements. Each placement should include the ship type, position,
                              and orientation.
                            </p>
                            <pre className="bg-muted p-2 rounded-md mt-2 text-xs overflow-x-auto">
                              <code>{`// Return format
[
  { 
    type: "Carrier", // 5 spaces
    position: { x: 0, y: 0 }, 
    orientation: "horizontal" // or "vertical"
  },
  // ... other ships
]`}</code>
                            </pre>
                          </div>
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">makeMove(gameState)</h4>
                            <p className="text-sm text-muted-foreground">
                              Called each turn to make a move. Returns the coordinates to fire at.
                            </p>
                            <pre className="bg-muted p-2 rounded-md mt-2 text-xs overflow-x-auto">
                              <code>{`// gameState format
{
  turn: 5, // Current turn number
  board: [ // Your view of opponent's board
    ["unknown", "miss", "hit", ...],
    // ... 10x10 grid
  ],
  lastMove: { x: 3, y: 4, result: "hit" }, // Opponent's last move
  ships: [ // Your ships that are still alive
    { type: "Carrier", hits: 2 },
    // ...
  ]
}

// Return format
{ x: 5, y: 7 }`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Game Constants</h3>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Constant</th>
                              <th className="text-left py-2">Value</th>
                              <th className="text-left py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">BOARD_SIZE</td>
                              <td className="py-2">10</td>
                              <td className="py-2">Size of the game board (10x10)</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">SHIP_TYPES</td>
                              <td className="py-2">5 types</td>
                              <td className="py-2">
                                Carrier (5), Battleship (4), Cruiser (3), Submarine (3), Destroyer (2)
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">MAX_TURNS</td>
                              <td className="py-2">100</td>
                              <td className="py-2">Maximum number of turns before a draw</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-end">
                        <Link href="/docs/examples">
                          <Button>Next: Examples</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="examples">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bot Examples</CardTitle>
                      <CardDescription>Example bots to help you get started</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Random Bot</h3>
                        <p className="mb-2">A simple bot that places ships and fires randomly:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>{`// RandomBot.js
export default class RandomBot {
  constructor() {
    this.name = "RandomBot";
    this.author = "Battleship AI Arena";
  }

  initGame() {
    this.shotsFired = new Set();
  }

  placeShips() {
    const ships = [
      { type: "Carrier", size: 5 },
      { type: "Battleship", size: 4 },
      { type: "Cruiser", size: 3 },
      { type: "Submarine", size: 3 },
      { type: "Destroyer", size: 2 }
    ];

    const placements = [];
    const occupiedCells = new Set();

    for (const ship of ships) {
      let valid = false;
      let placement;

      while (!valid) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const maxX = orientation === "horizontal" ? 10 - ship.size : 9;
        const maxY = orientation === "vertical" ? 10 - ship.size : 9;
        
        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        
        placement = { type: ship.type, position: { x, y }, orientation };
        
        // Check if placement is valid
        valid = this.isValidPlacement(placement, ship.size, occupiedCells);
        
        if (valid) {
          // Mark cells as occupied
          this.markCellsOccupied(placement, ship.size, occupiedCells);
          placements.push(placement);
        }
      }
    }

    return placements;
  }

  isValidPlacement(placement, size, occupiedCells) {
    const { position, orientation } = placement;
    
    for (let i = 0; i < size; i++) {
      const x = position.x + (orientation === "horizontal" ? i : 0);
      const y = position.y + (orientation === "vertical" ? i : 0);
      const key = \`\${x},\${y}\`;
      
      if (occupiedCells.has(key)) {
        return false;
      }
    }
    
    return true;
  }

  markCellsOccupied(placement, size, occupiedCells) {
    const { position, orientation } = placement;
    
    for (let i = 0; i < size; i++) {
      const x = position.x + (orientation === "horizontal" ? i : 0);
      const y = position.y + (orientation === "vertical" ? i : 0);
      occupiedCells.add(\`\${x},\${y}\`);
    }
  }

  makeMove(gameState) {
    // Random shot that hasn't been fired before
    let x, y, key;
    
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = \`\${x},\${y}\`;
    } while (this.shotsFired.has(key));
    
    this.shotsFired.add(key);
    return { x, y };
  }
}`}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Hunt and Target Bot</h3>
                        <p className="mb-2">A more advanced bot that uses a hunt and target strategy:</p>
                        <Link href="/docs/examples/hunt-target">
                          <Button variant="outline">View Hunt and Target Bot Example</Button>
                        </Link>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Probability Bot</h3>
                        <p className="mb-2">An advanced bot that uses probability heatmaps:</p>
                        <Link href="/docs/examples/probability">
                          <Button variant="outline">View Probability Bot Example</Button>
                        </Link>
                      </div>
                      <div className="flex justify-end">
                        <Link href="/docs/rules">
                          <Button>Next: Game Rules</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

