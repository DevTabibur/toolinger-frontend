"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  validator: (value: string) => { isValid: boolean; message?: string };
  showCharacterCount?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
}

export function ValidatedInput({
  label,
  value,
  onChange,
  onBlur,
  validator,
  showCharacterCount = false,
  maxLength,
  minLength,
  className,
  ...props
}: ValidatedInputProps) {
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState({ isValid: true, message: "" });

  useEffect(() => {
    if (touched || value) {
      setValidation(validator(value));
    }
  }, [value, touched, validator]);

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  const getStatusIcon = () => {
    if (!touched && !value) return null;
    
    if (validation.isValid) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    if (!touched && !value) return "";
    return validation.isValid ? "border-green-500" : "border-red-500";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <div className="relative">
        <Input
          {...props}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className={cn(
            "pr-8",
            getStatusColor(),
            className
          )}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {getStatusIcon()}
        </div>
      </div>
      
      {showCharacterCount && maxLength && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>{value.length}/{maxLength} characters</span>
          <span className={cn(
            value.length > maxLength * 0.9 ? "text-yellow-500" : "",
            value.length > maxLength ? "text-red-500" : ""
          )}>
            {value.length > maxLength ? "Over limit" : "Good"}
          </span>
        </div>
      )}
      
      {touched && !validation.isValid && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {validation.message}
        </p>
      )}
    </div>
  );
}
