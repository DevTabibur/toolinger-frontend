import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { ToolForm } from "@/components/tool-form"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const toolsData = {
  "domain-tools": {
    "domain-ip-history": {
      name: "Domain IP History",
      description: "View the complete IP address history of any domain to track hosting changes and migrations.",
      longDescription:
        "Our Domain IP History tool allows you to track the historical IP addresses associated with any domain name. This is useful for understanding hosting changes, migrations, and the technical evolution of websites over time.",
      inputLabel: "Enter Domain Name",
      inputPlaceholder: "example.com",
      inputType: "url",
      category: "Domain Tools",
    },
    "domain-authority-checker": {
      name: "Domain Authority Checker",
      description: "Check domain authority and page authority scores for any website.",
      longDescription:
        "Domain Authority (DA) is a search engine ranking score that predicts how likely a website is to rank in search engine result pages. Check your website's DA score and compare it with competitors.",
      inputLabel: "Enter Website URL",
      inputPlaceholder: "https://example.com",
      inputType: "url",
      category: "Domain Tools",
    },
    "google-malware-checker": {
      name: "Google Malware Checker",
      description: "Check if a website is flagged by Google for malware or suspicious activity.",
      longDescription:
        "Ensure your website's safety by checking if it's been flagged by Google for malware, phishing, or other security threats. This tool helps maintain your site's reputation and user trust.",
      inputLabel: "Enter Website URL",
      inputPlaceholder: "https://example.com",
      inputType: "url",
      category: "Domain Tools",
    },
  },
  "developer-tools": {
    "dns-records": {
      name: "DNS Records Checker",
      description: "Check DNS records for any domain including A, AAAA, CNAME, MX, TXT, and more.",
      longDescription:
        "Analyze DNS records for any domain to troubleshoot connectivity issues, verify configurations, and understand domain setup. View all record types including A, AAAA, CNAME, MX, TXT, NS, and SOA records.",
      inputLabel: "Enter Domain Name",
      inputPlaceholder: "example.com",
      inputType: "text",
      category: "Developer Tools",
    },
    "html-encoder-decoder": {
      name: "HTML Encoder/Decoder",
      description: "Encode and decode HTML entities for safe display in web pages.",
      longDescription:
        "Convert special characters to HTML entities and vice versa. Essential for displaying user-generated content safely and handling special characters in HTML documents.",
      inputLabel: "Enter HTML Code",
      inputPlaceholder: "<div>Hello & welcome!</div>",
      inputType: "textarea",
      category: "Developer Tools",
    },
    "json-beautifier": {
      name: "JSON Beautifier",
      description: "Format, validate, and beautify JSON data with proper indentation.",
      longDescription:
        "Clean up messy JSON data with proper formatting and indentation. Validate JSON syntax and make it human-readable for debugging and development purposes.",
      inputLabel: "Enter JSON Data",
      inputPlaceholder: '{"name":"John","age":30,"city":"New York"}',
      inputType: "textarea",
      category: "Developer Tools",
    },
  },
  "text-tools": {
    "password-generator": {
      name: "Password Generator",
      description: "Generate secure passwords with customizable length and character sets.",
      longDescription:
        "Create strong, secure passwords with customizable options including length, uppercase/lowercase letters, numbers, and special characters. Essential for maintaining good security practices.",
      inputLabel: "Password Length",
      inputPlaceholder: "12",
      inputType: "number",
      category: "Text Tools",
    },
    "binary-translator": {
      name: "Binary Translator",
      description: "Convert text to binary code and binary code back to text.",
      longDescription:
        "Convert between text and binary representation. Useful for understanding computer data representation, programming education, and encoding/decoding binary data.",
      inputLabel: "Enter Text or Binary",
      inputPlaceholder: "Hello World or 01001000 01100101 01101100 01101100 01101111",
      inputType: "textarea",
      category: "Text Tools",
    },
    "reverse-text-generator": {
      name: "Reverse Text Generator",
      description: "Reverse any text string character by character.",
      longDescription:
        "Reverse the order of characters in any text string. Useful for creating mirror text, puzzles, or simply reversing text for various purposes.",
      inputLabel: "Enter Text to Reverse",
      inputPlaceholder: "Hello World",
      inputType: "textarea",
      category: "Text Tools",
    },
  },
  calculators: {
    "percentage-calculator": {
      name: "Percentage Calculator",
      description: "Calculate percentages, increases, decreases, and percentage differences.",
      longDescription:
        "Perform various percentage calculations including finding what percentage one number is of another, calculating percentage increases/decreases, and finding the original value before percentage changes.",
      inputLabel: "Enter Values",
      inputPlaceholder: "Value: 50, Total: 200",
      inputType: "text",
      category: "Calculators",
    },
    "age-calculator": {
      name: "Age Calculator",
      description: "Calculate exact age in years, months, days, hours, and minutes.",
      longDescription:
        "Calculate your exact age or the age of anyone by entering their birth date. Get detailed results showing years, months, days, hours, minutes, and even seconds lived.",
      inputLabel: "Enter Birth Date",
      inputPlaceholder: "MM/DD/YYYY",
      inputType: "date",
      category: "Calculators",
    },
  },
}

type ToolPageProps = {
  params: { category: string; tool: string }
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const categoryTools = toolsData[params.category as keyof typeof toolsData]
  const tool = categoryTools?.[params.tool as keyof typeof categoryTools]

  if (!tool) {
    return {
      title: "Tool Not Found | Toolinger",
    }
  }

  return {
    title: `${tool.name} - Free Online Tool | Toolinger`,
    description: tool.description,
    keywords: `${tool.name.toLowerCase()}, ${tool.category.toLowerCase()}, online tool, free tool`,
    openGraph: {
      title: `${tool.name} - Free Online Tool | Toolinger`,
      description: tool.description,
      type: "website",
    },
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const categoryTools = toolsData[params.category as keyof typeof toolsData]
  const tool = categoryTools?.[params.tool as keyof typeof categoryTools]

  if (!tool) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href={`/category/${params.category}`} className="text-muted-foreground hover:text-primary">
              {tool.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <section className="py-12 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{tool.name}</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">{tool.description}</p>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner size="leaderboard" />
      </div>

      {/* Tool Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Use {tool.name}</h2>
                <p className="text-muted-foreground mb-6">{tool.longDescription}</p>

                <ToolForm tool={tool} category={params.category} toolSlug={params.tool} />
              </div>

              {/* Tool Description */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">About {tool.name}</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>{tool.longDescription}</p>
                  <h4>Key Features:</h4>
                  <ul>
                    <li>Fast and accurate results</li>
                    <li>No registration required</li>
                    <li>Works on all devices</li>
                    <li>Completely free to use</li>
                    <li>Privacy-focused - no data stored</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                <AdBanner size="rectangle" />

                {/* Related Tools */}
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-bold mb-4">Related Tools</h3>
                  <div className="space-y-3">
                    {Object.entries(categoryTools || {})
                      .slice(0, 5)
                      .map(([slug, relatedTool]) => (
                        <Link
                          key={slug}
                          href={`/${params.category}/${slug}`}
                          className="block text-sm hover:text-primary transition-colors"
                        >
                          {relatedTool.name}
                        </Link>
                      ))}
                  </div>
                </div>
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
