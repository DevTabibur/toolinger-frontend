"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuillField } from "@/form/QuillField";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Eye,
    ArrowLeft,
    ExternalLink,
    Save,
    CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    getDynamicPagesArticleAndSeoBySlug,
    createDynamicPagesArticleAndSeo,
    updateDynamicPagesArticleAndSeo,
} from "@/app/api/pageManagement.Api";


// UI components for tabs, select, textarea, etc.
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ValidatedTextarea } from "@/components/forms/ValidatedTextarea";
import { ValidatedInput } from "@/components/forms/ValidatedInput";
import SeoAndArticleForm from "@/components/forms/SeoAndArticleForm";

interface EditPageClientProps {
    slug: string;
}

interface PageContentData {
    id?: string;
    title: string;
    content: string;
    // SEO fields
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    canonicalUrl?: string;
    noindex?: boolean;
    // Social Media
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    // Technical
    changefreq?: string;
    priority?: number | string;
    // Schema
    schema?: string;
}

const contentValidationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    metaTitle: Yup.string().max(60, "Meta title too long"),
    metaDescription: Yup.string().max(160, "Meta description too long"),
    canonicalUrl: Yup.string().url("Invalid URL").nullable().notRequired(),
    priority: Yup.number()
        .min(0, "Min 0.0")
        .max(1, "Max 1.0")
        .nullable()
        .notRequired(),
    // Add more validations as needed
});



export default function EditPageClient({ slug }: EditPageClientProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isNewPage, setIsNewPage] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [createContentOnly, setCreateContentOnly] = useState(true);

    // State to hold loaded data for the form (for showing existing content)
    const [loadedData, setLoadedData] = useState<PageContentData | null>(null);

    const formik = useFormik<PageContentData>({
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
            changefreq: "",
            priority: "",
            schema: "",
        },
        validationSchema: contentValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setSaving(true);
            try {
                const ArticleData = {
                    slug: slug,
                    PageArticle: {
                        "content": values.content
                    }
                }
                console.log('ArticleData', ArticleData)
                let data: any = {
                    slug,
                    PageArticle: {
                        title: values.title,
                        content: values.content,
                    },
                };
                if (!createContentOnly) {
                    data.Seo = {
                        metaTitle: values.metaTitle,
                        metaDescription: values.metaDescription,
                        keywords: values.keywords,
                        canonicalUrl: values.canonicalUrl,
                        noindex: values.noindex,
                        ogTitle: values.ogTitle,
                        ogDescription: values.ogDescription,
                        ogImage: values.ogImage,
                        twitterTitle: values.twitterTitle,
                        twitterDescription: values.twitterDescription,
                        twitterImage: values.twitterImage,
                        changefreq: values.changefreq,
                        priority: values.priority === "" ? null : Number(values.priority),
                        schema: values.schema,
                    };
                }
                let result;
                if (isNewPage) {
                    result = await createDynamicPagesArticleAndSeo(
                        ArticleData
                    );
                    console.log('create result', result)
                    if (result?.statusCode === 200) {
                        toast.success("Page created successfully");
                    } else {
                        toast.error("Something went wrong")
                    }

                } else {
                    result = await updateDynamicPagesArticleAndSeo(slug, data);
                    if (result?.statusCode === 200) {
                        toast.success("Page updated successfully");
                    } else {
                        toast.error("Something went wrong")
                    }
                    console.log('update result', result)

                }
                setIsNewPage(false);
                if (result && result.article && result.article.id) {
                    formik.setFieldValue("id", result.article.id);
                }
            } catch (error: any) {
                toast.error(error?.message || "Failed to save page");
                console.error("Error saving page:", error);
            } finally {
                setSaving(false);
            }
        },
    });

    useEffect(() => {
        const loadPageData = async () => {
            setLoading(true);
            try {
                const data = await getDynamicPagesArticleAndSeoBySlug(slug);
                if (data && data.article) {
                    setIsNewPage(false);
                    formik.setValues({
                        id: data.article.id,
                        title: data.article.title || "",
                        content: data.article.content || "",
                        metaTitle: data.seo?.metaTitle || "",
                        metaDescription: data.seo?.metaDescription || "",
                        keywords: data.seo?.keywords || "",
                        canonicalUrl: data.article.canonicalUrl || data.seo?.canonicalUrl || "",
                        noindex: data.seo?.noindex || false,
                        ogTitle: data.seo?.ogTitle || "",
                        ogDescription: data.seo?.ogDescription || "",
                        ogImage: data.seo?.ogImage || "",
                        twitterTitle: data.seo?.twitterTitle || "",
                        twitterDescription: data.seo?.twitterDescription || "",
                        twitterImage: data.seo?.twitterImage || "",
                        changefreq: data.seo?.changefreq || "",
                        priority: data.seo?.priority ?? "",
                        schema: data.seo?.schema || "",
                    });
                    setPreviewUrl(data.article.canonicalUrl || `/${slug}`);
                } else {
                    setIsNewPage(true);
                    formik.setValues({
                        title:
                            slug.charAt(0).toUpperCase() +
                            slug.slice(1).replace(/-/g, " "),
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
                        changefreq: "",
                        priority: "",
                        schema: "",
                    });
                    setPreviewUrl(`/${slug}`);
                }
            } catch (error) {
                setIsNewPage(true);
                formik.setValues({
                    title:
                        slug.charAt(0).toUpperCase() +
                        slug.slice(1).replace(/-/g, " "),
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
                    changefreq: "",
                    priority: "",
                    schema: "",
                });
                setPreviewUrl(`/${slug}`);
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handlePreview = () => {
        window.open(previewUrl, "_blank");
    };

    const formatJsonSchema = () => {
        try {
            const parsed = JSON.parse(formik.values.schema || "{}");
            formik.setFieldValue("schema", JSON.stringify(parsed, null, 2));
            toast.success("JSON formatted");
        } catch (e) {
            toast.error("Invalid JSON");
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
                            {isNewPage
                                ? "Create new page with content and SEO"
                                : "Edit page content and SEO settings"}
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
                        type="button"
                    >
                        <Save className="h-4 w-4" />
                        <span>
                            {saving
                                ? "Saving..."
                                : isNewPage
                                    ? "Create"
                                    : "Save"}
                        </span>
                    </Button>
                </div>
            </div>

            {/* Option to create only content */}
            <div className="flex items-center space-x-2 mb-2">
                <Switch
                    id="createContentOnly"
                    checked={createContentOnly}
                    onCheckedChange={setCreateContentOnly}
                />
                <Label htmlFor="createContentOnly">
                    Create only Page Content (no SEO)
                </Label>
            </div>

            {/* Form */}
            <SeoAndArticleForm formik={formik} />
        </div>
    );
}