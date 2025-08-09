"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const MAX_URLS = 20;

const urlValidation = Yup.string()
    .trim()
    .matches(
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Enter a valid URL"
    )
    .required("URL is required");

const validationSchema = Yup.object().shape({
    urls: Yup.string()
        .required("Please enter at least one URL")
        .test(
            "max-urls",
            `You can enter up to ${MAX_URLS} URLs`,
            (value) => (value ? value.split("\n").filter((u) => u.trim()).length <= MAX_URLS : true)
        )
        .test(
            "all-valid-urls",
            "One or more URLs are invalid",
            (value) => {
                if (!value) return false;
                const urls = value.split("\n").map((u) => u.trim()).filter(Boolean);
                return urls.every((url) => urlValidation.isValidSync(url));
            }
        ),
});

const exampleUrls = ``;

const statBoxStyle =
    "flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-4 min-w-[120px]";

const tableStyle =
    "min-w-full divide-y divide-gray-200 dark:divide-gray-700";
const thStyle =
    "px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase";
const tdStyle =
    "px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100";

export default function CodeToTextRatio() {
    const [results, setResults] = useState<
        { url: string; code: string; text: string; ratio: string }[]
    >([]);

    const formik = useFormik({
        initialValues: {
            urls: exampleUrls,
        },
        validationSchema,
        onSubmit: (values) => {
            // Print the values
            console.log("Submitted URLs:", values.urls);

            // Simulate results for demonstration
            const urls = values.urls
                .split("\n")
                .map((u) => u.trim())
                .filter(Boolean);

            // For demo, generate random code/text/ratio
            const fakeResults = urls.map((url) => {
                const code = (Math.floor(Math.random() * 10000) + 10000).toString();
                const text = (Math.floor(Math.random() * 5000) + 1000).toString();
                const ratio = ((parseInt(text) / (parseInt(code) + parseInt(text))) * 100).toFixed(2) + "%";
                return {
                    url,
                    code,
                    text,
                    ratio,
                };
            });
            setResults(fakeResults);
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
                        href="/category/text-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Text Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Code to Text Ratio</span>
                </nav>
            </div>




            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            Code to Text Ratio
                        </h1>
                        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                            Calculate the code to text ratio of your web pages. Enter up to {MAX_URLS} URLs (one per line) to analyze how much visible text content is present compared to the HTML code.
                        </p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="urls"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                                >
                                    URLs (one per line)
                                </label>
                                <textarea
                                    id="urls"
                                    name="urls"
                                    rows={4}
                                    className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-gray-100 ${formik.touched.urls && formik.errors.urls
                                        ? "border-red-500"
                                        : "border-gray-300 dark:border-gray-700"
                                        }`}
                                    value={formik.values.urls}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={exampleUrls}
                                />
                                {formik.touched.urls && formik.errors.urls && (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.urls}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary/90 transition"
                                disabled={formik.isSubmitting}
                            >
                                Analyze
                            </button>
                        </form>

                        {/* Results */}
                        {results.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center">
                                    Results
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className={tableStyle}>
                                        <thead>
                                            <tr>
                                                <th className={thStyle}>URL</th>
                                                <th className={thStyle}>Code Size</th>
                                                <th className={thStyle}>Text Size</th>
                                                <th className={thStyle}>Code to Text Ratio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((result, idx) => (
                                                <tr key={idx} className="odd:bg-gray-50 dark:odd:bg-gray-900">
                                                    <td className={tdStyle}>
                                                        <a
                                                            href={result.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 dark:text-blue-400 underline break-all"
                                                        >
                                                            {result.url}
                                                        </a>
                                                    </td>
                                                    <td className={tdStyle}>{result.code}</td>
                                                    <td className={tdStyle}>{result.text}</td>
                                                    <td className={tdStyle}>{result.ratio}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

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
