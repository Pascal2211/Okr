"use client";

import { useState, useCallback } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebase";
import { useToast } from "./use-toast";
import { Objective } from "@/types/objectives";

export const useObjectives = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchObjectives = useCallback(
    async (teamId: string | null) => {
      if (isLoading) return;
      const user = auth.currentUser;
      if (!user) return;

      try {
        setIsLoading(true);
        setSelectedTeam(teamId);

        let objectivesData: any[] = [];

        if (teamId) {
          // Fetch team objectives using objective_ids from team document
          const teamRef = doc(db, "teams", teamId);
          const teamDoc = await getDoc(teamRef);
          
          if (teamDoc.exists()) {
            const teamData = teamDoc.data();
            const objectiveIds = teamData.objective_ids || [];
            
            if (objectiveIds.length > 0) {
              // Fetch objectives by their IDs
              const objectivesPromises = objectiveIds.map(async (objectiveId: string) => {
                const objectiveRef = doc(db, "objectives", objectiveId);
                const objectiveDoc = await getDoc(objectiveRef);
                if (objectiveDoc.exists()) {
                  return { id: objectiveDoc.id, ...objectiveDoc.data() };
                }
                return null;
              });
              
              const objectivesResults = await Promise.all(objectivesPromises);
              objectivesData = objectivesResults.filter(obj => obj !== null);
            }
          }
        } else {
          // Fetch personal objectives
          const q = query(collection(db, "objectives"), where("user_id", "==", user.uid));
          const snapshot = await getDocs(q);
          objectivesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }

        const processedData = objectivesData.map((obj: any) => {
          let processed: Objective = {
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
      } catch (error: any) {
        console.error("Error fetching objectives:", error);
        toast({
          title: "Error loading objectives",
          description: error.message || "Failed to load objectives",
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