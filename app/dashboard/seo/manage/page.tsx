"use client";

import React, { useEffect, useState } from "react";
import {
  Search, ArrowUpDown, ChevronLeft, ChevronRight, Pencil,
  Trash2,
  Search as SearchIcon,
  X as CloseIcon,
  Home as HomeIcon,
} from "lucide-react";


import { motion, AnimatePresence } from "framer-motion"
import { deleteDynamicPagesArticleAndSeo, getAllDynamicPagesArticleAndSeo, updateDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";

const statusOptions = ["All", "Active", "Inactive"]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const containerVariants: any = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } },
  exit: { opacity: 0, y: 32, transition: { duration: 0.2 } },
}

const tableRowVariants: any = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, type: "spring", stiffness: 60, damping: 16 },
  }),
  exit: { opacity: 0, y: 16, transition: { duration: 0.15 } },
}

const modalVariants: any = {
  hidden: { opacity: 0, scale: 0.95, y: 32 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
  exit: { opacity: 0, scale: 0.95, y: 32, transition: { duration: 0.18 } },
}

function Breadcrumb() {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <li>
          <a href="/dashboard" className="flex items-center gap-1 hover:text-[#00dbed] transition">
            <HomeIcon className="w-4 h-4" />
            <span className="sr-only">Dashboard</span>
          </a>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          <a href="/dashboard/seo/manage" className="hover:text-[#00dbed] transition">
            SEO + Article Management
          </a>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li className="font-semibold text-gray-900 dark:text-white">Manage</li>
      </ol>
    </nav>
  )
}

interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  noindex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  ogType: string;
  ogSiteName: string;
  ogLocale: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
  twitterImageUrl: string;
  schemas: any[];
  changefreq: string;
  priority: number;
}

interface PageArticle {
  content: string;
  image: string;
  imageAlt: string;
}

interface SEOItem {
  _id: string;
  slug: string;
  PageSEO: PageSEO;
  PageArticle: PageArticle;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
}

