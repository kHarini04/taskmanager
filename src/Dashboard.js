import React, { useState, useEffect } from 'react';
import './style.css';
import './index.css'

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title: newTask, description: 'Task Description' }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      {loading && <div className="spinner"></div>}
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={createTask}>Add Task</button>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
