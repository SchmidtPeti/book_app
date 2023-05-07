import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooks } from "../utils/bookService";
import { Link } from "react-router-dom";
import ReadingCalendar from "../components/Calendar";
import BookList from "../components/book/BookList";
import Spinner from "../assets/Spinner.gif";
import { BooksContext } from "../context/BooksContext";
import { fetchNextWeekSchedules } from "../utils/bookService";
import { ScheduledBooksContext } from "../context/ScheduledBooksContext";

const MyBooks = () => {
  const { currentUser } = useContext(AuthContext);
  const { setBooks } = useContext(BooksContext);
  const { scheduledBooks } = useContext(ScheduledBooksContext);
  const [nextWeekPages, setNextWeekPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const booksData = await fetchBooks(currentUser.uid);
        setBooks(booksData);
        const nextWeekSchedules = await fetchNextWeekSchedules(currentUser);
        console.log(nextWeekSchedules);
        let bookTitleConcat = [];
        //file up the bookTitleConcat with from the nextWeekSchedules objects the title property - the date property - the pagesToRead property
        nextWeekSchedules.forEach((book) => {
          bookTitleConcat.push(`${book.title} - ${book.scheduledDate} - ${book.pagesToRead} oldal`);
        });
        //const totalNextWeekPages = nextWeekSchedules.reduce((sum, book) => sum + book.pagesToRead, 0);
        setNextWeekPages(bookTitleConcat);
      }
    };
    fetchData();
  }, [currentUser, setBooks,scheduledBooks]);

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
        <p>Következő 7 napban olvasandó oldalak száma:</p>
        {nextWeekPages.length === 0 ? <p>Nincs olvasandó könyv a következő héten.</p> :
        <ul>
          {nextWeekPages.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>}
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
