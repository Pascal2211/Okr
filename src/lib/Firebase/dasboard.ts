// src/lib/firebase/dashboard.ts

import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebase";

export async function getDashboardData(teamId?: string | null) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Example query: Fetch objectives where owner is the user
    const q = teamId
      ? query(collection(db, "objectives"), where("team_id", "==", teamId))
      : query(
          collection(db, "objectives"),
          where("personalObjective", "==", true),
          where("user_id", "==", user.uid)
        );
    const snapshot = await getDocs(q);

    const objectives = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<{ id: string; status?: string; [key: string]: unknown }>;

    // TODO: You can fetch more here: team info, members, etc.

    return {
      stats: {
        activeObjectives: objectives.filter(obj => obj.status === "in_progress").length,
        completedObjectives: objectives.filter(obj => obj.status === "completed").length,
        keyResults: objectives.length * 3, // Just an example
        teamMembers: 5, // Placeholder
      },
      teamInfo: null, // Replace with actual team data
      teamMembers: [], // Replace with actual team members
      objectives,
    };
  } catch (err) {
    console.error("Failed to fetch dashboard data", err);
    return {
      stats: {
        activeObjectives: 0,
        completedObjectives: 0,
        keyResults: 0,
        teamMembers: 0,
      },
      teamInfo: null,
      teamMembers: [],
      objectives: [],
    };
  }
}