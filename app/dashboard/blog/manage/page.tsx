
// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";

import type { Metadata } from "next"
import BlogManageClient from "./BlogManageClient"

export const metadata: Metadata = {
  title: "Manage Blogs - Toolinger Dashboard",
  description: "Manage and edit existing blog posts",
}
 
export default function BlogManagePage() {
  return <BlogManageClient />
}
