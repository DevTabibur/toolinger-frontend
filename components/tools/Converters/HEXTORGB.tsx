"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Remove hash if present
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
        // Expand shorthand
        hex = hex
            .split("")
            .map((c) => c + c)
            .join("");
    }
    if (hex.length !== 6) return null;
    const num = parseInt(hex, 16);
    if (isNaN(num)) return null;
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
}

function rgbToCss(r: number, g: number, b: number) {
    return `rgb(${r},${g},${b})`;
}

const HEXTORGB = () => {
    const [hex, setHex] = useState("");
    const [rgb, setRgb] = useState<{ r: number; g: number; b: number } | null>(null);
    const [touched, setTouched] = useState(false);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^a-fA-F0-9#]/g, "");
        if (value.startsWith("#")) value = value.slice(1);
        if (value.length > 6) value = value.slice(0, 6);
        setHex(value);
        setTouched(false);
        setRgb(null);
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        const result = hexToRgb(hex);
        setRgb(result);
    };

    const cssColor = rgb ? rgbToCss(rgb.r, rgb.g, rgb.b) : "";
    const isValid = hex.length === 6 && !!hexToRgb(hex);

    // Theme support: use Tailwind's dark: classes
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
                    <span className="text-foreground font-medium">HEX to RGB</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            HEX to RGB Converter
                        </h1>
                        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                            <b>HEX to RGB Converter</b>, Choose options given below check the result section.
                        </p>
                        <form onSubmit={handleCalculate}>
                            <div className="mb-6">
                                <label className="block text-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                    Hex color code (#RRGGBB):
                                </label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="000000"
                                    value={hex}
                                    onChange={handleHexChange}
                                    className="w-full text-center border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Red color (R):
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={rgb ? rgb.r : ""}
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-lg"
                                        tabIndex={-1}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Green color (G):
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={rgb ? rgb.g : ""}
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-lg"
                                        tabIndex={-1}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Blue color (B):
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={rgb ? rgb.b : ""}
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-lg"
                                        tabIndex={-1}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-white rounded shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                                    disabled={!isValid}
                                >
                                    Convert
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
                                Result
                            </h2>
                            {touched && (
                                <div>
                                    {rgb ? (
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-24 h-24 rounded mb-3 border border-gray-300 dark:border-gray-700"
                                                style={{
                                                    background: cssColor,
                                                }}
                                            />
                                            <div className="text-center">
                                                <div className="mb-1">
                                                    <span className="font-mono text-base text-gray-900 dark:text-gray-100">
                                                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-mono text-base text-gray-600 dark:text-gray-300">
                                                        HEX: #{hex.length === 6 ? hex.toUpperCase() : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-red-600 dark:text-red-400">
                                            Invalid HEX code. Please enter a valid 6-digit HEX color.
                                        </div>
                                    )}
                                </div>
                            )}
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
};

export default HEXTORGB;
