
"use client";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import "@/styles/quill-theme-aware.css"; 
import 'quill/dist/quill.bubble.css';

export const QuillField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",});

  useEffect(() => {
    if (!quill) return;
    if (value) quill.clipboard.dangerouslyPasteHTML(value);
    quill.on("text-change", () => onChange(quill.root.innerHTML));
  }, [quill]);
 


  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 dark:border-gray-600">
      <div ref={quillRef} className="min-h-[200px]" />
    </div>
  );
};
