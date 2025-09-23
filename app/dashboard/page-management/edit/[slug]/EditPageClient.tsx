"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Eye, 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { QuillField } from "@/form/QuillField";
import { getDynamicPagesArticleAndSeoBySlug, updateDynamicPagesArticleAndSeo, createDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ValidatedInput } from "@/components/forms/ValidatedInput";
import { JsonSchemaEditor } from "@/components/forms/JsonSchemaEditor";
import { validateMetaTitle, validateMetaDescription, validateCanonicalUrl, validateJsonSchema } from "@/lib/validation";
import { apiCall } from "@/lib/errorHandler";
import { ValidatedTextarea } from "@/components/forms/ValidatedTextarea";

interface EditPageClientProps {
  slug: string;
}

interface PageData {
  id?: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  noindex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  changefreq: string;
  priority: number;
  schema: string;
  updatedAt?: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  metaTitle: Yup.string()
    .min(10, "Meta title must be at least 10 characters")
    .max(60, "Meta title must be no more than 60 characters")
    .required("Meta title is required"),
  metaDescription: Yup.string()
    .min(30, "Meta description must be at least 30 characters")
    .max(160, "Meta description must be no more than 160 characters")
    .required("Meta description is required"),
  keywords: Yup.string().required("Keywords are required"),
  canonicalUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Canonical URL is required"),
  ogTitle: Yup.string().required("OG title is required"),
  ogDescription: Yup.string().required("OG description is required"),
  twitterTitle: Yup.string().required("Twitter title is required"),
  twitterDescription: Yup.string().required("Twitter description is required"),
  changefreq: Yup.string().required("Change frequency is required"),
  priority: Yup.number()
    .min(0, "Priority must be at least 0")
    .max(1, "Priority must be no more than 1")
    .required("Priority is required"),
  schema: Yup.string().test(
    "valid-json",
    "Schema must be valid JSON",
    function(value) {
      if (!value) return true; // Allow empty
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }
  )
});

