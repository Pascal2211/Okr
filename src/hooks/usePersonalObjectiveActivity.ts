"use client";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "@/integrations/firebase/firebase";

interface Activity {
  type: "created" | "deleted" | "updated";
  title: string;
  timestamp: string;
}

export const usePersonalObjectiveActivity = () => {
  const [personalActivities, setPersonalActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const objectivesRef = collection(db, "objectives");

    const unsubscribe = onSnapshot(objectivesRef, (snapshot) => {
      const changes: Activity[] = snapshot
        .docChanges()
        .map((change) => {
          const data = change.doc.data();

          if (data.user_id === user.uid && data.personalObjective) {
            return {
              type: change.type as "created" | "deleted" | "updated",
              title: data.title,
              timestamp:
                change.doc.metadata.hasPendingWrites 
                  ? new Date().toLocaleString()
                  : new Date().toLocaleString(),
            };
          }
        })
        .filter(Boolean) as Activity[];
      setPersonalActivities((prev) => {
        const all = [...changes, ...prev];
        const unique = all.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.title === item.title && t.type === item.type
            )
        );
        return unique.slice(0, 5); // eller hvor mange du vil vise
      });
    });
    return () => unsubscribe();
  }, []);
  return personalActivities;
};
