"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { motion } from "framer-motion"
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"

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

export default function TermsClient({ page }: any) {
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
            Terms of Service
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Please read these terms carefully before using our platform and tools.
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

      {/* Key Points */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Points</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are the most important things you should know
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: CheckCircle,
                title: "Free to Use",
                description: "All our tools are completely free with no hidden charges or premium tiers.",
              },
              {
                icon: FileText,
                title: "No Registration",
                description: "Use our tools without creating an account or providing personal information.",
              },
              {
                icon: Scale,
                title: "Fair Use",
                description: "Use our tools responsibly and don't abuse our systems or resources.",
              },
              {
                icon: AlertTriangle,
                title: "No Warranties",
                description: "Tools are provided as-is. We're not liable for any damages from their use.",
              },
            ].map((point, index) => {
              const IconComponent = point.icon
              return (
                <motion.div
                  key={point.title}
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
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-muted-foreground text-sm">{point.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Terms Content */}
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
                    <a href="#acceptance" className="block text-muted-foreground hover:text-primary transition-colors">
                      Acceptance of Terms
                    </a>
                    <a href="#description" className="block text-muted-foreground hover:text-primary transition-colors">
                      Service Description
                    </a>
                    <a
                      href="#user-conduct"
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      User Conduct
                    </a>
                    <a
                      href="#intellectual-property"
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      Intellectual Property
                    </a>
                    <a href="#disclaimers" className="block text-muted-foreground hover:text-primary transition-colors">
                      Disclaimers
                    </a>
                    <a
                      href="#limitation-liability"
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      Limitation of Liability
                    </a>
                    <a href="#termination" className="block text-muted-foreground hover:text-primary transition-colors">
                      Termination
                    </a>
                    <a href="#changes" className="block text-muted-foreground hover:text-primary transition-colors">
                      Changes to Terms
                    </a>
                  </nav>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div className="lg:col-span-3 space-y-8" variants={itemVariants}>
                <div className="bg-card border rounded-xl p-8">
                  <div className="prose prose-gray max-w-none">
                    <section id="acceptance">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">1. Acceptance of Terms</h2>
                      <p className="mb-6">
                        By accessing and using Toolinger ("the Service"), you accept and agree to be bound by the terms
                        and provision of this agreement. If you do not agree to abide by the above, please do not use
                        this service.
                      </p>
                    </section>

                    <section id="description">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">2. Service Description</h2>
                      <p className="mb-4">Toolinger provides:</p>
                      <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>
                          Free online tools for various purposes including text processing, image manipulation,
                          calculations, and more
                        </li>
                        <li>Web-based applications that run in your browser</li>
                        <li>No-registration-required access to most tools</li>
                        <li>Educational and productivity resources</li>
                      </ul>
                    </section>

                    <section id="user-conduct">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">3. User Conduct</h2>
                      <p className="mb-4">You agree not to:</p>
                      <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Use the service for any unlawful purpose or to solicit others to perform unlawful acts</li>
                        <li>
                          Violate any international, federal, provincial, or state regulations, rules, laws, or local
                          ordinances
                        </li>
                        <li>
                          Infringe upon or violate our intellectual property rights or the intellectual property rights
                          of others
                        </li>
                        <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                        <li>Submit false or misleading information</li>
                        <li>Upload viruses or any other type of malicious code</li>
                        <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                        <li>Use the service for any obscene or immoral purpose</li>
                        <li>Interfere with or circumvent the security features of the service</li>
                      </ul>
                    </section>

                    <section id="intellectual-property">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">4. Intellectual Property Rights</h2>
                      <p className="mb-6">
                        The Service and its original content, features, and functionality are and will remain the
                        exclusive property of Toolinger and its licensors. The Service is protected by copyright,
                        trademark, and other laws. Our trademarks and trade dress may not be used in connection with any
                        product or service without our prior written consent.
                      </p>
                    </section>

                    <section id="disclaimers">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">5. Disclaimers</h2>
                      <p className="mb-4">
                        The information on this website is provided on an "as is" basis. To the fullest extent permitted
                        by law, this Company:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Excludes all representations and warranties relating to this website and its contents</li>
                        <li>
                          Does not warrant that the functions contained in this website will be uninterrupted or
                          error-free
                        </li>
                        <li>
                          Does not warrant that defects will be corrected, or that this website or the server is free of
                          viruses
                        </li>
                        <li>Does not warrant the accuracy, reliability, or completeness of any information</li>
                      </ul>
                    </section>

                    <section id="limitation-liability">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">6. Limitation of Liability</h2>
                      <p className="mb-6">
                        In no event shall Toolinger, nor its directors, employees, partners, agents, suppliers, or
                        affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                        including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                        resulting from your use of the Service.
                      </p>
                    </section>

                    <section id="termination">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">7. Termination</h2>
                      <p className="mb-6">
                        We may terminate or suspend your access immediately, without prior notice or liability, for any
                        reason whatsoever, including without limitation if you breach the Terms. Upon termination, your
                        right to use the Service will cease immediately.
                      </p>
                    </section>

                    <section id="changes">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">8. Changes to Terms</h2>
                      <p className="mb-4">
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                        revision is material, we will try to provide at least 30 days notice prior to any new terms
                        taking effect.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-4 mt-6">
                        <p>
                          <strong>Contact Information:</strong>
                        </p>
                        <p>If you have any questions about these Terms, please contact us at legal@toolinger.com</p>
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

      <div className="container mx-auto px-4 py-24">
        <div dangerouslySetInnerHTML={{ __html: page?.data?.pageContent }}></div>
      </div>

      <Footer />
    </div>
  )
}
