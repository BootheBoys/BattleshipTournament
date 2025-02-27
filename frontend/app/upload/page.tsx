"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [code, setCode] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.size > 1024 * 1024) {
          // 1MB limit
          toast({
            title: "File too large",
            description: "Please upload a file smaller than 1MB",
            variant: "destructive",
          })
          return
        }
        if (!file.name.endsWith(".js") && !file.name.endsWith(".ts")) {
          toast({
            title: "Invalid file type",
            description: "Please upload a JavaScript or TypeScript file",
            variant: "destructive",
          })
          return
        }
        setFile(file)
        const reader = new FileReader()
        reader.onload = () => {
          setCode(reader.result as string)
        }
        reader.readAsText(file)
      }
    },
    [toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/javascript": [".js"],
      "application/typescript": [".ts"],
    },
    maxFiles: 1,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      // Simulated upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Bot uploaded successfully",
        description: "Your bot has been uploaded and will be processed shortly.",
      })

      // Reset form
      setFile(null)
      setCode("")
    } catch (error) {
      toast({
        title: "Error uploading bot",
        description: "There was an error uploading your bot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setCode("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background hexagon-pattern">
      <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
              Upload Your Bot
            </h1>
            <p className="text-foreground/60">Submit your AI bot to compete in the Battleship Tournament</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input
                      id="bot-name"
                      placeholder="Enter a name for your bot"
                      required
                      className="bg-background/50 border-primary/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <Label>Bot File</Label>
                    <div
                      {...getRootProps()}
                      className={cn(
                        "mt-2 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background/80 transition-colors",
                        "border-primary/20 hover:border-primary/40",
                        isDragActive && "border-primary/60 bg-primary/5",
                      )}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center py-8 px-4">
                        {file ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground/60">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile()
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 mb-2 text-primary" />
                            <p className="text-sm text-center text-foreground/60">
                              <span className="font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-foreground/40 mt-1">
                              JavaScript or TypeScript files only (max. 1MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {code && (
                    <div className="space-y-2">
                      <Label>Code Preview</Label>
                      <div className="relative">
                        <pre className="overflow-x-auto p-4 rounded-lg bg-background/50 border border-primary/20 text-sm font-mono text-foreground/80">
                          {code}
                        </pre>
                      </div>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={uploading || !file}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {uploading ? "Uploading..." : "Upload Bot"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}