export default function EditPageClient({ slug }: EditPageClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNewPage, setIsNewPage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const formik = useFormik<PageData>({
    initialValues: {
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      noindex: false,
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      changefreq: "weekly",
      priority: 0.8,
      schema: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        const data = {
          ...values,
          slug: slug,
          type: "page"
        };

        if (isNewPage) {
          const result = await createDynamicPagesArticleAndSeo(data);
          toast.success("Page created successfully");
          
          // Switch to edit mode after creation
          setIsNewPage(false);
          if (result && result.article && result.article.id) {
            formik.setFieldValue("id", result.article.id);
          }
        } else {
          await updateDynamicPagesArticleAndSeo(values.id!, data);
          toast.success("Page updated successfully");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to save page");
        console.error("Error saving page:", error);
      } finally {
        setSaving(false);
      }
    }
  });

  useEffect(() => {
    const loadPageData = async () => {
      setLoading(true);
      try {
        const data = await getDynamicPagesArticleAndSeoBySlug(slug);
        
        if (data && data.article && data.seo) {
          // Existing page - prefill data
          setIsNewPage(false);
          formik.setValues({
            id: data.article.id,
            title: data.article.title || "",
            content: data.article.content || "",
            metaTitle: data.seo.metaTitle || "",
            metaDescription: data.seo.metaDescription || "",
            keywords: data.seo.keywords || "",
            canonicalUrl: data.seo.canonicalUrl || "",
            noindex: data.seo.noindex || false,
            ogTitle: data.seo.ogTitle || "",
            ogDescription: data.seo.ogDescription || "",
            ogImage: data.seo.ogImage || "",
            twitterTitle: data.seo.twitterTitle || "",
            twitterDescription: data.seo.twitterDescription || "",
            twitterImage: data.seo.twitterImage || "",
            changefreq: data.seo.changefreq || "weekly",
            priority: data.seo.priority || 0.8,
            schema: data.seo.schema || "",
            updatedAt: data.article.updatedAt
          });
          setPreviewUrl(data.seo.canonicalUrl || `/${slug}`);
        } else {
          // New page - set default values and create mode
          setIsNewPage(true);
          formik.setValues(prev => ({
            ...prev,
            title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
            canonicalUrl: `/${slug}`,
            metaTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} - Toolinger`,
            metaDescription: `Learn more about ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} on Toolinger`,
            keywords: `${slug.replace(/-/g, ', ')}, toolinger, online tools`,
            ogTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} - Toolinger`,
            ogDescription: `Learn more about ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} on Toolinger`,
            twitterTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} - Toolinger`,
            twitterDescription: `Learn more about ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} on Toolinger`
          }));
          setPreviewUrl(`/${slug}`);
        }
      } catch (error) {
        console.error("Error loading page data:", error);
        // Set as new page if loading fails
        setIsNewPage(true);
        formik.setValues(prev => ({
          ...prev,
          title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
          canonicalUrl: `/${slug}`,
          metaTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} - Toolinger`,
          metaDescription: `Learn more about ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} on Toolinger`,
          keywords: `${slug.replace(/-/g, ', ')}, toolinger, online tools`,
          ogTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} - Toolinger`,
          ogDescription: `Learn more about ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} on Toolinger`,
          twitterTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} - Toolinger`,
          twitterDescription: `Learn more about ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} on Toolinger`
        }));
        setPreviewUrl(`/${slug}`);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [slug]);

  const handlePreview = () => {
    window.open(previewUrl, "_blank");
  };

  const formatJsonSchema = () => {
    try {
      const parsed = JSON.parse(formik.values.schema);
      formik.setFieldValue("schema", JSON.stringify(parsed, null, 2));
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span>Loading page data...</span>
        </div>
      </div>
    );
  }

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
              {isNewPage ? "Create Page" : "Edit Page"}: {slug}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isNewPage ? "Create new page with content and SEO" : "Edit page content and SEO settings"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={saving || !formik.isValid}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving..." : isNewPage ? "Create" : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="basic-seo">Basic SEO</TabsTrigger>
            <TabsTrigger value="social-media">Social Media</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>
                  Write and edit your page content using the rich text editor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      formik.touched.title && formik.errors.title && "border-red-500"
                    )}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <div className="border rounded-md">
                    <QuillField
                      value={formik.values.content}
                      onChange={(value) => formik.setFieldValue("content", value)}
                    />
                  </div>
                  {formik.touched.content && formik.errors.content && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.content}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Basic SEO Tab */}
          <TabsContent value="basic-seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic SEO</CardTitle>
                <CardDescription>
                  Configure basic SEO settings for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ValidatedInput
                      label="Meta Title"
                      value={formik.values.metaTitle}
                      onChange={(value) => formik.setFieldValue("metaTitle", value)}
                      onBlur={() => formik.setFieldTouched("metaTitle", true)}
                      validator={validateMetaTitle}
                      showCharacterCount={true}
                      maxLength={60}
                      minLength={10}
                      placeholder="Enter meta title (10-60 characters)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      name="keywords"
                      value={formik.values.keywords}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    {formik.touched.keywords && formik.errors.keywords && (
                      <p className="text-sm text-red-500 mt-1">{formik.errors.keywords}</p>
                    )}
                  </div>
                </div>

                <div>
                  <ValidatedTextarea
                    label="Meta Description"
                    value={formik.values.metaDescription}
                    onChange={(value: any) => formik.setFieldValue("metaDescription", value)}
                    onBlur={() => formik.setFieldTouched("metaDescription", true)}
                    // validator={validateMetaDescription}
                    showCharacterCount={true}
                    maxLength={160}
                    minLength={30}
                    rows={3}
                    placeholder="Enter meta description (30-160 characters)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ValidatedInput
                      label="Canonical URL"
                      value={formik.values.canonicalUrl}
                      onChange={(value) => formik.setFieldValue("canonicalUrl", value)}
                      onBlur={() => formik.setFieldTouched("canonicalUrl", true)}
                      validator={validateCanonicalUrl}
                      placeholder="https://example.com/page or /page"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="noindex"
                      checked={formik.values.noindex}
                      onCheckedChange={(checked) => formik.setFieldValue("noindex", checked)}
                    />
                    <Label htmlFor="noindex">Noindex (Hide from search engines)</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social-media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Configure Open Graph and Twitter Card settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Open Graph</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ogTitle">OG Title</Label>
                        <Input
                          id="ogTitle"
                          name="ogTitle"
                          value={formik.values.ogTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.ogTitle && formik.errors.ogTitle && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.ogTitle}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="ogImage">OG Image URL</Label>
                        <Input
                          id="ogImage"
                          name="ogImage"
                          value={formik.values.ogImage}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ogDescription">OG Description</Label>
                      <Textarea
                        id="ogDescription"
                        name="ogDescription"
                        value={formik.values.ogDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={3}
                      />
                      {formik.touched.ogDescription && formik.errors.ogDescription && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.ogDescription}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Twitter Card</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="twitterTitle">Twitter Title</Label>
                        <Input
                          id="twitterTitle"
                          name="twitterTitle"
                          value={formik.values.twitterTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.twitterTitle && formik.errors.twitterTitle && (
                          <p className="text-sm text-red-500 mt-1">{formik.errors.twitterTitle}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="twitterImage">Twitter Image URL</Label>
                        <Input
                          id="twitterImage"
                          name="twitterImage"
                          value={formik.values.twitterImage}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="twitterDescription">Twitter Description</Label>
                      <Textarea
                        id="twitterDescription"
                        name="twitterDescription"
                        value={formik.values.twitterDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={3}
                      />
                      {formik.touched.twitterDescription && formik.errors.twitterDescription && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.twitterDescription}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical SEO</CardTitle>
                <CardDescription>
                  Configure technical SEO settings for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="changefreq">Change Frequency</Label>
                    <Select
                      value={formik.values.changefreq}
                      onValueChange={(value) => formik.setFieldValue("changefreq", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">Always</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    {formik.touched.changefreq && formik.errors.changefreq && (
                      <p className="text-sm text-red-500 mt-1">{formik.errors.changefreq}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority (0.0 - 1.0)</Label>
                    <Input
                      id="priority"
                      name="priority"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        formik.touched.priority && formik.errors.priority && "border-red-500"
                      )}
                    />
                    {formik.touched.priority && formik.errors.priority && (
                      <p className="text-sm text-red-500 mt-1">{formik.errors.priority}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schema Tab */}
          <TabsContent value="schema" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>JSON-LD Schema</CardTitle>
                <CardDescription>
                  Add structured data to help search engines understand your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <JsonSchemaEditor
                    label="JSON-LD Schema"
                    value={formik.values.schema}
                    onChange={(value: any) => formik.setFieldValue("schema", value)}
                    onBlur={() => formik.setFieldTouched("schema", true)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={formatJsonSchema}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Format JSON</span>
                  </Button>
                  <p className="text-sm text-gray-500">
                    Use valid JSON format for structured data
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}