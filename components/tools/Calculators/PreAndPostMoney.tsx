"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const validationSchema = Yup.object().shape({
    investment: Yup.number()
        .typeError("Investment must be a number")
        .required("Investment is required")
        .min(0, "Investment must be positive"),
    equity: Yup.number()
        .typeError("Equity must be a number")
        .required("Equity is required")
        .min(0, "Equity must be at least 0%")
        .max(100, "Equity cannot exceed 100%"),
});

const initialValues = {
    investment: "",
    equity: "",
};

const PreAndPostMoney: React.FC = () => {
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
                    <span className="text-foreground font-medium">Valuation Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-100">
                            Pre and Post Money Valuation Calculator
                        </h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {/* Investment */}
                                        <div>
                                            <label
                                                htmlFor="investment"
                                                className="block mb-1 text-gray-700 dark:text-gray-200 font-medium"
                                            >
                                                Investment
                                            </label>
                                            <Field
                                                type="text"
                                                id="investment"
                                                name="investment"
                                                placeholder="Rs"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="investment"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                        {/* Investor's equity % */}
                                        <div>
                                            <label
                                                htmlFor="equity"
                                                className="block mb-1 text-gray-700 dark:text-gray-200 font-medium"
                                            >
                                                Investor&apos;s equity %
                                            </label>
                                            <Field
                                                type="text"
                                                id="equity"
                                                name="equity"
                                                placeholder="%"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="equity"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                            disabled={isSubmitting}
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
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

export default PreAndPostMoney;
