"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, HomeIcon } from "lucide-react";

const validationSchema = Yup.object().shape({
    possibleOutcomes: Yup.number()
        .typeError("Number of possible outcomes must be a number")
        .required("Number of possible outcomes is required"),
    eventA: Yup.number()
        .typeError("Number of event occurs in A must be a number")
        .required("Number of event occurs in A is required"),
    eventB: Yup.number()
        .typeError("Number of event occurs in B must be a number")
        .required("Number of event occurs in B is required"),
});

const ProbabilityCalculator: React.FC = () => {
    return (
        <>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary flex items-center"
                    >
                        <HomeIcon className="h-4 w-4 mr-1" />
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
                    <span className="text-foreground font-medium">Probability Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <Formik
                            initialValues={{
                                possibleOutcomes: "",
                                eventA: "",
                                eventB: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Number of possible outcomes
                                            </label>
                                            <Field
                                                name="possibleOutcomes"
                                                type="text"
                                                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="possibleOutcomes"
                                                component="div"
                                                className="text-xs text-red-500 mt-1"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Number of event occurs in A
                                            </label>
                                            <Field
                                                name="eventA"
                                                type="text"
                                                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="eventA"
                                                component="div"
                                                className="text-xs text-red-500 mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Number of event occurs in B
                                        </label>
                                        <Field
                                            name="eventB"
                                            type="text"
                                            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                        />
                                        <ErrorMessage
                                            name="eventB"
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

export default ProbabilityCalculator;
