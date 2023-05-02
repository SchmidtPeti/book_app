import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";



export const isUsernameUnique = async (username) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking for username uniqueness:", error);
      return false;
    }
};
export const handleGoogleSignIn = async ({setError,navigate}) => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    navigate("/");
  } catch (error) {
    setError(error.message);
  }
};