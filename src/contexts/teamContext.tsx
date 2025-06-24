"use client"
import { useContext } from "react";
import { TeamProvider, TeamContext } from "./teamProvider";
import { TeamContextType } from "@/types/team";


export { TeamProvider };

export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
