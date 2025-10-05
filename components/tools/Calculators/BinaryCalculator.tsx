"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronRight, Home, Repeat2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";


const otherTools = [
    {
        id: "adsense-calculator",
        name: "AdSense Calculator",
        description: "Calculate potential AdSense earnings",
        category: "Calculators",
        slug: "adsense-calculator",
        categorySlug: "calculators",
        icon: "💵",
        badge: {
            text: "Free",
            color: "green"
        }
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
        id: "hex-calculator",
        name: "HEX Calculator",
        description: "Perform calculations in hexadecimal number system",
        category: "Calculators",
        slug: "hex-calculator",
        categorySlug: "calculators",
        icon: "🔷",
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

const options = [
    { value: "binary", label: "Binary" },
    { value: "decimal", label: "Decimal" },
    { value: "octal", label: "Octal" },
    { value: "hexadecimal", label: "Hexadecimal" },
    { value: "text", label: "Text" },
];

// Conversion helpers
function binaryToText(bin: string) {
    return bin
        .split(" ")
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join("");
}
function textToBinary(text: string) {
    return text
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ");
}
function binaryToDecimal(bin: string) {
    return bin
        .split(" ")
        .map((b) => parseInt(b, 2).toString(10))
        .join(" ");
}
function decimalToBinary(dec: string) {
    return dec
        .split(" ")
        .map((d) => parseInt(d, 10).toString(2).padStart(8, "0"))
        .join(" ");
}
function binaryToHex(bin: string) {
    return bin
        .split(" ")
        .map((b) => parseInt(b, 2).toString(16).toUpperCase())
        .join(" ");
}
function hexToBinary(hex: string) {
    return hex
        .split(" ")
        .map((h) => parseInt(h, 16).toString(2).padStart(8, "0"))
        .join(" ");
}
function binaryToOctal(bin: string) {
    return bin
        .split(" ")
        .map((b) => parseInt(b, 2).toString(8))
        .join(" ");
}
function octalToBinary(oct: string) {
    return oct
        .split(" ")
        .map((o) => parseInt(o, 8).toString(2).padStart(8, "0"))
        .join(" ");
}
function decimalToText(dec: string) {
    return dec
        .split(" ")
        .map((d) => String.fromCharCode(parseInt(d, 10)))
        .join("");
}
function textToDecimal(text: string) {
    return text
        .split("")
        .map((char) => char.charCodeAt(0).toString(10))
        .join(" ");
}
function hexToText(hex: string) {
    return hex
        .split(" ")
        .map((h) => String.fromCharCode(parseInt(h, 16)))
        .join("");
}
function textToHex(text: string) {
    return text
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).toUpperCase())
        .join(" ");
}
function octalToText(oct: string) {
    return oct
        .split(" ")
        .map((o) => String.fromCharCode(parseInt(o, 8)))
        .join("");
}
function textToOctal(text: string) {
    return text
        .split("")
        .map((char) => char.charCodeAt(0).toString(8))
        .join(" ");
}
function decimalToHex(dec: string) {
    return dec
        .split(" ")
        .map((d) => parseInt(d, 10).toString(16).toUpperCase())
        .join(" ");
}
function hexToDecimal(hex: string) {
    return hex
        .split(" ")
        .map((h) => parseInt(h, 16).toString(10))
        .join(" ");
}
function decimalToOctal(dec: string) {
    return dec
        .split(" ")
        .map((d) => parseInt(d, 10).toString(8))
        .join(" ");
}
function octalToDecimal(oct: string) {
    return oct
        .split(" ")
        .map((o) => parseInt(o, 8).toString(10))
        .join(" ");
}
function hexToOctal(hex: string) {
    return hex
        .split(" ")
        .map((h) => parseInt(h, 16).toString(8))
        .join(" ");
}

