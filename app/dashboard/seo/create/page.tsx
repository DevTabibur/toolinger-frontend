import type { Metadata } from "next"
import SEOManagementClient from "./SEOManagementClient"


export const metadata: Metadata = {
  title: "SEO Management - Toolinger Dashboard",
  description: "Manage SEO settings for all pages and tools on Toolinger",
}

export default function SEOManagementPage() {
  return <SEOManagementClient />
}
