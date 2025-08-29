import ToolNotFound from "@/components/tools/ToolNotFound";
import dynamic from "next/dynamic";

export const toolRegistry: Record<string, any> = {
    "word-counter": dynamic(() =>
        import("@/components/tools/text").then(m => m.WordCounter)
    ),
    "links-count-checker": dynamic(() =>
        import("@/components/tools/WebsiteManagement").then(m => m.WebsiteLinkCountChecker)
    ),
    // ... the rest
};

export function getToolComponent(slug: string) {
    return toolRegistry[slug] ?? ToolNotFound;
}
