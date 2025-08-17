"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Search, Save, Globe, BarChart3, Settings, Code, Link } from "lucide-react"

interface SEOData {
  page: string
  title: string
  metaDescription: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
  ogSiteName: string
  ogLocale: string
  twitterCard: string
  twitterSite: string
  twitterCreator: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  canonicalUrl: string
  robotsMeta: string
  hreflang: string
  viewport: string
  schemaMarkup: string
  googleAnalytics: string
  googleSearchConsole: string
  facebookDomainVerification: string
  pinterestVerification: string
  preloadResources: string
  criticalCSS: string
  focusKeyword: string
  seoScore: number
  readabilityScore: number
}

const seoValidationSchema = Yup.object({
  page: Yup.string().required("Page selection is required"),
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(60, "Title should not exceed 60 characters")
    .required("Title is required"),
  metaDescription: Yup.string()
    .min(120, "Meta description should be at least 120 characters")
    .max(160, "Meta description should not exceed 160 characters")
    .required("Meta description is required"),
  keywords: Yup.string().required("Keywords are required"),
  focusKeyword: Yup.string().required("Focus keyword is required"),
  ogTitle: Yup.string().max(60, "OG title should not exceed 60 characters"),
  ogDescription: Yup.string().max(160, "OG description should not exceed 160 characters"),
  ogImage: Yup.string().url("Must be a valid URL"),
  ogSiteName: Yup.string().max(50, "Site name should not exceed 50 characters"),
  twitterTitle: Yup.string().max(60, "Twitter title should not exceed 60 characters"),
  twitterDescription: Yup.string().max(160, "Twitter description should not exceed 160 characters"),
  twitterImage: Yup.string().url("Must be a valid URL"),
  canonicalUrl: Yup.string().url("Must be a valid URL"),
  googleAnalytics: Yup.string().matches(/^G-[A-Z0-9]+$|^UA-[0-9]+-[0-9]+$/, "Invalid Google Analytics ID format"),
  googleSearchConsole: Yup.string(),
  facebookDomainVerification: Yup.string(),
  pinterestVerification: Yup.string(),
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
  title: "",
  metaDescription: "",
  keywords: "",
  focusKeyword: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "website",
  ogSiteName: "Toolinger",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterSite: "@toolinger",
  twitterCreator: "@toolinger",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  canonicalUrl: "",
  robotsMeta: "index, follow",
  hreflang: "en",
  viewport: "width=device-width, initial-scale=1",
  schemaMarkup: "",
  googleAnalytics: "",
  googleSearchConsole: "",
  facebookDomainVerification: "",
  pinterestVerification: "",
  preloadResources: "",
  criticalCSS: "",
  seoScore: 0,
  readabilityScore: 0,
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

  const handleSubmit = async (values: SEOData) => {
    setIsSubmitting(true)

    console.log("=== ADVANCED SEO FORM DATA ===")
    console.log("Basic SEO:", {
      page: values.page,
      title: values.title,
      metaDescription: values.metaDescription,
      keywords: values.keywords,
      focusKeyword: values.focusKeyword,
    })
    console.log("Open Graph:", {
      ogTitle: values.ogTitle,
      ogDescription: values.ogDescription,
      ogImage: values.ogImage,
      ogType: values.ogType,
      ogSiteName: values.ogSiteName,
      ogLocale: values.ogLocale,
    })
    console.log("Twitter Cards:", {
      twitterCard: values.twitterCard,
      twitterSite: values.twitterSite,
      twitterCreator: values.twitterCreator,
      twitterTitle: values.twitterTitle,
      twitterDescription: values.twitterDescription,
      twitterImage: values.twitterImage,
    })
    console.log("Technical SEO:", {
      canonicalUrl: values.canonicalUrl,
      robotsMeta: values.robotsMeta,
      hreflang: values.hreflang,
      viewport: values.viewport,
    })
    console.log("Analytics & Verification:", {
      googleAnalytics: values.googleAnalytics,
      googleSearchConsole: values.googleSearchConsole,
      facebookDomainVerification: values.facebookDomainVerification,
      pinterestVerification: values.pinterestVerification,
    })
    console.log("Performance:", {
      preloadResources: values.preloadResources,
      criticalCSS: values.criticalCSS,
    })
    console.log("Schema Markup:", values.schemaMarkup)
    console.log("SEO Scores:", {
      seoScore: values.seoScore,
      readabilityScore: values.readabilityScore,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    alert("Advanced SEO data saved successfully!")
  }

  const tabs = [
    { id: "basic", label: "Basic SEO", icon: Search },
    { id: "social", label: "Social Media", icon: Globe },
    { id: "technical", label: "Technical", icon: Settings },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "performance", label: "Performance", icon: Code },
    { id: "schema", label: "Schema", icon: Link },
  ]

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
            {({ values, touched, errors }) => (
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
                            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                              activeTab === tab.id
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
                          Page Title * (10-60 characters)
                        </label>
                        <Field
                          name="title"
                          type="text"
                          placeholder="Enter page title"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <ErrorMessage name="title" component="span" className="text-red-500" />
                          <span className={`${values.title.length > 60 ? "text-red-500" : "text-gray-500"}`}>
                            {values.title.length}/60
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Focus Keyword *
                        </label>
                        <Field
                          name="focusKeyword"
                          type="text"
                          placeholder="Primary keyword for this page"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="focusKeyword" component="div" className="text-red-500 text-sm mt-1" />
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
                        Meta Description * (120-160 characters)
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
                          name="ogImage"
                          type="url"
                          placeholder="https://toolinger.com/images/og-image.jpg"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="ogImage" component="div" className="text-red-500 text-sm mt-1" />
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
                            name="twitterImage"
                            type="url"
                            placeholder="https://toolinger.com/images/twitter-card.jpg"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <ErrorMessage name="twitterImage" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Title
                          </label>
                          <Field
                            name="twitterTitle"
                            type="text"
                            placeholder="Twitter share title"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <ErrorMessage name="twitterTitle" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Description
                          </label>
                          <Field
                            as="textarea"
                            name="twitterDescription"
                            rows={2}
                            placeholder="Twitter share description"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <ErrorMessage
                            name="twitterDescription"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
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
                          Robots Meta
                        </label>
                        <Field
                          as="select"
                          name="robotsMeta"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="index, follow">Index, Follow</option>
                          <option value="noindex, follow">No Index, Follow</option>
                          <option value="index, nofollow">Index, No Follow</option>
                          <option value="noindex, nofollow">No Index, No Follow</option>
                        </Field>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Hreflang
                        </label>
                        <Field
                          name="hreflang"
                          type="text"
                          placeholder="en, es, fr, de"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Viewport
                        </label>
                        <Field
                          name="viewport"
                          type="text"
                          placeholder="width=device-width, initial-scale=1"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Analytics Tab */}
                {activeTab === "analytics" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Google Analytics ID
                        </label>
                        <Field
                          name="googleAnalytics"
                          type="text"
                          placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="googleAnalytics" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Google Search Console Verification
                        </label>
                        <Field
                          name="googleSearchConsole"
                          type="text"
                          placeholder="google-site-verification=..."
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Facebook Domain Verification
                        </label>
                        <Field
                          name="facebookDomainVerification"
                          type="text"
                          placeholder="Facebook domain verification code"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pinterest Verification
                        </label>
                        <Field
                          name="pinterestVerification"
                          type="text"
                          placeholder="Pinterest site verification"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Performance Tab */}
                {activeTab === "performance" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preload Resources (One per line)
                      </label>
                      <Field
                        as="textarea"
                        name="preloadResources"
                        rows={4}
                        placeholder={`/fonts/font.woff2
/css/critical.css
/images/hero.jpg`}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Critical CSS (Above-the-fold styles)
                      </label>
                      <Field
                        as="textarea"
                        name="criticalCSS"
                        rows={6}
                        placeholder="body{font-family:sans-serif}.hero{background:#005c82}"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Schema Tab */}
                {activeTab === "schema" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Schema Markup (JSON-LD)
                      </label>
                      <Field
                        as="textarea"
                        name="schemaMarkup"
                        rows={12}
                        placeholder={`{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page description",
  "url": "https://toolinger.com/page",
  "mainEntity": {
    "@type": "Organization",
    "name": "Toolinger",
    "url": "https://toolinger.com"
  }
}`}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                      <ErrorMessage name="schemaMarkup" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Schema Templates</h4>
                      <div className="space-y-2 text-sm">
                        <button
                          type="button"
                          className="block text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={() => {
                            // Add schema template functionality
                            console.log("Adding WebPage schema template")
                          }}
                        >
                          + Add WebPage Schema
                        </button>
                        <button
                          type="button"
                          className="block text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={() => {
                            console.log("Adding Organization schema template")
                          }}
                        >
                          + Add Organization Schema
                        </button>
                        <button
                          type="button"
                          className="block text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={() => {
                            console.log("Adding Article schema template")
                          }}
                        >
                          + Add Article Schema
                        </button>
                      </div>
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
