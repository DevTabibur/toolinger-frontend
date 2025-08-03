import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { CategoryToolsGrid } from "@/components/category-tools-grid"
import { SearchBar } from "@/components/search-bar"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const categories = {
  "domain-tools": {
    name: "Domain Tools",
    description: "Comprehensive domain analysis and management tools for webmasters and SEO professionals",
    color: "from-blue-500 to-cyan-500",
    tools: [
      {
        name: "Domain Authority Checker",
        description: "Check domain authority and page authority scores",
        icon: "🔍",
        slug: "domain-authority-checker",
      },
      {
        name: "Domain IP History",
        description: "View historical IP addresses for any domain",
        icon: "📊",
        slug: "domain-ip-history",
      },
      {
        name: "Domain Age Checker",
        description: "Find out when a domain was first registered",
        icon: "📅",
        slug: "domain-age-checker",
      },
      {
        name: "Reverse IP Domains",
        description: "Find all domains hosted on the same IP address",
        icon: "🔄",
        slug: "reverse-ip-domains",
      },
      {
        name: "Google Malware Checker",
        description: "Check if a website is flagged by Google for malware",
        icon: "🛡️",
        slug: "google-malware-checker",
      },
      {
        name: "Backlink Maker",
        description: "Generate high-quality backlinks for your website",
        icon: "🔗",
        slug: "backlink-maker",
      },
      {
        name: "Broken Links Checker",
        description: "Find and fix broken links on your website",
        icon: "🔧",
        slug: "broken-links-checker",
      },
      {
        name: "Google Indexer",
        description: "Check if your pages are indexed by Google",
        icon: "🔍",
        slug: "google-indexer",
      },
      {
        name: "Reverse Whois Checker",
        description: "Find domains registered by the same person or organization",
        icon: "👤",
        slug: "reverse-whois-checker",
      },
      {
        name: "Alexa Rank Checker",
        description: "Check website's Alexa traffic ranking",
        icon: "📈",
        slug: "alexa-rank-checker",
      },
      {
        name: "Blog Search Tool",
        description: "Search and analyze blog content across domains",
        icon: "📝",
        slug: "blog-search-tool",
      },
      {
        name: "Link Extractor",
        description: "Extract all links from any webpage",
        icon: "🔗",
        slug: "link-extractor",
      },
      {
        name: "Social Media Counter",
        description: "Count social media shares for any URL",
        icon: "📱",
        slug: "social-media-counter",
      },
      {
        name: "Google PR Checker",
        description: "Check Google PageRank for websites",
        icon: "📊",
        slug: "google-pr-checker",
      },
      {
        name: "Domain Whois Checker",
        description: "Get detailed whois information for any domain",
        icon: "ℹ️",
        slug: "domain-whois-checker",
      },
    ],
  },
  "website-management": {
    name: "Website Management Tools",
    description: "Essential tools for website analysis, monitoring, and optimization",
    color: "from-violet-500 to-purple-500",
    tools: [
      {
        name: "DNS Records Checker",
        description: "Check DNS records for any domain",
        icon: "🌐",
        slug: "dns-records",
      },
      {
        name: "DNS Propagation Checker",
        description: "Check DNS propagation status worldwide",
        icon: "🌍",
        slug: "dns-propagation",
      },
      {
        name: "IP Location Finder",
        description: "Find geographical location of any IP address",
        icon: "📍",
        slug: "ip-location",
      },
      {
        name: "Server Status Checker",
        description: "Check if a server is online and responsive",
        icon: "🖥️",
        slug: "server-status",
      },
      {
        name: "Server Port Scanner",
        description: "Scan open ports on any server",
        icon: "🔍",
        slug: "server-port-scanner",
      },
      {
        name: "Website Page Snooper",
        description: "View HTML source code of any webpage",
        icon: "👁️",
        slug: "website-page-snooper",
      },
      {
        name: "Domain IP Lookup",
        description: "Find IP address of any domain",
        icon: "🔍",
        slug: "domain-ip-lookup",
      },
      {
        name: "Class C IP Checker",
        description: "Check Class C IP addresses",
        icon: "🌐",
        slug: "class-c-ip",
      },
      {
        name: "Ping from Different Locations",
        description: "Ping websites from multiple global locations",
        icon: "📡",
        slug: "different-locations-ping",
      },
      {
        name: "Website SEO Score",
        description: "Analyze your website's SEO performance",
        icon: "📊",
        slug: "website-seo-score",
      },
      {
        name: "DNS Report Generator",
        description: "Generate comprehensive DNS reports",
        icon: "📋",
        slug: "dns-report",
      },
      {
        name: "Favicon Generator",
        description: "Generate favicons for your website",
        icon: "🎯",
        slug: "favicon-generator",
      },
      {
        name: "HTML Minifier",
        description: "Compress HTML code by removing unnecessary characters",
        icon: "🗜️",
        slug: "minify-html",
      },
      {
        name: "CSS Minifier",
        description: "Compress CSS code for faster loading",
        icon: "🎨",
        slug: "minify-css",
      },
      {
        name: "JavaScript Minifier",
        description: "Compress JavaScript code for optimization",
        icon: "⚡",
        slug: "minify-js",
      },
      {
        name: "JSON Minifier",
        description: "Compress JSON data",
        icon: "📋",
        slug: "minify-json",
      },
      {
        name: "HTML Beautifier",
        description: "Format and beautify HTML code",
        icon: "✨",
        slug: "html-beautifier",
      },
      {
        name: "CSS Beautifier",
        description: "Format and beautify CSS code",
        icon: "🎨",
        slug: "css-beautifier",
      },
      {
        name: "JavaScript Beautifier",
        description: "Format and beautify JavaScript code",
        icon: "✨",
        slug: "js-beautifier",
      },
      {
        name: "XML Beautifier",
        description: "Format and validate XML data",
        icon: "📄",
        slug: "xml-beautifier",
      },
      {
        name: "PHP Beautifier",
        description: "Format and beautify PHP code",
        icon: "🐘",
        slug: "php-beautifier",
      },
      {
        name: "RGB to Hex Converter",
        description: "Convert RGB colors to hexadecimal format",
        icon: "🎨",
        slug: "rgb-to-hex",
      },
      {
        name: "URL Encoder/Decoder",
        description: "Encode and decode URLs",
        icon: "🔗",
        slug: "url-encoder-decoder",
      },
      {
        name: "HTML Encoder/Decoder",
        description: "Encode and decode HTML entities",
        icon: "📝",
        slug: "html-encoder-decoder",
      },
    ],
  },
  "more-tools": {
    name: "More Tools",
    description: "Additional specialized tools and utilities for various purposes",
    color: "from-rose-500 to-pink-500",
    tools: [
      {
        name: "QR Code Scanner",
        description: "Scan and decode QR codes from images",
        icon: "📱",
        slug: "qr-code-scanner",
      },
      {
        name: "Roman Numerals Date Converter",
        description: "Convert dates to Roman numerals format",
        icon: "🏛️",
        slug: "roman-numerals-date-converter",
      },
      {
        name: "Random Address Generator",
        description: "Generate random addresses for testing",
        icon: "🏠",
        slug: "random-address-generator",
      },
      {
        name: "Discount Calculator",
        description: "Calculate discounts and final prices",
        icon: "💰",
        slug: "discount-calculator",
      },
      {
        name: "Octal Calculator",
        description: "Perform calculations in octal number system",
        icon: "🔢",
        slug: "octal-calculator",
      },
      {
        name: "AdSense Calculator",
        description: "Calculate potential AdSense earnings",
        icon: "💵",
        slug: "adsense-calculator",
      },
      {
        name: "PayPal Fee Calculator",
        description: "Calculate PayPal transaction fees",
        icon: "💳",
        slug: "paypal-fee-calculator",
      },
      {
        name: "LTV Calculator",
        description: "Calculate customer lifetime value",
        icon: "📈",
        slug: "ltv-calculator",
      },
      {
        name: "CPM Calculator",
        description: "Calculate cost per mille for advertising",
        icon: "📊",
        slug: "cpm-calculator",
      },
      {
        name: "Random Word Generator",
        description: "Generate random words for various purposes",
        icon: "🎲",
        slug: "random-word-generator",
      },
      {
        name: "EPS Calculator",
        description: "Calculate earnings per share",
        icon: "📊",
        slug: "eps-calculator",
      },
      {
        name: "Sales Tax Calculator",
        description: "Calculate sales tax and total amount",
        icon: "🧾",
        slug: "sales-tax-calculator",
      },
      {
        name: "Average Calculator",
        description: "Calculate mean, median, and mode",
        icon: "📊",
        slug: "average-calculator",
      },
      {
        name: "Probability Calculator",
        description: "Calculate probability and statistics",
        icon: "🎯",
        slug: "probability-calculator",
      },
      {
        name: "GST Calculator",
        description: "Calculate GST (Goods and Services Tax)",
        icon: "📋",
        slug: "gst-calculator",
      },
      {
        name: "Age Calculator",
        description: "Calculate exact age in years, months, and days",
        icon: "🎂",
        slug: "age-calculator",
      },
      {
        name: "Margin Calculator",
        description: "Calculate profit margins and markups",
        icon: "📈",
        slug: "margin-calculator",
      },
      {
        name: "Bounds Calculator",
        description: "Calculate mathematical bounds and limits",
        icon: "📐",
        slug: "bounds-calculator",
      },
      {
        name: "Valuation Calculator",
        description: "Calculate business and asset valuations",
        icon: "💼",
        slug: "valuation-calculator",
      },
      {
        name: "Grammar Checker",
        description: "Check and correct grammar in your text",
        icon: "✅",
        slug: "grammar-checker",
      },
      {
        name: "QR Code Generator",
        description: "Generate QR codes for text, URLs, and more",
        icon: "📱",
        slug: "qr-code-generator",
      },
      {
        name: "Basic Calculator",
        description: "Perform basic mathematical calculations",
        icon: "🧮",
        slug: "calculator",
      },
      {
        name: "Timer",
        description: "Set timers for various tasks and activities",
        icon: "⏰",
        slug: "timer",
      },
      {
        name: "Calendar",
        description: "View and manage calendar dates",
        icon: "📅",
        slug: "calendar",
      },
      {
        name: "Dictionary",
        description: "Look up word definitions and meanings",
        icon: "📚",
        slug: "dictionary",
      },
      {
        name: "Interest Calculator",
        description: "Calculate simple and compound interest",
        icon: "🏦",
        slug: "interest-calculator",
      },
      {
        name: "Currency Converter",
        description: "Convert between different currencies",
        icon: "💱",
        slug: "currency-converter",
      },
      {
        name: "CMS Detector",
        description: "Detect what CMS a website is using",
        icon: "🔍",
        slug: "detect-cms",
      },
      {
        name: "Decimal to ASCII Converter",
        description: "Convert decimal numbers to ASCII characters",
        icon: "🔤",
        slug: "decimal-to-ascii",
      },
      {
        name: "Text to Hex Converter",
        description: "Convert text to hexadecimal format",
        icon: "🔤",
        slug: "text-to-hex",
      },
      {
        name: "Hex to RGB Converter",
        description: "Convert hexadecimal colors to RGB format",
        icon: "🌈",
        slug: "hex-to-rgb",
      },
      {
        name: "Text to Hex 2",
        description: "Alternative text to hex conversion tool",
        icon: "🔤",
        slug: "text-to-hex-2",
      },
      {
        name: "Email Template Generator",
        description: "Create professional email templates",
        icon: "📧",
        slug: "email-template-generator",
      },
    ],
  },
  "developer-tools": {
    name: "Developer Tools",
    description: "Essential tools for web developers and programmers to optimize and debug code",
    color: "from-green-500 to-emerald-500",
    tools: [
      {
        name: "DNS Records Checker",
        description: "Check DNS records for any domain",
        icon: "🌐",
        slug: "dns-records",
      },
      {
        name: "HTML Encoder/Decoder",
        description: "Encode and decode HTML entities",
        icon: "📝",
        slug: "html-encoder-decoder",
      },
      {
        name: "Minify HTML",
        description: "Compress HTML code by removing unnecessary characters",
        icon: "🗜️",
        slug: "minify-html",
      },
      {
        name: "JS Beautifier",
        description: "Format and beautify JavaScript code",
        icon: "✨",
        slug: "js-beautifier",
      },
      {
        name: "PHP Beautifier",
        description: "Format and beautify PHP code",
        icon: "🐘",
        slug: "php-beautifier",
      },
      {
        name: "CSS Beautifier",
        description: "Format and beautify CSS code",
        icon: "🎨",
        slug: "css-beautifier",
      },
      {
        name: "JSON Beautifier",
        description: "Format and validate JSON data",
        icon: "📋",
        slug: "json-beautifier",
      },
      {
        name: "XML Beautifier",
        description: "Format and validate XML data",
        icon: "📄",
        slug: "xml-beautifier",
      },
      {
        name: "URL Encoder/Decoder",
        description: "Encode and decode URLs",
        icon: "🔗",
        slug: "url-encoder-decoder",
      },
      {
        name: "Server Status Checker",
        description: "Check if a server is online and responsive",
        icon: "🖥️",
        slug: "server-status",
      },
    ],
  },
  "text-tools": {
    name: "Text Tools",
    description: "Powerful text manipulation and formatting tools for content creators",
    color: "from-purple-500 to-pink-500",
    tools: [
      {
        name: "Binary Translator",
        description: "Convert text to binary and vice versa",
        icon: "🔢",
        slug: "binary-translator",
      },
      {
        name: "Password Generator",
        description: "Generate secure passwords with custom options",
        icon: "🔐",
        slug: "password-generator",
      },
      {
        name: "Reverse Text Generator",
        description: "Reverse any text string",
        icon: "🔄",
        slug: "reverse-text-generator",
      },
      {
        name: "Upside Down Text Generator",
        description: "Flip text upside down",
        icon: "🙃",
        slug: "upside-down-text-generator",
      },
      {
        name: "Roman Numeral Converter",
        description: "Convert numbers to Roman numerals and back",
        icon: "🏛️",
        slug: "roman-numeral-converter",
      },
      {
        name: "Text to Hex Converter",
        description: "Convert text to hexadecimal format",
        icon: "🔤",
        slug: "text-to-hex",
      },
      {
        name: "Random Word Generator",
        description: "Generate random words for various purposes",
        icon: "🎲",
        slug: "random-word-generator",
      },
      {
        name: "Grammar Checker",
        description: "Check and correct grammar in your text",
        icon: "✅",
        slug: "grammar-checker",
      },
    ],
  },
  calculators: {
    name: "Calculators",
    description: "Mathematical and financial calculators for everyday calculations",
    color: "from-orange-500 to-red-500",
    tools: [
      {
        name: "Percentage Calculator",
        description: "Calculate percentages, increases, and decreases",
        icon: "📊",
        slug: "percentage-calculator",
      },
      {
        name: "Age Calculator",
        description: "Calculate age in years, months, and days",
        icon: "🎂",
        slug: "age-calculator",
      },
      {
        name: "Discount Calculator",
        description: "Calculate discounts and final prices",
        icon: "💰",
        slug: "discount-calculator",
      },
      {
        name: "Sales Tax Calculator",
        description: "Calculate sales tax and total amount",
        icon: "🧾",
        slug: "sales-tax-calculator",
      },
      {
        name: "GST Calculator",
        description: "Calculate GST (Goods and Services Tax)",
        icon: "📋",
        slug: "gst-calculator",
      },
      {
        name: "Margin Calculator",
        description: "Calculate profit margins and markups",
        icon: "📈",
        slug: "margin-calculator",
      },
      {
        name: "Interest Calculator",
        description: "Calculate simple and compound interest",
        icon: "🏦",
        slug: "interest-calculator",
      },
      {
        name: "Average Calculator",
        description: "Calculate mean, median, and mode",
        icon: "📊",
        slug: "average-calculator",
      },
    ],
  },
  converters: {
    name: "Converters",
    description: "Convert between different units, formats, and number systems",
    color: "from-teal-500 to-blue-500",
    tools: [
      {
        name: "RGB to Hex Converter",
        description: "Convert RGB colors to hexadecimal format",
        icon: "🎨",
        slug: "rgb-to-hex",
      },
      {
        name: "Hex to RGB Converter",
        description: "Convert hexadecimal colors to RGB format",
        icon: "🌈",
        slug: "hex-to-rgb",
      },
      {
        name: "Currency Converter",
        description: "Convert between different currencies",
        icon: "💱",
        slug: "currency-converter",
      },
      {
        name: "Unit Converter",
        description: "Convert between various units of measurement",
        icon: "📏",
        slug: "unit-converter",
      },
      {
        name: "Decimal to Octal",
        description: "Convert decimal numbers to octal format",
        icon: "🔢",
        slug: "decimal-to-octal",
      },
      {
        name: "Octal to Decimal",
        description: "Convert octal numbers to decimal format",
        icon: "🔢",
        slug: "octal-to-decimal",
      },
    ],
  },
  generators: {
    name: "Generators",
    description: "Generate various types of content and data for your projects",
    color: "from-indigo-500 to-purple-500",
    tools: [
      {
        name: "QR Code Generator",
        description: "Generate QR codes for text, URLs, and more",
        icon: "📱",
        slug: "qr-code-generator",
      },
      {
        name: "Random Address Generator",
        description: "Generate random addresses for testing",
        icon: "🏠",
        slug: "random-address-generator",
      },
      {
        name: "Email Template Generator",
        description: "Create professional email templates",
        icon: "📧",
        slug: "email-template-generator",
      },
      {
        name: "Favicon Generator",
        description: "Generate favicons for your website",
        icon: "🎯",
        slug: "favicon-generator",
      },
    ],
  },
  "seo-tools": {
    name: "SEO Tools",
    description: "Search engine optimization tools to improve your website's ranking",
    color: "from-yellow-500 to-orange-500",
    tools: [
      {
        name: "Website SEO Score",
        description: "Analyze your website's SEO performance",
        icon: "📊",
        slug: "website-seo-score",
      },
      {
        name: "Google Index Checker",
        description: "Check if your pages are indexed by Google",
        icon: "🔍",
        slug: "google-index-tool",
      },
      {
        name: "CMS Detector",
        description: "Detect what CMS a website is using",
        icon: "🔍",
        slug: "detect-cms",
      },
      {
        name: "DNS Report",
        description: "Generate comprehensive DNS reports",
        icon: "📋",
        slug: "dns-report",
      },
    ],
  },
  "productivity-tools": {
    name: "Productivity Tools",
    description: "Tools to boost your productivity and streamline your workflow",
    color: "from-cyan-500 to-blue-500",
    tools: [
      {
        name: "Timer",
        description: "Set timers for various tasks and activities",
        icon: "⏰",
        slug: "timer",
      },
      {
        name: "Calendar",
        description: "View and manage calendar dates",
        icon: "📅",
        slug: "calendar",
      },
      {
        name: "Dictionary",
        description: "Look up word definitions and meanings",
        icon: "📚",
        slug: "dictionary",
      },
      {
        name: "Basic Calculator",
        description: "Perform basic mathematical calculations",
        icon: "🧮",
        slug: "calculator",
      },
    ],
  },
}

type CategoryPageProps = {
  params: { slug: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    return {
      title: "Category Not Found | Toolinger",
    }
  }

  return {
    title: `${category.name} - Free Online Tools | Toolinger`,
    description: `${category.description}. Access ${category.tools.length}+ free ${category.name.toLowerCase()} for productivity and efficiency.`,
    keywords: `${category.name.toLowerCase()}, online tools, free tools, ${category.tools.map((tool) => tool.name.toLowerCase()).join(", ")}`,
    openGraph: {
      title: `${category.name} - Free Online Tools | Toolinger`,
      description: category.description,
      type: "website",
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Header */}
      <section className={`bg-gradient-to-r ${category.color} text-white py-12`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">{category.description}</p>
          <div className="mt-6">
            <SearchBar placeholder={`Search ${category.name.toLowerCase()}...`} />
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
              <CategoryToolsGrid tools={category.tools} categorySlug={params.slug} categoryName={category.name} />
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

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}
