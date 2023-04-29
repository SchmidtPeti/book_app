import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { fetchBooks } from "../utils/bookService";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const booksData = await fetchBooks(currentUser.uid);
        setBooks(booksData);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
