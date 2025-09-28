
// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";
import type { Metadata } from "next"
import StaticPagesClient from "./StaticPagesClient"

export const metadata: Metadata = {
  title: "Generators Tools Management - Toolinger",
  description: "Access and manage your generators tools pages",
}

export default function StaticPagesPage() {
  return <StaticPagesClient />
}
