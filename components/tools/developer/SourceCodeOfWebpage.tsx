"use client";
import React, { useState } from "react";
import { Home, ChevronRight, Globe, Loader2, Copy } from "lucide-react";
import Link from "next/link";

// Helper: Fetch source code using a CORS proxy if needed
async function fetchSourceCodeWithCorsProxy(url: string): Promise<string> {
    // Try direct fetch first
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                // Don't set User-Agent or other forbidden headers in browser
            },
        });
        if (resp.ok) {
            return await resp.text();
        }
        // If not ok, fall through to proxy
    } catch (e) {
        // Ignore and try proxy
    }

    // Use a public CORS proxy as fallback
    // You can change this proxy if needed
    const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
    const resp = await fetch(proxyUrl);
    if (!resp.ok) {
        throw new Error("Could not fetch source code, even with CORS proxy.");
    }
    return await resp.text();
}

export default function SourceCodeOfWebpage(props: { article?: any, seo?: any }) {
    const [url, setUrl] = useState("");
    const [source, setSource] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Validate URL (basic)
    function isValidUrl(str: string) {
        try {
            const u = new URL(str);
            return u.protocol === "http:" || u.protocol === "https:";
        } catch {
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSource(null);
        setCopied(false);

        if (!isValidUrl(url.trim())) {
            setError("Please enter a valid URL (starting with http:// or https://)");
            return;
        }

        setLoading(true);
        try {
            // Try to fetch source code, fallback to CORS proxy if needed
            const html = await fetchSourceCodeWithCorsProxy(url.trim());
            setSource(html);
        } catch (err: any) {
            setError(
                err?.message ||
                "Could not fetch source code. The website may block direct requests or CORS is not allowed. Try using a CORS proxy or check if the site is public."
            );
        }
        setLoading(false);
    };

    const handleCopy = () => {
        if (source) {
            navigator.clipboard.writeText(source);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
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
                        href="/category/developer-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Developer Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Source Code of Webpage</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* Main column */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            Get Source Code of Webpage
                        </h1>
                        <p className="text-center mb-4 text-gray-700 dark:text-gray-300">
                            Enter a website URL below to fetch and view its HTML source code instantly. This tool works directly from your browser. If you get a CORS error, we will try to fetch using a public CORS proxy.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
                            <div>
                                <label htmlFor="url" className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                                    Website URL
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        id="url"
                                        type="url"
                                        className="flex-1 border-2 border-green-400 dark:border-green-600 rounded px-3 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={e => setUrl(e.target.value)}
                                        required
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50 flex items-center gap-2"
                                        disabled={loading || !url.trim()}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin h-4 w-4" />
                                                Fetching...
                                            </>
                                        ) : (
                                            <>
                                                <Globe className="h-4 w-4" />
                                                Get Source
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                        {error && (
                            <div className="mb-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded p-2">
                                {error}
                            </div>
                        )}
                        {source && (
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Source Code</span>
                                    <button
                                        className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-semibold transition"
                                        onClick={handleCopy}
                                        type="button"
                                    >
                                        <Copy className="h-4 w-4" />
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                                <div
                                    className="overflow-auto border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 p-3 text-xs font-mono text-gray-800 dark:text-gray-100 max-h-[400px]"
                                    style={{ whiteSpace: "pre", wordBreak: "break-all" }}
                                >
                                    {source}
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
}
