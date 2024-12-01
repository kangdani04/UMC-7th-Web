import axiosInstance from "./axiosinstance";

const API_URL = 'http://localhost:3000/todo';

export const fetchTodos = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

export const addTodo = async (newTodo) => {
    const response = await axiosInstance.post(API_URL, newTodo);
    return response.data;
};

export const updateTodo = async (todo) => {
    const response = await axiosInstance.patch(`${API_URL}/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
};
