"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Search, Save, Globe, BarChart3, Settings, Code, Link, FileText } from "lucide-react"
import { createDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api"
import toast from "react-hot-toast"

interface SEOData {
  page: string
  metaTitle: string
  metaDescription: string
  keywords: string
  canonicalUrl: string
  noindex: boolean
  ogTitle: string
  ogDescription: string
  ogImageUrl: string
  ogType: string
  ogSiteName: string
  ogLocale: string
  twitterCard: string
  twitterSite: string
  twitterCreator: string
  twitterImageUrl: string
  schemas: string // JSON string, will be parsed to array
  changefreq: string
  priority: number
  // Article fields
  articleContent: string
  articleImage: string
  articleImageAlt: string
}

const seoValidationSchema = Yup.object({
  page: Yup.string().required("Page selection is required"),
  metaTitle: Yup.string()
    .min(10, "Meta title must be at least 10 characters")
    .max(60, "Meta title should not exceed 60 characters")
    .required("Meta title is required"),
  metaDescription: Yup.string()
    .min(30, "Meta description should be at least 30 characters")
    .max(160, "Meta description should not exceed 160 characters")
    .required("Meta description is required"),
  keywords: Yup.string().required("Keywords are required"),
  canonicalUrl: Yup.string().url("Must be a valid URL"),
  ogTitle: Yup.string().max(60, "OG title should not exceed 60 characters"),
  ogDescription: Yup.string().max(160, "OG description should not exceed 160 characters"),
  ogImageUrl: Yup.string().url("Must be a valid URL"),
  ogSiteName: Yup.string().max(50, "Site name should not exceed 50 characters"),
  twitterTitle: Yup.string().max(60, "Twitter title should not exceed 60 characters"),
  twitterDescription: Yup.string().max(160, "Twitter description should not exceed 160 characters"),
  twitterImageUrl: Yup.string().url("Must be a valid URL"),
  schemas: Yup.string(),
  changefreq: Yup.string(),
  priority: Yup.number().min(0).max(1),
  articleContent: Yup.string(),
  articleImage: Yup.string().url("Must be a valid URL"),
  articleImageAlt: Yup.string(),
})

const pageOptions = [
  { value: "home", label: "Homepage" },
  { value: "about", label: "About Page" },
  { value: "contact", label: "Contact Page" },
  { value: "privacy", label: "Privacy Policy" },
  { value: "terms", label: "Terms of Service" },
  { value: "domain-tools", label: "Domain Tools Category" },
  { value: "text-tools", label: "Text Tools Category" },
  { value: "image-tools", label: "Image Tools Category" },
  { value: "seo-tools", label: "SEO Tools Category" },
  { value: "calculators", label: "Calculators Category" },
  { value: "converters", label: "Converters Category" },
  { value: "generators", label: "Generators Category" },
  { value: "productivity-tools", label: "Productivity Tools Category" },
]

const initialValues: SEOData = {
  page: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  canonicalUrl: "",
  noindex: false,
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
  ogType: "website",
  ogSiteName: "Toolinger",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterSite: "@toolinger",
  twitterCreator: "@toolinger",
  twitterImageUrl: "",
  schemas: "",
  changefreq: "daily",
  priority: 1.0,
  articleContent: "",
  articleImage: "",
  articleImageAlt: "",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function SEOManagementClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const tabs = [
    { id: "basic", label: "Basic SEO", icon: Search },
    { id: "social", label: "Social Media", icon: Globe },
    { id: "technical", label: "Technical", icon: Settings },
    { id: "schema", label: "Schema", icon: Link },
    { id: "sitemap", label: "Sitemap", icon: Code },
    { id: "article", label: "Article", icon: FileText },
  ]

  const handleSubmit = async (values: SEOData) => {
    setIsSubmitting(true)
    try {
      // Prepare keywords as array
      const keywordsArr = values.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)

      // Prepare schemas as array
      let schemasArr: any[] = []
      if (values.schemas) {
        try {
          const parsed = JSON.parse(values.schemas)
          schemasArr = Array.isArray(parsed) ? parsed : [parsed]
        } catch (e) {
          // fallback: try to wrap as array
          schemasArr = [values.schemas]
        }
      }

      // Compose payload
      const payload = {
        slug: values.page,
        PageSEO: {
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          keywords: keywordsArr,
          canonicalUrl: values.canonicalUrl,
          noindex: values.noindex,
          ogTitle: values.ogTitle,
          ogDescription: values.ogDescription,
          ogImageUrl: values.ogImageUrl,
          ogType: values.ogType,
          ogSiteName: values.ogSiteName,
          ogLocale: values.ogLocale,
          twitterCard: values.twitterCard,
          twitterSite: values.twitterSite,
          twitterCreator: values.twitterCreator,
          twitterImageUrl: values.twitterImageUrl,
          schemas: schemasArr,
          changefreq: values.changefreq,
          priority: values.priority,
        },
        PageArticle: {
          content: values.articleContent,
          image: values.articleImage,
          imageAlt: values.articleImageAlt,
        },
      }

      // Call API
      const result = await createDynamicPagesArticleAndSeo(payload)
      console.log("result", result)
      if (result.statusCode === 200) {
        toast.success("Page Data created Successfully")
      } else {
        toast.error("Something went wrong")
      }
    } catch (err) {
      toast.error("Something went wrong")
      console.log("cathc block err", err)
    }
    setIsSubmitting(false)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced SEO Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Comprehensive SEO optimization for all pages with advanced features and analytics
        </p>
      </motion.div>

      {/* SEO Form */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Search className="w-5 h-5 mr-2 text-[#005c82] dark:text-[#00dbed]" />
            Advanced SEO Configuration
          </h2>
        </div>

        <div className="p-6">
          <Formik initialValues={initialValues} validationSchema={seoValidationSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Page Selection */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Page/Category *
                  </label>
                  <Field
                    as="select"
                    name="page"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Choose a page or category</option>
                    {pageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="page" component="div" className="text-red-500 text-sm mt-1" />
                </motion.div>

                {/* Tabs */}
                <motion.div variants={itemVariants}>
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                      {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${activeTab === tab.id
                              ? "border-[#005c82] text-[#005c82] dark:border-[#00dbed] dark:text-[#00dbed]"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                              }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                          </button>
                        )
                      })}
                    </nav>
                  </div>
                </motion.div>

                {/* Basic SEO Tab */}
                {activeTab === "basic" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Meta Title * (10-60 characters)
                        </label>
                        <Field
                          name="metaTitle"
                          type="text"
                          placeholder="Enter meta title"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <ErrorMessage name="metaTitle" component="span" className="text-red-500" />
                          <span className={`${values.metaTitle.length > 60 ? "text-red-500" : "text-gray-500"}`}>
                            {values.metaTitle.length}/60
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Noindex
                        </label>
                        <Field
                          as="select"
                          name="noindex"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="false">Index (default)</option>
                          <option value="true">Noindex</option>
                        </Field>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Keywords * (Comma separated)
                      </label>
                      <Field
                        name="keywords"
                        type="text"
                        placeholder="keyword1, keyword2, keyword3, long-tail keyword"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <ErrorMessage name="keywords" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Meta Description * (30-160 characters)
                      </label>
                      <Field
                        as="textarea"
                        name="metaDescription"
                        rows={3}
                        placeholder="Compelling description that includes your focus keyword and encourages clicks"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <ErrorMessage name="metaDescription" component="span" className="text-red-500" />
                        <span className={`${values.metaDescription.length > 160 ? "text-red-500" : "text-gray-500"}`}>
                          {values.metaDescription.length}/160
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Social Media Tab */}
                {activeTab === "social" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    {/* Open Graph */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-[#005c82] dark:text-[#00dbed]" />
                        Open Graph (Facebook, LinkedIn)
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Title
                          </label>
                          <Field
                            name="ogTitle"
                            type="text"
                            placeholder="Facebook/LinkedIn share title"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <ErrorMessage name="ogTitle" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Type
                          </label>
                          <Field
                            as="select"
                            name="ogType"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="website">Website</option>
                            <option value="article">Article</option>
                            <option value="product">Product</option>
                            <option value="profile">Profile</option>
                          </Field>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Site Name
                          </label>
                          <Field
                            name="ogSiteName"
                            type="text"
                            placeholder="Toolinger"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Locale
                          </label>
                          <Field
                            as="select"
                            name="ogLocale"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="en_US">English (US)</option>
                            <option value="en_GB">English (UK)</option>
                            <option value="es_ES">Spanish</option>
                            <option value="fr_FR">French</option>
                            <option value="de_DE">German</option>
                          </Field>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          OG Image URL (1200x630px recommended)
                        </label>
                        <Field
                          name="ogImageUrl"
                          type="url"
                          placeholder="https://toolinger.com/images/og-image.jpg"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="ogImageUrl" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          OG Description
                        </label>
                        <Field
                          as="textarea"
                          name="ogDescription"
                          rows={2}
                          placeholder="Description for social media shares"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="ogDescription" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    {/* Twitter Cards */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Twitter Cards</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Card Type
                          </label>
                          <Field
                            as="select"
                            name="twitterCard"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="summary">Summary</option>
                            <option value="summary_large_image">Summary Large Image</option>
                            <option value="app">App</option>
                            <option value="player">Player</option>
                          </Field>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Site Handle
                          </label>
                          <Field
                            name="twitterSite"
                            type="text"
                            placeholder="@toolinger"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Creator Handle
                          </label>
                          <Field
                            name="twitterCreator"
                            type="text"
                            placeholder="@creator_handle"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Image URL
                          </label>
                          <Field
                            name="twitterImageUrl"
                            type="url"
                            placeholder="https://toolinger.com/images/twitter-card.jpg"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <ErrorMessage name="twitterImageUrl" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Technical SEO Tab */}
                {activeTab === "technical" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Canonical URL
                        </label>
                        <Field
                          name="canonicalUrl"
                          type="url"
                          placeholder="https://toolinger.com/page"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="canonicalUrl" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Changefreq
                        </label>
                        <Field
                          as="select"
                          name="changefreq"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </Field>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Priority (0.0 - 1.0)
                        </label>
                        <Field
                          name="priority"
                          type="number"
                          min={0}
                          max={1}
                          step={0.1}
                          placeholder="1.0"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Schema Tab */}
                {activeTab === "schema" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Schema Markup (JSON-LD, array or object)
                      </label>
                      <Field
                        as="textarea"
                        name="schemas"
                        rows={12}
                        placeholder={`[
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolinger",
    "url": "https://toolinger.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolinger.com/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
]`}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                      <ErrorMessage name="schemas" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </motion.div>
                )}

                {/* Article Tab */}
                {activeTab === "article" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Article Content (HTML allowed)
                      </label>
                      <Field
                        as="textarea"
                        name="articleContent"
                        rows={6}
                        placeholder={`<h1>200+ Free Online Tools</h1><p>Browse categories and find the tools you need.</p>`}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Article Image URL
                      </label>
                      <Field
                        name="articleImage"
                        type="url"
                        placeholder="https://toolinger.com/static/hero.png"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Article Image Alt
                      </label>
                      <Field
                        name="articleImageAlt"
                        type="text"
                        placeholder="Toolinger hero"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving Advanced SEO...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Advanced SEO Settings</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </motion.div>
  )
}
