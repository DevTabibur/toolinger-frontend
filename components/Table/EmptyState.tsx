import React from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Plus,
  Filter,
  RefreshCw
} from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClearFilters?: () => void;
  hasFilters?: boolean;
}

export function EmptyState({ 
  title, 
  description, 
  icon = <FileText className="h-12 w-12" />,
  action,
  onClearFilters,
  hasFilters = false
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      <div className="flex items-center justify-center space-x-3">
        {action && (
          <Button onClick={action.onClick} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{action.label}</span>
          </Button>
        )}
        {hasFilters && onClearFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Clear Filters</span>
          </Button>
        )}
      </div>
    </div>
  );
}
