import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Domain Tools - Free Online Domain Analysis Tools | Toolinger",
  description:
    "Comprehensive domain analysis and management tools for webmasters and SEO professionals. Check domain authority, age, IP history, and more.",
  keywords: "domain tools, domain authority checker, domain age checker, whois lookup, DNS tools, SEO tools",
  openGraph: {
    title: "Domain Tools - Free Online Domain Analysis Tools | Toolinger",
    description: "Comprehensive domain analysis and management tools for webmasters and SEO professionals.",
    type: "website",
  },
}

const domainTools = [
  {
    name: "Domain Authority Checker",
    slug: "domain-authority-checker",
    description: "Check domain authority and page authority scores",
  },
  {
    name: "Domain Age Checker",
    slug: "domain-age-checker",
    description: "Find out when a domain was first registered",
  },
  {
    name: "Domain Whois Checker",
    slug: "domain-whois-checker",
    description: "Get detailed whois information for any domain",
  },
  {
    name: "Domain IP History",
    slug: "domain-ip-history",
    description: "View historical IP addresses for any domain",
  },
  {
    name: "Reverse IP Domains",
    slug: "reverse-ip-domains",
    description: "Find all domains hosted on the same IP address",
  },
  {
    name: "Reverse Whois Checker",
    slug: "reverse-whois-checker",
    description: "Find domains registered by the same person or organization",
  },
  {
    name: "XML Sitemap Generator",
    slug: "xml-sitemap-generator",
    description: "Generate XML sitemaps for your website",
  },
  {
    name: "Google Malware Checker",
    slug: "google-malware-checker",
    description: "Check if a website is flagged by Google for malware",
  },
  {
    name: "Alexa Rank Checker",
    slug: "alexa-rank-checker",
    description: "Check website's Alexa traffic ranking",
  },
  {
    name: "Compare Alexa Rank",
    slug: "compare-alexa-rank",
    description: "Compare Alexa rankings between multiple websites",
  },
  {
    name: "Backlink Maker",
    slug: "backlink-maker",
    description: "Generate high-quality backlinks for your website",
  },
  {
    name: "Social Media Counter",
    slug: "social-media-counter",
    description: "Count social media shares for any URL",
  },
  {
    name: "Blog Search Tool",
    slug: "blog-search-tool",
    description: "Search and analyze blog content across domains",
  },
  {
    name: "Broken Links Checker",
    slug: "broken-links-checker",
    description: "Find and fix broken links on your website",
  },
  {
    name: "Google PR Checker",
    slug: "google-pr-checker",
    description: "Check Google PageRank for websites",
  },
  {
    name: "Link Extractor",
    slug: "link-extractor",
    description: "Extract all links from any webpage",
  },
  {
    name: "Google Indexer",
    slug: "google-indexer",
    description: "Check if your pages are indexed by Google",
  },
]

export default function DomainToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Header */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Domain Tools</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Comprehensive domain analysis and management tools for webmasters and SEO professionals
          </p>
          <div className="mt-6">
            <SearchBar placeholder="Search domain tools..." />
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner size="leaderboard" />
      </div>

      {/* Tools Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Domain Tools</h2>
                <p className="text-muted-foreground mb-4">
                  Looking for better way to analyze and manage domains? Check out these tools!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {domainTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/domain-tools/${tool.slug}`}
                    className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-primary/50"
                  >
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{tool.name}</h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <AdBanner size="sidebar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner size="banner" />
      </div>

      <Footer />
    </div>
  )
}
