"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";


const otherTools = [
    {
        id: "rgb-to-hex",
        name: "RGB to Hex Converter",
        description: "Convert RGB colors to hexadecimal format",
        category: "Converters",
        slug: "rgb-to-hex",
        categorySlug: "converters",
        icon: "🎨",
    },
    {
        id: "hex-to-rgb",
        name: "Hex to RGB Converter",
        description: "Convert hexadecimal colors to RGB format",
        category: "Converters",
        slug: "hex-to-rgb",
        categorySlug: "converters",
        icon: "🌈",
    },
    {
        id: "currency-converter",
        name: "Currency Converter",
        description: "Convert between different currencies",
        category: "Converters",
        slug: "currency-converter",
        categorySlug: "converters",
        icon: "💱",
    },
    {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between various units of measurement",
        category: "Converters",
        slug: "unit-converter",
        categorySlug: "converters",
        icon: "📏",
    },
    {
        id: "decimal-to-octal",
        name: "Decimal to Octal",
        description: "Convert decimal numbers to octal format",
        category: "Converters",
        slug: "decimal-to-octal",
        categorySlug: "converters",
        icon: "🔢",
    },


    {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text between different cases",
        category: "Converters",
        slug: "case-converter",
        categorySlug: "converters",
        icon: "🔠",
    },
    {
        id: "ascii-to-hex",
        name: "ASCII to Hex Converter",
        description: "Convert ASCII characters to hexadecimal format",
        category: "Converters",
        slug: "ascii-to-hex",
        categorySlug: "converters",
        icon: "🔡",
    },

];


const sampleData = "127";

// Helper to convert normal digits to superscript for exponents
function toSuperscript(num: number) {
    const superscriptDigits: { [key: string]: string } = {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
        "-": "⁻",
    };
    return String(num)
        .split("")
        .map((d) => superscriptDigits[d] || d)
        .join("");
}

function isValidOctal(str: string) {
    // Allow negative numbers, but only digits 0-7
    return /^-?[0-7]+$/.test(str.trim());
}

function convertOctal(octalStr: string) {
    let trimmed = octalStr.trim();
    if (!isValidOctal(trimmed)) {
        return {
            decimal: "",
            hex: "",
            calculation: "",
            error: "Enter a valid octal number (digits 0-7 only).",
        };
    }
    let negative = false;
    if (trimmed.startsWith("-")) {
        negative = true;
        trimmed = trimmed.slice(1);
    }
    let decimal = 0;
    let octalDigits: number[] = [];
    for (let i = 0; i < trimmed.length; i++) {
        octalDigits.push(parseInt(trimmed[i], 10));
    }
    // Calculate decimal value and build calculation parts
    let calculationParts: string[] = [];
    let len = octalDigits.length;
    for (let i = 0; i < len; i++) {
        const digit = octalDigits[i];
        const power = len - 1 - i;
        calculationParts.push(`(${digit} × 8${toSuperscript(power)})`);
        decimal += digit * Math.pow(8, power);
    }
    if (negative) decimal = -decimal;

    // Build calculation string: e.g. 127 = (1 × 8²) + (2 × 8¹) + (7 × 8⁰) = 87
    let calculationString =
        (negative ? "-" : "") +
        trimmed +
        " = " +
        calculationParts.join(" + ") +
        " = " +
        decimal;

    return {
        decimal: decimal.toString(),
        hex: decimal.toString(16).toUpperCase(),
        calculation: calculationString,
        error: "",
    };
}

const OctalToDecimal = (props: { article?: any, seo?: any }) => {
    const [octalInput, setOctalInput] = useState("");
    const [decimalResult, setDecimalResult] = useState("");
    const [hexResult, setHexResult] = useState("");
    const [calculation, setCalculation] = useState("");
    const [error, setError] = useState("");

    const handleConvert = () => {
        const { decimal, hex, calculation, error } = convertOctal(octalInput);
        setDecimalResult(decimal);
        setHexResult(hex);
        setCalculation(calculation);
        setError(error);
    };

    const handleReset = () => {
        setOctalInput("");
        setDecimalResult("");
        setHexResult("");
        setCalculation("");
        setError("");
    };

    const handleSample = () => {
        setOctalInput(sampleData);
        setTimeout(() => {
            // Convert after setting sample
            const { decimal, hex, calculation, error } = convertOctal(sampleData);
            setDecimalResult(decimal);
            setHexResult(hex);
            setCalculation(calculation);
            setError(error);
        }, 0);
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
                        Converter Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Decimal to Octal</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">

                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1">
                        <div className="border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-semibold text-center mb-6 dark:text-white">
                                Octal to Decimal Converter
                            </h1>
                            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                                To use Toolinger <b>Octal to Decimal</b> Converter, Enter the octal values below
                            </p>

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Input area */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            onClick={handleSample}
                                        >
                                            Load sample data
                                        </button>
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <textarea
                                        rows={4}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Enter octal number (e.g. 127)"
                                        value={octalInput}
                                        onChange={(e) => setOctalInput(e.target.value)}
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                                            onClick={handleConvert}
                                        >
                                            Convert
                                        </button>
                                    </div>
                                    {error && (
                                        <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                                            {error}
                                        </div>
                                    )}
                                </div>
                                {/* Output area */}
                                <div className="flex-1">
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 min-h-[120px]">
                                        <h2 className="text-lg font-semibold mb-2 dark:text-white">Result</h2>
                                        <div className="mb-2">
                                            <span className="font-medium">Decimal:</span>{" "}
                                            <span className="text-primary">{decimalResult || "--"}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-medium">Hexadecimal:</span>{" "}
                                            <span className="text-primary">{hexResult || "--"}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Calculation:</span>
                                            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 break-words whitespace-pre-line">
                                                {calculation ? calculation : "--"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 ">
                        {/* You can place content for the second column here */}
                        {/* Advertiesment */}
                        <ReleavantToolsSidebar title="Popular Tools" tools={popularTools as any} />
                        <ReleavantToolsSidebar title="Other Tools" tools={otherTools as any} />
                    </div>
                </div>
                {/* Advertisements or additional content */}
                {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 mt-8">
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertisement
                    </div>
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertisement
                    </div>
                </div> */}
            </div>



        </>
    );
};

export default OctalToDecimal;
