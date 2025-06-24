import { useEffect, useState } from "react";
import { db, auth } from "@/integrations/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useTeams } from "./useTeams";
import { Objective } from "@/types/objectives";

interface TeamWithMembers {
  id: string;
  name: string;
  code: string;
  created_at: string;
  created_by: string;
  members?: string[];
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    activeObjectives: 0,
    completedObjectives: 0,
    keyResults: 0,
    teamMembers: 0,
  });

  const [teamStats, setTeamStats] = useState({
    activeTeamObjectives: 0,
    completedTeamObjectives: 0,
    teamMembers: 0,
  });

  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [teamObjectives, setTeamObjectives] = useState<Objective[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { teams, userProfile } = useTeams();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);

        const user = auth.currentUser;
        if (!user) return;

        // Fetch personal objectives
        const personalQuery = query(
          collection(db, "objectives"),
          where("user_id", "==", user.uid),
          where("personalObjective", "==", true)
        );

        const personalSnapshot = await getDocs(personalQuery);
        const personalObjectives = personalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Objective[];

        const activeObjectives = personalObjectives.filter((o) => o.status !== "completed").length;
        const completedObjectives = personalObjectives.filter((o) => o.status === "completed").length;

        setObjectives(personalObjectives);
        setStats(prev => ({
          ...prev,
          activeObjectives,
          completedObjectives,
        }));

        // Fetch team objectives if user is part of a team
        if (teams.length > 0) {
          const teamIds = teams.map(team => team.id);
          const teamQuery = query(
            collection(db, "objectives"),
            where("team_id", "in", teamIds),
            where("personalObjective", "==", false)
          );

          const teamSnapshot = await getDocs(teamQuery);
          const teamObjectivesData = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Objective[];

          const activeTeamObjectives = teamObjectivesData.filter((o) => o.status !== "completed").length;
          const completedTeamObjectives = teamObjectivesData.filter((o) => o.status === "completed").length;

          setTeamObjectives(teamObjectivesData);
          setTeamStats({
            activeTeamObjectives,
            completedTeamObjectives,
            teamMembers: teams.reduce((total, team) => total + ((team as TeamWithMembers).members?.length || 0), 0),
          });
        }
      } catch (err: unknown) {
        console.error("Failed to fetch dashboard stats", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [teams, userProfile]);

  return { 
    stats, 
    teamStats,
    objectives, 
    teamObjectives,
    teamInfo: teams.length > 0 ? teams[0] as TeamWithMembers : null, // Return first team as current team
    teamMembers: teams.length > 0 ? (teams[0] as TeamWithMembers)?.members || [] : [],
    isLoading, 
    error 
  };
};