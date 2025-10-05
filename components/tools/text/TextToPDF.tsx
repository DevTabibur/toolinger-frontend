"use client";
import React, { useRef, useState } from "react";
import { Home, ChevronRight, Undo2, Redo2, Bold, Italic, Underline, List, ListOrdered, Upload, Smile } from "lucide-react";
import Link from "next/link";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";




const otherTools = [
    {
        id: "word-counter",
        name: "Word Counter",
        description: "Count the number of words in a text",
        category: "Text Tools",
        slug: "word-counter",
        categorySlug: "text-tools",
        icon: "🔢",
    },
    {
        id: "text-to-word",
        name: "Text to Word",
        description: "Convert text documents to Word format",
        category: "Text Tools",
        slug: "text-to-word",
        categorySlug: "text-tools",
        icon: "📄",
    },
    {
        id: "text-repeater",
        name: "Text Repeater",
        description: "Repeat text multiple times",
        category: "Text Tools",
        slug: "text-repeater",
        categorySlug: "text-tools",
        icon: "🔁",
    },
    {
        id: "word-combiner",
        name: "Word Combiner",
        description: "Combine words to create new terms",
        category: "Text Tools",
        slug: "word-combiner",
        categorySlug: "text-tools",
        icon: "🔗",
        badge: "Free",
    },
    {
        id: "text-to-ascii",
        name: "Text to ASCII",
        description: "Convert text to ASCII codes",
        category: "Text Tools",
        slug: "text-to-ascii",
        categorySlug: "text-tools",
        icon: "🔤",
    },
];



// Toolbar and paragraph options
const toolbarButtons = [
    { label: <Bold size={16} />, style: "bold", title: "Bold" },
    { label: <Italic size={16} />, style: "italic", title: "Italic" },
    { label: <Underline size={16} />, style: "underline", title: "Underline" },
    { label: <List size={16} />, style: "insertUnorderedList", title: "Bullet List" },
    { label: <ListOrdered size={16} />, style: "insertOrderedList", title: "Numbered List" },
    { label: <Undo2 size={16} />, style: "undo", title: "Undo" },
    { label: <Redo2 size={16} />, style: "redo", title: "Redo", isRedo: true },
    { label: <Smile size={16} />, style: "insertText", title: "Insert Emoji", emoji: "😊" },
];

const paragraphOptions = [
    { label: "Paragraph", value: "P" },
    { label: "Heading 1", value: "H1" },
    { label: "Heading 2", value: "H2" },
    { label: "Heading 3", value: "H3" },
];

// Helper: Count words in HTML
function getWordCount(html: string) {
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!text) return 0;
    return text.split(" ").length;
}

// Helper: Download PDF using jsPDF
function downloadPDF(htmlContent: string, filename = "document.pdf") {
    // Only run in browser
    if (typeof window === "undefined") return;
    // Dynamically import jsPDF to avoid SSR issues
    import("jspdf").then(jsPDFModule => {
        const jsPDF = jsPDFModule.jsPDF;
        const doc = new jsPDF({
            unit: "pt",
            format: "a4"
        });
        // Remove HTML tags for basic text PDF
        const text = htmlContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        doc.text(text || " ", 40, 60, { maxWidth: 515 });
        doc.save(filename);
    });
}

export default function TextToPDF(props: { article?: any, seo?: any }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState<string>("");
    const [paragraphType, setParagraphType] = useState("P");
    const [filename, setFilename] = useState("document.pdf");
    const [isDark, setIsDark] = useState(false);

    // Toolbar actions
    const handleToolbar = (style: string, isRedo = false, emoji?: string) => {
        if (style === "undo") {
            document.execCommand("undo");
        } else if (style === "redo") {
            document.execCommand("redo");
        } else if (style === "bold" || style === "italic" || style === "underline") {
            document.execCommand(style, false);
        } else if (style === "insertUnorderedList" || style === "insertOrderedList") {
            document.execCommand(style, false);
        } else if (style === "insertText" && emoji) {
            document.execCommand("insertText", false, emoji);
        }
        setContent(editorRef.current?.innerHTML || "");
    };

    // Paragraph/heading change
    const handleParagraphChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setParagraphType(e.target.value);
        document.execCommand("formatBlock", false, e.target.value);
        setContent(editorRef.current?.innerHTML || "");
    };

    // Content change
    const handleInput = () => {
        setContent(editorRef.current?.innerHTML || "");
    };

    // File upload (.txt)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function (evt) {
                if (editorRef.current) {
                    editorRef.current.innerText = evt.target?.result as string;
                    setContent(editorRef.current.innerHTML || "");
                }
            };
            reader.readAsText(file);
        }
    };

    // Download PDF
    const handleDownloadPDF = () => {
        downloadPDF(content, filename);
    };

    // Toggle dark mode
    const handleToggleDark = () => {
        setIsDark((prev) => !prev);
    };

    // Handle filename change
    const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilename(e.target.value);
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
                        href="/category/text-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Text Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Text to PDF</span>
                </nav>
            </div>


            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1">
                        <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                                Text to PDF
                            </h1>
                            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                                Paste your text below or upload a .txt file to convert your text into a PDF document.
                            </p>


                            <div className="mx-auto mt-4 p-4 border border-dashed bg-inherit border border-zinc-200 dark:border-zinc-800">
                                {/* Toolbar */}
                                <div className="flex items-center gap-2 mb-2">
                                    <select
                                        className="border rounded px-2 py-1 text-sm bg-inherit"
                                        value={paragraphType}
                                        onChange={handleParagraphChange}
                                        aria-label="Paragraph type"
                                    >
                                        {paragraphOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    {toolbarButtons.map(btn => (
                                        <button
                                            key={btn.title}
                                            type="button"
                                            title={btn.title}
                                            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            onClick={() => handleToolbar(btn.style, btn.isRedo, btn.emoji)}
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        title="Upload .txt"
                                        className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload size={16} />
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".txt"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                    </button>

                                </div>

                                {/* Editor */}
                                <div
                                    ref={editorRef}
                                    className={`min-h-[180px] border rounded p-3 mb-2 focus:outline-none bg-inherit ${isDark ? "border-zinc-700" : "border-zinc-300"}`}
                                    contentEditable
                                    spellCheck
                                    onInput={handleInput}
                                    suppressContentEditableWarning
                                    aria-label="Text editor"
                                    style={{ whiteSpace: "pre-wrap" }}
                                ></div>

                                {/* Info and actions */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-zinc-500">
                                        {getWordCount(content)} words
                                    </span>
                                    <input
                                        type="text"
                                        className="ml-auto border rounded px-2 py-1 text-xs w-40 bg-inherit"
                                        value={filename}
                                        onChange={handleFilenameChange}
                                        placeholder="Filename (e.g. document.pdf)"
                                        aria-label="Filename"
                                    />
                                    <button
                                        type="button"
                                        className="ml-2 px-3 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
                                        onClick={handleDownloadPDF}
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>


                            <div className="mx-auto mt-6 text-xs text-zinc-500 px-4">
                                <p>
                                    Paste or type your text above, format it, and download as a PDF. Only basic formatting is supported in the PDF output.
                                </p>
                            </div>

                        </div></div>
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
}
