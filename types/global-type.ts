export interface IBlogFormValues {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  featuredImage: File | null
  metaTitle: string
  metaDescription: string
  status: "draft" | "published" | "archived"
  author: string
  allowComments: boolean
  isFeatured: boolean
}