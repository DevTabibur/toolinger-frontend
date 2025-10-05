import Link from "next/link";
import React from "react";

type Tool = {
    href: string;
    icon: React.ReactNode;
    name: string;
    ariaLabel: string;
    categorySlug?:string
    slug?:string
};


type SidebarProps = {
    title?: string;
    tools?: Tool[];
};

const ReleavantToolsSidebar: React.FC<SidebarProps> = ({
    title = "Relevant Tools",
    tools,
}) => {
    return (
        <div>
            {/* Relevant Tools Sidebar */}
            <aside className="w-full md:w-[320px] shrink-0">
                <div className="border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <span
                            className="pl-2 border-l-4"
                            style={{
                                borderImage: "linear-gradient(to bottom, #22c55e, #06b6d4) 1",
                                borderLeftWidth: "4px",
                                borderLeftStyle: "solid",
                                borderLeftColor: "transparent"
                            }}
                        >
                            {title}
                        </span>
                    </h2>
                    <hr className="mb-3 mt-1 border-gray-200 dark:border-gray-700" />
                    <ul className="space-y-3">
                        {tools?.map((tool, idx) => (
                            <li key={idx} className="border border-dashed dark:border-gray-700">
                                <Link
                                    href={`/category/${tool?.categorySlug}/${tool.slug}`}
                                    className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md px-2 py-2 transition"
                                >
                                    <span className="text-2xl" role="img" aria-label={tool.ariaLabel}>
                                        {tool.icon}
                                    </span>
                                    <span className="text-md font-medium text-gray-800 dark:text-gray-100">{tool.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default ReleavantToolsSidebar;
