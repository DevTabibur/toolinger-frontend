
// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";

import type { Metadata } from "next"
import EditPageClient from "./EditPageClient"

export const metadata: Metadata = {
  title: "Edit Page - Toolinger",
  description: "Edit page content and SEO",
}

interface EditPageProps {
  params: {
    slug: string
  }
}

export default function EditPagePage({ params }: EditPageProps) {
  return <EditPageClient slug={params.slug} />
}
