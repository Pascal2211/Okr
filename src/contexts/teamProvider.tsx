"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/firebase";
import { useTeamOperations } from "@/hooks/team/useTeamOperations";
import { TeamContextType } from "@/types/team";

// 👉 Create the context
export const TeamContext = createContext<TeamContextType | undefined>(undefined);

// 👉 Define the provider
export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const {
    currentTeam,
    teamMembers,
    teamOwner,
    isLoading,
    isActionLoading,
    fetchTeamData,
    createTeam,
    joinTeam,
    leaveTeam,
    copyTeamCode,
  } = useTeamOperations();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, () => {
      fetchTeamData(); // Re-fetch when user's profile changes (e.g. team_id updates)
    });

    fetchTeamData(); // Initial fetch

    return () => unsubscribe();
  }, []);

  const value: TeamContextType = {
    currentTeam,
    teamMembers,
    teamOwner,
    isLoading,
    isActionLoading,
    fetchTeamData,
    createTeam,
    joinTeam,
    leaveTeam,
    copyTeamCode,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};