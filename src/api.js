import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
};


export const createTask = async (task) => {
  const response = await axios.post(`${BASE_URL}/todos`, task);
  return response.data;
};


export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${BASE_URL}/todos/${id}`, updatedTask);
  return response.data;
};


export const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/todos/${id}`);
};
