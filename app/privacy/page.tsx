import type { Metadata } from "next"
import PrivacyClient from "./PrivacyClient"

export const metadata: Metadata = {
    title: "Privacy Policy - How Toolinger Protects Your Data",
    description:
        "Learn about Toolinger's privacy policy, how we collect, use, and protect your personal information when using our free online tools.",
    keywords: "privacy policy, data protection, user privacy, toolinger privacy, data security",
    openGraph: {
        title: "Privacy Policy - Toolinger",
        description: "Learn how we protect your privacy and data when using our tools.",
        url: "https://toolinger.com/privacy",
    },
}

export default function PrivacyPage() {
    return <PrivacyClient />
}
