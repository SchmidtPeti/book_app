import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const BookItem = ({
  book,
  editedPageCounts,
  handleLiveProgressUpdate,
  handleUpdateButtonClick,
  handleDeleteBook,
  handleScheduleButtonClick,
  showScheduleForm,
  ScheduleForm,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(book.pageCount);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    handleLiveProgressUpdate(inputValue, book.id);
    setShowInput(false);
  };

  const handleAddPages = (valueToAdd) => {
    handleLiveProgressUpdate(Number(editedPageCounts[book.id] || book.pageCount) + valueToAdd, book.id);
  };
  

  return (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>
        {showInput ? (
          <InputGroup>
            <Form.Control
              type="number"
              value={inputValue}
              onChange={handleInputChange}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={handleSubmit}>
                Set
              </Button>
            </InputGroup.Append>
          </InputGroup>
        ) : (
          <span onClick={() => setShowInput(true)}>
            {editedPageCounts[book.id] || book.pageCount}
          </span>
        )}
        <div>
          <Button
            variant="outline-primary"
            className="mr-2 mt-2"
            onClick={() => handleAddPages(5)}
          >
            Add 5
          </Button>
          <Button
            variant="outline-primary"
            className="mr-2 mt-2"
            onClick={() => handleAddPages(10)}
          >
            Add 10
          </Button>
          <Button
            variant="outline-primary"
            className="mt-2"
            onClick={() => handleAddPages(20)}
          >
            Add 20
          </Button>
        </div>
      </td>
      <td>{book.averagePage}</td>
      <td>{new Date(book.addedAt.seconds * 1000).toLocaleString()}</td>
      <td>
        <Button
          variant="outline-secondary"
          onClick={() => handleScheduleButtonClick(book.id)}
        >
          Schedule
        </Button>
        {showScheduleForm[book.id] && <ScheduleForm bookId={book.id} />}
        <Button
          variant="outline-danger"
          className="mr-2"
          onClick={() => handleDeleteBook(book.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BookItem;
