import React, { useState, useEffect, useContext } from 'react';
import { onSnapshot } from 'firebase/firestore';
import Calendar from 'react-calendar';
import { AuthContext } from "../context/AuthContext";
import { getFirestore, collection, query, where, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';


const ReadingCalendar = () => {
  const { currentUser } = useContext(AuthContext);
  const [scheduledBooks, setScheduledBooks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const db = getFirestore();
    const schedulesRef = collection(db, 'schedules', currentUser.uid, 'userSchedules');
    const q = query(schedulesRef, where('scheduledDate', '==', selectedDate.toISOString().split('T')[0]));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scheduledBooksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setScheduledBooks(scheduledBooksData);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid, selectedDate]);


  const handleDateChange = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset());
    setSelectedDate(adjustedDate);
  };
  
  const markAsRead = async (scheduleId, bookId, pagesToRead) => {
    try {
      // Update schedule as read
      const db = getFirestore();
      const scheduleRef = doc(db, 'schedules', currentUser.uid, 'userSchedules', scheduleId);
      await updateDoc(scheduleRef, { isRead: true });

      // Update book with new pageCount
      const bookRef = doc(db, 'books', currentUser.uid, 'userBooks', bookId);
      const bookSnapshot = await getDoc(bookRef);
      const bookData = bookSnapshot.data();
      await updateDoc(bookRef, { pageCount: bookData.pageCount + pagesToRead });

    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const tileClass = ({ date, view }) => {
    if (
      view === "month" &&
      scheduledBooks.some(
        (book) =>
          new Date(book.scheduledDate).toDateString() === date.toDateString()
      )
    ) {
      return "scheduled-date"; // This class will be applied to the days with scheduled books
    }
  };
  
  
  const deleteSchedule = async (scheduleId) => {
    try {
      const db = getFirestore();
      const scheduleRef = doc(db, 'schedules', currentUser.uid, 'userSchedules', scheduleId);
      await deleteDoc(scheduleRef);

    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <div>
        <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClass}
        className={'mx-auto'}

        />
      <h3>Scheduled Books for {selectedDate.toDateString()}:</h3>
      <ul>
        {scheduledBooks.map(book => (
          <li key={book.id}>
            {book.title} - Pages: {book.pagesToRead}
            {book.isRead ? (
              <span className="text-success"> (Read)</span>
            ) : (
              <>
                <button
                  className="btn btn-outline-success btn-sm ml-2"
                  onClick={() => markAsRead(book.id, book.bookId, book.pagesToRead)}
                >
                  Mark as Read
                </button>
                <button
                  className="btn btn-outline-danger btn-sm ml-2"
                  onClick={() => deleteSchedule(book.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingCalendar;
