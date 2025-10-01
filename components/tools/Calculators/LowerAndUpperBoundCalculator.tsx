"use client"
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Z-scores for common confidence levels
const zScores: Record<string, number> = {
    "80%": 1.282,
    "85%": 1.440,
    "90%": 1.645,
    "95%": 1.96,
    "99%": 2.576,
    "99.5%": 2.807,
    "99.9%": 3.291,
};

const confidenceLevels = [
    "80%",
    "85%",
    "90%",
    "95%",
    "99%",
    "99.5%",
    "99.9%",
];

const validationSchema = Yup.object().shape({
    confidenceLevel: Yup.string()
        .oneOf(confidenceLevels)
        .required("Required"),
    sampleMean: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
    standardDeviation: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("Required"),
    sampleSize: Yup.number()
        .typeError("Must be a number")
        .integer("Must be an integer")
        .positive("Must be positive")
        .required("Required"),
});

const LowerAndUpperBoundCalculator= (props: { article?: any, seo?: any }) => {
    const [result, setResult] = useState<{
        lower: number;
        upper: number;
        margin: number;
    } | null>(null);

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
                    <span className="text-foreground font-medium">Bound Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
                            Confidence Interval Calculator
                        </h2>
                        <Formik
                            initialValues={{
                                confidenceLevel: "95%",
                                sampleMean: "",
                                standardDeviation: "",
                                sampleSize: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                // Print all input values when Calculate is clicked
                                console.log("Input values:", values);

                                const z = zScores[values.confidenceLevel];
                                const mean = parseFloat(values.sampleMean);
                                const sd = parseFloat(values.standardDeviation);
                                const n = parseInt(values.sampleSize, 10);

                                const margin = z * (sd / Math.sqrt(n));
                                const lower = mean - margin;
                                const upper = mean + margin;

                                setResult({
                                    lower,
                                    upper,
                                    margin,
                                });
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label
                                                htmlFor="confidenceLevel"
                                                className="block text-gray-700 dark:text-gray-200 mb-1"
                                            >
                                                Confidence level
                                            </label>
                                            <Field
                                                as="select"
                                                name="confidenceLevel"
                                                id="confidenceLevel"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            >
                                                {confidenceLevels.map((level) => (
                                                    <option key={level} value={level}>
                                                        {level}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="confidenceLevel"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="sampleMean"
                                                className="block text-gray-700 dark:text-gray-200 mb-1"
                                            >
                                                Sample Mean
                                            </label>
                                            <Field
                                                type="text"
                                                name="sampleMean"
                                                id="sampleMean"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="sampleMean"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="standardDeviation"
                                                className="block text-gray-700 dark:text-gray-200 mb-1"
                                            >
                                                Standard Deviation
                                            </label>
                                            <Field
                                                type="text"
                                                name="standardDeviation"
                                                id="standardDeviation"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="standardDeviation"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="sampleSize"
                                                className="block text-gray-700 dark:text-gray-200 mb-1"
                                            >
                                                Sample Size
                                            </label>
                                            <Field
                                                type="text"
                                                name="sampleSize"
                                                id="sampleSize"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="sampleSize"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {result && (
                            <div className="mt-8 bg-green-50 dark:bg-green-900 rounded p-6 text-center">
                                <h3 className="text-lg font-semibold text-green-700 dark:text-green-200 mb-4">
                                    Results
                                </h3>
                                <div className="text-gray-800 dark:text-gray-100">
                                    <p>
                                        <span className="font-medium">Lower Bound:</span>{" "}
                                        {result.lower.toFixed(4)}
                                    </p>
                                    <p>
                                        <span className="font-medium">Upper Bound:</span>{" "}
                                        {result.upper.toFixed(4)}
                                    </p>
                                    <p>
                                        <span className="font-medium">Margin of Error:</span>{" "}
                                        {result.margin.toFixed(4)}
                                    </p>
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
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {props?.article && (
                                <div
                                    className="prose max-w-none mt-8 "
                                    dangerouslySetInnerHTML={{ __html: props?.article || ""}}
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

export default LowerAndUpperBoundCalculator;
