"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Download, RefreshCw } from "lucide-react"

interface ToolFormProps {
  tool: {
    name: string
    inputLabel: string
    inputPlaceholder: string
    inputType: string
  }
  category: string
  toolSlug: string
}

export function ToolForm({ tool, category, toolSlug }: ToolFormProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock processing based on tool type
      let result = ""

      switch (toolSlug) {
        case "domain-ip-history":
          result = `IP History for ${input}:\n\n2024-01-15: 192.168.1.1\n2023-12-01: 192.168.1.2\n2023-11-15: 192.168.1.3`
          break
        case "binary-translator":
          if (input.match(/^[01\s]+$/)) {
            // Binary to text
            result = input
              .split(" ")
              .map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
              .join("")
          } else {
            // Text to binary
            result = input
              .split("")
              .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
              .join(" ")
          }
          break
        case "password-generator":
          const length = Number.parseInt(input) || 12
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
          result = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
          break
        case "reverse-text-generator":
          result = input.split("").reverse().join("")
          break
        case "json-beautifier":
          try {
            result = JSON.stringify(JSON.parse(input), null, 2)
          } catch {
            result = "Invalid JSON format"
          }
          break
        default:
          result = `Processed result for: ${input}`
      }

      setOutput(result)
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const downloadResult = () => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${toolSlug}-result.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearForm = () => {
    setInput("")
    setOutput("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="input" className="text-base font-medium">
          {tool.inputLabel}
        </Label>
        {tool.inputType === "textarea" ? (
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tool.inputPlaceholder}
            className="mt-2 min-h-[120px]"
            required
          />
        ) : (
          <Input
            id="input"
            type={tool.inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tool.inputPlaceholder}
            className="mt-2"
            required
          />
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isLoading || !input.trim()} className="gradient-bg text-white hover:opacity-90">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Process ${tool.name.split(" ")[0]}`
          )}
        </Button>

        <Button type="button" variant="outline" onClick={clearForm} disabled={!input && !output}>
          Clear
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result:</Label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={downloadResult}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <Textarea value={output} readOnly className="min-h-[120px] bg-muted/50" />
        </div>
      )}
    </form>
  )
}
