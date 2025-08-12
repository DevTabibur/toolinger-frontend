"use client";
import React, { useRef, useState } from "react";
import { ChevronRight, Home, Download, Copy, FileDown, FileUp } from "lucide-react";
import Link from "next/link";

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

export default function TextToImage() {
    const [inputText, setInputText] = useState(DEFAULT_TEXT);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [fontSize, setFontSize] = useState(48);
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

    // Draw text to canvas
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

        // Calculate position
        let x = imgWidth / 2;
        if (hAlign === "left") x = 0;
        if (hAlign === "right") x = imgWidth;

        let y = imgHeight / 2;
        if (vAlign === "top") y = 0;
        if (vAlign === "bottom") y = imgHeight;

        // Handle multi-line text
        const lines = inputText.split("\n");
        const lineHeight = fontSize * 1.2;
        let startY = y;
        if (vAlign === "middle") {
            startY = y - ((lines.length - 1) / 2) * lineHeight;
        } else if (vAlign === "top") {
            startY = 0;
        } else if (vAlign === "bottom") {
            startY = imgHeight - lines.length * lineHeight + lineHeight;
        }

        lines.forEach((line, i) => {
            ctx.fillText(line, x, startY + i * lineHeight);
        });
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


            <div className="container mx-auto py-8 px-4">
                
                <h1 className="text-2xl font-bold mb-4">Text to Image Generator</h1>
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
                        <canvas
                            ref={canvasRef}
                            width={imgWidth}
                            height={imgHeight}
                            className="border rounded shadow"
                            style={{ background: bgColor, maxWidth: "100%", height: "auto" }}
                        />
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
        </>

    );
}
