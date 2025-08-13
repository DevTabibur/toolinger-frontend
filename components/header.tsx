// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useTheme } from "next-themes"
// import { Search, Menu, X, Sun, Moon, Wrench } from "lucide-react"

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const { theme, setTheme } = useTheme()

//   const categories = [
//     "Text Tools",
//     "Image Tools",
//     "SEO Tools",
//     "Developer Tools",
//     "Productivity",
//     "Converters",
//     "Generators",
//     "Calculators",
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="gradient-bg p-2 rounded-lg">
//               <Wrench className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-xl font-bold gradient-text">Toolinger</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
//               Home
//             </Link>
//             <div className="relative group">
//               <button className="text-sm font-medium hover:text-primary transition-colors">Categories</button>
//               <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                 <div className="p-2">
//                   {categories.map((category) => (
//                     <Link
//                       key={category}
//                       href={`/category/${category.toLowerCase().replace(" ", "-")}`}
//                       className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
//                     >
//                       {category}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
//               About
//             </Link>
//             <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
//               Contact
//             </Link>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Search tools..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Theme Toggle & Mobile Menu */}
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-lg hover:bg-muted transition-colors"
//             >
//               <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             </button>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
//             >
//               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t py-4">
//             <div className="flex flex-col space-y-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search tools..."
//                   className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
//               <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
//                 Home
//               </Link>
//               <div className="space-y-2">
//                 <span className="text-sm font-medium text-muted-foreground">Categories</span>
//                 <div className="pl-4 space-y-2">
//                   {categories.map((category) => (
//                     <Link
//                       key={category}
//                       href={`/category/${category.toLowerCase().replace(" ", "-")}`}
//                       className="block text-sm hover:text-primary transition-colors"
//                     >
//                       {category}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//               <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
//                 About
//               </Link>
//               <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
//                 Contact
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }



//=======================NEW  

"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Wrench } from "lucide-react";
import { GlobalSearch } from "@/components/global-search";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const categories = [
    "Text Tools",
    "Image Tools",
    // "SEO Tools",
    "Developer Tools",
    // "Productivity",
    "Converters",
    "Generators",
    "Calculators",
    // "Domain Tools",
    "Website Management",
    // "More Tools",
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="gradient-bg p-2 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Toolinger</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-colors flex items-center">
                Categories
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <GlobalSearch placeholder="Search tools..." variant="header" />
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <GlobalSearch placeholder="Search tools..." variant="header" />
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Categories
                </span>
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
