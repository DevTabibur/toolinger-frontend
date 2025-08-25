import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api/v1'

// Helper to build dynamic API URLs
function buildUrl(path: string) {
  if (API_BASE_URL.endsWith("/") && path.startsWith("/")) {
    return API_BASE_URL + path.slice(1);
  }
  if (!API_BASE_URL.endsWith("/") && !path.startsWith("/")) {
    return API_BASE_URL + "/" + path;
  }
  return API_BASE_URL + path;
}

// Create a new category
export async function createCategory(data: any) {
  try {
    const res = await axios.post(`${API_BASE_URL}/blog-category`, data);
    return res.data;
  } catch (error: any) {
    console.log("error", error)
    // throw error?.response?.data || error;
  }
}

// Get a category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog-category/${slug}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

// Get a single category by ID
export async function getCategoryDetails(categoryId: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog-category/${categoryId}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

// Get all categories
export async function getAllCategories() {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog-category`);
    return res.data;
  } catch (error: any) {
    console.log("failed to fetched the category", error)
    // throw error?.response?.data || error;
  }
}

// Delete a category by ID
export async function deleteCategory(categoryId: string) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/blog-category/${categoryId}`);
    return res.data;
  } catch (error: any) {
    // throw error?.response?.data || error;
    console.log("delete category failed", error)
  }
}


// Update a category (full update: name, description, images, etc.)
export async function updateCategory(categoryId: string, data: any) {
  try {
    const res = await axios.patch(`${API_BASE_URL}/blog-category/${categoryId}`, data);
    return res.data;
  } catch (error: any) {
    console.log("update category failed", error)
    // throw error?.response?.data || error;
  }
}
