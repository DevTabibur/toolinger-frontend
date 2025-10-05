"use client";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";


const otherTools = [
    {
        id: "adsense-calculator",
        name: "AdSense Calculator",
        description: "Calculate potential AdSense earnings",
        category: "Calculators",
        slug: "adsense-calculator",
        categorySlug: "calculators",
        icon: "💵",
       
    },
    {
        id: "ltv-calculator",
        name: "LTV Calculator",
        description: "Calculate customer lifetime value",
        category: "Calculators",
        slug: "ltv-calculator",
        categorySlug: "calculators",
        icon: "📈",
    },
    {
        id: "discount-calculator",
        name: "Discount Calculator",
        description: "Calculate discounts and final prices",
        category: "Calculators",
        slug: "discount-calculator",
        categorySlug: "calculators",
        icon: "🏷️",
    },

    {
        id: "binary-calculator",
        name: "Binary Calculator",
        description: "Perform calculations in binary number system",
        category: "Calculators",
        slug: "binary-calculator",
        categorySlug: "calculators",
        icon: "🔢",
    },
    {
        id: "octal-calculator",
        name: "Octal Calculator",
        description: "Perform calculations in octal number system",
        category: "Calculators",
        slug: "octal-calculator",
        categorySlug: "calculators",
        icon: "🧮",
    },
    {
        id: "earnings-per-share-calculator",
        name: "Earnings Per Share Calculator",
        description: "Calculate earnings per share",
        category: "Calculators",
        slug: "earnings-per-share-calculator",
        categorySlug: "calculators",
        icon: "💹",
    },
    {
        id: "probability-calculator",
        name: "Probability Calculator",
        description: "Calculate probabilities for various events",
        category: "Calculators",
        slug: "probability-calculator",
        categorySlug: "calculators",
        icon: "🎲",
    },
    {
        id: "gst-calculator",
        name: "GST Calculator",
        description: "Calculate GST (Goods and Services Tax)",
        category: "Calculators",
        slug: "gst-calculator",
        categorySlug: "calculators",
        icon: "🧾",
    },
    {
        id: "average-calculator",
        name: "Average Calculator",
        description: "Calculate mean, median, and mode",
        category: "Calculators",
        slug: "average-calculator",
        categorySlug: "calculators",
        icon: "📊",
    },
    {
        id: "sales-tax-calculator",
        name: "Sales Tax Calculator",
        description: "Calculate sales tax and gross price",
        category: "Calculators",
        slug: "sales-tax-calculator",
        categorySlug: "calculators",
        icon: "💰",
    },
    {
        id: "age-calculator",
        name: "Age Calculator",
        description: "Calculate age in years, months, and days",
        category: "Calculators",
        slug: "age-calculator",
        categorySlug: "calculators",
        icon: "🧓",
    },
    {
        id: "pre-and-post-money-valuation",
        name: "Pre and Post Money Valuation",
        description: "Calculate pre and post money valuation for startups",
        category: "Calculators",
        slug: "pre-and-post-money-valuation",
        categorySlug: "calculators",
        icon: "🏦",
    },
];

const operations = [
    { value: "add", label: "add (+)" },
    { value: "sub", label: "subtract (−)" },
    { value: "mult", label: "multiply (×)" },
    { value: "div", label: "divide (÷)" },
];

function safeParseHex(val: string): number | null {
    if (!val) return null;
    const n = parseInt(val, 16);
    return isNaN(n) ? null : n;
}

function calculateAll(hexA: string, hexB: string) {
    const decA = safeParseHex(hexA);
    const decB = safeParseHex(hexB);

    // If either is invalid, return nulls
    if (decA === null || decB === null) {
        return {
            decA: "",
            decB: "",
            hexAdd: "",
            hexSub: "",
            hexMult: "",
            hexDiv: "",
            decAdd: "",
            decSub: "",
            decMult: "",
            decDiv: "",
        };
    }

    // Hex results
    const hexAdd = (decA + decB).toString(16).toUpperCase();
    const hexSub = (decA - decB).toString(16).toUpperCase();
    const hexMult = (decA * decB).toString(16).toUpperCase();
    const hexDiv = decB === 0 ? "Division by zero" : (decA / decB).toString(16).toUpperCase();

    // Decimal results
    const decAdd = (decA + decB).toString();
    const decSub = (decA - decB).toString();
    const decMult = (decA * decB).toString();
    const decDiv = decB === 0 ? "Division by zero" : (decA / decB).toString();

    return {
        decA: decA.toString(),
        decB: decB.toString(),
        hexAdd,
        hexSub,
        hexMult,
        hexDiv,
        decAdd,
        decSub,
        decMult,
        decDiv,
    };
}

