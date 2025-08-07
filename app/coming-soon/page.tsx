import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coming Soon - Exciting New Tools | Toolinger",
  description: "Something amazing is coming to Toolinger. Be the first to know when we launch our newest productivity tools.",
  keywords: "coming soon, new tools, productivity, toolinger, launch",
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <ComingSoon
          title="Revolutionary AI Tools Coming Soon"
          description="We're building the next generation of AI-powered productivity tools that will transform how you work. Get ready for something extraordinary."
          launchDate={new Date("2024-12-31")}
          showNotifyForm={true}
        />
      </main>

      <Footer />
    </div>
  )
}
