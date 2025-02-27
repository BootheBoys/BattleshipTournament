"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Square, RotateCcw, X, Grid2X2, FileCode } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Participant {
  id: number
  name: string
  file: File
  score: number
  losses: number
  runs: number
  status: "idle" | "running" | "completed"
}

export default function BattleshipTournament() {
  const [requiredRuns, setRequiredRuns] = useState<number>(3)
  const [isActive, setIsActive] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const pythonFiles = Array.from(event.target.files).filter((file) => file.name.endsWith(".py"))

      const newParticipants = pythonFiles.map((file, index) => ({
        id: index + 1,
        name: file.name.replace(".py", ""),
        file: file,
        score: 0,
        losses: 0,
        runs: 0,
        status: "idle" as const,
      }))
      setParticipants(newParticipants)
      setIsActive(false)
    }
  }

  const clearFiles = () => {
    setParticipants([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleStart = async () => {
    // Check if all participants have a name (file)
    if (participants.some(participant => !participant.name)) {
        return
    }

    // Update participants status to running for those with fewer runs than required
    setParticipants((prev) =>
        prev.map((p) => ({
            ...p,
            status: p.runs < requiredRuns ? "running" : "completed",
        }))
    )

    setIsActive(true)
    const formData = new FormData()
    
    // Append all files to formData using the name as the file
    participants.forEach((participant, index) => {
        formData.append(`file${index + 1}`, participant.file)
    })
    
    try {
        const response = await fetch('http://localhost:8000/tournament/', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        })

        const data = await response.json()
        
        // Display the winner (first participant in rankings)
        console.log(data)
        const winner = data.rankings[0][1]
        alert(`Winner: ${winner}`)
        
        console.log('Files uploaded successfully:', data)
        
        // Update participants based on rankings or other response data
        setParticipants(prevParticipants => 
            prevParticipants.map(participant => ({
                ...participant,
                status: 'completed',
                // Optionally update other properties based on rankings or response
                // For example:
                // score: data.scores[participant.name],
                // losses: data.losses[participant.name]
            }))
        )

    } catch (error) {
        console.error('Error uploading files:', error)
        
        // Set all participants to idle status on error
        setParticipants(prevParticipants => 
            prevParticipants.map(participant => ({
                ...participant,
                status: 'idle'
            }))
        )

    } finally {
        setIsActive(false)
    }
  }

  const handleStop = () => {
    setIsActive(false)
    setParticipants((prev) =>
      prev.map((p) => ({
        ...p,
        status: p.runs >= requiredRuns ? "completed" : "idle",
      })),
    )
  }

  const handleReset = () => {
    setIsActive(false)
    setParticipants((prev) =>
      prev.map((p) => ({
        ...p,
        score: 0,
        losses: 0,
        runs: 0,
        status: "idle",
      })),
    )
  }

  const sortedParticipants = [...participants].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return a.losses - b.losses
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0a192f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a192f]/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 font-bold text-yellow-400">
            <Grid2X2 className="h-5 w-5" />
            Battleship Tournament
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="flex items-center gap-2 text-gray-300">
              Required Battles:
              <Input
                type="number"
                min="1"
                value={requiredRuns}
                onChange={(e) => setRequiredRuns(Number.parseInt(e.target.value) || 1)}
                className="w-20 bg-[#1a2942] border-gray-700 text-gray-100"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-8">
        {/* Upload Section */}
        <div className="rounded-lg border border-gray-800 bg-[#1a2942] shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-yellow-400">Upload AI Bots</h3>
              {participants.length > 0 && (
                <Button variant="ghost" onClick={clearFiles} size="sm" className="text-gray-400 hover:text-gray-300">
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex gap-4 items-center">
              <Input
                type="file"
                multiple
                accept=".py"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="cursor-pointer bg-[#0a192f] border-gray-700 text-gray-300"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Select Bots
              </Button>
            </div>

            {participants.length > 0 && (
              <div className="bg-[#0a192f] p-3 rounded-md border border-gray-800">
                <p className="font-medium mb-2 text-yellow-400">Selected Bots ({participants.length}):</p>
                <ul className="list-none space-y-2">
                  {participants.map((participant, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <FileCode className="h-4 w-4 text-yellow-400" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">{participant.file.name}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Size: {formatFileSize(participant.file.size)}</p>
                            <p>Last modified: {new Date(participant.file.lastModified).toLocaleString()}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {participants.length === 0 ? (
          <Alert className="bg-[#1a2942] border-gray-800 text-gray-300">
            <AlertDescription>Upload Python bot files to begin the tournament.</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleStart}
                disabled={isActive}
                className={`w-32 ${isActive ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
              <Button onClick={handleStop} disabled={!isActive} className="w-32 bg-red-600 hover:bg-red-700">
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
              <Button onClick={handleReset} className="w-32 border-gray-700 text-gray-300 hover:bg-gray-800">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-800 bg-[#1a2942] shadow-lg">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Tournament Progress</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className={`p-4 rounded-lg border ${
                          participant.status === "running"
                            ? "border-yellow-500 shadow-yellow-500/20"
                            : participant.status === "completed"
                              ? "border-green-500 shadow-green-500/20"
                              : "border-gray-700"
                        } bg-[#0a192f]`}
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h3 className="font-semibold text-gray-100 cursor-help flex items-center gap-2">
                                    <FileCode className="h-4 w-4 text-yellow-400" />
                                    {participant.name}
                                  </h3>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>File: {participant.file.name}</p>
                                  <p>Size: {formatFileSize(participant.file.size)}</p>
                                  <p>Last modified: {new Date(participant.file.lastModified).toLocaleString()}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <span
                              className={`text-sm capitalize ${
                                participant.status === "running"
                                  ? "text-yellow-400"
                                  : participant.status === "completed"
                                    ? "text-green-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {participant.status}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-300">
                              <span>Victories: {participant.score}</span>
                              <span>Losses: {participant.losses}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-300">
                              <span>
                                Battles: {participant.runs}/{requiredRuns}
                              </span>
                            </div>
                            <Progress
                              value={(participant.runs / requiredRuns) * 100}
                              className={`h-2 ${
                                participant.status === "completed"
                                  ? "[&>div]:bg-green-500"
                                  : participant.status === "running"
                                    ? "[&>div]:bg-yellow-500"
                                    : "[&>div]:bg-gray-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-800 bg-[#1a2942] shadow-lg">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Leaderboard</h2>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="w-12 text-gray-300">Rank</TableHead>
                        <TableHead className="text-gray-300">Bot Name</TableHead>
                        <TableHead className="text-right text-gray-300">Victories</TableHead>
                        <TableHead className="text-right text-gray-300">Losses</TableHead>
                        <TableHead className="text-right text-gray-300">Battles</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedParticipants.map((participant, index) => (
                        <TableRow key={participant.id} className="border-gray-800">
                          <TableCell className="font-medium text-gray-300">{index + 1}</TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-gray-300 cursor-help flex items-center gap-2">
                                    <FileCode className="h-4 w-4 text-yellow-400" />
                                    {participant.name}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>File: {participant.file.name}</p>
                                  <p>Size: {formatFileSize(participant.file.size)}</p>
                                  <p>Last modified: {new Date(participant.file.lastModified).toLocaleString()}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="text-right text-gray-300">{participant.score}</TableCell>
                          <TableCell className="text-right text-gray-300">{participant.losses}</TableCell>
                          <TableCell className="text-right text-gray-300">
                            {participant.runs}/{requiredRuns}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

