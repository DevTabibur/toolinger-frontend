


"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

interface ValidatedTextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  validator?: (value: string) => string | null;
  showCharacterCount?: boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  placeholder?: string;
  className?: string;
}

export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  label,
  value,
  onChange,
  onBlur,
  validator,
  showCharacterCount = false,
  maxLength,
  minLength,
  rows = 4,
  placeholder,
  className,
}) => {
  // Internal state for touched
  const [touched, setTouched] = React.useState(false);

  // Compute error using validator if provided
  const error = validator ? validator(value) : undefined;

  // Handle blur event
  const handleBlur = () => {
    setTouched(true);
    if (onBlur) onBlur();
  };

  // Character count
  const charCount = value ? value.length : 0;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className="mb-1 block" htmlFor={label.replace(/\s+/g, "-").toLowerCase()}>
          {label}
        </Label>
      )}
      <Textarea
        id={label ? label.replace(/\s+/g, "-").toLowerCase() : undefined}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={handleBlur}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(
          "w-full",
          touched && error && "border-red-500 focus-visible:ring-red-500"
        )}
      />
      <div className="flex items-center justify-between mt-1">
        {showCharacterCount && (
          <span
            className={cn(
              "text-xs",
              maxLength && charCount > maxLength
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            {charCount}
            {maxLength ? ` / ${maxLength}` : ""}
          </span>
        )}
        {minLength && (
          <span className="text-xs text-gray-400 ml-auto">
            Min {minLength} chars
          </span>
        )}
      </div>
      {touched && error && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};