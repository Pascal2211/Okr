import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const registerWithEmailAndPassword = async (email, password) => {
    try{
        const useCredential = await createUserWithEmailAndPassword(auth, email, password);
        return useCredential;
    }catch(error){
        console.error("Error creating user", error);
        throw error;
    };
};

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        const useCredential = await signInWithEmailAndPassword(auth, email, password);
        return useCredential.user
    }catch(error){
        console.error("Something went wrong with the loggin", error);
        throw error;
    };
};

export const logout = async () => {
    try{
        await signOut(auth);
        console.log("User logged out succesfully");
    }catch(error){
        console.error("Something went wrong with the loggout", error);
        throw error;
    };
};


