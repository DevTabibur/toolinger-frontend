"use client"
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

const INVISIBLE_CHAR = "\u200B"; // Zero-width space

const statBox =
  "flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-4 min-w-[120px]";

const cardBox =
  "bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-3";

const buttonStyle =
  "px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";

const inputStyle =
  "border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600";

export default function InvisibleCharacter() {
  // For "Copy to clipboard"
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  // For "Copy Manually with button"
  const manualRef = useRef<HTMLTextAreaElement>(null);

  // For "Copy Unlimited Invisible Characters"
  const [count, setCount] = useState(5);
  const [generated, setGenerated] = useState("");
  const unlimitedRef = useRef<HTMLTextAreaElement>(null);

  // For "Test & Copy"
  const [testText, setTestText] = useState("");
  const [testCharCount, setTestCharCount] = useState(0);

  // Copy to clipboard handler
  const handleCopy = async (length: number = 1) => {
    try {
      await navigator.clipboard.writeText(INVISIBLE_CHAR.repeat(length));
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 1200);
    } catch {
      setCopyStatus("idle");
    }
  };

  // Select text in textarea
  const handleSelectText = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.select();
    }
  };

  // Generate unlimited invisible characters
  const handleGenerate = () => {
    setGenerated(INVISIBLE_CHAR.repeat(count));
    setTimeout(() => {
      if (unlimitedRef.current) unlimitedRef.current.select();
    }, 100);
  };

  // Test & Copy
  const handleTestPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTestText(text);
      setTestCharCount(text.length);
    } catch {
      setTestText("");
      setTestCharCount(0);
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
                        href="/category/text-tools"
                        className="text-muted-foreground hover:text-primary"
                    >
                        Text Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Invisible Character</span>
                </nav>
            </div>

            <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Invisible Character
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Copy to clipboard */}
        <div className={cardBox}>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
            Copy to clipboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Click the button below to copy an empty character to your clipboard. If this doesn't work on your device, use method 2.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              className={buttonStyle + (copyStatus === "copied" ? " bg-green-500" : "")}
              onClick={() => handleCopy(1)}
            >
              {copyStatus === "copied" ? "Copied!" : "Medium (​)"}
            </button>
            <button
              className={buttonStyle}
              onClick={() => handleCopy(2)}
            >
              Large (​​)
            </button>
          </div>
        </div>
        {/* Copy Manually with button */}
        <div className={cardBox}>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
            Copy Manually with button
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            If the copy button doesn't work, you can manually select and copy the invisible character below.
          </p>
          <textarea
            ref={manualRef}
            className={inputStyle + " w-full mb-2"}
            value={INVISIBLE_CHAR}
            readOnly
            rows={1}
            onFocus={() => handleSelectText(manualRef as any)}
            aria-label="Invisible character textarea"
          />
          <button
            className={buttonStyle}
            onClick={() => handleSelectText(manualRef as any)}
            type="button"
          >
            Select & Copy
          </button>
        </div>
        {/* Copy Unlimited Invisible Characters */}
        <div className={cardBox}>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
            Copy Unlimited Invisible Characters
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Generate a custom number of invisible characters.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="count" className="text-gray-700 dark:text-gray-200 text-sm">
              Count:
            </label>
            <input
              id="count"
              type="number"
              min={1}
              max={10000}
              className={inputStyle + " w-20"}
              value={count}
              onChange={e => setCount(Math.max(1, Math.min(10000, Number(e.target.value))))}
            />
            <button
              className={buttonStyle}
              onClick={handleGenerate}
              type="button"
            >
              Generate
            </button>
          </div>
          <textarea
            ref={unlimitedRef}
            className={inputStyle + " w-full mb-2"}
            value={generated}
            readOnly
            rows={1}
            onFocus={() => handleSelectText(unlimitedRef as any)}
            aria-label="Generated invisible characters"
          />
          <button
            className={buttonStyle}
            onClick={() => handleSelectText(unlimitedRef as any)}
            type="button"
            disabled={!generated}
          >
            Select & Copy
          </button>
        </div>
        {/* Test & Copy */}
        <div className={cardBox}>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
            Test & Copy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Paste here to see how many invisible characters you have, or paste from your clipboard.
          </p>
          <textarea
            className={inputStyle + " w-full mb-2"}
            value={testText}
            onChange={e => {
              setTestText(e.target.value);
              setTestCharCount(e.target.value.length);
            }}
            rows={1}
            aria-label="Test invisible characters"
          />
          <div className="flex items-center gap-2">
            <span className={statBox}>
              <span className="text-xs text-gray-500 dark:text-gray-400">Length</span>
              <span className="font-bold text-lg">{testCharCount}</span>
            </span>
            <button
              className={buttonStyle}
              onClick={handleTestPaste}
              type="button"
            >
              Paste from Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
            </>
    
  );
}
