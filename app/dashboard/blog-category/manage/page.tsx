"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
    Pencil,
    Trash2,
    Search as SearchIcon,
    X as CloseIcon,
    Home as HomeIcon,
    ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getAllCategories, updateCategory, deleteCategory } from "@/app/api/BlogCategory.api"

const PAGE_SIZE = 6
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
                    <a href="/dashboard/blog-category" className="hover:text-[#00dbed] transition">
                        Blog Category
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

function formatStatus(status: string) {
    // API returns "active" or "inactive", UI expects "Active" or "Inactive"
    if (!status) return ""
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

function formatDate(dateString: string) {
    if (!dateString) return ""
    const date = new Date(dateString)
    // Format as YYYY-MM-DD
    return date.toISOString().split("T")[0]
}

function CategoryManagePage() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [page, setPage] = useState(1)
    const [editModal, setEditModal] = useState<null | { _id: string; name: string; slug: string; status: string }>(null)
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editLoading, setEditLoading] = useState(false)
    const [editError, setEditError] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
    const [deleteError, setDeleteError] = useState<string | null>(null)

    // Fetch categories from API
    useEffect(() => {
        let ignore = false
        async function fetchCategories() {
            setLoading(true)
            setError(null)
            try {
                const res = await getAllCategories()
                // If API returns { statusCode, success, data, message }
                if (res && res.success && Array.isArray(res.data)) {
                    if (!ignore) setCategories(res.data)
                } else {
                    if (!ignore) setError("Failed to fetch categories.")
                }
            } catch (err) {
                if (!ignore) setError("Failed to fetch categories.")
            } finally {
                if (!ignore) setLoading(false)
            }
        }
        fetchCategories()
        return () => { ignore = true }
    }, [])

    // Filtering
    const filteredCategories = useMemo(() => {
        let filtered = categories
        if (search.trim()) {
            filtered = filtered.filter(
                (cat) =>
                    cat.name?.toLowerCase().includes(search.toLowerCase()) ||
                    cat.slug?.toLowerCase().includes(search.toLowerCase())
            )
        }
        if (statusFilter !== "All") {
            filtered = filtered.filter((cat) => formatStatus(cat.status) === statusFilter)
        }
        return filtered
    }, [categories, search, statusFilter])

    // Pagination
    const totalPages = Math.ceil(filteredCategories.length / PAGE_SIZE)
    const paginatedCategories = filteredCategories.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    )

    // Edit Modal Handlers
    const [editForm, setEditForm] = useState({ name: "", slug: "", status: "Active" })
    useEffect(() => {
        if (editModal) {
            setEditForm({
                name: editModal.name,
                slug: editModal.slug,
                status: formatStatus(editModal.status),
            })
        }
    }, [editModal])

    async function handleEditSave() {
        if (!editModal) return
        setEditLoading(true)
        setEditError(null)
        try {
            // Call the API to update the category
            const res = await updateCategory(editModal._id, {
                name: editForm.name,
                slug: editForm.slug,
                status: editForm.status.toLowerCase(),
            })
            if (res && res.success && res.data) {
                // Update the local state with the updated category
                setCategories((prev) =>
                    prev.map((cat) =>
                        cat._id === editModal._id
                            ? { ...cat, ...res.data }
                            : cat
                    )
                )
                setEditModal(null)
            } else {
                setEditError(res?.message || "Failed to update category.")
            }
        } catch (err: any) {
            setEditError("Failed to update category.")
        } finally {
            setEditLoading(false)
        }
    }

    async function handleDelete(_id: string) {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return
        }
        setDeleteLoading(_id)
        setDeleteError(null)
        try {
            const res = await deleteCategory(_id)
            console.log("res", res)
            if (res && res.success) {
                setCategories((prev) => prev.filter((cat) => cat._id !== _id))
            } else {
                setDeleteError(res?.message || "Failed to delete category.")
            }
        } catch (err: any) {
            setDeleteError("Failed to delete category.")
        } finally {
            setDeleteLoading(null)
        }
    }

    // Reset page if filter/search changes and page is out of range
    useEffect(() => {
        if (page > totalPages) setPage(1)
    }, [filteredCategories, totalPages, page])

    return (
        <motion.div
            className="p-6 bg-gray-50 dark:bg-[#101827] min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4, type: "spring", stiffness: 60 }}
            >
                <div>
                    <motion.h1
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.4 }}
                    >
                        Manage Blog Categories
                    </motion.h1>
                </div>
                <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                >
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                            <SearchIcon className="w-4 h-4" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search category..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }}
                            className="pl-9 pr-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed] transition"
                        />
                    </div>
                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value)
                                setPage(1)
                            }}
                            className="pl-3 pr-8 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed] transition"
                        >
                            {statusOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>
            </motion.div>

            <Breadcrumb />

            <motion.div
                className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, type: "spring", stiffness: 60 }}
            >
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Slug</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Created</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        Loading...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-red-500 dark:text-red-400">
                                        {error}
                                    </td>
                                </tr>
                            ) : paginatedCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedCategories.map((cat, i) => (
                                    <motion.tr
                                        key={cat._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={tableRowVariants}
                                    >
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{cat.name}</td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{cat.slug}</td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{cat.description}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={classNames(
                                                    "inline-block px-2 py-1 rounded text-xs font-medium",
                                                    formatStatus(cat.status) === "Active"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                                )}
                                            >
                                                {formatStatus(cat.status)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{formatDate(cat.createdAt)}</td>
                                        <td className="px-4 py-3 text-center">
                                            <motion.button
                                                whileTap={{ scale: 0.92 }}
                                                whileHover={{ scale: 1.08, backgroundColor: "rgba(0,219,237,0.08)" }}
                                                className="inline-flex items-center justify-center p-2 rounded hover:bg-[#00dbed]/10 text-[#005c82] dark:text-[#00dbed] transition mr-2"
                                                title="Edit"
                                                onClick={() => setEditModal(cat)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                whileTap={{ scale: 0.92 }}
                                                whileHover={{ scale: 1.08, backgroundColor: "rgba(239,68,68,0.08)" }}
                                                className="inline-flex items-center justify-center p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition"
                                                title="Delete"
                                                onClick={() => handleDelete(cat._id)}
                                                disabled={deleteLoading === cat._id}
                                            >
                                                {deleteLoading === cat._id ? (
                                                    <span className="w-4 h-4 animate-spin border-2 border-t-transparent border-red-600 rounded-full inline-block"></span>
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </motion.button>
                                            {deleteError && deleteLoading === null && (
                                                <div className="text-xs text-red-500 mt-1">{deleteError}</div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </AnimatePresence>
                </table>
            </motion.div>

            {/* Pagination */}
            <motion.div
                className="flex items-center justify-between mt-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
            >
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {filteredCategories.length === 0
                            ? 0
                            : (page - 1) * PAGE_SIZE + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.min(page * PAGE_SIZE, filteredCategories.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {filteredCategories.length}
                    </span>{" "}
                    categories
                </div>
                <div className="flex gap-2">
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </motion.button>
                    <span className="px-2 py-1 text-gray-700 dark:text-gray-300">
                        Page {page} of {totalPages || 1}
                    </span>
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || totalPages === 0}
                    >
                        Next
                    </motion.button>
                </div>
            </motion.div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6 relative"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.button
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                onClick={() => setEditModal(null)}
                                aria-label="Close"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1, color: "#00dbed" }}
                            >
                                <CloseIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.h2
                                className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 }}
                            >
                                Edit Category
                            </motion.h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleEditSave()
                                }}
                                className="space-y-4"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.12 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                                        className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.16 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.slug}
                                        onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))}
                                        className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.20 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                                        className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00dbed]"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </motion.div>
                                {editError && (
                                    <div className="text-red-500 text-sm">{editError}</div>
                                )}
                                <motion.div
                                    className="flex justify-end gap-2 pt-2"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.24 }}
                                >
                                    <motion.button
                                        type="button"
                                        className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        onClick={() => setEditModal(null)}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={editLoading}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white font-semibold hover:from-[#007fa3] hover:to-[#00b8c6] transition"
                                        whileTap={{ scale: 0.97 }}
                                        disabled={editLoading}
                                    >
                                        {editLoading ? "Saving..." : "Save"}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default CategoryManagePage
