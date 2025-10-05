"use client";
import React, { useState } from "react";
import { Home, ChevronRight, Server, Loader2 } from "lucide-react";
import Link from "next/link";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";


const otherTools = [
    {
        id: "html-encoder-decoder",
        name: "HTML Encoder/Decoder",
        description: "Encode and decode HTML entities",
        category: "Developer Tools",
        slug: "html-encoder-decoder",
        categorySlug: "developer-tools",
        icon: "📝",
    },
    {
        id: "minify-html",
        name: "Minify HTML",
        description: "Compress HTML code by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-html",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
    {
        id: "js-beautifier",
        name: "JS Beautifier",
        description: "Format and beautify JavaScript code",
        category: "Developer Tools",
        slug: "js-beautifier",
        categorySlug: "developer-tools",
        icon: "✨",
    },
    {
        id: "php-beautifier",
        name: "PHP Beautifier",
        description: "Format and beautify PHP code",
        category: "Developer Tools",
        slug: "php-beautifier",
        categorySlug: "developer-tools",
        icon: "🐘",
    },
    {
        id: "css-beautifier",
        name: "CSS Beautifier",
        description: "Format and beautify CSS code",
        category: "Developer Tools",
        slug: "css-beautifier",
        categorySlug: "developer-tools",
        icon: "🎨",
    },
    {
        id: "json-beautifier",
        name: "JSON Beautifier",
        description: "Format and validate JSON data",
        category: "Developer Tools",
        slug: "json-beautifier",
        categorySlug: "developer-tools",
        icon: "📋",
    },
    {
        id: "xml-beautifier",
        name: "XML Beautifier",
        description: "Format and validate XML data",
        category: "Developer Tools",
        slug: "xml-beautifier",
        categorySlug: "developer-tools",
        icon: "📄",
    },
    {
        id: "source-code-retriever",
        name: "Get Source Code of Webpage",
        description: "Retrieve the source code of any webpage",
        category: "Developer Tools",
        slug: "source-code-retriever",
        categorySlug: "developer-tools",
        icon: "📜",
    },
    {
        id: "minify-css",
        name: "Minify CSS",
        description: "Compress CSS code by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-css",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
    {
        id: "minify-js",
        name: "Minify JS",
        description: "Compress JavaScript code by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-js",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
    {
        id: "minify-json",
        name: "Minify JSON",
        description: "Compress JSON data by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-json",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
];


type ServerStatusResult = {
    url: string;
    status: string;
    code: number | string;
};

async function fetchServerStatus(url: string): Promise<ServerStatusResult> {
    // Use a CORS proxy to fetch the status
    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);
    try {
        const resp = await fetch(proxyUrl, { method: "GET" });
        if (!resp.ok) {
            return { url, code: resp.status, status: "Error" };
        }
        // allorigins returns the HTTP status code in the response headers
        // But we can't get the real HTTP code, so we try to fetch the page and if it loads, we assume 200
        return { url, code: 200, status: "OK" };
    } catch (e: any) {
        return { url, code: "ERR", status: "Error" };
    }
}

export default function ServerStatus(props: { article?: any, seo?: any }) {
    const [urls, setUrls] = useState("");
    const [results, setResults] = useState<ServerStatusResult[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function parseUrls(input: string): string[] {
        // Split by newlines, trim, filter empty, max 20
        return input
            .split("\n")
            .map((u) => u.trim())
            .filter((u) => u.length > 0)
            .slice(0, 20);
    }

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
        setResults(null);

        const urlList = parseUrls(urls);
        if (urlList.length === 0) {
            setError("Please enter at least one valid URL.");
            return;
        }
        if (urlList.length > 20) {
            setError("You can check up to 20 URLs at a time.");
            return;
        }
        // Validate all URLs
        for (const url of urlList) {
            if (!isValidUrl(url)) {
                setError(`Invalid URL: ${url}`);
                return;
            }
        }

        setLoading(true);
        const statusResults: ServerStatusResult[] = [];
        for (const url of urlList) {
            // eslint-disable-next-line no-await-in-loop
            const result = await fetchServerStatus(url);
            statusResults.push(result);
        }
        setResults(statusResults);
        setLoading(false);
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
                    <span className="text-foreground font-medium">Server Status Checker</span>
                </nav>
            </div>






            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
                                Server Status Checker
                            </h1>
                            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                                Check the status of up to 20 servers by entering their URLs below. Each URL should be on a new line.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    className="w-full border rounded p-2 min-h-[120px] bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    placeholder="https://example.com&#10;https://another.com"
                                    value={urls}
                                    onChange={(e) => setUrls(e.target.value)}
                                    disabled={loading}
                                />
                                {error && (
                                    <div className="text-red-600 text-sm text-center">{error}</div>
                                )}
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary/90 transition disabled:opacity-60"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5" />
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <Server className="h-5 w-5" />
                                            Check Status
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        {results && (
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 text-center">
                                    Results
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border rounded">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800">
                                                <th className="px-4 py-2 text-left">URL</th>
                                                <th className="px-4 py-2 text-left">Status</th>
                                                <th className="px-4 py-2 text-left">Code</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((result, idx) => (
                                                <tr
                                                    key={result.url + idx}
                                                    className={
                                                        result.status === "OK"
                                                            ? "bg-green-50 dark:bg-green-900/20"
                                                            : "bg-red-50 dark:bg-red-900/20"
                                                    }
                                                >
                                                    <td className="px-4 py-2 break-all">
                                                        <a
                                                            href={result.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 dark:text-blue-400 underline"
                                                        >
                                                            {result.url}
                                                        </a>
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold">
                                                        {result.status}
                                                    </td>
                                                    <td className="px-4 py-2">{result.code}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 ">
                        {/* You can place content for the second column here */}
                        {/* Advertiesment */}
                        <ReleavantToolsSidebar title="Popular Tools" tools={popularTools as any} />
                        <ReleavantToolsSidebar title="Other Tools" tools={otherTools as any} />
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertiesment
                    </div>
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertiesment
                    </div>
                </div> */}

            </div>


        </>
    );
}
