"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sun, Moon, MessageCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllCategories } from "@/app/api/BlogCategory.api";
import { getBlogBySlug } from "@/app/api/Blog.Api";
import Image from "next/image";

const BlogDetails = ({ slug }: any) => {
    const [blog, setBlog] = useState<any>(null);
    // Categories state
    const [categories, setCategories] = React.useState<
        { id: string; name: string }[]
    >([]);
    const [categoriesLoading, setCategoriesLoading] = React.useState(true);
    const [categoriesError, setCategoriesError] = React.useState<string | null>(
        null
    );

    // Fetch categories and blog from API
    useEffect(() => {
        async function fetchData() {
            setCategoriesLoading(true);
            setCategoriesError(null);
            try {
                // Fetch categories
                const catRes = await getAllCategories();
                if (catRes?.statusCode === 200 && Array.isArray(catRes.data)) {
                    setCategories(catRes.data);
                } else {
                    setCategories([]);
                }

                // Fetch blog by slug
                const blogRes = await getBlogBySlug(slug);
                if (blogRes?.statusCode === 200 && blogRes.data) {
                    setBlog(blogRes.data);
                } else {
                    setBlog(null);
                }
            } catch (err: any) {
                setCategories([]);
                setBlog(null);
            } finally {
                setCategoriesLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    // Comment state
    const [comments, setComments] = useState<
        { name: string; comment: string; date: string }[]
    >([]);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) return;
        setSubmitting(true);
        setTimeout(() => {
            setComments([
                {
                    name: name.trim(),
                    comment: comment.trim(),
                    date: new Date().toLocaleString(),
                },
                ...comments,
            ]);
            setName("");
            setComment("");
            setSubmitting(false);
        }, 500);
    };

    if (categoriesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin w-8 h-8 text-[#00dbed]" />
            </div>
        );
    }

    console.log("slug", slug)
    return (
        <>
            <Header />
            <main className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                    {/* Blog Content */}
                    <article className="w-full lg:w-2/3 bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8 lg:mb-0">
                        {blog ? (
                            <>
                                {/* Featured Image */}
                                {blog.blogFeaturedImage ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${blog.blogFeaturedImage}`}
                                        alt={blog.title || "Blog featured image"}
                                        className="w-full h-64 object-cover rounded-lg mb-6"
                                        width={600}
                                        height={256}
                                        priority={false}
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm rounded-lg mb-6">
                                        No Image
                                    </div>
                                )}

                                {/* Blog Meta */}
                                <div className="mb-4 flex items-center gap-4 flex-wrap">
                                    {blog.category && (
                                        <span className="text-xs uppercase tracking-wider text-[#00dbed] font-semibold">
                                            {blog.category}
                                        </span>
                                    )}
                                    {blog.createdAt && (
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {new Date(blog.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    )}
                                    {blog.author && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            By {blog.author}
                                        </span>
                                    )}
                                    {blog.status && (
                                        <span
                                            className={`text-xs rounded-full px-2 py-0.5 font-medium ${blog.status === "published"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                }`}
                                        >
                                            {blog.status.charAt(0).toUpperCase() +
                                                blog.status.slice(1)}
                                        </span>
                                    )}
                                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                                        <span className="flex flex-wrap gap-1">
                                            {blog.tags
                                                .flatMap((t: string) =>
                                                    typeof t === "string"
                                                        ? t.split(",").map((tag) => tag.trim())
                                                        : []
                                                )
                                                .filter(Boolean)
                                                .map((tag: string, idx: number) => (
                                                    <span
                                                        key={tag + idx}
                                                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded px-2 py-0.5"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {blog.title}
                                </h1>

                                {/* Excerpt */}
                                {blog.excerpt && (
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                        {blog.excerpt}
                                    </p>
                                )}

                                {/* Content */}
                                <div
                                    className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#005c82] dark:prose-a:text-[#00dbed]"
                                    dangerouslySetInnerHTML={{
                                        __html: blog?.content || "",
                                    }}
                                />

                                {/* Comments Section */}
                                {/* {blog.isAllowComments && (
                                    <section className="mt-12">
                                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5" /> Comments
                                        </h2>
                                        <form
                                            onSubmit={handleCommentSubmit}
                                            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6"
                                        >
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    disabled={submitting}
                                                />
                                                <textarea
                                                    placeholder="Add a comment..."
                                                    className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed] min-h-[48px]"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    required
                                                    disabled={submitting}
                                                />
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 rounded bg-[#00dbed] text-white font-semibold hover:bg-[#005c82] transition disabled:opacity-60"
                                                    disabled={submitting}
                                                >
                                                    {submitting ? "Posting..." : "Post"}
                                                </button>
                                            </div>
                                        </form>
                                        <div>
                                            {comments.length === 0 ? (
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    No comments yet. Be the first to comment!
                                                </p>
                                            ) : (
                                                <ul className="space-y-4">
                                                    {comments.map((c, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                                                        >
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                                    {c.name}
                                                                </span>
                                                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                                                    {c.date}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-800 dark:text-gray-200">
                                                                {c.comment}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </section>
                                )} */}
                            </>
                        ) : (
                            <div className="text-center py-24 text-gray-500 dark:text-gray-400">
                                <h2 className="text-2xl font-bold mb-2">Blog not found</h2>
                                <p>The blog you are looking for does not exist.</p>
                            </div>
                        )}
                    </article>
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/3">
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                Categories
                            </h3>
                            <ul className="space-y-3">
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200">
                                            <span>{cat.name}</span>
                                            {/* <span className="text-xs bg-[#00dbed] text-white rounded-full px-2 py-0.5">
                        {categoryCounts[cat.name] || 0}
                      </span> */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* You can add more sidebar widgets here */}
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}


export default BlogDetails


