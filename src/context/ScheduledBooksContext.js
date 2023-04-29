import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { fetchScheduledBooks } from "../utils/bookService";


export const ScheduledBooksContext = createContext();

export const ScheduledBooksProvider = ({ children }) => {
  const [scheduledBooks, setScheduledBooks] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const scheduledBooksData = await fetchScheduledBooks(currentUser.uid);
        setScheduledBooks(scheduledBooksData);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <ScheduledBooksContext.Provider value={{ scheduledBooks, setScheduledBooks }}>
      {children}
    </ScheduledBooksContext.Provider>
  );
};
