import React, { createContext, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../main";

export const TodoContext = createContext();
export const TodoContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]); // 필터링된 목록
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

    const queryClient = useQueryClient();

    useEffect(() => {
        // 초기 데이터 로드 (데모 데이터로 대체)
        const fetchTodos = async () => {
            const demoTodos = [
                { id: 1, title: "할 일 1", content: "내용 1", checked: false },
                { id: 2, title: "할 일 2", content: "내용 2", checked: true },
                { id: 3, title: "할 일 3", content: "내용 3", checked: false },
            ];
            setTodos(demoTodos);
            setFilteredTodos(demoTodos);
        };
        fetchTodos();
    }, []);

    useEffect(() => {
        // 검색어에 따른 필터링
        const result = todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTodos(result);
    }, [searchQuery, todos]);
    
    const addTodo = (title, content) => {
        const newTodo = {
            id: todos.length + 1,
            title,
            content,
            checked: false,
        };
        setTodos([...todos, newTodo]);
    };
    const updateTodo = (id, title, content) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, title, content } : todo
        );
        setTodos(updatedTodos);
    };
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };
    const toggleTodoChecked = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        );
        setTodos(updatedTodos);
    };
    return (
        <TodoContext.Provider
            value={{
                todos: filteredTodos,
                addTodo,
                updateTodo,
                deleteTodo,
                toggleTodoChecked,
                setSearchQuery,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};