import axios from "axios";
import { getFromLocalStorage } from "@/lib/local-storage";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = "http://localhost:5000/api/v1";

// Create a new blog post
export async function createBlogPost(data: any) {
  try {
    const res = await axios.post(`${API_BASE_URL}/blog`, data, {
      headers: {
        Authorization: `${getFromLocalStorage("toolinger")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error creating blog post", error);
  }
}

// Get a blog post by slug
export async function getBlogBySlug(slug: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog/slug/${slug}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching blog by slug", error);
  }
}

// Get blogs by categories except for a specific blog ID
export async function getBlogsByCategories(blogId: string, categories: string[]) {
  try {
    const res = await axios.post(`${API_BASE_URL}/blog/categories/${blogId}`, { categories });
    return res.data;
  } catch (error) {
    console.log("Error fetching blogs by categories", error);
  }
}

// Get a single blog post by ID
export async function getBlogDetails(blogId: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog/${blogId}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching blog details", error);
  }
}

// Get all blog posts
export async function getAllBlogs() {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog`);
    return res.data;
  } catch (error) {
    console.log("Error fetching all blogs", error);
  }
}

// Delete a blog post by ID
export async function deleteBlog(blogId: string) {
  try {
    const toolingerToken = getFromLocalStorage("toolinger");
    const res = await axios.delete(`${API_BASE_URL}/blog/${blogId}`, {
      headers: {
        Authorization: `${toolingerToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error deleting blog", error);
  }
}

// Update SEO fields for a blog post
export async function updateBlogSEO(blogId: string, seoData: any) {
  try {
    const toolingerToken = getFromLocalStorage("toolinger");
    const res = await axios.patch(`${API_BASE_URL}/blog/${blogId}/seo`, seoData, {
      headers: {
        Authorization: `${toolingerToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error updating blog SEO", error);
  }
}

// Update a blog post (full update: title, content, images, etc.)
export async function updateBlogPost(blogId: string, data: any) {
  try {
    const toolingerToken = getFromLocalStorage("toolinger");
    const res = await axios.patch(`${API_BASE_URL}/blog/${blogId}`, data, {
      headers: {
        Authorization: `${toolingerToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error updating blog post", error);
  }
}

// Get SEO analytics for a blog post
export async function getBlogSEOAnalytics(blogId: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/blog/${blogId}/seo-analytics`);
    return res.data;
  } catch (error) {
    console.log("Error fetching blog SEO analytics", error);
  }
}
