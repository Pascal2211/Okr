// FILE: src/hooks/useObjectivesData.ts
"use client";

import { useState, useCallback } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebase";
import { useToast } from "./use-toast";
import { Objective } from "@/types/objectives";

export const useObjectivesData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchObjectives = useCallback(
    async (teamId: string | null) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        setSelectedTeam(teamId);

        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        let q;
        if (teamId) {
          // Team objectives
          q = query(collection(db, "objectives"), where("team_id", "==", teamId));
        } else {
          // Personal objectives for this user
          q = query(
            collection(db, "objectives"),
            where("user_id", "==", user.uid),
            where("personalObjective", "==", true)
          );
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const processedData = data.map((obj: DocumentData) => {
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

        setObjectives(processedData);
      } catch (error: unknown) {
        console.error("Error fetching objectives:", error);
        toast({
          title: "Error loading objectives",
          description: "Failed to load objectives",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, toast]
  );

  return {
    isLoading,
    objectives,
    selectedTeam,
    setSelectedTeam,
    fetchObjectives,
  };
};
