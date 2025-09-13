"use client"
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const initialValues = {
    values: ["", ""], // Start with 2 fields
};

const validationSchema = Yup.object().shape({
    values: Yup.array()
        .of(
            Yup.number()
                .typeError("Must be a number")
                .required("Required")
        )
        .min(2, "At least 2 values required"),
});

const AverageCalculator= (props: { article?: any, seo?: any }) => {
    const [submittedValues, setSubmittedValues] = useState<string[] | null>(null);

    // Helper to calculate average
    const calculateAverage = (values: string[] | null) => {
        if (!values) return null;
        const nums = values
            .map((v) => Number(v))
            .filter((v) => !isNaN(v));
        if (nums.length < 2) return null;
        const sum = nums.reduce((acc, curr) => acc + curr, 0);
        return (sum / nums.length).toFixed(2);
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
                    <span className="text-foreground font-medium">Average Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-100">
                            Average Calculator
                        </h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmittedValues(values.values);
                                console.log("Input values:", values.values);
                                setSubmitting(false);
                            }}
                        >
                            {({ values, isSubmitting }) => (
                                <Form>
                                    <FieldArray name="values">
                                        {({ push, remove }) => (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                                    {/* Left column */}
                                                    <div>
                                                        {values.values
                                                            .filter((_, idx) => idx % 2 === 0)
                                                            .map((_, idx) => {
                                                                const realIdx = idx * 2;
                                                                return (
                                                                    <div className="flex items-center mb-3" key={realIdx}>
                                                                        <label
                                                                            htmlFor={`values.${realIdx}`}
                                                                            className="w-20 text-gray-700 dark:text-gray-200"
                                                                        >
                                                                            Value {realIdx + 1}
                                                                        </label>
                                                                        <Field
                                                                            type="text"
                                                                            name={`values.${realIdx}`}
                                                                            id={`values.${realIdx}`}
                                                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                                                        />
                                                                        {values.values.length > 2 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => remove(realIdx)}
                                                                                className="ml-2 text-red-500 hover:text-red-700"
                                                                                aria-label="Remove"
                                                                            >
                                                                                &#x2716;
                                                                            </button>
                                                                        )}
                                                                        <ErrorMessage
                                                                            name={`values.${realIdx}`}
                                                                            component="div"
                                                                            className="text-red-500 text-xs ml-2"
                                                                        />
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                    {/* Right column */}
                                                    <div>
                                                        {values.values
                                                            .filter((_, idx) => idx % 2 === 1)
                                                            .map((_, idx) => {
                                                                const realIdx = idx * 2 + 1;
                                                                return (
                                                                    <div className="flex items-center mb-3" key={realIdx}>
                                                                        <label
                                                                            htmlFor={`values.${realIdx}`}
                                                                            className="w-20 text-gray-700 dark:text-gray-200"
                                                                        >
                                                                            Value {realIdx + 1}
                                                                        </label>
                                                                        <Field
                                                                            type="text"
                                                                            name={`values.${realIdx}`}
                                                                            id={`values.${realIdx}`}
                                                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                                                        />
                                                                        {values.values.length > 2 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => remove(realIdx)}
                                                                                className="ml-2 text-red-500 hover:text-red-700"
                                                                                aria-label="Remove"
                                                                            >
                                                                                &#x2716;
                                                                            </button>
                                                                        )}
                                                                        <ErrorMessage
                                                                            name={`values.${realIdx}`}
                                                                            component="div"
                                                                            className="text-red-500 text-xs ml-2"
                                                                        />
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                                <div className="flex items-center mt-2">
                                                    {values.values.length < 8 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => push("")}
                                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                                        >
                                                            + Add Value
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="mt-6 flex justify-center">
                                                    <button
                                                        type="submit"
                                                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                        disabled={isSubmitting}
                                                    >
                                                        Calculate Average
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </FieldArray>
                                </Form>
                            )}
                        </Formik>
                        {submittedValues && (
                            <div className="mt-8 text-center">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                                    Result
                                </h3>
                                <div className="text-xl text-green-600 dark:text-green-400">
                                    Average: {calculateAverage(submittedValues)}
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
                                    dangerouslySetInnerHTML={{ __html: props.article }}
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

export default AverageCalculator;
