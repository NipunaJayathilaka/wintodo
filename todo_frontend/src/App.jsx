import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (title.length > 3 && description.length > 3 && dueDate) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ title, description, dueDate, status }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus(false);
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <main className="container">
      <h1 className="title">Mark & Win Your Todo Tasks</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          className="form__input"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description..."
          className="form__input"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form__input"
          required
        />
        <button className="form__button" type="submit">Create Todo</button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
      </div>
    </main>
  );
}
