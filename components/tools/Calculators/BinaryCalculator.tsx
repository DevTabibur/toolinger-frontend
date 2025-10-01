"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronRight, Home, Repeat2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            {/*
                Dynamic breadcrumb: 
                - 2nd link: /category/{category} (category from route)
                - 2nd text: {Category} Tools (capitalize)
                - 3rd text: {Tool} Converter (capitalize)
            */}
            {(() => {
                // Get pathname, e.g. /category/calculators/binary-calculator
                const pathname = usePathname();
                // Split and extract category and tool
                // pathname: /category/[category]/[tool]
                const parts = pathname.split("/").filter(Boolean);
                // fallback if not enough parts
                const category = parts[1] ? parts[1].replace(/-/g, " ") : "tools";
                const tool = parts[2] ? parts[2].replace(/-/g, " ") : "converter";
                // Capitalize first letter of each word
                const capitalize = (str: string) =>
                    str.replace(/\b\w/g, (c) => c.toUpperCase());
                const categoryDisplay = capitalize(category);
                const toolDisplay = capitalize(tool);

                return (
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
                                href={`/category/${parts[1] || ""}`}
                                className="text-muted-foreground hover:text-primary"
                            >
                                {categoryDisplay}
                            </Link>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground font-medium">
                                {toolDisplay} 
                            </span>
                        </nav>
                    </div>
                );
            })()}

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
                            Binary Calculator
                        </h2>
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
                    <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        {/* You can place content for the second column here */}
                        Advertisement
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

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {props?.article && (
                                <div
                                    className="prose max-w-none mt-8 "
                                    dangerouslySetInnerHTML={{ __html: props?.article || "" }}
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
};

export default BinaryCalculator;
