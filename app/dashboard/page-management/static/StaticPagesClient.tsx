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
import { toast } from "sonner";
import { useUrlState } from "@/hooks/useUrlState";
import { TableSkeleton } from "@/components/Table/TableSkeleton";
import { EmptyState } from "@/components/Table/EmptyState";
import { BulkActions } from "@/components/Table/BulkActions";
import CreatePageButton from "@/components/CreatePageButton";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useBulkDeleteConfirmation } from "@/hooks/useBulkDeleteConfirmation";
import { getApiSupport } from "@/lib/apiSupport";
import { deleteDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";

interface StaticPage {
  id: string;
  title: string;
  slug: string;
  canonicalUrl: string;
  noindex: boolean;
  updatedAt: string;
  type: "static";
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

export default function StaticPagesClient() {
  const router = useRouter();
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<StaticPage[]>([]);
  const [apiSupport, setApiSupport] = useState(getApiSupport());
  
  // Use URL state management
  const { search, sortBy, sortOrder, page, pageSize, filters, updateState } = useUrlState();
  
  // Remove local state for search, sort, pagination as they're now managed by URL
  const [noindexFilter, setNoindexFilter] = useState(filters.noindex || "all");

  // Static pages data - these are the actual static pages in the project
  const staticPagesData: StaticPage[] = [
    {
      id: "home",
      title: "Home",
      slug: "/",
      canonicalUrl: "/",
      noindex: false,
      updatedAt: new Date().toISOString(),
      type: "static",
    },
    {
      id: "about",
      title: "About",
      slug: "/about",
      canonicalUrl: "/about",
      noindex: false,
      updatedAt: new Date().toISOString(),
      type: "static",
    },
    {
      id: "contact",
      title: "Contact",
      slug: "/contact",
      canonicalUrl: "/contact",
      noindex: false,
      updatedAt: new Date().toISOString(),
      type: "static",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      slug: "/privacy",
      canonicalUrl: "/privacy",
      noindex: false,
      updatedAt: new Date().toISOString(),
      type: "static",
    },
    {
      id: "terms",
      title: "Terms of Service",
      slug: "/terms",
      canonicalUrl: "/terms",
      noindex: false,
      updatedAt: new Date().toISOString(),
      type: "static",
    },
    {
      id: "coming-soon",
      title: "Coming Soon",
      slug: "/coming-soon",
      canonicalUrl: "/coming-soon",
      noindex: true,
      updatedAt: new Date().toISOString(),
      type: "static",
    },
  ];

  useEffect(() => {
    const loadPages = async () => {
      setLoading(true);
      try {
        setPages(staticPagesData);
      } catch (error) {
        toast.error("Failed to load static pages");
        console.error("Error loading static pages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    updateState({ filters: { noindex: noindexFilter } });
  }, [noindexFilter, updateState]);

  // Filter and search data
  const filteredData = React.useMemo(() => {
    let result = [...pages];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (page) =>
          page.title.toLowerCase().includes(searchLower) ||
          page.slug.toLowerCase().includes(searchLower) ||
          page.canonicalUrl.toLowerCase().includes(searchLower)
      );
    }

    // Apply noindex filter
    if (noindexFilter !== "all") {
      const filterValue = noindexFilter === "true";
      result = result.filter((page) => page.noindex === filterValue);
    }

    return result;
  }, [pages, search, noindexFilter]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortBy];
      const bValue = (b as any)[sortBy];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortBy, sortOrder]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (key: string) => {
    if (sortBy === key) {
      updateState({ sortOrder: sortOrder === "asc" ? "desc" : "asc" });
    } else {
      updateState({ sortBy: key, sortOrder: "asc" });
    }
  };

  // Handle search
  const handleSearch = (value: string) => {
    updateState({ search: value });
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    updateState({ page: newPage });
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    updateState({ pageSize: newPageSize, page: 1 });
  };

  // Handle bulk actions
//   const handleBulkDelete = async (items: StaticPage[]) => {
//     try {
//       // In a real implementation, you would call the bulk delete API
//       setPages(pages.filter(page => !items.some(item => item.id === page.id)));
//       setSelectedItems([]);
//     } catch (error) {
//       throw error;
//     }
//   };

  const handleBulkExport = (items: StaticPage[]) => {
    // Export functionality
    const csvContent = [
      ["Title", "Slug", "Canonical URL", "Noindex", "Updated At"],
      ...items.map(page => [
        page.title,
        page.slug,
        page.canonicalUrl,
        page.noindex ? "Yes" : "No",
        new Date(page.updatedAt).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "static-pages-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setNoindexFilter("all");
    updateState({ search: "", filters: {} });
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

  // Handle edit
  const handleEdit = (page: StaticPage) => {
    router.push(
      `/dashboard/page-management/edit/${page.slug.replace("/", "") || "home"}`
    );
  };

  // Delete confirmation hooks
  const deleteConfirmation = useDeleteConfirmation({
    onDelete: async (item: StaticPage) => {
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
    onBulkDelete: async (items: StaticPage[]) => {
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
  const handleDelete = (page: StaticPage) => {
    deleteConfirmation.confirmDelete(page);
  };

  // Handle bulk delete with confirmation
  const handleBulkDelete = (items: StaticPage[]) => {
    bulkDeleteConfirmation.confirmBulkDelete(items);
  };

  // Handle view
  const handleView = (page: StaticPage) => {
    window.open(page.canonicalUrl, "_blank");
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (page: StaticPage) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {page.title}
        </div>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      sortable: true,
      render: (page: StaticPage) => (
        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {page.slug}
        </code>
      ),
    },
    {
      key: "canonicalUrl",
      label: "Canonical URL",
      sortable: true,
      render: (page: StaticPage) => (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {page.canonicalUrl}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(page)}
            className="h-6 w-6 p-0"
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
      render: (page: StaticPage) => (
        <Badge variant={page.noindex ? "destructive" : "default"}>
          {page.noindex ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated At",
      sortable: true,
      render: (page: StaticPage) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(page.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Static Pages Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your static pages (Home, Contact, About, Terms, Privacy)
          </p>
        </div>
        <CreatePageButton />
      </div>

      {/* Bulk Actions */}
      {/* <BulkActions
        selectedItems={selectedItems}
        onClearSelection={() => setSelectedItems([])}
        onBulkDelete={apiSupport.bulkDelete ? handleBulkDelete : undefined}
        onBulkExport={apiSupport.export ? handleBulkExport : undefined}
      /> */}

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
              <TableHead className="w-[50px]">
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
              </TableHead>
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
                <TableCell colSpan={columns.length + 2} className="p-8">
                  <TableSkeleton columns={columns.length + 2} />
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="p-0">
                  <EmptyState
                    title={search || noindexFilter !== "all" ? "No pages found" : "No static pages"}
                    description={
                      search || noindexFilter !== "all" 
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Get started by creating your first static page."
                    }
                    action={{
                      label: "Create Page",
                      onClick: () => router.push("/dashboard/page-management/create")
                    }}
                    onClearFilters={search || noindexFilter !== "all" ? handleClearFilters : undefined}
                    hasFilters={!!(search || noindexFilter !== "all")}
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((page, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedItems.some(item => item.id === page.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, page]);
                        } else {
                          setSelectedItems(selectedItems.filter(item => item.id !== page.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
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
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modals */}
      {/* <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.handleClose}
        onConfirm={deleteConfirmation.handleDelete}
        title="Delete Page"
        description={`Are you sure you want to delete "${deleteConfirmation.itemToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        // loading={deleteConfirmation.loading}
      /> */}

      {/* <ConfirmationModal
        isOpen={bulkDeleteConfirmation.isOpen}
        onClose={bulkDeleteConfirmation.handleClose}
        onConfirm={bulkDeleteConfirmation.handleBulkDelete}
        title="Delete Multiple Pages"
        description={`Are you sure you want to delete ${bulkDeleteConfirmation.itemsToDelete.length} pages? This action cannot be undone.`}
        confirmText="Delete All"
        variant="destructive"
        loading={bulkDeleteConfirmation.loading}
      /> */}
    </div>
  );
}
