"use client";
import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function KeywordsByTotalWordRatio(props: { article?: any, seo?: any }) {
    const [text, setText] = useState("");
    const [keyword, setKeyword] = useState("");
    const [ratio, setRatio] = useState<number | null>(null);
    const [keywordCount, setKeywordCount] = useState<number>(0);
    const [totalWords, setTotalWords] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    function countWords(str: string) {
        return str.trim().split(/\s+/).filter(Boolean).length;
    }

    function countKeyword(str: string, keyword: string) {
        if (!keyword.trim()) return 0;
        // Case-insensitive, whole word match
        const regex = new RegExp(`\\b${keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
        return (str.match(regex) || []).length;
    }

    function handleCalculate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!text.trim()) {
            setError("Please enter your content.");
            setRatio(null);
            return;
        }
        if (!keyword.trim()) {
            setError("Please enter a keyword to check.");
            setRatio(null);
            return;
        }
        const words = countWords(text);
        const kwCount = countKeyword(text, keyword);
        setTotalWords(words);
        setKeywordCount(kwCount);
        if (words === 0) {
            setError("No words found in your content.");
            setRatio(null);
            return;
        }
        setRatio(Number(((kwCount / words) * 100).toFixed(2)));
    }

    // Light/dark mode support via Tailwind
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
                        href="/category/text-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Text Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Keywords By Total words Ratio</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
                            Keywords By Total words Ratio
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                            Copy And paste your text below to find out Ratio between keywords and total words
                        </p>
                        <form
                            onSubmit={handleCalculate}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6"
                        >
                            <div className="flex flex-col md:flex-row gap-0">
                                {/* Left: "A" box */}
                                <div className="flex flex-col items-center justify-center bg-green-500 dark:bg-green-600 rounded-l-lg md:rounded-l-lg md:rounded-tr-none md:rounded-br-none md:rounded-bl-lg md:rounded-tl-lg w-full md:w-12 min-w-[48px] py-2 md:py-0">
                                    <span className="text-white text-lg font-bold select-none">A</span>
                                </div>
                                {/* Textarea */}
                                <textarea
                                    className={classNames(
                                        "flex-1 min-h-[120px] max-h-[300px] border-t border-b border-r border-gray-200 dark:border-gray-700 rounded-r-lg md:rounded-l-none p-3 text-gray-900 dark:text-gray-100 dark:bg-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition",
                                        "w-full"
                                    )}
                                    placeholder="Paste or type your content here..."
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 mt-4 items-center">
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition"
                                    placeholder="Enter keyword (case-insensitive, e.g. SEO)"
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
                                >
                                    Calculate
                                </button>
                            </div>
                            {error && (
                                <div className="mt-4 text-red-600 dark:text-red-400 text-center">
                                    {error}
                                </div>
                            )}
                        </form>
                        {ratio !== null && !error && (
                            <div className="bg-green-50 dark:bg-green-900 rounded-lg shadow p-4 text-center">
                                <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                                    Keyword: <span className="font-mono">{keyword}</span>
                                </div>
                                <div className="text-gray-800 dark:text-gray-100 mb-1">
                                    Occurrences: <span className="font-bold">{keywordCount}</span>
                                </div>
                                <div className="text-gray-800 dark:text-gray-100 mb-1">
                                    Total Words: <span className="font-bold">{totalWords}</span>
                                </div>
                                <div className="text-xl font-bold text-green-700 dark:text-green-300 mt-2">
                                    Ratio: <span>{ratio}%</span>
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
                                    dangerouslySetInnerHTML={{ __html: props?.article || ""}}
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
