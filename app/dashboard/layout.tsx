import type React from "react"
import type { Metadata } from "next"
import DashboardLayoutClient from "./DashboardLayoutContent"

export const metadata: Metadata = {
    title: "Dashboard - Toolinger",
    description: "Manage your Toolinger account and tools",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
 