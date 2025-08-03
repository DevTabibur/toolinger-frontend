import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { DomainToolForm } from "@/components/domain-tool-form"
import { DomainToolSidebar } from "@/components/domain-tool-sidebar"
import { DomainToolFeedback } from "@/components/domain-tool-feedback"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const domainToolsData = {
  "domain-authority-checker": {
    name: "DA PA Checker (Domain Authority Checker)",
    description: "Check domain authority and page authority scores for any website",
    instructions:
      "To use prepostseo DA PA Checker, Paste upto 500 Urls in the input box given below and click on Check Authority Button.",
    inputPlaceholder: "Paste up to 5 webpages: (one url on each line)",
    buttonText: "Check Authority",
    maxUrls: 5,
    features: [
      "Check up to 500 URLs at once",
      "Get accurate DA and PA scores",
      "Bulk domain authority checking",
      "Export results to CSV",
      "Fast and reliable results",
    ],
    relatedTools: [
      "Domain Authority Checker",
      "Bulk Domain Authority Checker (Freemium)",
      "Good Domain Authority (Moz DA) score?",
      "How can you Improve domain authority?",
      "How does the Domain Authority Checker Tool Help to Improve SEO?",
      "How to improve position on Google search engine?",
    ],
  },
  "domain-age-checker": {
    name: "Domain Age Checker",
    description: "Find out when a domain was first registered and calculate its age",
    instructions: "Enter the domain name below to check when it was first registered and calculate its exact age.",
    inputPlaceholder: "Enter domain name (e.g., example.com)",
    buttonText: "Check Domain Age",
    maxUrls: 1,
    features: [
      "Check domain registration date",
      "Calculate exact domain age",
      "View domain expiration date",
      "Check domain status",
      "Historical domain information",
    ],
    relatedTools: [
      "Domain Age Checker",
      "Domain Whois Checker",
      "Domain Authority Checker",
      "Domain IP History",
      "Reverse Whois Checker",
      "Domain Registration Checker",
    ],
  },
  "domain-whois-checker": {
    name: "Domain Whois Checker",
    description:
      "Get detailed whois information for any domain including registrar, creation date, and contact details",
    instructions:
      "Enter a domain name to get complete whois information including registrar details, creation date, expiration date, and contact information.",
    inputPlaceholder: "Enter domain name (e.g., example.com)",
    buttonText: "Check Whois",
    maxUrls: 1,
    features: [
      "Complete whois information",
      "Registrar details",
      "Domain creation and expiration dates",
      "Contact information",
      "Name server information",
    ],
    relatedTools: [
      "Domain Whois Checker",
      "Reverse Whois Checker",
      "Domain Age Checker",
      "Domain Authority Checker",
      "Domain IP History",
      "DNS Records Checker",
    ],
  },
  "domain-ip-history": {
    name: "Domain IP History",
    description: "View the complete IP address history of any domain to track hosting changes",
    instructions: "Enter a domain name to view its complete IP address history and track hosting changes over time.",
    inputPlaceholder: "Enter domain name (e.g., example.com)",
    buttonText: "Check IP History",
    maxUrls: 1,
    features: [
      "Complete IP address history",
      "Track hosting changes",
      "Historical data analysis",
      "Server migration tracking",
      "IP change timeline",
    ],
    relatedTools: [
      "Domain IP History",
      "Reverse IP Domains",
      "Domain Authority Checker",
      "Domain Age Checker",
      "DNS Records Checker",
      "Server Status Checker",
    ],
  },
  "google-malware-checker": {
    name: "Google Malware Checker",
    description: "Check if a website is flagged by Google for malware or suspicious activity",
    instructions:
      "Enter a website URL to check if it has been flagged by Google for malware, phishing, or other security threats.",
    inputPlaceholder: "Enter website URL (e.g., https://example.com)",
    buttonText: "Check Malware Status",
    maxUrls: 1,
    features: [
      "Google Safe Browsing check",
      "Malware detection",
      "Phishing site detection",
      "Security threat analysis",
      "Website safety report",
    ],
    relatedTools: [
      "Google Malware Checker",
      "Website Security Scanner",
      "SSL Certificate Checker",
      "Domain Authority Checker",
      "Website Status Checker",
      "Broken Links Checker",
    ],
  },
}

type DomainToolPageProps = {
  params: { tool: string }
}

export async function generateMetadata({ params }: DomainToolPageProps): Promise<Metadata> {
  const tool = domainToolsData[params.tool as keyof typeof domainToolsData]

  if (!tool) {
    return {
      title: "Tool Not Found | Toolinger",
    }
  }

  return {
    title: `${tool.name} - Free Online Tool | Toolinger`,
    description: tool.description,
    keywords: `${tool.name.toLowerCase()}, domain tools, SEO tools, website analysis`,
    openGraph: {
      title: `${tool.name} - Free Online Tool | Toolinger`,
      description: tool.description,
      type: "website",
    },
  }
}

export default function DomainToolPage({ params }: DomainToolPageProps) {
  const tool = domainToolsData[params.tool as keyof typeof domainToolsData]

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
            <Link href="/category/domain-tools" className="text-muted-foreground hover:text-primary">
              Domain Tools
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Tool Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{tool.name}</h1>
                <p className="text-muted-foreground">{tool.instructions}</p>
              </div>

              {/* Success Banner */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 dark:text-green-400">🎉 Great News:</span>
                  <span className="text-green-700 dark:text-green-300">
                    Our service is now fully operational! Enjoy a seamless experience.
                  </span>
                  <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm ml-auto">
                    Check up to 500 URLs
                  </button>
                </div>
              </div>

              {/* Tool Form */}
              <DomainToolForm tool={tool} />

              {/* Ad Banner */}
              <div className="my-8">
                <AdBanner size="banner" />
              </div>

              {/* Tool Features */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-6">
                {/* Table of Contents */}
                <DomainToolSidebar relatedTools={tool.relatedTools} />

                {/* Feedback Section */}
                <DomainToolFeedback />

                {/* Advertisement */}
                <div className="bg-muted/30 border rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-2">ADVERTISEMENT</div>
                  <AdBanner size="rectangle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(domainToolsData).map((tool) => ({
    tool,
  }))
}
