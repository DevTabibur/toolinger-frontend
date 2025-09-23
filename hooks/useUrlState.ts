"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UrlStateOptions {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
  filters?: Record<string, string>;
}

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentState = useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "10"),
      filters: Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => 
          !["search", "sortBy", "sortOrder", "page", "pageSize"].includes(key)
        )
      )
    };
  }, [searchParams]);

  const updateState = useCallback((updates: Partial<UrlStateOptions>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset page when search or filters change
    if (updates.search !== undefined || updates.filters !== undefined) {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  return {
    ...currentState,
    updateState
  };
}
