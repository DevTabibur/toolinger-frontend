import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About Us - Learn More About Toolinger",
  description:
    "Discover the story behind Toolinger, our mission to provide 200+ free online tools, and meet our team dedicated to boosting your productivity.",
  keywords: "about toolinger, free online tools, productivity tools, web tools, our mission, team",
  openGraph: {
    title: "About Toolinger - Free Online Tools Platform",
    description: "Learn about our mission to provide 200+ free online tools for everyone.",
    url: "https://toolinger.com/about",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
