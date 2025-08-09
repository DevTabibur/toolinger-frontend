"use client";
import React, { useState, useRef } from "react";
import { Home, ChevronRight, Copy, Download, Trash2 } from "lucide-react";
import Link from "next/link";

const statBoxStyle =
    "flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-lg p-3";

function getWordCount(text: string) {
    return text.trim().length === 0
        ? 0
        : text
            .replace(/\s+/g, " ")
            .trim()
            .split(" ").length;
}

export default function TextRepeater() {
    const [input, setInput] = useState("");
    const [repeat, setRepeat] = useState(2);
    const [separator, setSeparator] = useState(" ");
    const [output, setOutput] = useState("");
    const [addNewLine, setAddNewLine] = useState(false);
    const [addSpace, setAddSpace] = useState(false);
    const [error, setError] = useState("");
    const outputRef = useRef<HTMLTextAreaElement>(null);

    const handleRepeat = () => {
        setError("");
        if (!input.trim()) {
            setOutput("");
            setError("Please enter some text to repeat.");
            return;
        }
        if (repeat < 1 || repeat > 1000) {
            setError("Repeat time must be between 1 and 1000.");
            return;
        }
        let sep = separator;
        if (addNewLine) sep = "\n";
        else if (addSpace) sep = " ";
        const repeated = Array(repeat).fill(input).join(sep);
        setOutput(repeated);
    };

    const handleCopy = () => {
        if (outputRef.current) {
            outputRef.current.select();
            document.execCommand("copy");
        }
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "repeated-text.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError("");
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
                        href="/category/text-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Text Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Text Repeater</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-1 text-gray-900 dark:text-gray-100">
                            Text Repeater
                        </h1>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Use Propsteos Text repeater to repeat words, text, stickers, or emojis multiple times with just a single click.
                        </p>
                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 items-center mb-3">
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-300 mr-1">Repeat Time</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={1000}
                                    value={repeat}
                                    onChange={e => setRepeat(Number(e.target.value))}
                                    className="border rounded px-2 py-1 w-20 text-sm bg-inherit dark:bg-gray-900 border-zinc-200 dark:border-zinc-700"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600 dark:text-gray-300 mr-1">Separator</label>
                                <input
                                    type="text"
                                    value={separator}
                                    disabled={addNewLine || addSpace}
                                    onChange={e => setSeparator(e.target.value)}
                                    className="border rounded px-2 py-1 w-20 text-sm bg-inherit dark:bg-gray-900 border-zinc-200 dark:border-zinc-700"
                                    placeholder="e.g. ,"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="add-newline"
                                    type="checkbox"
                                    checked={addNewLine}
                                    onChange={e => {
                                        setAddNewLine(e.target.checked);
                                        if (e.target.checked) setAddSpace(false);
                                    }}
                                    className="mr-1"
                                />
                                <label htmlFor="add-newline" className="text-xs text-gray-600 dark:text-gray-300 mr-2">
                                    New Line
                                </label>
                                <input
                                    id="add-space"
                                    type="checkbox"
                                    checked={addSpace}
                                    onChange={e => {
                                        setAddSpace(e.target.checked);
                                        if (e.target.checked) setAddNewLine(false);
                                    }}
                                    className="mr-1"
                                />
                                <label htmlFor="add-space" className="text-xs text-gray-600 dark:text-gray-300">
                                    Space
                                </label>
                            </div>
                            <button
                                className="bg-primary text-white px-4 py-1 rounded hover:bg-primary/90 text-sm"
                                onClick={handleRepeat}
                                type="button"
                            >
                                Repeat
                            </button>
                            <button
                                className="ml-2 text-sm px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                onClick={handleClear}
                                type="button"
                                title="Clear"
                            >
                                <Trash2 className="inline h-4 w-4 mr-1" />
                                Clear
                            </button>
                        </div>
                        {error && (
                            <div className="text-red-500 text-xs mb-2">{error}</div>
                        )}
                        {/* Input */}
                        <div className="mb-4">
                            <textarea
                                className="w-full min-h-[80px] max-h-40 border rounded px-3 py-2 text-sm bg-inherit dark:bg-gray-900 border-zinc-200 dark:border-zinc-700"
                                placeholder="Enter your text here..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                rows={3}
                            />
                        </div>
                        {/* Output */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Output</label>
                            <textarea
                                ref={outputRef}
                                className="w-full min-h-[80px] max-h-40 border rounded px-3 py-2 text-sm bg-inherit dark:bg-gray-900 border-zinc-200 dark:border-zinc-700"
                                value={output}
                                readOnly
                                rows={3}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="flex items-center px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-sm hover:bg-zinc-300 dark:hover:bg-zinc-600"
                                    onClick={handleCopy}
                                    type="button"
                                    disabled={!output}
                                    title="Copy"
                                >
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy
                                </button>
                                <button
                                    className="flex items-center px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-sm hover:bg-zinc-300 dark:hover:bg-zinc-600"
                                    onClick={handleDownload}
                                    type="button"
                                    disabled={!output}
                                    title="Download"
                                >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                </button>
                            </div>
                        </div>
                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 justify-center mt-4">
                            <div className={statBoxStyle}>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Input Length</span>
                                <span className="font-semibold text-lg">{input.length}</span>
                            </div>
                            <div className={statBoxStyle}>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Input Words</span>
                                <span className="font-semibold text-lg">{getWordCount(input)}</span>
                            </div>
                            <div className={statBoxStyle}>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Output Length</span>
                                <span className="font-semibold text-lg">{output.length}</span>
                            </div>
                            <div className={statBoxStyle}>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Output Words</span>
                                <span className="font-semibold text-lg">{getWordCount(output)}</span>
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
