import type { Metadata } from "next"
import TermsClient from "./TermsClient"

export const metadata: Metadata = {
  title: "Terms of Service - Toolinger Usage Agreement",
  description:
    "Read Toolinger's terms of service to understand the rules and guidelines for using our free online tools platform.",
  keywords: "terms of service, usage agreement, toolinger terms, legal agreement, user agreement",
  openGraph: {
    title: "Terms of Service - Toolinger",
    description: "Terms and conditions for using Toolinger's free online tools.",
    url: "https://toolinger.com/terms",
  },
}

export default function TermsPage() {
  return <TermsClient />
}
