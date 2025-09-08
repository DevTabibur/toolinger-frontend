
import { getBlogBySlug } from "@/app/api/Blog.Api";
import BlogDetails from "@/components/BlogDetailsPage";

type Props = {
  params: { slug: string };
};

/**
 * Note:
 * Omitting the openGraph property in the returned metadata object does NOT affect Google indexing your page.
 * Google primarily uses standard meta tags (title, description, keywords, etc.) for indexing and ranking.
 * The openGraph property is mainly for social media platforms (like Facebook, Twitter, LinkedIn) to generate rich link previews.
 * If you want your blog posts to look good when shared on social media, you should include openGraph.
 * For Google SEO and indexing, it's not required.
 */

export async function generateMetadata({ params }: Props) {
  const blogRes = await getBlogBySlug(params.slug);

  if (blogRes?.statusCode !== 200 || !blogRes.data) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  const blog = blogRes.data;

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    keywords:
      Array.isArray(blog.seoKeywords) && blog.seoKeywords.length > 0
        ? blog.seoKeywords.filter((k: string) => k && k !== "undefined")
        : [],
    // openGraph is commented out below. This does NOT affect Google indexing.
    // If you want rich previews on social media, uncomment and configure as needed.
    // openGraph: {
    //   title: blog.seoTitle || blog.title,
    //   description: blog.seoDescription || blog.excerpt,
    //   images: blog.blogFeaturedImage
    //     ? [`${process.env.NEXT_PUBLIC_IMAGE_API}/${blog.blogFeaturedImage}`]
    //     : [],
    // },
  };
}

export default function BlogDetailPage({ params }: Props) {
  const { slug } = params;

  return (
    <>
      <BlogDetails slug={slug} />
    </>
  );
}
