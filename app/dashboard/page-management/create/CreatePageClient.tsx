"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Plus,
  FileText,
  Globe,
  Wrench
} from "lucide-react";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CreateFormData {
  slug: string;
  type: 'static' | 'tool';
  category?: string;
}

const validationSchema = Yup.object({
  slug: Yup.string()
    .required("Slug is required")
    .matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .min(2, "Slug must be at least 2 characters"),
  type: Yup.string()
    .oneOf(['static', 'tool'], "Type must be either static or tool")
    .required("Type is required"),
  category: Yup.string().when('type', {
    is: 'tool',
    then: (schema) => schema.required("Category is required for tool pages"),
    otherwise: (schema) => schema.notRequired()
  })
});

export default function CreatePageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<CreateFormData>({
    initialValues: {
      slug: "",
      type: "static",
      category: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Navigate to edit page with the new slug
        const editUrl = `/dashboard/page-management/edit/${values.slug}`;
        router.push(editUrl);
      } catch (error) {
        toast.error("Failed to create page");
        console.error("Error creating page:", error);
      } finally {
        setLoading(false);
      }
    }
  });

  const pageTypeOptions = [
    {
      value: "static",
      label: "Static Page",
      description: "Regular website pages (Home, About, Contact, etc.)",
      icon: <FileText className="h-5 w-5" />
    },
    {
      value: "tool",
      label: "Tool Page",
      description: "Interactive tools and utilities",
      icon: <Wrench className="h-5 w-5" />
    }
  ];

  const categoryOptions = [
    { value: "text", label: "Text Tools" },
    { value: "image", label: "Image Tools" },
    { value: "developer", label: "Developer Tools" },
    { value: "converters", label: "Converters" },
    { value: "generators", label: "Generators" },
    { value: "calculators", label: "Calculators" },
    { value: "website-management", label: "Website Management Tools" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Page
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new page with content and SEO settings
            </p>
          </div>
        </div>
      </div>

      {/* Create Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Page Details</span>
            </CardTitle>
            <CardDescription>
              Configure basic settings for your new page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Slug Input */}
            <div>
              <Label htmlFor="slug">Page Slug</Label>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">/</span>
                <Input
                  id="slug"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="my-new-page"
                  className={formik.touched.slug && formik.errors.slug ? "border-red-500" : ""}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                URL will be: /{formik.values.slug}
              </p>
              {formik.touched.slug && formik.errors.slug && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.slug}</p>
              )}
            </div>

            {/* Page Type Selection */}
            <div>
              <Label>Page Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {pageTypeOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formik.values.type === option.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => formik.setFieldValue("type", option.value as 'static' | 'tool')}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-md ${
                        formik.values.type === option.value
                          ? "bg-blue-100 dark:bg-blue-800"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {formik.touched.type && formik.errors.type && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.type}</p>
              )}
            </div>

            {/* Category Selection (for tool pages) */}
            {formik.values.type === "tool" && (
              <div>
                <Label htmlFor="category">Tool Category</Label>
                <Select
                  value={formik.values.category}
                  onValueChange={(value) => formik.setFieldValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors.category}</p>
                )}
              </div>
            )}

            {/* Preview */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Page Preview
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>URL:</strong> /{formik.values.slug || "your-slug"}</p>
                <p><strong>Type:</strong> {formik.values.type === "static" ? "Static Page" : "Tool Page"}</p>
                {formik.values.type === "tool" && formik.values.category && (
                  <p><strong>Category:</strong> {categoryOptions.find(c => c.value === formik.values.category)?.label}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formik.isValid}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{loading ? "Creating..." : "Create Page"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
