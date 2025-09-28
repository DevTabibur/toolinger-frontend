

// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";
import type { Metadata } from "next"
import StaticPagesClient from "./StaticPagesClient"

export const metadata: Metadata = {
  title: "Text Tools Pages Management - Toolinger",
  description: "Manage your text tools pages content and SEO",
}

export default function StaticPagesPage() {
  return <StaticPagesClient />
}
