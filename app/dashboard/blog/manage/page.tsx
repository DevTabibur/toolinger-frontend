import type { Metadata } from "next"
import BlogManageClient from "./BlogManageClient"

export const metadata: Metadata = {
  title: "Manage Blogs - Toolinger Dashboard",
  description: "Manage and edit existing blog posts",
}

export default function BlogManagePage() {
  return <BlogManageClient />
}
