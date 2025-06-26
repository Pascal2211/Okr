"use client";

import { useState, useCallback } from "react";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
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

        let objectivesData: unknown[] = [];

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedData = objectivesData.map((obj: any) => {
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
          description:"Failed to load objectives",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, toast]
  );

  // Add toggleObjectiveStatus
  const toggleObjectiveStatus = async (objective: Objective) => {
    try {
      const newStatus = objective.status === "completed" ? "in_progress" : "completed";
      const objectiveRef = doc(db, "objectives", objective.id);
      await updateDoc(objectiveRef, { status: newStatus });
      setObjectives((prev) =>
        prev.map((obj) =>
          obj.id === objective.id ? { ...obj, status: newStatus } : obj
        )
      );
      toast({
        title: "Objective status updated",
        description: `Objective marked as ${newStatus.replace("_", " ")}`,
      });
    } catch {
      toast({
        title: "Error updating status",
        description: "Could not update objective status.",
        variant: "destructive",
      });
    }
  };

  return {
    isLoading,
    objectives,
    selectedTeam,
    setSelectedTeam,
    fetchObjectives,
    toggleObjectiveStatus,
  };
};