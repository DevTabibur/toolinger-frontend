"use client";
import React, { useState } from "react";
import { Check, ChevronRight, Copy, Home } from "lucide-react";
import Link from "next/link";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";


const otherTools = [
    {
        id: "reverse-text-generator",
        name: "Reverse Text Generator",
        description: "Reverse the text input.",
        category: "Generators",
        slug: "reverse-text-generator",
        categorySlug: "generators",
        icon: "🔄",
      },
    {
        id: "upside-down-text-generator",
        name: "Upside Down Text Generator",
        description: "Flip text upside down.",
        category: "Generators",
        slug: "upside-down-text-generator",
        categorySlug: "generators",
        icon: "🔄",
    },
    
];


const PASSWORD_OPTIONS = [
    {
        label: "Small Letters (a...z)",
        value: "lowercase",
        chars: "abcdefghijklmnopqrstuvwxyz",
    },
    {
        label: "Capital Letters (A...Z)",
        value: "uppercase",
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
        label: "Digits (0...9)",
        value: "digits",
        chars: "0123456789",
    },
    {
        label: "Special characters(!,*,+,1,2...)", // as in image
        value: "special",
        chars: "!@#$%^&*()_+-=[]{},.<>?/|",
    },
];

function generatePassword(length: number, options: string[]) {
    let chars = "";
    PASSWORD_OPTIONS.forEach((opt) => {
        if (options.includes(opt.value)) chars += opt.chars;
    });
    if (!chars) return "";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

export default function PasswordGenerator(props: { article?: any, seo?: any }) {
    const [length, setLength] = useState(5);
    const [selected, setSelected] = useState<string[]>(["lowercase"]);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCheckbox = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleGenerate = () => {
        setPassword(generatePassword(length, selected));
        setCopied(false);
    };

    const handleCopy = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
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
                        href="/category/generators"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Generators Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Password Generator
                    </span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-2">
                                Password Generator
                            </h2>
                            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                                To use toolinger <b>Password Generator</b>, choose option below and click <b>generate password</b> button.
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Length of Password
                                </label>
                                <select
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-4"
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                >
                                    {[...Array(15)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                                <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
                                    Select one of the checkboxes:
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {PASSWORD_OPTIONS.map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(opt.value)}
                                                onChange={() => handleCheckbox(opt.value)}
                                                className="accent-blue-500"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded transition"
                                        onClick={handleGenerate}
                                        type="button"
                                        disabled={selected.length === 0}
                                    >
                                        Generate Password
                                    </button>
                                </div>

                            </div>
                            {password && (
                                <div className="flex flex-col items-center mb-4">
                                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-4 py-2 mb-2 w-full max-w-md">
                                        <span className="flex-1 text-lg font-mono text-gray-900 dark:text-gray-100 break-all">{password}</span>
                                        <button
                                            onClick={handleCopy}
                                            className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                            type="button"
                                            aria-label="Copy password"
                                        >
                                            {copied ? (
                                                <Check className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <Copy className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    {copied && (
                                        <span className="text-emerald-600 dark:text-emerald-400 text-sm mt-1">Copied!</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1">
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