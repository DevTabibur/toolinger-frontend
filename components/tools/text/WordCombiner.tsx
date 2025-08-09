"use client";
import React, { useState, useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const separatorOptions = [
    { label: "Nothing", value: "" },
    { label: "Space", value: " " },
    { label: "+", value: "+" },
    { label: "-", value: "-" },
    { label: ".", value: "." },
    { label: ",", value: "," },
];

const wrapOptions = [
    { label: "Nothing", value: "" },
    { label: '""', value: '"' },
    { label: "0", value: "0" },
    { label: "''", value: "'" },
    { label: "[]", value: "[]" },
];

function combineWords(
    words: string[],
    allowDoubles: boolean,
    shuffle: boolean,
    separator: string,
    wrap: string
): string[] {
    let combinations: string[] = [];
    if (words.length < 2) return [];

    // Helper to wrap a word
    const wrapWord = (word: string) => {
        if (wrap === "") return word;
        if (wrap === "[]") return `[${word}]`;
        if (wrap === "0") return `0${word}0`;
        return `${wrap}${word}${wrap}`;
    };

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (!allowDoubles && i === j) continue;
            let first = wrapWord(words[i]);
            let second = wrapWord(words[j]);
            combinations.push(first + separator + second);
        }
    }

    if (shuffle) {
        // Fisher-Yates shuffle
        for (let i = combinations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
        }
    }

    return combinations;
}

export default function WordCombiner() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string[]>([]);
    const [allowDoubles, setAllowDoubles] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const [separator, setSeparator] = useState("");
    const [wrap, setWrap] = useState("");
    const outputRef = useRef<HTMLTextAreaElement>(null);

    const handleCombine = () => {
        const words = input
            .split("\n")
            .map(w => w.trim())
            .filter(Boolean);
        const result = combineWords(words, allowDoubles, shuffle, separator, wrap);
        setOutput(result);
    };

    const handleCopy = () => {
        if (outputRef.current) {
            outputRef.current.select();
            document.execCommand("copy");
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput([]);
    };

    const handleDownload = () => {
        const blob = new Blob([output.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "word-combinations.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    // For light/dark mode, use Tailwind classes
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
                    <span className="text-foreground font-medium">Word Combiner</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            Word Combiner
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                            To use prepostseo <b>Word Combiner</b>, type your keywords in the box and press <b>Combine</b> (one word on each line)
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
                            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Type your keywords in the box and press Combine! (one word on each line)
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Input Words
                                    </label>
                                    <textarea
                                        className="w-full h-40 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Enter one word per line"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                            onClick={handleCombine}
                                        >
                                            Combine
                                        </button>
                                        <button
                                            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                            onClick={handleClear}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Options
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="allowDoubles"
                                                checked={allowDoubles}
                                                onChange={e => setAllowDoubles(e.target.checked)}
                                            />
                                            <label htmlFor="allowDoubles" className="text-sm">
                                                Allow doubles (e.g. word1 + word1)
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="shuffle"
                                                checked={shuffle}
                                                onChange={e => setShuffle(e.target.checked)}
                                            />
                                            <label htmlFor="shuffle" className="text-sm">
                                                Shuffle output
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm" htmlFor="separator">
                                                Separator:
                                            </label>
                                            <select
                                                id="separator"
                                                className="rounded border p-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                value={separator}
                                                onChange={e => setSeparator(e.target.value)}
                                            >
                                                {separatorOptions.map(opt => (
                                                    <option key={opt.label} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm" htmlFor="wrap">
                                                Wrap:
                                            </label>
                                            <select
                                                id="wrap"
                                                className="rounded border p-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                value={wrap}
                                                onChange={e => setWrap(e.target.value)}
                                            >
                                                {wrapOptions.map(opt => (
                                                    <option key={opt.label} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                    Output
                                </label>
                                <textarea
                                    ref={outputRef}
                                    className="w-full h-40 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                    value={output.join("\n")}
                                    readOnly
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className={classNames(
                                            "px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition",
                                            { "opacity-50 cursor-not-allowed": output.length === 0 }
                                        )}
                                        onClick={handleCopy}
                                        disabled={output.length === 0}
                                    >
                                        Copy
                                    </button>
                                    <button
                                        className={classNames(
                                            "px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition",
                                            { "opacity-50 cursor-not-allowed": output.length === 0 }
                                        )}
                                        onClick={handleDownload}
                                        disabled={output.length === 0}
                                    >
                                        Download
                                    </button>
                                </div>
                                {output.length > 0 && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        {output.length} combinations generated.
                                    </div>
                                )}
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
