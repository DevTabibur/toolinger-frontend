"use client";
import React, { useState } from "react";
import { ChevronRight, Home, Trash2 } from "lucide-react";
import Link from "next/link";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";
import ArticleRenderer from "@/utils/ArticleRenderer";

const otherTools = [
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

function countWords(text: string) {
  // Split by whitespace, filter out empty strings
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}

function countCharacters(text: string) {
  return text.length;
}

function countSentences(text: string) {
  // Count sentences by . ! ? followed by space or end of string
  const matches = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  return matches ? matches.length : text.trim().length > 0 ? 1 : 0;
}

function calculateReadTime(words: number) {
  // Average reading speed: 275 words per minute
  if (words === 0) return 0;
  return Math.max(1, Math.round((words / 275) * 60));
}

const exampleText = ``;

const statBoxStyle =
  "flex flex-col items-center justify-center  rounded-lg p-4 min-w-[120px] border border-dashed border-gray-300 dark:border-gray-700";

export default function WordCounter(props: any) {
  const [text, setText] = useState(exampleText);

  const words = countWords(text);
  const characters = countCharacters(text);
  const sentences = countSentences(text);
  const readTime = calculateReadTime(words);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText("");
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
          <span className="text-foreground font-medium">Word Counter</span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* First column: col-span-7 on md+ */}
          <div className="md:col-span-7 col-span-1">
            <div className=" border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                Word Counter
              </h1>
              <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                To use <b>word counter</b>, copy and paste text in the input box
                below or upload DOC, PDF or DOCX to count words and characters.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className={statBoxStyle}>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {words}
                  </span>
                  <span className="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                    Words
                  </span>
                </div>
                <div className={statBoxStyle}>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {characters}
                  </span>
                  <span className="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                    Characters
                  </span>
                </div>
                <div className={statBoxStyle}>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {sentences}
                  </span>
                  <span className="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                    Sentence
                  </span>
                </div>
                <div className={statBoxStyle}>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {readTime}
                  </span>
                  <span className="uppercase text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                    Read Time <span className="lowercase">sec</span>
                  </span>
                </div>
              </div>
              <div className="relative">
                <textarea
                  className="w-full min-h-[120px] max-h-[300px] border border-gray-300 dark:border-gray-700 rounded-lg p-3 pr-10 text-gray-800 dark:text-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition bg-white"
                  value={text}
                  onChange={handleChange}
                  placeholder="Paste or type your text here..."
                />
                {text.length > 0 && (
                  <button
                    className="absolute bottom-3 right-3 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"
                    onClick={handleClear}
                    aria-label="Clear text"
                    type="button"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </div>{" "}
            <ArticleRenderer file="word_counter.html" />
          </div>

          {/* Second column: col-span-5 on md+ */}
          <div className="md:col-span-5 col-span-1 ">
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
