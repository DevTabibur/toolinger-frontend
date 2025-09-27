## Dynamic Page Management Table Implementation Tasks

Please follow these tasks step by step. After completing each task, **run the build** to ensure there are no issues or errors. Do **not** change any code, design, or logic that is not directly related to the tasks. Do **not** remove any code, including commented code.

---

### Task 1: Table Data Fetching & API Integration

- Use the provided API endpoint:  
  `http://localhost:5000/api/v1/pages-article-and-seo`
- Use the function:
  ```js
  export async function getAllDynamicPagesArticleAndSeo({
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortDir = "desc",
      noindex = "",
      type = "",
      slug = "",
      title = "",
  } = {}) {
      try {
          const toolingerToken = getFromLocalStorage("toolinger");
          if (!toolingerToken) {
              console.warn("⚠️ No toolinger token found in localStorage");
          }
          const params = new URLSearchParams();
          params.append("page", String(page));
          params.append("limit", String(limit));
          if (search) params.append("searchTerm", search);
          if (noindex !== undefined) params.append("noindex", String(noindex));
          if (type) params.append("type", type);
          if (slug) params.append("slug", slug);
          if (title) params.append("title", title);
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
          console.error("❌ Error fetching dynamic pages articles and SEO:", error);
          throw error;
      }
  }
  ```

  My Api example response is

  {
    "statusCode": 200,
    "success": true,
    "data": {
        "meta": {
            "page": 1,
            "limit": 5,
            "total": 11
        },
        "data": [
            {
                "schemas": [],
                "_id": "68d51a095add1f3aefc54073",
                "slug": "/tarmim",
                "title": "tarmim",
                "type": "static",
                "pageContent": "sitemap",
                "metaTitle": "sitemap",
                "metaDescription": "quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ad",
                "keywords": [
                    "online tools, free tools, productivity"
                ],
                "canonicalUrl": "toolinger.com",
                "noindex": false,
                "ogTitle": "this is og title",
                "ogImageUrl": "20250925269-signature_Tabibur_Rahman_Topu.webp",
                "ogType": "website",
                "ogSiteName": "og toolinger",
                "ogLocale": "en_Us",
                "twitterCard": "summary",
                "twitterSite": "This is twitter site",
                "twitterCreator": "Admin",
                "twitterImageUrl": "20250925269-Screenshot_1.webp",
                "changefreq": "daily",
                "priority": 0.5,
                "createdAt": "2025-09-25T10:31:37.417Z",
                "updatedAt": "2025-09-25T10:35:39.464Z",
                "__v": 0,
                "alternates": "online tools, free tools, productivity"
            },
            {
                "_id": "68d4e4ec831520c43daf1e48",
                "slug": "/sitemap",
                "title": "sitemap",
                "type": "static",
                "pageContent": "sitemap",
                "metaTitle": "sitemap",
                "metaDescription": "quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ad",
                "keywords": [
                    "online tools, free tools, productivity"
                ],
                "canonicalUrl": "toolinger.com",
                "noindex": false,
                "ogTitle": "this is og title",
                "ogType": "website",
                "ogSiteName": "og toolinger",
                "ogLocale": "en_Us",
                "twitterCard": "summary",
                "twitterSite": "",
                "twitterCreator": "",
                "twitterImageUrl": "",
                "schemas": [],
                "changefreq": "daily",
                "priority": 0.5,
                "createdAt": "2025-09-25T06:45:00.474Z",
                "updatedAt": "2025-09-25T06:45:00.474Z",
                "__v": 0
            },
            {
                "_id": "68d4e4d5831520c43daf1e45",
                "slug": "/auth/register",
                "title": "register",
                "type": "static",
                "pageContent": "auth/register",
                "metaTitle": "auth/register",
                "metaDescription": "quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ad",
                "keywords": [
                    "online tools, free tools, productivity"
                ],
                "canonicalUrl": "toolinger.com",
                "noindex": false,
                "ogTitle": "this is og title",
                "ogType": "website",
                "ogSiteName": "og toolinger",
                "ogLocale": "en_Us",
                "twitterCard": "summary",
                "twitterSite": "",
                "twitterCreator": "",
                "twitterImageUrl": "",
                "schemas": [],
                "changefreq": "daily",
                "priority": 0.5,
                "createdAt": "2025-09-25T06:44:37.993Z",
                "updatedAt": "2025-09-25T06:44:37.993Z",
                "__v": 0
            },
            {
                "_id": "68d4e4c2831520c43daf1e3f",
                "slug": "/auth/login",
                "title": "login",
                "type": "static",
                "pageContent": "auth/login",
                "metaTitle": "auth/login",
                "metaDescription": "quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ad",
                "keywords": [
                    "online tools, free tools, productivity"
                ],
                "canonicalUrl": "toolinger.com",
                "noindex": false,
                "ogTitle": "this is og title",
                "ogType": "website",
                "ogSiteName": "og toolinger",
                "ogLocale": "en_Us",
                "twitterCard": "summary",
                "twitterSite": "",
                "twitterCreator": "",
                "twitterImageUrl": "",
                "schemas": [],
                "changefreq": "daily",
                "priority": 0.5,
                "createdAt": "2025-09-25T06:44:18.752Z",
                "updatedAt": "2025-09-25T06:44:18.752Z",
                "__v": 0
            },
            {
                "_id": "68d4e4ad831520c43daf1e3c",
                "slug": "/coming-soon",
                "title": "coming-soon",
                "type": "static",
                "pageContent": "coming-soon",
                "metaTitle": "coming-soon",
                "metaDescription": "quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ad",
                "keywords": [
                    "online tools, free tools, productivity"
                ],
                "canonicalUrl": "toolinger.com",
                "noindex": false,
                "ogTitle": "this is og title",
                "ogType": "website",
                "ogSiteName": "og toolinger",
                "ogLocale": "en_Us",
                "twitterCard": "summary",
                "twitterSite": "",
                "twitterCreator": "",
                "twitterImageUrl": "",
                "schemas": [],
                "changefreq": "daily",
                "priority": 0.5,
                "createdAt": "2025-09-25T06:43:57.366Z",
                "updatedAt": "2025-09-25T06:43:57.366Z",
                "__v": 0
            }
        ]
    },
    "message": "Dynamic pages articles with SEO fetched successfully"
}


