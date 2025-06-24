"use client";

import { useToast } from "@/hooks/use-toast";
import { db, auth } from "@/integrations/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

/**
 * Hook to allow a user to join a team by invitation code.
 */
export const useTeamJoin = (
  setIsActionLoading: (loading: boolean) => void,
  fetchTeamData: () => Promise<void>
) => {
  const { toast } = useToast();

  const joinTeam = async (teamCode: string) => {
    if (!teamCode) return;

    const user = auth.currentUser;
    if (!user) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsActionLoading(true);

      // 1. Find team by invitation code
      const teamQuery = query(
        collection(db, "teams"),
        where("code", "==", teamCode.toUpperCase())
      );
      const teamSnap = await getDocs(teamQuery);
      const teamDoc = teamSnap.docs[0];

      if (!teamDoc) {
        toast({
          title: "Error",
          description: "Invalid team code",
          variant: "destructive",
        });
        return;
      }

      const teamRef = doc(db, "teams", teamDoc.id);
      const teamData = teamDoc.data();
      const currentMembers: string[] = teamData.members || [];

      // 2. Check if user is already in team
      if (currentMembers.includes(user.uid)) {
        toast({
          title: "Info",
          description: "You are already a member of this team.",
        });
        return;
      }

      // 3. Check if team is full
      if (currentMembers.length >= 20) {
        toast({
          title: "Team full",
          description: "This team has reached the member limit of 20.",
          variant: "destructive",
        });
        return;
      }

      // 4. Update user's profile with team_id
      await updateDoc(doc(db, "users", user.uid), {
        team_id: teamDoc.id,
      });

      // ✅ 5. Add user to members array (safely)
      await updateDoc(teamRef, {
        members: arrayUnion(user.uid), // avoids duplicates
      });

      // 6. Refresh state
      await fetchTeamData();

      toast({
        title: "Success",
        description: `Joined team '${teamData.name}' successfully`,
      });
    } catch (error: any) {
      console.error("Error joining team:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to join team",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  return { joinTeam };
};