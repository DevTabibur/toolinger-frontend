// import type { Metadata } from "next"
// import TermsClient from "./TermsClient"

// export const metadata: Metadata = {
//   title: "Terms of Service - Toolinger Usage Agreement",
//   description:
//     "Read Toolinger's terms of service to understand the rules and guidelines for using our free online tools platform.",
//   keywords: "terms of service, usage agreement, toolinger terms, legal agreement, user agreement",
//   openGraph: {
//     title: "Terms of Service - Toolinger",
//     description: "Terms and conditions for using Toolinger's free online tools.",
//     url: "https://toolinger.com/terms",
//   },
// }

// export default function TermsPage() {
//   return <TermsClient />
// }











import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import { getPageSEO, buildMetadataFromSEO } from "@/lib/seo.server";

// ← স্ট্যাটিক `metadata` অবজেক্ট বাদ, বদলে generateMetadata ব্যবহার করো
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("terms"); // pageKey: "terms"
  return buildMetadataFromSEO(seo, {
    title: "Terms of Service",
    description: "Read our terms and conditions.",
    url: "https://toolinger.com/terms",
  });
}

export default function TermsPage() {
  return <TermsClient />;
}
