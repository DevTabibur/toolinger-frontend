// "use client";
// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import classNames from "classnames";

// // Dynamically import react-quill to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// const toolbarOptions = [
//   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//   [{ 'font': [] }],
//   [{ 'size': ['small', false, 'large', 'huge'] }],
//   ['bold', 'italic', 'underline', 'strike'],
//   [{ 'color': [] }, { 'background': [] }],
//   [{ 'script': 'sub'}, { 'script': 'super' }],
//   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//   [{ 'indent': '-1'}, { 'indent': '+1' }],
//   [{ 'align': [] }],
//   ['blockquote', 'code-block'],
//   ['link', 'image'],
//   ['clean']
// ];

// const modules = {
//   toolbar: toolbarOptions,
// };

// const formats = [
//   "header", "font", "size",
//   "bold", "italic", "underline", "strike",
//   "color", "background",
//   "script",
//   "list", "bullet", "indent",
//   "align",
//   "blockquote", "code-block",
//   "link", "image"
// ];

// function getTextFromHtml(html: string) {
//   if (typeof window === "undefined") return "";
//   const div = document.createElement("div");
//   div.innerHTML = html;
//   return div.innerText || "";
// }

// export default function TextEditor() {
//   const [value, setValue] = useState("");
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   // For word count
//   const plainText = getTextFromHtml(value);
//   const wordCount = plainText.trim().length === 0
//     ? 0
//     : plainText.trim().split(/\s+/).length;

//   // Download as TXT
//   const handleSaveAsTxt = () => {
//     const blob = new Blob([plainText], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "text-editor.txt";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Download as DOC
//   const handleSaveAsDoc = () => {
//     const html = `
//       <html>
//         <head>
//           <meta charset="utf-8">
//         </head>
//         <body>${value}</body>
//       </html>
//     `;
//     const blob = new Blob([html], { type: "application/msword" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "text-editor.doc";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Download as PDF (using window.print for simplicity)
//   const handleSaveAsPDF = () => {
//     const printWindow = window.open("", "_blank");
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Export PDF</title>
//             <style>
//               body { font-family: Arial, sans-serif; padding: 40px; }
//             </style>
//           </head>
//           <body>${value}</body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//     }
//   };

//   // Clear editor
//   const handleClear = () => setValue("");

//   // Toggle theme
//   const handleThemeToggle = () => setTheme(theme === "light" ? "dark" : "light");

//   return (
//     <div
//       className={classNames(
//         "min-h-screen py-8 px-2 transition-colors duration-300",
//         theme === "dark" ? "bg-gray-900" : "bg-gray-50"
//       )}
//     >
//       <div className="max-w-3xl mx-auto">
//         <div className="flex flex-col items-center mb-2">
//           <h1 className={classNames(
//             "text-2xl md:text-3xl font-bold text-center",
//             theme === "dark" ? "text-gray-100" : "text-gray-900"
//           )}>
//             Online Text Editor
//           </h1>
//           <p className={classNames(
//             "text-gray-600 text-center mb-4",
//             theme === "dark" ? "text-gray-300" : "text-gray-600"
//           )}>
//             A simple, modern, online text editor with export and theme options.
//           </p>
//           <div className="flex gap-2 mb-4">
//             <button
//               onClick={handleThemeToggle}
//               className={classNames(
//                 "px-3 py-1 rounded transition-colors duration-200",
//                 theme === "dark"
//                   ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
//                   : "bg-gray-200 text-gray-900 hover:bg-gray-300"
//               )}
//               aria-label="Toggle theme"
//             >
//               {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
//             </button>
//             <button
//               onClick={handleClear}
//               className={classNames(
//                 "px-3 py-1 rounded transition-colors duration-200",
//                 theme === "dark"
//                   ? "bg-red-700 text-gray-100 hover:bg-red-600"
//                   : "bg-red-100 text-red-700 hover:bg-red-200"
//               )}
//               aria-label="Clear editor"
//             >
//               Clear
//             </button>
//             <button
//               onClick={handleSaveAsTxt}
//               className={classNames(
//                 "px-3 py-1 rounded transition-colors duration-200",
//                 theme === "dark"
//                   ? "bg-blue-800 text-gray-100 hover:bg-blue-700"
//                   : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//               )}
//               aria-label="Download as TXT"
//             >
//               TXT
//             </button>
//             <button
//               onClick={handleSaveAsDoc}
//               className={classNames(
//                 "px-3 py-1 rounded transition-colors duration-200",
//                 theme === "dark"
//                   ? "bg-green-800 text-gray-100 hover:bg-green-700"
//                   : "bg-green-100 text-green-700 hover:bg-green-200"
//               )}
//               aria-label="Download as DOC"
//             >
//               DOC
//             </button>
//             <button
//               onClick={handleSaveAsPDF}
//               className={classNames(
//                 "px-3 py-1 rounded transition-colors duration-200",
//                 theme === "dark"
//                   ? "bg-yellow-800 text-gray-100 hover:bg-yellow-700"
//                   : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
//               )}
//               aria-label="Download as PDF"
//             >
//               PDF
//             </button>
//           </div>
//         </div>
//         <div
//           className={classNames(
//             "bg-white rounded shadow p-2 md:p-4 mb-4 transition-colors duration-300",
//             theme === "dark" ? "bg-gray-800" : "bg-white"
//           )}
//         >
//           <ReactQuill
//             value={value}
//             onChange={setValue}
//             modules={modules}
//             formats={formats}
//             theme="snow"
//             className={classNames(
//               "min-h-[200px] text-base",
//               theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
//             )}
//           />
//         </div>
//         <div className="flex justify-between items-center text-sm px-1">
//           <span className={classNames(
//             "font-mono",
//             theme === "dark" ? "text-gray-300" : "text-gray-700"
//           )}>
//             Words: {wordCount}
//           </span>
//           <span className={classNames(
//             "font-mono",
//             theme === "dark" ? "text-gray-300" : "text-gray-700"
//           )}>
//             Characters: {plainText.length}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
