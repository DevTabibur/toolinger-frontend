"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Search, Save, Globe, BarChart3, Settings, Code, Link, FileText, Home } from "lucide-react"
import { createDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api"
import toast from "react-hot-toast"
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbItem, BreadcrumbList, BreadcrumbLink } from "@/components/ui/breadcrumb"
import BasicSEOForm from "@/form/BasicSEOForm"
import SocialMediaForm from "@/form/SocialMediaForm"
import TechnicalForm from "@/form/TechnicalForm"
import SchemaForm from "@/form/SchemaForm"

// Slug validation: only lowercase letters, numbers, and hyphens, no leading/trailing/multiple hyphens, no slashes
const slugRegex = /^(?!-)(?!.*--)[a-z0-9]+(?:-[a-z0-9]+)*(?<!-)$/;

interface SEOData {
  page: string
  // ========================basic seo
  metaTitle: string
  metaDescription: string
  keywords: string
  canonicalUrl: string
  noindex: boolean
  // ========================social media
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
  ogSiteName: string
  ogLocale: string
  twitterCard: string
  twitterSite: string
  twitterCreator: string
  twitterImageUrl: string
  // ==================schema
  schemas: string // JSON string, will be parsed to array
  // ==========================technical
  changefreq: string
  priority: number
}

const seoValidationSchema = Yup.object({
  page: Yup.string()
    .required("Slug is required")
    .matches(
      slugRegex,
      "Slug must be lowercase, use only letters, numbers, and hyphens (no slashes, no spaces, no leading/trailing hyphens)"
    ),
  // ===================================basic seo
  metaTitle: Yup.string()
    .min(10, "Meta title must be at least 10 characters")
    .max(60, "Meta title should not exceed 60 characters")
    .required("Meta title is required"),
  noindex: Yup.string().optional(),
  metaDescription: Yup.string()
    .min(30, "Meta description should be at least 30 characters")
    .max(160, "Meta description should not exceed 160 characters")
    .required("Meta description is required"),
  keywords: Yup.string().required("Keywords are required"),
  canonicalUrl: Yup.string().url("Must be a valid URL"),
  // =========================================siocial media
  ogTitle: Yup.string().max(60, "OG title should not exceed 60 characters"),
  ogDescription: Yup.string().max(160, "OG description should not exceed 160 characters"),
  // ogImage: Yup.string().url("Must be a valid URL"),
  ogSiteName: Yup.string().max(50, "Site name should not exceed 50 characters"),
  twitterTitle: Yup.string().max(60, "Twitter title should not exceed 60 characters"),
  twitterDescription: Yup.string().max(160, "Twitter description should not exceed 160 characters"),
  twitterImageUrl: Yup.string().url("Must be a valid URL"),
  //=====================================================schema
  schemas: Yup.string(),
  // ========================================technical
  changefreq: Yup.string(),
  priority: Yup.number().min(0).max(1),
})

