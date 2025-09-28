"use client";
 
import Link from "next/link";
import { GlobalSearch } from "@/components/global-search";
import { ArrowLeft } from "lucide-react";

// This file is the default 404 page for Next.js. 
// If you are not seeing this page for not found routes, 
// make sure you do NOT have a `notFound()` call in your page or layout files 
// that returns a custom error boundary, and that your custom 404.tsx is at the root of the `app` directory.



const NotfoundClientPage = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
                <div className="flex flex-col items-center max-w-lg w-full">
                    <div className="flex items-center space-x-4 mb-8">
                        <span className="text-5xl font-extrabold text-primary drop-shadow-lg">404</span>
                        <span className="h-10 w-px bg-muted/40" />
                        <span className="text-lg md:text-xl font-medium text-muted-foreground">
                            This page could not be found.
                        </span>
                    </div>
                    <div className="w-full mb-8">
                        <GlobalSearch
                            placeholder="Search for tools, categories, or features..."
                            className="w-full max-w-md mx-auto"
                            variant="header"
                        />
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition-colors text-base"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go back home
                    </Link>
                    <div className="mt-10 text-center text-muted-foreground text-sm">
                        <span>
                            Lost? Try searching for a tool above or&nbsp;
                            <Link href="/category" className="text-primary hover:underline">
                                browse all categories
                            </Link>
                            .
                        </span>
                    </div>
                </div>
                <div className="fixed inset-0 -z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
                    <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl pointer-events-none select-none">
                        <svg width="600" height="300" viewBox="0 0 600 300" fill="none">
                            <ellipse cx="300" cy="150" rx="250" ry="80" fill="#6366f1" fillOpacity="0.15" />
                            <ellipse cx="300" cy="150" rx="180" ry="60" fill="#818cf8" fillOpacity="0.10" />
                        </svg>
                    </div>
                </div>
            </div></>
    )
}


export default NotfoundClientPage