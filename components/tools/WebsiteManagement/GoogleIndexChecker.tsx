"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, ExternalLink, Loader2 } from "lucide-react";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";
import ArticleRenderer from "@/utils/ArticleRenderer";

interface WebsiteResult {
  id: number;
  domain: string;
  fullDomain: string;
  original: string;
}

const otherTools = [
  {
    id: "google-malware-checker",
    name: "Google Malware Checker",
    description:
      "Scan your website for malware and security threats using Google's safe browsing technology.",
    category: "Website Management",
    slug: "google-malware-checker",
    categorySlug: "website-management",
    icon: "🦠",
  },
  {
    id: "website-links-count-checker",
    name: "Website Links Count Checker",
    description: "Count the number of links on a webpage",
    category: "Website Management",
    slug: "links-count-checker",
    categorySlug: "website-management",
    icon: "🔗",
  },
  {
    id: "cms-checker",
    name: "CMS Checker",
    description: "Detect what CMS a website is using",
    category: "Website Management",
    slug: "cms-checker",
    categorySlug: "website-management",
    icon: "🔍",
  },
];

const MAX_URLS = 2000;

const getFullDomain = (url: string) => {
  // Remove protocol and www, then take only the domain part (before first slash)
  let clean = url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  return clean.split("/")[0];
};

