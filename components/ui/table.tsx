import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Column type: { key: string, label: string, sortable?: boolean, render?: (row) => React.ReactNode }
export interface DynamicTableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DynamicTableProps<T = any> {
  columns: DynamicTableColumn<T>[];
  data: T[];
  pageSize?: number;
  searchPlaceholder?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  // Optionally, you can pass a custom search function
  customSearch?: (row: T, search: string) => boolean;
  loading?: boolean;
}

export function DynamicTable<T = any>({
  columns,
  data,
  pageSize = 10,
  searchPlaceholder = "Search...",
  className,
  onRowClick,
  customSearch,
  loading = false,
}: DynamicTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>(columns.find((c) => c.sortable)?.key || columns[0].key);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // Search
  const filteredData = useMemo(() => {
    if (!search) return data;
    const s = search.toLowerCase();
    return data.filter((row) => {
      if (customSearch) return customSearch(row, search);
      // Default: search all string fields
      return columns.some((col) => {
        const value = (row as any)[col.key];
        return typeof value === "string" && value.toLowerCase().includes(s);
      });
    });
  }, [data, search, columns, customSearch]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.sortable) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      let vA = (a as any)[sortKey];
      let vB = (b as any)[sortKey];
      // Try to handle dates and numbers
      if (typeof vA === "string" && !isNaN(Date.parse(vA)) && typeof vB === "string" && !isNaN(Date.parse(vB))) {
        vA = new Date(vA).getTime();
        vB = new Date(vB).getTime();
      }
      if (typeof vA === "number" && typeof vB === "number") {
        return sortOrder === "asc" ? vA - vB : vB - vA;
      }
      if (typeof vA === "string" && typeof vB === "string") {
        return sortOrder === "asc"
          ? vA.localeCompare(vB)
          : vB.localeCompare(vA);
      }
      return 0;
    });
    return sorted;
  }, [filteredData, sortKey, sortOrder, columns]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  // Handle sort
  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    if (key === sortKey) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  // Reset page on search or data change
  React.useEffect(() => {
    setPage(1);
  }, [search, data]);


  return (
    <div className={cn("w-full", className)}>
      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00dbed] focus:border-transparent transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {/* Search icon */}
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx={11} cy={11} r={8} />
            <line x1={21} y1={21} x2={16.65} y2={16.65} />
          </svg>
        </div>
      </div>
      {/* Table Container: Responsive, horizontal scroll */}
      <div className="w-full overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="min-w-[900px] w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-300 whitespace-nowrap select-none",
                    col.sortable ? "cursor-pointer hover:underline" : ""
                  )}
                  onClick={() => handleSort(col.key, col.sortable)}
                  scope="col"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="ml-1 text-xs">
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400 dark:text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 font-bold text-center text-gray-400 dark:text-gray-500">
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={cn(
                    "border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                    onRowClick ? "cursor-pointer" : ""
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 align-middle whitespace-nowrap"
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination and Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold">
            {paginatedData.length === 0 ? 0 : (page - 1) * pageSize + 1}
          </span>
          {" "}
          to{" "}
          <span className="font-semibold">
            {paginatedData.length === 0 ? 0 : (page - 1) * pageSize + paginatedData.length}
          </span>
          {" "}
          of{" "}
          <span className="font-semibold">{filteredData.length}</span> results
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
