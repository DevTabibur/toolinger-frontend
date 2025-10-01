"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { calculateCPM } from "@/app/api/AllTools";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const calculationOptions = [
    { value: "cost", label: "Cost" },
    { value: "impressions", label: "Impressions" },
    { value: "cpm", label: "CPM" },
];

const getValidationSchema = (mode: string) => {
    switch (mode) {
        case "cost":
            return Yup.object({
                impressions: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
                cpm: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
            });
        case "impressions":
            return Yup.object({
                cost: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
                cpm: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
            });
        case "cpm":
            return Yup.object({
                cost: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
                impressions: Yup.number()
                    .typeError("Required")
                    .required("Required")
                    .positive("Must be positive"),
            });
        default:
            return Yup.object();
    }
};

const CPMCalculator = (props: { article?: any, seo?: any }) => {
    const [mode, setMode] = useState("cost");
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cost: "",
            impressions: "",
            cpm: "",
        },
        validationSchema: getValidationSchema(mode),
        onSubmit: async (values) => {
            setLoading(true);
            setResult(null);
            try {
                // Prepare payload for API
                let payload: any = { mode };
                if (mode === "cost") {
                    payload.impressions = Number(values.impressions);
                    payload.cpm = Number(values.cpm);
                } else if (mode === "impressions") {
                    payload.cost = Number(values.cost);
                    payload.cpm = Number(values.cpm);
                } else if (mode === "cpm") {
                    payload.cost = Number(values.cost);
                    payload.impressions = Number(values.impressions);
                }
                const data = await calculateCPM(payload);
                if (data && typeof data.result === "number") {
                    setResult(data.result);
                } else {
                    setResult(null);
                }
            } catch (e) {
                setResult(null);
            }
            setLoading(false);
        },
    });

    // Helper to render the correct input fields
    const renderInputs = () => {
        switch (mode) {
            case "cost":
                return (
                    <>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label
                                htmlFor="impressions"
                                className="text-xs text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Impressions
                            </label>
                            <input
                                id="impressions"
                                name="impressions"
                                type="number"
                                min="0"
                                step="any"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.impressions}
                                className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${formik.touched.impressions && formik.errors.impressions
                                    ? "border-red-400"
                                    : "border-green-400"
                                    }`}
                            />
                            {formik.touched.impressions && formik.errors.impressions ? (
                                <div className="text-red-500 text-xs italic mt-1">
                                    {formik.errors.impressions}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label
                                htmlFor="cpm"
                                className="text-xs text-gray-700 dark:text-gray-300 mb-1"
                            >
                                CPM
                            </label>
                            <input
                                id="cpm"
                                name="cpm"
                                type="number"
                                min="0"
                                step="any"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cpm}
                                className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${formik.touched.cpm && formik.errors.cpm
                                    ? "border-red-400"
                                    : "border-green-400"
                                    }`}
                            />
                            {formik.touched.cpm && formik.errors.cpm ? (
                                <div className="text-red-500 text-xs italic mt-1">
                                    {formik.errors.cpm}
                                </div>
                            ) : null}
                        </div>
                    </>
                );
            case "impressions":
                return (
                    <>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label
                                htmlFor="cost"
                                className="text-xs text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Cost
                            </label>
                            <input
                                id="cost"
                                name="cost"
                                type="number"
                                min="0"
                                step="any"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cost}
                                className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${formik.touched.cost && formik.errors.cost
                                    ? "border-red-400"
                                    : "border-green-400"
                                    }`}
                            />
                            {formik.touched.cost && formik.errors.cost ? (
                                <div className="text-red-500 text-xs italic mt-1">
                                    {formik.errors.cost}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label
                                htmlFor="cpm"
                                className="text-xs text-gray-700 dark:text-gray-300 mb-1"
                            >
                                CPM
                            </label>
                            <input
                                id="cpm"
                                name="cpm"
                                type="number"
                                min="0"
                                step="any"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cpm}
                                className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${formik.touched.cpm && formik.errors.cpm
                                    ? "border-red-400"
                                    : "border-green-400"
                                    }`}
                            />
                            {formik.touched.cpm && formik.errors.cpm ? (
                                <div className="text-red-500 text-xs italic mt-1">
                                    {formik.errors.cpm}
                                </div>
                            ) : null}
                        </div>
                    </>
                );
            case "cpm":
                return (
                    <>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label
                                htmlFor="cost"
                                className="text-xs text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Cost
                            </label>
                            <input
                                id="cost"
                                name="cost"
                                type="number"
                                min="0"
                                step="any"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cost}
                                className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${formik.touched.cost && formik.errors.cost
                                    ? "border-red-400"
                                    : "border-green-400"
                                    }`}
                            />
                            {formik.touched.cost && formik.errors.cost ? (
                                <div className="text-red-500 text-xs italic mt-1">
                                    {formik.errors.cost}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label
                                htmlFor="impressions"
                                className="text-xs text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Impressions
                            </label>
                            <input
                                id="impressions"
                                name="impressions"
                                type="number"
                                min="0"
                                step="any"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.impressions}
                                className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${formik.touched.impressions && formik.errors.impressions
                                    ? "border-red-400"
                                    : "border-green-400"
                                    }`}
                            />
                            {formik.touched.impressions && formik.errors.impressions ? (
                                <div className="text-red-500 text-xs italic mt-1">
                                    {formik.errors.impressions}
                                </div>
                            ) : null}
                        </div>
                    </>
                );
            default:
                return null;
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
                    <span className="text-foreground font-medium">CPM Calculator</span>
                </nav>
            </div>
            <div className="container mx-auto px-4 py-4">





            </div>




            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">CPM Calculator</h1>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            Calculate Cost, Impressions, or CPM (Cost per Mille) for your advertising campaigns.
                        </p>
                        <form
                            onSubmit={formik.handleSubmit}
                            className="bg-white dark:bg-gray-800 shadow rounded px-4 py-6 mb-4 w-full max-w-2xl mx-auto"
                        >
                            {/* Dropdown */}
                            <div className="mb-6">
                                <select
                                    id="cpmMode"
                                    name="cpmMode"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className="w-full border border-green-400 rounded px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {calculationOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {renderInputs()}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                disabled={loading}
                            >
                                {loading ? "Calculating..." : "Calculate"}
                            </button>
                        </form>
                        {result !== null && (
                            <div className="bg-green-50 dark:bg-green-900 border border-green-400 rounded p-4 mt-4 text-center">
                                <span className="text-lg font-semibold text-green-700 dark:text-green-200">
                                    {mode === "cost" && <>Cost: <span className="font-bold">${result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></>}
                                    {mode === "impressions" && <>Impressions: <span className="font-bold">{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></>}
                                    {mode === "cpm" && <>CPM: <span className="font-bold">${result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></>}
                                </span>
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

export default CPMCalculator;
