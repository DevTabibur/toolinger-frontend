"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface DomainToolFormProps {
  tool: {
    name: string
    inputPlaceholder: string
    buttonText: string
    maxUrls: number
  }
}

export function DomainToolForm({ tool }: DomainToolFormProps) {
  const [input, setInput] = useState("")
  const [excludeSameUrl, setExcludeSameUrl] = useState(true)
  const [excludeSameDomain, setExcludeSameDomain] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle results here
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tool.inputPlaceholder}
          className="min-h-[200px] resize-none"
          required
        />
      </div>

      {/* Options */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="exclude-same-url" checked={excludeSameUrl} onCheckedChange={setExcludeSameUrl} />
            <label htmlFor="exclude-same-url" className="text-sm font-medium">
              Exclude Same URL
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="exclude-same-domain" checked={excludeSameDomain} onCheckedChange={setExcludeSameDomain} />
            <label htmlFor="exclude-same-domain" className="text-sm font-medium">
              Exclude Same Domain
            </label>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
        >
          {isLoading ? "Processing..." : tool.buttonText}
        </Button>
      </div>
    </form>
  )
}
