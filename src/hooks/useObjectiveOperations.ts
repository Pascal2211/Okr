// src/hooks/useObjectiveOperations.ts
"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebase";
import { useToast } from "@/hooks/use-toast";

export const useObjectiveOperations = () => {
  const { toast } = useToast();

  const fetchObjectives = async (teamId?: string | null) => {
    try {
      const user = auth.currentUser;
      if (!user) return [];

      let q;
      if (teamId) {
        q = query(collection(db, "objectives"), where("team_id", "==", teamId), where("personalObjective", "==", false));
        console.log("[fetchObjectives] Fetching team objectives for teamId:", teamId);
      } else {
        q = query(
          collection(db, "objectives"),
          where("user_id", "==", user.uid),
          where("personalObjective", "==", true)
        );
        console.log("[fetchObjectives] Fetching personal objectives for user:", user.uid);
      }

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("[fetchObjectives] Results:", results);
      return results;
    } catch {
      toast({
        title: "Failed to load objectives",
        description: "There was a problem fetching objectives.",
        variant: "destructive",
      });
      return [];
    }
  };

  return {
    fetchObjectives,
    // other functions like createObjective, deleteObjective, etc.
  };
};