import "server-only";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches the article and SEO data for a given slug.
 * 
 * Note: Using `cache: "no-store"` in the fetch options only affects how Next.js and the server
 * handle caching for this API call. It does NOT set any HTTP headers like `Cache-Control: no-store`
 * on the response sent to the browser or crawlers such as Googlebot.
 * 
 * Therefore, using `no-store` here will NOT cause any issues for Google crawling or indexing your pages.
 * Googlebot will see the rendered HTML as usual, and unless you explicitly set HTTP headers
 * like `Cache-Control: no-store` or `noindex` in your API or page responses, Google will crawl and index as normal.
 */
export async function getPageArticleSeoBySlug(slug: string) {
    const res = await fetch(`${API_BASE_URL}/pages-article-and-seo/slug/${slug}`, {
        cache: "no-store", // Only disables Next.js/server cache for this request, not browser or Googlebot cache
    });
    return res.json();
}




