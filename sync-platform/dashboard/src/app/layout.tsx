import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Data Sync Platform",
  description: "Automated sync for AI knowledge bases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-8">
            <div className="font-bold text-xl tracking-tight">SyncPlatform</div>
            <nav className="flex flex-col gap-2">
              <a href="#" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md font-medium text-blue-600 dark:text-blue-400">Dashboard</a>
              <a href="#" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md font-medium">Connections</a>
              <a href="#" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md font-medium">Search</a>
              <a href="#" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md font-medium">Logs</a>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
