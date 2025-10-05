"use client";
import React, { useState } from "react";
import { ChevronRight, Home, Trash2 } from "lucide-react";
import Link from "next/link";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";

const otherTools = [
    {
        id: "upside-down-text-generator",
        name: "Upside Down Text Generator",
        description: "Flip text upside down.",
        category: "Generators",
        slug: "upside-down-text-generator",
        categorySlug: "generators",
        icon: "🔄",
        level: "free",
    },
    {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure passwords.",
        category: "Generators",
        slug: "password-generator",
        categorySlug: "generators",
        icon: "🔐",
    },
];

export default function ReverseTextGenerator(props: { article?: any, seo?: any }) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    // Reverse the entire text (character-wise)
    const handleReverseText = () => {
        setOutput(input.split("").reverse().join(""));
    };

    // Reverse the order of words, but not the letters in each word
    const handleReverseWording = () => {
        setOutput(
            input
                .split(/\n/)
                .map((line) =>
                    line
                        .split(" ")
                        .filter((w) => w.length > 0)
                        .reverse()
                        .join(" ")
                )
                .join("\n")
        );
    };

    // Reverse the letters in each word, but keep word order
    const handleReverseEachWord = () => {
        setOutput(
            input
                .split(/\n/)
                .map((line) =>
                    line
                        .split(" ")
                        .map((word) => word.split("").reverse().join(""))
                        .join(" ")
                )
                .join("\n")
        );
    };

    // Copy output to clipboard
    const handleCopy = async () => {
        if (output) {
            await navigator.clipboard.writeText(output);
        }
    };

    // Clear input and output
    const handleClear = () => {
        setInput("");
        setOutput("");
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
                        href="/category/generators"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Generators Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Revers Text Generator
                    </span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-1 text-gray-900 dark:text-gray-100">
                                Reverse Text Generator
                            </h1>
                            <p className="text-center mb-5 text-gray-700 dark:text-gray-300">
                                Enter Text and click <b>Reverse Text</b>. This tool will reverse words and reverse text paragraphs.
                            </p>
                            <div className="mb-4 relative">
                                <textarea
                                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition"
                                    placeholder="Enter your text here"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    rows={7}
                                    spellCheck={false}
                                />
                                {input.length > 0 && (
                                    <button
                                        className="absolute bottom-3 right-3 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"
                                        onClick={handleClear}
                                        aria-label="Clear text"
                                        type="button"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3 justify-center mb-4">
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                                    onClick={handleReverseText}
                                    disabled={!input.trim()}
                                >
                                    Reverse Text
                                </button>
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                                    onClick={handleReverseWording}
                                    disabled={!input.trim()}
                                >
                                    Reverse Wording
                                </button>
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                                    onClick={handleReverseEachWord}
                                    disabled={!input.trim()}
                                >
                                    Reverse Each Word's Lettering
                                </button>
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                                    onClick={handleCopy}
                                    disabled={!output}
                                >
                                    Copy
                                </button>
                            </div>
                            <div>
                                <textarea
                                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition"
                                    placeholder="Output will appear here"
                                    value={output}
                                    readOnly
                                    rows={7}
                                    spellCheck={false}
                                />
                            </div>
                        </div>

                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1">
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
