import { getFirestore, collection, query, getDocs, updateDoc, doc, addDoc, deleteDoc, where } from "firebase/firestore";


export const fetchBooks = async (userId) => {
  const db = getFirestore();
  const userBooksRef = collection(db, "books", userId, "userBooks");
  const q = query(userBooksRef);
  const querySnapshot = await getDocs(q);

  const booksData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return booksData;
};

export const updatePageCount = async (userId, bookId, newPageCount) => {
  try {
    const db = getFirestore();
    const bookRef = doc(db, "books", userId, "userBooks", bookId);
    await updateDoc(bookRef, { pageCount: parseInt(newPageCount) });
  } catch (error) {
    console.error("Error updating page count:", error);
  }
};

export const schedulePages = async (userId, bookId, scheduledDate, scheduledPages, books) => {
    try {
      const db = getFirestore();
      const schedulesRef = collection(db, "schedules", userId, "userSchedules");
  
      // Adjust the date for timezone offset
      const adjustedDate = new Date(scheduledDate);
      adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset());
  
      const newSchedule = {
        bookId: bookId,
        title: books.find((book) => book.id === bookId).title,
        scheduledDate: adjustedDate.toISOString().split("T")[0],
        pagesToRead: parseInt(scheduledPages),
        isRead: false,
      };
  
      await addDoc(schedulesRef, newSchedule);
    } catch (error) {
      console.error("Error scheduling pages:", error);
    }
  };
  export const deleteBook = async (userId, bookId) => {
    try {
      const db = getFirestore();
      const bookRef = doc(db, "books", userId, "userBooks", bookId);
      await deleteDoc(bookRef);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  export const fetchScheduledBooks = async (userId) => {
    const db = getFirestore();
    const userSchedulesRef = collection(db, "schedules", userId, "userSchedules");
    const q = query(userSchedulesRef);
    const querySnapshot = await getDocs(q);
  
    const scheduledBooksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return scheduledBooksData;
  };
  export const fetchNextWeekSchedules = async (currentUser) => {
    const db = getFirestore();
    const schedulesRef = collection(db, 'schedules', currentUser.uid, 'userSchedules');
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const q = query(
      schedulesRef,
      where('scheduledDate', '>=', today.toISOString().split('T')[0]),
      where('scheduledDate', '<=', nextWeek.toISOString().split('T')[0])
    );
  
    const querySnapshot = await getDocs(q);
    const scheduledBooksData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return scheduledBooksData;
  };
  
  