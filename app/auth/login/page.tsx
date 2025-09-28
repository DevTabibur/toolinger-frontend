

// Force this page to always render on server (SSR) → always fresh SEO data
export const dynamic = "force-dynamic";
import { Metadata } from "next";
import LoginClientPage from "@/components/pages/LoginClientPage";
import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";

export async function generateMetadata(): Promise<Metadata> {
    const slug = "login";
    const page: any = await getDynamicPagesArticleAndSeoBySlug(slug);
    // Use the direct data object as per your API response
    const seo = page?.data || {};

    // console.log("seo", seo)
    // console.log("page", page)
    // Fallbacks for metaTitle and metaDescription
    const fallbackMetaTitle = 'Login - Toolinger | Access Your Tools Dashboard';
    const fallbackMetaDescription = 'Login to your Toolinger account to access premium tools, manage saved favorites, and enjoy a personalized experience.';

    // Keywords: array or string, optional
    let keywords: string | undefined;
    if (Array.isArray(seo.keywords) && seo.keywords.length) {
        keywords = seo.keywords.join(", ");
    } else if (typeof seo.keywords === "string" && seo.keywords) {
        keywords = seo.keywords;
    }

    // Canonical URL
    const canonicalUrl = typeof seo.canonicalUrl === "string" && seo.canonicalUrl ? seo.canonicalUrl : undefined;

    // Robots: noindex false means index for Google
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
    if (seo.twitterImageUrl && typeof seo.twitterImageUrl === "string" && seo.twitterImageUrl.length > 0) {
        const url = seo.twitterImageUrl.startsWith("http")
            ? seo.twitterImageUrl
            : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.twitterImageUrl}`;
        twitterImages = [url];
    }

    // Build metadata object, using all available SEO data, with fallbacks for metaTitle and metaDescription
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
    if (metadata.openGraph && Object.keys(metadata.openGraph).length === 0) delete metadata.openGraph;
    if (metadata.twitter && Object.keys(metadata.twitter).length === 0) delete metadata.twitter;

    return metadata;
}

export default async function LoginPage() {
    return (
        <>
            <LoginClientPage />
        </>
    );
}
