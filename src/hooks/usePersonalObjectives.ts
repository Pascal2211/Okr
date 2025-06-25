"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/integrations/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const usePersonalObjectives = () => {
  const [objectives, setObjectives] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjectives = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, "objectives"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setObjectives(data);
      } catch (err) {
        console.error("Failed to fetch personal objectives:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchObjectives();
  }, []);

  return { objectives, loading };
};