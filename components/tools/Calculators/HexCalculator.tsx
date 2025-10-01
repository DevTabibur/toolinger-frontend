"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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
                <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
                    Hexadecimal Calculator
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    To use this <b>Hexadecimal Calculator</b>, enter the values in the input boxes below and click on the <b>Calculate</b> button.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* Main calculator form */}
                    <div className="md:col-span-12 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
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
                            {submitted && (
                                <>
                                    {/* Main result */}
                                    <div className="mt-4">
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
                            )}
                        </form>
                    </div>
                   
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertisement
                    </div>
                    {/* Second column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertisement
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default HexCalculator;
