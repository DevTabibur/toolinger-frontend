"use client"

import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Plus, Home, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { createCategory } from "@/app/api/BlogCategory.api"
import { toast } from "react-hot-toast"

// Category status enum
export enum CategoryStatus {
  ACTIVE = "active",
  PAUSED = "paused",
}

// Category interface
export interface ICategory {
  name: string
  slug: string
  description: string
}

// Form validation schema
const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Category name is too short")
    .max(50, "Category name is too long")
    .required("Category name is required"),
  slug: Yup.string()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL friendly (lowercase, hyphens)")
    .required("Slug is required"),
  description: Yup.string(),
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

function Breadcrumb() {
  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
      <Link href="/dashboard" className="flex items-center hover:text-[#005c82] transition-colors">
        <Home className="w-4 h-4 mr-1" />
        Dashboard
      </Link>
      <ChevronRight className="w-4 h-4 mx-2" />
      <Link href="/dashboard/blog-category/manage" className="hover:text-[#005c82] transition-colors">
        Blog Categories
      </Link>
      <ChevronRight className="w-4 h-4 mx-2" />
      <span className="font-medium text-gray-900 dark:text-white">Add Category</span>
    </nav>
  )
}

export default function BlogCategoryCreatePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container  mx-auto p-4"
    >

      {/* Page Title */}
      <motion.div variants={itemVariants} className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Blog Category</h1>
        <Link
          href="/dashboard/blog-category/manage"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white font-semibold hover:from-[#007fa3] hover:to-[#00b8c6] transition"
        >
          <Plus className="w-4 h-4" />
          Manage Category
        </Link>
      </motion.div>

      {/* Breadcrumb */}
      <motion.div variants={itemVariants}>
        <Breadcrumb />
      </motion.div>

      {/* Form Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700"
      >
        <Formik<ICategory>
          initialValues={{
            name: "",
            slug: "",
            description: "",
          }}
          validationSchema={CategorySchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await createCategory(values)
              if (res && res.success) {
                toast.success(res.message || "Category created successfully")
                resetForm()
              } else {
                toast.error(res?.message || "Failed to create category")
              }
            } catch (error: any) {
              toast.error(error?.message || "Failed to create category")
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                  placeholder="Enter category name"
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </label>
                <Field
                  id="slug"
                  name="slug"
                  type="text"
                  className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                  placeholder="category-slug"
                />
                <ErrorMessage name="slug" component="div" className="text-red-600 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                  placeholder="Enter category description"
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-xs mt-1" />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                >
                  <option value={CategoryStatus.ACTIVE}>Active</option>
                  <option value={CategoryStatus.PAUSED}>Paused</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-600 text-xs mt-1" />
              </div> */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white font-semibold hover:from-[#007fa3] hover:to-[#00b8c6] transition flex items-center gap-2"
                >
                  {isSubmitting && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
                  {isSubmitting ? "Creating..." : "Create Category"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  )
}