const initialValues: SEOData = {
  page: "",
  // ====================basic seo
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  canonicalUrl: "",
  noindex: false,
  // ==========================social media
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "website",
  ogSiteName: "Toolinger",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterSite: "@toolinger",
  twitterCreator: "@toolinger",
  twitterImageUrl: "",
  //=========== ======================schema
  schemas: "",
  // =============================// technical
  changefreq: "daily",

  priority: 1.0,
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
    // { id: "sitemap", label: "Sitemap", icon: Code },
    // { id: "article", label: "Article", icon: FileText },
  ]





  //======================================IMAGE

  const [ogImage, setOgImage] = useState<File | null>(null)
  const [ogImagePreview, setOgImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [ogImageError, setOgImageError] = useState<string | null>(null)


  // Handle file input change, store File object and preview URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setOgImage(file)
      setOgImagePreview(URL.createObjectURL(file))
      setOgImageError(null)
    }
  }

  // Handle drag and drop, store File object and preview URL
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setOgImage(file)
      setOgImagePreview(URL.createObjectURL(file))
      setOgImageError(null)
    }
  }

  const handleChooseImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setOgImage(null)
    setOgImagePreview(null)
    setOgImageError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (
    values: SEOData,
    { resetForm }: { resetForm: () => void }
  ) => {
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

      // Create FormData
      const formData = new FormData()
      formData.append("slug", values.page)
      // ==========================================================basic seo
      formData.append("metaTitle", values.metaTitle)
      formData.append("noindex", values.noindex.toString())
      formData.append("metaDescription", values.metaDescription)
      formData.append("keywords", values.keywords)
      formData.append("canonicalUrl", values.canonicalUrl)
      // ========================================================social media seo
      formData.append("ogTitle", values.ogTitle)
      formData.append("ogType", values.ogType)
      formData.append("ogSiteName", values.ogSiteName)
      formData.append("ogLocale", values.ogLocale)
      formData.append("ogImage", ogImage as any)
      formData.append("ogDescription", values.ogDescription)
      formData.append("twitterCard", values.twitterCard)
      formData.append("twitterSite", values.twitterSite)
      formData.append("twitterCreator", values.twitterCreator)
      formData.append("twitterImageUrl", values.twitterImageUrl)
      // ========================================================================= technical seo
      formData.append("changefreq", values.changefreq)
      formData.append("priority", values.priority as any)
      //========================================================schema
      formData.append("schemas", JSON.stringify(schemasArr))


      // Call API
      const result = await createDynamicPagesArticleAndSeo(formData)
      console.log("result", result)
      if (result.statusCode === 200) {
        toast.success("Page Data created Successfully")
        resetForm()
        // Reset the ogImage file input as well
        setOgImage(null)
        setOgImagePreview(null)
        setOgImageError(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        toast.error(result?.message || "Something went wrong.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create article. Please try again.");
    }
    setIsSubmitting(false)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create SEO</h1>
        {/* BreadCrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/seo/manage">
                SEO Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                Create SEO
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
                {/* Page Slug Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Slug * (e.g. <span className="font-mono">about-us</span>, <span className="font-mono">contact</span>)
                  </label>
                  <Field
                    name="page"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="e.g. about-us, contact, privacy-policy"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                    onBlur={(e: any) => {
                      // Optionally, auto-format: trim, to lower, replace spaces/underscores with hyphens, remove slashes
                      const val = e.target.value
                        .trim()
                        .toLowerCase()
                        .replace(/[_\s]+/g, "-")
                        .replace(/\//g, "")
                        .replace(/^-+|-+$/g, "")
                        .replace(/--+/g, "-")
                      setFieldValue("page", val)
                    }}
                  />
                  <ErrorMessage name="page" component="div" className="text-red-500 text-sm mt-1" />
                  <div className="text-xs text-gray-500 mt-1">
                    Only lowercase letters, numbers, and hyphens allowed. No slashes, spaces, or leading/trailing hyphens.
                  </div>
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
                  <BasicSEOForm itemVariants={itemVariants} values={values} />
                )}

                {/* Social Media Tab */}
                {activeTab === "social" && (
                  <SocialMediaForm itemVariants={itemVariants} values={values} ogImage={ogImage} setOgImage={setOgImage} ogImagePreview={ogImagePreview} setOgImagePreview={setOgImagePreview} setOgImageError={setOgImageError} dragActive={dragActive} fileInputRef={fileInputRef} handleChooseImageClick={handleChooseImageClick} handleRemoveImage={handleRemoveImage} handleFileChange={handleFileChange} handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} handleDrop={handleDrop} />
                )}

                {/* Technical SEO Tab */}
                {activeTab === "technical" && (
                  <TechnicalForm itemVariants={itemVariants}
                    values={values} />
                )}

                {/* Schema Tab */}
                {activeTab === "schema" && (
                  <SchemaForm itemVariants={itemVariants}
                    values={values} />
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
