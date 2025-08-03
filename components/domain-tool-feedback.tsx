"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function DomainToolFeedback() {
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle feedback submission
    console.log({ helpful, feedback })
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Is this tool helpful?</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="helpful"
              value="yes"
              checked={helpful === true}
              onChange={() => setHelpful(true)}
              className="text-green-500"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="helpful"
              value="no"
              checked={helpful === false}
              onChange={() => setHelpful(false)}
            />
            <span>No</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">How can we improve it?</label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
          Submit
        </Button>
      </form>
    </div>
  )
}
