import { useTeamState } from "./useTeamState";
import { useTeamFetch } from "./useTeamFetch";
import { useTeamCreation } from "./useTeamCreation";
import { auth, db } from "@/integrations/firebase/firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayRemove,
} from "firebase/firestore";

export const useTeamOperations = () => {
  const {
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
  } = useTeamState();

  const { fetchTeamData } = useTeamFetch(
    setIsLoading,
    setCurrentTeam,
    setTeamMembers,
    setTeamOwner
  );

  const { createTeam } = useTeamCreation({
    setCurrentTeam,
    setTeamMembers,
    setTeamOwner,
    setIsActionLoading,
  });

  const leaveTeam = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setIsActionLoading(true);
    try {
      // Remove team_id from user profile
      const profileRef = doc(db, "users", user.uid);
      await updateDoc(profileRef, { team_id: null });

      // Remove user from team's members array
      if (currentTeam && currentTeam.id) {
        const teamRef = doc(db, "teams", currentTeam.id);
        await updateDoc(teamRef, { members: arrayRemove(user.uid) });
      }

      await fetchTeamData();
    } catch (error) {
      console.error("Failed to leave team:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const joinTeam = async (code: string) => {
    const user = auth.currentUser;
    if (!user) return;

    setIsActionLoading(true);
    try {
      const teamQuery = query(
        collection(db, "teams"),
        where("code", "==", code.toUpperCase())
      );
      const teamSnap = await getDocs(teamQuery);
      const teamDoc = teamSnap.docs[0];

      if (!teamDoc) throw new Error("Team not found");

      const teamId = teamDoc.id;

      await updateDoc(doc(db, "users", user.uid), { team_id: teamId });

      // Optional: also add to the team's `members` array if used
      // await updateDoc(doc(db, "teams", teamId), {
      //   members: arrayUnion(user.uid),
      // });

      await fetchTeamData();
    } catch (error) {
      console.error("Failed to join team:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const copyTeamCode = () => {
    if (currentTeam?.code) {
      navigator.clipboard.writeText(currentTeam.code);
    }
  };

  return {
    currentTeam,
    teamMembers,
    teamOwner,
    isLoading,
    isActionLoading,
    fetchTeamData,
    leaveTeam,
    joinTeam,
    createTeam,
    copyTeamCode,
  };
};