"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Eye,
    ArrowLeft,
    ExternalLink,
    Plus,
    X
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    getDynamicPagesArticleAndSeoBySlug,
    createDynamicPagesArticleAndSeo,
} from "@/app/api/pageManagement.Api";

import SeoAndArticleForm from "@/components/forms/SeoAndArticleForm";
import toast from "react-hot-toast";



interface EditPageClientProps {
    slug: string;
}

interface PageContentData {
    slug: string;
    type: string;
    title: string;
    content: string;
    // =========================SEO fields
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    canonicalUrl?: string;
    noindex?: boolean;
    //==============================Social Media
    ogTitle?: string;
    ogType?: string;
    ogSiteName?: string;
    ogLocale?: string;
    ogDescription?: string;
    ogImageUrl?: string;

    // twitter card
    twitterCard?: string;
    twitterSite?: string;
    twitterCreator?: string;
    twitterImageUrl?: string;
    // ======================================Technical
    changefreq?: string;
    priority?: number | string;
    // /=====================Schema
    // schema?: string;
    // alternates?: string;
}

const contentValidationSchema = Yup.object({
    // title: Yup.string().required("Title is required"),
    // slug: Yup.string().required("Slug is required"),
    // type: Yup.string().required("Type is required"),

    //======================================Article
    content: Yup.string().optional(),
    // //=============================================Basic SEO
    metaTitle: Yup.string().max(60, "Meta title too long").optional(),
    metaDescription: Yup.string().max(160, "Meta description too long").optional(),
    keywords: Yup.string()
        .test(
            "keywords-comma-separated",
            "Keywords must be a comma-separated list (example: keyword1, keyword2, keyword3)",
            value => {
                if (!value) return true; // allow empty
                return value
                    .split(",")
                    .map(v => v.trim())
                    .every(v => v.length > 0);
            }
        )
        .optional(),
    canonicalUrl: Yup.string()
        .test(
            "is-valid-canonical-url",
            "Invalid URL",
            value => {
                if (!value) return true; // allow empty
                // Accepts:
                // - starts with http:// or https://
                // - starts with /
                // - looks like a domain (e.g. toolinger.com, www.example.com)
                return (
                    /^https?:\/\/[^\s]+$/.test(value) ||
                    /^\/[a-zA-Z0-9\-\/]*$/.test(value) ||
                    /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(value)
                );
            }
        )
        .nullable()
        .optional(),
    noindex: Yup.boolean().nullable().optional(),
    //=============================================Social Media
    ogTitle: Yup.string().max(70, "OG title too long").optional(),
    ogType: Yup.string()
        .oneOf(
            [
                "website",
                "article",
                "book",
                "profile",
                "music.song",
                "music.album",
                "music.playlist",
                "music.radio_station",
                "video.movie",
                "video.episode",
                "video.tv_show",
                "video.other",
                "product",
                "other"
            ],
            "Invalid OG type"
        )
        .optional(),
    ogSiteName: Yup.string().optional(),
    ogLocale: Yup.string()
        .oneOf(
            [
                "en_US",    // English (US)
                "en_GB",    // English (UK)
                "es",       // Spanish
                "fr",       // French
                "de"        // German
            ],
            "Invalid locale. Choose from the list."
        )
        .optional(),
    ogImage: Yup.string().url("Invalid URL").nullable().optional(),
    ogDescription: Yup.string().max(155, "OG description too long").optional(),
    //======================================Twitter Card
    twitterCard: Yup.string()
        .oneOf(
            [
                "summary",
                "summary_large_image",
                "app",
                "player" 
            ],
            "Invalid Twitter Card type"
        )
        .optional(),
    twitterSite: Yup.string().optional(),
    twitterCreator: Yup.string().optional(),
    twitterImageUrl: Yup.string().optional(),
    //=============================================Technical
    changefreq: Yup.string().oneOf(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"], "Invalid change frequency").optional(),
    priority: Yup.number()
        .min(0, "Min 0.0")
        .max(1, "Max 1.0")
        .nullable()
        .notRequired(),
    //=============================================Schema
    // schema: Yup.string().nullable().notRequired(),

});

import { useSearchParams } from "next/navigation";

export default function EditPageClient({ slug, }: EditPageClientProps) {
    const searchParams = useSearchParams();
    // Properly extract "type" and "title" from the query string
    // Example: /dashboard/page-management/edit/login?type=static&title=login page
    // type should be "static", title should be "login page"
    const type = searchParams.get("type") || "";
    const title = searchParams.get("title") || "";

    // console.log("type  ==>", type); // Should be just "static", "dynamic", etc.
    // console.log("title ==>", title); // Should be "login page", "register page", etc.
    // console.log("slug  ==>", slug);

    // Now you have: type, title, slug (e.g. "login")
    // You can use these variables in your component as needed
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    //====================================== OGImage IMAGE
    const [ogImage, setOgImage] = useState<File | null>(null)
    const [ogImagePreview, setOgImagePreview] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const ogFileInputRef = useRef<HTMLInputElement | null>(null)
    const [ogImageError, setOgImageError] = useState<string | null>(null)

    // ============================== Twitter Image
    // const [twitterImage, setTwitterImage] = useState<File | null>(null)
    // const [twitterImagePreview, setTwitterImagePreview] = useState<string | null>(null)
    // const [twitterDragActive, setTwitterDragActive] = useState(false)
    // const twitterFileInputRef = useRef<HTMLInputElement | null>(null)
    // const [twitterImageError, setTwitterImageError] = useState<string | null>(null)

  

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
        ogFileInputRef.current?.click()
    }

    const handleRemoveImage = () => {
        setOgImage(null)
        setOgImagePreview(null)
        setOgImageError("")
        if (ogFileInputRef.current) {
            ogFileInputRef.current.value = ""
        }
    }

    // State to hold loaded data for the form (for showing existing content)
    const [loadedData, setLoadedData] = useState<any | null>(null);

    // Use a ref to prevent formik.setValues from running on every render
    const didSetFormikValues = useRef(false);

    const formik = useFormik<PageContentData>({
        initialValues: {
            slug: slug,
            type: type,
            title: title,
            //=======================article
            content: "",
            //==============================basic seo
            metaTitle: "",
            metaDescription: "",
            keywords: "",
            canonicalUrl: "",
            noindex: false,
            //===========================================Social Media
            ogTitle: "",
            ogType: "",
            ogSiteName: "",
            ogLocale: "",
            ogDescription: "",
            ogImageUrl: "",
            // ===========twitter card
            twitterCard: "",
            twitterSite: "",
            twitterCreator: "",
            twitterImageUrl: "",
            //===========================================Technical
            changefreq: "",
            priority: "",
            //==============================schema
            // schema: "",
            // alternates: "",
        },
        validationSchema: contentValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setSaving(true);
            try {
                console.log("slug", slug)
                console.log("values", values)
                const formData = new FormData();
                formData.append("slug", `/${slug}`)
                formData.append("type", type)
                formData.append("title", title)
                // formData.append("pageContent", values.content)
                // ========================article
                // Wrap the content in a parent div that forces the color for all content (text, headings, lists, etc.)
                // Light mode: green (#22c55e), Dark mode: red (#ef4444)
                // This approach ensures that even if the user pastes colored text, the parent color will override it.
                // The color is set via a CSS variable for easy dark mode switching.

                // Improved: Force color on all text, including <ul>, <ol>, <li>, and their markers/numbers.
                function wrapContentWithColor(content: string) {
                    // The parent div sets the color for all descendants using a CSS variable.
                    // We use ::marker and ::before/::after to ensure list bullets/numbers are colored.
                    // This ensures all text, bullets, and numbers inherit the correct color in both modes.
                    return `<div 
                        style="color: var(--editor-dynamic-color, #000000); --editor-dynamic-color: #000000;" 
                        class="wordcounter-content-color"
                    >
                        <style>
                            .wordcounter-content-color,
                            .wordcounter-content-color *,
                            .wordcounter-content-color *::marker,
                            .wordcounter-content-color *::before,
                            .wordcounter-content-color *::after {
                                color: var(--editor-dynamic-color, #000000) !important;
                            }
                            .dark .wordcounter-content-color {
                                --editor-dynamic-color: #e3e3e3 !important;
                                color: var(--editor-dynamic-color, #e3e3e3) !important;
                            }
                            .dark .wordcounter-content-color,
                            .dark .wordcounter-content-color *,
                            .dark .wordcounter-content-color *::marker,
                            .dark .wordcounter-content-color *::before,
                            .dark .wordcounter-content-color *::after {
                                color: var(--editor-dynamic-color, #e3e3e3) !important;
                            }
                        </style>
                        ${content}
                    </div>`;
                }

                formData.append("pageContent", wrapContentWithColor(values.content))
                // ========================basic seo
                if (values.metaTitle !== undefined && values.metaTitle !== null) {
                    formData.append("metaTitle", values.metaTitle);
                }
                if (values.metaDescription !== undefined && values.metaDescription !== null) {
                    formData.append("metaDescription", values.metaDescription);
                }
                if (values.keywords !== undefined && values.keywords !== null) {
                    formData.append("keywords", values.keywords);
                }
                if (values.canonicalUrl !== undefined && values.canonicalUrl !== null) {
                    formData.append("canonicalUrl", values.canonicalUrl);
                }
                formData.append("noindex", String(values.noindex))

                // =================================Open graph

                if (values.ogTitle !== undefined && values.ogTitle !== null) {
                    formData.append("ogTitle", values.ogTitle);
                }
                if (values.ogType !== undefined && values.ogType !== null) {
                    formData.append("ogType", values.ogType);
                }
                if (values.ogSiteName !== undefined && values.ogSiteName !== null) {
                    formData.append("ogSiteName", values.ogSiteName);
                }
                if (values.ogLocale !== undefined && values.ogLocale !== null) {
                    formData.append("ogLocale", values.ogLocale);
                }
                if (values.ogDescription !== undefined && values.ogDescription !== null) {
                    formData.append("ogDescription", values.ogDescription);
                }
                formData.append("ogImageUrl", ogImage as any);

                // ========================twitter card
                if (values.twitterCard !== undefined && values.twitterCard !== null) {
                    formData.append("twitterCard", values.twitterCard);
                }
                if (values.twitterSite !== undefined && values.twitterSite !== null) {
                    formData.append("twitterSite", values.twitterSite);
                }
                if (values.twitterCreator !== undefined && values.twitterCreator !== null) {
                    formData.append("twitterCreator", values.twitterCreator);
                }
                if (values.twitterImageUrl !== undefined && values.twitterImageUrl !== null) {
                    formData.append("twitterImageUrl", values.twitterImageUrl);
                }

                // ========================Technical
                if (values.changefreq !== undefined && values.changefreq !== null) {
                    formData.append("changefreq", values.changefreq);
                }
                if (values.priority !== undefined && values.priority !== null) {
                    formData.append("priority", values.priority === "" ? "" : String(values.priority));
                }

                const result = await createDynamicPagesArticleAndSeo(formData)

                console.log('create the data result', result.statusCode)
                if (result?.statusCode === 200) {
                    toast.success("Data created successfully")
                } else {
                    toast.error("Failed to create")
                }

            } catch (error: any) {
                toast.error("Failed to save page");
                console.error("Error saving page:", error);
            } finally {
                setSaving(false);
            }
        },
    });

    // When loadedData changes, set formik values accordingly
    useEffect(() => {
        if (loadedData && !loading) {
            // Prevent running setValues more than once for the same loadedData
            if (didSetFormikValues.current && loadedData._slug === formik.values.slug) {
                return;
            }
            didSetFormikValues.current = true;
            formik.setValues({
                slug: loadedData._slug || "",
                type: loadedData.type || "",
                title: loadedData.title || "",
                //==============================Article
                content: loadedData.pageContent || loadedData.content || "",
                //===========================================Basic SEO
                metaTitle: loadedData.metaTitle || "",
                metaDescription: loadedData.metaDescription || "",
                keywords: Array.isArray(loadedData.keywords) ? loadedData.keywords.join(", ") : (loadedData.keywords || ""),
                canonicalUrl: loadedData.canonicalUrl || "",
                noindex: loadedData.noindex || false,
                //===========================================Social Media
                ogTitle: loadedData.ogTitle || "",
                ogType: loadedData.ogType || "",
                ogSiteName: loadedData.ogSiteName || "",
                ogLocale: loadedData.ogLocale || "",
                ogImageUrl: loadedData.ogImageUrl || "",
                ogDescription: loadedData.ogDescription || "",
                // twitter card
                twitterCard: loadedData.twitterCard || "",
                twitterSite: loadedData.twitterSite || "",
                twitterCreator: loadedData.twitterCreator || "",
                twitterImageUrl: loadedData.twitterImageUrl || "",

                //=========================================Technical
                changefreq: loadedData.changefreq || "",
                priority: loadedData.priority ?? "",
                //===========================Schema

                // schema: loadedData.schemas && Array.isArray(loadedData.schemas) && loadedData.schemas.length > 0 ? JSON.stringify(loadedData.schemas, null, 2) : "",
                // alternates: loadedData.alternates || "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedData, loading]);

    useEffect(() => {
        const loadPageData = async () => {
            setLoading(true);
            didSetFormikValues.current = false; // Reset for new load
            try {
                const data = await getDynamicPagesArticleAndSeoBySlug(slug);
                if (data.statusCode === 200 && data.data) {
                    setLoadedData(data.data);
                    setPreviewUrl(
                        data.data.canonicalUrl
                            ? (data.data.canonicalUrl.startsWith("http")
                                ? data.data.canonicalUrl
                                : `https://${data.data.canonicalUrl}`)
                            : `/${slug}`
                    );
                } else {
                    setLoadedData(null);
                    setPreviewUrl(`/${slug}`);
                }
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handlePreview = () => {
        window.open(previewUrl + `/${slug}}`, "_blank");
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

    // Use a real <form> to ensure Formik's onSubmit is always called with latest values
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
                            {loadedData
                                ? `Edit Page: ${slug}`
                                : `Create Page: ${slug}`}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {loadedData
                                ? "Edit page content and SEO settings"
                                : "Create new page with content and SEO"}
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
                    {/* Add "Create New Page" button */}
                    <Button
                        variant="default"
                        // onClick={() => }
                        className="flex items-center space-x-2"
                        type="button"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create New Page</span>
                    </Button>
                </div>
            </div>

            {/* Option to create only content */}

            {/* Form */}
            {/* Wrap the form in a <form> element to ensure onSubmit is always called with latest values */}
            <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
            >
                <SeoAndArticleForm formik={formik} ogImage={ogImage} setOgImage={setOgImage} ogImagePreview={ogImagePreview} setOgImagePreview={setOgImagePreview} setOgImageError={setOgImageError} dragActive={dragActive} fileInputRef={ogFileInputRef} handleChooseImageClick={handleChooseImageClick} handleRemoveImage={handleRemoveImage} handleFileChange={handleFileChange} handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} handleDrop={handleDrop} />
                {/* Hidden submit button for Enter key support */}
                <button
                    type="submit"
                    disabled={saving}
                    className={`
                        w-full mt-6 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200
                        bg-gradient-to-r
                        from-blue-500 via-cyan-500 to-teal-500
                        hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600
                        dark:from-[#0f2027] dark:via-[#2c5364] dark:to-[#203a43]
                        dark:hover:from-[#232526] dark:hover:via-[#414345] dark:hover:to-[#232526]
                        shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400
                        disabled:opacity-60 disabled:cursor-not-allowed
                    `}
                >
                    {saving ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}