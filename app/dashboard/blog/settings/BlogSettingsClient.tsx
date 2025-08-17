"use client"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Settings, Globe, Mail, Palette } from "lucide-react"

const validationSchema = Yup.object({
  blogTitle: Yup.string().required("Blog title is required"),
  blogDescription: Yup.string().required("Blog description is required"),
  blogUrl: Yup.string().url("Must be a valid URL").required("Blog URL is required"),
  postsPerPage: Yup.number()
    .min(1, "Must be at least 1")
    .max(50, "Cannot exceed 50")
    .required("Posts per page is required"),
  allowComments: Yup.boolean(),
  moderateComments: Yup.boolean(),
  emailNotifications: Yup.boolean(),
  seoTitle: Yup.string().max(60, "SEO title should be under 60 characters"),
  seoDescription: Yup.string().max(160, "SEO description should be under 160 characters"),
})

export default function BlogSettingsClient() {
  const formik = useFormik({
    initialValues: {
      blogTitle: "Toolinger Blog",
      blogDescription: "Latest tools, tips, and tutorials for digital professionals",
      blogUrl: "https://toolinger.com/blog",
      postsPerPage: 10,
      allowComments: true,
      moderateComments: true,
      emailNotifications: true,
      seoTitle: "Toolinger Blog - Tools & Tutorials",
      seoDescription:
        "Discover the latest tools, tips, and tutorials for digital professionals. Stay updated with industry trends and best practices.",
      defaultCategory: "tutorials",
      defaultAuthor: "Toolinger Team",
      socialSharing: true,
      relatedPosts: true,
      readingTime: true,
      breadcrumbs: true,
      rssEnabled: true,
      sitemapEnabled: true,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("=== BLOG SETTINGS FORM SUBMISSION ===")
      console.log("All Settings:", values)
      console.log("Blog Title:", values.blogTitle)
      console.log("Blog Description:", values.blogDescription)
      console.log("Blog URL:", values.blogUrl)
      console.log("Posts Per Page:", values.postsPerPage)
      console.log("Allow Comments:", values.allowComments)
      console.log("Moderate Comments:", values.moderateComments)
      console.log("Email Notifications:", values.emailNotifications)
      console.log("SEO Title:", values.seoTitle)
      console.log("SEO Description:", values.seoDescription)
      console.log("Default Category:", values.defaultCategory)
      console.log("Default Author:", values.defaultAuthor)
      console.log("Social Sharing:", values.socialSharing)
      console.log("Related Posts:", values.relatedPosts)
      console.log("Reading Time:", values.readingTime)
      console.log("Breadcrumbs:", values.breadcrumbs)
      console.log("RSS Enabled:", values.rssEnabled)
      console.log("Sitemap Enabled:", values.sitemapEnabled)
      console.log("=== END SETTINGS SUBMISSION ===")
    },
  })

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your blog preferences and settings</p>
      </motion.div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* General Settings */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-[#005c82]" />
            General Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blog Title *</label>
              <input
                type="text"
                {...formik.getFieldProps("blogTitle")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formik.touched.blogTitle && formik.errors.blogTitle && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.blogTitle}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blog URL *</label>
              <input
                type="url"
                {...formik.getFieldProps("blogUrl")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formik.touched.blogUrl && formik.errors.blogUrl && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.blogUrl}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog Description *
              </label>
              <textarea
                {...formik.getFieldProps("blogDescription")}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formik.touched.blogDescription && formik.errors.blogDescription && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.blogDescription}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Posts Per Page *
              </label>
              <input
                type="number"
                {...formik.getFieldProps("postsPerPage")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formik.touched.postsPerPage && formik.errors.postsPerPage && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.postsPerPage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Category
              </label>
              <select
                {...formik.getFieldProps("defaultCategory")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="tutorials">Tutorials</option>
                <option value="news">News</option>
                <option value="reviews">Reviews</option>
                <option value="tips">Tips & Tricks</option>
                <option value="tools">Tools</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Author</label>
              <input
                type="text"
                {...formik.getFieldProps("defaultAuthor")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* SEO Settings */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-[#005c82]" />
            SEO Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
              <input
                type="text"
                {...formik.getFieldProps("seoTitle")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formik.touched.seoTitle && formik.errors.seoTitle && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.seoTitle}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
              <textarea
                {...formik.getFieldProps("seoDescription")}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formik.touched.seoDescription && formik.errors.seoDescription && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.seoDescription}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Comment Settings */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-[#005c82]" />
            Comment & Notification Settings
          </h2>

          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("allowComments")}
                checked={formik.values.allowComments}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Allow Comments on Blog Posts</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("moderateComments")}
                checked={formik.values.moderateComments}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Moderate Comments Before Publishing</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("emailNotifications")}
                checked={formik.values.emailNotifications}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Send Email Notifications for New Comments
              </span>
            </label>
          </div>
        </motion.div>

        {/* Display Settings */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-[#005c82]" />
            Display Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("socialSharing")}
                checked={formik.values.socialSharing}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Enable Social Sharing Buttons</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("relatedPosts")}
                checked={formik.values.relatedPosts}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Show Related Posts</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("readingTime")}
                checked={formik.values.readingTime}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Display Reading Time</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("breadcrumbs")}
                checked={formik.values.breadcrumbs}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Show Breadcrumbs</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("rssEnabled")}
                checked={formik.values.rssEnabled}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Enable RSS Feed</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...formik.getFieldProps("sitemapEnabled")}
                checked={formik.values.sitemapEnabled}
                className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Generate XML Sitemap</span>
            </label>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white py-3 px-8 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 mr-2" />
            {formik.isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}
