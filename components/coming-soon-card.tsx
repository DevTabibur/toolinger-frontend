"use client";

import { ComingSoon } from "./coming-soon";

interface ComingSoonCardProps {
  toolName: string;
  description?: string;
  estimatedLaunch?: Date;
  compact?: boolean;
}

export function ComingSoonCard({
  toolName,
  description = "This amazing tool is currently under development.",
  estimatedLaunch = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
  compact = false,
}: ComingSoonCardProps) {
  if (compact) {
    return (
      <div className="bg-card border rounded-lg p-6 text-center">
        <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚀</span>
        </div>
        <h3 className="font-semibold mb-2">{toolName}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          Coming Soon
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <ComingSoon
        title={toolName}
        description={description}
        launchDate={estimatedLaunch}
        showNotifyForm={false}
        className="min-h-[400px]"
      />
    </div>
  );
}
