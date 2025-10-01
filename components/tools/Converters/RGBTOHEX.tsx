"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

function rgbToHex(r: number, g: number, b: number) {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
            .toUpperCase()
    );
}

function rgbString(r: number, g: number, b: number) {
    return `rgb(${r},${g},${b})`;
}

const RGBTOHEX = (props: { article?: any, seo?: any }) => {
    const [red, setRed] = useState(157);
    const [green, setGreen] = useState(61);
    const [blue, setBlue] = useState(144);

    const handleRed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRed(clamp(Number(e.target.value), 0, 255));
    };
    const handleGreen = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGreen(clamp(Number(e.target.value), 0, 255));
    };
    const handleBlue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlue(clamp(Number(e.target.value), 0, 255));
    };

    const handleReset = () => {
        setRed(157);
        setGreen(61);
        setBlue(144);
    };

    const hex = rgbToHex(red, green, blue);
    const rgb = rgbString(red, green, blue);

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
                    <span className="text-foreground font-medium">RGB to HEX</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            RGB to HEX
                        </h1>
                        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                            To use toolinger <b>RGB to HEX tool</b>, Choose options given below then check the result section.
                        </p>
                        <div className="text-center text-xs text-gray-500 mb-4">
                            Set color levels (0-255) for red, green, and blue
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left: Sliders and Preview */}
                            <div className="flex flex-col gap-4">
                                {/* Red */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Red color (R):
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min={0}
                                            max={255}
                                            value={red}
                                            onChange={handleRed}
                                            className="w-full accent-red-500"
                                            style={{ accentColor: "#ef4444" }}
                                        />
                                        <input
                                            type="number"
                                            min={0}
                                            max={255}
                                            value={red}
                                            onChange={handleRed}
                                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                                        />
                                    </div>
                                </div>
                                {/* Green */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Green color (G):
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min={0}
                                            max={255}
                                            value={green}
                                            onChange={handleGreen}
                                            className="w-full accent-green-500"
                                            style={{ accentColor: "#22c55e" }}
                                        />
                                        <input
                                            type="number"
                                            min={0}
                                            max={255}
                                            value={green}
                                            onChange={handleGreen}
                                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                                        />
                                    </div>
                                </div>
                                {/* Blue */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Blue color (B):
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min={0}
                                            max={255}
                                            value={blue}
                                            onChange={handleBlue}
                                            className="w-full accent-blue-500"
                                            style={{ accentColor: "#3b82f6" }}
                                        />
                                        <input
                                            type="number"
                                            min={0}
                                            max={255}
                                            value={blue}
                                            onChange={handleBlue}
                                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                                        />
                                    </div>
                                </div>
                                {/* Preview */}
                                <div className="flex flex-col items-center mt-4">
                                    <div
                                        className="w-24 h-24 rounded shadow border border-gray-300 mb-2"
                                        style={{ background: rgb }}
                                    ></div>
                                    <button
                                        onClick={handleReset}
                                        className="mt-2 px-4 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        type="button"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                            {/* Right: Result */}
                            <div className="flex flex-col items-center justify-center gap-6">
                                <div className="w-full">
                                    <div className="text-center text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                                        Result
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-base text-gray-700 dark:text-gray-200">HEX:</span>
                                            <span className="font-mono text-lg font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 select-all">
                                                {hex}
                                            </span>
                                            <button
                                                className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(hex);
                                                }}
                                                type="button"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-base text-gray-700 dark:text-gray-200">RGB:</span>
                                            <span className="font-mono text-lg font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 select-all">
                                                {rgb}
                                            </span>
                                            <button
                                                className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(rgb);
                                                }}
                                                type="button"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-4">
                                    <div className="text-xs text-gray-500 text-center">
                                        HEX and RGB values update as you move the sliders or enter numbers.
                                    </div>
                                </div>
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
};

export default RGBTOHEX;
