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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/Table/TableSkeleton";
import { EmptyState } from "@/components/Table/EmptyState";
import { getAllDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/PageManagementTable";

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

    // Task 4: Table Features - URL state management for pagination, sorting, filtering
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [typeFilter, setTypeFilter] = useState("all");
    const [noindexFilter, setNoindexFilter] = useState("all");
    const [slugFilter, setSlugFilter] = useState("");
    const [titleFilter, setTitleFilter] = useState("");

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
                    noindex: noindexFilter === "all" ? "" : noindexFilter,
                    // type: typeFilter === "all" ? "" : typeFilter,
                    type: "static",

                    slug: slugFilter,
                    title: titleFilter,
                });

                if (response?.statusCode === 200) {
                    setData(response.data.data || []);
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
        // {
        //     key: "type",
        //     label: "Type",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <Badge variant="outline" className="capitalize">
        //             {page.type}
        //         </Badge>
        //     ),
        // },
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
        // {
        //     key: "metaDescription",
        //     label: "Meta Description",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[200px] truncate text-sm">
        //             {page.metaDescription || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "keywords",
        //     label: "Keywords",
        //     sortable: false,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[150px] truncate text-sm">
        //             {Array.isArray(page.keywords) ? page.keywords.join(", ") : page.keywords || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "canonicalUrl",
        //     label: "Canonical URL",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[150px] truncate text-sm">
        //             {page.canonicalUrl || "-"}
        //         </div>
        //     ),
        // },
        {
            key: "noindex",
            label: "Noindex",
            sortable: true,
            render: (page: DynamicPage) => (
                <Badge variant={page.noindex ? "destructive" : "default"}>
                    {page.noindex ? "Yes" : "No"}
                </Badge>
            ),
        },
        // {
        //     key: "ogTitle",
        //     label: "OG Title",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[150px] truncate text-sm">
        //             {page.ogTitle || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "ogDescription",
        //     label: "OG Description",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[150px] truncate text-sm">
        //             {page.ogDescription || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "ogImageUrl",
        //     label: "OG Image",
        //     sortable: false,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[100px] truncate text-sm">
        //             {page.ogImageUrl ? (
        //                 <Badge variant="default" className="bg-blue-100 text-blue-800">
        //                     Has Image
        //                 </Badge>
        //             ) : (
        //                 "-"
        //             )}
        //         </div>
        //     ),
        // },
        // {
        //     key: "ogType",
        //     label: "OG Type",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="text-sm">
        //             {page.ogType || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "ogSiteName",
        //     label: "OG Site Name",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[120px] truncate text-sm">
        //             {page.ogSiteName || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "ogLocale",
        //     label: "OG Locale",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="text-sm">
        //             {page.ogLocale || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "twitterCard",
        //     label: "Twitter Card",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="text-sm">
        //             {page.twitterCard || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "twitterSite",
        //     label: "Twitter Site",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[120px] truncate text-sm">
        //             {page.twitterSite || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "twitterCreator",
        //     label: "Twitter Creator",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[120px] truncate text-sm">
        //             {page.twitterCreator || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "twitterImageUrl",
        //     label: "Twitter Image",
        //     sortable: false,
        //     render: (page: DynamicPage) => (
        //         <div className="text-sm">
        //             {page.twitterImageUrl ? (
        //                 <Badge variant="default" className="bg-blue-100 text-blue-800">
        //                     Has Image
        //                 </Badge>
        //             ) : (
        //                 "-"
        //             )}
        //         </div>
        //     ),
        // },
        // {
        //     key: "alternates",
        //     label: "Alternates",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="max-w-[120px] truncate text-sm">
        //             {page.alternates || "-"}
        //         </div>
        //     ),
        // },
        // {
        //     key: "changefreq",
        //     label: "Change Freq",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <Badge variant="outline" className="capitalize">
        //             {page.changefreq || "-"}
        //         </Badge>
        //     ),
        // },
        // {
        //     key: "priority",
        //     label: "Priority",
        //     sortable: true,
        //     render: (page: DynamicPage) => (
        //         <div className="text-sm">
        //             {page.priority || "-"}
        //         </div>
        //     ),
        // },
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
        router.push(`/dashboard/page-management/edit/${slugParam || "home"}`);
    };

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dynamic Pages Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your dynamic pages with SEO and article content
                    </p>
                </div>
            </div>

            {/* Task 4: Search and Filters */}
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

                <Select value={noindexFilter} onValueChange={setNoindexFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Noindex Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Pages</SelectItem>
                        <SelectItem value="true">Noindex: Yes</SelectItem>
                        <SelectItem value="false">Noindex: No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/* <TableHead className="w-[50px]">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedItems(paginatedData);
                                        } else {
                                            setSelectedItems([]);
                                        }
                                    }}
                                    className="rounded border-gray-300"
                                />
                            </TableHead> */}
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
                                    {/* <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.some(item => item._id === page._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedItems([...selectedItems, page]);
                                                } else {
                                                    setSelectedItems(selectedItems.filter(item => item._id !== page._id));
                                                }
                                            }}
                                            className="rounded border-gray-300"
                                        />
                                    </TableCell> */}
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
                        Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
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
                        Page {currentPage} of {totalPages}
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