const columns = [
  { id: "slug", label: "Slug" },
  { id: "metaTitle", label: "Meta Title" },
  { id: "metaDescription", label: "Meta Description" },
  { id: "keywords", label: "Keywords" },
  { id: "canonicalUrl", label: "Canonical URL" },
  { id: "noindex", label: "Noindex" },
  { id: "changefreq", label: "Changefreq" },
  { id: "priority", label: "Priority" },
  { id: "updatedAt", label: "Updated At" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

export default function ManageSEOPage() {
  const [data, setData] = useState<SEOItem[]>([]);
  const [meta, setMeta] = useState<Meta>({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("updatedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterNoindex, setFilterNoindex] = useState<"" | "true" | "false">("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // For delete confirmation modal
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // For edit modal (simple inline, just as a placeholder)
  const [editId, setEditId] = useState<string | null>(null);
  const [editMetaTitle, setEditMetaTitle] = useState<string>("");
  const [editMetaDescription, setEditMetaDescription] = useState<string>("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getAllDynamicPagesArticleAndSeo({
          page,
          limit,
          search,
          sortBy,
          sortDir,
          noindex: filterNoindex,
        });
        if (!ignore) {
          setData(res?.data?.data || []);
          setMeta(res?.data?.meta || { page: 1, limit: 10, total: 0 });
        }
      } catch (e) {
        if (!ignore) {
          setData([]);
          setMeta({ page: 1, limit: 10, total: 0 });
        }
      }
      if (!ignore) setLoading(false);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [search, sortBy, sortDir, page, limit, filterNoindex]);

  function handleSort(col: string) {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  const totalPages = Math.ceil(meta.total / meta.limit);

  // Handle delete
  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      await deleteDynamicPagesArticleAndSeo(id, "seo");
      setData(prev => prev.filter(item => item._id !== id));
      setDeleteId(null);
    } catch (e) {
      // Optionally show error
    }
    setDeleting(false);
  }

  // Handle edit
  function openEditModal(item: SEOItem) {
    setEditId(item._id);
    setEditMetaTitle(item.PageSEO?.metaTitle || "");
    setEditMetaDescription(item.PageSEO?.metaDescription || "");
  }

  async function handleUpdate() {
    if (!editId) return;
    setUpdating(true);
    try {
      await updateDynamicPagesArticleAndSeo(editId, {
        PageSEO: {
          metaTitle: editMetaTitle,
          metaDescription: editMetaDescription,
        }
      });
      setData(prev =>
        prev.map(item =>
          item._id === editId
            ? {
                ...item,
                PageSEO: {
                  ...item.PageSEO,
                  metaTitle: editMetaTitle,
                  metaDescription: editMetaDescription,
                },
              }
            : item
        )
      );
      setEditId(null);
    } catch (e) {
      // Optionally show error
    }
    setUpdating(false);
  }

  return (
    <div className="p-4 md:p-8 container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SEO Management</h1>
      <Breadcrumb />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by slug, meta title, keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#005c82] focus:border-transparent transition"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#005c82] focus:border-transparent"
            value={filterNoindex}
            onChange={e => {
              setFilterNoindex(e.target.value as any);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="false">Index</option>
            <option value="true">Noindex</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Rows:</label>
          <select
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={limit}
            onChange={e => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map(col => (
                <th
                  key={col.id}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort(col.id)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown
                      className={`w-4 h-4 transition ${sortBy === col.id
                        ? sortDir === "asc"
                          ? "text-[#005c82] dark:text-[#00dbed]"
                          : "text-[#005c82] dark:text-[#00dbed] rotate-180"
                        : "text-gray-400"
                        }`}
                    />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No SEO data found.
                </td>
              </tr>
            ) : (
              data.map(item => (
                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-3 font-mono text-sm text-[#005c82] dark:text-[#00dbed]">{item.slug}</td>
                  <td className="px-4 py-3 text-sm">{item.PageSEO?.metaTitle || "-"}</td>
                  <td className="px-4 py-3 text-xs max-w-xs truncate" title={item.PageSEO?.metaDescription}>
                    {item.PageSEO?.metaDescription || "-"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {item.PageSEO?.keywords && item.PageSEO.keywords.length > 0
                      ? item.PageSEO.keywords.join(", ")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-xs break-all">
                    {item.PageSEO?.canonicalUrl ? (
                      <a
                        href={item.PageSEO.canonicalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline"
                      >
                        {item.PageSEO.canonicalUrl}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {item.PageSEO?.noindex ? (
                      <span className="inline-block px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs">Noindex</span>
                    ) : (
                      <span className="inline-block px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs">Index</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">{item.PageSEO?.changefreq || "-"}</td>
                  <td className="px-4 py-3 text-xs">{item.PageSEO?.priority ?? "-"}</td>
                  <td className="px-4 py-3 text-xs">{formatDate(item.updatedAt)}</td>
                  <td className="px-4 py-3 text-xs">
                    <div className="flex gap-2">
                      <button
                        className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                        title="Edit"
                        onClick={() => openEditModal(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                        title="Delete"
                        onClick={() => setDeleteId(item._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setEditId(null)}
                aria-label="Close"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Edit SEO</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editMetaTitle}
                  onChange={e => setEditMetaTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editMetaDescription}
                  onChange={e => setEditMetaDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setEditId(null)}
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleUpdate}
                  disabled={updating}
                >
                  {updating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setDeleteId(null)}
                aria-label="Close"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Delete SEO Entry</h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Are you sure you want to delete this SEO entry? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {data.length === 0 ? 0 : (meta.page - 1) * meta.limit + 1}
          </span>
          {" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {(meta.page - 1) * meta.limit + data.length}
          </span>
          {" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {meta.total}
          </span>
          {" "}
          results
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Page {page} of {totalPages || 1}
          </span>
          <button
            className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
