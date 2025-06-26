// src/hooks/useObjectiveOperations.ts
"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebase";
import { useToast } from "@/hooks/use-toast";
import { Objective } from "@/types/objectives";

export const useObjectiveOperations = () => {
  const { toast } = useToast();

  const fetchObjectives = async (teamId?: string | null): Promise<Objective[]> => {
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
      
      // Process the results to match Objective type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processedResults = results.map((obj: any) => {
        const processed: Objective = {
          ...obj,
          objective_type: obj.objective_type || "standard",
          key_result: obj.key_result || obj.keyResult || "",
        };

        try {
          if (typeof obj.key_results === "string") {
            processed.key_results = JSON.parse(obj.key_results);
          }
          if (typeof obj.objective_rows === "string") {
            processed.objective_rows = JSON.parse(obj.objective_rows);
          }
          if (typeof obj.values === "string") {
            processed.values = JSON.parse(obj.values);
          }
        } catch (e) {
          console.warn("JSON parse error", e);
        }

        return processed;
      });

      return processedResults;
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