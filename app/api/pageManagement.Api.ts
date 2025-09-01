import { getFromLocalStorage } from "@/lib/local-storage";
import axios from "axios";


const API_BASE_URL = 'http://localhost:5000/api/v1';



// Get all dynamic pages articles and SEO with pagination, sorting, search, and filters
export async function getAllDynamicPagesArticleAndSeo({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortDir = "desc",
    noindex = "",
} = {}) {
    try {
        const toolingerToken = getFromLocalStorage("toolinger");

        if (!toolingerToken) {
            console.log("No toolinger found in localStorage");
        }

        // Build query params
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (search) params.append("searchTerm", search);
        if (noindex !== "") params.append("noindex", noindex);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortDir) params.append("sortOrder", sortDir);

        const res = await axios.get(
            `${API_BASE_URL}/pages-article-and-seo?${params.toString()}`,
            {
                headers: {
                    Authorization: `${toolingerToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching all dynamic pages articles and SEO", error);
        throw error;
    }
}

// Get dynamic pages article and SEO by slug (requires auth)
export async function getDynamicPagesArticleAndSeoBySlug(slug: string, token?: string) {
    try {
        const res = await axios.get(`${API_BASE_URL}/pages-article-and-seo/slug/${slug}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (error) {
        console.log("Error fetching dynamic page article and SEO by slug", error);
    }
}

// Create dynamic pages article and SEO (requires auth)
export async function createDynamicPagesArticleAndSeo(data: any) {
    try {
        console.log("data", data)
        const toolingerToken = getFromLocalStorage("toolinger")


        if (!toolingerToken) {
            console.log("No toolinger found in localStorage");
        }
        const res = await axios.post(`${API_BASE_URL}/pages-article-and-seo`, data, {
            headers: { Authorization: `${toolingerToken}` }
        });
        return res.data;
    } catch (error) {
        console.log("Error creating dynamic page article and SEO", error);
    }
}

// Get dynamic pages article and SEO by ID (requires auth)
export async function getDynamicPagesArticleAndSeoById(id: string, token?: string) {
    try {
        const res = await axios.get(`${API_BASE_URL}/pages-article-and-seo/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (error) {
        console.log("Error fetching dynamic page article and SEO by ID", error);
    }
}

// Update dynamic pages article and SEO by ID (requires auth)
export async function updateDynamicPagesArticleAndSeo(id: string, data: any) {
    try {
        const toolingerToken = getFromLocalStorage("toolinger")


        if (!toolingerToken) {
            console.log("No toolinger found in localStorage");
        }
        const res = await axios.patch(`${API_BASE_URL}/pages-article-and-seo/${id}`, data, {
            headers: { Authorization: `${toolingerToken}` }
        });
        return res.data;
    } catch (error) {
        console.log("Error updating dynamic page article and SEO", error);
    }
}

// Delete dynamic pages article and SEO by ID and type (requires auth)
export async function deleteDynamicPagesArticleAndSeo(id: string, type: "seo" | "article") {
    try {
        const toolingerToken = getFromLocalStorage("toolinger");

        if (!toolingerToken) {
            console.log("No toolinger found in localStorage");
        }
        const res = await axios.delete(`${API_BASE_URL}/pages-article-and-seo/${id}/${type}`, {
            headers: { Authorization: `${toolingerToken}` }
        });
        return res.data;
    } catch (error) {
        console.log("Error deleting dynamic page article and SEO", error);
    }
}


export async function getAllArticlesOrSeo(type: "article" | "seo") {
    try {
        const toolingerToken = getFromLocalStorage("toolinger");
        if (!toolingerToken) {
            console.log("No toolinger found in localStorage");
            return null;
        }
        const res = await axios.get(`${API_BASE_URL}/pages-article-and-seo/${type}`, {
            headers: { Authorization: `${toolingerToken}` }
        });
        return res.data;
    } catch (error) {
        console.log(`Error fetching all ${type}`, error);
        return null;
    }
}