const getCurrentPageUrl = (url: string) => {
  // Always add https:// if not present for the link
  if (!/^https?:\/\//.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const GoogleIndexChecker = (props: { article?: any; seo?: any }) => {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WebsiteResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Track last clicked: {type: "current"|"full", id: number}
  const [active, setActive] = useState<{
    type: "current" | "full";
    id: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    // Simulate a 0.5 second delay before showing results
    setTimeout(() => {
      try {
        // Parse URLs from textarea
        const urlList = urls
          .split("\n")
          .map((url) => url.trim())
          .filter((url) => url.length > 0)
          .slice(0, MAX_URLS);

        if (urlList.length === 0) {
          setError("Please enter at least one URL.");
          setLoading(false);
          return;
        }

        // Create results array - keep original, domain, and fullDomain
        const websiteResults: WebsiteResult[] = urlList.map((url, index) => ({
          id: index + 1,
          original: url,
          domain: url.replace(/^https?:\/\//, "").replace(/^www\./, ""),
          fullDomain: getFullDomain(url),
        }));

        setResults(websiteResults);
      } catch (err: any) {
        setError("Failed to process URLs.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleCurrentPageCheck = (result: WebsiteResult) => {
    setActive({ type: "current", id: result.id });
    // Always use https:// for current page
    const url = getCurrentPageUrl(result.original);
    const googleSearchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(
      url
    )}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  const handleFullWebsiteCheck = (result: WebsiteResult) => {
    setActive({ type: "full", id: result.id });
    // Only use the domain part for full website
    const googleSearchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(
      result.fullDomain
    )}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  // Theme-aware active/inactive button classes for underline effect
  const activeBtn =
    "font-semibold underline underline-offset-4 decoration-2 text-blue-700 dark:text-blue-300";
  const inactiveBtn =
    "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300  text-sm";

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary flex items-center"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link
            href="/category/website-management"
            className="text-muted-foreground hover:text-primary"
          >
            Website Management
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">
            Google Index Checker
          </span>
        </nav>
      </div>

      <div className="container mx-auto px-2 py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Main Content */}
          <div className="md:col-span-7 col-span-1 ">
            <div className="border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                Google Index Checker
              </h1>
              <p className="text-center text-[15px] text-gray-700 dark:text-gray-200 mb-4">
                To use <strong>Google Index Checker</strong>, paste up to{" "}
                <b>2,000 webpages</b> (one URL per line) in the box below and
                click <b>Check Pages</b>.
              </p>
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="urls"
                  className="block text-xs text-gray-600 dark:text-gray-400 mb-1"
                >
                  Paste up to 2,000 webpages to view results (one URL per line)
                </label>
                <div className="relative mb-4">
                  {/* Removed the green left border */}
                  <textarea
                    id="urls"
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                    placeholder={`abc.com
def.com
ghi.com`}
                    required
                    rows={8}
                    className="w-full pl-3 pr-3 py-2 border border-cyan-100 rounded text-sm outline-none bg-blue-50/30 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-y"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-green-400 disabled:to-green-400 text-white px-6 py-2 rounded text-sm font-medium min-w-[120px] transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      Checking...
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Check Pages"
                  )}
                </button>
              </form>
              {error && (
                <div className="mb-4 mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm">
                  {error}
                </div>
              )}
            </div>
            {results.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Results ({results.length} website
                  {results.length > 1 ? "s" : ""})
                </h2>
                <div className="overflow-x-auto border border-dashed">
                  <table className="w-full  bg-white dark:bg-gray-800 shadow-sm rounded overflow-hidden border border-dashed border-gray-300 dark:border-gray-600">
                    <thead className="bg-green-100 dark:bg-green-900/30">
                      <tr className="border border-dashed border-gray-300 dark:border-gray-600">
                        <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border border-dashed border-gray-300 dark:border-gray-600">
                          SR No.
                        </th>
                        <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border border-dashed border-gray-300 dark:border-gray-600">
                          Web Page
                        </th>
                        <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border border-dashed border-gray-300 dark:border-gray-600">
                          Current Page
                        </th>
                        <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border border-dashed border-gray-300 dark:border-gray-600">
                          Full URL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border border-dashed border-gray-300 dark:border-gray-600">
                      {results.map((result) => (
                        <tr
                          key={result.id}
                          className="border border-dashed border-gray-300 dark:border-gray-600"
                        >
                          <td className="px-3 text-center py-3 text-sm text-gray-900 dark:text-gray-100 border border-dashed border-gray-300 dark:border-gray-600">
                            {result.id}
                          </td>
                          <td className="px-3 py-3 text-sm border border-dashed border-gray-300 dark:border-gray-600 w-96 font-bold">
                            <Link
                              href={getCurrentPageUrl(result.original)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                            >
                              {getCurrentPageUrl(result.original).replace(
                                /^https?:\/\//,
                                ""
                              )}
                              <ExternalLink size={20} />
                            </Link>
                          </td>
                          <td className="px-3 py-3 text-sm border border-dashed border-gray-300 dark:border-gray-600">
                            <button
                              onClick={() => handleCurrentPageCheck(result)}
                              className={
                                active?.type === "current" &&
                                active?.id === result.id
                                  ? `${activeBtn} text-base`
                                  : inactiveBtn
                              }
                              type="button"
                            >
                              View Current Page Status
                            </button>
                          </td>
                          <td className="px-3 py-3 text-sm border border-dashed border-gray-300 dark:border-gray-600">
                            <button
                              onClick={() => handleFullWebsiteCheck(result)}
                              className={
                                active?.type === "full" &&
                                active?.id === result.id
                                  ? `${activeBtn} text-base`
                                  : inactiveBtn
                              }
                              type="button"
                            >
                              View Full URL Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <ArticleRenderer file="google_index_checker.html" />
          </div>
          {/* Advertisement Column */}
          <div className="md:col-span-5 col-span-1">
            <ReleavantToolsSidebar
              title="Popular Tools"
              tools={popularTools as any}
            />
            <ReleavantToolsSidebar
              title="Other Tools"
              tools={otherTools as any}
            />
          </div>
        </div>
        {/* Additional Advertisement Sections */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center min-h-[120px]">
            <div className="text-center text-gray-500 dark:text-gray-400 w-full">
              <p className="text-sm font-medium">ADVERTISEMENT</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center min-h-[120px]">
            <div className="text-center text-gray-500 dark:text-gray-400 w-full">
              <p className="text-sm font-medium">ADVERTISEMENT</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default GoogleIndexChecker;
