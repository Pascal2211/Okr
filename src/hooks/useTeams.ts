import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/integrations/firebase/firebase";
import { db } from "@/integrations/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Team } from "@/types/objectives";

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [userProfile, setUserProfile] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchTeams = async () => {
    try {
      setIsLoading(true);

      const user = auth.currentUser;
      if (!user) {
        console.log("No user found, waiting for authentication...");
        setIsLoading(false);
        return null;
      }

      console.log("Current user ID:", user.uid);

      const profileRef = query(
        collection(db, "users"),
        where("user_id", "==", user.uid)
      );
      const profileSnap = await getDocs(profileRef);
      const profileData = profileSnap.docs[0]?.data();
      setUserProfile(profileData);

      console.log("User profile:", profileData);

      // Fetch teams where the user is a member
      const teamsRef = collection(db, "teams");
      const teamsSnap = await getDocs(teamsRef);
      const allTeams = teamsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      console.log("All teams from Firebase:", allTeams);
      
      // Filter teams where the user is a member
      const userTeams = allTeams.filter((team: unknown) => {
        console.log(`Checking team ${team.name}:`, {
          teamId: team.id,
          members: team.members,
          userInMembers: team.members && team.members.includes(user.uid)
        });
        return team.members && team.members.includes(user.uid);
      });

      console.log("User teams after filtering:", userTeams);

      setTeams(userTeams);
      setIsLoading(false);
      return user;
    } catch (error: unknown) {
      console.error("Error fetching teams:", error);
      toast({
        title: "Error loading data",
        description: error.message || "Failed to load your teams",
        variant: "destructive",
      });
      setIsLoading(false);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated, fetching teams...");
        fetchTeams();
      } else {
        console.log("User signed out, clearing teams...");
        setTeams([]);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    teams,
    userProfile,
    fetchTeams,
    isLoading,
  };
};
