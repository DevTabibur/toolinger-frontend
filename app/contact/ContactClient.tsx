"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"
import { motion } from "framer-motion"
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from "lucide-react"

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

export default function ContactClient() {
    const contactMethods = [
        {
            icon: Mail,
            title: "Email Us",
            description: "Send us an email and we'll respond within 24 hours",
            contact: "hello@toolinger.com",
            action: "mailto:hello@toolinger.com",
        },
        {
            icon: MessageSquare,
            title: "Live Chat",
            description: "Chat with our support team in real-time",
            contact: "Available 9 AM - 6 PM EST",
            action: "#",
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Call us for urgent matters and technical support",
            contact: "+1 (555) 123-4567",
            action: "tel:+15551234567",
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
                        Contact Us
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        We'd love to hear from you. Get in touch with our team for support, feedback, or just to say hello.
                    </motion.p>
                </div>
            </motion.section>

            {/* Ad Banner */}
            <div className="container mx-auto px-4 py-8">
                <AdBanner size="leaderboard" />
            </div>

            {/* Contact Methods */}
            <motion.section
                className="py-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-lg text-muted-foreground">Choose your preferred way to reach us</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => {
                            const IconComponent = method.icon
                            return (
                                <motion.a
                                    key={method.title}
                                    href={method.action}
                                    className="bg-card border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 block"
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(0, 92, 130, 0.1)",
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                                    <p className="text-muted-foreground mb-4">{method.description}</p>
                                    <p className="font-medium text-primary">{method.contact}</p>
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            className="bg-card border rounded-xl p-8"
                            variants={itemVariants}
                            whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                                <p className="text-muted-foreground">Fill out the form below and we'll get back to you soon</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div whileFocus={{ scale: 1.02 }}>
                                        <label className="block text-sm font-medium mb-2">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="John"
                                        />
                                    </motion.div>
                                    <motion.div whileFocus={{ scale: 1.02 }}>
                                        <label className="block text-sm font-medium mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Doe"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div whileFocus={{ scale: 1.02 }}>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </motion.div>

                                <motion.div whileFocus={{ scale: 1.02 }}>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Feature Request</option>
                                        <option>Bug Report</option>
                                        <option>Partnership</option>
                                    </select>
                                </motion.div>

                                <motion.div whileFocus={{ scale: 1.02 }}>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="w-full gradient-bg text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Send className="h-5 w-5" />
                                    <span>Send Message</span>
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Office Info */}
            <motion.section
                className="py-16 bg-muted/30"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold mb-6">Visit Our Office</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <p className="font-medium">Address</p>
                                        <p className="text-muted-foreground">
                                            123 Tech Street, Suite 100
                                            <br />
                                            San Francisco, CA 94105
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Clock className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <p className="font-medium">Office Hours</p>
                                        <p className="text-muted-foreground">
                                            Monday - Friday: 9:00 AM - 6:00 PM PST
                                            <br />
                                            Weekend: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="bg-card border rounded-xl p-8" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                            <h4 className="text-xl font-bold mb-4">Quick Response Times</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Email Support</span>
                                    <span className="text-primary font-medium">&lt; 24 hours</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Live Chat</span>
                                    <span className="text-primary font-medium">&lt; 5 minutes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phone Support</span>
                                    <span className="text-primary font-medium">Immediate</span>
                                </div>
                            </div>
                        </motion.div>
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
