import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data.slice(0, 10)); // Fetch the first 10 tasks for simplicity
    };
    loadTasks();
  }, []);

  // Handle task creation
  const handleCreate = async () => {
    if (!newTask.title) return alert("Title is required!");
    const task = { ...newTask, completed: false };
    const createdTask = await createTask(task);
    setTasks([createdTask, ...tasks]);
    setNewTask({ title: "", description: "" });
  };

  // Handle task updates
  const handleUpdate = async () => {
    const updatedTask = await updateTask(editingTask.id, editingTask);
    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Add Task */}
      <div>
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreate}>Add Task</button>
      </div>

      {/* Edit Task */}
      {editingTask && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update Task</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}

      {/* Task List */}
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <button onClick={() => setEditingTask(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
