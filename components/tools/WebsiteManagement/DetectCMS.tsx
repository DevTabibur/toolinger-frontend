"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronRight, Home, Loader2, Globe2 } from "lucide-react";
import Link from "next/link";
import { detectCMS } from "@/app/api/AllTools";

// Simple toast for error messages
function showToast(message: string) {
    if (typeof window !== "undefined") {
        const toast = document.createElement("div");
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = "#f87171";
        toast.style.color = "#fff";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "8px";
        toast.style.zIndex = "9999";
        toast.style.fontSize = "1rem";
        toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Helper to render details table
function DetailsTable({ details }: { details: any }) {
    if (!details) return null;

    // If details.headers exists and is an object, flatten it for display
    const rows: { key: string; value: any }[] = [];

    if (details.metaGenerator) {
        rows.push({ key: "Meta Generator", value: details.metaGenerator });
    }
    if (details.headers && typeof details.headers === "object") {
        Object.entries(details.headers).forEach(([k, v]) => {
            rows.push({ key: `Header: ${k}`, value: v });
        });
    }

    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded text-sm">
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {row.key}
                            </td>
                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100 break-all">
                                {typeof row.value === "string" ? row.value : JSON.stringify(row.value)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function DetectCMS() {
    const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
    const [cmsResult, setCmsResult] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        values: { url: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setLoading(true);
        setCmsResult(null);
        setSubmittedUrl(values.url);
        try {
            const payload = { url: values.url };
            const res = await detectCMS(payload);

            // Expecting API response shape as described in the prompt
            if (res && res.success && res.data) {
                setCmsResult(res.data);
            } else if (res && res.message) {
                setCmsResult({ error: res.message });
                showToast(res.message);
            } else {
                setCmsResult({ error: "CMS could not be detected." });
                showToast("CMS could not be detected.");
            }
        } catch (error: any) {
            setCmsResult({ error: error?.message || "Unknown error" });
            showToast("Unknown error occurred. Please try again.");
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary flex items-center"
                    >
                        <Home className="h-4 w-4 mr-1" />
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <Link
                        href="/category/website-management"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Website Management
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">CMS Checker</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* Main tool column */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-bold text-center mb-2">
                             CMS Checker
                        </h2>
                        <p className="text-center text-muted-foreground mb-6 text-sm">
                            Enter a website URL below to detect which CMS (Content Management System) is used to build that site.
                        </p>
                        <Formik
                            initialValues={{ url: "" }}
                            validationSchema={Yup.object({
                                url: Yup.string()
                                    .url("Enter a valid URL (including https://)")
                                    .required("URL is required"),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, touched, errors }) => (
                                <Form>
                                    <div className="bg-muted dark:bg-cyan-100 rounded flex items-center px-0 py-4 mb-6">
                                        <div className="flex items-center justify-center h-full px-4">
                                            <span className="bg-primary rounded w-8 h-8 flex items-center justify-center">
                                                <Globe2 className="text-white w-5 h-5" />
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <Field
                                                name="url"
                                                type="url"
                                                placeholder="https://example.com/"
                                                className={`w-full bg-transparent outline-none border-0 focus:ring-0 text-base px-2 py-2 ${errors.url && touched.url
                                                        ? "text-destructive"
                                                        : "text-foreground"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        name="url"
                                        component="div"
                                        className="text-destructive text-xs mb-2 text-center"
                                    />
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || loading}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center"
                                        >
                                            {loading && (
                                                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                            )}
                                            Detect CMS
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {/* Optionally show submitted URL */}
                        {submittedUrl && (
                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                <span>
                                    Submitted URL: <span className="font-medium">{submittedUrl}</span>
                                </span>
                            </div>
                        )}
                        {/* Show result */}
                        {cmsResult && (
                            <div className="mt-6 text-center">
                                {cmsResult.error ? (
                                    <div className="text-destructive font-medium">
                                        {cmsResult.error}
                                    </div>
                                ) : (
                                    <div className="inline-block bg-emerald-50 dark:bg-emerald-900 rounded px-6 py-4 shadow text-center w-full max-w-2xl">
                                        <div className="text-lg font-semibold mb-2 text-emerald-700 dark:text-emerald-300">
                                            {cmsResult.detectedCMS
                                                ? `Detected CMS: ${cmsResult.detectedCMS}`
                                                : "CMS could not be detected"}
                                        </div>
                                        {cmsResult.url && (
                                            <div className="text-xs text-muted-foreground mb-2">
                                                URL: <span className="font-medium">{cmsResult.url}</span>
                                            </div>
                                        )}
                                        {cmsResult.timestamp && (
                                            <div className="text-xs text-muted-foreground mb-2">
                                                Timestamp: <span className="font-medium">{new Date(cmsResult.timestamp).toLocaleString()}</span>
                                            </div>
                                        )}
                                        <DetailsTable details={cmsResult.details} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        {/* You can place content for the second column here */}
                        Advertiesment
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertiesment
                    </div>
                    {/* Second column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertiesment
                    </div>
                </div>
            </div>
        </>
    );
}
