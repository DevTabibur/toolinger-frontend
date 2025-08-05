"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Tool {
  name: string
  description: string
  category: string
  slug: string
  categorySlug: string
  icon?: string
}

const allTools: Tool[] = [
  // Domain Tools
  {
    name: "Domain Authority Checker",
    description: "Check domain authority and page authority scores",
    category: "Domain Tools",
    slug: "domain-authority-checker",
    categorySlug: "domain-tools",
    icon: "🔍",
  },
  {
    name: "Domain Age Checker",
    description: "Find out when a domain was first registered",
    category: "Domain Tools",
    slug: "domain-age-checker",
    categorySlug: "domain-tools",
    icon: "📅",
  },
  {
    name: "Domain Whois Checker",
    description: "Get detailed whois information for any domain",
    category: "Domain Tools",
    slug: "domain-whois-checker",
    categorySlug: "domain-tools",
    icon: "ℹ️",
  },
  {
    name: "Domain IP History",
    description: "View historical IP addresses for any domain",
    category: "Domain Tools",
    slug: "domain-ip-history",
    categorySlug: "domain-tools",
    icon: "📊",
  },
  {
    name: "Reverse IP Domains",
    description: "Find all domains hosted on the same IP address",
    category: "Domain Tools",
    slug: "reverse-ip-domains",
    categorySlug: "domain-tools",
    icon: "🔄",
  },
  {
    name: "Google Malware Checker",
    description: "Check if a website is flagged by Google for malware",
    category: "Domain Tools",
    slug: "google-malware-checker",
    categorySlug: "domain-tools",
    icon: "🛡️",
  },
  {
    name: "Backlink Maker",
    description: "Generate high-quality backlinks for your website",
    category: "Domain Tools",
    slug: "backlink-maker",
    categorySlug: "domain-tools",
    icon: "🔗",
  },
  {
    name: "Broken Links Checker",
    description: "Find and fix broken links on your website",
    category: "Domain Tools",
    slug: "broken-links-checker",
    categorySlug: "domain-tools",
    icon: "🔧",
  },
  {
    name: "Google Indexer",
    description: "Check if your pages are indexed by Google",
    category: "Domain Tools",
    slug: "google-indexer",
    categorySlug: "domain-tools",
    icon: "🔍",
  },
  {
    name: "Reverse Whois Checker",
    description: "Find domains registered by the same person or organization",
    category: "Domain Tools",
    slug: "reverse-whois-checker",
    categorySlug: "domain-tools",
    icon: "👤",
  },
  {
    name: "Alexa Rank Checker",
    description: "Check website's Alexa traffic ranking",
    category: "Domain Tools",
    slug: "alexa-rank-checker",
    categorySlug: "domain-tools",
    icon: "📈",
  },

  // Developer Tools
  {
    name: "DNS Records Checker",
    description: "Check DNS records for any domain",
    category: "Developer Tools",
    slug: "dns-records",
    categorySlug: "developer-tools",
    icon: "🌐",
  },
  {
    name: "HTML Encoder/Decoder",
    description: "Encode and decode HTML entities",
    category: "Developer Tools",
    slug: "html-encoder-decoder",
    categorySlug: "developer-tools",
    icon: "📝",
  },
  {
    name: "JSON Beautifier",
    description: "Format and validate JSON data",
    category: "Developer Tools",
    slug: "json-beautifier",
    categorySlug: "developer-tools",
    icon: "📋",
  },
  {
    name: "Minify HTML",
    description: "Compress HTML code by removing unnecessary characters",
    category: "Developer Tools",
    slug: "minify-html",
    categorySlug: "developer-tools",
    icon: "🗜️",
  },
  {
    name: "JS Beautifier",
    description: "Format and beautify JavaScript code",
    category: "Developer Tools",
    slug: "js-beautifier",
    categorySlug: "developer-tools",
    icon: "✨",
  },
  {
    name: "CSS Beautifier",
    description: "Format and beautify CSS code",
    category: "Developer Tools",
    slug: "css-beautifier",
    categorySlug: "developer-tools",
    icon: "🎨",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs",
    category: "Developer Tools",
    slug: "url-encoder-decoder",
    categorySlug: "developer-tools",
    icon: "🔗",
  },

  // Text Tools
  {
    name: "Password Generator",
    description: "Generate secure passwords with custom options",
    category: "Text Tools",
    slug: "password-generator",
    categorySlug: "text-tools",
    icon: "🔐",
  },
  {
    name: "Binary Translator",
    description: "Convert text to binary and vice versa",
    category: "Text Tools",
    slug: "binary-translator",
    categorySlug: "text-tools",
    icon: "🔢",
  },
  {
    name: "Reverse Text Generator",
    description: "Reverse any text string",
    category: "Text Tools",
    slug: "reverse-text-generator",
    categorySlug: "text-tools",
    icon: "🔄",
  },
  {
    name: "Upside Down Text Generator",
    description: "Flip text upside down",
    category: "Text Tools",
    slug: "upside-down-text-generator",
    categorySlug: "text-tools",
    icon: "🙃",
  },
  {
    name: "Roman Numeral Converter",
    description: "Convert numbers to Roman numerals and back",
    category: "Text Tools",
    slug: "roman-numeral-converter",
    categorySlug: "text-tools",
    icon: "🏛️",
  },
  {
    name: "Text to Hex Converter",
    description: "Convert text to hexadecimal format",
    category: "Text Tools",
    slug: "text-to-hex",
    categorySlug: "text-tools",
    icon: "🔤",
  },
  {
    name: "Random Word Generator",
    description: "Generate random words for various purposes",
    category: "Text Tools",
    slug: "random-word-generator",
    categorySlug: "text-tools",
    icon: "🎲",
  },
  {
    name: "Grammar Checker",
    description: "Check and correct grammar in your text",
    category: "Text Tools",
    slug: "grammar-checker",
    categorySlug: "text-tools",
    icon: "✅",
  },

  // Calculators
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, and decreases",
    category: "Calculators",
    slug: "percentage-calculator",
    categorySlug: "calculators",
    icon: "📊",
  },
  {
    name: "Age Calculator",
    description: "Calculate age in years, months, and days",
    category: "Calculators",
    slug: "age-calculator",
    categorySlug: "calculators",
    icon: "🎂",
  },
  {
    name: "Discount Calculator",
    description: "Calculate discounts and final prices",
    category: "Calculators",
    slug: "discount-calculator",
    categorySlug: "calculators",
    icon: "💰",
  },
  {
    name: "Sales Tax Calculator",
    description: "Calculate sales tax and total amount",
    category: "Calculators",
    slug: "sales-tax-calculator",
    categorySlug: "calculators",
    icon: "🧾",
  },
  {
    name: "GST Calculator",
    description: "Calculate GST (Goods and Services Tax)",
    category: "Calculators",
    slug: "gst-calculator",
    categorySlug: "calculators",
    icon: "📋",
  },
  {
    name: "Margin Calculator",
    description: "Calculate profit margins and markups",
    category: "Calculators",
    slug: "margin-calculator",
    categorySlug: "calculators",
    icon: "📈",
  },
  {
    name: "Interest Calculator",
    description: "Calculate simple and compound interest",
    category: "Calculators",
    slug: "interest-calculator",
    categorySlug: "calculators",
    icon: "🏦",
  },
  {
    name: "Average Calculator",
    description: "Calculate mean, median, and mode",
    category: "Calculators",
    slug: "average-calculator",
    categorySlug: "calculators",
    icon: "📊",
  },

  // Converters
  {
    name: "RGB to Hex Converter",
    description: "Convert RGB colors to hexadecimal format",
    category: "Converters",
    slug: "rgb-to-hex",
    categorySlug: "converters",
    icon: "🎨",
  },
  {
    name: "Hex to RGB Converter",
    description: "Convert hexadecimal colors to RGB format",
    category: "Converters",
    slug: "hex-to-rgb",
    categorySlug: "converters",
    icon: "🌈",
  },
  {
    name: "Currency Converter",
    description: "Convert between different currencies",
    category: "Converters",
    slug: "currency-converter",
    categorySlug: "converters",
    icon: "💱",
  },
  {
    name: "Unit Converter",
    description: "Convert between various units of measurement",
    category: "Converters",
    slug: "unit-converter",
    categorySlug: "converters",
    icon: "📏",
  },

  // Generators
  {
    name: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and more",
    category: "Generators",
    slug: "qr-code-generator",
    categorySlug: "generators",
    icon: "📱",
  },
  {
    name: "Random Address Generator",
    description: "Generate random addresses for testing",
    category: "Generators",
    slug: "random-address-generator",
    categorySlug: "generators",
    icon: "🏠",
  },
  {
    name: "Email Template Generator",
    description: "Create professional email templates",
    category: "Generators",
    slug: "email-template-generator",
    categorySlug: "generators",
    icon: "📧",
  },
  {
    name: "Favicon Generator",
    description: "Generate favicons for your website",
    category: "Generators",
    slug: "favicon-generator",
    categorySlug: "generators",
    icon: "🎯",
  },

  // SEO Tools
  {
    name: "Website SEO Score",
    description: "Analyze your website's SEO performance",
    category: "SEO Tools",
    slug: "website-seo-score",
    categorySlug: "seo-tools",
    icon: "📊",
  },
  {
    name: "Google Index Checker",
    description: "Check if your pages are indexed by Google",
    category: "SEO Tools",
    slug: "google-index-tool",
    categorySlug: "seo-tools",
    icon: "🔍",
  },
  {
    name: "CMS Detector",
    description: "Detect what CMS a website is using",
    category: "SEO Tools",
    slug: "detect-cms",
    categorySlug: "seo-tools",
    icon: "🔍",
  },

  // Productivity Tools
  {
    name: "Timer",
    description: "Set timers for various tasks and activities",
    category: "Productivity Tools",
    slug: "timer",
    categorySlug: "productivity-tools",
    icon: "⏰",
  },
  {
    name: "Calendar",
    description: "View and manage calendar dates",
    category: "Productivity Tools",
    slug: "calendar",
    categorySlug: "productivity-tools",
    icon: "📅",
  },
  {
    name: "Dictionary",
    description: "Look up word definitions and meanings",
    category: "Productivity Tools",
    slug: "dictionary",
    categorySlug: "productivity-tools",
    icon: "📚",
  },
  {
    name: "Basic Calculator",
    description: "Perform basic mathematical calculations",
    category: "Productivity Tools",
    slug: "calculator",
    categorySlug: "productivity-tools",
    icon: "🧮",
  },
]

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
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allTools.filter(
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

  const handleToolClick = (tool: Tool) => {
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
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors ${
              variant === "hero" ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
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
                  <button
                    key={`${tool.categorySlug}-${tool.slug}`}
                    onClick={() => handleToolClick(tool)}
                    className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-start space-x-3 ${
                      index === selectedIndex ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="text-2xl mt-0.5">{tool.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{tool.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                      <div className="text-xs text-primary mt-1">{tool.category}</div>
                    </div>
                  </button>
                ))}
              </div>
              {allTools.filter(
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
