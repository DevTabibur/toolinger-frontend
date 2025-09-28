"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Trash2, 
  Edit, 
  Eye, 
  Download,
  MoreHorizontal,
  Check
} from "lucide-react";
import toast from "react-hot-toast";


interface BulkActionsProps<T = any> {
  selectedItems: T[];
  onClearSelection: () => void;
  onBulkDelete?: (items: T[]) => Promise<void>;
  onBulkEdit?: (items: T[]) => void;
  onBulkExport?: (items: T[]) => void;
  maxSelection?: number;
}

export function BulkActions<T = any>({
  selectedItems,
  onClearSelection,
  onBulkDelete,
  onBulkEdit,
  onBulkExport,
  maxSelection = 100
}: BulkActionsProps<T>) {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<string>("");

  const handleBulkAction = async (actionType: string) => {
    if (selectedItems.length === 0) return;

    setLoading(true);
    try {
      switch (actionType) {
        case "delete":
          if (onBulkDelete) {
            if (window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
              await onBulkDelete(selectedItems);
              toast.success(`${selectedItems.length} items deleted successfully`);
              onClearSelection();
            }
          }
          break;
        case "edit":
          if (onBulkEdit) {
            onBulkEdit(selectedItems);
          }
          break;
        case "export":
          if (onBulkExport) {
            onBulkExport(selectedItems);
            toast.success(`${selectedItems.length} items exported successfully`);
          }
          break;
      }
    } catch (error) {
      toast.error(`Failed to ${actionType} items`);
      console.error(`Bulk ${actionType} error:`, error);
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Select value={action} onValueChange={setAction}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Bulk actions" />
            </SelectTrigger>
            <SelectContent>
              {onBulkDelete && (
                <SelectItem value="delete">
                  <div className="flex items-center space-x-2">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </div>
                </SelectItem>
              )}
              {onBulkEdit && (
                <SelectItem value="edit">
                  <div className="flex items-center space-x-2">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </div>
                </SelectItem>
              )}
              {onBulkExport && (
                <SelectItem value="export">
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {action && (
            <Button
              size="sm"
              onClick={() => handleBulkAction(action)}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
              <span>Apply</span>
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-blue-600 hover:text-blue-700"
        >
          Clear selection
        </Button>
      </div>
    </div>
  );
}