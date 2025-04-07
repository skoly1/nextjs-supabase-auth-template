import Link from "next/link"
import { LayoutDashboard, User } from "lucide-react"

export function AppSidebar() {
  return (
    <aside className="hidden w-64 border-r bg-white md:block">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  )
}

