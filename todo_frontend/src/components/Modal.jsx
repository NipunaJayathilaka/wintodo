import React, { useState } from 'react';
import "./modal.css"

export default function Modal({ todo, onClose, onSave }) {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    onSave({
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate
    });
  };

  return (
    <div className="modal-overlay body">
      <div className="modal-content">
        <h2>Edit This Todo</h2>
        <input
          className='input__padding'
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Edit title"
        />
        <textarea
          className='input__padding text__area'
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Edit description"
        />
        <input
          className='input__padding'
          type="date"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
