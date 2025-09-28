

// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";

import type { Metadata } from "next"
import BlogCreateClient from "./BlogCreateClient"

export const metadata: Metadata = {
    title: "Create Blog - Toolinger Dashboard",
    description: "Create and publish new blog posts for Toolinger",
}

export default function BlogCreatePage() {
    return <BlogCreateClient />
}
