"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const FONT_FAMILIES = [
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Calibri", value: "Calibri, sans-serif" },
    { name: "Comic Sans", value: "'Comic Sans MS', cursive, sans-serif" },
    { name: "Courier", value: "'Courier New', Courier, monospace" },
    { name: "Verdana", value: "Verdana, Geneva, sans-serif" },
    { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
];

const FONT_SIZES = [9, 10, 11, 12, 13, 14];

const SPACING_OPTIONS = [
    { label: "Single", value: 1 },
    { label: "1.5", value: 1.5 },
    { label: "Double", value: 2 },
];

// Average words per page for different font/size/spacing combos (approximate, for A4, 1-inch margin)
const WORDS_PER_PAGE_TABLE: Record<string, number> = {
    // Format: font-family|font-size|spacing
    "Arial|12|1": 500,
    "Arial|12|1.5": 333,
    "Arial|12|2": 250,
    "Arial|14|1": 420,
    "Arial|14|1.5": 280,
    "Arial|14|2": 210,
    "Calibri|12|1": 510,
    "Calibri|12|1.5": 340,
    "Calibri|12|2": 255,
    "Calibri|14|1": 430,
    "Calibri|14|1.5": 287,
    "Calibri|14|2": 215,
    "Comic Sans|12|1": 470,
    "Comic Sans|12|1.5": 313,
    "Comic Sans|12|2": 235,
    "Comic Sans|14|1": 390,
    "Comic Sans|14|1.5": 260,
    "Comic Sans|14|2": 195,
    "Courier|12|1": 400,
    "Courier|12|1.5": 267,
    "Courier|12|2": 200,
    "Courier|14|1": 340,
    "Courier|14|1.5": 227,
    "Courier|14|2": 170,
    "Verdana|12|1": 480,
    "Verdana|12|1.5": 320,
    "Verdana|12|2": 240,
    "Verdana|14|1": 400,
    "Verdana|14|1.5": 267,
    "Verdana|14|2": 200,
    "Times New Roman|12|1": 550,
    "Times New Roman|12|1.5": 367,
    "Times New Roman|12|2": 275,
    "Times New Roman|14|1": 460,
    "Times New Roman|14|1.5": 307,
    "Times New Roman|14|2": 230,
};

function getWordsPerPage(fontFamily: string, fontSize: number, spacing: number) {
    // Try to find the closest match, fallback to Arial 12 single
    const key = `${fontFamily}|${fontSize}|${spacing}`;
    if (WORDS_PER_PAGE_TABLE[key]) return WORDS_PER_PAGE_TABLE[key];
    // Try with 12pt if not found
    const fallbackKey = `${fontFamily}|12|${spacing}`;
    if (WORDS_PER_PAGE_TABLE[fallbackKey]) return WORDS_PER_PAGE_TABLE[fallbackKey];
    return 500; // default
}

function countWords(text: string) {
    return text.trim().length === 0
        ? 0
        : text.trim().split(/\s+/).length;
}

function countCharacters(text: string) {
    return text.length;
}

