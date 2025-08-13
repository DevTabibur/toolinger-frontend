"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const sampleText = "Hello";
const sampleHex = "48656c6c6f";

// Helper: Text string to hex string
function textToHex(str: string): string {
    return str
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
}

// Helper: Hex string to text string
function hexToText(hex: string): string {
    return hex
        .replace(/[^0-9a-fA-F]/g, "")
        .replace(/(.{2})/g, "$1 ")
        .trim()
        .split(" ")
        .map((h) => String.fromCharCode(parseInt(h, 16)))
        .join("");
}

const buttonClass =
    "w-full px-4 py-2 mb-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400 bg-emerald-500 hover:bg-emerald-600 text-white";

export default function TextToHex() {
    const [leftValue, setLeftValue] = useState("");
    const [rightValue, setRightValue] = useState("");
    const [leftType, setLeftType] = useState<"text" | "hex">("text");

    // Theme detection for light/dark mode
    const [theme, setTheme] = useState<"light" | "dark">(
        typeof window !== "undefined" && window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? "dark"
            : "light"
    );
    React.useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Convert left to right
    const handleToHex = () => {
        setRightValue(textToHex(leftValue));
        setLeftType("text");
    };
    const handleToText = () => {
        setRightValue(hexToText(leftValue));
        setLeftType("hex");
    };

    // Handle textarea change
    const handleLeftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLeftValue(e.target.value);
        setRightValue("");
    };

    // Load sample data
    const handleLoadSample = () => {
        setLeftValue(sampleText);
        setRightValue(textToHex(sampleText));
        setLeftType("text");
    };

    // Clear both
    const handleClear = () => {
        setLeftValue("");
        setRightValue("");
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
                        href="/category/converters"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Converters Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Text to Hex converter</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <div>
                            <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                                Text to Hex converter
                            </h1>
                            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                                To use prepost <b>Text to Hex</b> Converter, Enter the text below
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                {/* Left Side: Input */}
                                <div className="flex-1 w-full">
                                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                                        {leftType === "text" ? "Text Input" : "Hex Input"}
                                    </label>
                                    <textarea
                                        className="w-full h-40 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 resize-none"
                                        placeholder={leftType === "text" ? "Enter text..." : "Enter Hex (e.g. 48656c6c6f)"}
                                        value={leftValue}
                                        onChange={handleLeftChange}
                                        spellCheck={false}
                                    />
                                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                        <button
                                            className={buttonClass}
                                            onClick={handleToHex}
                                            disabled={leftType === "text" && leftValue.trim() === ""}
                                        >
                                            Convert to Hex
                                        </button>
                                        <button
                                            className={buttonClass}
                                            onClick={handleToText}
                                            disabled={leftType === "hex" && leftValue.trim() === ""}
                                        >
                                            Convert to Text
                                        </button>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                        <button
                                            className="w-full px-4 py-2 mb-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
                                            onClick={handleLoadSample}
                                        >
                                            Load Sample
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 mb-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400 bg-red-500 hover:bg-red-600 text-white"
                                            onClick={handleClear}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                                {/* Right Side: Output */}
                                <div className="flex-1 w-full">
                                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                                        {leftType === "text" ? "Hex Output" : "Text Output"}
                                    </label>
                                    <textarea
                                        className="w-full h-40 p-3 border rounded bg-gray-100 dark:bg-gray-950 dark:text-gray-100 resize-none"
                                        value={rightValue}
                                        readOnly
                                        placeholder={leftType === "text" ? "Hex output will appear here..." : "Text output will appear here..."}
                                        spellCheck={false}
                                    />
                                </div>
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
        </>
    );
}