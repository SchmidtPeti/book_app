import React, { useState, useEffect, useContext, useCallback } from "react";
import { deleteBook, fetchBooks, updatePageCount, schedulePages as schedulePagesService, updateTotalCount  } from "../../utils/bookService";
import { AuthContext } from "../../context/AuthContext";
import { BooksContext } from "../../context/BooksContext";
import BookItem from "./MyBooksComponents/BookItem";
import ScheduleForm from "./MyBooksComponents/ScheduleForm";

const BookList = () => {
  const { currentUser } = useContext(AuthContext);
  const { books, setBooks } = useContext(BooksContext);
    const [editedPageCounts, setEditedPageCounts] = useState({});
    const [showScheduleForm, setShowScheduleForm] = useState({});
    const [scheduledDate, setScheduledDate] = useState(new Date());
    const [scheduledPages, setScheduledPages] = useState("");
  
    useEffect(() => {
      const initialPageCounts = books.reduce((acc, book) => {
        acc[book.id] = book.pageCount;
        return acc;
      }, {});
      setEditedPageCounts(initialPageCounts);
    }, [books]);
    useEffect(() => {
      setScheduledDate(new Date().toISOString().split("T")[0]);
      setScheduledPages(20);
    }, [showScheduleForm]);
    const fetchData = useCallback(async () => {
      if (currentUser) {
        const booksData = await fetchBooks(currentUser.uid);
        setBooks(booksData);
      }
    }, [currentUser, setBooks]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  const handleDeleteBook = async (bookId) => {
    await deleteBook(currentUser.uid, bookId);
    fetchData();
  };

  const handlePagesToReadChange = (e) => {
    setScheduledPages(e.target.value);
  };

  const handleScheduleButtonClick = (bookId) => {
    setShowScheduleForm({ [bookId]: true });
  };

  const handleScheduleFormClose = () => {
    setShowScheduleForm(false);
  };

  const handleDateChange = (e) => {
    setScheduledDate(e.target.value, 10);
  };
  

  /*const handleUpdateButtonClick = (bookId) => {
    if (editedPageCounts[bookId]) {
      updatePageCount(currentUser.uid, bookId, editedPageCounts[bookId]);
    }
  };*/

  const handleLiveProgressUpdate = async (value, bookId) => {
    await updatePageCount(currentUser.uid, bookId, value); //database update
    //handlePageCountChange(value, bookId); //state update
    fetchData();
  };
  const updateTotalPageCount = async (value, bookId) => {
    await updateTotalCount(currentUser.uid, bookId, value); //database update
    fetchData();
  };

  
 
  return (
    <>
      {books.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Cím</th>
              <th scope="col">Oldalszám</th>
              <th scope="col">Átlag oldal</th>
              <th scope="col">Hozzáadva</th>
              <th scope="col">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                editedPageCounts={editedPageCounts}
                handleLiveProgressUpdate={handleLiveProgressUpdate}
                handleDeleteBook={handleDeleteBook}
                handleScheduleButtonClick={handleScheduleButtonClick}
                updatePageCount={updateTotalPageCount}
                showScheduleForm={showScheduleForm}
                ScheduleForm={(props) => (
                  <ScheduleForm
                    {...props}
                    scheduledPages={scheduledPages}
                    handlePagesToReadChange={handlePagesToReadChange}
                    scheduledDate={scheduledDate}
                    handleDateChange={handleDateChange}
                    schedulePages={schedulePagesService}
                    currentUser={currentUser}
                    books={books}
                    handleScheduleFormClose={handleScheduleFormClose}
                  />
                )}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info">Még nem adtál hozzá könyveket.</div>
      )}
    </>
  );
};

export default BookList;