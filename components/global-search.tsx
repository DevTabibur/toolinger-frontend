"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ITool, SearchedAllTools } from "@/lib/categories"





interface GlobalSearchProps {
  placeholder?: string
  className?: string
  variant?: "hero" | "header"
}

export function GlobalSearch({
  placeholder = "Search from 200+ tools...",
  className = "",
  variant = "hero",
}: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredTools, setFilteredTools] = useState<ITool[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = SearchedAllTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredTools(filtered.slice(0, 8)) // Limit to 8 results
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setFilteredTools([])
      setIsOpen(false)
    }
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredTools.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && filteredTools[selectedIndex]) {
          handleToolClick(filteredTools[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleToolClick = (tool: ITool) => {
    setIsOpen(false)
    setSearchTerm("")
    setSelectedIndex(-1)

    // Navigate to the appropriate tool page
    if (tool.categorySlug === "domain-tools") {
      router.push(`/domain-tools/${tool.slug}`)
    } else {
      router.push(`/${tool.categorySlug}/${tool.slug}`)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const baseInputClasses =
    variant === "hero"
      ? "w-full pl-12 pr-12 py-4 text-lg rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
      : "w-full pl-10 pr-10 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"

  const iconClasses =
    variant === "hero"
      ? "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70"
      : "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className={iconClasses} />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className={baseInputClasses}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors ${variant === "hero" ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {filteredTools.length > 0 ? (
            <>
              <div className="p-3 border-b bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="py-2">
                {filteredTools.map((tool, index) => (
                  <Link
                    key={`${tool.categorySlug}-${tool.slug}`}
                    href={`/category/${tool.categorySlug}/${tool.slug}`}
                    onClick={() => handleToolClick(tool)}
                    className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-start space-x-3 ${index === selectedIndex ? "bg-muted/50" : ""
                      }`}
                  >
                    <div className="text-2xl mt-0.5">{tool.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate text-black dark:text-white">{tool.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                      <div className="text-xs text-primary mt-1">{tool.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
              {SearchedAllTools.filter(
                (tool) =>
                  tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
              ).length > 8 && (
                  <div className="p-3 border-t bg-muted/50 text-center">
                    <span className="text-sm text-muted-foreground">
                      Showing top 8 results. Keep typing to refine your search.
                    </span>
                  </div>
                )}
            </>
          ) : searchTerm.trim() ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-lg font-medium mb-2">No tools found</div>
              <div className="text-sm text-muted-foreground">
                Try searching with different keywords or browse our categories
              </div>
              <Link
                href="/"
                className="inline-block mt-4 text-primary hover:underline text-sm"
                onClick={() => setIsOpen(false)}
              >
                Browse all categories
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
