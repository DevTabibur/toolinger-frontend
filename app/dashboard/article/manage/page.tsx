"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Home } from "lucide-react";
import {
  deleteDynamicPagesArticleAndSeo,
  getAllArticlesOrSeo,
  updateDynamicPagesArticleAndSeo,
} from "@/app/api/pageManagement.Api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DynamicTable } from "@/components/ui/table";
import toast from "react-hot-toast";
import { QuillField } from "@/form/QuillField";

const PAGE_SIZE = 10;

// Improved Modal component: beautiful, centered, scrollable content
function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col"
        style={{
          maxHeight: "90vh",
          minWidth: 350,
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold z-10"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          ×
        </button>
        <div
          className="overflow-y-auto p-8"
          style={{
            maxHeight: "80vh",
            minHeight: "200px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ManageArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle delete
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this article?");
    if (confirm) {
      setDeletingId(id);
      const res = await deleteDynamicPagesArticleAndSeo(id, "article");
      setDeletingId(null);
      if (res?.statusCode === 200) {
        toast.success("Article deleted successfully");
        setArticles((prev) => prev.filter((a) => a.id !== id && a._id !== id));
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // Modal state for editing
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<any>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editLoading, setEditLoading] = useState(false);

  // Open modal and set current article
  const openEditModal = (row: any) => {
    setEditArticle(row);
    // Try to get content from row.PageArticle.content or row.content
    let content = "";
    if (row?.PageArticle?.content) {
      content = row.PageArticle.content;
    } else if (row?.content) {
      content = row.content;
    }
    setEditContent(content);
    setEditModalOpen(true);
  };

  // Handle save in modal
  const handleEditSave = async () => {
    if (!editArticle) return;
    setEditLoading(true);
    try {
      // Only update the content field
      const id = editArticle._id || editArticle.id;
      // The API expects the content inside PageArticle as an object, not a string
      // So we must send: { PageArticle: { content: ... } }
      const data = {
        slug: editArticle.slug,
        PageArticle: {
          content: editContent,
        },
      };
      const res = await updateDynamicPagesArticleAndSeo(id, data);
      if (res?.statusCode === 200) {
        toast.success("Article updated successfully");
        // Update articles in state
        setArticles((prev) =>
          prev.map((a) => {
            if ((a._id || a.id) === id) {
              // Update content in PageArticle if exists, else in root
              if (a.PageArticle) {
                return {
                  ...a,
                  PageArticle: { ...a.PageArticle, content: editContent },
                };
              } else {
                return { ...a, content: editContent };
              }
            }
            return a;
          })
        );
        setEditModalOpen(false);
        setEditArticle(null);
      } else {
        // Try to show backend error message if available
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.error("Failed to update article");
        }
      }
    } catch (e: any) {
      toast.error("Error updating article");
    }
    setEditLoading(false);
  };

  // Table columns, with content preview from PageArticle.content
  const columns: any[] = [
    {
      key: "sl",
      label: "SL",
      sortable: false,
      render: (_row: any, _col: any, index: number) => Number(_row + 1),
    },
    {
      key: "slug",
      label: "Slug / Page",
      sortable: true,
      render: (row: any) => row.slug,
    },
    {
      key: "id",
      label: "Id",
      sortable: false,
      render: (row: any) => row._id || row.id,
    },
    {
      key: "content",
      label: "Content",
      sortable: false,
      render: (row: any) => {
        return row?.PageArticle ? (
          <span
            className="line-clamp-2 block max-w-xs"
            style={{
              maxWidth: 300,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            dangerouslySetInnerHTML={{
              __html:
                row?.PageArticle?.content.length > 100
                  ? row?.PageArticle?.content.substring(0, 100) + "..."
                  : row?.PageArticle?.content,
            }}
          />
        ) : (
          <span className="text-gray-400 italic">No content</span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (row: any) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(row);
            }}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id || row.id);
            }}
            disabled={deletingId === (row._id || row.id)}
          >
            {deletingId === (row._id || row.id) ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  // Fetch articles from /article API
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await getAllArticlesOrSeo("article");
        if (res?.statusCode === 200) {
          setArticles(res?.data);
        }
      } catch (e) {
        setError("Failed to fetch articles.");
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="p-4  container mx-auto">
      {/* heading */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
            Manage Articles
          </h1>
          <button
            className="px-4 py-2 rounded-lg bg-[#00dbed] text-white font-semibold hover:bg-[#009bbd] transition self-start sm:self-auto"
            onClick={() => router.push("/dashboard/article/create")}
          >
            + Create Article
          </button>
        </div>
        {/* BreadCrumb */}
        <div className="mt-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/article/manage">
                  Article Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Article</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <DynamicTable
        columns={columns}
        data={articles}
        pageSize={5}
        searchPlaceholder="Search articles..."
        loading={loading}
      />

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Edit Article Content</h2>
        {editArticle && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSave();
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Slug / Page
              </label>
              <input
                type="text"
                value={editArticle.slug}
                disabled
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Id
              </label>
              <input
                type="text"
                value={editArticle._id || editArticle.id}
                disabled
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Content
              </label>
              <QuillField
                value={editContent}
                onChange={setEditContent}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setEditModalOpen(false)}
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600"
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
