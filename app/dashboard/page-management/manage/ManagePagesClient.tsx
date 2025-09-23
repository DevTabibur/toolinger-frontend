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
  Trash2,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useBulkDeleteConfirmation } from "@/hooks/useBulkDeleteConfirmation";
import { getApiSupport } from "@/lib/apiSupport";
import { deleteDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";

interface Page {
  id: string;
  metaTitle: string;
  keywords: string;
  canonicalUrl: string;
  noindex: boolean;
  changefreq: string;
  priority: number;
  updatedAt: string;
  type: 'static' | 'tool';
  slug: string;
}

// --- Table Components (local, not imported) ---
type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn(
        "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
        className
      )}
      {...props}
    />
  );
}
function TableHeader({ className, ...props }: TableSectionProps) {
  return (
    <thead
      className={cn("bg-gray-50 dark:bg-gray-900", className)}
      {...props}
    />
  );
}
function TableBody({ className, ...props }: TableSectionProps) {
  return <tbody className={cn("", className)} {...props} />;
}
function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-gray-200 dark:border-gray-800",
        className
      )}
      {...props}
    />
  );
}
function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}
function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn("px-4 py-3 whitespace-nowrap align-middle", className)}
      {...props}
    />
  );
}
// --- End Table Components ---

export default function ManagePagesClient() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [noindexFilter, setNoindexFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<Page[]>([]);
  const [apiSupport, setApiSupport] = useState(getApiSupport());

  // Sample data combining static pages and tools
  const samplePagesData: Page[] = [
    // Static pages
    {
      id: "home",
      metaTitle: "Home - Toolinger",
      keywords: "home, tools, online tools",
      canonicalUrl: "/",
      noindex: false,
      changefreq: "weekly",
      priority: 1.0,
      updatedAt: new Date().toISOString(),
      type: "static",
      slug: "/"
    },
    {
      id: "about",
      metaTitle: "About Us - Toolinger",
      keywords: "about, company, team",
      canonicalUrl: "/about",
      noindex: false,
      changefreq: "monthly",
      priority: 0.8,
      updatedAt: new Date().toISOString(),
      type: "static",
      slug: "/about"
    },
    {
      id: "contact",
      metaTitle: "Contact Us - Toolinger",
      keywords: "contact, support, help",
      canonicalUrl: "/contact",
      noindex: false,
      changefreq: "monthly",
      priority: 0.7,
      updatedAt: new Date().toISOString(),
      type: "static",
      slug: "/contact"
    },
    {
      id: "privacy",
      metaTitle: "Privacy Policy - Toolinger",
      keywords: "privacy, policy, legal",
      canonicalUrl: "/privacy",
      noindex: false,
      changefreq: "yearly",
      priority: 0.5,
      updatedAt: new Date().toISOString(),
      type: "static",
      slug: "/privacy"
    },
    {
      id: "terms",
      metaTitle: "Terms of Service - Toolinger",
      keywords: "terms, service, legal",
      canonicalUrl: "/terms",
      noindex: false,
      changefreq: "yearly",
      priority: 0.5,
      updatedAt: new Date().toISOString(),
      type: "static",
      slug: "/terms"
    },
    // Tool pages
    {
      id: "text-to-uppercase",
      metaTitle: "Text to Uppercase Converter - Free Online Tool",
      keywords: "uppercase, text converter, case converter, online tool",
      canonicalUrl: "/text/uppercase",
      noindex: false,
      changefreq: "weekly",
      priority: 0.9,
      updatedAt: new Date().toISOString(),
      type: "tool",
      slug: "/text/uppercase"
    },
    {
      id: "password-generator",
      metaTitle: "Password Generator - Secure Password Creator",
      keywords: "password generator, secure password, random password",
      canonicalUrl: "/generators/password",
      noindex: false,
      changefreq: "weekly",
      priority: 0.9,
      updatedAt: new Date().toISOString(),
      type: "tool",
      slug: "/generators/password"
    },
    {
      id: "qr-code-generator",
      metaTitle: "QR Code Generator - Free QR Code Creator",
      keywords: "qr code, generator, barcode, free",
      canonicalUrl: "/generators/qr-code",
      noindex: false,
      changefreq: "weekly",
      priority: 0.8,
      updatedAt: new Date().toISOString(),
      type: "tool",
      slug: "/generators/qr-code"
    },
    {
      id: "url-shortener",
      metaTitle: "URL Shortener - Short Link Generator",
      keywords: "url shortener, link shortener, tiny url",
      canonicalUrl: "/tools/url-shortener",
      noindex: false,
      changefreq: "weekly",
      priority: 0.8,
      updatedAt: new Date().toISOString(),
      type: "tool",
      slug: "/tools/url-shortener"
    },
    {
      id: "coming-soon",
      metaTitle: "Coming Soon - Toolinger",
      keywords: "coming soon, maintenance",
      canonicalUrl: "/coming-soon",
      noindex: true,
      changefreq: "monthly",
      priority: 0.3,
      updatedAt: new Date().toISOString(),
      type: "static",
      slug: "/coming-soon"
    }
  ];

  useEffect(() => {
    const loadPages = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch from API
        // For now, we'll use the sample data
        setPages(samplePagesData);
      } catch (error) {
        toast.error("Failed to load pages");
        console.error("Error loading pages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Filter and search data
  const filteredData = React.useMemo(() => {
    let result = [...pages];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (page) =>
          page.metaTitle.toLowerCase().includes(searchLower) ||
          page.keywords.toLowerCase().includes(searchLower) ||
          page.canonicalUrl.toLowerCase().includes(searchLower) ||
          page.slug.toLowerCase().includes(searchLower)
      );
    }

    // Apply noindex filter
    if (noindexFilter !== "all") {
      const filterValue = noindexFilter === "true";
      result = result.filter((page) => page.noindex === filterValue);
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((page) => page.type === typeFilter);
    }

    return result;
  }, [pages, search, noindexFilter, typeFilter]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortKey];
      const bValue = (b as any)[sortKey];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Get sort icon
  const getSortIcon = (key: string) => {
    if (sortKey !== key)
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-500" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-500" />
    );
  };

  // Handle edit
  const handleEdit = (page: Page) => {
    router.push(`/dashboard/page-management/edit/${page.slug.replace("/", "") || "home"}`);
  };

  // Delete confirmation hooks
  const deleteConfirmation = useDeleteConfirmation({
    onDelete: async (item: Page) => {
      if (apiSupport.delete) {
        // Call API delete
        await deleteDynamicPagesArticleAndSeo(item.id, "article");
      }
      // Remove from local state
      setPages(pages.filter(p => p.id !== item.id));
    },
    itemName: "page"
  });

  const bulkDeleteConfirmation = useBulkDeleteConfirmation({
    onBulkDelete: async (items: Page[]) => {
      if (apiSupport.bulkDelete) {
        // Call bulk delete API for each item
        await Promise.all(
          items.map(item => deleteDynamicPagesArticleAndSeo(item.id, "article"))
        );
      }
      // Remove from local state
      setPages(pages.filter(page => !items.some(item => item.id === page.id)));
      setSelectedItems([]);
    },
    itemName: "pages"
  });

  // Handle delete with confirmation
  const handleDelete = (page: Page) => {
    deleteConfirmation.confirmDelete(page);
  };

  // Handle bulk delete with confirmation
  const handleBulkDelete = (items: Page[]) => {
    bulkDeleteConfirmation.confirmBulkDelete(items);
  };

  // Handle view
  const handleView = (page: Page) => {
    window.open(page.canonicalUrl, "_blank");
  };

  const columns = [
    {
      key: "metaTitle",
      label: "Meta Title",
      sortable: true,
      render: (page: Page) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 dark:text-white truncate">
            {page.metaTitle}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {page.type === "static" ? "Static Page" : "Tool Page"}
          </div>
        </div>
      ),
    },
    {
      key: "keywords",
      label: "Keywords",
      sortable: true,
      render: (page: Page) => (
        <div className="max-w-xs">
          <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {page.keywords}
          </div>
        </div>
      ),
    },
    {
      key: "canonicalUrl",
      label: "Canonical URL",
      sortable: true,
      render: (page: Page) => (
        <div className="flex items-center gap-2 max-w-xs">
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {page.canonicalUrl}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(page)}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "noindex",
      label: "Noindex",
      sortable: true,
      render: (page: Page) => (
        <Badge variant={page.noindex ? "destructive" : "default"}>
          {page.noindex ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "changefreq",
      label: "Changefreq",
      sortable: true,
      render: (page: Page) => (
        <Badge variant="outline" className="capitalize">
          {page.changefreq}
        </Badge>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (page: Page) => (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {page.priority}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated At",
      sortable: true,
      render: (page: Page) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(page.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage All Pages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Unified management for all pages (static + tools)
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={noindexFilter} onValueChange={setNoindexFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Noindex Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pages</SelectItem>
            <SelectItem value="true">Noindex: Yes</SelectItem>
            <SelectItem value="false">Noindex: No</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="static">Static Pages</SelectItem>
            <SelectItem value="tool">Tool Pages</SelectItem>
          </SelectContent>
        </Select>
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
                    "font-medium",
                    column.sortable &&
                      "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                  scope="col"
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
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-gray-500"
                >
                  No pages found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((page, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>
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
                        onClick={() => handleView(page)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(page)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {apiSupport.delete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(page)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
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
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}
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
            onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modals */}
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.handleClose}
        onConfirm={deleteConfirmation.handleDelete}
        title="Delete Page"
        description={`Are you sure you want to delete "${deleteConfirmation.itemToDelete?.metaTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        loading={deleteConfirmation.loading}
      />

      <ConfirmationModal
        isOpen={bulkDeleteConfirmation.isOpen}
        onClose={bulkDeleteConfirmation.handleClose}
        onConfirm={bulkDeleteConfirmation.handleBulkDelete}
        title="Delete Multiple Pages"
        description={`Are you sure you want to delete ${bulkDeleteConfirmation.itemsToDelete.length} pages? This action cannot be undone.`}
        confirmText="Delete All"
        variant="destructive"
        loading={bulkDeleteConfirmation.loading}
      />
    </div>
  );
}