// Main component
const BinaryCalculator = (props: { article?: any, seo?: any }) => {
    const [result, setResult] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    // Get current pathname to extract category and tool
    const pathname = usePathname();
    // Example: /category/calculators/binary-calculator
    // or /category/[slug]/[tool]
    // We'll extract [slug] and [tool] from the path
    let categorySlug = "calculators";
    let toolSlug = "binary-calculator";
    let toolName = "Binary Converter";
    if (pathname) {
        const parts = pathname.split("/").filter(Boolean);
        // You can use parts to extract category/tool if needed
        // For now, we keep the defaults above
    }

    const formik = useFormik({
        initialValues: {
            input: "",
            from: "binary",
            to: "decimal",
        },
        validationSchema: Yup.object({
            input: Yup.string().required("Input is required"),
            from: Yup.string().required(),
            to: Yup.string().required(),
        }),
        onSubmit: (values) => {
            setError("");
            let output = "";
            try {
                const { input, from, to } = values;
                if (from === to) {
                    output = input;
                } else {
                    switch (from) {
                        case "binary":
                            if (to === "text") output = binaryToText(input);
                            else if (to === "decimal") output = binaryToDecimal(input);
                            else if (to === "octal") output = binaryToOctal(input);
                            else if (to === "hexadecimal") output = binaryToHex(input);
                            break;
                        case "decimal":
                            if (to === "text") output = decimalToText(input);
                            else if (to === "binary") output = decimalToBinary(input);
                            else if (to === "octal") output = decimalToOctal(input);
                            else if (to === "hexadecimal") output = decimalToHex(input);
                            break;
                        case "octal":
                            if (to === "text") output = octalToText(input);
                            else if (to === "binary") output = octalToBinary(input);
                            else if (to === "decimal") output = octalToDecimal(input);
                            else if (to === "hexadecimal") output = decimalToHex(octalToDecimal(input));
                            break;
                        case "hexadecimal":
                            if (to === "text") output = hexToText(input);
                            else if (to === "binary") output = hexToBinary(input);
                            else if (to === "decimal") output = hexToDecimal(input);
                            else if (to === "octal") output = decimalToOctal(hexToDecimal(input));
                            break;
                        case "text":
                            if (to === "binary") output = textToBinary(input);
                            else if (to === "decimal") output = textToDecimal(input);
                            else if (to === "octal") output = textToOctal(input);
                            else if (to === "hexadecimal") output = textToHex(input);
                            break;
                        default:
                            output = "";
                    }
                }
                setResult(output);
            } catch (e) {
                setError("Invalid input for the selected conversion.");
                setResult("");
            }
        },
    });

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
                    <span className="text-foreground font-medium">Binary Calculator</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-bold mb-4 text-center">Binary Calculator</h1>
                            <p className="text-center mb-6">
                                Enter a number and select the base to convert from and to. This tool will help you convert between binary, decimal, octal, and hexadecimal formats.
                            </p>

                            <form onSubmit={formik.handleSubmit} className="space-y-6">

                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="from"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            From
                                        </label>
                                        <select
                                            id="from"
                                            name="from"
                                            className="py-2 px-3 w-full border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                                            value={formik.values.from}
                                            onChange={formik.handleChange}
                                        >
                                            {options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="to"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            To
                                        </label>
                                        <select
                                            id="to"
                                            name="to"
                                            className="py-2 px-3 w-full border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                                            value={formik.values.to}
                                            onChange={formik.handleChange}
                                        >
                                            {options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="input"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    >
                                        Input
                                    </label>
                                    <textarea
                                        id="input"
                                        name="input"
                                        placeholder="Enter value (e.g. 01000001 or 65 or A)"
                                        className={`py-2 px-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 ${formik.touched.input && formik.errors.input
                                            ? "border-red-500"
                                            : "border-green-400"
                                            }`}
                                        value={formik.values.input}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        autoComplete="off"
                                        rows={10}

                                    />
                                    {formik.touched.input && formik.errors.input ? (
                                        <div className="text-red-500 text-xs mt-1">
                                            {formik.errors.input}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-8 rounded shadow transition-colors"
                                    >
                                        Convert
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded shadow transition-colors flex items-center"
                                        onClick={() => {
                                            // Swap from and to
                                            const prevFrom = formik.values.from;
                                            const prevTo = formik.values.to;
                                            formik.setFieldValue("from", prevTo);
                                            formik.setFieldValue("to", prevFrom);
                                            setResult("");
                                            setError("");
                                        }}
                                        title="Swap"
                                    >
                                        <Repeat2 className="h-4 w-4 mr-1" />
                                        Swap
                                    </button>
                                </div>
                            </form>
                        </div>
                        {error && (
                            <div className="mt-4 text-center text-red-500 font-medium">
                                {error}
                            </div>
                        )}
                        {result && (
                            <div className="mt-6 text-center">
                                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 break-words">
                                    Result: {result}
                                </span>
                            </div>
                        )}
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

export default BinaryCalculator;
