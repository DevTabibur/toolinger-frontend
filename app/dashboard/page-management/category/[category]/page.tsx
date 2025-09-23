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
