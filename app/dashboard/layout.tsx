import Link from "next/link";
import { FileText, PlusCircle, Settings, LogOut, Home } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="h-14 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
            <Link href="/dashboard" className="font-semibold text-lg flex items-center gap-2">
              <span className="bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 p-1 rounded-md">
                <Home className="w-4 h-4" />
              </span>
              CMS
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Posts
            </Link>
            <Link
              href="/dashboard/posts/new"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              New Post
            </Link>
          </nav>

          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 md:hidden">
          <Link href="/dashboard" className="font-semibold text-lg">
            CMS
          </Link>
          {/* Mobile menu toggle would go here */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
