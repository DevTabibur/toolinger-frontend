"use client"
import { motion } from "framer-motion"
import { BarChart3, Users, Search, Eye, Clock } from "lucide-react"

const stats = [
  {
    id: 1,
    name: "Total Tools",
    value: "200+",
    change: "+12%",
    changeType: "positive",
    icon: Search,
  },
  {
    id: 2,
    name: "Active Users",
    value: "12,543",
    change: "+8.2%",
    changeType: "positive",
    icon: Users,
  },
  {
    id: 3,
    name: "Page Views",
    value: "89,432",
    change: "+15.3%",
    changeType: "positive",
    icon: Eye,
  },
  {
    id: 4,
    name: "Avg. Session",
    value: "4m 32s",
    change: "-2.1%",
    changeType: "negative",
    icon: Clock,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardOverviewClient() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your Toolinger admin dashboard. Here's what's happening with your tools.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#005c82] to-[#00dbed] rounded-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/dashboard/seo"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <Search className="w-5 h-5 text-[#005c82] dark:text-[#00dbed] mr-3" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                Manage SEO Settings
              </span>
            </a>
            <a
              href="/dashboard/analytics"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <BarChart3 className="w-5 h-5 text-[#005c82] dark:text-[#00dbed] mr-3" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                View Analytics
              </span>
            </a>
            <a
              href="/dashboard/users"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <Users className="w-5 h-5 text-[#005c82] dark:text-[#00dbed] mr-3" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                Manage Users
              </span>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">SEO updated for homepage</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">New user registered</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">Tool usage spike detected</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
