"use client";
import React, { useState } from "react";
import { linkCountChecker } from "@/app/api/AllTools";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const WebsiteLinkCountChecker = (props: { article?: any, seo?: any }) => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await linkCountChecker({ url });
            if (response && response.success) {
                setResult(response.data);
            } else {
                setError(response?.message || "Something went wrong.");
            }
        } catch (err: any) {
            setError("Failed to fetch link data.");
        } finally {
            setLoading(false);
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
                    <span className="text-foreground font-medium">Website Link Count checker</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">Website Link Count checker</h1>


                        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
                            <label
                                htmlFor="url"
                                style={{
                                    display: "block",
                                    fontSize: 12,
                                    color: "#888",
                                    marginBottom: 4,
                                }}
                            >
                                Enter a URL
                            </label>
                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                required
                                style={{
                                    width: "100%",
                                    padding: "8px 10px",
                                    border: "1px solid #e0f4fa",
                                    borderRadius: 3,
                                    marginBottom: 12,
                                    fontSize: 15,
                                    outline: "none",
                                    boxSizing: "border-box",
                                    background: "#fcfeff",
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: "#19c2f7",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 3,
                                    padding: "6px 16px",
                                    fontSize: 14,
                                    cursor: "pointer",
                                    minWidth: 60,
                                }}
                                disabled={loading}
                            >
                                {loading ? "Checking..." : "Submit"}
                            </button>
                        </form>
                        {error && (
                            <div style={{ color: "#d32f2f", marginBottom: 10 }}>{error}</div>
                        )}
                        {result && (
                            <div

                            >
                                <div style={{ marginBottom: 8 }}>
                                    <strong>URL:</strong> {result.url}
                                </div>
                                <div style={{ marginBottom: 4 }}>
                                    <strong>Total Links:</strong> {result.totalLinks}
                                </div>
                                <div style={{ marginBottom: 4 }}>
                                    <strong>Internal Links:</strong> {result.internalLinks}
                                </div>
                                <div>
                                    <strong>External Links:</strong> {result.externalLinks}
                                </div>
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

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {props?.article && (
                                <div
                                    className="prose max-w-none mt-8 "
                                    dangerouslySetInnerHTML={{ __html: props.article }}
                                />
                            )}
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 ">
                        {/* You can place content for the second column here */}
                        {/* Advertiesment */}
                    </div>
                </div>
            </div>

        </>

    );
};

export default WebsiteLinkCountChecker;
