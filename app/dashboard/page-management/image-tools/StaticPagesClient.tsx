"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Edit,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    FileText,
    Delete,
    Trash2,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "@/components/Table/TableSkeleton";
import { EmptyState } from "@/components/Table/EmptyState";
import { deletePagesDataFully, getAllDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/PageManagementTable";


// --- Modal for Create New Page ---
function slugify(str: string) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except space and dash
        .replace(/\s+/g, "-") // spaces to dash
        .replace(/-+/g, "-") // collapse multiple dashes
        .replace(/^-+|-+$/g, ""); // trim dashes
}

interface CreatePageModalProps {
    open: boolean;
    onClose: () => void;
    onCreate?: (data: { title: string; type: string; slug: string }) => void;
}
import { motion, AnimatePresence } from "framer-motion";

import { createDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";
import toast from "react-hot-toast";

const CreatePageModal: React.FC<CreatePageModalProps> = ({ open, onClose, onCreate }) => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [slug, setSlug] = useState("");
    const [touchedSlug, setTouchedSlug] = useState(false);
    const [loading, setLoading] = useState(false);

    // When title changes and slug not manually edited, update slug
    useEffect(() => {
        if (!touchedSlug) {
            setSlug(slugify(title));
        }
    }, [title, touchedSlug]);

    // Reset on open
    useEffect(() => {
        if (open) {
            setTitle("");
            setType("");
            setSlug("");
            setTouchedSlug(false);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !slug.trim() || !type.trim()) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                title: title.trim(),
                type: type.trim(),
                slug: slug.trim(),
            };
            const res = await createDynamicPagesArticleAndSeo(payload);
            if (res.statusCode === 200) {
                toast.success("Page created successfully");
                if (onCreate) onCreate(payload);
                onClose();
            } else {
                toast.error(res?.message || "Failed to create page");
            }
        } catch (err: any) {
            toast.error(err?.message || "Failed to create page");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                            onClick={onClose}
                            aria-label="Close"
                            type="button"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Create New Page</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="modal-title">
                                    Title
                                </label>
                                <input
                                    id="modal-title"
                                    type="text"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    autoFocus
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="modal-type">
                                    Type
                                </label>
                                <select
                                    id="modal-type"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                    required
                                    disabled={loading}
                                >
                                    <option value="" disabled>
                                        Select type
                                    </option>
                                    <option value="static">Static</option>
                                    <option value="text">Text</option>
                                    <option value="image">Image</option>
                                    <option value="developers">Developers</option>
                                    <option value="converters">Converters</option>
                                    <option value="generators">Generators</option>
                                    <option value="calculators">Calculators</option>
                                    <option value="websiteManagemet">Website Management</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="modal-slug">
                                    Slug
                                </label>
                                <input
                                    id="modal-slug"
                                    type="text"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                                    value={slug}
                                    onChange={e => {
                                        setSlug(e.target.value);
                                        setTouchedSlug(true);
                                    }}
                                    onFocus={() => setTouchedSlug(true)}
                                    required
                                    disabled={loading}
                                />
                                <p className="text-xs text-gray-500 mt-1">Slug will be used in the URL. You can edit it.</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
// --- End Modal ---


interface DynamicPage {
    _id: string;
    title: string;
    slug: string;
    type: string;
    pageContent: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
    noindex: boolean;
    ogTitle: string;
    ogDescription?: string;
    ogImageUrl: string;
    ogType: string;
    ogSiteName: string;
    ogLocale: string;
    twitterCard: string;
    twitterSite: string;
    twitterCreator: string;
    twitterImageUrl: string;
    alternates: string;
    changefreq: string;
    priority: number;
    createdAt: string;
    updatedAt: string;
}

export default function StaticPagesClient() {
    const router = useRouter();
    const [data, setData] = useState<DynamicPage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<DynamicPage[]>([]);

    //  Table Features - URL state management for pagination, sorting, filtering
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [typeFilter, setTypeFilter] = useState("all");
    const [noindexFilter, setNoindexFilter] = useState("all");
    const [slugFilter, setSlugFilter] = useState("");
    const [titleFilter, setTitleFilter] = useState("");
    const [meta, setMeta] = useState<any>()

    console.log("noindexFilter", noindexFilter)

    // Table Data Fetching & API Integration
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getAllDynamicPagesArticleAndSeo({
                    page: currentPage,
                    limit: pageSize,
                    search,
                    sortBy,
                    sortDir: sortOrder,
                    // noindex: noindexFilter === "all" ? "" : noindexFilter,
                    // type: typeFilter === "all" ? "" : typeFilter,
                    type: "image",

                    slug: slugFilter,
                    title: titleFilter,
                });

                if (response?.statusCode === 200) {
                    setData(response.data.data || []);
                    setMeta(response?.data?.meta)
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data");
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, pageSize, search, sortBy, sortOrder, noindexFilter, typeFilter, slugFilter, titleFilter]);

    // Table Columns - All required columns from API
    const columns = [
        {
            key: "title",
            label: "Title",
            sortable: true,
            render: (page: DynamicPage) => (
                <div className="font-medium text-gray-900 dark:text-white max-w-[200px] truncate">
                    {page.title}
                </div>
            ),
        },
        {
            key: "slug",
            label: "Slug",
            sortable: true,
            render: (page: DynamicPage) => (
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded max-w-[150px] truncate block">
                    {page.slug}
                </code>
            ),
        },
        {
            key: "type",
            label: "Type",
            sortable: true,
            render: (page: DynamicPage) => (
                <Badge variant="outline" className="capitalize">
                    {page.type}
                </Badge>
            ),
        },
        {
            key: "pageContent",
            label: "Article",
            sortable: false,
            render: (page: DynamicPage) => (
                <div className="flex items-center gap-2">
                    {page.pageContent ? (
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <FileText className="w-3 h-3 mr-1" />
                            Has Article
                        </Badge>

                    ) : (
                        <Badge variant="outline" className="text-gray-500">
                            No Article
                        </Badge>
                    )}
                </div>
            ),
        },
        {
            key: "metaTitle",
            label: "SEO",
            sortable: true,
            render: (page: DynamicPage) => (
                <div className="flex items-center gap-2">
                    {page.metaTitle ? (
                        <Badge
                            variant="default"
                            className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-200 text-green-900 dark:from-cyan-900 dark:via-cyan-700 dark:to-cyan-900 dark:text-green-200"
                        >
                            <FileText className="w-3 h-3 mr-1" />
                            Has SEO
                        </Badge>

                    ) : (
                        <Badge variant="outline" className="text-gray-500">
                            No SEO
                        </Badge>
                    )}
                </div>
            ),
        },

        {
            key: "noindex",
            label: "Index",
            sortable: true,
            render: (page: DynamicPage) => (
                <Badge variant={page.noindex ? "destructive" : "default"}>
                    {page.noindex ? "No" : "Yes"}
                </Badge>
            ),
        },
    ];

    // Table Features - Handle sort
    const handleSort = (key: string) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
        setCurrentPage(1); // Reset to first page when sorting
    };

    //  Handle search
    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    //  Handle page size change
    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    };

    // Get sort icon
    const getSortIcon = (key: string) => {
        if (sortBy !== key)
            return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
        return sortOrder === "asc" ? (
            <ArrowUp className="w-4 h-4 text-blue-500" />
        ) : (
            <ArrowDown className="w-4 h-4 text-blue-500" />
        );
    };

    // Handle edit - Navigate to edit page with slug
    const handleEdit = (page: DynamicPage) => {
        const slugParam = page.slug.startsWith('/') ? page.slug.slice(1) : page.slug;
        router.push(`/dashboard/page-management/edit/${slugParam || "home"}?type=${page.type}&title=${page.title}`);
    };

    const handleDelete = async (page: DynamicPage) => {
        const confirmation = window.confirm("Are you want to delete?")
        if (confirmation) {
            const res = await deletePagesDataFully(page?._id)
            if (res?.statusCode == 200) {
                // Remove the deleted page fom the data list
                setData(prevData => prevData.filter(item => item._id !== page._id));
                toast.success("Delete the page successfully")
            } else {
                toast.error("Failed to delete the page")
            }
        }
    };

    // Modal state for create new page
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Calculate pagination using meta from API
    const totalPages = meta && meta.total && meta.limit
        ? Math.max(1, Math.ceil(meta.total / meta.limit))
        : 1;
    const startIndex = meta && meta.page && meta.limit
        ? (meta.page - 1) * meta.limit
        : 0;
    const endIndex = meta && meta.page && meta.limit
        ? Math.min(startIndex + meta.limit, meta.total || 0)
        : 0;
    const paginatedData = data;

    return (
        <div className="space-y-6">
            {/* Modal for create new page */}
            {showCreateModal && <CreatePageModal
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            // onCreate={handleCreateNewPage}
            />}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Image Tools Pages Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your image tools pages with SEO and article content
                    </p>
                </div>
                <Button
                    className="ml-4"
                    onClick={() => {
                        setShowCreateModal(true)
                    }}
                >
                    + Create New Page
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search pages..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Type Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="static">Static</SelectItem>
                        <SelectItem value="dynamic">Dynamic</SelectItem>
                    </SelectContent>
                </Select> */}

                {/* <Select value={noindexFilter} onValueChange={setNoindexFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Noindex Filter" />
                    </SelectTrigger>
                    <SelectContent> 
                        <SelectItem value="all">All Pages</SelectItem>
                        <SelectItem value="true">Index: No</SelectItem>
                        <SelectItem value="false">Index: Yes</SelectItem> 
                    </SelectContent>
                </Select> */}
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>

                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={cn(
                                        "font-medium whitespace-nowrap",
                                        column.sortable &&
                                        "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                    )}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && getSortIcon(column.key)}
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} className="p-8">
                                    <TableSkeleton columns={columns.length + 2} />
                                </TableCell>
                            </TableRow>
                        ) : paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} className="p-0">
                                    <EmptyState
                                        title="No pages found"
                                        description="No dynamic pages match your current filters."
                                        hasFilters={!!(search || typeFilter !== "all" || noindexFilter !== "all")}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((page, index) => (
                                <TableRow
                                    key={page._id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                >

                                    {columns.map((column) => (
                                        <TableCell key={column.key} className="align-top">
                                            {column.render
                                                ? column.render(page)
                                                : (page as any)[column.key]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(page)}
                                                className="h-8 w-8 p-0"
                                                title="Edit Page"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(page)}
                                                className="h-8 w-8 p-0"
                                                title="Delete Page"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        Showing {meta && meta.total > 0 ? (startIndex + 1) : 0} to {endIndex} of {meta?.total || 0} results
                    </span>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => handlePageSizeChange(Number(value))}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <span className="text-sm text-gray-500">
                        Page {meta?.page || 1} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}