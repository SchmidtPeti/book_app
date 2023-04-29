import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooks } from "../utils/bookService";
import { Link } from "react-router-dom";
import ReadingCalendar from "../components/Calendar";
import BookList from "../components/book/BookList";
import Spinner from "../assets/Spinner.gif";
import { BooksContext } from "../context/BooksContext";

const MyBooks = () => {
  const { currentUser } = useContext(AuthContext);
  const { setBooks } = useContext(BooksContext);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const booksData = await fetchBooks(currentUser.uid);
        setBooks(booksData);
      }
    };
    fetchData();
  }, [currentUser,setBooks]);

  if (!currentUser) {
    return       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src={Spinner} alt="Loading..." />
  </div>
  }

  return (
    <div className="container mt-5">
    <div className="container mt-5">
      <h2>My Books</h2>
      <div className="mt-3">
        <ReadingCalendar />
      </div>

      <div className="mt-3">
        <Link to="/my-books/add" className="btn btn-primary mb-3">
          Add Book
        </Link>
        <BookList  />
      </div>
    </div>
    </div>
    
    
  );
};

export default MyBooks;
