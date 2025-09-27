import type { Metadata } from "next"
import StaticPagesClient from "./StaticPagesClient"

export const metadata: Metadata = {
  title: "Calculators Management - Toolinger",
  description: "Access and manage your calculators pages",
}

export default function StaticPagesPage() {
  return <StaticPagesClient />
}
