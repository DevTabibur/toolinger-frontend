"use client"
import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const sampleAscii = "72,101";
const sampleText = "He";

function asciiToText(ascii: string): string {
    // Split by comma or whitespace, filter out empty, convert to chars
    return ascii
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(num => {
            const n = parseInt(num, 10);
            return isNaN(n) ? "" : String.fromCharCode(n);
        })
        .join("");
}

function textToAscii(text: string): string {
    // Convert each char to ASCII, join with commas
    return text
        .split("")
        .map(char => char.charCodeAt(0))
        .join(",");
}

export default function ASCIIToTextConverter(props: { article?: any, seo?: any }) {
    const [leftValue, setLeftValue] = useState("");
    const [rightValue, setRightValue] = useState("");
    const [leftType, setLeftType] = useState<"ascii" | "text">("ascii");

    // For night/light mode, use Tailwind classes
    // leftType === "ascii" means left is ASCII, right is text
    // leftType === "text" means left is text, right is ASCII

    const handleToText = () => {
        setRightValue(asciiToText(leftValue));
        setLeftType("ascii");
    };

    const handleToAscii = () => {
        setRightValue(textToAscii(leftValue));
        setLeftType("text");
    };

    const handleLeftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLeftValue(e.target.value);
        setRightValue("");
    };

    const handleLoadSample = () => {
        setLeftValue(sampleAscii);
        setRightValue(asciiToText(sampleAscii));
        setLeftType("ascii");
    };

    // For line count
    const lineCount = leftValue.split("\n").length;

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
                    <span className="text-foreground font-medium">Text to ASCII  Converter</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            Text to ASCII Converter
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                            To use toolinger <b>Text to ASCII Converter</b>, enter the text in the text box below.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 md:p-6 max-w-3xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                {/* Left textarea */}
                                <div className="flex-1 w-full flex flex-col">
                                    <button
                                        className="mb-2 px-2 py-1 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition self-start"
                                        onClick={handleLoadSample}
                                        type="button"
                                    >
                                        + Load Sample Data
                                    </button>
                                    <textarea
                                        className="w-full h-40 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
                                        value={leftValue}
                                        onChange={handleLeftChange}
                                        placeholder={leftType === "ascii" ? "Enter ASCII codes (comma or space separated)" : "Enter text"}
                                    />
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                                        Lines: {lineCount}
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <button
                                        className={classNames(
                                            "px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition text-sm font-semibold",
                                            { "opacity-50 cursor-not-allowed": !leftValue.trim() }
                                        )}
                                        onClick={handleToText}
                                        disabled={!leftValue.trim()}
                                        type="button"
                                    >
                                        To Text &rarr;
                                    </button>
                                    <button
                                        className={classNames(
                                            "px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition text-sm font-semibold",
                                            { "opacity-50 cursor-not-allowed": !leftValue.trim() }
                                        )}
                                        onClick={handleToAscii}
                                        disabled={!leftValue.trim()}
                                        type="button"
                                    >
                                        &larr; To ASCII
                                    </button>
                                </div>
                                {/* Right textarea */}
                                <div className="flex-1 w-full flex flex-col">
                                    <textarea
                                        className="w-full h-40 p-2 border rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
                                        value={rightValue}
                                        readOnly
                                        placeholder={leftType === "ascii" ? "Text output" : "ASCII output"}
                                    />
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                                        Output
                                    </div>
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
