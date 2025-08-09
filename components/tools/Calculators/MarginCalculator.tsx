"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const marginOptions = [
    { value: "gross", label: "Gross Margin" },
    { value: "net", label: "Net Margin" },
    { value: "operating", label: "Operation Profit Margin" },
];

const validationSchema = Yup.object().shape({
    marginType: Yup.string().required("Margin type is required"),
    totalSale: Yup.number()
        .typeError("Total Sale must be a number")
        .required("Total Sale is required"),
    netProfit: Yup.number()
        .typeError("Net Profit must be a number")
        .required("Net Profit is required"),
});

function calculateMargin(marginType: string, totalSale: number, netProfit: number): number {
    if (totalSale === 0) return 0;
    switch (marginType) {
        case "gross":
            // For demonstration, using netProfit as gross profit
            return (netProfit / totalSale) * 100;
        case "net":
            return (netProfit / totalSale) * 100;
        case "operating":
            // For demonstration, using netProfit as operating profit
            return (netProfit / totalSale) * 100;
        default:
            return 0;
    }
}

const MarginCalculator: React.FC = () => {
    const [result, setResult] = useState<number | null>(null);

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
                    <span className="text-foreground font-medium">Margin Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
                    Margin Calculator
                </h2>
                <Formik
                    initialValues={{
                        marginType: "gross",
                        totalSale: "",
                        netProfit: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const totalSale = parseFloat(values.totalSale as string);
                        const netProfit = parseFloat(values.netProfit as string);
                        const margin = calculateMargin(values.marginType, totalSale, netProfit);
                        setResult(margin);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    as="select"
                                    name="marginType"
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                >
                                    {marginOptions.map((option) => (
                                        <option value={option.value} key={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="marginType"
                                    component="div"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Total Sale
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">$</span>
                                        <Field
                                            name="totalSale"
                                            type="text"
                                            placeholder=""
                                            className="pl-7 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="totalSale"
                                        component="div"
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Net Profit (After Taxes)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">$</span>
                                        <Field
                                            name="netProfit"
                                            type="text"
                                            placeholder=""
                                            className="pl-7 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="netProfit"
                                        component="div"
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>
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
                            {result !== null && (
                                <div className="mt-6 text-center">
                                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Margin: {result.toFixed(2)}%
                                    </span>
                                </div>
                            )}
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

export default MarginCalculator;
