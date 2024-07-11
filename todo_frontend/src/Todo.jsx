import React, { useState } from 'react';
import Modal from './components/Modal'; // Import the Modal component

export default function Todo(props) {
  const { todo, setTodos } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateTodoStatus = async (todoId, todoStatus) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: !todoStatus }),
      headers: {
        "Content-Type": "application/json"
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !todoStatus };
          }
          return currentTodo;
        });
      });
    }
  };

  const editTodo = async (todoId, updatedData) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json"
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, ...updatedData };
          }
          return currentTodo;
        });
      });
      setShowModal(false);
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE"
    });
    const json = await res.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };

  return (
    <div className="todo">
      {showModal && (
        <Modal
          todo={todo}
          onClose={() => setShowModal(false)}
          onSave={(updatedData) => editTodo(todo._id, updatedData)}
        />
      )}
      <div className="todo__details">
        <h3>{todo.title}</h3>
        {/* <p>{todo.description}</p> */}
        <p>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
        <p>Status: {todo.status ? "Completed" : "Pending"}</p>
      </div>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodoStatus(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button
          className="todo__view"
          onClick={() => setShowModal(true)} // Show the modal
        >
          👁️
        </button>
        {/* <button
          className="todo__edit"
          onClick={() => setIsEditing(true)}
        >
          ✏️
        </button> */}
        <button
          className="todo__delete"
          onClick={() => deleteTodo(todo._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
