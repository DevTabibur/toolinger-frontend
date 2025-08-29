import "server-only";
import { cache } from "react";

export const getToolPage = cache(async (toolSlug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/${toolSlug}`, {
    next: { revalidate: 60, tags: [`tool:${toolSlug}`] },  // ISR-friendly
  });
  if (!res.ok) return null;
  return res.json();
});
