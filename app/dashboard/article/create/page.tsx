"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";
import { Home, Loader2 } from "lucide-react";
import { QuillField } from "@/form/QuillField";
import { ArticleSchema } from "@/schemas/Article.Schema";
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import toast from "react-hot-toast";


interface FormValues {
    slug: string;
    content: string;
    // image?: File | null;
    // imageAlt?: string;
}

interface FormikHelpers {
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
}

export default function CreateArticlePage() {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);



    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm }: FormikHelpers
    ) => {
        setSubmitError(null);
        try {


            const formData = new FormData()
            formData.append("slug", values.slug)
            formData.append("content", values.content)

            const res = await createDynamicPagesArticleAndSeo(formData);

            if (res?.statusCode === 200) {
                toast.success("Article created succesfully");
                resetForm();

                if (typeof window !== "undefined") {
                    const quill = document.querySelector(".ql-editor");
                    if (quill) quill.innerHTML = "";
                }
            } else {
                toast.error(res?.message || "Something went wrong.");
            }

        } catch (error: any) {
            toast.error(error.message || "Failed to create article. Please try again.");
            setSubmitError(error.message);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="p-4 container mx-auto ">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create Article</h1>
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
                        <BreadcrumbLink href="/dashboard/article/manage">
                            Article Management
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Create Article
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Formik
                initialValues={{
                    slug: "",
                    content: "",
                    // image: null,
                    // imageAlt: "",
                }}
                validationSchema={ArticleSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="bg-white dark:bg-gray-900 rounded-lg shadow py-6 flex flex-col gap-6">
                        {/* Slug */}
                        <div>
                            <label htmlFor="slug" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Slug <span className="text-red-500">*</span>
                            </label>
                            <Field
                                name="slug"
                                type="text"
                                placeholder="e.g. contact, home, about-us"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00dbed] focus:border-transparent transition"
                                autoComplete="off"
                            />
                            <ErrorMessage name="slug" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                                <QuillField
                                    value={values.content}
                                    onChange={(val) => setFieldValue("content", val)}
                                />
                            </div>
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Image (optional) */}
                        {/* <div>
                            <label htmlFor="image" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Image (optional)
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="block w-full text-gray-900 dark:text-white"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                                        setFieldValue("image", event.currentTarget.files[0]);
                                    } else {
                                        setFieldValue("image", null);
                                    }
                                }}
                            />
                            {values.image && (
                                <div className="mt-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Selected: {(values.image as File).name}
                                    </span>
                                </div>
                            )}
                        </div> */}

                        {/* Image Alt (optional) */}
                        {/* <div>
                            <label htmlFor="imageAlt" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Image Alt Text (optional)
                            </label>
                            <Field
                                name="imageAlt"
                                type="text"
                                placeholder="Describe the image for accessibility"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00dbed] focus:border-transparent transition"
                                autoComplete="off"
                            />
                            <ErrorMessage name="imageAlt" component="div" className="text-red-500 text-sm mt-1" />
                        </div> */}

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-[#00dbed] text-white font-semibold hover:bg-[#009bbd] transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Create Article
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                        {submitError && (
                            <div className="text-red-500 text-sm mt-2">{submitError}</div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
