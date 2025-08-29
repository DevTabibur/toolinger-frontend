"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Settings,
  Search,
  Users,
  BarChart3,
  FileText,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Inbox,
  BookOpen,
  Edit3,
  PenTool,
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import Link from "next/link";
import { getFromLocalStorage } from "@/lib/local-storage";
import { useUserContext } from "@/contexts/UserContext";
import Image from "next/image";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  permission?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    id: "blog",
    label: "Blog Management",
    icon: <PenTool className="w-5 h-5" />,
    permission: "blog_management",
    children: [
      {
        id: "blog-create",
        label: "Create Blog",
        icon: <Edit3 className="w-4 h-4" />,
        href: "/dashboard/blog/create",
      },
      {
        id: "blog-manage",
        label: "Manage Blogs",
        icon: <BookOpen className="w-4 h-4" />,
        href: "/dashboard/blog/manage",
      },
      {
        id: "blog-settings",
        label: "Blog Settings",
        icon: <Settings className="w-4 h-4" />,
        href: "/dashboard/blog/settings",
      },
    ],
  },
  {
    id: "blog-category",
    label: "Blog Category",
    icon: <Inbox className="w-5 h-5" />,
    permission: "blog_category_management",
    children: [
      {
        id: "add-category",
        label: "Add Category",
        icon: <Edit3 className="w-4 h-4" />,
        href: "/dashboard/blog-category/add",
      },
      {
        id: "manage-category",
        label: "Manage Category",
        icon: <BookOpen className="w-4 h-4" />,
        href: "/dashboard/blog-category/manage",
      },
    ],
  },
  {
    id: "seo",
    label: "SEO Management",
    icon: <Search className="w-5 h-5" />,
    permission: "seo_management",
    children: [
      {
        id: "seo-pages",
        label: "Page SEO",
        icon: <FileText className="w-4 h-4" />,
        href: "/dashboard/seo",
      },
      {
        id: "seo-tools",
        label: "Tool SEO",
        icon: <Settings className="w-4 h-4" />,
        href: "/dashboard/seo/tools",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    permission: "analytics",
    href: "/dashboard/analytics",
  },
  {
    id: "users",
    label: "User Management",
    icon: <Users className="w-5 h-5" />,
    permission: "user_management",
    href: "/dashboard/users",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    permission: "settings",
    href: "/dashboard/settings",
  },
];

// Sidebar width constants for layout
const SIDEBAR_EXPANDED_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 80;

function isMenuItemActive(item: MenuItem, pathname: string): boolean {
  if (item.href && pathname === item.href) return true;
  if (item.href && pathname.startsWith(item.href) && item.href !== "/dashboard")
    return true;
  if (item.children) {
    return item.children.some((child) => isMenuItemActive(child, pathname));
  }
  return false;
}

function isChildActive(child: MenuItem, pathname: string): boolean {
  if (child.href && pathname === child.href) return true;
  if (
    child.href &&
    pathname.startsWith(child.href) &&
    child.href !== "/dashboard"
  )
    return true;
  return false;
}

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["seo"]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const role = useRole();
  const hasPermission = role?.hasPermission ?? (() => true);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useUserContext()

  // Expand parent menu if a child is active
  useEffect(() => {
    // Find all menu ids that should be expanded based on current path
    const expanded: string[] = [];
    for (const item of menuItems) {
      if (item.children && isMenuItemActive(item, pathname)) {
        expanded.push(item.id);
      }
    }
    setExpandedMenus(expanded.length > 0 ? expanded : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  let filteredMenuItems: MenuItem[] = menuItems;
  if (role && typeof hasPermission === "function") {
    filteredMenuItems = menuItems.filter(
      (item) => !item.permission || hasPermission(item.permission)
    );
  }

  const sidebarVariants = {
    expanded: { width: SIDEBAR_EXPANDED_WIDTH },
    collapsed: { width: SIDEBAR_COLLAPSED_WIDTH },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  console.log("mobileMenuOpen", mobileMenuOpen);
  console.log("sidebarCollapsed", sidebarCollapsed);


  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = getFromLocalStorage("toolinger");
    if (!token) {
      redirect("/auth/login");
    } else {
      setCheckedAuth(true);
    }
  }, []);

  if (!checkedAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile Menu Overlay */}
      {/* <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence> */}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 shadow-lg
                    ${mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
                    transition-transform duration-300 lg:transition-none
                `}
        style={{
          width: sidebarCollapsed
            ? SIDEBAR_COLLAPSED_WIDTH
            : SIDEBAR_EXPANDED_WIDTH,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#005c82] to-[#00dbed] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Toolinger
                  </span>
                </motion.div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden lg:block"
              >
                <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* User Info */}
          {/* {!sidebarCollapsed && user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </motion.div>
          )} */}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredMenuItems.map((item, index) => {
              const isActive = isMenuItemActive(item, pathname);
              return (
                <motion.div
                  key={item.id}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors group
                                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                                    ${isActive
                            ? "bg-gray-100 dark:bg-gray-700 font-semibold text-[#005c82] dark:text-[#00dbed]"
                            : ""
                          }
                                                `}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`transition-colors
                                                        ${isActive
                                ? "text-[#005c82] dark:text-[#00dbed]"
                                : "text-gray-600 dark:text-gray-400 group-hover:text-[#005c82] dark:group-hover:text-[#00dbed]"
                              }
                                                    `}
                          >
                            {item.icon}
                          </span>
                          {!sidebarCollapsed && (
                            <span
                              className={`group-hover:text-gray-900 dark:group-hover:text-white transition-colors
                                                            ${isActive
                                  ? "text-[#005c82] dark:text-[#00dbed]"
                                  : "text-gray-700 dark:text-gray-300"
                                }
                                                        `}
                            >
                              {item.label}
                            </span>
                          )}
                        </div>
                        {!sidebarCollapsed && (
                          <motion.div
                            animate={{
                              rotate: expandedMenus.includes(item.id) ? 90 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedMenus.includes(item.id) &&
                          !sidebarCollapsed && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-6 mt-2 space-y-1 overflow-hidden"
                            >
                              {item.children.map((child) => {
                                const isChild = isChildActive(child, pathname);
                                return (
                                  <Link
                                    key={child.id as any}
                                    href={child.href as any}
                                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors group
                                                                        hover:bg-gray-100 dark:hover:bg-gray-700
                                                                        ${isChild
                                        ? "bg-gray-100 dark:bg-gray-700 font-semibold text-[#005c82] dark:text-[#00dbed]"
                                        : ""
                                      }
                                                                    `}
                                  >
                                    <span
                                      className={`group-hover:text-[#005c82] dark:group-hover:text-[#00dbed] transition-colors
                                                                        ${isChild
                                          ? "text-[#005c82] dark:text-[#00dbed]"
                                          : "text-gray-500 dark:text-gray-400"
                                        }
                                                                    `}
                                    >
                                      {child.icon}
                                    </span>
                                    <span
                                      className={`text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors
                                                                        ${isChild
                                          ? "text-[#005c82] dark:text-[#00dbed]"
                                          : "text-gray-600 dark:text-gray-400"
                                        }
                                                                    `}
                                    >
                                      {child.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href as any}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group
                                                hover:bg-gray-100 dark:hover:bg-gray-700
                                                ${isActive
                          ? "bg-gray-100 dark:bg-gray-700 font-semibold text-[#005c82] dark:text-[#00dbed]"
                          : ""
                        }
                                            `}
                    >
                      <span
                        className={`transition-colors
                                                ${isActive
                            ? "text-[#005c82] dark:text-[#00dbed]"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-[#005c82] dark:group-hover:text-[#00dbed]"
                          }
                                            `}
                      >
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <span
                          className={`group-hover:text-gray-900 dark:group-hover:text-white transition-colors
                                                    ${isActive
                              ? "text-[#005c82] dark:text-[#00dbed]"
                              : "text-gray-700 dark:text-gray-300"
                            }
                                                `}
                        >
                          {item.label}
                        </span>
                      )}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Footer Actions */}
          {/* Removed theme and logout from sidebar footer, now in profile dropdown */}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{
          marginLeft: mobileMenuOpen
            ? 0
            : sidebarCollapsed
              ? SIDEBAR_COLLAPSED_WIDTH
              : SIDEBAR_EXPANDED_WIDTH,
        }}
      >
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="flex-1 flex items-center justify-end">
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <img
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.firstName || "avatar"}
                    className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700"
                  />
                  <span className="hidden sm:block font-medium text-gray-900 dark:text-white text-sm">
                    {user?.firstName} {user?.lastName}
                  </span>
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-72 max-w-[90vw] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center space-x-3">
                        <img
                          src={user?.avatar || "/placeholder.svg"}
                          alt={user?.firstName}
                          className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white leading-tight">
                          {user?.firstName} {user?.lastName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-300">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Account Settings
                        </Link>
                        <Link
                          href="/dashboard/support"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Inbox className="w-4 h-4 mr-2" />
                          Support Inbox
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700 py-2">
                        <button
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          {theme === "dark" ? (
                            <Sun className="w-4 h-4 mr-2" />
                          ) : (
                            <Moon className="w-4 h-4 mr-2" />
                          )}
                          {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </button>
                        <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}

        <main className="p-6 flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
