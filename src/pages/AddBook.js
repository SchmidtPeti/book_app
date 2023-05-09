import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [averagePage, setAveragePage] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const userBooksRef = collection(db, "books", currentUser.uid, "userBooks");

    await addDoc(userBooksRef, {
      title,
      pageCount: parseInt(pageCount),
      averagePage: parseInt(averagePage),
      addedAt: new Date(),
    });

    navigate("/my-books");
  };

  return (
    <div className="container mt-5">
      <h2>Könyv hozzáadása</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Cím
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pageCount" className="form-label">
            Oldalszám
          </label>
          <input
            type="number"
            className="form-control"
            id="pageCount"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="averagePage" className="form-label">
            Átlagos oldalszám
          </label>
          <input
            type="number"
            className="form-control"
            id="averagePage"
            value={averagePage}
            onChange={(e) => setAveragePage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Könyv hozzáadása
        </button>
      </form>
    </div>
  );
};

export default AddBook;
