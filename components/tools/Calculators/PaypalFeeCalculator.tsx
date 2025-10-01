"use client"
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { calculatePaypalFee as apiCalculatePaypalFee } from "@/app/api/AllTools"; // adjust path if needed
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const PaypalFeeCalculator = (props: { article?: any, seo?: any }) => {
    const [fee, setFee] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('Required').positive('Must be positive'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setError(null);
            setFee(null);
            try {
                // Ensure amount is a number
                const amount = Number(values.amount);
                const data = { amount };
                const result = await apiCalculatePaypalFee(data);
                // Assume API returns { fee: number } or just the fee number
                if (typeof result === "number") {
                    setFee(result);
                } else if (result && typeof result.fee === "number") {
                    setFee(result.fee);
                } else {
                    setError("Unexpected API response.");
                }
            } catch (err) {
                setError("Failed to calculate PayPal fee.");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-primary flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <Link href="/category/calculators" className="text-muted-foreground hover:text-primary">
                        Calculator Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Paypal Fee Calculator</span>
                </nav>
            </div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                                    htmlFor="amount"
                                >
                                    Enter Amount
                                </label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.amount && formik.errors.amount ? (
                                    <div className="text-red-500 text-xs italic">{formik.errors.amount}</div>
                                ) : null}
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60"
                                >
                                    {loading ? "Calculating..." : "Calculate Fee"}
                                </button>
                            </div>
                            {error && (
                                <div className="mt-4 text-center text-red-500 text-sm">{error}</div>
                            )}
                        </form>

                        {fee !== null && !loading && (
                            <div className="text-center mb-6">
                                <p className="text-lg text-gray-900 dark:text-gray-100">
                                    Calculated Fee: <span className="font-semibold">${fee.toFixed(2)}</span>
                                </p>
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

export default PaypalFeeCalculator;