export default function WordsToPages() {
    // Theme
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Inputs
    const [wordInput, setWordInput] = useState<string>("");
    const [textInput, setTextInput] = useState<string>("");
    const [fontFamily, setFontFamily] = useState(FONT_FAMILIES[3].name); // Default: Courier
    const [fontSize, setFontSize] = useState<number>(12);
    const [spacing, setSpacing] = useState<number>(1);

    // Derived values
    const wordCount = wordInput
        ? parseInt(wordInput.replace(/[^0-9]/g, ""), 10) || 0
        : countWords(textInput);

    const charCount = textInput ? countCharacters(textInput) : 0;

    const wordsPerPage = getWordsPerPage(fontFamily, fontSize, spacing);
    const pageCount = wordsPerPage > 0 ? (wordCount / wordsPerPage) : 0;

    // Handlers
    function handleWordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setWordInput(e.target.value);
        setTextInput("");
    }

    function handleTextInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextInput(e.target.value);
        setWordInput("");
    }

    function handleFontFamilyChange(e: React.ChangeEvent<HTMLButtonElement>) {
        setFontFamily(e.currentTarget.value);
    }

    function handleFontSizeChange(e: React.ChangeEvent<HTMLButtonElement>) {
        setFontSize(Number(e.currentTarget.value));
    }

    function handleSpacingChange(e: React.ChangeEvent<HTMLButtonElement>) {
        setSpacing(Number(e.currentTarget.value));
    }

    function handleClear() {
        setWordInput("");
        setTextInput("");
    }

    // For tab-like button styling
    function tabButton(active: boolean) {
        return classNames(
            "px-3 py-1 border rounded border-gray-300 text-sm font-medium mr-1 mb-1",
            {
                "bg-blue-100 border-blue-500 text-blue-700": active,
                "bg-white hover:bg-gray-100": !active,
            }
        );
    }

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
                    <span className="text-foreground font-medium">Word To Pages</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">Word To Pages</h1>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Words to Pages Converter</h2>
                            </div>

                            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Number of words</label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="w-full border rounded px-2 py-1 mb-1"
                                        value={wordInput}
                                        onChange={handleWordInputChange}
                                        placeholder="3"
                                    />
                                    <div className="text-xs text-gray-500">
                                        {wordInput && !isNaN(Number(wordInput)) && (
                                            <>
                                                {wordInput} words, if calculated based on average length of a word in English.
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Paste text</label>
                                    <textarea
                                        className="w-full border rounded px-2 py-1"
                                        rows={5}
                                        value={textInput}
                                        onChange={handleTextInputChange}
                                        placeholder="Paste or type your text here"
                                    />
                                    <div className="flex items-center justify-between mt-1">
                                        <button
                                            className="text-xs px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                            onClick={handleClear}
                                            type="button"
                                        >
                                            Clear
                                        </button>
                                        <div className="text-xs text-gray-500 ml-2">
                                            {charCount} characters
                                            {textInput && (
                                                <>
                                                    {" "}
                                                    (
                                                    {textInput.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").length}
                                                    {" without punctuation or spaces"}
                                                    )
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Font Family */}
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Font Family</label>
                                <div className="flex flex-wrap gap-1">
                                    {FONT_FAMILIES.map(f => (
                                        <button
                                            key={f.name}
                                            value={f.name}
                                            className={tabButton(fontFamily === f.name)}
                                            style={{ fontFamily: f.value }}
                                            onClick={handleFontFamilyChange as any}
                                            type="button"
                                        >
                                            {f.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Font Size */}
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Font size</label>
                                <div className="flex flex-wrap gap-1">
                                    {FONT_SIZES.map(size => (
                                        <button
                                            key={size}
                                            value={size}
                                            className={tabButton(fontSize === size)}
                                            onClick={handleFontSizeChange as any}
                                            type="button"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Spacing */}
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Spacing</label>
                                <div className="flex flex-wrap gap-1">
                                    {SPACING_OPTIONS.map(opt => (
                                        <button
                                            key={opt.value}
                                            value={opt.value}
                                            className={tabButton(spacing === opt.value)}
                                            onClick={handleSpacingChange as any}
                                            type="button"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Result */}
                            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 text-center mt-6">
                                <div className="text-lg font-semibold mb-2">
                                    Result
                                </div>
                                <div className="flex flex-col items-center justify-center mb-2">
                                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                        {pageCount > 0 ? pageCount.toFixed(1) : "0.0"}
                                    </span>
                                    <span className="text-lg text-gray-700 dark:text-gray-300">
                                        pages
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">
                                        {pageCount > 0 && (
                                            <>
                                                {Math.ceil(pageCount)} sheet{Math.ceil(pageCount) === 1 ? "" : "s"}
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {wordCount} words &middot; {wordsPerPage} words/page
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    <span>
                                        Font: <span className="font-semibold">{fontFamily}</span>
                                        {" | "}
                                        Size: <span className="font-semibold">{fontSize} pt</span>
                                        {" | "}
                                        Spacing: <span className="font-semibold">
                                            {SPACING_OPTIONS.find(opt => opt.value === spacing)?.label}
                                        </span>
                                    </span>
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
