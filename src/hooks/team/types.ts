
import { Team, TeamMember } from "@/types/team";

export interface TeamState {
  currentTeam: Team | null;
  teamMembers: TeamMember[];
  teamOwner: TeamMember | null;
  isLoading: boolean;
  isActionLoading: boolean;
}

export interface TeamActions {
  fetchTeamData: () => Promise<void>;
  createTeam: (teamName: string) => Promise<void>;
  joinTeam: (teamCode: string) => Promise<void>;
  leaveTeam: () => Promise<void>;
  copyTeamCode: () => void;
}

export type TeamOperations = TeamState & TeamActions & {
  setCurrentTeam: (team: Team | null) => void;
  setTeamMembers: (members: TeamMember[]) => void;
  setTeamOwner: (owner: TeamMember | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsActionLoading: (loading: boolean) => void;
};
