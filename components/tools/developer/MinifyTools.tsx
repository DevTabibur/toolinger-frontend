"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";


const otherTools = [
    {
        id: "html-encoder-decoder",
        name: "HTML Encoder/Decoder",
        description: "Encode and decode HTML entities",
        category: "Developer Tools",
        slug: "html-encoder-decoder",
        categorySlug: "developer-tools",
        icon: "📝",
    },
    {
        id: "minify-html",
        name: "Minify HTML",
        description: "Compress HTML code by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-html",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
    {
        id: "js-beautifier",
        name: "JS Beautifier",
        description: "Format and beautify JavaScript code",
        category: "Developer Tools",
        slug: "js-beautifier",
        categorySlug: "developer-tools",
        icon: "✨",
    },
    {
        id: "php-beautifier",
        name: "PHP Beautifier",
        description: "Format and beautify PHP code",
        category: "Developer Tools",
        slug: "php-beautifier",
        categorySlug: "developer-tools",
        icon: "🐘",
    },
    {
        id: "css-beautifier",
        name: "CSS Beautifier",
        description: "Format and beautify CSS code",
        category: "Developer Tools",
        slug: "css-beautifier",
        categorySlug: "developer-tools",
        icon: "🎨",
    },
    {
        id: "json-beautifier",
        name: "JSON Beautifier",
        description: "Format and validate JSON data",
        category: "Developer Tools",
        slug: "json-beautifier",
        categorySlug: "developer-tools",
        icon: "📋",
    },
    {
        id: "xml-beautifier",
        name: "XML Beautifier",
        description: "Format and validate XML data",
        category: "Developer Tools",
        slug: "xml-beautifier",
        categorySlug: "developer-tools",
        icon: "📄",
    },
    {
        id: "url-encoder-decoder",
        name: "URL Encoder/Decoder",
        description: "Encode and decode URLs",
        category: "Developer Tools",
        slug: "url-encoder-decoder",
        categorySlug: "developer-tools",
        icon: "🔗",
    },
    {
        id: "server-status",
        name: "Server Status Checker",
        description: "Check if a server is online and responsive",
        category: "Developer Tools",
        slug: "server-status",
        categorySlug: "developer-tools",
        icon: "🖥️",
    },
    {
        id: "source-code-retriever",
        name: "Get Source Code of Webpage",
        description: "Retrieve the source code of any webpage",
        category: "Developer Tools",
        slug: "source-code-retriever",
        categorySlug: "developer-tools",
        icon: "📜",
    },
    {
        id: "minify-css",
        name: "Minify CSS",
        description: "Compress CSS code by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-css",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
    {
        id: "minify-js",
        name: "Minify JS",
        description: "Compress JavaScript code by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-js",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
    {
        id: "minify-json",
        name: "Minify JSON",
        description: "Compress JSON data by removing unnecessary characters",
        category: "Developer Tools",
        slug: "minify-json",
        categorySlug: "developer-tools",
        icon: "🗜️",
    },
];

// --- Minification/Beautification Functions ---
function minifyHtml(html: string): string {
    let minified = html.replace(/<!--[\s\S]*?-->/g, "");
    minified = minified.replace(/>\s+</g, "><");
    minified = minified.trim();
    minified = minified.replace(/\s{2,}/g, " ");
    minified = minified.replace(/\s*=\s*/g, "=");
    return minified;
}
function minifyCss(css: string): string {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/\s{2,}/g, " ")
        .replace(/;\}/g, "}")
        .trim();
}
function minifyJs(js: string): string {
    return js
        .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "")
        .replace(/\s*([{};,:])\s*/g, "$1")
        .replace(/\s{2,}/g, " ")
        .trim();
}
function minifyJson(json: string): string {
    try {
        return JSON.stringify(JSON.parse(json));
    } catch {
        return "";
    }
}
function beautifyJs(js: string): string {
    try {
        // Use browser's built-in formatter if available
        return JSON.stringify(eval("(" + js + ")"), null, 2);
    } catch {
        return js;
    }
}
function beautifyCss(css: string): string {
    // Simple beautifier: add newlines after }
    return css.replace(/}/g, "}\n").replace(/{/g, "{\n").replace(/;/g, ";\n");
}
function beautifyHtml(html: string): string {
    // Simple beautifier: add newlines after tags
    return html.replace(/></g, ">\n<");
}
function beautifyJson(json: string): string {
    try {
        return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
        return json;
    }
}
function beautifyXml(xml: string): string {
    // Simple beautifier: add newlines after tags
    return xml.replace(/></g, ">\n<");
}

