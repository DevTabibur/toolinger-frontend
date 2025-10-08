"use client";
import sanitize from 'dompurify';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdBanner } from "@/components/ad-banner";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Heart,
  Zap,
  Shield,
  Globe,
  Rocket,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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
};

export default function AboutClient({ page }: any) {
  const stats = [
    { icon: Users, label: "Active Users", value: "1M+" },
    { icon: Zap, label: "Tools Available", value: "200+" },
    { icon: Globe, label: "Countries Served", value: "150+" },
    { icon: Award, label: "Years Experience", value: "5+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "User-Centric",
      description:
        "Every tool is designed with user experience in mind, ensuring simplicity and effectiveness.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "We prioritize your privacy and security. No data is stored or shared without your consent.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Our tools are optimized for speed, delivering results instantly without compromising quality.",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description:
        "We continuously innovate and add new tools based on user feedback and emerging needs.",
    },
  ];

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
            About Toolinger
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering millions of users worldwide with free, powerful, and
            easy-to-use online tools
          </motion.p>
        </div>
      </motion.section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner size="leaderboard" />
      </div>

      {/* Our Story Section */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                How Toolinger became the go-to platform for online tools
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  The Beginning
                </h3>
                <p className="text-muted-foreground mb-6">
                  Toolinger was born from a simple frustration: the need to
                  download software or pay for subscriptions just to perform
                  basic tasks like converting files, generating passwords, or
                  formatting text. We believed there had to be a better way.
                </p>
                <p className="text-muted-foreground">
                  In 2019, we started with just 10 tools. Today, we proudly
                  offer over 200 free online tools that serve millions of users
                  worldwide, all without requiring downloads, registrations, or
                  payments.
                </p>
              </motion.div>

              <motion.div
                className="bg-card border rounded-xl p-8"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To democratize access to powerful online tools, making
                  productivity and creativity accessible to everyone, regardless
                  of their technical background or budget.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-muted/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              By the Numbers
            </h2>
            <p className="text-lg text-muted-foreground">
              Our impact in the digital world
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Toolinger
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
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
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner size="banner" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <article
          className="prose max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: (page?.data?.pageContent || "") }}
        ></article>
      </div>


      <Footer />
    </div>
  );
}
