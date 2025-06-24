"use client";

import { useEffect, useState } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TeamProvider } from "@/contexts/teamProvider";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data load or wait for context data
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <TeamProvider>
      <DashboardContent />
    </TeamProvider>
  );
}