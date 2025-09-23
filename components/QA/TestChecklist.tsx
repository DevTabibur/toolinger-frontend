"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Circle, 
  FileText, 
  Search, 
  Settings, 
  Code,
  Database,
  Globe,
  Users
} from "lucide-react";

interface TestItem {
  id: string;
  name: string;
  description: string;
  category: string;
  completed: boolean;
  icon: React.ReactNode;
}

export function TestChecklist() {
  const [tests, setTests] = useState<TestItem[]>([
    // Static Pages Tests
    {
      id: "static-edit-home",
      name: "Edit Home Page",
      description: "Edit home page content and SEO, save and refresh",
      category: "Static Pages",
      completed: false,
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "static-edit-about",
      name: "Edit About Page",
      description: "Edit about page content and SEO",
      category: "Static Pages",
      completed: false,
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "static-edit-contact",
      name: "Edit Contact Page",
      description: "Edit contact page content and SEO",
      category: "Static Pages",
      completed: false,
      icon: <FileText className="h-4 w-4" />
    },

    // Manage Pages Tests
    {
      id: "manage-search",
      name: "Search Functionality",
      description: "Test search box filters results correctly",
      category: "Manage Pages",
      completed: false,
      icon: <Search className="h-4 w-4" />
    },
    {
      id: "manage-sort",
      name: "Sort Functionality",
      description: "Test column sorting works properly",
      category: "Manage Pages",
      completed: false,
      icon: <Search className="h-4 w-4" />
    },
    {
      id: "manage-filter",
      name: "Filter Functionality",
      description: "Test filters update results correctly",
      category: "Manage Pages",
      completed: false,
      icon: <Search className="h-4 w-4" />
    },

    // Category Pages Tests
    {
      id: "category-text-tools",
      name: "Text Tools Category",
      description: "Test text tools category page functionality",
      category: "Category Pages",
      completed: false,
      icon: <Settings className="h-4 w-4" />
    },
    {
      id: "category-image-tools",
      name: "Image Tools Category",
      description: "Test image tools category page functionality",
      category: "Category Pages",
      completed: false,
      icon: <Settings className="h-4 w-4" />
    },

    // Schema Validation Tests
    {
      id: "schema-invalid-json",
      name: "Invalid JSON Schema",
      description: "Test invalid JSON shows error message",
      category: "Schema Validation",
      completed: false,
      icon: <Code className="h-4 w-4" />
    },
    {
      id: "schema-valid-json",
      name: "Valid JSON Schema",
      description: "Test valid JSON saves successfully",
      category: "Schema Validation",
      completed: false,
      icon: <Code className="h-4 w-4" />
    },

    // Build Tests
    {
      id: "build-test",
      name: "Build Test",
      description: "npm run build passes with no errors",
      category: "Build",
      completed: false,
      icon: <Database className="h-4 w-4" />
    },

    // API Tests
    {
      id: "api-create",
      name: "API Create",
      description: "Test page creation via API",
      category: "API",
      completed: false,
      icon: <Globe className="h-4 w-4" />
    },
    {
      id: "api-update",
      name: "API Update",
      description: "Test page update via API",
      category: "API",
      completed: false,
      icon: <Globe className="h-4 w-4" />
    },
    {
      id: "api-delete",
      name: "API Delete",
      description: "Test page deletion via API",
      category: "API",
      completed: false,
      icon: <Globe className="h-4 w-4" />
    }
  ]);

  const toggleTest = (id: string) => {
    setTests(tests.map(test => 
      test.id === id ? { ...test, completed: !test.completed } : test
    ));
  };

  const resetAllTests = () => {
    setTests(tests.map(test => ({ ...test, completed: false })));
  };

  const completeAllTests = () => {
    setTests(tests.map(test => ({ ...test, completed: true })));
  };

  const getCategoryStats = () => {
    const categories = [...new Set(tests.map(test => test.category))];
    return categories.map(category => {
      const categoryTests = tests.filter(test => test.category === category);
      const completed = categoryTests.filter(test => test.completed).length;
      const total = categoryTests.length;
      return {
        category,
        completed,
        total,
        percentage: (completed / total) * 100
      };
    });
  };

  const totalCompleted = tests.filter(test => test.completed).length;
  const totalTests = tests.length;
  const completionPercentage = (totalCompleted / totalTests) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            QA Test Checklist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive testing checklist for Page Management system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={resetAllTests}>
            Reset All
          </Button>
          <Button onClick={completeAllTests}>
            Complete All
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            {totalCompleted} of {totalTests} tests completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {completionPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getCategoryStats().map((stat) => (
          <Card key={stat.category}>
            <CardHeader>
              <CardTitle className="text-lg">{stat.category}</CardTitle>
              <CardDescription>
                {stat.completed} of {stat.total} tests completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Items */}
      <div className="space-y-4">
        {tests.map((test) => (
          <Card key={test.id} className={test.completed ? "bg-green-50 dark:bg-green-900/20" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={test.completed}
                  onCheckedChange={() => toggleTest(test.id)}
                />
                <div className="flex items-center space-x-2">
                  {test.icon}
                  <span className="font-medium">{test.name}</span>
                </div>
                <Badge variant="outline">{test.category}</Badge>
                {test.completed && (
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-8">
                {test.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

