import "server-only";
import type { Metadata } from "next";

// ----- PageSEO fetcher (static pages) -----
export async function getPageSEO(pageKey: string) {
  // তুমি যেভাবে Mongo connect করো (mongoose/native) সেভাবেই করো।
  // এখানে উদাহরণ হিসেবে API route ধরছি:
  const res = await fetch(`${process.env.API_URL}/api/page-seo/${pageKey}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json(); // PageSEO
}

// ----- ToolPage fetcher (dynamic tools) -----
export async function getToolPage(toolSlug: string) {
  const res = await fetch(`${process.env.API_URL}/api/tools/${toolSlug}`, { next: { revalidate: 60 }});
  if (!res.ok) return null;
  return res.json(); // ToolPage
}

// ----- Mapper: DB → Next Metadata -----
export function buildMetadataFromSEO(seo: any, fallback: { title?: string; description?: string; url?: string } = {}): Metadata {
  if (!seo) return { title: fallback.title, description: fallback.description };

  const title = seo.metaTitle ?? fallback.title;
  const description = seo.metaDescription ?? fallback.description;
  const url = seo.canonicalUrl ?? fallback.url;

  // robots
  const robots = seo.noindex ? { index: false, follow: false } : undefined;

  // alternates (hreflang)
  const alternates = seo.alternates ? { languages: seo.alternates } : undefined;

  return {
    title,
    description,
    alternates: { canonical: url, ...alternates },
    robots,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle ?? title,
      description: seo.ogDescription ?? description,
      url,
      type: seo.ogType ?? "website",
      siteName: seo.ogSiteName,
      locale: seo.ogLocale,
      images: seo.ogImageUrl ? [{ url: seo.ogImageUrl }] : undefined,
    },
    twitter: {
      card: seo.twitterCard ?? "summary_large_image",
      site: seo.twitterSite,
      creator: seo.twitterCreator,
      images: seo.twitterImageUrl ? [seo.twitterImageUrl] : (seo.ogImageUrl ? [seo.ogImageUrl] : undefined),
      title,
      description,
    },
  };
}
