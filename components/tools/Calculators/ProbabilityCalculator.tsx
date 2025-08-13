"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ChevronRight, HomeIcon } from "lucide-react";

const validationSchema = Yup.object().shape({
    possibleOutcomes: Yup.number()
        .typeError("Number of possible outcomes must be a number")
        .required("Number of possible outcomes is required")
        .moreThan(0, "Number of possible outcomes must be greater than 0"),
    eventA: Yup.number()
        .typeError("Number of event occurs in A must be a number")
        .required("Number of event occurs in A is required")
        .min(0, "Number of event occurs in A cannot be negative"),
    eventB: Yup.number()
        .typeError("Number of event occurs in B must be a number")
        .required("Number of event occurs in B is required")
        .min(0, "Number of event occurs in B cannot be negative"),
});

function calculateProbabilities(possibleOutcomes: number, eventA: number, eventB: number) {
    // Probabilities
    const pA = possibleOutcomes !== 0 ? eventA / possibleOutcomes : 0;
    const pB = possibleOutcomes !== 0 ? eventB / possibleOutcomes : 0;
    const pNotA = 1 - pA;
    const pNotB = 1 - pB;
    // Intersection and Union (assuming independence for intersection)
    const pAandB = pA * pB;
    const pAorB = pA + pB - pAandB;

    // For display, also show as fraction of total outcomes
    return {
        pA: isFinite(pA) ? pA : 0,
        pNotA: isFinite(pNotA) ? pNotA : 0,
        pB: isFinite(pB) ? pB : 0,
        pNotB: isFinite(pNotB) ? pNotB : 0,
        pAandB: isFinite(pAandB) ? pAandB : 0,
        pAorB: isFinite(pAorB) ? pAorB : 0,
        nA: eventA,
        nB: eventB,
        nNotA: possibleOutcomes - eventA,
        nNotB: possibleOutcomes - eventB,
        nAandB: Math.round(eventA * eventB / possibleOutcomes), // for display, intersection count
        nAorB: eventA + eventB - Math.round(eventA * eventB / possibleOutcomes), // for display, union count
        total: possibleOutcomes,
    };
}

const ProbabilityCalculator: React.FC = () => {
    const [result, setResult] = useState<null | ReturnType<typeof calculateProbabilities>>(null);

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
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                    Probability Calculator
                </h2>
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
                            onSubmit={(values, { setSubmitting }) => {
                                const possibleOutcomes = Number(values.possibleOutcomes);
                                const eventA = Number(values.eventA);
                                const eventB = Number(values.eventB);
                                setResult(calculateProbabilities(possibleOutcomes, eventA, eventB));
                                setSubmitting(false);
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
                                                type="number"
                                                min="1"
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
                                                type="number"
                                                min="0"
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
                                            type="number"
                                            min="0"
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
                    <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center">
                        <span className="uppercase text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-widest">
                            Advertisement
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center">
                        <span className="uppercase text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-widest">
                            Advertisement
                        </span>
                    </div>
                    {/* Second column: col-span-6 on md+ */}
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center">
                        <span className="uppercase text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-widest">
                            Advertisement
                        </span>
                    </div>
                </div>

                {/* Result Table */}
                {result && (
                    <div className="max-w-2xl mx-auto mt-8">
                        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                            Result
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Event</th>
                                        <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Count</th>
                                        <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Probability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">A</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.nA} / {result.total}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.pA.toFixed(4)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">A&apos; (not A)</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.nNotA} / {result.total}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.pNotA.toFixed(4)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">B</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.nB} / {result.total}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.pB.toFixed(4)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">B&apos; (not B)</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.nNotB} / {result.total}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.pNotB.toFixed(4)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">A ∩ B (A and B)</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.nAandB} / {result.total}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.pAandB.toFixed(4)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">A ∪ B (A or B)</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.nAorB} / {result.total}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{result.pAorB.toFixed(4)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <p>
                                <b>Note:</b> Intersection (A ∩ B) assumes independence between A and B. Union (A ∪ B) is calculated as P(A) + P(B) - P(A ∩ B).
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProbabilityCalculator;
