
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sanitizeHtml from "sanitize-html";

const BASE_DIR = path.join(process.cwd(), "public", "content");

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const file = url.searchParams.get("file");

    if (!file) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    // security check
    if (file.includes("..") || file.includes("/") || file.includes("\\")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    // will check both:
    // public/content/pages/<file>
    // public/content/tools/<file>
    const searchPaths = [
      path.join(BASE_DIR, "pages", file),
      path.join(BASE_DIR, "tools", file),
    ];

    let filePath = null;

    for (const p of searchPaths) {
      if (fs.existsSync(p)) {
        filePath = p;
        break;
      }
    }

    if (!filePath) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const raw = fs.readFileSync(filePath, "utf8");

    // extract <head> + <body>
    const head = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
    const body = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || raw;

    const combined = `${head}\n${body}`;

    const clean = sanitizeHtml(combined, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "figure",
        "figcaption",
        "style",
      ]),
      allowedAttributes: {
        "*": ["class", "style", "id"],
        img: ["src", "alt", "style", "width", "height", "loading"],
      },
    });

    return new NextResponse(clean, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
