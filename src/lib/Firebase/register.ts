import { registerWithEmailAndPassword } from "@/integrations/firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/firebase";

//creating the user in firebase
//Creating a document in firestore
//returning user result

interface RegisterUserPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterUserResult {
  fullName: string;
  userId: string;
}

export async function registerUser({
  firstname,
  lastname,
  email,
  password,
}: RegisterUserPayload): Promise<RegisterUserResult> {
  const userCredentials = await registerWithEmailAndPassword(email, password);
  const user = userCredentials.user;

  await setDoc(doc(db, "users", user.uid), {
    firstName: firstname,
    lastName: lastname,
    email: user.email,
    adminRights: false,
    superAdmin: false,
    userId: user.uid,
    createdAt: new Date(),
  });

  return{
    fullName: `${firstname} ${lastname}`,
    userId: user.uid,
  }
}


