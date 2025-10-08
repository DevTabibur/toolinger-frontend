
// // Force this page to always render on server (SSR) → always fresh SEO data
// export const dynamic = "force-dynamic";

// import type { Metadata } from "next"
// import AboutClient from "./AboutClient"
// import { getDynamicPagesArticleAndSeoBySlug } from "../api/pageManagement.Api";


// export async function generateMetadata(): Promise<Metadata> {
//     const slug = "about";
//     const page: any = await getDynamicPagesArticleAndSeoBySlug(slug);
//     const seo = page?.data?.PageSEO || {};

//     // Fallbacks only for metaTitle and metaDescription
//     const fallbackMetaTitle = 'About Us - Learn More About Toolinger';
//     const fallbackMetaDescription = 'Discover the story behind Toolinger, our mission to provide 200+ free online tools, and meet our team dedicated to boosting your productivity.';

//     // Keywords: array or string, optional
//     let keywords: string | undefined;
//     if (Array.isArray(seo.keywords) && seo.keywords.length) {
//         keywords = seo.keywords.join(", ");
//     } else if (typeof seo.keywords === "string" && seo.keywords) {
//         keywords = seo.keywords;
//     }

//     // Canonical URL
//     const canonicalUrl = typeof seo.canonicalUrl === "string" && seo.canonicalUrl ? seo.canonicalUrl : undefined;

//     // Robots
//     let robots: Metadata["robots"] | undefined;
//     if (typeof seo.noindex === "boolean") {
//         robots = seo.noindex
//             ? { index: false, follow: false }
//             : { index: true, follow: true };
//     }

//     // Open Graph Image
//     let ogImage: any[] | undefined;
//     if (seo.ogImageUrl && typeof seo.ogImageUrl === "string") {
//         const url = seo.ogImageUrl.startsWith("http")
//             ? seo.ogImageUrl
//             : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.ogImageUrl}`;
//         ogImage = [
//             {
//                 url,
//                 width: 1200,
//                 height: 630,
//                 alt: typeof seo.ogTitle === "string" ? seo.ogTitle : undefined,
//             },
//         ];
//     }

//     // Twitter Image
//     let twitterImages: string[] | undefined;
//     if (seo.twitterImageUrl && typeof seo.twitterImageUrl === "string") {
//         const url = seo.twitterImageUrl.startsWith("http")
//             ? seo.twitterImageUrl
//             : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.twitterImageUrl}`;
//         twitterImages = [url];
//     }

//     // Build metadata object, only including fields if present
//     const metadata: Metadata = {
//         title: typeof seo.metaTitle === "string" && seo.metaTitle ? seo.metaTitle : fallbackMetaTitle,
//         description: typeof seo.metaDescription === "string" && seo.metaDescription ? seo.metaDescription : fallbackMetaDescription,
//         ...(keywords ? { keywords } : {}),
//         ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
//         ...(robots ? { robots } : {}),
//         openGraph: {
//             ...(typeof seo.ogTitle === "string" && seo.ogTitle ? { title: seo.ogTitle } : {}),
//             ...(typeof seo.ogDescription === "string" && seo.ogDescription ? { description: seo.ogDescription } : {}),
//             ...(canonicalUrl ? { url: canonicalUrl } : {}),
//             ...(typeof seo.ogType === "string" && seo.ogType ? { type: seo.ogType } : {}),
//             ...(typeof seo.ogSiteName === "string" && seo.ogSiteName ? { siteName: seo.ogSiteName } : {}),
//             ...(ogImage ? { images: ogImage } : {}),
//             ...(typeof seo.ogLocale === "string" && seo.ogLocale ? { locale: seo.ogLocale } : {}),
//         },
//         twitter: {
//             ...(typeof seo.twitterCard === "string" && seo.twitterCard ? { card: seo.twitterCard } : {}),
//             ...(typeof seo.twitterSite === "string" && seo.twitterSite ? { site: seo.twitterSite } : {}),
//             ...(typeof seo.twitterCreator === "string" && seo.twitterCreator ? { creator: seo.twitterCreator } : {}),
//             ...(twitterImages ? { images: twitterImages } : {}),
//         },
//     };

