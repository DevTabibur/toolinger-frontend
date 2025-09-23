import type { Metadata } from "next"
import QADashboard from "./QADashboard"

export const metadata: Metadata = {
  title: "QA Dashboard - Toolinger",
  description: "Quality assurance testing dashboard",
}

export default function QAPage() {
  return <QADashboard />
}
