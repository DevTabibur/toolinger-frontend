import type { Metadata } from "next"
import DashboardOverviewClient from "./DashboardOverviewClient"

export const metadata: Metadata = {
  title: "Dashboard Overview - Toolinger",
  description: "Overview of your Toolinger dashboard with key metrics and insights",
}

export default function DashboardPage() {
  return <DashboardOverviewClient />
}
