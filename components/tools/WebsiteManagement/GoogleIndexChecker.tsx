"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, ExternalLink, Loader2 } from "lucide-react";

interface WebsiteResult {
  id: number;
  domain: string;
}

const MAX_URLS = 2000;

const GoogleIndexChecker = (props: { article?: any; seo?: any }) => {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WebsiteResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

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

      // Create results array - remove https:// and www.
      const websiteResults: WebsiteResult[] = urlList.map((url, index) => ({
        id: index + 1,
        domain: url.replace(/^https?:\/\//, "").replace(/^www\./, ""),
      }));

      setResults(websiteResults);
    } catch (err: any) {
      setError("Failed to process URLs.");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentPageCheck = (domain: string) => {
    const googleSearchUrl = `https://www.google.com/search?q=site:${domain}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  const handleFullWebsiteCheck = (domain: string) => {
    const googleSearchUrl = `https://www.google.com/search?q=site:${domain}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#f8fbfc] dark:bg-gray-900">
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
          <span className="text-foreground font-medium">Google Index Checker</span>
        </nav>
      </div>

      <div className="container mx-auto px-2 py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Main Content */}
          <div className="md:col-span-7 col-span-1 bg-white dark:bg-gray-800 rounded shadow border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                Google Index Checker
              </h1>
              <p className="text-center text-[15px] text-gray-700 dark:text-gray-200 mb-4">
                To use <strong>Google Index Checker</strong>, paste up to <b>2,000 webpages</b> (one URL per line) in the box below and click <b>Check Pages</b>.
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
              {results.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Results ({results.length} website{results.length > 1 ? "s" : ""})
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-sm rounded overflow-hidden">
                      <thead className="bg-yellow-100 dark:bg-yellow-900/30">
                        <tr>
                          <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                            SR No.
                          </th>
                          <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                            Web Page
                          </th>
                          <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                            Current Page
                          </th>
                          <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                            Full Website
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result) => (
                          <tr key={result.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-3 py-3 text-sm text-gray-900 dark:text-gray-100">
                              {result.id}
                            </td>
                            <td className="px-3 py-3 text-sm">
                              <a
                                href={`https://${result.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                              >
                                {result.domain}
                                <ExternalLink size={12} />
                              </a>
                            </td>
                            <td className="px-3 py-3 text-sm">
                              <button
                                onClick={() => handleCurrentPageCheck(result.domain)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline text-sm"
                                type="button"
                              >
                                View Current Page Status
                              </button>
                            </td>
                            <td className="px-3 py-3 text-sm">
                              <button
                                onClick={() => handleFullWebsiteCheck(result.domain)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline text-sm"
                                type="button"
                              >
                                View Full Website Status
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Advertisement Column */}
          <div className="md:col-span-5 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center justify-center min-h-[200px]">
            <div className="text-center text-gray-500 dark:text-gray-400 w-full">
              <p className="text-sm font-medium">ADVERTISEMENT</p>
            </div>
          </div>
        </div>
        {/* Additional Advertisement Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        </div>
      </div>
    </div>
  );
};

export default GoogleIndexChecker;