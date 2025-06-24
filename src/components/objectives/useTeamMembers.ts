"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/integrations/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useTeamMembers = (selectedTeam: string | null) => {
  const [teamMembers, setTeamMembers] = useState<{ id: string; full_name: string }[]>([]);
  const [currentUserFullName, setCurrentUserFullName] = useState<string>("");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (selectedTeam) {
        const membersQuery = query(
          collection(db, "users"),
          where("team_id", "==", selectedTeam)
        );
        const membersSnap = await getDocs(membersQuery);
        const membersData = membersSnap.docs.map((doc) => ({
          id: doc.id,
          full_name: doc.data().full_name,
        }));
        setTeamMembers(membersData);
      } else {
        setTeamMembers([]);
      }
    };

    const fetchCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileQuery = query(
          collection(db, "users"),
          where("user_id", "==", user.uid)
        );
        const profileSnap = await getDocs(profileQuery);
        const profileDoc = profileSnap.docs[0];

        if (profileDoc) {
          const profileData = profileDoc.data();
          setCurrentUserFullName(profileData.full_name || "");
        }
      }
    };

    fetchTeamMembers();
    fetchCurrentUser();
  }, [selectedTeam]);

  return {
    teamMembers,
    currentUserFullName,
    setCurrentUserFullName,
  };
};