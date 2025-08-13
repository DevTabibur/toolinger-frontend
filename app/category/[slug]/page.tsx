import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdBanner } from "@/components/ad-banner";
import { CategoryToolsGrid } from "@/components/category-tools-grid";
import { SearchBar } from "@/components/search-bar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GlobalSearch } from "@/components/global-search";
import { categoriesAndTools } from "@/lib/categories";

type CategoryPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category =
    categoriesAndTools[params.slug as keyof typeof categoriesAndTools];
  console.log("category", category);

  if (!category) {
    return {
      title: "Category Not Found | Toolinger",
    };
  }

  return {
    title: `${category.name} - Free Online Tools | Toolinger`,
    description: `${category.description}. Access ${category.tools.length
      }+ free ${category.name.toLowerCase()} for productivity and efficiency.`,
    keywords: `${category.name.toLowerCase()}, online tools, free tools, ${category.tools
      .map((tool: any) => tool.name.toLowerCase())
      .join(", ")}`,
    openGraph: {
      title: `${category.name} - Free Online Tools | Toolinger`,
      description: category.description,
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
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
