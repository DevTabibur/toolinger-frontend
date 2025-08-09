"use client"
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const AdsenseCalculator = () => {
    const [result, setResult] = useState(null);

    const formik = useFormik({
        initialValues: {
            pageImpressions: '',
            clickThroughRate: '',
            costPerClick: '',
        },
        validationSchema: Yup.object({
            pageImpressions: Yup.number().required('Required'),
            clickThroughRate: Yup.number().required('Required'),
            costPerClick: Yup.number().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/api/adsense-calculator', values);
                setResult(response.data);
            } catch (error) {
                console.error("Error calculating Adsense earnings:", error);
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
                    <span className="text-foreground font-medium">Adsense Calculator</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Adsense Calculator</h1>
                <p className="text-center mb-6">
                    To use prepostseo Adsense Calculator, Enter Total Page Impressions, Click Through Rate (CTR) and CPC. After that press Calculate button.
                </p>
                <div className="flex items-center justify-center">
                    <form onSubmit={formik.handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1" htmlFor="pageImpressions">
                                    Page Impressions
                                </label>
                                <input
                                    id="pageImpressions"
                                    name="pageImpressions"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pageImpressions}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.pageImpressions && formik.errors.pageImpressions ? (
                                    <div className="text-red-500 text-xs italic">{formik.errors.pageImpressions}</div>
                                ) : null}
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1" htmlFor="clickThroughRate">
                                    Click Through Rate (CTR) in %
                                </label>
                                <input
                                    id="clickThroughRate"
                                    name="clickThroughRate"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.clickThroughRate}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.clickThroughRate && formik.errors.clickThroughRate ? (
                                    <div className="text-red-500 text-xs italic">{formik.errors.clickThroughRate}</div>
                                ) : null}
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1" htmlFor="costPerClick">
                                    Cost Per Click
                                </label>
                                <input
                                    id="costPerClick"
                                    name="costPerClick"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.costPerClick}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.costPerClick && formik.errors.costPerClick ? (
                                    <div className="text-red-500 text-xs italic">{formik.errors.costPerClick}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Calculate Earning
                            </button>
                        </div>
                    </form>
                </div>

                {result && (
                    <div className="overflow-x-auto mt-8">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Period</th>
                                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Earnings</th>
                                    <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Daily</td>
                                    <td className="border px-4 py-2">${(result as any)?.dailyEarnings}</td>
                                    <td className="border px-4 py-2">{(result as any)?.dailyClicks ?? 0}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Monthly</td>
                                    <td className="border px-4 py-2">${(result as any)?.monthlyEarnings ?? 0}</td>
                                    <td className="border px-4 py-2">{(result as any)?.monthlyClicks ?? 0}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Yearly</td>
                                    <td className="border px-4 py-2">${(result as any)?.yearlyEarnings ?? 0}</td>
                                    <td className="border px-4 py-2">{(result as any)?.yearlyClicks ?? 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdsenseCalculator;
