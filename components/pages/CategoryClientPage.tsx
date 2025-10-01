"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdBanner } from "@/components/ad-banner";
import { GlobalSearch } from "@/components/global-search";
import { categoriesAndTools } from "@/lib/categories";

const categories = [
    {
        slug: "text-tools",
        name: "Text Tools",
        description: "Edit, convert, and analyze text easily.",
        icon: "📝",
        color: "from-blue-500 to-cyan-500",
    },
    {
        slug: "image-tools",
        name: "Image Tools",
        description: "Image editing, conversion, and analysis tools.",
        icon: "🖼️",
        color: "from-violet-500 to-purple-500",
    },
    {
        slug: "developer-tools",
        name: "Developer Tools",
        description: "Handy utilities for developers and coders.",
        icon: "💻",
        color: "from-rose-500 to-pink-500",
    },
    {
        slug: "converters",
        name: "Converters",
        description: "Convert files, units, and more.",
        icon: "🔄",
        color: "from-red-500 to-blue-500",
    },
    {
        slug: "generators",
        name: "Generators",
        description: "Generate text, images, and data.",
        icon: "⚡",
        color: "from-purple-500 to-pink-500",
    },
    {
        slug: "calculators",
        name: "Calculators",
        description: "Calculate values, numbers, and more.",
        icon: "🧮",
        color: "from-yellow-500 to-orange-500",
    },
    {
        slug: "website-management",
        name: "Website Management",
        description: "Tools for managing and optimizing websites.",
        icon: "🌐",
        color: "from-cyan-500 to-blue-500",
    },
];

const CategoryClientPage = ({ page }: any) => {
    const [search, setSearch] = useState("");

    // Filter categories by search
    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.description.toLowerCase().includes(search.toLowerCase())
    );

    // Get tools for sidebar (flattened from categoriesAndTools)
    const allTools: { name: string; slug: string; category: string }[] = [];
    if (categoriesAndTools && Array.isArray(categoriesAndTools)) {
        categoriesAndTools.forEach((cat) => {
            if (cat.tools && Array.isArray(cat.tools)) {
                cat.tools.forEach((tool: any) => {
                    allTools.push({
                        name: tool.name,
                        slug: tool.slug,
                        category: cat.slug,
                    });
                });
            }
        });
    }

    // Filter tools by search for sidebar
    const filteredTools = search
        ? allTools.filter(
            (tool) =>
                tool.name.toLowerCase().includes(search.toLowerCase())
        )
        : allTools;
    return (<>
        <div className="min-h-screen bg-background transition-colors duration-200 flex flex-col">
            <Header />

            {/* Category Hero Section */}
            <section
                className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-900 dark:to-cyan-800 text-white py-12"
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Toolinger Categories
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-3xl mb-6">
                        Discover top tools by category. Find the best productivity tools, software, and resources tailored to your needs.
                    </p>
                    <div
                        className="mt-2 block w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                        style={{ minWidth: 0 }}
                    >
                        <GlobalSearch
                            placeholder="Search categories or tools..."
                        />
                    </div>
                </div>
            </section>

            {/* Ad Banner */}
            <div className="container mx-auto px-4 py-6">
                <AdBanner size="leaderboard" />
            </div>

            {/* Categories Grid */}
            <section className="py-8 flex-1">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Categories Grid */}
                        <div className="w-full lg:w-3/4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/category/${cat.slug}`}
                                            className={`
                        group rounded-xl shadow-md border border-border/60
                        bg-white dark:bg-zinc-900 dark:border-zinc-800
                        hover:shadow-lg transition
                        flex flex-col p-6 h-full
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                      `}
                                        >
                                            <div
                                                className={`w-14 h-14 flex items-center justify-center rounded-full text-3xl mb-4 bg-gradient-to-br ${cat.color} shadow`}
                                                aria-hidden="true"
                                            >
                                                {cat.icon}
                                            </div>
                                            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                                                {cat.name}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 mb-2 flex-1">
                                                {cat.description}
                                            </p>
                                            <span className="mt-2 text-sm text-blue-600 dark:text-cyan-400 font-medium group-hover:underline">
                                                Explore tools →
                                            </span>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                                        No categories found.
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Sidebar: Tools List */}
                        <aside className="w-full lg:w-1/4">
                            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-border/60 dark:border-zinc-800 p-4">
                                <h3 className="text-lg font-semibold mb-3">Popular Tools</h3>
                                <ul className="space-y-2 max-h-96 overflow-y-auto">
                                    {filteredTools.length > 0 ? (
                                        filteredTools.slice(0, 20).map((tool) => (
                                            <li key={tool.slug}>
                                                <Link
                                                    href={`/tool/${tool.slug}`}
                                                    className="block px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-zinc-800 transition"
                                                >
                                                    {tool.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500 dark:text-gray-400">No tools found.</li>
                                    )}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Ad Banner */}
            <div className="container mx-auto px-4 py-6">
                <AdBanner size="leaderboard" />
            </div>

            <div className="container mx-auto px-4 py-24">
                <div dangerouslySetInnerHTML={{ __html: page?.data?.pageContent || ""}}></div>
            </div>

            <Footer />
        </div>
    </>)
}

export default CategoryClientPage