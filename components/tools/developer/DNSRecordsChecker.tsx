"use client";
import React, { useState } from "react";
import { ChevronRight, Home, Search } from "lucide-react";
import Link from "next/link";

export default function DNSRecordsChecker() {
    const [domain, setDomain] = useState("");
    const [submittedValue, setSubmittedValue] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedValue(domain.trim());
        console.log("domain", e)
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
                        href="/category/text-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Text Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">DNS Records Checker</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-2">
                                DNS Records Checker
                            </h2>
                            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                                To use Toolinger <b className="text-gray-900 dark:text-gray-100">DNS Records Checker</b>, Paste domain name in the input box given below and click on <b className="text-gray-900 dark:text-gray-100">check dns records</b> Button.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-center bg-white dark:bg-gray-800 border border-green-400 rounded mb-6 overflow-hidden">
                                    <div className="flex items-center justify-center bg-green-400 h-full px-4 py-3">
                                        <Search className="text-white" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        className="flex-1 px-4 py-3 outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="domain name"
                                        value={domain}
                                        onChange={e => setDomain(e.target.value)}
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-2 rounded transition disabled:opacity-50"
                                        disabled={!domain.trim()}
                                    >
                                        Check DNS Records
                                    </button>
                                </div>
                            </form>
                            {submittedValue && (
                                <div className="mt-6 text-center text-green-700 dark:text-green-300 font-medium">
                                    Submitted domain: <span className="font-mono">{submittedValue}</span>
                                </div>
                            )}
                        </div>

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
}
