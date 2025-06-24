// FILE: src/hooks/use-auth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/integrations/firebase/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<null | ReturnType<typeof auth.currentUser>>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};