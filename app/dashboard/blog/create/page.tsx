import type { Metadata } from "next"
import BlogCreateClient from "./BlogCreateClient"

export const metadata: Metadata = {
    title: "Create Blog - Toolinger Dashboard",
    description: "Create and publish new blog posts for Toolinger",
}

export default function BlogCreatePage() {
    return <BlogCreateClient />
}
