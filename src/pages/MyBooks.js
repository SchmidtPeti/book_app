import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFirestore, collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [editedPageCounts, setEditedPageCounts] = useState({});
  const { currentUser } = useContext(AuthContext);

  const updatePageCount = async (bookId, newPageCount) => {
    try {
      const db = getFirestore();
      const bookRef = doc(db, "books", currentUser.uid, "userBooks", bookId);
      await updateDoc(bookRef, { pageCount: parseInt(newPageCount) });
    } catch (error) {
      console.error("Error updating page count:", error);
    }
  };

  const handlePageCountChange = (e, bookId) => {
    setEditedPageCounts({ ...editedPageCounts, [bookId]: e.target.value });
  };

  const handleUpdateButtonClick = (bookId) => {
    if (editedPageCounts[bookId]) {
      updatePageCount(bookId, editedPageCounts[bookId]);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const db = getFirestore();
      const userBooksRef = collection(db, "books", currentUser.uid, "userBooks");
      const q = query(userBooksRef);
      const querySnapshot = await getDocs(q);

      const booksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBooks(booksData);
    };

    fetchBooks();
  }, [currentUser.uid]);

  const calculateProgress = (currentPage, totalPages) => {
    return (currentPage / totalPages) * 100;
  };

  const handleLiveProgressUpdate = (e, bookId) => {
    handlePageCountChange(e, bookId);
    if (editedPageCounts[bookId]) {
      updatePageCount(bookId, editedPageCounts[bookId]);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Books</h2>
      <div className="mt-3">
        <Link to="/my-books/add" className="btn btn-primary mb-3">
          Add Book
        </Link>

        {books.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Page Count</th>
                <th scope="col">Average Page</th>
                <th scope="col">Added At</th>
                <th scope="col">Progress</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        value={editedPageCounts[book.id] || book.pageCount}
                        onChange={(e) => handleLiveProgressUpdate(e, book.id)}
                      />
                    </div>
                  </td>
                  <td>{book.averagePage}</td>
                  <td>{new Date(book.addedAt.seconds * 1000).toLocaleString()}</td>
                  <td>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={calculateProgress(book.currentPage, editedPageCounts[book.id] || book.pageCount)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${calculateProgress(book.currentPage, editedPageCounts[book.id] || book.pageCount)}%` }}
                      >
                        {`${calculateProgress(book.currentPage, editedPageCounts[book.id] || book.pageCount).toFixed(2)}%`}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleUpdateButtonClick(book.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info">You have not added any books yet.</div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;