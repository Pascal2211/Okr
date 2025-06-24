"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ObjectiveContextType {
  activeTab: string;
  selectedTeam: string | null;
  isTeamTab: boolean;
}

const ObjectiveContext = createContext<ObjectiveContextType | undefined>(undefined);

interface ObjectiveProviderProps {
  children: ReactNode;
  activeTab: string;
  selectedTeam: string | null;
}

export function ObjectiveProvider({ 
  children, 
  activeTab, 
  selectedTeam 
}: ObjectiveProviderProps) {
  const isTeamTab = activeTab === "teams";
  const router = useRouter();

  // Debug logging
  useEffect(() => {
    console.log("ObjectiveContext updated:", {
      activeTab,
      selectedTeam,
      isTeamTab
    });
  }, [activeTab, selectedTeam, isTeamTab]);

  const value = {
    activeTab,
    selectedTeam,
    isTeamTab,
  };

  return (
    <ObjectiveContext.Provider value={value}>
      {children}
    </ObjectiveContext.Provider>
  );
}

export function useObjectiveContext() {
  const context = useContext(ObjectiveContext);
  if (context === undefined) {
    throw new Error("useObjectiveContext must be used within an ObjectiveProvider");
  }
  return context;
} 