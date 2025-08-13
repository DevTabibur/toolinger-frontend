"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Helper: Convert number to Roman numerals (1-3999+)
function toRoman(num: number): string {
    if (isNaN(num) || num <= 0) return "";
    const romanNumerals: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];
    let result = "";
    for (const [value, numeral] of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }
    return result;
}

const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
];

const dateFormats = [
    { label: "MM.DD.YYYY", value: "MM.DD.YYYY" },
    { label: "DD.MM.YYYY", value: "DD.MM.YYYY" },
    { label: "YYYY.MM.DD", value: "YYYY.MM.DD" },
    { label: "YYYY.DD.MM", value: "YYYY.DD.MM" },
];

const delimiters = [
    { label: ". (dot)", value: "." },
    { label: "/ (slash)", value: "/" },
    { label: "- (dash)", value: "-" },
    { label: "space", value: " " },
];

function pad2(n: number) {
    return n < 10 ? `0${n}` : `${n}`;
}

function formatDate(
    day: number,
    month: number,
    year: number,
    format: string,
    delimiter: string
): { arabic: string; roman: string } {
    let parts: { [key: string]: string } = {
        DD: pad2(day),
        MM: pad2(month),
        YYYY: year.toString(),
    };
    let romanParts: { [key: string]: string } = {
        DD: toRoman(day),
        MM: toRoman(month),
        YYYY: toRoman(year),
    };
    let order = format.split(".");
    if (order.length !== 3) order = ["MM", "DD", "YYYY"];
    const arabic =
        parts[order[0]] + delimiter + parts[order[1]] + delimiter + parts[order[2]];
    const roman =
        romanParts[order[0]] +
        delimiter +
        romanParts[order[1]] +
        delimiter +
        romanParts[order[2]];
    return { arabic, roman };
}

const today = new Date();

const RomanNumeralsDate: React.FC = () => {
    // State
    const [month, setMonth] = useState<number>(today.getMonth() + 1);
    const [day, setDay] = useState<number>(today.getDate());
    const [year, setYear] = useState<number>(today.getFullYear());
    const [dateFormat, setDateFormat] = useState<string>("MM.DD.YYYY");
    const [delimiter, setDelimiter] = useState<string>(".");
    const [result, setResult] = useState<{ roman: string; arabic: string } | null>(
        null
    );
    const [error, setError] = useState<string>("");

    // Generate days for selected month/year
    function getDaysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }
    const daysInMonth = getDaysInMonth(month, year);

    // Handlers
    const handleConvert = () => {
        setError("");
        if (
            isNaN(day) ||
            isNaN(month) ||
            isNaN(year) ||
            day < 1 ||
            month < 1 ||
            month > 12 ||
            year < 1 ||
            day > getDaysInMonth(month, year)
        ) {
            setResult(null);
            setError("Please enter a valid date.");
            return;
        }
        setResult(formatDate(day, month, year, dateFormat, delimiter));
    };

    // Update day if month/year changes and current day is out of range
    React.useEffect(() => {
        const maxDay = getDaysInMonth(month, year);
        if (day > maxDay) {
            setDay(maxDay);
        }
        // eslint-disable-next-line
    }, [month, year]);

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
                    <span className="text-foreground font-medium">Roman Numerals Date Converter</span>
                </nav>
            </div>



            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">

                        <div>
                            <h1 className="text-2xl font-bold mb-2">Roman Numerals Date Converter</h1>
                            <p className="mb-6 text-muted-foreground">
                                Convert a date to Roman numerals in various formats.
                            </p>

                            <form
                                className="space-y-4"
                                onSubmit={e => {
                                    e.preventDefault();
                                    handleConvert();
                                }}
                            >
                                <div className="flex gap-2">
                                    {/* Month */}
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-xs mb-1" htmlFor="month">Month</label>
                                        <select
                                            id="month"
                                            className="border rounded px-2 py-1 w-full"
                                            value={month}
                                            onChange={e => setMonth(Number(e.target.value))}
                                        >
                                            {months.map(m => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Day */}
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-xs mb-1" htmlFor="day">Day</label>
                                        <input
                                            id="day"
                                            type="number"
                                            min={1}
                                            max={daysInMonth}
                                            className="border rounded px-2 py-1 w-full"
                                            value={day}
                                            onChange={e => setDay(Number(e.target.value))}
                                        />
                                    </div>
                                    {/* Year */}
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-xs mb-1" htmlFor="year">Year</label>
                                        <input
                                            id="year"
                                            type="number"
                                            min={1}
                                            max={3999}
                                            className="border rounded px-2 py-1 w-full"
                                            value={year}
                                            onChange={e => setYear(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {/* Date Format */}
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-xs mb-1" htmlFor="dateFormat">Format</label>
                                        <select
                                            id="dateFormat"
                                            className="border rounded px-2 py-1 w-full"
                                            value={dateFormat}
                                            onChange={e => setDateFormat(e.target.value)}
                                        >
                                            {dateFormats.map(f => (
                                                <option key={f.value} value={f.value}>{f.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Delimiter */}
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-xs mb-1" htmlFor="delimiter">Delimiter</label>
                                        <select
                                            id="delimiter"
                                            className="border rounded px-2 py-1 w-full"
                                            value={delimiter}
                                            onChange={e => setDelimiter(e.target.value)}
                                        >
                                            {delimiters.map(d => (
                                                <option key={d.value} value={d.value}>{d.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded font-semibold hover:bg-primary/90 transition"
                                >
                                    Convert
                                </button>
                            </form>

                            {error && (
                                <div className="mt-4 text-red-600 font-medium">{error}</div>
                            )}

                            {result && !error && (
                                <div className="mt-6 border rounded p-4 bg-muted">
                                    <div className="mb-2">
                                        <span className="font-semibold">Arabic:</span>{" "}
                                        <span className="font-mono">{result.arabic}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Roman Numerals:</span>{" "}
                                        <span className="font-mono text-lg">{result.roman}</span>
                                    </div>
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

export default RomanNumeralsDate;
