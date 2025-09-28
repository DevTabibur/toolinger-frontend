import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdBanner } from "@/components/ad-banner";
import { CategoryToolsGrid } from "@/components/category-tools-grid";
import { SearchBar } from "@/components/search-bar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GlobalSearch } from "@/components/global-search";
import { categoriesAndTools } from "@/lib/categories";
import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";

type Props = {
  params: { slug: string };
};




export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const page: any = await getDynamicPagesArticleAndSeoBySlug(slug);
  // Use the direct data object as per your API response
  const seo = page?.data || {};
  // console.log("slug", slug)

  // console.log("seo", seo)
  // console.log("page", page)
  // Fallbacks for metaTitle and metaDescription
  const fallbackMetaTitle = 'Category - Toolinger | Discover Top Tools by Category';
  const fallbackMetaDescription = 'Browse Toolinger categories to find the best productivity tools, software, and resources tailored to your needs. Explore, compare, and choose the right tools for every category.';

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


export default function CategoryPage({ params }: Props) {
  const category =
    categoriesAndTools[params?.slug as keyof typeof categoriesAndTools];

  if (!category) {
    notFound();
  }

  // Convert the dynamic color string to Tailwind classes safely
  // category.color is e.g. "from-red-500 to-blue-500"
  // We need to ensure these classes are always present in the final build (for Tailwind JIT)
  // So, we can map all possible color classes in a hidden element, or use a whitelist comment.
  // But for now, we can just use the string as className, as long as Tailwind is configured to scan this file.

  // Remove the console.log, as it's not needed for color rendering
  // console.log("category.color", category.color);

  return (
    <div className="min-h-screen bg-background">

      <Header />

      {/* Category Header */}
      <section
        // Use dynamic color classes for gradient background
        className={`bg-gradient-to-r ${category.color} text-white py-12`}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            {category.description}
          </p>
          <div
            className="mt-6 block w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
            style={{ minWidth: 0 }}
          >
            <GlobalSearch placeholder={`Search ${category.name.toLowerCase()}...`} />
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner size="leaderboard" />
      </div>

      {/* Tools Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
              <CategoryToolsGrid
                tools={category?.tools}
                categorySlug={params?.slug}
                categoryName={category?.name}
                component={category?.component}
              />
            </div>

            {/* Sidebar Ad */}
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <AdBanner size="sidebar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner size="banner" />
      </div>

      <Footer />
    </div>
  );
}

// Ensure Tailwind includes all possible dynamic color classes in the build
// prettier-ignore
const _tailwindColorSafelist = [
  "from-blue-500", "to-cyan-500",
  "from-violet-500", "to-purple-500",
  "from-rose-500", "to-pink-500",
  "from-red-500", "to-blue-500",
  "from-purple-500", "to-pink-500",
  "from-yellow-500", "to-orange-500",
  "from-cyan-500", "to-blue-500",
];

export async function generateStaticParams() {
  return Object.keys(categoriesAndTools).map((slug) => ({
    slug,
  }));
}
