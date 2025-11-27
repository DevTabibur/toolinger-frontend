"use client";
import React, { useRef, useState } from "react";
import { ChevronRight, Home, Download, Copy, FileDown, FileUp } from "lucide-react";
import Link from "next/link";
import ReleavantToolsSidebar from "@/components/ReleavantToolsSidebar";
import { popularTools } from "@/lib/categories";
import ArticleRenderer from "@/utils/ArticleRenderer";

const otherTools = [

    {
        id: "text-to-handwriting",
        name: "Text to Handwriting",
        description: "Convert typed text into a handwriting style",
        category: "Image Tools",
        slug: "text-to-handwriting",
        categorySlug: "image-tools",
        icon: "✍️",
    },
];


// Font families for selection
const FONT_FAMILIES = [
    { label: "Sans-Serif", value: "sans-serif", style: "Arial, Helvetica, sans-serif" },
    { label: "Serif", value: "serif", style: "Times New Roman, Times, serif" },
    { label: "Monospace", value: "monospace", style: "Courier New, Courier, monospace" },
    { label: "Cursive", value: "cursive", style: "Comic Sans MS, Comic Sans, cursive" },
    { label: "Fantasy", value: "fantasy", style: "Impact, fantasy" },
];

const IMAGE_FORMATS = [
    { label: "PNG", value: "png" },
    { label: "JPEG", value: "jpeg" },
    { label: "JPG", value: "jpg" },
];

const DEFAULT_TEXT = "";

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    // Split by explicit newlines first
    const paragraphs = text.split('\n');
    const lines: string[] = [];
    for (let p = 0; p < paragraphs.length; p++) {
        let words = paragraphs[p].split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            let testLine = line ? line + ' ' + words[n] : words[n];
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && line) {
                lines.push(line);
                line = words[n];
            } else {
                line = testLine;
            }
        }
        lines.push(line);
    }
    return lines;
}

