"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Edit, Trash2, Eye, Calendar, Tag, User } from "lucide-react"
import { getAllCategories } from "@/app/api/BlogCategory.api"
import { deleteBlog, getAllBlogs } from "@/app/api/Blog.Api"
import toast from "react-hot-toast"

// Mock blog data
const mockBlogs = [
  {
    id: 1,
    title: "10 Essential SEO Tools Every Marketer Should Know",
    slug: "essential-seo-tools-marketers",
    excerpt:
      "Discover the most powerful SEO tools that can help boost your website's ranking and drive more organic traffic.",
    status: "published",
    category: "tutorials",
    tags: ["seo", "marketing", "tools"],
    author: "John Doe",
    publishDate: "2024-01-15",
    views: 1250,
    comments: 23,
    featuredImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Content Marketing in 2024",
    slug: "content-marketing-guide-2024",
    excerpt:
      "Learn the latest content marketing strategies and trends that will help you engage your audience effectively.",
    status: "draft",
    category: "tips",
    tags: ["content", "marketing", "strategy"],
    author: "Jane Smith",
    publishDate: "2024-01-20",
    views: 0,
    comments: 0,
    featuredImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "How to Build a Successful Email Marketing Campaign",
    slug: "email-marketing-campaign-guide",
    excerpt:
      "Step-by-step guide to creating email campaigns that convert and build lasting relationships with your audience.",
    status: "scheduled",
    category: "tutorials",
    tags: ["email", "marketing", "campaigns"],
    author: "Mike Johnson",
    publishDate: "2024-01-25",
    views: 0,
    comments: 0,
    featuredImage: "/placeholder.svg?height=200&width=300",
  },
]

export default function BlogManageClient() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Categories state
  const [categories, setCategories] = useState<
    { id: string; name: string }[]
  >([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)


  // Blogs state

  const [blogsLoading, setBlogsLoading] = useState(true)



  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    // Optimistically remove the blog from UI
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id && blog.id !== id));

    try {
      const res = await deleteBlog(id);
      if (res?.statusCode === 200) {
        toast.success("Blog Deleted successfully!");
      } else {
        toast.error("Failed to delete blog. Please try again.");
        // Optionally: refetch blogs from server here to ensure UI consistency
      }
    } catch (error) {
      toast.error("Error deleting blog. Please try again.");
      // Optionally: refetch blogs from server here to ensure UI consistency
    }
  }

  const handleEdit = (blog: any) => {
    console.log("=== BLOG EDIT ACTION ===")
    console.log("Editing blog:", blog)
    console.log("Blog ID:", blog.id)
    console.log("Blog Title:", blog.title)
    console.log("Blog Status:", blog.status)
    console.log("=== END EDIT ACTION ===")
  }

  const handleView = (blog: any) => {
    console.log("=== BLOG VIEW ACTION ===")
    console.log("Viewing blog:", blog)
    console.log("Blog URL:", `/blog/${blog.slug}`)
    console.log("=== END VIEW ACTION ===")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }


  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      setCategoriesLoading(true)
      setCategoriesError(null)
      try {
        const res = await getAllCategories()
        if (res?.statusCode == 200) {
          setCategories(res.data)
        }

      } catch (err: any) {
        setCategoriesError(err.message || "Error fetching categories")
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }
    async function fetchBlogs() {
      setBlogsLoading(true)
      try {
        const res = await getAllBlogs()
        if (res?.statusCode == 200) {
          setBlogs(res.data)
        }

      } catch (err: any) {
        setBlogs([])
      } finally {
        setBlogsLoading(false)
      }
    }

    fetchCategories()
    fetchBlogs()
  }, [])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Blog Posts</h1>
        <p className="text-gray-600 dark:text-gray-400">View, edit, and manage all your blog content</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
              {/* <option value="scheduled">Scheduled</option> */}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Blog List */}
      <div className="space-y-6">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Featured Image */}
                <div className="lg:w-48 flex-shrink-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${blog.blogFeaturedImage}` || "/placeholder.svg"}
                    alt={blog?.title}
                    className="w-full h-32 lg:h-24 object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleView(blog)}
                        className="p-2 text-gray-400 hover:text-[#005c82] transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-gray-400 hover:text-[#005c82] transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
                      {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                    </span>

                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {blog.author}
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {blog.category}
                    </div>

                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {blog.views} views
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {blog.tags.map((tag: any) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No blog posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or create a new blog post.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
