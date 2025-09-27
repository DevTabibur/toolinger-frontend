import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Generators Tools Page Management - Toolinger",
  description: "Manage and edit generators tools pages and their SEO settings",
}

interface StaticPageProps {
  params: {
    page: string
  }
}


export default function StaticPageDetailPage({ params }: StaticPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage {params.page.charAt(0).toUpperCase() + params.page.slice(1)} Page
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Edit content and SEO for the {params.page} page
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <p>Page management for {params.page} will be implemented here.</p>
      </div>
    </div>
  )
}
