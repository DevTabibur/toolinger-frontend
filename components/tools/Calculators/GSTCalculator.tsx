"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Validation schema
const validationSchema = Yup.object().shape({
    netPrice: Yup.number()
        .typeError("Net price must be a number")
        .min(0, "Net price cannot be negative")
        .required("Net price is required"),
    gst: Yup.number()
        .typeError("GST% must be a number")
        .min(0, "GST% cannot be negative")
        .required("GST% is required"),
});

function calculateGST(netPrice: number, gst: number) {
    const gstAmount = (gst / 100) * netPrice;
    const grossPrice = netPrice + gstAmount;
    return { gstAmount, grossPrice };
}

const GSTCalculator = (props: { article?: any, seo?: any }) => {
    const [result, setResult] = useState<null | { gstAmount: number; grossPrice: number }>(null);

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
                    <span className="text-foreground font-medium">GST Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
                            GST Calculator
                        </h2>
                        <Formik
                            initialValues={{
                                netPrice: "",
                                gst: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const netPrice = parseFloat(values.netPrice as string);
                                const gst = parseFloat(values.gst as string);
                                const calc = calculateGST(netPrice, gst);
                                setResult(calc);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                        <div className="flex-1 flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Net price
                                            </label>
                                            <Field
                                                name="netPrice"
                                                type="text"
                                                className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="netPrice"
                                                component="div"
                                                className="text-xs text-red-500 mt-1"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                GST%
                                            </label>
                                            <Field
                                                name="gst"
                                                type="text"
                                                className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="gst"
                                                component="div"
                                                className="text-xs text-red-500 mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-2 rounded transition"
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {result && (
                            <div className="mt-8 bg-emerald-50 dark:bg-gray-900 border border-emerald-200 dark:border-emerald-700 rounded p-4">
                                <h3 className="text-lg font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Result</h3>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <span className="font-medium">GST amount: </span>
                                        <span>${result.gstAmount.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Gross price: </span>
                                        <span>${result.grossPrice.toFixed(2)}</span>
                                    </div>
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
                                    dangerouslySetInnerHTML={{ __html: props?.article  || ""}}
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

export default GSTCalculator;
