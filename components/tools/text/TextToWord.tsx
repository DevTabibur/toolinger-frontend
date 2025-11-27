"use client";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";
import ArticleRenderer from "@/utils/ArticleRenderer";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

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
    id: "text-to-pdf",
    name: "Text to PDF",
    description: "Convert text documents to PDF format",
    category: "Text Tools",
    slug: "text-to-pdf",
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

// Dynamic toolbar buttons and paragraph options
const toolbarButtons = [
  { label: "B", style: "bold", title: "Bold" },
  { label: "I", style: "italic", title: "Italic" },
  { label: "U", style: "underline", title: "Underline" },
  { label: "•", style: "insertUnorderedList", title: "Bullet List" },
  { label: "1.", style: "insertOrderedList", title: "Numbered List" },
  { label: "⎌", style: "undo", title: "Undo" },
  { label: "⎌", style: "redo", title: "Redo", isRedo: true },
];

const paragraphOptions = [
  { label: "Paragraph", value: "P" },
  { label: "Heading 1", value: "H1" },
  { label: "Heading 2", value: "H2" },
  { label: "Heading 3", value: "H3" },
];

function downloadWordFile(htmlContent: string, filename = "document.doc") {
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'></head><body>`;
  const footer = "</body></html>";
  const sourceHTML = header + htmlContent + footer;

  const blob = new Blob(["\ufeff", sourceHTML], {
    type: "application/msword",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function getWordCount(html: string) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(" ").length;
}

export default function TextToWord(props: { article?: any; seo?: any }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");
  const [paragraphType, setParagraphType] = useState("P");
  const [isDark, setIsDark] = useState(false);
  const [filename, setFilename] = useState("document.doc");

  // Handle toolbar actions
  const handleToolbar = (style: string, isRedo = false) => {
    if (style === "undo") {
      document.execCommand("undo");
    } else if (style === "redo") {
      document.execCommand("redo");
    } else if (
      style === "bold" ||
      style === "italic" ||
      style === "underline"
    ) {
      document.execCommand(style, false);
    } else if (
      style === "insertUnorderedList" ||
      style === "insertOrderedList"
    ) {
      document.execCommand(style, false);
    }
    setContent(editorRef.current?.innerHTML || "");
  };

  // Handle paragraph/heading change
  const handleParagraphChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParagraphType(e.target.value);
    document.execCommand("formatBlock", false, e.target.value);
    setContent(editorRef.current?.innerHTML || "");
  };

  // Handle content change
  const handleInput = () => {
    setContent(editorRef.current?.innerHTML || "");
  };

  // Handle file upload (supports .txt and .doc/.docx)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = function (evt) {
        if (editorRef.current) {
          editorRef.current.innerText = evt.target?.result as string;
          setContent(editorRef.current.innerHTML);
        }
      };
      reader.readAsText(file);
    } else if (
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx") ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Try to read .docx as text (not perfect, but better than nothing)
      const reader = new FileReader();
      reader.onload = function (evt) {
        if (editorRef.current) {
          // Try to extract text content from docx (very basic)
          const text = (evt.target?.result as string)
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          editorRef.current.innerText = text;
          setContent(editorRef.current.innerHTML);
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle download
  const handleDownload = () => {
    if (!content.trim()) return;
    downloadWordFile(
      content,
      filename.endsWith(".doc") ? filename : filename + ".doc"
    );
  };

  // Dynamic word count
  const wordCount = getWordCount(content);

  // Dynamic class for dark mode
  const editorClass =
    "min-h-[200px] border rounded p-3 w-full focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" +
    (isDark ? " dark" : "");

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
          <span className="text-foreground font-medium">
            Text to Word Converter
          </span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-7 on md+ */}
          <div className="md:col-span-7 col-span-1 ">
            <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                Text to Word Counter
              </h1>
              <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                Paste your text below or upload a DOC, DOCX, or TXT file to
                convert it to a Word document.
              </p>

              <div className="flex items-center gap-2 mb-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload File
                </button>
                <input
                  type="text"
                  className="border rounded px-2 py-1 text-sm w-40"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Filename.doc"
                />
                <button
                  className="px-3 py-1 rounded bg-green-500 text-white text-sm"
                  onClick={handleDownload}
                  disabled={!content.trim()}
                >
                  Download Word
                </button>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  Word Count: {wordCount}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <select
                  value={paragraphType}
                  onChange={handleParagraphChange}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {paragraphOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {toolbarButtons.map((btn, idx) => (
                  <button
                    key={idx}
                    title={btn.title}
                    className="px-2 py-1 rounded border text-sm font-semibold"
                    onClick={() => handleToolbar(btn.style, btn.isRedo)}
                    type="button"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <div
                ref={editorRef}
                className={editorClass}
                contentEditable
                spellCheck={true}
                suppressContentEditableWarning
                onInput={handleInput}
                style={{
                  minHeight: 200,
                  outline: "none",
                  whiteSpace: "pre-wrap",
                }}
                aria-label="Text editor"
              ></div>
            </div>
            <ArticleRenderer file="text_to_word.html" />
          </div>
          {/* Second column: col-span-5 on md+ */}
          <div className="md:col-span-5 col-span-1">
            {/* You can place content for the second column here */}
            {/* Advertiesment */}
            <ReleavantToolsSidebar
              title="Popular Tools"
              tools={popularTools as any}
            />
            <ReleavantToolsSidebar
              title="Other Tools"
              tools={otherTools as any}
            />
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
