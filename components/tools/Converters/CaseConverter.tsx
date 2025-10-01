"use client"
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const caseOptions = [
    {
        label: "Sentence case",
        fn: (text: string) =>
            text
                .toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
    },
    {
        label: "lower case",
        fn: (text: string) => text.toLowerCase(),
    },
    {
        label: "UPPER CASE",
        fn: (text: string) => text.toUpperCase(),
    },
    {
        label: "Capitalized Case",
        fn: (text: string) =>
            text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    },
    {
        label: "aLtErNaTiNg cAsE",
        fn: (text: string) =>
            text
                .split("")
                .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
                .join(""),
    },
    {
        label: "Title Case",
        fn: (text: string) =>
            text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    },
    {
        label: "InVeRsE CaSe",
        fn: (text: string) =>
            text
                .split("")
                .map((c) =>
                    c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
                )
                .join(""),
    },
];

const getCharCount = (text: string) => text.length;
const getWordCount = (text: string) =>
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
const getLineCount = (text: string) => text.split(/\r\n|\r|\n/).length;

const buttonClass =
    "px-3 py-1 m-1 rounded transition-colors font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const colorVariants = [
    "bg-green-500 hover:bg-green-600 text-white",
    "bg-blue-500 hover:bg-blue-600 text-white",
    "bg-yellow-500 hover:bg-yellow-600 text-white",
    "bg-purple-500 hover:bg-purple-600 text-white",
    "bg-pink-500 hover:bg-pink-600 text-white",
    "bg-indigo-500 hover:bg-indigo-600 text-white",
    "bg-teal-500 hover:bg-teal-600 text-white",
];

const CaseConverter= (props: { article?: any, seo?: any }) => {
    const [text, setText] = useState("");
    const [theme, setTheme] = useState<"light" | "dark">(
        typeof window !== "undefined" && window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? "dark"
            : "light"
    );

    // Listen for system theme changes
    React.useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const handleCaseChange = (fn: (t: string) => string) => {
        setText(fn(text));
    };

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted-text.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const stats = useMemo(
        () => ({
            charCount: getCharCount(text),
            wordCount: getWordCount(text),
            lineCount: getLineCount(text),
        }),
        [text]
    );

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
                        href="/category/converters"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Converter Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Case Counter</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold mb-4 text-center">Case Converter</h1>
                        <textarea
                            className={`w-full h-40 p-3 mb-4 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
                                    ? "bg-gray-100 text-gray-100 border-gray-700 focus:ring-primary-400"
                                    : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-primary-500"
                                }`}
                            placeholder="Enter or paste your text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            spellCheck={false}
                        />

                        <div className="flex flex-wrap justify-center mb-4">
                            {caseOptions.map((option, idx) => (
                                <button
                                    key={option.label}
                                    className={`${buttonClass} ${colorVariants[idx % colorVariants.length]}`}
                                    onClick={() => handleCaseChange(option.fn)}
                                    type="button"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center mb-4">
                            <button
                                className={`${buttonClass} bg-gray-500 hover:bg-gray-600 text-white`}
                                onClick={handleCopy}
                                type="button"
                            >
                                Copy
                            </button>
                            <button
                                className={`${buttonClass} bg-gray-400 hover:bg-gray-500 text-white`}
                                onClick={handleDownload}
                                type="button"
                            >
                                Download
                            </button>
                            <button
                                className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`}
                                onClick={() => setText("")}
                                type="button"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <div>
                                <span className="font-semibold">Characters:</span> {stats.charCount}
                            </div>
                            <div>
                                <span className="font-semibold">Words:</span> {stats.wordCount}
                            </div>
                            <div>
                                <span className="font-semibold">Lines:</span> {stats.lineCount}
                            </div>
                        </div>

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
};

export default CaseConverter;