// --- PHP Beautifier ---
// This is a simple PHP beautifier for demonstration. For real-world use, a proper PHP parser is needed.
function beautifyPhp(php: string): string {
    // Add newlines after semicolons and curly braces, indent blocks
    let code = php
        .replace(/;/g, ";\n")
        .replace(/{/g, "{\n")
        .replace(/}/g, "}\n")
        .replace(/\n{2,}/g, "\n");
    // Simple indentation logic
    let lines = code.split("\n");
    let indent = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.endsWith("}")) indent--;
        lines[i] = "    ".repeat(Math.max(indent, 0)) + line;
        if (line.endsWith("{")) indent++;
    }
    return lines.join("\n").replace(/^\s*\n/gm, "");
}

// --- Tool Config ---
const tools = [
    {
        label: "Minify CSS",
        route: "/category/developer-tools/minify-css",
        type: "minify-css",
    },
    {
        label: "Minify JS",
        route: "/category/developer-tools/minify-js",
        type: "minify-js",
    },
    {
        label: "Minify HTML",
        route: "/category/developer-tools/minify-html",
        type: "minify-html",
    },
    {
        label: "Minify JSON",
        route: "/category/developer-tools/minify-json",
        type: "minify-json",
    },
    {
        label: "JS Beautifier",
        route: "/category/developer-tools/js-beautifier",
        type: "beautify-js",
    },
    {
        label: "CSS Beautifier",
        route: "/category/developer-tools/css-beautifier",
        type: "beautify-css",
    },
    {
        label: "HTML Beautifier",
        route: "/category/developer-tools/html-beautifier",
        type: "beautify-html",
    },
    {
        label: "XML Beautifier",
        route: "/category/developer-tools/xml-beautifier",
        type: "beautify-xml",
    },
    {
        label: "JSON Beautifier",
        route: "/category/developer-tools/json-beautifier",
        type: "beautify-json",
    },
    {
        label: "PHP Beautifier",
        route: "/category/developer-tools/php-beautifier",
        type: "beautify-php",
    },
];

// --- Tool Logic Map ---
const toolLogic = {
    "minify-html": {
        title: "HTML Minifier",
        desc: "To use the HTML Minifier, paste HTML in the textarea below and click on Minify HTML.",
        inputLabel: "Paste HTML",
        outputLabel: "Minified HTML",
        minify: minifyHtml,
        button: "Minify HTML",
        placeholder: "Paste or type your HTML code here",
        outputPlaceholder: "Minified HTML will appear here",
    },
    "minify-css": {
        title: "CSS Minifier",
        desc: "To use the CSS Minifier, paste CSS in the textarea below and click on Minify CSS.",
        inputLabel: "Paste CSS",
        outputLabel: "Minified CSS",
        minify: minifyCss,
        button: "Minify CSS",
        placeholder: "Paste or type your CSS code here",
        outputPlaceholder: "Minified CSS will appear here",
    },
    "minify-js": {
        title: "JS Minifier",
        desc: "To use the JS Minifier, paste JavaScript in the textarea below and click on Minify JS.",
        inputLabel: "Paste JavaScript",
        outputLabel: "Minified JavaScript",
        minify: minifyJs,
        button: "Minify JS",
        placeholder: "Paste or type your JavaScript code here",
        outputPlaceholder: "Minified JavaScript will appear here",
    },
    "minify-json": {
        title: "JSON Minifier",
        desc: "To use the JSON Minifier, paste JSON in the textarea below and click on Minify JSON.",
        inputLabel: "Paste JSON",
        outputLabel: "Minified JSON",
        minify: minifyJson,
        button: "Minify JSON",
        placeholder: "Paste or type your JSON here",
        outputPlaceholder: "Minified JSON will appear here",
    },
    "beautify-js": {
        title: "JS Beautifier",
        desc: "To use the JS Beautifier, paste JavaScript in the textarea below and click on Beautify JS.",
        inputLabel: "Paste JavaScript",
        outputLabel: "Beautified JavaScript",
        minify: beautifyJs,
        button: "Beautify JS",
        placeholder: "Paste or type your JavaScript code here",
        outputPlaceholder: "Beautified JavaScript will appear here",
    },
    "beautify-css": {
        title: "CSS Beautifier",
        desc: "To use the CSS Beautifier, paste CSS in the textarea below and click on Beautify CSS.",
        inputLabel: "Paste CSS",
        outputLabel: "Beautified CSS",
        minify: beautifyCss,
        button: "Beautify CSS",
        placeholder: "Paste or type your CSS code here",
        outputPlaceholder: "Beautified CSS will appear here",
    },
    "beautify-html": {
        title: "HTML Beautifier",
        desc: "To use the HTML Beautifier, paste HTML in the textarea below and click on Beautify HTML.",
        inputLabel: "Paste HTML",
        outputLabel: "Beautified HTML",
        minify: beautifyHtml,
        button: "Beautify HTML",
        placeholder: "Paste or type your HTML code here",
        outputPlaceholder: "Beautified HTML will appear here",
    },
    "beautify-xml": {
        title: "XML Beautifier",
        desc: "To use the XML Beautifier, paste XML in the textarea below and click on Beautify XML.",
        inputLabel: "Paste XML",
        outputLabel: "Beautified XML",
        minify: beautifyXml,
        button: "Beautify XML",
        placeholder: "Paste or type your XML here",
        outputPlaceholder: "Beautified XML will appear here",
    },
    "beautify-json": {
        title: "JSON Beautifier",
        desc: "To use the JSON Beautifier, paste JSON in the textarea below and click on Beautify JSON.",
        inputLabel: "Paste JSON",
        outputLabel: "Beautified JSON",
        minify: beautifyJson,
        button: "Beautify JSON",
        placeholder: "Paste or type your JSON here",
        outputPlaceholder: "Beautified JSON will appear here",
    },
    "beautify-php": {
        title: "PHP Beautifier",
        desc: "To use the PHP Beautifier, paste PHP code in the textarea below and click on Beautify PHP.",
        inputLabel: "Paste PHP",
        outputLabel: "Beautified PHP",
        minify: beautifyPhp,
        button: "Beautify PHP",
        placeholder: "Paste or type your PHP code here",
        outputPlaceholder: "Beautified PHP will appear here",
    },
};

