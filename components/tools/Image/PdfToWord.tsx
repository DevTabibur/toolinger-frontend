"use client";
import React, { useRef, useState } from "react";
import { ChevronRight, Home, Trash2, FileDown, File } from "lucide-react";
import Link from "next/link";

/**
 * NOTE:
 * You CANNOT convert PDF to Word (docx) fully on the frontend only.
 * You NEED a backend API or a third-party service to do the actual conversion.
 * This is because:
 * - There is no reliable, production-ready JS library that can convert PDF to Word in-browser.
 * - Conversion requires parsing PDF, extracting text/images, and generating a .docx file, which is complex and resource-intensive.
 * - Most online tools use a backend (Node.js, Python, Java, etc.) or call a paid API (like Cloudmersive, Zamzar, etc.).
 * 
 * So YES, you need a backend API for real PDF to Word conversion.
 * The code below assumes you have an endpoint at /api/pdf-to-word that does the conversion.
 */

export default function PdfToWord() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF to Word conversion using a backend API endpoint
  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // You must implement this API route in your backend!
      const response = await fetch("/api/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert PDF. Please try again.");
      }

      // Get the blob (Word file) from the response
      const blob = await response.blob();
      // Check if the response is actually a Word file
      if (
        blob.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        throw new Error("Conversion failed or returned invalid file type.");
      }
      setConvertedFileUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      setError(err.message || "An error occurred during conversion.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setConvertedFileUrl(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setError("Please select a PDF file.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setConvertedFileUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            href="/category/image-tools"
            className="text-muted-foreground hover:text-primary"
          >
            Image Tools
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">PDF to Word</span>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
            PDF to Word
          </h1>
          <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
            This Online PDF to Word Converter lets you convert PDF to editable Word for free.<br />
            <b>Note:</b> PDF to Word conversion requires a backend API. This tool uploads your PDF to the server for conversion.
          </p>

          {/* Upload Box */}
          <div className="mb-6">
            <div
              className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-8 px-4 transition ${
                selectedFile
                  ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20"
              }`}
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer" }}
            >
              {!selectedFile ? (
                <>
                  <File className="w-16 h-16 text-gray-400 mb-2" />
                  <span className="text-gray-500 dark:text-gray-400 mb-2">
                    Click or drag PDF file here to upload
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <File className="w-12 h-12 text-green-500 mb-2" />
                  <span className="text-green-700 dark:text-green-300 font-medium mb-1">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    className="flex items-center text-red-500 hover:text-red-700 text-sm mt-2"
                    onClick={e => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              )}
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
            )}
          </div>

          {/* Convert Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              className={`px-6 py-2 rounded bg-primary text-white font-semibold shadow transition disabled:opacity-60 ${
                !selectedFile || isConverting || convertedFileUrl
                  ? "cursor-not-allowed"
                  : "hover:bg-primary/90"
              }`}
              onClick={handleConvert}
              disabled={!selectedFile || isConverting || !!convertedFileUrl}
            >
              {isConverting ? (
                <span>
                  <svg
                    className="inline w-4 h-4 mr-2 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Converting...
                </span>
              ) : (
                "Convert"
              )}
            </button>
            {convertedFileUrl && (
              <a
                href={convertedFileUrl}
                download={
                  selectedFile
                    ? selectedFile.name.replace(/\.pdf$/i, ".docx")
                    : "converted.docx"
                }
                className="mt-4 flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Download Word File
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


