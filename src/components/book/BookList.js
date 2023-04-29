import React, { useState, useEffect, useContext, useCallback } from "react";
import { deleteBook, fetchBooks, updatePageCount, schedulePages as schedulePagesService  } from "../../utils/bookService";
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

  const handlePageCountChange = (value, bookId) => {
    setEditedPageCounts({ ...editedPageCounts, [bookId]: value });
  };
  

  const handleUpdateButtonClick = (bookId) => {
    if (editedPageCounts[bookId]) {
      updatePageCount(currentUser.uid, bookId, editedPageCounts[bookId]);
    }
  };

  const handleLiveProgressUpdate = async (value, bookId) => {
    await updatePageCount(currentUser.uid, bookId, value); //database update
    handlePageCountChange(value, bookId); //state update
  };
  
  return (
    <>
      {books.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Page Count</th>
              <th scope="col">Average Page</th>
              <th scope="col">Added At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                editedPageCounts={editedPageCounts}
                handleLiveProgressUpdate={handleLiveProgressUpdate}
                handleUpdateButtonClick={handleUpdateButtonClick}
                handleDeleteBook={handleDeleteBook}
                handleScheduleButtonClick={handleScheduleButtonClick}
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
        <div className="alert alert-info">You have not added any books yet.</div>
      )}
    </>
  );
};

export default BookList;