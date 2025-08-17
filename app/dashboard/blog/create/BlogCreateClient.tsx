"use client"

import React from "react"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Save, Eye, Upload, Tag, Calendar, Edit3 } from "lucide-react"

const validationSchema = Yup.object({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  slug: Yup.string()
    .matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .required("Slug is required"),
  excerpt: Yup.string()
    .min(50, "Excerpt must be at least 50 characters")
    .max(300, "Excerpt must be less than 300 characters")
    .required("Excerpt is required"),
  content: Yup.string().min(100, "Content must be at least 100 characters").required("Content is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("At least one tag is required"),
  featuredImage: Yup.string().url("Must be a valid URL"),
  metaTitle: Yup.string().max(60, "Meta title should be under 60 characters"),
  metaDescription: Yup.string().max(160, "Meta description should be under 160 characters"),
  status: Yup.string().oneOf(["draft", "published", "scheduled"]).required("Status is required"),
  publishDate: Yup.date().when("status", {
    is: "scheduled",
    then: (schema) => schema.required("Publish date is required for scheduled posts"),
    otherwise: (schema) => schema.nullable(),
  }),
})

export default function BlogCreateClient() {
  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
      status: "draft",
      publishDate: "",
      author: "",
      readingTime: "",
      allowComments: true,
      isFeatured: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("=== BLOG CREATE FORM SUBMISSION ===")
      console.log("Form Values:", values)
      console.log("Title:", values.title)
      console.log("Slug:", values.slug)
      console.log("Excerpt:", values.excerpt)
      console.log("Content Length:", values.content.length)
      console.log("Category:", values.category)
      console.log(
        "Tags:",
        values.tags.split(",").map((tag) => tag.trim()),
      )
      console.log("Featured Image:", values.featuredImage)
      console.log("Meta Title:", values.metaTitle)
      console.log("Meta Description:", values.metaDescription)
      console.log("Status:", values.status)
      console.log("Publish Date:", values.publishDate)
      console.log("Author:", values.author)
      console.log("Reading Time:", values.readingTime)
      console.log("Allow Comments:", values.allowComments)
      console.log("Is Featured:", values.isFeatured)
      console.log("=== END FORM SUBMISSION ===")
    },
  })

  // Auto-generate slug from title
  React.useEffect(() => {
    if (formik.values.title && !formik.touched.slug) {
      const slug = formik.values.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      formik.setFieldValue("slug", slug)
    }
  }, [formik.values.title])

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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Blog Post</h1>
        <p className="text-gray-600 dark:text-gray-400">Write and publish engaging content for your audience</p>
      </motion.div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Edit3 className="w-5 h-5 mr-2 text-[#005c82]" />
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    {...formik.getFieldProps("title")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter blog post title..."
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
                  <input
                    type="text"
                    {...formik.getFieldProps("slug")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="blog-post-url-slug"
                  />
                  {formik.touched.slug && formik.errors.slug && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.slug}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt *</label>
                  <textarea
                    {...formik.getFieldProps("excerpt")}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of the blog post..."
                  />
                  {formik.touched.excerpt && formik.errors.excerpt && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.excerpt}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Content *</h2>
              <textarea
                {...formik.getFieldProps("content")}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Write your blog content here..."
              />
              {formik.touched.content && formik.errors.content && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>
              )}
            </motion.div>

            {/* SEO Settings */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">SEO Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
                  <input
                    type="text"
                    {...formik.getFieldProps("metaTitle")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="SEO optimized title..."
                  />
                  {formik.touched.metaTitle && formik.errors.metaTitle && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.metaTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    {...formik.getFieldProps("metaDescription")}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="SEO meta description..."
                  />
                  {formik.touched.metaDescription && formik.errors.metaDescription && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.metaDescription}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#005c82]" />
                Publish Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                  <select
                    {...formik.getFieldProps("status")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                {formik.values.status === "scheduled" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Publish Date *
                    </label>
                    <input
                      type="datetime-local"
                      {...formik.getFieldProps("publishDate")}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {formik.touched.publishDate && formik.errors.publishDate && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.publishDate}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    {...formik.getFieldProps("author")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Author name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("readingTime")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="5"
                  />
                </div>
              </div>
            </motion.div>

            {/* Categories & Tags */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-[#005c82]" />
                Categories & Tags
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                  <select
                    {...formik.getFieldProps("category")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="news">News</option>
                    <option value="reviews">Reviews</option>
                    <option value="tips">Tips & Tricks</option>
                    <option value="tools">Tools</option>
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags * (comma separated)
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("tags")}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="tag1, tag2, tag3"
                  />
                  {formik.touched.tags && formik.errors.tags && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.tags}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-[#005c82]" />
                Featured Image
              </h3>

              <div>
                <input
                  type="url"
                  {...formik.getFieldProps("featuredImage")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
                {formik.touched.featuredImage && formik.errors.featuredImage && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.featuredImage}</p>
                )}
              </div>
            </motion.div>

            {/* Additional Options */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Options</h3>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("allowComments")}
                    checked={formik.values.allowComments}
                    className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow Comments</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("isFeatured")}
                    checked={formik.values.isFeatured}
                    className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured Post</span>
                </label>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                {formik.isSubmitting ? "Saving..." : "Save Blog Post"}
              </button>

              <button
                type="button"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </button>
            </motion.div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