export default function TextToImage(props: { article?: any, seo?: any }) {
    const [inputText, setInputText] = useState(DEFAULT_TEXT);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    // Set default font size to 12
    const [fontSize, setFontSize] = useState(12);
    const [fontFamily, setFontFamily] = useState(FONT_FAMILIES[0].value);
    const [fontWeight, setFontWeight] = useState(false);
    const [fontStyle, setFontStyle] = useState(false);
    const [hAlign, setHAlign] = useState("center");
    const [vAlign, setVAlign] = useState("middle");
    const [imgWidth, setImgWidth] = useState(600);
    const [imgHeight, setImgHeight] = useState(300);
    const [format, setFormat] = useState(IMAGE_FORMATS[0].value);
    const [copied, setCopied] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Helper to get font CSS string
    const getFontCSS = () => {
        const family = FONT_FAMILIES.find(f => f.value === fontFamily)?.style || "sans-serif";
        return `${fontWeight ? "bold " : ""}${fontStyle ? "italic " : ""}${fontSize}px ${family}`;
    };

    // Draw text to canvas with word wrapping
    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = imgWidth;
        canvas.height = imgHeight;

        // Fill background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, imgWidth, imgHeight);

        // Set text styles
        ctx.font = getFontCSS();
        ctx.fillStyle = textColor;
        ctx.textAlign = hAlign as CanvasTextAlign;
        ctx.textBaseline = vAlign === "top" ? "top" : vAlign === "middle" ? "middle" : "bottom";

        // Calculate max text width (leave a little padding)
        const padding = 20;
        const maxTextWidth = imgWidth - 2 * padding;

        // Wrap text
        const wrappedLines = wrapText(ctx, inputText, maxTextWidth);

        // Calculate vertical position
        const lineHeight = fontSize * 1.2;
        let totalTextHeight = wrappedLines.length * lineHeight;
        let y: number;
        if (vAlign === "top") {
            y = padding + lineHeight / 2;
        } else if (vAlign === "bottom") {
            y = imgHeight - totalTextHeight + lineHeight / 2 - padding;
        } else {
            // middle
            y = imgHeight / 2 - totalTextHeight / 2 + lineHeight / 2;
        }

        // Calculate x position for alignment
        let x: number;
        if (hAlign === "left") {
            x = padding;
            ctx.textAlign = "left";
        } else if (hAlign === "right") {
            x = imgWidth - padding;
            ctx.textAlign = "right";
        } else {
            x = imgWidth / 2;
            ctx.textAlign = "center";
        }

        // Draw each line
        for (let i = 0; i < wrappedLines.length; i++) {
            ctx.fillText(wrappedLines[i], x, y + i * lineHeight);
        }
    };

    // Redraw canvas on every relevant change
    React.useEffect(() => {
        drawCanvas();
        // eslint-disable-next-line
    }, [
        inputText,
        bgColor,
        textColor,
        fontSize,
        fontFamily,
        fontWeight,
        fontStyle,
        hAlign,
        vAlign,
        imgWidth,
        imgHeight
    ]);

    // Download image
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        let mimeType = "image/png";
        let ext = "png";
        if (format === "jpeg" || format === "jpg") {
            mimeType = "image/jpeg";
            ext = "jpg";
        }
        link.href = canvas.toDataURL(mimeType);
        link.download = `text-image.${ext}`;
        link.click();
    };

    // Copy image to clipboard
    const handleCopy = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        try {
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                // @ts-ignore
                await navigator.clipboard.write([
                    new window.ClipboardItem({ [blob.type]: blob })
                ]);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }, format === "png" ? "image/png" : "image/jpeg");
        } catch (err) {
            alert("Copy failed. Your browser may not support this feature.");
        }
    };

    // Handle file upload (load text from file)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setInputText(event.target?.result as string);
        };
        reader.readAsText(file);
    };

    // Handle file download (save text to file)
    const handleFileDownload = () => {
        const blob = new Blob([inputText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "text.txt";
        link.click();
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
                    <span className="text-foreground font-medium">Text to Image Generator
                    </span>
                </nav>
            </div>




            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-8 on md+ */}
                    <div className="md:col-span-8 col-span-12">

                        <div className="border rounded-lg p-4 mb-8 bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">Text to Image Generator</h1>
                            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                                Enter your text below and generate an image from it. Customize the font, size, and colors to create your own unique text image.
                            </p>


                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Controls */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-medium mb-1">Text</label>
                                        <textarea
                                            className="w-full border rounded p-2"
                                            rows={5}
                                            value={inputText}
                                            onChange={e => setInputText(e.target.value)}
                                            placeholder="Enter your text here"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <label className="flex items-center gap-1 cursor-pointer">
                                                <FileUp size={16} />
                                                <input
                                                    type="file"
                                                    accept=".txt"
                                                    className="hidden"
                                                    onChange={handleFileUpload}
                                                />
                                                Upload
                                            </label>
                                            <button
                                                type="button"
                                                className="flex items-center gap-1 px-2 py-1 border rounded text-sm"
                                                onClick={handleFileDownload}
                                            >
                                                <FileDown size={16} />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Font Family</label>
                                            <select
                                                className="border rounded p-1"
                                                value={fontFamily}
                                                onChange={e => setFontFamily(e.target.value)}
                                            >
                                                {FONT_FAMILIES.map(f => (
                                                    <option key={f.value} value={f.value}>{f.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Font Size</label>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-20"
                                                min={8}
                                                max={200}
                                                value={fontSize}
                                                onChange={e => setFontSize(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Font Weight</label>
                                            <button
                                                type="button"
                                                className={`px-2 py-1 border rounded ${fontWeight ? "bg-gray-200 font-bold" : ""}`}
                                                onClick={() => setFontWeight(w => !w)}
                                            >
                                                Bold
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Font Style</label>
                                            <button
                                                type="button"
                                                className={`px-2 py-1 border rounded ${fontStyle ? "bg-gray-200 italic" : ""}`}
                                                onClick={() => setFontStyle(s => !s)}
                                            >
                                                Italic
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Text Color</label>
                                            <input
                                                type="color"
                                                value={textColor}
                                                onChange={e => setTextColor(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Background Color</label>
                                            <input
                                                type="color"
                                                value={bgColor}
                                                onChange={e => setBgColor(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Horizontal Align</label>
                                            <select
                                                className="border rounded p-1"
                                                value={hAlign}
                                                onChange={e => setHAlign(e.target.value)}
                                            >
                                                <option value="left">Left</option>
                                                <option value="center">Center</option>
                                                <option value="right">Right</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Vertical Align</label>
                                            <select
                                                className="border rounded p-1"
                                                value={vAlign}
                                                onChange={e => setVAlign(e.target.value)}
                                            >
                                                <option value="top">Top</option>
                                                <option value="middle">Middle</option>
                                                <option value="bottom">Bottom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Image Width</label>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-24"
                                                min={100}
                                                max={2000}
                                                value={imgWidth}
                                                onChange={e => setImgWidth(Number(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">Image Height</label>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-24"
                                                min={100}
                                                max={2000}
                                                value={imgHeight}
                                                onChange={e => setImgHeight(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Image Format</label>
                                        <select
                                            className="border rounded p-1"
                                            value={format}
                                            onChange={e => setFormat(e.target.value)}
                                        >
                                            {IMAGE_FORMATS.map(f => (
                                                <option key={f.value} value={f.value}>{f.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* Canvas and actions */}
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className="overflow-auto"
                                        // style={{
                                        //     width: imgWidth,
                                        //     height: imgHeight,
                                        //     overflow: "auto",
                                        //     maxWidth: "100%",
                                        //     borderRadius: "0.375rem",
                                        //     border: "1px solid #e5e7eb",
                                        //     boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                                        //     background: bgColor,
                                        //     display: "flex",
                                        //     alignItems: "center",
                                        //     justifyContent: "center",
                                        //     padding: 0,
                                        // }}
                                    >
                                        <canvas
                                            ref={canvasRef}
                                            width={imgWidth}
                                            height={imgHeight}
                                            style={{
                                                background: bgColor,
                                                display: "block",
                                                maxWidth: "100%",
                                                height: imgHeight,
                                                width: imgWidth,
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            onClick={handleDownload}
                                        >
                                            <Download size={18} />
                                            Download
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={handleCopy}
                                            disabled={copied}
                                        >
                                            <Copy size={18} />
                                            {copied ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ArticleRenderer file="text_to_image.html" />
                    </div>

                    <div className="md:col-span-4 col-span-12">
                        <div className="w-full md:w-80">
                            <ReleavantToolsSidebar title="Popular Tools" tools={popularTools as any} />
                            <ReleavantToolsSidebar title="Other Tools" tools={otherTools as any} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
