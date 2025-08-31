"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Loader2, Pencil, Trash2, ArrowUp, ArrowDown, Search } from "lucide-react";
import { getDynamicPagesArticleAndSeoById } from "@/app/api/pageManagement.Api";

const PAGE_SIZE = 10;

const columns = [
  { key: "slug", label: "Slug", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
  { key: "updatedAt", label: "Updated At", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

export default function ManageArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles
//   useEffect(() => {
//     let ignore = false;
//     setLoading(true);
//     getDynamicPagesArticleAndSeoById()
//       .then((data: any) => {
//         if (!ignore) {
//           setArticles(Array.isArray(data) ? data : []);
//         }
//       })
//       .catch(() => {
//         if (!ignore) setError("Failed to load articles.");
//       })
//       .finally(() => {
//         if (!ignore) setLoading(false);
//       });
//     return () => {
//       ignore = true;
//     };
//   }, []);

  // Filtering and searching
  const filteredArticles = useMemo(() => {
    let filtered = articles;
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.slug?.toLowerCase().includes(s) ||
          a.content?.toLowerCase().includes(s) ||
          a.imageAlt?.toLowerCase().includes(s)
      );
    }
    if (filter !== "all") {
      // Example: filter by published/unpublished if such field exists
      filtered = filtered.filter((a) => a.status === filter);
    }
    return filtered;
  }, [articles, search, filter]);

  // Sorting
  const sortedArticles = useMemo(() => {
    const sorted = [...filteredArticles];
    if (sortKey !== "actions") {
      sorted.sort((a, b) => {
        let vA = a[sortKey];
        let vB = b[sortKey];
        if (sortKey === "createdAt" || sortKey === "updatedAt") {
          vA = vA ? new Date(vA).getTime() : 0;
          vB = vB ? new Date(vB).getTime() : 0;
        }
        if (vA < vB) return sortOrder === "asc" ? -1 : 1;
        if (vA > vB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredArticles, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / PAGE_SIZE));
  const paginatedArticles = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedArticles.slice(start, start + PAGE_SIZE);
  }, [sortedArticles, page]);

  // Handle sort
  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    setDeletingId(id);
    setError(null);
    try {
    //   await deleteDynamicPagesArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      setError("Failed to delete article.");
    }
    setDeletingId(null);
  };

  // Responsive table: horizontal scroll on small screens
  return (
    <div className="p-4 md:p-8 container mx-auto max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Articles</h1>
        <button
          className="px-4 py-2 rounded-lg bg-[#00dbed] text-white font-semibold hover:bg-[#009bbd] transition"
          onClick={() => router.push("/dashboard/article/create")}
        >
          + Create Article
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00dbed] focus:border-transparent transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        {/* Example filter: status (if available) */}
        {/* <select
          className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select> */}
      </div>
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider select-none"
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-3 h-3 inline" />
                      ) : (
                        <ArrowDown className="w-3 h-3 inline" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center">
                  <Loader2 className="w-6 h-6 mx-auto animate-spin text-gray-400" />
                </td>
              </tr>
            ) : paginatedArticles.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center text-gray-500 dark:text-gray-400">
                  No articles found.
                </td>
              </tr>
            ) : (
              paginatedArticles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-[#00dbed]">
                    {article.slug}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {formatDate(article.updatedAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded hover:bg-[#00dbed]/10 text-[#00dbed] transition"
                        title="Edit"
                        onClick={() => router.push(`/dashboard/article/edit/${article.id}`)}
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition"
                        title="Delete"
                        onClick={() => handleDelete(article.id)}
                        aria-label="Delete"
                        disabled={deletingId === article.id}
                      >
                        {deletingId === article.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
            (p === 1 || p === totalPages || Math.abs(p - page) <= 1) ? (
              <button
                key={p}
                className={`px-3 py-1 rounded border ${
                  p === page
                    ? "bg-[#00dbed] text-white border-[#00dbed]"
                    : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition`}
                onClick={() => setPage(p)}
                disabled={p === page}
              >
                {p}
              </button>
            ) : (
              (p === page - 2 || p === page + 2) && (
                <span key={p} className="px-2 py-1 text-gray-400">...</span>
              )
            )
          )}
          <button
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
}
