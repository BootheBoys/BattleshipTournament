"use client"

import React from "react"
import { useState, useRef } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

const GRID_SIZE = 7
const UPLOAD_STEPS = GRID_SIZE * GRID_SIZE

export default function BattleshipFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [hitCells, setHitCells] = useState<number[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus("idle")
      setHitCells([])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
      setUploadStatus("idle")
      setHitCells([])
    }
  }

  const simulateUpload = () => {
    setUploading(true)
    setUploadProgress(0)
    setHitCells([])

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= UPLOAD_STEPS) {
          clearInterval(interval)
          setUploading(false)
          setUploadStatus("success")
          return UPLOAD_STEPS
        }
        const newProgress = prevProgress + 1
        setHitCells((prev) => [...prev, newProgress - 1])
        return newProgress
      })
    }, 200)
  }

  const handleUpload = () => {
    if (file) {
      simulateUpload()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400 animate-pulse">Battleship Upload</h1>
        <div
          className="border-4 border-gray-600 rounded-lg p-8 bg-navy-800 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center mb-6">
            <input type="file" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mb-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Select File
            </button>
            <p className="text-gray-400 mb-4">or drag and drop your file here</p>
            {file && <p className="text-yellow-400 mb-4">Selected file: {file.name}</p>}
          </div>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {Array.from({ length: UPLOAD_STEPS }).map((_, index) => (
              <div
                key={index}
                className={`aspect-square border border-gray-600 rounded ${
                  hitCells.includes(index) ? "bg-red-500 animate-pulse" : "bg-navy-700"
                }`}
              ></div>
            ))}
          </div>
          {file && !uploading && uploadStatus === "idle" && (
            <button
              onClick={handleUpload}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Launch Upload
            </button>
          )}
          {uploading && (
            <p className="text-center text-yellow-400 mt-2">
              Uploading... {Math.round((uploadProgress / UPLOAD_STEPS) * 100)}%
            </p>
          )}
          {uploadStatus === "success" && (
            <div className="flex items-center justify-center text-green-500 mt-4">
              <CheckCircle className="mr-2" />
              <span>Upload successful! All targets hit!</span>
            </div>
          )}
          {uploadStatus === "error" && (
            <div className="flex items-center justify-center text-red-500 mt-4">
              <AlertCircle className="mr-2" />
              <span>Upload failed. Retry your attack!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

