import { Metadata } from "next";
import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";

export async function buildPageMetadata(slug: string): Promise<Metadata> {
  const page = await getDynamicPagesArticleAndSeoBySlug(slug);
  const seo = page?.data?.PageSEO || {};

  // fallback values
  const fallbackMetaTitle = "Toolinger - Discover, Save & Use the Best AI Tools";
  const fallbackMetaDescription =
    "Explore Toolinger to find, save, and use the best AI tools for productivity, creativity, and more.";

  const metadata: Metadata = {
    title: seo.metaTitle || fallbackMetaTitle,
    description: seo.metaDescription || fallbackMetaDescription,
    ...(seo.keywords
      ? { keywords: Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords }
      : {}),
    ...(seo.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
    ...(typeof seo.noindex === "boolean"
      ? { robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true } }
      : {}),
    openGraph: {
      ...(seo.ogTitle ? { title: seo.ogTitle } : {}),
      ...(seo.ogDescription ? { description: seo.ogDescription } : {}),
      ...(seo.canonicalUrl ? { url: seo.canonicalUrl } : {}),
      ...(seo.ogType ? { type: seo.ogType } : {}),
      ...(seo.ogSiteName ? { siteName: seo.ogSiteName } : {}),
      ...(seo.ogImageUrl
        ? {
            images: [
              {
                url: seo.ogImageUrl.startsWith("http")
                  ? seo.ogImageUrl
                  : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.ogImageUrl}`,
                width: 1200,
                height: 630,
                alt: seo.ogTitle || "Toolinger",
              },
            ],
          }
        : {}),
      ...(seo.ogLocale ? { locale: seo.ogLocale } : {}),
    },
    twitter: {
      ...(seo.twitterCard ? { card: seo.twitterCard } : {}),
      ...(seo.twitterSite ? { site: seo.twitterSite } : {}),
      ...(seo.twitterCreator ? { creator: seo.twitterCreator } : {}),
      ...(seo.twitterImageUrl
        ? {
            images: [
              seo.twitterImageUrl.startsWith("http")
                ? seo.twitterImageUrl
                : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.twitterImageUrl}`,
            ],
          }
        : {}),
    },
  };

  return metadata;
}
