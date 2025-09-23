


"use client";

import { useState } from "react";

interface UseDeleteConfirmationProps<T> {
  onDelete: (item: T) => Promise<void>;
  itemName: string;
}

export function useDeleteConfirmation<T>({ onDelete, itemName }: UseDeleteConfirmationProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (item: T) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(itemToDelete);
      setIsOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };

  return {
    isOpen,
    itemToDelete,
    isDeleting,
    confirmDelete,
    handleDelete,
    cancelDelete
  };
}