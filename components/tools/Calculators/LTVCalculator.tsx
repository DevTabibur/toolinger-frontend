"use client";
import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const ltvOptions = [
    {
        value: "deposit",
        label: "Deposit amount - To Calculate LTV and Loan Amount",
    },
    {
        value: "loan",
        label: "Loan amount - To Calculate LTV and Deposit Amount",
    },
    {
        value: "ltv",
        label: "LTV - To Calculate Loan Amount and Deposit Amount",
    },
];

const getValidationSchema = (mode: string) => {
    switch (mode) {
        case "deposit":
            return Yup.object({
                purchasePrice: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
                depositAmount: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .min(0, "Must be 0 or more"),
            });
        case "loan":
            return Yup.object({
                purchasePrice: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
                loanAmount: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .min(0, "Must be 0 or more"),
            });
        case "ltv":
            return Yup.object({
                purchasePrice: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
                ltv: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .min(0, "Must be 0 or more")
                    .max(100, "Cannot exceed 100"),
            });
        default:
            return Yup.object();
    }
};

const calculateResults = (mode: string, values: any) => {
    const purchasePrice = parseFloat(values.purchasePrice);
    const depositAmount = parseFloat(values.depositAmount);
    const loanAmount = parseFloat(values.loanAmount);
    const ltv = parseFloat(values.ltv);

    if (isNaN(purchasePrice) || purchasePrice <= 0) return null;

    switch (mode) {
        case "deposit":
            if (isNaN(depositAmount)) return null;
            const loanAmt = purchasePrice - depositAmount;
            const ltvVal = (loanAmt / purchasePrice) * 100;
            return {
                loanAmount: loanAmt,
                ltv: ltvVal,
                depositAmount,
                purchasePrice,
            };
        case "loan":
            if (isNaN(loanAmount)) return null;
            const depositAmt = purchasePrice - loanAmount;
            const ltvValue = (loanAmount / purchasePrice) * 100;
            return {
                loanAmount,
                ltv: ltvValue,
                depositAmount: depositAmt,
                purchasePrice,
            };
        case "ltv":
            if (isNaN(ltv)) return null;
            const loanAmountFromLtv = (ltv / 100) * purchasePrice;
            const depositAmountFromLtv = purchasePrice - loanAmountFromLtv;
            return {
                loanAmount: loanAmountFromLtv,
                ltv,
                depositAmount: depositAmountFromLtv,
                purchasePrice,
            };
        default:
            return null;
    }
};

const LTVCalculator = () => {
    const [mode, setMode] = useState("deposit");
    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            purchasePrice: "",
            depositAmount: "",
            loanAmount: "",
            ltv: "",
        },
        validationSchema: getValidationSchema(mode),
        onSubmit: () => {
            setSubmitted(true);
        },
    });

    // Reset form and result when mode changes
    React.useEffect(() => {
        formik.resetForm();
        setSubmitted(false);
    }, [mode]);

    // Calculate results only when submitted and valid
    const results = useMemo(() => {
        if (!submitted) return null;
        if (!formik.isValid) return null;
        return calculateResults(mode, formik.values);
    }, [submitted, formik.values, formik.isValid, mode]);
 
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
                    <span className="text-foreground font-medium">LTV Calculator</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="bg-white dark:bg-gray-800 shadow rounded px-4 py-6 mb-4 w-full max-w-2xl mx-auto"
                        >
                            {/* Dropdown */}
                            <div className="mb-6">
                                <select
                                    id="ltvMode"
                                    name="ltvMode"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className="w-full border border-green-400 rounded px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {ltvOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Purchase Price */}
                                <div>
                                    <label
                                        htmlFor="purchasePrice"
                                        className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                                    >
                                        Purchase Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                                        <input
                                            id="purchasePrice"
                                            name="purchasePrice"
                                            type="number"
                                            min="0"
                                            step="any"
                                            placeholder=""
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.purchasePrice}
                                            className="pl-7 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    {formik.touched.purchasePrice && formik.errors.purchasePrice ? (
                                        <div className="text-red-500 text-xs italic mt-1">
                                            {formik.errors.purchasePrice}
                                        </div>
                                    ) : null}
                                </div>
                                {/* Second input depends on mode */}
                                {mode === "deposit" && (
                                    <div>
                                        <label
                                            htmlFor="depositAmount"
                                            className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                                        >
                                            Deposit amount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                                            <input
                                                id="depositAmount"
                                                name="depositAmount"
                                                type="number"
                                                min="0"
                                                step="any"
                                                placeholder=""
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.depositAmount}
                                                className="pl-7 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        {formik.touched.depositAmount && formik.errors.depositAmount ? (
                                            <div className="text-red-500 text-xs italic mt-1">
                                                {formik.errors.depositAmount}
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                                {mode === "loan" && (
                                    <div>
                                        <label
                                            htmlFor="loanAmount"
                                            className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                                        >
                                            Loan amount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
                                            <input
                                                id="loanAmount"
                                                name="loanAmount"
                                                type="number"
                                                min="0"
                                                step="any"
                                                placeholder=""
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.loanAmount}
                                                className="pl-7 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        {formik.touched.loanAmount && formik.errors.loanAmount ? (
                                            <div className="text-red-500 text-xs italic mt-1">
                                                {formik.errors.loanAmount}
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                                {mode === "ltv" && (
                                    <div>
                                        <label
                                            htmlFor="ltv"
                                            className="block text-gray-700 dark:text-gray-300 text-sm mb-1"
                                        >
                                            LTV (%)
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="ltv"
                                                name="ltv"
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="any"
                                                placeholder=""
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.ltv}
                                                className="pl-3 pr-2 py-2 w-full border border-green-400 rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">%</span>
                                        </div>
                                        {formik.touched.ltv && formik.errors.ltv ? (
                                            <div className="text-red-500 text-xs italic mt-1">
                                                {formik.errors.ltv}
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60"
                                    disabled={formik.isSubmitting}
                                >
                                    Calculate
                                </button>
                            </div>
                        </form>
                        {/* Results */}
                        {submitted && results && (
                            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6 mt-4">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Results</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-gray-600 dark:text-gray-300">Purchase Price:</span>
                                        <span className="font-bold text-gray-900 dark:text-gray-100">${results.purchasePrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 dark:text-gray-300">Deposit Amount:</span>
                                        <span className="font-bold text-gray-900 dark:text-gray-100">${results.depositAmount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 dark:text-gray-300">Loan Amount:</span>
                                        <span className="font-bold text-gray-900 dark:text-gray-100">${results.loanAmount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-600 dark:text-gray-300">LTV:</span>
                                        <span className="font-bold text-gray-900 dark:text-gray-100">{results.ltv?.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</span>
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


        </>
    );
};

export default LTVCalculator;
