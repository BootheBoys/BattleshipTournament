"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { CheckCircle, AlertCircle, User, ArrowLeft } from "lucide-react"

const GRID_SIZE = 7
const UPLOAD_STEPS = GRID_SIZE * GRID_SIZE

interface PlayerState {
  file: File | null
  uploading: boolean
  uploadProgress: number
  uploadStatus: "idle" | "success" | "error"
  hitCells: number[]
}

export default function Play1v1Page() {
  const [player1, setPlayer1] = useState<PlayerState>({
    file: null,
    uploading: false,
    uploadProgress: 0,
    uploadStatus: "idle",
    hitCells: [],
  })
  const [player2, setPlayer2] = useState<PlayerState>({
    file: null,
    uploading: false,
    uploadProgress: 0,
    uploadStatus: "idle",
    hitCells: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef1 = useRef<HTMLInputElement>(null)
  const fileInputRef2 = useRef<HTMLInputElement>(null)

  const handleFileChange = (player: "player1" | "player2") => (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const updatedState = {
        file: selectedFile,
        uploading: false,
        uploadProgress: 0,
        uploadStatus: "idle" as const,
        hitCells: [],
      }
      if (player === "player1") {
        setPlayer1(updatedState)
      } else {
        setPlayer2(updatedState)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (player: "player1" | "player2") => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) {
      const updatedState = {
        file: droppedFile,
        uploading: false,
        uploadProgress: 0,
        uploadStatus: "idle" as const,
        hitCells: [],
      }
      if (player === "player1") {
        setPlayer1(updatedState)
      } else {
        setPlayer2(updatedState)
      }
    }
  }

  const simulateUpload = (player: "player1" | "player2") => {
    const setPlayer = player === "player1" ? setPlayer1 : setPlayer2

    setPlayer((prev) => ({ ...prev, uploading: true, uploadProgress: 0, hitCells: [] }))

    const interval = setInterval(() => {
      setPlayer((prev) => {
        if (prev.uploadProgress >= UPLOAD_STEPS) {
          clearInterval(interval)
          return { ...prev, uploading: false, uploadStatus: "success", uploadProgress: UPLOAD_STEPS }
        }
        const newProgress = prev.uploadProgress + 1
        return {
          ...prev,
          uploadProgress: newProgress,
          hitCells: [...prev.hitCells, newProgress - 1],
        }
      })
    }, 200)
  }

  const handleUpload = (player: "player1" | "player2") => {
    const playerState = player === "player1" ? player1 : player2
    if (playerState.file) {
      simulateUpload(player)
    }
  }

  const submitToBackend = async () => {
    if (!player1.file || !player2.file) {
      return
    }

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("file1", player1.file)
    formData.append("file2", player2.file)

    try {
      const response = await fetch("http://localhost:8000/play/", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
      })

      const data = await response.json()
      // Display the winner (first player in rankings)
      const winner = data.rankings[0][1]
      alert(`Winner: ${winner}`)

      console.log("Files uploaded successfully:", data)
      setPlayer1((prev) => ({ ...prev, uploadStatus: "success" }))
      setPlayer2((prev) => ({ ...prev, uploadStatus: "success" }))
    } catch (error) {
      console.error("Error uploading files:", error)
      setPlayer1((prev) => ({ ...prev, uploadStatus: "error" }))
      setPlayer2((prev) => ({ ...prev, uploadStatus: "error" }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPlayerGrid = (player: PlayerState) => (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {Array.from({ length: UPLOAD_STEPS }).map((_, index) => (
        <div
          key={index}
          className={`aspect-square border border-slate-600 rounded ${
            player.hitCells.includes(index) ? "bg-red-500 animate-pulse" : "bg-slate-800"
          }`}
        ></div>
      ))}
    </div>
  )

  const renderPlayerUpload = (player: "player1" | "player2") => {
    const playerState = player === "player1" ? player1 : player2
    const fileInputRef = player === "player1" ? fileInputRef1 : fileInputRef2

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">
          <User className="inline-block mr-2" />
          {player === "player1" ? "Player 1" : "Player 2"}
        </h2>
        <div
          className="border-4 border-slate-700 rounded-lg p-6 bg-slate-900 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          onDragOver={handleDragOver}
          onDrop={handleDrop(player)}
        >
          <div className="text-center mb-4">
            <input
              type="file"
              onChange={handleFileChange(player)}
              className="hidden"
              ref={fileInputRef}
              accept=".py,.js,.ts"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Select Model File
            </button>
            <p className="text-slate-400 mb-4">or drag and drop your file here</p>
            {playerState.file && <p className="text-blue-400 mb-4">Selected file: {playerState.file.name}</p>}
          </div>
          {renderPlayerGrid(playerState)}
          {playerState.file && !playerState.uploading && playerState.uploadStatus === "idle" && (
            <button
              onClick={() => handleUpload(player)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Launch Upload
            </button>
          )}
          {playerState.uploading && (
            <p className="text-center text-blue-400 mt-2">
              Uploading... {Math.round((playerState.uploadProgress / UPLOAD_STEPS) * 100)}%
            </p>
          )}
          {playerState.uploadStatus === "success" && (
            <div className="flex items-center justify-center text-green-500 mt-4">
              <CheckCircle className="mr-2" />
              <span>Upload successful! Model ready for battle!</span>
            </div>
          )}
          {playerState.uploadStatus === "error" && (
            <div className="flex items-center justify-center text-red-500 mt-4">
              <AlertCircle className="mr-2" />
              <span>Upload failed. Retry your attack!</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/play" className="flex items-center gap-2 font-bold text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Play
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Battleship Model Upload</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {renderPlayerUpload("player1")}
            {renderPlayerUpload("player2")}
          </div>
          {player1.uploadStatus === "success" && player2.uploadStatus === "success" && (
            <button
              onClick={submitToBackend}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors duration-300 mt-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:bg-muted disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Start Battle"}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

