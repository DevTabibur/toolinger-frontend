"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Home,
  Info,
  Mail,
  Shield,
  FileText,
  Type,
  ImageIcon,
  Code,
  BarChart3,
  Calculator,
  Shuffle,
  Palette,
  FileText as ProductivityIcon,
  Globe,
  Settings,
  Plus,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: any = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function SitemapClient({ page }: any) {
  const mainPages = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Privacy Policy", href: "/privacy", icon: Shield },
    { name: "Terms of Service", href: "/terms", icon: FileText },
    { name: "Sitemap", href: "/sitemap", icon: FileText },
  ]

  const toolCategories = [
    {
      name: "Text Tools",
      href: "/category/text-tools",
      icon: Type,
      count: 25,
      tools: [
        "Word Counter",
        "Text Case Converter",
        "Lorem Ipsum Generator",
        "Text Reverser",
        "Character Counter",
        "Line Counter",
        "Duplicate Line Remover",
        "Text Sorter",
        "Find and Replace",
        "Text Encoder/Decoder",
        "Markdown to HTML",
        "HTML to Text",
        "Text Difference Checker",
        "Random Text Generator",
        "Text Statistics",
      ],
    },
    {
      name: "Image Tools",
      href: "/category/image-tools",
      icon: ImageIcon,
      count: 18,
      tools: [
        "Image Compressor",
        "Image Resizer",
        "Background Remover",
        "Image Converter",
        "Image Cropper",
        "Image Rotator",
        "Image Filter",
        "Favicon Generator",
        "ICO Converter",
        "Image to Base64",
        "Base64 to Image",
        "Image Optimizer",
      ],
    },
    {
      name: "Developer Tools",
      href: "/category/developer-tools",
      icon: Code,
      count: 32,
      tools: [
        "JSON Formatter",
        "Base64 Encoder",
        "Hash Generator",
        "URL Encoder/Decoder",
        "HTML Encoder/Decoder",
        "CSS Minifier",
        "JS Minifier",
        "HTML Minifier",
        "CSS Beautifier",
        "JS Beautifier",
        "HTML Beautifier",
        "XML Beautifier",
        "JSON Minifier",
        "JSON Beautifier",
        "Code Validator",
        "Regex Tester",
      ],
    },
    {
      name: "SEO Tools",
      href: "/category/seo-tools",
      icon: BarChart3,
      count: 15,
      tools: [
        "Meta Tag Generator",
        "Keyword Density Checker",
        "Robots.txt Generator",
        "Sitemap Generator",
        "Open Graph Generator",
        "Twitter Card Generator",
        "Schema Markup Generator",
        "Website SEO Score",
        "Google Index Checker",
      ],
    },
    {
      name: "Calculators",
      href: "/category/calculators",
      icon: Calculator,
      count: 28,
      tools: [
        "Percentage Calculator",
        "BMI Calculator",
        "Loan Calculator",
        "Age Calculator",
        "Discount Calculator",
        "Sales Tax Calculator",
        "Average Calculator",
        "GST Calculator",
        "Margin Calculator",
        "Interest Calculator",
        "Probability Calculator",
        "EPS Calculator",
        "LTV Calculator",
        "CPM Calculator",
        "Adsense Calculator",
        "PayPal Fee Calculator",
      ],
    },
    {
      name: "Converters",
      href: "/category/converters",
      icon: Shuffle,
      count: 22,
      tools: [
        "Unit Converter",
        "Currency Converter",
        "Color Converter",
        "RGB to Hex",
        "Binary Translator",
        "Roman Numeral Converter",
        "Temperature Converter",
        "Length Converter",
        "Weight Converter",
        "Time Zone Converter",
      ],
    },
    {
      name: "Generators",
      href: "/category/generators",
      icon: Palette,
      count: 20,
      tools: [
        "Password Generator",
        "QR Code Generator",
        "UUID Generator",
        "Random Name Generator",
        "Random Address Generator",
        "Random Word Generator",
        "Lorem Ipsum Generator",
        "Color Palette Generator",
        "Gradient Generator",
        "Barcode Generator",
      ],
    },
    {
      name: "Productivity",
      href: "/category/productivity-tools",
      icon: ProductivityIcon,
      count: 16,
      tools: [
        "PDF Tools",
        "Pomodoro Timer",
        "Note Taking",
        "To-Do List",
        "Calendar",
        "Dictionary",
        "Grammar Checker",
        "Text to Speech",
      ],
    },
    {
      name: "Domain Tools",
      href: "/category/domain-tools",
      icon: Globe,
      count: 15,
      tools: [
        "Domain Authority Checker",
        "Domain Age Checker",
        "Whois Lookup",
        "DNS Records",
        "Domain IP History",
        "Reverse IP Domains",
        "Google Malware Checker",
        "Backlink Maker",
        "Broken Links Checker",
        "Google Indexer",
        "Reverse Whois Checker",
        "Alexa Rank Checker",
      ],
    },
    {
      name: "Website Management",
      href: "/category/website-management",
      icon: Settings,
      count: 24,
      tools: [
        "Server Status Checker",
        "Website Speed Test",
        "SSL Checker",
        "DNS Propagation",
        "IP Location Finder",
        "Server Port Scanner",
        "Website Page Snooper",
        "Traceroute",
        "Ping Test",
        "Website Backup",
        "Website Migrator",
        "CMS Detector",
      ],
    },
    {
      name: "More Tools",
      href: "/category/more-tools",
      icon: Plus,
      count: 35,
      tools: [
        "QR Code Scanner",
        "Binary Calculator",
        "Hex Calculator",
        "Octal Calculator",
        "Decimal Converter",
        "ASCII Converter",
        "Text to Hex",
        "Hex to Text",
        "Upside Down Text",
        "Reverse Text",
        "Fake Name Generator",
        "Email Template Generator",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="gradient-bg text-white py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sitemap
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Navigate through all our pages and discover our complete collection of 200+ free online tools
          </motion.p>
        </div>
      </motion.section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner size="leaderboard" />
      </div>

      {/* Main Pages */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Main Pages</h2>
            <p className="text-lg text-muted-foreground">Essential pages and information</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {mainPages.map((page) => {
              const IconComponent = page.icon
              return (
                <motion.div key={page.name} variants={itemVariants}>
                  <Link
                    href={page.href}
                    className="flex items-center space-x-3 p-4 bg-card border rounded-lg hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="gradient-bg w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium group-hover:text-primary transition-colors">{page.name}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Tool Categories */}
      <motion.section
        className="py-16 bg-muted/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tool Categories</h2>
            <p className="text-lg text-muted-foreground">Explore all our tool categories and individual tools</p>
          </motion.div>

          <div className="space-y-8">
            {toolCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.name}
                  className="bg-card border rounded-xl p-6"
                  variants={itemVariants}
                  whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <Link href={category.href} className="text-2xl font-bold hover:text-primary transition-colors">
                        {category.name}
                      </Link>
                      <p className="text-muted-foreground">{category.count} tools available</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool}
                        href={`/${category.name.toLowerCase().replace(" ", "-")}/${tool.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded hover:bg-muted/50"
                      >
                        {tool}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center" variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-8">Complete Site Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">200+</div>
                <div className="text-muted-foreground">Total Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">11</div>
                <div className="text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">6</div>
                <div className="text-muted-foreground">Main Pages</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-muted-foreground">Free Tools</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner size="banner" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div dangerouslySetInnerHTML={{ __html: page?.data?.pageContent }}></div>
      </div>

      <Footer />
    </div>
  )
}
