import Link from "next/link"
import { Wrench, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const toolCategories = ["Text Tools", "Image Tools", "SEO Tools", "Developer Tools", "Productivity", "Converters"]

  const popularTools = [
    "Password Generator",
    "QR Code Generator",
    "Image Compressor",
    "Text Counter",
    "Color Picker",
    "Base64 Encoder",
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="gradient-bg p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Toolinger</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for 200+ free online tools. Boost your productivity with our collection of
              web-based utilities.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2">
              {toolCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Popular Tools</h3>
            <ul className="space-y-2">
              {popularTools.map((tool) => (
                <li key={tool}>
                  <Link
                    href={`/tool/${tool.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Toolinger. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Made with ❤️ <Link href="https://woptio.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Woptio.com</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
