"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { motion } from "framer-motion"
import { Shield, Eye, Lock, UserCheck } from "lucide-react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

export default function PrivacyClient() {
    const privacyPrinciples = [
        {
            icon: Shield,
            title: "Data Protection",
            description: "We implement industry-standard security measures to protect your information.",
        },
        {
            icon: Eye,
            title: "Transparency",
            description: "We're clear about what data we collect and how we use it.",
        },
        {
            icon: Lock,
            title: "Secure Processing",
            description: "All data processing happens securely with encryption in transit and at rest.",
        },
        {
            icon: UserCheck,
            title: "User Control",
            description: "You have full control over your data and can request deletion at any time.",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <motion.section
                className="gradient-bg text-white py-16 md:py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Your privacy is important to us. Learn how we collect, use, and protect your information.
                    </motion.p>
                    <motion.p
                        className="text-sm opacity-75"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Last updated: December 8, 2025
                    </motion.p>
                </div>
            </motion.section>

            {/* Ad Banner */}
            <div className="container mx-auto px-4 py-8">
                <AdBanner size="leaderboard" />
            </div>

            {/* Privacy Principles */}
            <motion.section
                className="py-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Privacy Principles</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            These principles guide how we handle your personal information
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {privacyPrinciples.map((principle, index) => {
                            const IconComponent = principle.icon
                            return (
                                <motion.div
                                    key={principle.title}
                                    className="bg-card border rounded-xl p-6 text-center"
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(0, 92, 130, 0.1)",
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                                    <p className="text-muted-foreground text-sm">{principle.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </motion.section>

            {/* Privacy Policy Content */}
            <motion.section
                className="py-16 bg-muted/30"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Table of Contents */}
                            <motion.div className="lg:col-span-1" variants={itemVariants}>
                                <div className="bg-card border rounded-xl p-6 sticky top-8">
                                    <h3 className="font-bold mb-4">Table of Contents</h3>
                                    <nav className="space-y-2 text-sm">
                                        <a
                                            href="#information-we-collect"
                                            className="block text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Information We Collect
                                        </a>
                                        <a href="#how-we-use" className="block text-muted-foreground hover:text-primary transition-colors">
                                            How We Use Information
                                        </a>
                                        <a
                                            href="#data-sharing"
                                            className="block text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Data Sharing
                                        </a>
                                        <a
                                            href="#data-security"
                                            className="block text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Data Security
                                        </a>
                                        <a href="#your-rights" className="block text-muted-foreground hover:text-primary transition-colors">
                                            Your Rights
                                        </a>
                                        <a href="#cookies" className="block text-muted-foreground hover:text-primary transition-colors">
                                            Cookies
                                        </a>
                                        <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                                            Contact Us
                                        </a>
                                    </nav>
                                </div>
                            </motion.div>

                            {/* Content */}
                            <motion.div className="lg:col-span-3 space-y-8" variants={itemVariants}>
                                <div className="bg-card border rounded-xl p-8">
                                    <div className="prose prose-gray max-w-none">
                                        <section id="information-we-collect">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">1. Information We Collect</h2>
                                            <p className="mb-4">We collect information in the following ways:</p>
                                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                                <li>
                                                    <strong>Information you provide:</strong> When you use our tools, contact us, or subscribe to
                                                    updates
                                                </li>
                                                <li>
                                                    <strong>Automatically collected information:</strong> Usage data, device information, and
                                                    analytics
                                                </li>
                                                <li>
                                                    <strong>Cookies and tracking:</strong> To improve your experience and analyze site usage
                                                </li>
                                            </ul>
                                        </section>

                                        <section id="how-we-use">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">2. How We Use Your Information</h2>
                                            <p className="mb-4">We use your information to:</p>
                                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                                <li>Provide and improve our tools and services</li>
                                                <li>Respond to your inquiries and provide customer support</li>
                                                <li>Send you updates about new tools and features (with your consent)</li>
                                                <li>Analyze usage patterns to improve user experience</li>
                                                <li>Ensure security and prevent fraud</li>
                                            </ul>
                                        </section>

                                        <section id="data-sharing">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">3. Data Sharing and Disclosure</h2>
                                            <p className="mb-4">
                                                We do not sell your personal information. We may share information in these limited
                                                circumstances:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                                <li>With your explicit consent</li>
                                                <li>To comply with legal obligations</li>
                                                <li>To protect our rights and prevent fraud</li>
                                                <li>With trusted service providers who help us operate our platform</li>
                                            </ul>
                                        </section>

                                        <section id="data-security">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">4. Data Security</h2>
                                            <p className="mb-6">
                                                We implement appropriate technical and organizational measures to protect your personal
                                                information against unauthorized access, alteration, disclosure, or destruction. This includes
                                                encryption, secure servers, and regular security audits.
                                            </p>
                                        </section>

                                        <section id="your-rights">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">5. Your Rights</h2>
                                            <p className="mb-4">You have the right to:</p>
                                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                                <li>Access your personal information</li>
                                                <li>Correct inaccurate information</li>
                                                <li>Delete your personal information</li>
                                                <li>Object to processing of your information</li>
                                                <li>Data portability</li>
                                                <li>Withdraw consent at any time</li>
                                            </ul>
                                        </section>

                                        <section id="cookies">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">6. Cookies and Tracking</h2>
                                            <p className="mb-6">
                                                We use cookies and similar technologies to enhance your experience, analyze site usage, and
                                                provide personalized content. You can control cookie settings through your browser preferences.
                                            </p>
                                        </section>

                                        <section id="contact">
                                            <h2 className="text-2xl font-bold mb-4 gradient-text">7. Contact Us</h2>
                                            <p className="mb-4">
                                                If you have questions about this Privacy Policy or our data practices, please contact us:
                                            </p>
                                            <div className="bg-muted/50 rounded-lg p-4">
                                                <p>
                                                    <strong>Email:</strong> privacy@toolinger.com
                                                </p>
                                                <p>
                                                    <strong>Address:</strong> 123 Tech Street, Suite 100, San Francisco, CA 94105
                                                </p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Bottom Ad */}
            <div className="container mx-auto px-4 py-8">
                <AdBanner size="banner" />
            </div>

            <Footer />
        </div>
    )
}
