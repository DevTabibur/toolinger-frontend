"use client";
import React, { useRef, useState } from "react";
import { ChevronRight, Home, Download } from "lucide-react";
import Link from "next/link";

// Handwriting font families (replace with actual font names or URLs as needed)
const HANDWRITING_FONTS = [
    { label: "handwriting-1", value: "handwriting1", fontFamily: "'Caveat', cursive" },
    { label: "handwriting-2", value: "handwriting2", fontFamily: "'Indie Flower', cursive" },
    { label: "handwriting-3", value: "handwriting3", fontFamily: "'Pacifico', cursive" },
    { label: "handwriting-4", value: "handwriting4", fontFamily: "'Dancing Script', cursive" },
    { label: "handwriting-5", value: "handwriting5", fontFamily: "'Satisfy', cursive" },
    { label: "handwriting-6", value: "handwriting6", fontFamily: "'Shadows Into Light', cursive" },
    { label: "handwriting-7", value: "handwriting7", fontFamily: "'Gloria Hallelujah', cursive" },
    { label: "handwriting-8", value: "handwriting8", fontFamily: "'Handlee', cursive" },
];

const PAGE_STYLES = [
    { label: "Light blank", value: "light-blank" },
    { label: "A4 line page", value: "a4-line" },
    { label: "Dark blank", value: "dark-blank" },
];

const DEFAULT_TEXT = `Subject Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna eu ex egestas feugiat. Curabitur posuere, enim ut rutrum convallis, erat risus scelerisque nulla, nec dictum erat urna eget erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Mauris eu lobortis nunc. Suspendisse potenti. Etiam euismod, sapien nec suscipit dictum, enim erat rutrum nunc, eget posuere sem dolor eu eros.`;

function getPageStyleClass(pageStyle: string) {
    switch (pageStyle) {
        case "light-blank":
            return "bg-white dark:bg-gray-900";
        case "a4-line":
            return "bg-white dark:bg-gray-900 lined-paper";
        case "dark-blank":
            return "bg-gray-900 text-white";
        default:
            return "bg-white";
    }
}

export default function TextToHandWriting(props: { article?: any, seo?: any }) {
    const [font, setFont] = useState(HANDWRITING_FONTS[0].value);
    const [fontSize, setFontSize] = useState(24);
    const [inkColor, setInkColor] = useState("#a020f0");
    const [pageStyle, setPageStyle] = useState(PAGE_STYLES[0].value);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [text, setText] = useState(DEFAULT_TEXT);

    const previewRef = useRef<HTMLDivElement>(null);

    // Find the font family for the selected handwriting style
    const fontFamily = HANDWRITING_FONTS.find(f => f.value === font)?.fontFamily || "cursive";

    // Download as PNG using html2canvas
    const handleDownload = async () => {
        if (!previewRef.current) return;
        // Dynamically import html2canvas to avoid SSR issues
        const html2canvas = (await import("html2canvas")).default;
        html2canvas(previewRef.current, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement("a");
            link.download = "handwriting.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    return (
        <>
            {/* Google Fonts for handwriting styles */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Indie+Flower&family=Pacifico&family=Dancing+Script:wght@400;700&family=Satisfy&family=Shadows+Into+Light&family=Gloria+Hallelujah&family=Handlee&display=swap');
        .lined-paper {
          background: repeating-linear-gradient(
            to bottom,
            #e3e3e3 0px,
            #e3e3e3 1px,
            transparent 1px,
            transparent 32px
          );
        }
      `}</style>

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
                    <span className="text-foreground font-medium">Text to Handwriting
                    </span>
                </nav>
            </div>

            <div className="container mx-auto py-8 px-4">


                <h1 className="text-2xl font-bold mb-4">Text to Handwriting</h1>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Paste your text and generate a realistic handwriting image. Customize font, ink color, and page style.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Handwriting Style</label>
                            <select
                                className="w-full border rounded px-2 py-1"
                                value={font}
                                onChange={e => setFont(e.target.value)}
                            >
                                {HANDWRITING_FONTS.map(f => (
                                    <option key={f.value} value={f.value}>{f.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Font Size</label>
                            <input
                                type="number"
                                min={14}
                                max={48}
                                className="w-full border rounded px-2 py-1"
                                value={fontSize}
                                onChange={e => setFontSize(Number(e.target.value))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Ink Color</label>
                            <input
                                type="color"
                                className="w-10 h-10 p-0 border rounded"
                                value={inkColor}
                                onChange={e => setInkColor(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Page Style</label>
                            <select
                                className="w-full border rounded px-2 py-1"
                                value={pageStyle}
                                onChange={e => setPageStyle(e.target.value)}
                            >
                                {PAGE_STYLES.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={bold}
                                    onChange={e => setBold(e.target.checked)}
                                />
                                Bold
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={italic}
                                    onChange={e => setItalic(e.target.checked)}
                                />
                                Italic
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Text</label>
                            <textarea
                                className="w-full border rounded px-2 py-1 min-h-[120px]"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </div>
                        <button
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                            onClick={handleDownload}
                            type="button"
                        >
                            <Download size={18} />
                            Download as PNG
                        </button>
                    </div>

                    {/* Preview */}
                    <div>
                        <div
                            ref={previewRef}
                            className={`p-8 min-h-[400px] rounded shadow ${getPageStyleClass(pageStyle)}`}
                            style={{
                                fontFamily,
                                fontSize: `${fontSize}px`,
                                color: inkColor,
                                fontWeight: bold ? "bold" : "normal",
                                fontStyle: italic ? "italic" : "normal",
                                whiteSpace: "pre-wrap",
                                lineHeight: 1.8,
                                transition: "all 0.2s"
                            }}
                        >
                            {text}
                        </div>
                    </div>
                </div>
            </div>

           
        </>
    );
}
