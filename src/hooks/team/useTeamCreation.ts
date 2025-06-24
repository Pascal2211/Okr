import { useToast } from "@/hooks/use-toast";
import { db, auth } from "@/integrations/firebase/firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const useTeamCreation = (setters) => {
  const { toast } = useToast();

  const createTeam = async (teamName: string) => {
    const user = auth.currentUser;
    if (!user || !teamName) return;

    try {
      setters.setIsActionLoading(true);

      const teamId = uuidv4();
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const teamRef = doc(db, "teams", teamId);

      const newTeam = {
        id: teamId,
        name: teamName,
        code,
        created_by: user.uid,
        created_at: new Date().toISOString(),
        members: [user.uid],
      };

      // 1. Save new team document
      await setDoc(teamRef, newTeam);

      // 2. Update user profile with team_id
      await updateDoc(doc(db, "users", user.uid), {
        team_id: teamId,
      });

      // 3. Fetch user profile to store in state
      const userProfileSnap = await getDoc(doc(db, "users", user.uid));
      const userProfile = userProfileSnap.data();

      // 4. Update local state
      setters.setCurrentTeam(newTeam);
      setters.setTeamMembers([userProfile]);
      setters.setTeamOwner(userProfile);

      toast({
        title: "Team created",
        description: `Team '${teamName}' created with code ${code}`,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Could not create team",
        variant: "destructive",
      });
    } finally {
      setters.setIsActionLoading(false);
    }
  };

  return { createTeam };
};