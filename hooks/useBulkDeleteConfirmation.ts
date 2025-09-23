"use client";

import { useState } from "react";

interface UseBulkDeleteConfirmationProps<T> {
  onBulkDelete: (items: T[]) => Promise<void>;
  itemName: string;
}

export function useBulkDeleteConfirmation<T>({ onBulkDelete, itemName }: UseBulkDeleteConfirmationProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<T[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmBulkDelete = (items: T[]) => {
    setItemsToDelete(items);
    setIsOpen(true);
  };

  const handleBulkDelete = async () => {
    if (itemsToDelete.length === 0) return;
    
    setIsDeleting(true);
    try {
      await onBulkDelete(itemsToDelete);
      setIsOpen(false);
      setItemsToDelete([]);
    } catch (error) {
      console.error("Bulk delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelBulkDelete = () => {
    setIsOpen(false);
    setItemsToDelete([]);
  };

  return {
    isOpen,
    itemsToDelete,
    isDeleting,
    confirmBulkDelete,
    handleBulkDelete,
    cancelBulkDelete
  };
}
