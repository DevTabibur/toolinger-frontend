"use client";
import React, { useEffect, useState } from "react";

type Props = {
  file: string; // e.g. "word_counter_2.html"
  className?: string;
};

const themeOverrideCss = `
:root{
  //--text-heading: #0b1220;    /* heading color in light */
  //--text-paragraph: #374151;  /* paragraph gray in light */
  //--link: #1d4ed8;
  --base-font-size: 18px;
  --heading-scale: 1;
}

/* dark mode colors */
@media (prefers-color-scheme: dark) {
  :root {
    // --text-heading: #ffffff;
    // --text-paragraph: #e6eef8;
    // --link: #60a5fa;
    
  }
}

/* wrapper: NO background set (so page bg remains app's bg) */
.tool-article-wrapper {
  /* no background: leave page/background untouched */
  color: var(--text-paragraph);
  padding: 48px 24px;
  box-sizing: border-box;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: var(--base-font-size);
  line-height: 1.75;
  max-width: 900px;
  margin: 0 auto;
}

/* headings */
.tool-article-wrapper .title,
.tool-article-wrapper .c17,
.tool-article-wrapper h1 {
  font-size: calc(32px * var(--heading-scale));
  color: var(--text-heading);
  font-weight: 700;
  margin-bottom: 12px;
}

.tool-article-wrapper h2,
.tool-article-wrapper .c11 {
  font-size: calc(22px * var(--heading-scale));
  color: var(--text-heading);
  font-weight: 700;
  margin-top: 28px;
  margin-bottom: 10px;
}

.tool-article-wrapper h3,
.tool-article-wrapper .c6 {
  font-size: 18px;
  color: var(--text-heading);
  font-weight: 700;
  margin-top: 20px;
}

/* paragraphs and text spans (use muted color for normal text) */
.tool-article-wrapper p,
.tool-article-wrapper .c2,
.tool-article-wrapper .c0,
.tool-article-wrapper span {
  color: var(--text-paragraph);
  font-size: var(--base-font-size);
  line-height: 1.8;
}

/* strong/bold should use heading color for emphasis */
.tool-article-wrapper .c1,
.tool-article-wrapper strong,
.tool-article-wrapper b,
.tool-article-wrapper .c4,
.tool-article-wrapper .c17 {
  color: var(--text-heading);
  font-weight: 700;
  //color:red;
  
}
  .tool-article-wrapper .c4{
  font-size:25px;
  }

/* lists: reduce gaps and fix bullets alignment */
.tool-article-wrapper ul,
.tool-article-wrapper ol {
  // margin: 0 0 1rem 1.25rem !important;
  //padding: 0;
  //list-style-position: outside;
}

/* exported Google Doc may add weird before pseudo content, normalize it */
.tool-article-wrapper .li-bullet-0:before,
.tool-article-wrapper li:before {
  // margin-left: 0 !important;
  // white-space: normal !important;
  // display: inline-block !important;
  // min-width: 0 !important;
}

/* list items spacing */
.tool-article-wrapper li {
  //margin-bottom: 0.5rem !important;
  // padding-left: 0 !important;
}

/* প্রথম li */
.tool-article-wrapper ul > li:first-child,
.tool-article-wrapper ol > li:first-child {
  margin-top: 20px !important;
}

/* শেষ li */
.tool-article-wrapper ul > li:last-child,
.tool-article-wrapper ol > li:last-child {
  margin-bottom: 20px !important;
}

/* remove huge top/bottom paddings coming from exported classes */
.tool-article-wrapper .c2 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* images */
.tool-article-wrapper img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem 0;
}

/* links */
.tool-article-wrapper a {
  color: var(--link);
  text-decoration: underline;
}

/* small screens */
@media (max-width: 768px) {
  .tool-article-wrapper {
    padding: 28px 16px;
    font-size: 16px;
  }
  .tool-article-wrapper .title,
  .tool-article-wrapper .c17 {
    font-size: 28px;
  }
  .tool-article-wrapper h2 { font-size: 20px; }
}
`;

export default function ArticleRenderer({
  file = "word_counter_2.html",
  className,
}: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    setHtml(null);

    fetch(`/api/article?file=${encodeURIComponent(file)}`)
      .then(async (res) => {
        if (!res.ok) {
          // try to parse JSON error message
          const txt = await res.text().catch(() => "");
          try {
            const json = JSON.parse(txt);
            throw new Error(json?.error || `HTTP ${res.status}`);
          } catch {
            throw new Error(txt || `HTTP ${res.status}`);
          }
        }
        return res.text();
      })
      .then((data) => {
        setHtml(data);
      })
      .catch((e) => {
        setErr(String(e.message || e));
      })
      .finally(() => setLoading(false));
  }, [file]);

  if (loading) return <div>Loading article…</div>;
  if (err) return <div style={{ color: "red" }}>Error: {err}</div>;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeOverrideCss }} />
      <main className="tool-article-wrapper">
        <div dangerouslySetInnerHTML={{ __html: html || "" }} />
      </main>
    </>
  );
}