// --- Main Component ---
const ToolPage = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Determine current tool type from path
    const currentTool = useMemo(() => {
        // e.g. /category/developer-tools/minify-html
        const match = tools.find(t => pathname?.endsWith(t.route.split("/").pop() || ""));
        return match ? match.type : "minify-html";
    }, [pathname]);

    const config = toolLogic[currentTool as keyof typeof toolLogic];

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleAction = () => {
        setOutput(config.minify(input));
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary flex items-center"
                    >
                        <Home className="h-4 w-4 mr-1" />
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <Link
                        href="/category/developer-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Developer Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{config.title}</span>
                </nav>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                                {config.title}
                            </h1>
                            <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
                                {config.desc}
                            </p>
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Sidebar */}
                                <div className="md:w-1/4 w-full mb-4 md:mb-0">
                                    <div className="flex flex-col gap-1">
                                        {tools.map(tool => (
                                            <Link
                                                key={tool.type}
                                                href={tool.route}
                                                className={`text-left px-3 py-2 rounded font-semibold mb-1 border transition ${currentTool === tool.type
                                                    ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-700 dark:border-blue-400"
                                                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
                                                    }`}
                                                scroll={false}
                                            >
                                                {tool.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {/* Main Content */}
                                <div className="md:w-3/4 w-full flex flex-col">
                                    <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                        {config.inputLabel}
                                    </label>
                                    <textarea
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2"
                                        rows={10}
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder={config.placeholder}
                                        spellCheck={false}
                                    />
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                                                onClick={handleAction}
                                                type="button"
                                                disabled={!input.trim()}
                                            >
                                                {config.button}
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                                onClick={handleClear}
                                                type="button"
                                                disabled={!input && !output}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className="px-3 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
                                                onClick={handleCopy}
                                                type="button"
                                                disabled={!output}
                                            >
                                                Copy Output
                                            </button>
                                        </div>
                                    </div>
                                    <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                        {config.outputLabel}
                                    </label>
                                    <textarea
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-2 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-2"
                                        rows={10}
                                        value={output}
                                        readOnly
                                        placeholder={config.outputPlaceholder}
                                        spellCheck={false}
                                    />
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>
                                            {input.length > 0 && (
                                                <>
                                                    Input: {input.length} chars
                                                    {output && (
                                                        <>
                                                            {" | "}Output: {output.length} chars
                                                            {" | "}Saved: {input.length - output.length} chars
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </span>
                                        <button
                                            className="underline"
                                            type="button"
                                            onClick={() => setShowAdvanced(v => !v)}
                                        >
                                            {showAdvanced ? "Hide" : "Show"} Advanced Options
                                        </button>
                                    </div>
                                    {showAdvanced && (
                                        <div className="mt-4 p-3 bg-gray-200 dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-200">
                                            <b>Advanced Options (coming soon):</b>
                                            <ul className="list-disc ml-5 mt-2">
                                                <li>Remove optional tags</li>
                                                <li>Collapse whitespace in text nodes</li>
                                                <li>Preserve line breaks in &lt;pre&gt; and &lt;textarea&gt;</li>
                                                <li>Custom minification/beautification rules</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1">
                        {/* You can place content for the second column here */}
                        {/* Advertiesment */}
                        <ReleavantToolsSidebar title="Popular Tools" tools={popularTools as any} />
                        <ReleavantToolsSidebar title="Other Tools" tools={otherTools as any} />
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertiesment
                    </div>
                    <div className="md:col-span-6 col-span-1 bg-white dark:bg-gray-800 rounded shadow p-4">
                        Advertiesment
                    </div>
                </div> */}
            </div>


        </>
    );
};

export default ToolPage;
