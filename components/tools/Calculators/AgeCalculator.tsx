"use client"
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Helper function to calculate age with 100% accuracy
function calculateAge(dob: string, birthTime?: string) {
    if (!dob) return null;

    // Parse date and time
    let [year, month, day] = dob.split("-").map(Number);
    let hours = 0, minutes = 0;
    if (birthTime && birthTime.length >= 4) {
        [hours, minutes] = birthTime.split(":").map(Number);
    }

    // If no birthTime, default to 00:00 (midnight)
    const birthDate = new Date(year, month - 1, day, hours, minutes);

    // Current date and time
    const now = new Date();

    // Calculate difference in milliseconds
    let diff = now.getTime() - birthDate.getTime();
    if (diff < 0) return null; // Future date

    // Calculate years, months, days, hours, minutes, seconds
    let ageDate = new Date(diff);

    // Years
    let years = now.getFullYear() - birthDate.getFullYear();

    // Months
    let months = now.getMonth() - birthDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }

    // Days
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) {
        // Go to previous month
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Hours, Minutes, Seconds
    let hoursNow = now.getHours();
    let minutesNow = now.getMinutes();
    let secondsNow = now.getSeconds();

    let hoursBirth = birthDate.getHours();
    let minutesBirth = birthDate.getMinutes();
    let secondsBirth = birthDate.getSeconds();

    let hoursDiff = hoursNow - hoursBirth;
    let minutesDiff = minutesNow - minutesBirth;
    let secondsDiff = secondsNow - secondsBirth;

    if (secondsDiff < 0) {
        minutesDiff--;
        secondsDiff += 60;
    }
    if (minutesDiff < 0) {
        hoursDiff--;
        minutesDiff += 60;
    }
    if (hoursDiff < 0) {
        days--;
        hoursDiff += 24;
        if (days < 0) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
            // Get days in previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
    }

    // Total days, weeks, months, hours, minutes, seconds
    const totalMilliseconds = now.getTime() - birthDate.getTime();
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return {
        years,
        months,
        days,
        hours: hoursDiff,
        minutes: minutesDiff,
        seconds: secondsDiff,
        totalDays,
        totalWeeks,
        totalMonths,
        totalHours,
        totalMinutes,
        totalSeconds,
        birthDate,
        now
    };
}

const validationSchema = Yup.object().shape({
    dob: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in the future"),
    birthTime: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]?$/, "Invalid time format (HH:mm)")
        .nullable()
        .notRequired(),
});

const initialValues = {
    dob: "",
    birthTime: "",
};

const AgeCalculator: React.FC = () => {
    const [result, setResult] = useState<any>(null);

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
                    <span className="text-foreground font-medium">Age Calculator</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-100">
                            Age Calculator
                        </h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const age = calculateAge(
                                    values.dob,
                                    values.birthTime && values.birthTime.length > 0 ? values.birthTime : "00:00"
                                );
                                setResult(age);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, setFieldValue, values }) => (
                                <Form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                                        {/* Date of Birth */}
                                        <div>
                                            <label
                                                htmlFor="dob"
                                                className="block mb-1 text-gray-700 dark:text-gray-200 font-medium"
                                            >
                                                Date Of Birth
                                            </label>
                                            <Field
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <ErrorMessage
                                                name="dob"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                        {/* Birth Time (optional) */}
                                        <div>
                                            <label
                                                htmlFor="birthTime"
                                                className="block mb-1 text-gray-700 dark:text-gray-200 font-medium"
                                            >
                                                Birth Time <span className="text-xs text-gray-500">(optional)</span>
                                            </label>
                                            <Field
                                                type="time"
                                                id="birthTime"
                                                name="birthTime"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                                                By Default: 12:00 AM
                                            </div>
                                            <ErrorMessage
                                                name="birthTime"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                            disabled={isSubmitting}
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                    {/* Result Section */}
                                    {result && (
                                        <div className="mt-8 bg-emerald-50 dark:bg-gray-900 border border-emerald-200 dark:border-gray-700 rounded p-6">
                                            <h3 className="text-lg font-semibold mb-4 text-emerald-700 dark:text-emerald-300">
                                                Your Age Result
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Years:</span> {result.years}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Months:</span> {result.months}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Days:</span> {result.days}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Hours:</span> {result.hours}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Minutes:</span> {result.minutes}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Seconds:</span> {result.seconds}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Total Months:</span> {result.totalMonths}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Total Weeks:</span> {result.totalWeeks}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Total Days:</span> {result.totalDays}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Total Hours:</span> {result.totalHours}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Total Minutes:</span> {result.totalMinutes}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-medium">Total Seconds:</span> {result.totalSeconds}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                                <div>
                                                    <span className="font-medium">Date of Birth:</span>{" "}
                                                    {result.birthDate.toLocaleString()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Current Date:</span>{" "}
                                                    {result.now.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
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

export default AgeCalculator;
