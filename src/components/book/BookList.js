import React, { useState } from "react";

const BookList = ({ books, currentUser, updatePageCount, schedulePages }) => {
  const [editedPageCounts, setEditedPageCounts] = useState({});
  const [showScheduleForm, setShowScheduleForm] = useState({});
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [scheduledPages, setScheduledPages] = useState("");

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

  const handlePageCountChange = (e, bookId) => {
    setEditedPageCounts({ ...editedPageCounts, [bookId]: e.target.value });
  };

  const handleUpdateButtonClick = (bookId) => {
    if (editedPageCounts[bookId]) {
      updatePageCount(currentUser.uid, bookId, editedPageCounts[bookId]);
    }
  };

  const handleLiveProgressUpdate = (e, bookId) => {
    handlePageCountChange(e, bookId);
    if (editedPageCounts[bookId]) {
      updatePageCount(currentUser.uid, bookId, editedPageCounts[bookId]);
    }
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
                  <button
                    className="btn btn-outline-primary mr-2"
                    onClick={() => handleUpdateButtonClick(book.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleScheduleButtonClick(book.id)}
                  >
                    Schedule
                  </button>
                  {showScheduleForm[book.id] && (
                    <div className="mt-2">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Pages to read"
                        value={scheduledPages}
                        onChange={handlePagesToReadChange}
                      />
                      <input
                        type="date"
                        className="form-control mb-2"
                        value={scheduledDate}
                        onChange={handleDateChange}
                      />
                        <button
                        className="btn btn-outline-success mr-2"
                        onClick={() => schedulePages(currentUser.uid, book.id, scheduledDate, scheduledPages, books)}
                        >
                        Schedule Pages
                        </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={handleScheduleFormClose}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
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
