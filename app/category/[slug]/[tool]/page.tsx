import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getPageArticleSeoBySlug } from "@/lib/pageMgmt.server";
import ToolClient from "@/components/pages/ToolClient";
import { Metadata } from "next";
import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";

// ----------------- SEO (generateMetadata) -----------------


export async function generateMetadata(
  { params }: { params: { slug: string; tool: string } }
): Promise<Metadata> {
  // Use the dynamic route param for the tool slug
  const slug = params.tool;
  // Optionally log the slug for debugging
  // console.log("slug", slug);
  const page: any = await getDynamicPagesArticleAndSeoBySlug(slug);
  const seo = page?.data?.PageSEO || {};

  // Fallbacks for metaTitle and metaDescription for all tools
  const fallbackMetaTitle = 'Toolinger - Free Online Tools for Developers, Marketers & Everyone';
  const fallbackMetaDescription = 'Discover Toolinger’s collection of free online tools for developers, marketers, students, and professionals. Instantly use calculators, converters, text utilities, SEO tools, and more—all in one place.';

  // Keywords: array or string, optional
  let keywords: string | undefined;
  if (Array.isArray(seo.keywords) && seo.keywords.length) {
    keywords = seo.keywords.join(", ");
  } else if (typeof seo.keywords === "string" && seo.keywords) {
    keywords = seo.keywords;
  }

  // Canonical URL
  const canonicalUrl = typeof seo.canonicalUrl === "string" && seo.canonicalUrl ? seo.canonicalUrl : undefined;

  // Robots
  let robots: Metadata["robots"] | undefined;
  if (typeof seo.noindex === "boolean") {
    robots = seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true };
  }

  // Open Graph Image
  let ogImage: any[] | undefined;
  if (seo.ogImageUrl && typeof seo.ogImageUrl === "string") {
    const url = seo.ogImageUrl.startsWith("http")
      ? seo.ogImageUrl
      : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.ogImageUrl}`;
    ogImage = [
      {
        url,
        width: 1200,
        height: 630,
        alt: typeof seo.ogTitle === "string" ? seo.ogTitle : undefined,
      },
    ];
  }

  // Twitter Image
  let twitterImages: string[] | undefined;
  if (seo.twitterImageUrl && typeof seo.twitterImageUrl === "string") {
    const url = seo.twitterImageUrl.startsWith("http")
      ? seo.twitterImageUrl
      : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.twitterImageUrl}`;
    twitterImages = [url];
  }

  // Build metadata object, only including fields if present
  const metadata: Metadata = {
    title: typeof seo.metaTitle === "string" && seo.metaTitle ? seo.metaTitle : fallbackMetaTitle,
    description: typeof seo.metaDescription === "string" && seo.metaDescription ? seo.metaDescription : fallbackMetaDescription,
    ...(keywords ? { keywords } : {}),
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    ...(robots ? { robots } : {}),
    openGraph: {
      ...(typeof seo.ogTitle === "string" && seo.ogTitle ? { title: seo.ogTitle } : {}),
      ...(typeof seo.ogDescription === "string" && seo.ogDescription ? { description: seo.ogDescription } : {}),
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(typeof seo.ogType === "string" && seo.ogType ? { type: seo.ogType } : {}),
      ...(typeof seo.ogSiteName === "string" && seo.ogSiteName ? { siteName: seo.ogSiteName } : {}),
      ...(ogImage ? { images: ogImage } : {}),
      ...(typeof seo.ogLocale === "string" && seo.ogLocale ? { locale: seo.ogLocale } : {}),
    },
    twitter: {
      ...(typeof seo.twitterCard === "string" && seo.twitterCard ? { card: seo.twitterCard } : {}),
      ...(typeof seo.twitterSite === "string" && seo.twitterSite ? { site: seo.twitterSite } : {}),
      ...(typeof seo.twitterCreator === "string" && seo.twitterCreator ? { creator: seo.twitterCreator } : {}),
      ...(twitterImages ? { images: twitterImages } : {}),
    },
  };

  // Remove empty openGraph/twitter objects if all fields are missing
  if (Object.keys(metadata.openGraph || {}).length === 0) delete metadata.openGraph;
  if (Object.keys(metadata.twitter || {}).length === 0) delete metadata.twitter;

  return metadata;
}



//--------------------------------------------------------------



export default async function ToolDetailsPage({
  params,
}: {
  params: { slug: string; tool: string };
}) {


  const data = await getPageArticleSeoBySlug(params.tool);
  const articleHtml: string | undefined = data?.data?.PageArticle?.content;
  const seo = data?.data?.PageSEO
  // const schemas: any[] = data?.PageSEO?.schemas || [];


  return (
    <div className="min-h-screen bg-background">

      <Header />
      <div className="py-12">
        <ToolClient article={articleHtml} seo={seo} tool={params.tool} />
      </div>
      <Footer />

    </div>

  );
}
