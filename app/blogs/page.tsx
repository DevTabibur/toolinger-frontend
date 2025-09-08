"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCategories } from "@/app/api/BlogCategory.api";
import { Sun, Moon, Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { getAllBlogs } from "../api/Blog.Api";
import Image from "next/image";

// Dummy blog data for demonstration
const dummyBlogs = [
    {
        id: 1,
        slug: "how-to-build-a-blog-with-next-js",
        title: "How to Build a Blog with Next.js",
        excerpt: "Learn how to build a modern blog using Next.js and React.",
        category: "Development",
        date: "2024-06-01",
        image: "https://source.unsplash.com/random/400x200?code",
    },
    {
        id: 2,
        slug: "10-tips-for-better-productivity",
        title: "10 Tips for Better Productivity",
        excerpt: "Boost your productivity with these actionable tips.",
        category: "Productivity",
        date: "2024-05-28",
        image: "https://source.unsplash.com/random/400x200?productivity",
    },
    {
        id: 3,
        slug: "understanding-dark-mode-in-web-apps",
        title: "Understanding Dark Mode in Web Apps",
        excerpt: "A deep dive into implementing dark mode for your web projects.",
        category: "Design",
        date: "2024-05-20",
        image: "https://source.unsplash.com/random/400x200?darkmode",
    },
    {
        id: 4,
        slug: "react-animation-with-framer-motion",
        title: "React Animation with Framer Motion",
        excerpt: "Bring your UI to life with smooth animations using Framer Motion.",
        category: "Development",
        date: "2024-05-15",
        image: "https://source.unsplash.com/random/400x200?animation",
    },
    {
        id: 5,
        slug: "staying-motivated-as-a-remote-worker",
        title: "Staying Motivated as a Remote Worker",
        excerpt: "Remote work can be tough. Here’s how to stay motivated.",
        category: "Productivity",
        date: "2024-05-10",
        image: "https://source.unsplash.com/random/400x200?remote",
    },
    {
        id: 6,
        slug: "minimalist-ui-design-principles",
        title: "Minimalist UI Design Principles",
        excerpt: "Explore the core principles of minimalist UI design.",
        category: "Design",
        date: "2024-05-05",
        image: "https://source.unsplash.com/random/400x200?minimal",
    },
];

const trendingBlogs = dummyBlogs.slice(0, 3);

const containerVariants: any = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.08, duration: 0.5, type: "spring", stiffness: 60 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24, transition: { duration: 0.2 } },
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function useTheme() {
    // Simple theme hook for demo (could use next-themes or similar in real app)
    const [theme, setTheme] = useState<"light" | "dark">(
        typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return { theme, setTheme };
}

const BLOGS_PER_PAGE = 6;

export default function BlogsPage() {
    const { theme, setTheme } = useTheme();
    const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    // Fetch categories from API
    useEffect(() => {
        let mounted = true;
        async function fetchCategories() {
            setLoading(true);
            try {
                const res = await getAllCategories();
                if (mounted && res?.data) {
                    setCategories(res.data);
                }
            } catch (e) {
                // fallback to dummy categories if API fails
                setCategories([]);
            } finally {
                setLoading(false);
            }
        }
        async function fetchBlogs() {
            setLoading(true);
            try {
                const res = await getAllBlogs();
                if (mounted && res?.data) {
                    setBlogs(res.data);
                }
            } catch (e) {
                // fallback to dummy categories if API fails
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
        fetchBlogs()
        return () => {
            mounted = false;
        };
    }, []);

    // Filter blogs by category and search
    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory = activeTab === "all" || blog.category?.name.toLowerCase() === activeTab;
        const matchesSearch =
            blog?.title?.toLowerCase().includes(search.toLowerCase()) ||
            blog?.slug?.toLowerCase().includes(search.toLowerCase()) ||
            blog?.excerpt?.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
    const paginatedBlogs = filteredBlogs.slice(
        (page - 1) * BLOGS_PER_PAGE,
        page * BLOGS_PER_PAGE
    );

    // Reset page to 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [activeTab, search]);

    // --- Pagination Component (added as per request) ---
    function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (p: number) => void }) {
        // Show up to 5 page numbers, with ... if needed
        const getPageNumbers = () => {
            const pages = [];
            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
                if (page <= 3) {
                    pages.push(1, 2, 3, 4, "...", totalPages);
                } else if (page >= totalPages - 2) {
                    pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                } else {
                    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
                }
            }
            return pages;
        };

        return (
            <div className="flex justify-center mt-10">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={classNames(
                            "px-3 py-2 rounded-l-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition",
                            page === 1 ? "opacity-50 cursor-not-allowed" : ""
                        )}
                    >
                        Previous
                    </button>
                    {getPageNumbers().map((p, idx) =>
                        p === "..." ? (
                            <span
                                key={`ellipsis-${idx}`}
                                className="px-3 py-2 border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 select-none"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => setPage(Number(p))}
                                className={classNames(
                                    "px-3 py-2 border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition",
                                    page === p ? "bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white font-bold" : ""
                                )}
                            >
                                {p}
                            </button>
                        )
                    )}
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className={classNames(
                            "px-3 py-2 rounded-r-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition",
                            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        )}
                    >
                        Next
                    </button>
                </nav>
            </div>
        );
    }
    // --- End Pagination Component ---


    console.log("blogs", blogs)
    return (
        <>
            <Header />
            <section className="relative w-full bg-gradient-to-br from-[#00dbed] via-[#005c82] to-[#101827] py-12 md:py-20 overflow-hidden">
                {/* Animated Particles (Bubbles/Stars) */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Example: 8 animated bubbles/stars */}
                    {[...Array(8)].map((_, i) => {
                        // Randomize initial position, size, duration, and type (bubble/star)
                        const isStar = i % 2 === 0;
                        const size = isStar
                            ? Math.floor(Math.random() * 18) + 12
                            : Math.floor(Math.random() * 32) + 24;
                        const left = Math.random() * 90 + "%";
                        const delay = Math.random() * 2;
                        const duration = Math.random() * 8 + 8;
                        const topStart = Math.random() * 80 + 10;
                        const topEnd = topStart + (Math.random() * 20 + 10);

                        return (
                            <motion.div
                                key={i}
                                initial={{
                                    opacity: 0.5,
                                    y: 0,
                                    left,
                                    top: `${topStart}%`,
                                }}
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    y: [0, -40],
                                    top: [`${topStart}%`, `${topEnd}%`],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration,
                                    delay,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    position: "absolute",
                                    left,
                                    top: `${topStart}%`,
                                    zIndex: 1,
                                }}
                            >
                                {isStar ? (
                                    <svg
                                        width={size}
                                        height={size}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="opacity-70"
                                    >
                                        <polygon
                                            points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10"
                                            fill="#fff"
                                            fillOpacity="0.13"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width={size}
                                        height={size}
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        className="opacity-40"
                                    >
                                        <circle
                                            cx="20"
                                            cy="20"
                                            r="18"
                                            fill="#fff"
                                            fillOpacity="0.09"
                                        />
                                    </svg>
                                )}
                            </motion.div>
                        );
                    })}
                    {/* Static decorative SVGs (optional, can keep for extra depth) */}
                    <svg
                        className="absolute top-0 left-0 w-40 h-40 opacity-30"
                        viewBox="0 0 200 200"
                        fill="none"
                    >
                        <circle cx="100" cy="100" r="100" fill="#fff" fillOpacity="0.08" />
                    </svg>
                    <svg
                        className="absolute bottom-0 right-0 w-64 h-64 opacity-20"
                        viewBox="0 0 300 300"
                        fill="none"
                    >
                        <rect x="0" y="0" width="300" height="300" rx="80" fill="#fff" fillOpacity="0.06" />
                    </svg>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4"
                    >
                        Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00dbed] to-[#005c82]">Toolinger Blog</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-xl text-white/90 max-w-2xl mb-6"
                    >
                        Insights, tutorials, and stories from the world of development, design, and productivity. Stay ahead with the latest trends, tips, and inspiration for creators and innovators.
                    </motion.p>
                </div>

            </section>

            <div className="min-h-screen bg-gray-50 dark:bg-[#101827] transition-colors duration-300">
                <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row gap-8">
                    {/* Left: Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Top Bar: Title, Search, Theme */}
                        <motion.header
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
                            initial={{ opacity: 0, y: -24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    Latest Articles
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {filteredBlogs.length} article{filteredBlogs.length !== 1 && "s"} found
                                    {activeTab !== "all" && (
                                        <>
                                            {" "}
                                            in <span className="font-semibold">{categories.find(c => c.name.toLowerCase() === activeTab)?.name || activeTab}</span>
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative w-64 max-w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00dbed] focus:border-transparent transition"
                                    />
                                </div>

                            </div>
                        </motion.header>

                        {/* Category Tabs */}
                        <motion.div
                            className="my-12"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    className={classNames(
                                        "px-4 py-2 rounded-full font-medium transition",
                                        activeTab === "all"
                                            ? "bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white shadow"
                                            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                                    )}
                                    onClick={() => setActiveTab("all")}
                                >
                                    All
                                </button>
                                {loading ? (
                                    <span className="px-4 py-2 text-gray-400">Loading...</span>
                                ) : (
                                    categories.map((cat) => (
                                        <button
                                            key={cat.slug}
                                            className={classNames(
                                                "px-4 py-2 rounded-full font-medium transition",
                                                activeTab === cat.name.toLowerCase()
                                                    ? "bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white shadow"
                                                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                                            )}
                                            onClick={() => setActiveTab(cat.name.toLowerCase())}
                                        >
                                            {cat.name}
                                        </button>
                                    ))
                                )}
                            </div>
                        </motion.div>

                        {/* Blog List */}
                        <motion.section
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {paginatedBlogs.length === 0 ? (
                                    <motion.div
                                        key="no-blogs"
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="text-center text-gray-500 dark:text-gray-400 py-16"
                                    >
                                        No blogs found in this category.
                                    </motion.div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {paginatedBlogs.map((blog) => (
                                            <motion.article
                                                key={blog.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="bg-white dark:bg-gray-900 rounded-xl shadow border hover:shadow-lg transition overflow-hidden flex flex-col"
                                            >
                                                <Link href={`/blogs/${blog.slug}`} className="block">
                                                    {blog?.blogFeaturedImage ? (
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${blog.blogFeaturedImage}`}
                                                            alt={blog.title || "Blog featured image"}
                                                            className="w-full h-40 object-cover"
                                                            width={600}
                                                            height={160}
                                                            priority={false}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
                                                            No Image
                                                        </div>
                                                    )}
                                                </Link>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <span className="text-xs uppercase tracking-wider text-[#00dbed] font-semibold mb-2">
                                                        {blog.category}
                                                    </span>
                                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                                        <Link href={`/blogs/${blog.slug}`} className="hover:underline">
                                                            {blog.title}
                                                        </Link>
                                                    </h2>
                                                    <p className="text-gray-600 dark:text-gray-400 flex-1">{blog.excerpt}</p>
                                                    <div className="mt-4 flex items-center justify-between">
                                                        <span className="text-xs text-gray-400">{blog.date}</span>
                                                        <Link
                                                            href={`/blogs/${blog.slug}`}
                                                            className="text-[#005c82] dark:text-[#00dbed] font-semibold hover:underline"
                                                        >
                                                            Read More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.article>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.section>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                        )}
                    </div>

                    {/* Right: Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
                        {/* Trending Now */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Trending Now</h3>
                            <ol className="space-y-3">
                                {trendingBlogs.map((blog, idx) => (
                                    <li key={blog.id} className="flex items-start gap-2">
                                        <span className={classNames(
                                            "w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm",
                                            idx === 0
                                                ? "bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white"
                                                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                        )}>
                                            {idx + 1}
                                        </span>
                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="text-sm text-gray-900 dark:text-white hover:underline font-medium line-clamp-2"
                                        >
                                            {blog.title}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        {/* Categories */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        className={classNames(
                                            "w-full text-left px-3 py-2 rounded-lg transition font-medium",
                                            activeTab === "all"
                                                ? "bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white shadow"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        )}
                                        onClick={() => setActiveTab("all")}
                                    >
                                        All
                                    </button>
                                </li>
                                {loading ? (
                                    <li>
                                        <span className="px-3 py-2 text-gray-400 block">Loading...</span>
                                    </li>
                                ) : (
                                    categories.map((cat) => (
                                        <li key={cat.slug}>
                                            <button
                                                className={classNames(
                                                    "w-full text-left px-3 py-2 rounded-lg transition font-medium",
                                                    activeTab === cat.name.toLowerCase()
                                                        ? "bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white shadow"
                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                                )}
                                                onClick={() => setActiveTab(cat.name.toLowerCase())}
                                            >
                                                {cat.name}
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
}
