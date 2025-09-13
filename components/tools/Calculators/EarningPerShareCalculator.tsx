"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const validationSchema = Yup.object().shape({
    netIncome: Yup.number()
        .typeError("Net Income must be a number")
        .required("Net Income is required"),
    dividends: Yup.number()
        .typeError("Dividends must be a number")
        .required("Dividends is required"),
    commonShare: Yup.number()
        .typeError("Common share must be a number")
        .required("Common share is required")
        .moreThan(0, "Common share must be greater than 0"),
});

const EarningPerShareCalculator = (props: { article?: any, seo?: any }) => {
    const [result, setResult] = useState<number | null>(null);

    // EPS = (Net Income - Dividends) / Common Share
    const calculateEPS = (values: { netIncome: string; dividends: string; commonShare: string }) => {
        const netIncome = parseFloat(values.netIncome);
        const dividends = parseFloat(values.dividends);
        const commonShare = parseFloat(values.commonShare);

        if (!isNaN(netIncome) && !isNaN(dividends) && !isNaN(commonShare) && commonShare !== 0) {
            const eps = (netIncome - dividends) / commonShare;
            setResult(eps);
        } else {
            setResult(null);
        }
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
                    <span className="text-foreground font-medium">Earnings Per Share (EPS) Calculator</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                    Earnings Per Share (EPS) Calculator
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <Formik
                            initialValues={{
                                netIncome: "",
                                dividends: "",
                                commonShare: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                calculateEPS(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Net Income
                                            </label>
                                            <Field
                                                name="netIncome"
                                                type="text"
                                                autoComplete="off"
                                                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="netIncome"
                                                component="div"
                                                className="text-xs text-red-500 mt-1"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Dividends
                                            </label>
                                            <Field
                                                name="dividends"
                                                type="text"
                                                autoComplete="off"
                                                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="dividends"
                                                component="div"
                                                className="text-xs text-red-500 mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Common share
                                        </label>
                                        <Field
                                            name="commonShare"
                                            as="input"
                                            type="text"
                                            autoComplete="off"
                                            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                        />
                                        <ErrorMessage
                                            name="commonShare"
                                            component="div"
                                            className="text-xs text-red-500 mt-1"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-2 rounded shadow transition"
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {/* Result Section */}
                        <div className="mt-10">
                            {result !== null && (
                                <div>
                                    <h3 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
                                        Result
                                    </h3>
                                    <hr className="mb-4" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-base text-gray-700 dark:text-gray-300 mb-1">
                                            Earnings Per Share
                                        </span>
                                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-8 py-4 shadow text-2xl font-bold text-emerald-600">
                                            {result < 0 ? (
                                                <span>-${Math.abs(result).toFixed(2)}</span>
                                            ) : (
                                                <span>${result.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center justify-center">
                        <span className="uppercase text-xs text-gray-400 tracking-widest mb-2">Advertisement</span>
                        {/* Place your ad code or component here */}
                        <div className="w-full h-32 bg-gray-100 dark:bg-gray-900 flex items-center justify-center rounded border border-dashed border-gray-300 dark:border-gray-700">
                            <span className="text-gray-400">AD SPACE</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center">
                        <span className="uppercase text-xs text-gray-400 tracking-widest">Advertisement</span>
                    </div>
                    {/* Second column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center">
                        <span className="uppercase text-xs text-gray-400 tracking-widest">Advertisement</span>
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

export default EarningPerShareCalculator;
