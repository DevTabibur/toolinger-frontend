import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdBanner } from "@/components/ad-banner";
import Link from "next/link";
import {
  Search,
  Zap,
  Shield,
  Smartphone,
  Type,
  ImageIcon,
  Code,
  BarChart3,
  Calculator,
  Shuffle,
  Palette,
  FileText,
  Star,
  TrendingUp,
  Globe,
  Settings,
  Plus,
} from "lucide-react";
import { GlobalSearch } from "@/components/global-search";

export default function HomePage() {
  const categories = [
    {
      name: "Text Tools",
      icon: Type,
      count: 25,
      description: "Text manipulation, formatting, and analysis tools",
      tools: ["Word Counter", "Text Case Converter", "Lorem Ipsum Generator"],
    },
    {
      name: "Image Tools",
      icon: ImageIcon,
      count: 18,
      description: "Image editing, compression, and conversion tools",
      tools: ["Image Compressor", "Image Resizer", "Background Remover"],
    },
    {
      name: "Developer Tools",
      icon: Code,
      count: 32,
      description: "Development utilities and code generators",
      tools: ["JSON Formatter", "Base64 Encoder", "Hash Generator"],
    },
    {
      name: "SEO Tools",
      icon: BarChart3,
      count: 15,
      description: "Search engine optimization and analysis tools",
      tools: [
        "Meta Tag Generator",
        "Keyword Density Checker",
        "Robots.txt Generator",
      ],
    },
    {
      name: "Calculators",
      icon: Calculator,
      count: 28,
      description: "Mathematical and financial calculators",
      tools: ["Percentage Calculator", "BMI Calculator", "Loan Calculator"],
    },
    {
      name: "Converters",
      icon: Shuffle,
      count: 22,
      description: "Unit and format conversion tools",
      tools: ["Unit Converter", "Currency Converter", "Color Converter"],
    },
    {
      name: "Generators",
      icon: Palette,
      count: 20,
      description: "Content and data generation tools",
      tools: ["Password Generator", "QR Code Generator", "UUID Generator"],
    },
    {
      name: "Productivity",
      icon: FileText,
      count: 16,
      description: "Tools to boost your daily productivity",
      tools: ["PDF Tools", "Time Zone Converter", "Pomodoro Timer"],
    },
    {
      name: "Domain Tools",
      icon: Globe,
      count: 15,
      description: "Domain analysis and management tools",
      tools: ["Domain Authority Checker", "Whois Lookup", "DNS Records"],
    },
    {
      name: "Website Management",
      icon: Settings,
      count: 24,
      description: "Website analysis and management utilities",
      tools: ["Server Status Checker", "Website Speed Test", "SSL Checker"],
    },
    {
      name: "More Tools",
      icon: Plus,
      count: 35,
      description: "Additional specialized tools and utilities",
      tools: ["QR Code Scanner", "Random Name Generator", "Color Palette"],
    },
  ];

  const featuredTools = [
    {
      name: "Password Generator",
      description: "Generate secure passwords with custom options",
      category: "Security",
      popular: true,
    },
    {
      name: "QR Code Generator",
      description: "Create QR codes for text, URLs, and more",
      category: "Generators",
      popular: true,
    },
    {
      name: "Image Compressor",
      description: "Reduce image file size without quality loss",
      category: "Image Tools",
      popular: true,
    },
    {
      name: "JSON Formatter",
      description: "Format and validate JSON data",
      category: "Developer Tools",
      popular: false,
    },
    {
      name: "Word Counter",
      description: "Count words, characters, and paragraphs",
      category: "Text Tools",
      popular: true,
    },
    {
      name: "Color Picker",
      description: "Pick colors and get hex, RGB, HSL values",
      category: "Design Tools",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            200+ Free Online Tools
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Boost your productivity with our comprehensive collection of
            web-based tools. No downloads, no registration required.
          </p>

          {/* Search Bar */}
          {/* <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search from 200+ tools..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
              />
            </div>
          </div> */}

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <GlobalSearch
              placeholder="Search from 200+ tools..."
              variant="hero"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur rounded-lg p-4">
              <Zap className="h-6 w-6" />
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur rounded-lg p-4">
              <Shield className="h-6 w-6" />
              <span className="font-medium">100% Secure</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur rounded-lg p-4">
              <Smartphone className="h-6 w-6" />
              <span className="font-medium">Mobile Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner size="leaderboard" />
      </div>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tool Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our organized collection of tools designed to solve your
              everyday problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/category/${category.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {category.count} tools
                    </span>
                    <div className="text-xs text-muted-foreground">
                      Popular: {category.tools[0]}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
                  <p className="text-muted-foreground">
                    Most popular and frequently used tools
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="text-primary hover:underline font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <TrendingUp className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={`/tool/${tool.name.toLowerCase().replace(" ", "-")}`}
                    className="group bg-background border rounded-lg p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      {tool.popular && (
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs">Popular</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {tool.description}
                    </p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="lg:w-1/4">
              <AdBanner size="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                200+
              </div>
              <div className="text-muted-foreground">Free Tools</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                1M+
              </div>
              <div className="text-muted-foreground">Monthly Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                50M+
              </div>
              <div className="text-muted-foreground">Tools Used</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner size="banner" />
      </div>

      <Footer />
    </div>
  );
}
