import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // 👉 we'll add CSS next

const API_BASE_URL = "https://to-do-dashboard-1.onrender.com/";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title || !newTodo.description)
      return alert("All fields are required");
    try {
      await axios.post(API_BASE_URL, newTodo);
      setNewTodo({ title: "", description: "" });
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const todoToUpdate = todos.find((t) => t.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = { ...todoToUpdate, completed: !completed };
      await axios.put(`${API_BASE_URL}/update/${id}`, updatedTodo);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditData({ title: todo.title, description: todo.description });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const todoToUpdate = todos.find((t) => t.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = {
        ...todoToUpdate,
        title: editData.title,
        description: editData.description,
      };
      await axios.put(`${API_BASE_URL}/update/${id}`, updatedTodo);
      setEditId(null);
      fetchTodos();
    } catch (err) {
      console.error("Error saving todo:", err);
    }
  };

  const cancelEdit = () => setEditId(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">To-Do Dashboard ✅</h1>

      {/* Add Form */}
      <form onSubmit={handleAddTodo} className="add-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Todo List */}
      <div className="todo-grid">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-card ${todo.completed ? "completed" : ""}`}
          >
            {editId === todo.id ? (
              <div className="edit-section">
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  placeholder="Edit title"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  placeholder="Edit description"
                />
                <div className="edit-buttons">
                  <button className="save" onClick={() => saveEdit(todo.id)}>
                    💾 Save
                  </button>
                  <button className="cancel" onClick={cancelEdit}>
                    ✖ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <div className="status">
                  {todo.completed ? "✅ Completed" : "⏳ Pending"}
                </div>
              </>
            )}

            <div className="actions">
              <button
                className="complete"
                onClick={() => toggleComplete(todo.id, todo.completed)}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>

              <button className="update" onClick={() => startEdit(todo)}>
                Update
              </button>

              <button className="delete" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
