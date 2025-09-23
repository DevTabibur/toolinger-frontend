// QA Test utilities for manual testing
export interface QATestResult {
  test: string;
  status: 'pass' | 'fail' | 'pending';
  message?: string;
  timestamp: Date;
}

export class QATestSuite {
  private results: QATestResult[] = [];

  addTest(test: string, status: 'pass' | 'fail' | 'pending', message?: string) {
    this.results.push({
      test,
      status,
      message,
      timestamp: new Date()
    });
  }

  getResults(): QATestResult[] {
    return this.results;
  }

  getPassedTests(): QATestResult[] {
    return this.results.filter(r => r.status === 'pass');
  }

  getFailedTests(): QATestResult[] {
    return this.results.filter(r => r.status === 'fail');
  }

  getPendingTests(): QATestResult[] {
    return this.results.filter(r => r.status === 'pending');
  }

  getSummary() {
    const total = this.results.length;
    const passed = this.getPassedTests().length;
    const failed = this.getFailedTests().length;
    const pending = this.getPendingTests().length;

    return {
      total,
      passed,
      failed,
      pending,
      passRate: total > 0 ? (passed / total) * 100 : 0
    };
  }
}

// Test scenarios
export const testScenarios = {
  staticPages: {
    editHome: {
      name: "Edit Home Page",
      description: "Edit home page, add content + SEO, save, refresh",
      steps: [
        "Navigate to /dashboard/page-management/static",
        "Click Edit on Home page",
        "Add content in Content tab",
        "Fill Basic SEO fields (Meta Title, Description, Keywords)",
        "Save the page",
        "Refresh and verify changes persist"
      ]
    }
  },
  managePages: {
    searchSortFilter: {
      name: "Search/Sort/Filter in Manage Pages",
      description: "Test search, sort, and filter functionality",
      steps: [
        "Navigate to /dashboard/page-management/manage",
        "Use search box to filter pages",
        "Click column headers to sort",
        "Use filters (Noindex, Type)",
        "Verify results update correctly"
      ]
    }
  },
  categoryPages: {
    textToolsSEO: {
      name: "Text Tools Category SEO",
      description: "Edit SEO for Text Tools category, save, verify in Manage list",
      steps: [
        "Navigate to /dashboard/page-management/category/text",
        "Click Edit on a Text Tool page",
        "Update SEO fields in Basic SEO tab",
        "Save the page",
        "Navigate to Manage Pages",
        "Verify updated SEO appears in the list"
      ]
    }
  },
  schemaValidation: {
    invalidJson: {
      name: "Invalid JSON Schema",
      description: "Test invalid JSON shows error",
      steps: [
        "Navigate to any page editor",
        "Go to Schema tab",
        "Enter invalid JSON: { invalid json }",
        "Verify error message appears",
        "Verify save is disabled"
      ]
    },
    validJson: {
      name: "Valid JSON Schema",
      description: "Test valid JSON saves successfully",
      steps: [
        "Navigate to any page editor",
        "Go to Schema tab",
        "Enter valid JSON-LD schema",
        "Click Format button",
        "Save the page",
        "Verify save succeeds"
      ]
    }
  }
};
