import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Upload, Trophy, Code, Info } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background hexagon-pattern">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Trophy className="h-5 w-5" />
            <span>Battleship AI Arena</span>
          </div>
          <nav className="ml-auto flex gap-4">
            <Link href="/upload" className="text-sm font-medium text-foreground/60 hover:text-foreground">
              Upload Bot
            </Link>
            <Link href="/play" className="text-sm font-medium text-foreground/60 hover:text-foreground">
              Play
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium text-foreground/60 hover:text-foreground">
              Leaderboard
            </Link>
            <Link href="/docs" className="text-sm font-medium text-foreground/60 hover:text-foreground">
              Documentation
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-b border-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
                    Battleship AI Arena
                  </h1>
                  <p className="max-w-[600px] text-foreground/60 md:text-xl">
                    Test your AI-powered Battleship bots against others in a competitive environment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
                      Read Documentation
                      <Info className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid h-full w-full max-w-[400px] grid-cols-10 grid-rows-10 gap-1 rounded-lg border border-muted p-4 bg-card/50 radar-sweep">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded ${
                        [12, 13, 14, 22, 32, 42, 52, 53, 54, 55, 66, 67, 68, 76, 86, 96].includes(i)
                          ? "bg-destructive/80"
                          : [25, 26, 27, 28, 35, 45, 65, 75, 85, 95].includes(i)
                            ? "bg-primary/80"
                            : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 grid-pattern">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">How It Works</h2>
              <p className="max-w-[85%] leading-normal text-foreground/60 sm:text-lg sm:leading-7">
                Create your AI bot, upload it to our platform, and compete in tournaments against other developers.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 mt-8">
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>1. Create Your Bot</CardTitle>
                  <CardDescription className="text-foreground/60">
                    Develop your AI strategy using our API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Code className="h-12 w-12 mb-4 text-primary" />
                  <p className="text-sm text-foreground/60">
                    Write your bot using TypeScript, JavaScript, or any language that compiles to JavaScript.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/docs" className="w-full">
                    <Button variant="outline" size="sm" className="w-full border-primary/20 hover:bg-primary/10">
                      View Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>2. Upload Your Bot</CardTitle>
                  <CardDescription className="text-foreground/60">Submit your code to our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Upload className="h-12 w-12 mb-4 text-primary" />
                  <p className="text-sm text-foreground/60">
                    Upload your bot through our simple interface and test it against our sample bots.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/upload" className="w-full">
                    <Button variant="outline" size="sm" className="w-full border-primary/20 hover:bg-primary/10">
                      Upload Bot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle>3. Compete</CardTitle>
                  <CardDescription className="text-foreground/60">
                    Join tournaments and climb the leaderboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Trophy className="h-12 w-12 mb-4 text-primary" />
                  <p className="text-sm text-foreground/60">
                    Your bot will compete in tournaments against other developers' bots. Watch the battles in real-time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/tournaments" className="w-full">
                    <Button variant="outline" size="sm" className="w-full border-primary/20 hover:bg-primary/10">
                      View Tournaments
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-muted py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Battleship AI Arena. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/BootheBoys/BattleshipTournament/tree/main"
              className="text-sm text-foreground/60 underline-offset-4 hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

