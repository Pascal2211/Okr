// FILE: src/components/layouts/DashboardLayout.tsx
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar with fixed width */}
        <div className="w-64 shrink-0">
          <AppSidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 bg-[#0A1C22] text-white overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
