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

function calculateHex(a: string, b: string, op: string): string {
    let numA = parseInt(a, 16);
    let numB = parseInt(b, 16);
    if (isNaN(numA) || isNaN(numB)) return "Invalid input";
    let result: number;
    switch (op) {
        case "add":
            result = numA + numB;
            break;
        case "sub":
            result = numA - numB;
            break;
        case "mult":
            result = numA * numB;
            break;
        case "div":
            if (numB === 0) return "Division by zero";
            result = Math.floor(numA / numB);
            break;
        default:
            return "Invalid operation";
    }
    return result.toString(16).toUpperCase();
}

const HexCalculator: React.FC = () => {
    const [hexA, setHexA] = useState("");
    const [hexB, setHexB] = useState("");
    const [operation, setOperation] = useState("add");
    const [result, setResult] = useState<string | null>(null);

    const handleCalculate = () => {
        setResult(calculateHex(hexA, hexB, operation));
    };

    const handleReset = () => {
        setHexA("");
        setHexB("");
        setOperation("add");
        setResult(null);
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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
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
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
                                >
                                    Calculate
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow"
                                >
                                    Reset
                                </button>
                            </div>
                            {result !== null && (
                                <div className="mt-4 text-center">
                                    <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                        Result:{" "}
                                    </span>
                                    <span className="text-lg font-mono text-blue-700 dark:text-blue-300">
                                        {result}
                                    </span>
                                </div>
                            )}
                        </form>
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
};

export default HexCalculator;
