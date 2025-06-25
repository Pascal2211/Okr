
export type Team = {
    id: string;
    name: string;
    code: string;
    created_at: string;
    created_by: string;
  };
  
  export type TeamMember = {
    userId: unknown;
    id: string;
    user_id: string;
    full_name: string;
    team_id: string;
  };
  
  export type TeamContextType = {
    currentTeam: Team | null;
    teamMembers: TeamMember[];
    teamOwner: TeamMember | null;
    isLoading: boolean;
    isActionLoading: boolean;
    fetchTeamData: () => Promise<void>;
    createTeam: (teamName: string) => Promise<void>;
    joinTeam: (teamCode: string) => Promise<void>;
    leaveTeam: () => Promise<void>;
    copyTeamCode: () => void;
  };
  