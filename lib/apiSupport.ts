import { deleteDynamicPagesArticleAndSeo } from "@/app/api/pageManagement.Api";

// API support detection for different operations
export interface ApiSupport {
  delete: boolean;
  bulkDelete: boolean;
  export: boolean;
  create: boolean;
  update: boolean;
}

// Mock API support - in real implementation, this would check actual API endpoints
export const getApiSupport = (): ApiSupport => {
  return {
    delete: true,        // Assume delete is supported
    bulkDelete: false,   // Assume bulk delete is not supported
    export: true,        // Assume export is supported
    create: true,        // Assume create is supported
    update: true         // Assume update is supported
  };
};

// Legacy export for backward compatibility
export const apiSupport = getApiSupport();
