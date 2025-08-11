"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const encodeUrl = (url: string) => encodeURIComponent(url);
const decodeUrl = (url: string) => {
    try {
        return decodeURIComponent(url);
    } catch {
        return "Invalid encoding";
    }
};

export default function URLEncodeDecode() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<{ sr: number; result: string }[]>([]);
    const [mode, setMode] = useState<"encode" | "decode" | null>(null);

    const handleEncode = () => {
        const lines = input
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);
        const encoded = lines.map((line, idx) => ({
            sr: idx + 1,
            result: encodeUrl(line),
        }));
        setResults(encoded);
        setMode("encode");
    };

    const handleDecode = () => {
        const lines = input
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);
        const decoded = lines.map((line, idx) => ({
            sr: idx + 1,
            result: decodeUrl(line),
        }));
        setResults(decoded);
        setMode("decode");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        setResults([]);
        setMode(null);
    };

    const handleClear = () => {
        setInput("");
        setResults([]);
        setMode(null);
    };

    const handleCopyResults = () => {
        if (results.length === 0) return;
        const text = results.map(r => r.result).join("\n");
        navigator.clipboard.writeText(text);
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
                    <span className="text-foreground font-medium">Online URL Encode/Decode</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            Online URL Encode/Decode
                        </h1>
                        <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
                            To use Toolinger <b>Online URL Encode/Decode</b>, Paste Urls in the input box given below and click on <b>Encode/Decode</b> Button.
                        </p>
                        <div className="mb-4">
                    <textarea
                        className="w-full border-2 border-green-400 dark:border-green-600 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
                        placeholder="Paste URLs here, one per line"
                        value={input}
                        onChange={handleInputChange}
                        rows={7}
                        spellCheck={false}
                    />
                </div>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                        onClick={handleEncode}
                        disabled={!input.trim()}
                    >
                        Encode
                    </button>
                    <button
                        className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                        onClick={handleDecode}
                        disabled={!input.trim()}
                    >
                        Decode
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400 transition disabled:opacity-50"
                        onClick={handleClear}
                        disabled={!input && results.length === 0}
                    >
                        Clear
                    </button>
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition disabled:opacity-50"
                        onClick={handleCopyResults}
                        disabled={results.length === 0}
                    >
                        Copy Results
                    </button>
                </div>
                {results.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded">
                            <thead>
                                <tr className="bg-green-100 dark:bg-green-900">
                                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">Sr No</th>
                                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(({ sr, result }) => (
                                    <tr key={sr} className="even:bg-gray-50 dark:even:bg-gray-800">
                                        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">{sr}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 break-all">{result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Showing {results.length} {mode === "encode" ? "encoded" : "decoded"} result{results.length > 1 ? "s" : ""}
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

            
        </>
    );
}