function calculateHexResult(hexA: string, hexB: string, op: string): string {
    const decA = safeParseHex(hexA);
    const decB = safeParseHex(hexB);
    if (decA === null || decB === null) return "";
    switch (op) {
        case "add":
            return (decA + decB).toString(16).toUpperCase();
        case "sub":
            return (decA - decB).toString(16).toUpperCase();
        case "mult":
            return (decA * decB).toString(16).toUpperCase();
        case "div":
            if (decB === 0) return "Division by zero";
            return (decA / decB).toString(16).toUpperCase();
        default:
            return "";
    }
}

const HexCalculator = (props: { article?: any, seo?: any }) => {
    const [hexA, setHexA] = useState("");
    const [hexB, setHexB] = useState("");
    const [operation, setOperation] = useState("add");
    const [submitted, setSubmitted] = useState(false);

    // Results state
    const [results, setResults] = useState({
        decA: "",
        decB: "",
        hexAdd: "",
        hexSub: "",
        hexMult: "",
        hexDiv: "",
        decAdd: "",
        decSub: "",
        decMult: "",
        decDiv: "",
        mainResult: "",
    });

    const handleCalculate = () => {
        setSubmitted(true);
        const all = calculateAll(hexA, hexB);
        setResults({
            ...all,
            mainResult: calculateHexResult(hexA, hexB, operation),
        });
    };

    const handleReset = () => {
        setHexA("");
        setHexB("");
        setOperation("add");
        setSubmitted(false);
        setResults({
            decA: "",
            decB: "",
            hexAdd: "",
            hexSub: "",
            hexMult: "",
            hexDiv: "",
            decAdd: "",
            decSub: "",
            decMult: "",
            decDiv: "",
            mainResult: "",
        });
    };

    // Helper to get operation label for main result
    const getMainResultLabel = () => {
        const op = operations.find(op => op.value === operation);
        if (!op) return "";
        const word = op.label.split(" ")[0];
        return word.charAt(0).toUpperCase() + word.slice(1);
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
                        href="/category/calculators"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Calculator Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Hex Calculator</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
                                Hexadecimal Calculator
                            </h1>
                            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                                To use this <b>Hexadecimal Calculator</b>, enter the values in the input boxes below and click on the <b>Calculate</b> button.
                            </p>

                            <form
                                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-6"
                                onSubmit={e => {
                                    e.preventDefault();
                                    handleCalculate();
                                }}
                            >
                                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Enter Hex Value A
                                        </label>
                                        <input
                                            type="text"
                                            value={hexA}
                                            onChange={e => setHexA(e.target.value.replace(/[^0-9a-fA-F]/g, ""))}
                                            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            placeholder="e.g. 1A3F"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col items-center mx-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Operation
                                        </label>
                                        <select
                                            value={operation}
                                            onChange={e => setOperation(e.target.value)}
                                            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                        >
                                            {operations.map(op => (
                                                <option key={op.value} value={op.value}>
                                                    {op.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Enter Hex Value B
                                        </label>
                                        <input
                                            type="text"
                                            value={hexB}
                                            onChange={e => setHexB(e.target.value.replace(/[^0-9a-fA-F]/g, ""))}
                                            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            placeholder="e.g. FF2"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 justify-center">
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
                                    >
                                        Calculate
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded shadow"
                                    >
                                        Reset
                                    </button>
                                </div>

                            </form>

                        </div>
                        {submitted && (<div className="border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">

                            <>
                                {/* Main result */}
                                <div className="mt-6 ">
                                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                        Hex {getMainResultLabel()}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                        value={results.mainResult}
                                        readOnly
                                    />
                                </div>
                                {/* Decimal and Hex results */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Decimal Value A
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.decA}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Decimal Value B
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.decB}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Decimal Addition
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.decAdd}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Decimal Subtraction
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.decSub}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Decimal Multiplication
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.decMult}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Decimal Division
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.decDiv}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Hex Addition
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.hexAdd}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Hex Subtraction
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.hexSub}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Hex Multiplication
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.hexMult}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                            Hex Division
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono"
                                            value={results.hexDiv}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </>
                        </div>)}

                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1">
                        {/* You can place content for the second column here */}
                        {/* Advertisement */}
                        <ReleavantToolsSidebar title="Popular Tools" tools={popularTools as any} />
                        <ReleavantToolsSidebar title="Other Tools" tools={otherTools as any} />
                    </div>

                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
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

export default HexCalculator;
