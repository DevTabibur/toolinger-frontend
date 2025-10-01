"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const UPSIDE_DOWN_MAP: Record<string, string> = {
    a: "ɐ",
    b: "q",
    c: "ɔ",
    d: "p",
    e: "ǝ",
    f: "ɟ",
    g: "ƃ",
    h: "ɥ",
    i: "ᴉ",
    j: "ɾ",
    k: "ʞ",
    l: "ʃ",
    m: "ɯ",
    n: "u",
    o: "o",
    p: "d",
    q: "b",
    r: "ɹ",
    s: "s",
    t: "ʇ",
    u: "n",
    v: "ʌ",
    w: "ʍ",
    x: "x",
    y: "ʎ",
    z: "z",
    A: "∀",
    B: "𐐒",
    C: "Ɔ",
    D: "p",
    E: "Ǝ",
    F: "Ⅎ",
    G: "פ",
    H: "H",
    I: "I",
    J: "ſ",
    K: "ʞ",
    L: "˥",
    M: "W",
    N: "N",
    O: "O",
    P: "Ԁ",
    Q: "Q",
    R: "ɹ",
    S: "S",
    T: "┴",
    U: "∩",
    V: "Λ",
    W: "M",
    X: "X",
    Y: "⅄",
    Z: "Z",
    0: "0",
    1: "Ɩ",
    2: "ᄅ",
    3: "Ɛ",
    4: "ㄣ",
    5: "ϛ",
    6: "9",
    7: "ㄥ",
    8: "8",
    9: "6",
    ",": "'",
    ".": "˙",
    "?": "¿",
    "!": "¡",
    '"': ",,",
    "'": ",",
    "`": ",",
    "(": ")",
    ")": "(",
    "[": "]",
    "]": "[",
    "{": "}",
    "}": "{",
    "<": ">",
    ">": "<",
    "&": "⅋",
    "_": "‾",
    "^": "v",
    "‿": "⁀",
    "⁅": "⁆",
    "∴": "∵",
    "‖": "∥",
    " ": " ",
};

function flipUpsideDown(str: string) {
    // Flip each character and reverse the string
    return str
        .split("")
        .reverse()
        .map((c) => UPSIDE_DOWN_MAP[c] ?? UPSIDE_DOWN_MAP[c.toLowerCase()] ?? c)
        .join("");
}

function reverseText(str: string) {
    return str.split("").reverse().join("");
}

export default function UpsideDownTextGenerator(props: { article?: any, seo?: any }) {
    const [input, setInput] = useState("");
    const [backwards, setBackwards] = useState(true);
    const [upsideDown, setUpsideDown] = useState(true);
    const [copied, setCopied] = useState(false);

    function getOutput() {
        let out = input;
        if (backwards) out = reverseText(out);
        if (upsideDown) out = flipUpsideDown(out);
        return out;
    }

    function handleCopy() {
        navigator.clipboard.writeText(getOutput());
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
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
                        href="/category/generators"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Generators Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Upside Down Text Converter
                    </span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
                            Upside Down Text Converter
                        </h1>
                        <div className="mb-4">
                            <label
                                htmlFor="udtc-input"
                                className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                            >
                                Enter your text:
                            </label>
                            <textarea
                                id="udtc-input"
                                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows={4}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type or paste your text here..."
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={backwards}
                                    onChange={() => setBackwards((b) => !b)}
                                    className="accent-blue-500"
                                />
                                Reverse text
                            </label>
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={upsideDown}
                                    onChange={() => setUpsideDown((u) => !u)}
                                    className="accent-blue-500"
                                />
                                Upside down
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                                Result:
                            </label>
                            <div className="relative">
                                <textarea
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
                                    rows={4}
                                    value={getOutput()}
                                    readOnly
                                    spellCheck={false}
                                    style={{ fontFamily: "monospace" }}
                                />
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-2 right-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition"
                                    type="button"
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            This tool flips your text upside down and/or reverses it for fun social media posts, nicknames, and more!
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
}
