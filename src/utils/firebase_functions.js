import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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
  