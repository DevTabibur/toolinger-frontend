
// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";

import type { Metadata } from "next"
import CategoryPagesClient from "./CategoryPagesClient"

export const metadata: Metadata = {
  title: "Category Pages Management - Toolinger",
  description: "Manage pages by category",
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPagePage({ params }: CategoryPageProps) {
  return <CategoryPagesClient category={params.category} />
}
