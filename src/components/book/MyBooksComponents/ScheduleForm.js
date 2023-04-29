import React from "react";
import { Button, Form } from "react-bootstrap";

const ScheduleForm = ({
  bookId,
  scheduledPages,
  handlePagesToReadChange,
  scheduledDate,
  handleDateChange,
  schedulePages,
  currentUser,
  books,
  handleScheduleFormClose,
}) => {
  return (
    <div className="mt-2">
      <Form.Control
        type="number"
        className="mb-2"
        placeholder="Pages to read"
        value={scheduledPages}
        onChange={handlePagesToReadChange}
      />
      <Form.Control
        type="date"
        className="mb-2"
        value={scheduledDate}
        onChange={handleDateChange}
      />
      <Button
        variant="outline-success"
        className="mr-2"
        onClick={() =>
          schedulePages(currentUser.uid, bookId, scheduledDate, scheduledPages, books)
        }
      >
        Schedule Pages
      </Button>
      <Button variant="outline-danger" onClick={handleScheduleFormClose}>
        Cancel
      </Button>
    </div>
  );
};

export default ScheduleForm;
