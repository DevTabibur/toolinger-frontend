"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Head from "next/head";

function formatCurrency(num: number) {
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
}

const AdsenseCalculator = ({ page }: any) => {
    
    const [inputs, setInputs] = useState({
        pageImpressions: "",
        clickThroughRate: "",
        costPerClick: "",
    });
    const [touched, setTouched] = useState({
        pageImpressions: false,
        clickThroughRate: false,
        costPerClick: false,
    });
    const [result, setResult] = useState<null | {
        dailyEarnings: number;
        monthlyEarnings: number;
        yearlyEarnings: number;
        dailyClicks: number;
        monthlyClicks: number;
        yearlyClicks: number;
    }>(null);

    // Validation
    const errors: { [key: string]: string } = {};
    if (
        touched.pageImpressions &&
        (!inputs.pageImpressions || Number(inputs.pageImpressions) <= 0)
    ) {
        errors.pageImpressions = "Required";
    }
    if (
        touched.clickThroughRate &&
        (!inputs.clickThroughRate || Number(inputs.clickThroughRate) < 0)
    ) {
        errors.clickThroughRate = "Required";
    }
    if (
        touched.costPerClick &&
        (!inputs.costPerClick || Number(inputs.costPerClick) < 0)
    ) {
        errors.costPerClick = "Required";
    }

    // Calculation logic
    function calculateAdsense({
        pageImpressions,
        clickThroughRate,
        costPerClick,
    }: {
        pageImpressions: number;
        clickThroughRate: number;
        costPerClick: number;
    }) {
        // Clicks = Impressions * (CTR / 100)
        const dailyClicks = pageImpressions * (clickThroughRate / 100);
        const dailyEarnings = dailyClicks * costPerClick;
        const monthlyClicks = dailyClicks * 30;
        const monthlyEarnings = dailyEarnings * 30;
        const yearlyClicks = dailyClicks * 365;
        const yearlyEarnings = dailyEarnings * 365;
        return {
            dailyEarnings,
            monthlyEarnings,
            yearlyEarnings,
            dailyClicks,
            monthlyClicks,
            yearlyClicks,
        };
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTouched((prev) => ({
            ...prev,
            [e.target.name]: true,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            pageImpressions: true,
            clickThroughRate: true,
            costPerClick: true,
        });

        if (
            !inputs.pageImpressions ||
            !inputs.clickThroughRate ||
            !inputs.costPerClick ||
            Number(inputs.pageImpressions) <= 0 ||
            Number(inputs.clickThroughRate) < 0 ||
            Number(inputs.costPerClick) < 0
        ) {
            setResult(null);
            return;
        }

        const values = {
            pageImpressions: Number(inputs.pageImpressions),
            clickThroughRate: Number(inputs.clickThroughRate),
            costPerClick: Number(inputs.costPerClick),
        };
        setResult(calculateAdsense(values));
    };


    
   

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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h1 className="text-2xl font-bold mb-4 text-center">Adsense Calculator</h1>
                        <p className="text-center mb-6">
                            To use toolinger <b>Adsense Calculator</b>, Enter Total Page Impressions, Click Through Rate (CTR) and CPC. After that press <b>Calculate</b> button.
                        </p>
                        <div className="flex items-center justify-center">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white dark:bg-gray-800  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
                            >
                                <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-6 space-y-4 md:space-y-0">
                                    <div className="flex flex-col w-full">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1" htmlFor="pageImpressions">
                                            Page Impressions
                                        </label>
                                        <input
                                            id="pageImpressions"
                                            name="pageImpressions"
                                            type="number"
                                            min="0"
                                            step="1"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={inputs.pageImpressions}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        {errors.pageImpressions ? (
                                            <div className="text-red-500 text-xs italic">{errors.pageImpressions}</div>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1" htmlFor="clickThroughRate">
                                            Click Through Rate (CTR) in %
                                        </label>
                                        <input
                                            id="clickThroughRate"
                                            name="clickThroughRate"
                                            type="number"
                                            min="0"
                                            step="any"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={inputs.clickThroughRate}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        {errors.clickThroughRate ? (
                                            <div className="text-red-500 text-xs italic">{errors.clickThroughRate}</div>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1" htmlFor="costPerClick">
                                            Cost Per Click
                                        </label>
                                        <input
                                            id="costPerClick"
                                            name="costPerClick"
                                            type="number"
                                            min="0"
                                            step="any"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={inputs.costPerClick}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        {errors.costPerClick ? (
                                            <div className="text-red-500 text-xs italic">{errors.costPerClick}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Calculate Earning
                                    </button>
                                </div>
                            </form>


                        </div>
                        {result && (
                            <div className="overflow-x-auto mt-8">
                                <table className="min-w-full bg-white dark:bg-gray-800 border">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 bg-yellow-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border">Period</th>
                                            <th className="py-2 px-4 bg-yellow-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border">Earnings</th>
                                            <th className="py-2 px-4 bg-yellow-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border">Clicks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2">Daily</td>
                                            <td className="border px-4 py-2">{formatCurrency(result.dailyEarnings)}</td>
                                            <td className="border px-4 py-2">{Math.round(result.dailyClicks)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Monthly</td>
                                            <td className="border px-4 py-2">{formatCurrency(result.monthlyEarnings)}</td>
                                            <td className="border px-4 py-2">{Math.round(result.monthlyClicks)}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Yearly</td>
                                            <td className="border px-4 py-2">{formatCurrency(result.yearlyEarnings)}</td>
                                            <td className="border px-4 py-2">{Math.round(result.yearlyClicks)}</td>
                                        </tr>
                                    </tbody>
                                </table>
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

export default AdsenseCalculator;
