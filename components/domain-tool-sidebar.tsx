import Link from "next/link"

interface DomainToolSidebarProps {
  relatedTools: string[]
}

export function DomainToolSidebar({ relatedTools }: DomainToolSidebarProps) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
      <ul className="space-y-3">
        {relatedTools.map((tool, index) => (
          <li key={index}>
            <Link href="#" className="text-green-600 hover:text-green-700 text-sm hover:underline transition-colors">
              {tool}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
