"use client";
import React, { useRef, useState, useCallback } from "react";

// Aspect ratios for cropping
const ASPECTS = [
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "2:3", value: 2 / 3 },
  { label: "Free", value: null },
];

const ICONS = {
  rotateLeft: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M7 7V3M7 3H3M7 3l3.5 3.5M7 7a7 7 0 1 1-2.1 4.9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  rotateRight: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M17 7V3M17 3h4M17 3l-3.5 3.5M17 7a7 7 0 1 0 2.1 4.9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  flipH: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M3 12h18M12 3v18M16 8l-4 4 4 4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  flipV: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M12 3v18M3 12h18M8 16l4-4-4-4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  reset: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M4 4v5h5M20 20v-5h-5M5 19A9 9 0 1 1 19 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

interface CropState {
  x: number;
  y: number;
  width: number;
  height: number;
  aspect: number | null;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

const DEFAULT_CROP: CropState = {
  x: 100,
  y: 60,
  width: 400,
  height: 225,
  aspect: 16 / 9,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
};

const CropImageOnline: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropState>({ ...DEFAULT_CROP });
  const [selectedAspect, setSelectedAspect] = useState(ASPECTS[0].value);
  const [imgNatural, setImgNatural] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setCrop({ ...DEFAULT_CROP, aspect: selectedAspect });
      };
      reader.readAsDataURL(file);
    }
  };

  // Set natural image size for preview/crop calculations
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImgNatural({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
    // Reset crop to fit image
    setCrop((prev) => ({
      ...prev,
      x: Math.round(e.currentTarget.naturalWidth / 4),
      y: Math.round(e.currentTarget.naturalHeight / 4),
      width: Math.round(e.currentTarget.naturalWidth / 2),
      height: Math.round(e.currentTarget.naturalHeight / 2),
    }));
  };

  // Aspect ratio change
  const handleAspectChange = (aspect: number | null) => {
    setSelectedAspect(aspect);
    setCrop((prev) => {
      let width = prev.width;
      let height = prev.height;
      if (aspect) {
        width = prev.width;
        height = Math.round(width / aspect);
        if (height > imgNatural.height) {
          height = imgNatural.height;
          width = Math.round(height * aspect);
        }
      }
      return {
        ...prev,
        aspect,
        width,
        height,
      };
    });
  };

  // Move crop area by dragging
  const handleCropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setCropStart({ x: crop.x, y: crop.y });
  };
  const handleCropMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !dragStart || !cropStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setCrop((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(imgNatural.width - prev.width, cropStart.x + dx)),
      y: Math.max(0, Math.min(imgNatural.height - prev.height, cropStart.y + dy)),
    }));
  };
  const handleCropMouseUp = () => {
    setDragging(false);
    setDragStart(null);
    setCropStart(null);
  };

  // Manual crop size input
  const handleCropInput = (key: "width" | "height" | "x" | "y", value: number) => {
    setCrop((prev) => {
      let newCrop = { ...prev, [key]: value };
      // Clamp values
      if (key === "width") newCrop.width = Math.max(10, Math.min(imgNatural.width - prev.x, value));
      if (key === "height") newCrop.height = Math.max(10, Math.min(imgNatural.height - prev.y, value));
      if (key === "x") newCrop.x = Math.max(0, Math.min(imgNatural.width - prev.width, value));
      if (key === "y") newCrop.y = Math.max(0, Math.min(imgNatural.height - prev.height, value));
      return newCrop;
    });
  };

  // Rotate/flip
  const handleRotate = (dir: "left" | "right") => {
    setCrop((prev) => ({
      ...prev,
      rotation: dir === "left" ? prev.rotation - 90 : prev.rotation + 90,
    }));
  };
  const handleFlip = (axis: "h" | "v") => {
    setCrop((prev) => ({
      ...prev,
      scaleX: axis === "h" ? prev.scaleX * -1 : prev.scaleX,
      scaleY: axis === "v" ? prev.scaleY * -1 : prev.scaleY,
    }));
  };

  // Reset crop
  const handleReset = () => {
    setCrop({
      ...DEFAULT_CROP,
      aspect: selectedAspect,
      x: Math.round(imgNatural.width / 4),
      y: Math.round(imgNatural.height / 4),
      width: Math.round(imgNatural.width / 2),
      height: Math.round(imgNatural.height / 2),
    });
  };

  // Download cropped image
  const handleDownload = useCallback(() => {
    if (!imageRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    // Move to center for rotation/flip
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((crop.rotation * Math.PI) / 180);
    ctx.scale(crop.scaleX, crop.scaleY);
    ctx.drawImage(
      imageRef.current,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    ctx.restore();
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = canvas.toDataURL();
    link.click();
  }, [crop]);

  // Move crop area with arrow buttons
  const handleMove = (dir: "up" | "down" | "left" | "right") => {
    setCrop((prev) => {
      const step = 10;
      let x = prev.x;
      let y = prev.y;
      if (dir === "up") y = Math.max(0, prev.y - step);
      if (dir === "down") y = Math.min(imgNatural.height - prev.height, prev.y + step);
      if (dir === "left") x = Math.max(0, prev.x - step);
      if (dir === "right") x = Math.min(imgNatural.width - prev.width, prev.x + step);
      return { ...prev, x, y };
    });
  };

  // Optionally, add zoom (not in original, but referenced in old code)
  // For now, we skip zoom for simplicity

  return (
    <div className="crop-image-online">
      <h2>Crop Image Online</h2>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={() => fileInputRef.current?.click()}>Upload Image</button>
      {image && (
        <div className="cropper-container" style={{ marginTop: 20 }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              border: "1px solid #ccc",
              background: "#f9f9f9",
              width: crop.width,
              height: crop.height,
              cursor: dragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleCropMouseDown}
            onMouseMove={handleCropMouseMove}
            onMouseUp={handleCropMouseUp}
            onMouseLeave={handleCropMouseUp}
          >
            <img
              ref={imageRef}
              src={image}
              alt="To crop"
              style={{
                position: "absolute",
                left: -crop.x,
                top: -crop.y,
                width: imgNatural.width,
                height: imgNatural.height,
                transform: `rotate(${crop.rotation}deg) scaleX(${crop.scaleX}) scaleY(${crop.scaleY})`,
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
              onLoad={handleImageLoad}
            />
            {/* Optionally, add a crop rectangle overlay here */}
          </div>
          <div className="controls" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button onClick={() => handleRotate("left")} title="Rotate Left">{ICONS.rotateLeft}</button>
            <button onClick={() => handleRotate("right")} title="Rotate Right">{ICONS.rotateRight}</button>
            <button onClick={() => handleFlip("h")} title="Flip Horizontal">{ICONS.flipH}</button>
            <button onClick={() => handleFlip("v")} title="Flip Vertical">{ICONS.flipV}</button>
            <button onClick={handleReset} title="Reset">{ICONS.reset}</button>
            <button onClick={() => handleMove("up")} title="Move Up">↑</button>
            <button onClick={() => handleMove("down")} title="Move Down">↓</button>
            <button onClick={() => handleMove("left")} title="Move Left">←</button>
            <button onClick={() => handleMove("right")} title="Move Right">→</button>
          </div>
          <div className="aspect-ratios" style={{ marginTop: 12 }}>
            {ASPECTS.map((a) => (
              <button
                key={a.label}
                onClick={() => handleAspectChange(a.value)}
                style={{
                  fontWeight: selectedAspect === a.value ? "bold" : "normal",
                  marginRight: 8,
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ marginRight: 8 }}>
              X: <input
                type="number"
                value={crop.x}
                min={0}
                max={imgNatural.width - crop.width}
                onChange={e => handleCropInput("x", Number(e.target.value))}
                style={{ width: 60 }}
              />
            </label>
            <label style={{ marginRight: 8 }}>
              Y: <input
                type="number"
                value={crop.y}
                min={0}
                max={imgNatural.height - crop.height}
                onChange={e => handleCropInput("y", Number(e.target.value))}
                style={{ width: 60 }}
              />
            </label>
            <label style={{ marginRight: 8 }}>
              W: <input
                type="number"
                value={crop.width}
                min={10}
                max={imgNatural.width - crop.x}
                onChange={e => handleCropInput("width", Number(e.target.value))}
                style={{ width: 60 }}
              />
            </label>
            <label style={{ marginRight: 8 }}>
              H: <input
                type="number"
                value={crop.height}
                min={10}
                max={imgNatural.height - crop.y}
                onChange={e => handleCropInput("height", Number(e.target.value))}
                style={{ width: 60 }}
              />
            </label>
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={handleDownload}>Download Cropped Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropImageOnline;
