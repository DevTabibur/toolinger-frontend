import type { Metadata } from "next"
import SitemapClient from "./SitemapClient"

export const metadata: Metadata = {
    title: "Sitemap - Navigate All Toolinger Pages and Tools",
    description:
        "Complete sitemap of Toolinger showing all pages, tool categories, and individual tools. Find any tool or page quickly.",
    keywords: "sitemap, site navigation, toolinger pages, all tools, website structure",
    openGraph: {
        title: "Sitemap - Toolinger",
        description: "Complete navigation guide to all Toolinger pages and tools.",
        url: "https://toolinger.com/sitemap",
    },
}

export default function SitemapPage() {
    return <SitemapClient />
}
