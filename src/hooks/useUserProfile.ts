import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./use-auth";
import { db } from "@/integrations/firebase/firebase";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ firstName?: string; lastName?: string; email?: string } | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data() as any);
      } else {
        setProfile({ email: user.email || "" });
      }
    };
    fetchProfile();
  }, [user]);

  return profile;
} 