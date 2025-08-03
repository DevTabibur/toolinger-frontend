interface AdBannerProps {
  size: "banner" | "rectangle" | "leaderboard" | "sidebar"
  className?: string
}

export function AdBanner({ size, className = "" }: AdBannerProps) {
  const sizeClasses = {
    banner: "h-24 md:h-32",
    rectangle: "h-64 w-full max-w-sm",
    leaderboard: "h-24 w-full",
    sidebar: "h-96 w-full max-w-xs",
  }

  return (
    <div
      className={`bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium">Advertisement</div>
        <div className="text-xs mt-1">{size} ad space</div>
      </div>
    </div>
  )
}
