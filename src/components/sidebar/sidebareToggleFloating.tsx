"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"; // Adjust based on your actual hook export

export function SidebarToggleFloating() {
  const { toggleSidebar } = useSidebar(); // Get the toggle method from the provider

  return (
    <button
      onClick={toggleSidebar}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 text-white p-2 rounded-md backdrop-blur hover:bg-white/20 transition"
      aria-label="Toggle sidebar">
      <Menu className="w-5 h-5" />
    </button>
  );
}