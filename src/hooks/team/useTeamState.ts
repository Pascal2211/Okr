"use client"
import { useState } from "react";
import { Team, TeamMember } from "@/types/team";

export const useTeamState = () => {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamOwner, setTeamOwner] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  return {
    currentTeam,
    teamMembers,
    teamOwner,
    isLoading,
    isActionLoading,
    setCurrentTeam,
    setTeamMembers,
    setTeamOwner,
    setIsLoading,
    setIsActionLoading,
  };
};