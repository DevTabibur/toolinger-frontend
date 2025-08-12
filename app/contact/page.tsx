import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
    title: "Contact Us - Get in Touch with Toolinger",
    description:
        "Have questions or feedback? Contact the Toolinger team. We're here to help with any questions about our free online tools.",
    keywords: "contact toolinger, support, feedback, help, customer service, get in touch",
    openGraph: {
        title: "Contact Toolinger - We're Here to Help",
        description: "Get in touch with our team for support, feedback, or questions about our tools.",
        url: "https://toolinger.com/contact",
    },
}

export default function ContactPage() {
    return <ContactClient />
}
