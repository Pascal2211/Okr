"use client";
import "../globals.css";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "firebase/auth";
import { auth } from "@/integrations/firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebase";

// Custom hook to fetch the current user's profile from Firestore
export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ firstName?: string; lastName?: string; email?: string } | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
          setProfile(snap.data() as { firstName?: string; lastName?: string; email?: string } | null);
      } else {
        setProfile({ email: user.email || "" });
      }
    };
    fetchProfile();
  }, [user]);

  return profile;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user from your auth hook
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const profile = useUserProfile();

  const handleLogout = async () => {
    await signOut(auth);
    // Optionally, redirect or refresh
    window.location.href = "/loginn";
  };

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
            {/* User menu */}
            {profile && (
              <div className="ml-auto relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1C22] border border-[#123] hover:bg-[#123] transition-colors focus:outline-none"
                >
                  <span className="font-semibold">
                    {profile.firstName && profile.lastName
                      ? `${profile.firstName} ${profile.lastName}`
                      : profile.email || "User"}
                  </span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#0A1C22] border border-[#123] rounded shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[#123] text-white"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}


