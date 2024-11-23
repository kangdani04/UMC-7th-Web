import axiosInstance from "./axiosinstance";

const API_URL = "http://localhost:3000/todo"; // Replace with your endpoint

export const fetchTodos = async () => {
    const response = await axiosInstance.get(baseURL);
    return response.data;
};

export const addTodo = async (newTodo) => {
    const response = await axiosInstance.post(baseURL, newTodo);
    return response.data;
};

export const updateTodo = async (todo) => {
    const response = await axiosInstance.patch(`${baseURL}/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axiosInstance.delete(`${baseURL}/${id}`);
};
