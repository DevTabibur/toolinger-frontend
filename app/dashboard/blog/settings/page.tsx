import type { Metadata } from "next"
import BlogSettingsClient from "./BlogSettingsClient"

export const metadata: Metadata = {
    title: "Blog Settings - Toolinger Dashboard",
    description: "Configure blog settings and preferences",
}

export default function BlogSettingsPage() {
    return <BlogSettingsClient />
}
