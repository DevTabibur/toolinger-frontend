import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Toolinger - 200+ Free Online Tools for Everyone",
    template: "%s | Toolinger",
  },
  description:
    "Discover 200+ free online tools for productivity, design, development, SEO, and more. All tools are free to use and work directly in your browser.",
  keywords:
    "online tools, free tools, productivity tools, design tools, SEO tools, developer tools, text tools, image tools",
  authors: [{ name: "Toolinger Team" }],
  creator: "Toolinger",
  publisher: "Toolinger",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolinger.com",
    title: "Toolinger - 200+ Free Online Tools",
    description: "Discover 200+ free online tools for productivity, design, development, SEO, and more.",
    siteName: "Toolinger",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolinger - 200+ Free Online Tools",
    description: "Discover 200+ free online tools for productivity, design, development, SEO, and more.",
    creator: "@toolinger",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://toolinger.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
