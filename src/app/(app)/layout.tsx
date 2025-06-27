"use client";
import "../globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A1C22] text-white min-h-screen">
        {/* Responsive Centered Navigation Bar */}
        <nav className="w-full flex justify-center items-center py-4 bg-[#08212b] border-b border-[#123]">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-tight">OKR Dashboard</span>
            <div className="hidden md:flex gap-6 text-base font-medium">
              <Link href="/dashboard" className="hover:text-blue-300 transition-colors">Dashboard</Link>
              <Link href="/objectives" className="hover:text-blue-300 transition-colors">Objectives</Link>
              <Link href="/teams" className="hover:text-blue-300 transition-colors">Teams</Link>
              <Link href="/reports" className="hover:text-blue-300 transition-colors">Reports</Link>
            </div>
            {/* Hamburger for mobile */}
            <div className="md:hidden group relative">
              <button className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none">
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-[#0A1C22] border border-[#123] rounded shadow-lg hidden group-focus-within:block group-hover:block z-50">
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-[#123]">Dashboard</Link>
                <Link href="/objectives" className="block px-4 py-2 hover:bg-[#123]">Objectives</Link>
                <Link href="/teams" className="block px-4 py-2 hover:bg-[#123]">Teams</Link>
                <Link href="/reports" className="block px-4 py-2 hover:bg-[#123]">Reports</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}


