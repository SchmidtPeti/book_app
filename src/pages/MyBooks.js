import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooks, updatePageCount, schedulePages } from "../utils/bookService";
import { Link } from "react-router-dom";
import ReadingCalendar from "../components/Calendar";
import BookList from "../components/book/BookList";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await fetchBooks(currentUser.uid);
      setBooks(booksData);
    };

    fetchData();
  }, [currentUser.uid]);

  return (
    <div className="container mt-5">
      <h2>My Books</h2>
      <div className="mt-3">
        <ReadingCalendar />
      </div>

      <div className="mt-3">
        <Link to="/my-books/add" className="btn btn-primary mb-3">
          Add Book
        </Link>
        <BookList books={books} currentUser={currentUser} updatePageCount={updatePageCount} schedulePages={schedulePages} />
      </div>
    </div>
  );
};

export default MyBooks;
