import { getFromLocalStorage } from "@/lib/local-storage";
import axios from "axios";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;




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
// export async function getDynamicPagesArticleAndSeoBySlug(slug: string, token?: string) {
//     try {
//         const res = await axios.get(`${API_BASE_URL}/pages-article-and-seo/slug/${slug}`, {
//             headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         return res.data;
//     } catch (error) {
//         console.log("Error fetching dynamic page article and SEO by slug", error);
//     }
// }

export async function getDynamicPagesArticleAndSeoBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/pages-article-and-seo/slug/${slug}`, {
            cache: "no-store" //  Always fresh data (no cache)
        });
        return res.json();
    } catch (error) {
        console.error("Error fetching dynamic page article and SEO by slug", error);
        return null;
    }
}

// Create dynamic pages article and SEO (requires auth)
export async function createDynamicPagesArticleAndSeo(data: any) {
    try {
        console.log("data", data)

        const toolingerToken = getFromLocalStorage("toolinger");
        const res = await axios.post(
            `${API_BASE_URL}/pages-article-and-seo`,
            data,
            {
                headers: {
                    Authorization: `${toolingerToken}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return res.data;
    } catch (error: any) {
        console.log("Error creating dynamic page article and SEO", error);

        if (error.response && error.response.data) {
            // Check for errorMessages array first
            if (error.response.data.errorMessages && Array.isArray(error.response.data.errorMessages) && error.response.data.errorMessages.length > 0) {
                throw new Error(error.response.data.errorMessages[0]);
            }
            // Fallback to message property
            if (error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            // Fallback to error property
            if (error.response.data.error) {
                throw new Error(error.response.data.error);
            }
        }

        throw new Error(error.message || "Something went wrong");
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
