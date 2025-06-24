import { useToast } from "../use-toast";
import { db, auth } from "@/integrations/firebase/firebase";
import { Team, TeamMember } from "@/types/team";
import { doc, getDoc } from "firebase/firestore";

export const useTeamFetch = (
  setIsLoading: (value: boolean) => void,
  setCurrentTeam: (team: Team | null) => void,
  setTeamMembers: (members: TeamMember[]) => void,
  setTeamOwner: (owner: TeamMember | null) => void
) => {
  const { toast } = useToast();

  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      // 1. Get current user's profile
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      const profile = profileSnap.data();

      if (!profile || !profile.team_id) {
        setCurrentTeam(null);
        setTeamMembers([]);
        setTeamOwner(null);
        return;
      }

      // 2. Get the team document
      const teamRef = doc(db, "teams", profile.team_id);
      const teamSnap = await getDoc(teamRef);
      const teamData = teamSnap.data();

      if (!teamSnap.exists() || !teamData) {
        setCurrentTeam(null);
        setTeamMembers([]);
        setTeamOwner(null);
        return;
      }

      setCurrentTeam({ id: teamSnap.id, ...teamData } as Team);

      // 3. Resolve each user in the members array
      const memberIds: string[] = teamData.members || [];

      const memberDocs = await Promise.all(
        memberIds.map(async (uid) => {
          const userDocRef = doc(db, "users", uid);
          const userSnap = await getDoc(userDocRef);
          if (!userSnap.exists()) return null;
          const userData = userSnap.data();
          let displayName =
            userData.full_name ||
            userData.name ||
            ((userData.firstName || "") + (userData.lastName ? " " + userData.lastName : "")) ||
            "Unknown";
          displayName = displayName.trim() || "Unknown";
          return {
            id: userSnap.id,
            full_name: displayName,
            ...userData,
          } as TeamMember;
        })
      );

      const members = memberDocs.filter(Boolean) as TeamMember[];
      setTeamMembers(members);

      // 4. Find the team owner from the members
      const ownerDoc = members.find((m) => m.userId === teamData.created_by);
      setTeamOwner(ownerDoc || null);
    } catch {
      setCurrentTeam(null);
      setTeamMembers([]);
      setTeamOwner(null);
      toast({
        title: "Error",
        description: "Failed to fetch team data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchTeamData };
};