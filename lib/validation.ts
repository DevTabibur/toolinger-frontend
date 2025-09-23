import * as Yup from "yup";

// SEO Validation Schemas
export const seoValidationSchema = Yup.object({
  metaTitle: Yup.string()
    .min(10, "Meta title must be at least 10 characters")
    .max(60, "Meta title must be no more than 60 characters")
    .required("Meta title is required"),
  
  metaDescription: Yup.string()
    .min(30, "Meta description must be at least 30 characters")
    .max(160, "Meta description must be no more than 160 characters")
    .required("Meta description is required"),
  
  keywords: Yup.string()
    .required("Keywords are required")
    .test("keywords-format", "Keywords should be comma-separated", (value) => {
      if (!value) return true;
      return value.split(",").every(keyword => keyword.trim().length > 0);
    }),
  
  canonicalUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Canonical URL is required")
    .test("canonical-format", "Canonical URL must be absolute", (value) => {
      if (!value) return true;
      return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
    }),
  
  ogTitle: Yup.string()
    .max(60, "OG title should be no more than 60 characters")
    .required("OG title is required"),
  
  ogDescription: Yup.string()
    .max(160, "OG description should be no more than 160 characters")
    .required("OG description is required"),
  
  twitterTitle: Yup.string()
    .max(60, "Twitter title should be no more than 60 characters")
    .required("Twitter title is required"),
  
  twitterDescription: Yup.string()
    .max(160, "Twitter description should be no more than 160 characters")
    .required("Twitter description is required"),
  
  changefreq: Yup.string()
    .oneOf(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"], "Invalid change frequency")
    .required("Change frequency is required"),
  
  priority: Yup.number()
    .min(0, "Priority must be at least 0")
    .max(1, "Priority must be no more than 1")
    .required("Priority is required"),
  
  schema: Yup.string()
    .test("valid-json", "Schema must be valid JSON", function(value) {
      if (!value) return true; // Allow empty
      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return this.createError({
          message: `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
          path: this.path
        });
      }
    })
    .test("valid-schema", "Schema must be valid JSON-LD", function(value) {
      if (!value) return true; // Allow empty
      try {
        const parsed = JSON.parse(value);
        // Basic JSON-LD validation
        if (typeof parsed === "object" && parsed !== null) {
          if (parsed["@context"] || parsed["@type"]) {
            return true;
          }
          return this.createError({
            message: "Schema should contain @context or @type for JSON-LD",
            path: this.path
          });
        }
        return this.createError({
          message: "Schema must be a valid JSON object",
          path: this.path
        });
      } catch (error) {
        return this.createError({
          message: `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
          path: this.path
        });
      }
    })
});

// Content Validation Schema
export const contentValidationSchema = Yup.object({
  title: Yup.string()
    .min(1, "Title is required")
    .max(200, "Title must be no more than 200 characters")
    .required("Title is required"),
  
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required")
    .test("content-html", "Content must contain valid HTML", (value) => {
      if (!value) return true;
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(value, "text/html");
        return doc.documentElement.querySelector("parsererror") === null;
      } catch {
        return true; // If parsing fails, assume it's valid
      }
    })
});

// Combined validation schema
export const pageValidationSchema = contentValidationSchema.concat(seoValidationSchema);

// Validation helper functions
export const validateMetaTitle = (title: string): { isValid: boolean; message?: string } => {
  if (!title) return { isValid: false, message: "Meta title is required" };
  if (title.length < 10) return { isValid: false, message: "Meta title must be at least 10 characters" };
  if (title.length > 60) return { isValid: false, message: "Meta title must be no more than 60 characters" };
  return { isValid: true };
};

export const validateMetaDescription = (description: string): { isValid: boolean; message?: string } => {
  if (!description) return { isValid: false, message: "Meta description is required" };
  if (description.length < 30) return { isValid: false, message: "Meta description must be at least 30 characters" };
  if (description.length > 160) return { isValid: false, message: "Meta description must be no more than 160 characters" };
  return { isValid: true };
};

export const validateCanonicalUrl = (url: string): { isValid: boolean; message?: string } => {
  if (!url) return { isValid: false, message: "Canonical URL is required" };
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    // Check if it's a relative URL
    if (url.startsWith("/")) {
      return { isValid: true };
    }
    return { isValid: false, message: "Canonical URL must be a valid URL" };
  }
};

export const validateJsonSchema = (schema: string): { isValid: boolean; message?: string; formatted?: string } => {
  if (!schema) return { isValid: true };
  
  try {
    const parsed = JSON.parse(schema);
    const formatted = JSON.stringify(parsed, null, 2);
    return { isValid: true, formatted };
  } catch (error) {
    return { 
      isValid: false, 
      message: `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}` 
    };
  }
};

// Character count helpers
export const getCharacterCount = (text: string): number => {
  return text.length;
};

export const getCharacterCountStatus = (text: string, min: number, max: number): "good" | "warning" | "error" => {
  const count = getCharacterCount(text);
  if (count < min) return "error";
  if (count > max) return "error";
  if (count > max * 0.9) return "warning";
  return "good";
};
