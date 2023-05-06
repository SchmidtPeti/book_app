import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooks } from "../utils/bookService";
import { Link } from "react-router-dom";
import ReadingCalendar from "../components/Calendar";
import BookList from "../components/book/BookList";
import Spinner from "../assets/Spinner.gif";
import { BooksContext } from "../context/BooksContext";
import { fetchNextWeekSchedules } from "../utils/bookService";

const MyBooks = () => {
  const { currentUser } = useContext(AuthContext);
  const { setBooks } = useContext(BooksContext);
  const [nextWeekPages, setNextWeekPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const booksData = await fetchBooks(currentUser.uid);
        setBooks(booksData);
        const nextWeekSchedules = await fetchNextWeekSchedules(currentUser);
        const totalNextWeekPages = nextWeekSchedules.reduce((sum, book) => sum + book.pagesToRead, 0);
        setNextWeekPages(totalNextWeekPages);
      }
    };
    fetchData();
  }, [currentUser, setBooks]);

  if (!currentUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={Spinner} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Könyveim</h2>
      <div className="mt-3">
        <h4>Áttekintés</h4>
        <p>Következő 7 napban olvasandó oldalak száma: {nextWeekPages}</p>
      </div>

      <div className="mt-3">
        <ReadingCalendar />
      </div>

      <div className="mt-3">
        <Link to="/my-books/add" className="btn btn-primary mb-3">
          Könyv hozzáadása
        </Link>
        <BookList  />
      </div>
    </div>
  );
};

export default MyBooks;
