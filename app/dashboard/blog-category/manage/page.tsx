"use client"

import React, { useState, useMemo } from "react"
import {
    Pencil,
    Trash2,
    Search as SearchIcon,
    X as CloseIcon,
    Home as HomeIcon,
    ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const mockCategories = [
    { id: 1, name: "Tech", slug: "tech", status: "Active", createdAt: "2024-05-01" },
    { id: 2, name: "Lifestyle", slug: "lifestyle", status: "Inactive", createdAt: "2024-04-15" },
    { id: 3, name: "Finance", slug: "finance", status: "Active", createdAt: "2024-03-20" },
    { id: 4, name: "Travel", slug: "travel", status: "Active", createdAt: "2024-02-10" },
    { id: 5, name: "Food", slug: "food", status: "Inactive", createdAt: "2024-01-05" },
    { id: 6, name: "Health", slug: "health", status: "Active", createdAt: "2023-12-22" },
    { id: 7, name: "Education", slug: "education", status: "Active", createdAt: "2023-11-30" },
    { id: 8, name: "Gaming", slug: "gaming", status: "Inactive", createdAt: "2023-10-18" },
    { id: 9, name: "Business", slug: "business", status: "Active", createdAt: "2023-09-12" },
    { id: 10, name: "Science", slug: "science", status: "Active", createdAt: "2023-08-01" },
    { id: 11, name: "Sports", slug: "sports", status: "Inactive", createdAt: "2023-07-15" },
    { id: 12, name: "News", slug: "news", status: "Active", createdAt: "2023-06-10" },
]

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

function CategoryManagePage() {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [page, setPage] = useState(1)
    const [editModal, setEditModal] = useState<null | { id: number; name: string; slug: string; status: string }>(null)
    const [categories, setCategories] = useState(mockCategories)

    // Filtering
    const filteredCategories = useMemo(() => {
        let filtered = categories
        if (search.trim()) {
            filtered = filtered.filter(
                (cat) =>
                    cat.name.toLowerCase().includes(search.toLowerCase()) ||
                    cat.slug.toLowerCase().includes(search.toLowerCase())
            )
        }
        if (statusFilter !== "All") {
            filtered = filtered.filter((cat) => cat.status === statusFilter)
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
    React.useEffect(() => {
        if (editModal) {
            setEditForm({
                name: editModal.name,
                slug: editModal.slug,
                status: editModal.status,
            })
        }
    }, [editModal])

    function handleEditSave() {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === editModal?.id
                    ? { ...cat, ...editForm }
                    : cat
            )
        )
        setEditModal(null)
    }

    function handleDelete(id: number) {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setCategories((prev) => prev.filter((cat) => cat.id !== id))
        }
    }

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
                    {/* <motion.p
                        className="text-gray-600 dark:text-gray-400 mt-1 text-sm"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.4 }}
                    >
                        View, search, filter, edit, and delete blog categories.
                    </motion.p> */}
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
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Created</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                        <tbody>
                            {paginatedCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedCategories.map((cat, i) => (
                                    <motion.tr
                                        key={cat.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={tableRowVariants}
                                    >
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">{cat.name}</td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{cat.slug}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={classNames(
                                                    "inline-block px-2 py-1 rounded text-xs font-medium",
                                                    cat.status === "Active"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                                )}
                                            >
                                                {cat.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{cat.createdAt}</td>
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
                                                onClick={() => handleDelete(cat.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </motion.button>
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
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white font-semibold hover:from-[#007fa3] hover:to-[#00b8c6] transition"
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Save
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
