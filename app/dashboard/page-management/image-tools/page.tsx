import type { Metadata } from "next"
import StaticPagesClient from "./StaticPagesClient"

export const metadata: Metadata = {
  title: "Image Tools Pages Management - Toolinger",
  description: "Manage and optimize images for your image tools pages",
}

export default function StaticPagesPage() {
  return <StaticPagesClient />
}
