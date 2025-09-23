"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreatePageButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function CreatePageButton({ 
  variant = "default", 
  size = "default",
  className 
}: CreatePageButtonProps) {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/dashboard/page-management/create");
  };

  return (
    <Button
      onClick={handleCreate}
      variant={variant}
      size={size}
      className={className}
    >
      <Plus className="h-4 w-4 mr-2" />
      Create New Page
    </Button>
  );
}
