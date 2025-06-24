// src/hooks/useCreateObjective.ts
"use client";
import { db } from "@/integrations/firebase/firebase";
import { doc, collection, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useObjectiveContext } from "@/contexts/ObjectiveContext";

export const useCreateObjective = () => {
  const { toast } = useToast();
  const { isTeamTab, selectedTeam } = useObjectiveContext();

  const createObjective = async (data: any) => {
    try {
      const ref = doc(collection(db, "objectives"));
      
      // Debug logging
      console.log("Creating objective with context:", {
        isTeamTab,
        selectedTeam,
        data
      });
      
      // Automatically set personalObjective based on the active tab
      const personalObjective = !isTeamTab; // false for team tab, true for personal tab
      
      const payload = {
        id: ref.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "in_progress",
        personalObjective, // Set based on active tab
        team_id: isTeamTab && selectedTeam ? selectedTeam : null, // Add team_id for team objectives
        ...data,
      };

      console.log("Objective payload:", payload);

      await setDoc(ref, payload);

      // If this is a team objective, add the objective ID to the team document
      if (isTeamTab && selectedTeam) {
        console.log("Adding objective to team:", selectedTeam, "Objective ID:", ref.id);
        const teamRef = doc(db, "teams", selectedTeam);
        await updateDoc(teamRef, {
          objective_ids: arrayUnion(ref.id)
        });
        console.log("Successfully added objective to team");
      } else if (isTeamTab && !selectedTeam) {
        console.log("WARNING: Team tab active but no team selected. Objective created without team association.");
        toast({
          title: "Warning",
          description: "Team objective created but no team was selected. Please select a team first.",
          variant: "destructive",
        });
      } else {
        console.log("Not adding to team - isTeamTab:", isTeamTab, "selectedTeam:", selectedTeam);
      }

      toast({
        title: "Objective Created",
        description: `The ${isTeamTab ? 'team' : 'personal'} objective was successfully created.`,
      });

      return ref.id;
    } catch (error: any) {
      console.error("Error creating objective:", error);
      toast({
        title: "Creation failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { createObjective };
};