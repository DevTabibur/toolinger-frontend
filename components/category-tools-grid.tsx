"use client";

import Link from "next/link";
import { useState } from "react";

interface Tool {
  level: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

interface CategoryToolsGridProps {
  tools: Tool[];
  categorySlug: string;
  categoryName: string;
  component: any;
}

export function CategoryToolsGrid({
  tools,
  categorySlug,
  categoryName,
  component,
}: CategoryToolsGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log("tools", tools);

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
        <p className="text-muted-foreground mb-4">
          Looking for better way to work with {categoryName.toLowerCase()}?
          Check out these tools!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            // href={`/${categorySlug}/${tool.slug}`}
            href={`/category/${categorySlug}/${tool.slug}`}
            className="group relative bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{tool.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${
                tool.level === "pro"
                  ? "from-red-400 to-red-600 text-white"
                  : "from-green-400 to-green-600 text-white"
              }`}
            >
              {tool.level === "pro" ? "Pro" : "Free"}
            </span>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No tools found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
