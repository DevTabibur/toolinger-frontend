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

interface CategoryPage {
  id: string;
  metaTitle: string;
  keywords: string;
  canonicalUrl: string;
  noindex: boolean;
  changefreq: string;
  priority: number;
  updatedAt: string;
  type: 'tool';
  slug: string;
  category: string;
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

interface CategoryPagesClientProps {
  category: string;
}

export default function CategoryPagesClient({ category }: CategoryPagesClientProps) {
  const router = useRouter();
  const [pages, setPages] = useState<CategoryPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [noindexFilter, setNoindexFilter] = useState("all");

  // Category mapping
  const categoryMapping: Record<string, string> = {
    "text": "Text Tools",
    "image": "Image Tools", 
    "developer": "Developer Tools",
    "converters": "Converters",
    "generators": "Generators",
    "calculators": "Calculators",
    "website-management": "Website Management Tools"
  };

  // Sample data for different categories
  const getCategoryData = (category: string): CategoryPage[] => {
    const baseData: Record<string, CategoryPage[]> = {
      "text": [
        {
          id: "text-uppercase",
          metaTitle: "Text to Uppercase Converter - Free Online Tool",
          keywords: "uppercase, text converter, case converter, online tool",
          canonicalUrl: "/text/uppercase",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/text/uppercase",
          category: "text"
        },
        {
          id: "text-lowercase",
          metaTitle: "Text to Lowercase Converter - Free Online Tool",
          keywords: "lowercase, text converter, case converter, online tool",
          canonicalUrl: "/text/lowercase",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/text/lowercase",
          category: "text"
        },
        {
          id: "text-reverse",
          metaTitle: "Text Reverser - Reverse Text Online",
          keywords: "reverse text, text reverser, backwards text",
          canonicalUrl: "/text/reverse",
          noindex: false,
          changefreq: "weekly",
          priority: 0.8,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/text/reverse",
          category: "text"
        },
        {
          id: "word-counter",
          metaTitle: "Word Counter - Count Words and Characters",
          keywords: "word counter, character counter, text analysis",
          canonicalUrl: "/text/word-counter",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/text/word-counter",
          category: "text"
        }
      ],
      "image": [
        {
          id: "image-resizer",
          metaTitle: "Image Resizer - Resize Images Online",
          keywords: "image resizer, resize image, photo resizer",
          canonicalUrl: "/image/resizer",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/image/resizer",
          category: "image"
        },
        {
          id: "image-compressor",
          metaTitle: "Image Compressor - Compress Images Online",
          keywords: "image compressor, compress image, reduce file size",
          canonicalUrl: "/image/compressor",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/image/compressor",
          category: "image"
        }
      ],
      "developer": [
        {
          id: "json-formatter",
          metaTitle: "JSON Formatter - Format and Validate JSON",
          keywords: "json formatter, json validator, json beautifier",
          canonicalUrl: "/developer/json-formatter",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/developer/json-formatter",
          category: "developer"
        },
        {
          id: "html-encoder",
          metaTitle: "HTML Encoder/Decoder - Encode HTML Entities",
          keywords: "html encoder, html decoder, html entities",
          canonicalUrl: "/developer/html-encoder",
          noindex: false,
          changefreq: "weekly",
          priority: 0.8,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/developer/html-encoder",
          category: "developer"
        }
      ],
      "converters": [
        {
          id: "pdf-to-word",
          metaTitle: "PDF to Word Converter - Convert PDF to DOCX",
          keywords: "pdf to word, pdf converter, docx converter",
          canonicalUrl: "/converters/pdf-to-word",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/converters/pdf-to-word",
          category: "converters"
        },
        {
          id: "image-to-pdf",
          metaTitle: "Image to PDF Converter - Convert Images to PDF",
          keywords: "image to pdf, jpg to pdf, png to pdf",
          canonicalUrl: "/converters/image-to-pdf",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/converters/image-to-pdf",
          category: "converters"
        }
      ],
      "generators": [
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
          slug: "/generators/password",
          category: "generators"
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
          slug: "/generators/qr-code",
          category: "generators"
        }
      ],
      "calculators": [
        {
          id: "mortgage-calculator",
          metaTitle: "Mortgage Calculator - Calculate Monthly Payments",
          keywords: "mortgage calculator, loan calculator, payment calculator",
          canonicalUrl: "/calculators/mortgage",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/calculators/mortgage",
          category: "calculators"
        },
        {
          id: "tip-calculator",
          metaTitle: "Tip Calculator - Calculate Tips and Splits",
          keywords: "tip calculator, gratuity calculator, split bill",
          canonicalUrl: "/calculators/tip",
          noindex: false,
          changefreq: "weekly",
          priority: 0.8,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/calculators/tip",
          category: "calculators"
        }
      ],
      "website-management": [
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
          slug: "/tools/url-shortener",
          category: "website-management"
        },
        {
          id: "website-speed-test",
          metaTitle: "Website Speed Test - Test Your Site Performance",
          keywords: "speed test, website performance, page speed",
          canonicalUrl: "/tools/speed-test",
          noindex: false,
          changefreq: "weekly",
          priority: 0.9,
          updatedAt: new Date().toISOString(),
          type: "tool",
          slug: "/tools/speed-test",
          category: "website-management"
        }
      ]
    };

    return baseData[category] || [];
  };

  useEffect(() => {
    const loadPages = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch from API based on category
        const categoryData = getCategoryData(category);
        setPages(categoryData);
      } catch (error) {
        toast.error("Failed to load category pages");
        console.error("Error loading category pages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [category]);

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

    return result;
  }, [pages, search, noindexFilter]);

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
  const handleEdit = (page: CategoryPage) => {
    router.push(`/dashboard/page-management/edit/${page.slug.replace("/", "")}`);
  };

  // Handle delete
  const handleDelete = async (page: CategoryPage) => {
    if (
      window.confirm(`Are you sure you want to delete the ${page.metaTitle} page?`)
    ) {
      try {
        // In a real implementation, you would call the delete API
        toast.success(`${page.metaTitle} page deleted successfully`);
        setPages(pages.filter((p) => p.id !== page.id));
      } catch (error) {
        toast.error("Failed to delete page");
        console.error("Error deleting page:", error);
      }
    }
  };

  // Handle view
  const handleView = (page: CategoryPage) => {
    window.open(page.canonicalUrl, "_blank");
  };

  const columns = [
    {
      key: "metaTitle",
      label: "Meta Title",
      sortable: true,
      render: (page: CategoryPage) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 dark:text-white truncate">
            {page.metaTitle}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Tool Page
          </div>
        </div>
      ),
    },
    {
      key: "keywords",
      label: "Keywords",
      sortable: true,
      render: (page: CategoryPage) => (
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
      render: (page: CategoryPage) => (
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
      render: (page: CategoryPage) => (
        <Badge variant={page.noindex ? "destructive" : "default"}>
          {page.noindex ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "changefreq",
      label: "Changefreq",
      sortable: true,
      render: (page: CategoryPage) => (
        <Badge variant="outline" className="capitalize">
          {page.changefreq}
        </Badge>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (page: CategoryPage) => (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {page.priority}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated At",
      sortable: true,
      render: (page: CategoryPage) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(page.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const categoryName = categoryMapping[category] || category;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {categoryName} Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage {categoryName.toLowerCase()} pages and their SEO settings
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
                  No {categoryName.toLowerCase()} found
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(page)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
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
    </div>
  );
}
