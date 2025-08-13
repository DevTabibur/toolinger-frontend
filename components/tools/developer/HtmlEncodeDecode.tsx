"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// Named HTML entities map (deduplicated and trimmed)
const namedEntities: { [key: string]: string } = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "`": "&#96;",
    "©": "&copy;",
    "®": "&reg;",
    "™": "&trade;",
    "€": "&euro;",
    "£": "&pound;",
    "¥": "&yen;",
    "¢": "&cent;",
    "§": "&sect;",
    "•": "&bull;",
    "…": "&hellip;",
    "–": "&ndash;",
    "—": "&mdash;",
    "±": "&plusmn;",
    "÷": "&divide;",
    "×": "&times;",
    "°": "&deg;",
    "¶": "&para;",
    "µ": "&micro;",
    "·": "&middot;",
    "†": "&dagger;",
    "‡": "&Dagger;",
    "‰": "&permil;",
    "‹": "&lsaquo;",
    "›": "&rsaquo;",
    "‘": "&lsquo;",
    "’": "&rsquo;",
    "‚": "&sbquo;",
    "“": "&ldquo;",
    "”": "&rdquo;",
    "„": "&bdquo;",
    "←": "&larr;",
    "→": "&rarr;",
    "↑": "&uarr;",
    "↓": "&darr;",
    "↔": "&harr;",
    "↵": "&crarr;",
    "♠": "&spades;",
    "♣": "&clubs;",
    "♥": "&hearts;",
    "♦": "&diams;",
    "♭": "&flat;",
    "♯": "&sharp;",
    "♮": "&natural;",
    "♪": "&sung;",
    "♫": "&sung;",
    "☀": "&sun;",
    "☁": "&cloud;",
    "☂": "&umbrella;",
    "☃": "&snowman;",
    "☹": "&frown;",
    "☺": "&smile;",
    "☻": "&blacksmile;",
    "⚡": "&lightning;",
    "⚠": "&warning;",
    "✓": "&check;",
    "✔": "&checkmark;",
    "✗": "&cross;",
    "✘": "&crossmark;",
    "✚": "&plus;",
    "✪": "&star;",
    "✯": "&star2;",
    "✰": "&star3;",
    "✱": "&star4;",
    "✲": "&star5;",
    "✳": "&star6;",
    "✴": "&star7;",
    "✵": "&star8;",
    "✶": "&star9;",
    "✷": "&star10;",
    "✸": "&star11;",
    "✹": "&star12;",
    "✺": "&star13;",
    "✻": "&star14;",
    "✼": "&star15;",
    "✽": "&star16;",
    "✾": "&star17;",
    "✿": "&flower;",
    "❀": "&flower2;",
    "❁": "&flower3;",
    "❂": "&flower4;",
    "❃": "&flower5;",
    "❄": "&snowflake;",
    "❅": "&snowflake2;",
    "❆": "&snowflake3;",
    "❇": "&sparkle;",
};

const encodeHtml = (
    str: string,
    onlyUnsafe: boolean,
    allowNamed: boolean
): string => {
    return str.replace(/[\u00A0-\u9999<>&"'`]/g, (c: string): string => {
        if (onlyUnsafe) {
            const code = c.charCodeAt(0);
            if (
                code >= 32 && code <= 126 && !/[<>&"'`]/.test(c)
            ) {
                return c;
            }
        }
        // Use named references if allowed and available
        if (allowNamed && namedEntities[c]) {
            return namedEntities[c];
        }
        // Otherwise, use numeric entity
        return `&#${c.charCodeAt(0)};`;
    });
};

const decodeHtml = (str: string): string => {
    // Replace named entities
    let decoded = str.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
        if (entity.startsWith("&#")) {
            // Numeric entity
            const code = entity.startsWith("&#x") || entity.startsWith("&#X")
                ? parseInt(entity.replace(/[&#xX;]/g, ""), 16)
                : parseInt(entity.replace(/[&#;]/g, ""), 10);
            return String.fromCharCode(code);
        }
        // Named entity
        const found = Object.entries(namedEntities).find(([, v]) => v === entity);
        return found ? found[0] : entity;
    });
    return decoded;
};

export default function HtmlEncodeDecode() {
    const [decoded, setDecoded] = useState("");
    const [encoded, setEncoded] = useState("");
    const [onlyUnsafe, setOnlyUnsafe] = useState(true);
    const [allowNamed, setAllowNamed] = useState(false);

    // Sync encode/decode dynamically
    const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDecoded(value);
        setEncoded(encodeHtml(value, onlyUnsafe, allowNamed));
    };

    const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setEncoded(value);
        setDecoded(decodeHtml(value));
    };

    // When options change, re-encode
    React.useEffect(() => {
        setEncoded(encodeHtml(decoded, onlyUnsafe, allowNamed));
        // eslint-disable-next-line
    }, [onlyUnsafe, allowNamed]);

    // Copy to clipboard helpers
    const copyToClipboard = (text: string) => {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(text);
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
                        href="/category/developer-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Developer Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium"> HTML String Encoder/Decoder</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-semibold text-center mb-2">
                            Online HTML String Encoder/Decoder
                        </h1>
                        <p className="text-center text-gray-600 mb-6">
                            To use Toolinger <b>Online HTML String Encoder/Decoder</b>, Paste HTML in the box given below.
                        </p>
                        <div className="  shadow p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Decoded */}
                                <div className="flex-1 flex flex-col">
                                    <label className="font-semibold mb-2" htmlFor="decoded">
                                        Decoded:
                                    </label>
                                    <textarea
                                        id="decoded"
                                        className="border border-gray-300 rounded-lg p-3 min-h-[180px] font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={decoded}
                                        onChange={handleDecodedChange}
                                        placeholder="Paste or type your HTML string here..."
                                        spellCheck={false}
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            className="text-md px-3 py-2 bg-cyan-900 hover:bg-cyan-600 text-white  rounded "
                                            type="button"
                                            onClick={() => copyToClipboard(decoded)}
                                            disabled={!decoded}
                                        >
                                            Copy Decoded
                                        </button>
                                    </div>
                                </div>
                                {/* Encoded */}
                                <div className="flex-1 flex flex-col">
                                    <label className="font-semibold mb-2" htmlFor="encoded">
                                        Encoded:
                                    </label>
                                    <textarea
                                        id="encoded"
                                        className="border border-gray-300 rounded-lg p-3 min-h-[180px] font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={encoded}
                                        onChange={handleEncodedChange}
                                        placeholder="Your encoded HTML string will appear here..."
                                        spellCheck={false}
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            className="text-md px-3 py-2 bg-cyan-900 hover:bg-cyan-600 text-white  rounded "
                                            type="button"
                                            onClick={() => copyToClipboard(encoded)}
                                            disabled={!encoded}
                                        >
                                            Copy Encoded
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Options */}
                            <div className="flex flex-col md:flex-row gap-4 mt-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={onlyUnsafe}
                                        onChange={() => setOnlyUnsafe((v) => !v)}
                                        className="accent-blue-500"
                                    />
                                    Encode only unsafe characters
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={allowNamed}
                                        onChange={() => setAllowNamed((v) => !v)}
                                        className="accent-blue-500"
                                    />
                                    Use named HTML entities (when available)
                                </label>
                            </div>
                        </div>
                        <div className="mt-8 text-xs text-gray-500 text-center">
                            <p>
                                This tool encodes/decodes HTML entities for safe web display and editing. Supports both named and numeric entities.
                            </p>
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

