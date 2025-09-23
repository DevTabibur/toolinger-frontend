import type { Metadata } from "next"
import StaticPagesClient from "./StaticPagesClient"

export const metadata: Metadata = {
  title: "Static Pages Management - Toolinger",
  description: "Manage static pages content and SEO",
}

export default function StaticPagesPage() {
  return <StaticPagesClient />
}
