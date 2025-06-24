"use client";

import { useToast } from "@/hooks/use-toast";
import { db, auth } from "@/integrations/firebase/firebase";
import { doc, getDocs, query, collection, where, updateDoc } from "firebase/firestore";
import { Team } from "@/types/team";

export const useTeamManagement = (
  currentTeam: Team | null,
  setIsActionLoading: (loading: boolean) => void,
  setCurrentTeam: (team: Team | null) => void,
  setTeamMembers: (members: any[]) => void,
  setTeamOwner: (owner: any) => void
) => {
  const { toast } = useToast();

  const leaveTeam = async () => {
    try {
      setIsActionLoading(true);

      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      console.log("Leaving team...");

      // Fetch the user's profile document
      const profileQuery = query(
        collection(db, "users"),
        where("user_id", "==", user.uid)
      );
      const profileSnap = await getDocs(profileQuery);
      const profileDoc = profileSnap.docs[0];

      if (!profileDoc) {
        throw new Error("User profile not found");
      }

      const profileRef = doc(db, "users", profileDoc.id);

      // Update user's profile to remove team_id
      await updateDoc(profileRef, { team_id: null });

      // Reset local state
      setCurrentTeam(null);
      setTeamMembers([]);
      setTeamOwner(null);

      toast({
        title: "Team left",
        description: "You have left the team successfully",
      });
    } catch (error: any) {
      console.error("Error leaving team:", error);
      toast({
        title: "Error leaving team",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const copyTeamCode = () => {
    if (currentTeam?.code) {
      navigator.clipboard.writeText(currentTeam.code);
      toast({
        title: "Code copied",
        description: "Team code has been copied to clipboard",
      });
    }
  };

  return { leaveTeam, copyTeamCode };
};