- The API returns paginated data with meta info and an array of page objects (see the example response above).
- **Implement fetching and displaying this data in your table.**

---

### Task 2: Table Columns

- The table should have the following columns (all dynamic from API data):
  - `title`
  - `slug`
  - `type`
  - `article` (use `pageContent`)
  - `metaTitle`
  - `metaDescription`
  - `keywords`
  - `canonicalUrl`
  - `noindex`
  - `ogTitle`
  - `ogDescription`
  - `ogImageUrl`
  - `ogType`
  - `ogSiteName`
  - `ogLocale`
  - `twitterCard`
  - `twitterSite`
  - `twitterCreator`
  - `twitterImageUrl`
  - `alternates`
  - `changefreq`
  - `priority`
  - `actions` (see next task)

---

### Task 3: Table Actions (Edit Button)

- Each row should have an **Edit** button in the `actions` column.
- When the Edit button is clicked, navigate to:  
  `http://localhost:3000/dashboard/page-management/edit/[slug]`  
  (replace `[slug]` with the actual slug, e.g. `/terms`)
- The edit form is located at `/dashboard/page-management/edit`.
- When navigating to the edit page, fetch the data for the selected slug using:
  ```js
  export async function getDynamicPagesArticleAndSeoBySlug(slug: string) {
      try {
          const res = await fetch(`${API_BASE_URL}/pages-article-and-seo/slug/${slug}`, {
              cache: "no-store"
          });
          return res.json();
      } catch (error) {
          console.error("Error fetching dynamic page article and SEO by slug", error);
          return null;
      }
  }
  ```
- Populate the form with the fetched data.

---

### Task 4: Table Features

- **Pagination:**  
  Use the API's `page` and `limit` parameters to paginate data.
- **Filtering:**  
  Use the API's `type`, `slug`, `title`, and `noindex` parameters for filtering.
- **Sorting:**  
  Use the API's `sortBy` and `sortOrder` parameters for sorting columns.
- **Searching:**  
  Use the API's `searchTerm` parameter for searching.

All these features should work dynamically with the API.

---

### Task 5: Data Creation

- To create a new page/article, use:
  ```js
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
              if (error.response.data.errorMessages && Array.isArray(error.response.data.errorMessages) && error.response.data.errorMessages.length > 0) {
                  throw new Error(error.response.data.errorMessages[0]);
              }
              if (error.response.data.message) {
                  throw new Error(error.response.data.message);
              }
              if (error.response.data.error) {
                  throw new Error(error.response.data.error);
              }
          }
          throw new Error(error.message || "Something went wrong");
      }
  }
  ```
- The creation form is at `/dashboard/page-management/edit`.

---

### Task 6: Build Check

- After each task, **run the build** to ensure there are no errors or issues.

---

**Do not change any code, design, or logic outside of these tasks. Do not remove any code, including commented code.**

---
