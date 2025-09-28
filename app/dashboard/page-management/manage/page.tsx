
// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";
import type { Metadata } from "next"
import ManagePagesClient from "./ManagePagesClient"

export const metadata: Metadata = {
  title: "Manage All Pages - Toolinger",
  description: "Unified management for all pages (static + tools)",
}

export default function ManagePagesPage() {
  return <ManagePagesClient />
}
