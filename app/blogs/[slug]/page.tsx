"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Sun, Moon, MessageCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Dummy data for demonstration
const dummyBlogs = [
  {
    id: 1,
    slug: "how-to-build-a-blog-with-next-js",
    title: "How to Build a Blog with Next.js",
    content: `
      <p>Learn how to build a modern blog using Next.js and React. This guide will walk you through the process of setting up a new Next.js project, creating pages, and deploying your blog.</p>
      <h2>Getting Started</h2>
      <p>First, install Next.js using <code>npx create-next-app</code> and set up your project structure.</p>
      <ul>
        <li>Install dependencies</li>
        <li>Create your first page</li>
        <li>Style your blog</li>
      </ul>
      <h2>Deploying</h2>
      <p>Once your blog is ready, deploy it to Vercel for free and share your content with the world!</p>
    `,
    excerpt: "Learn how to build a modern blog using Next.js and React.",
    category: "Development",
    date: "2024-06-01",
    image: "https://source.unsplash.com/random/800x400?code",
  },
  {
    id: 2,
    slug: "10-tips-for-better-productivity",
    title: "10 Tips for Better Productivity",
    content: `
      <p>Boost your productivity with these actionable tips. From time management to effective breaks, discover how to get more done.</p>
      <ol>
        <li>Set clear goals</li>
        <li>Take regular breaks</li>
        <li>Minimize distractions</li>
      </ol>
    `,
    excerpt: "Boost your productivity with these actionable tips.",
    category: "Productivity",
    date: "2024-05-28",
    image: "https://source.unsplash.com/random/800x400?productivity",
  },
  {
    id: 3,
    slug: "understanding-dark-mode-in-web-apps",
    title: "Understanding Dark Mode in Web Apps",
    content: `
      <p>A deep dive into implementing dark mode for your web projects. Learn about CSS variables, system preferences, and accessibility considerations.</p>
    `,
    excerpt: "A deep dive into implementing dark mode for your web projects.",
    category: "Design",
    date: "2024-05-20",
    image: "https://source.unsplash.com/random/800x400?darkmode",
  },
  // ... more blogs
];

const categories = [
  "Development",
  "Productivity",
  "Design",
];

function getBlogBySlug(slug: string) {
  return dummyBlogs.find((blog) => blog.slug === slug);
}

function getCategoryCounts() {
  const counts: Record<string, number> = {};
  dummyBlogs.forEach((blog) => {
    counts[blog.category] = (counts[blog.category] || 0) + 1;
  });
  return counts;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const blog = getBlogBySlug(slug);

  // Comment state
  const [comments, setComments] = useState<{ name: string; comment: string; date: string }[]>([]);
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

  const categoryCounts = getCategoryCounts();

  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Blog Content */}
          <article className="w-full lg:w-2/3 bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8 lg:mb-0">
            {blog ? (
              <>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="mb-4 flex items-center gap-4 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#00dbed] font-semibold">
                    {blog.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{blog.date}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {blog.title}
                </h1>
                <div
                  className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#005c82] dark:prose-a:text-[#00dbed]"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                {/* Comments Section */}
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
                      <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
                    ) : (
                      <ul className="space-y-4">
                        {comments.map((c, idx) => (
                          <li key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">{c.name}</span>
                              <span className="text-xs text-gray-400 dark:text-gray-500">{c.date}</span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200">{c.comment}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
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
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                    >
                      <span>{cat}</span>
                      <span className="text-xs bg-[#00dbed] text-white rounded-full px-2 py-0.5">
                        {categoryCounts[cat] || 0}
                      </span>
                    </a>
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