//     // Remove empty openGraph/twitter objects if all fields are missing
//     if (Object.keys(metadata.openGraph || {}).length === 0) delete metadata.openGraph;
//     if (Object.keys(metadata.twitter || {}).length === 0) delete metadata.twitter;

//     return metadata;
// }




// export default async function AboutPage() {
//     const slugs = "about";
//     const page: any = await getDynamicPagesArticleAndSeoBySlug(slugs as any);
//     return <AboutClient page={page} />
// }












//=================================================NEW DATA
// // Force fresh data always
// export const dynamic = "force-dynamic";

// import { Metadata } from "next";
// import AboutClient from "./AboutClient";
// import { getDynamicPagesArticleAndSeoBySlug } from "../api/pageManagement.Api";

// // একবার API call করে reuse করার জন্য function
// async function getPageData() {
//   const slug = "about";
//   return await getDynamicPagesArticleAndSeoBySlug(slug);
// }

// // ✅ Metadata generate from fetched data
// export async function generateMetadata(): Promise<Metadata> {
//   const page = await getPageData();
//   const seo = page?.data?.PageSEO || {};

//   const fallbackMetaTitle = "About Us - Learn More About Toolinger";
//   const fallbackMetaDescription =
//     "Discover the story behind Toolinger, our mission to provide 200+ free online tools, and meet our team dedicated to boosting your productivity.";

//   const metadata: Metadata = {
//     title: seo.metaTitle || fallbackMetaTitle,
//     description: seo.metaDescription || fallbackMetaDescription,
//     ...(seo.keywords
//       ? { keywords: Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords }
//       : {}),
//     ...(seo.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
//     ...(typeof seo.noindex === "boolean"
//       ? { robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true } }
//       : {}),
//     openGraph: {
//       ...(seo.ogTitle ? { title: seo.ogTitle } : {}),
//       ...(seo.ogDescription ? { description: seo.ogDescription } : {}),
//       ...(seo.canonicalUrl ? { url: seo.canonicalUrl } : {}),
//       ...(seo.ogType ? { type: seo.ogType } : {}),
//       ...(seo.ogSiteName ? { siteName: seo.ogSiteName } : {}),
//       ...(seo.ogImageUrl
//         ? {
//             images: [
//               {
//                 url: seo.ogImageUrl.startsWith("http")
//                   ? seo.ogImageUrl
//                   : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.ogImageUrl}`,
//                 width: 1200,
//                 height: 630,
//                 alt: seo.ogTitle || "Toolinger",
//               },
//             ],
//           }
//         : {}),
//       ...(seo.ogLocale ? { locale: seo.ogLocale } : {}),
//     },
//     twitter: {
//       ...(seo.twitterCard ? { card: seo.twitterCard } : {}),
//       ...(seo.twitterSite ? { site: seo.twitterSite } : {}),
//       ...(seo.twitterCreator ? { creator: seo.twitterCreator } : {}),
//       ...(seo.twitterImageUrl
//         ? {
//             images: [
//               seo.twitterImageUrl.startsWith("http")
//                 ? seo.twitterImageUrl
//                 : `${process.env.NEXT_PUBLIC_IMAGE_API || "https://toolinger.com"}/${seo.twitterImageUrl}`,
//             ],
//           }
//         : {}),
//     },
//   };

//   return metadata;
// }

// // ✅ Main Page Component
// export default async function AboutPage() {
//   const page = await getPageData();

//   return <AboutClient page={page} />;
// }













//================================================================Third Attempt for reusable metaDaa

// Force fresh data if you want
// export const dynamic = "force-dynamic";

import AboutClient from "./AboutClient";
import { getDynamicPagesArticleAndSeoBySlug } from "../api/pageManagement.Api";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata() {
    return buildPageMetadata("about");
}

export default async function AboutPage() {
    const page = await getDynamicPagesArticleAndSeoBySlug("about");
    return <AboutClient page={page} />;
}
