import React, { createContext, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    // QueryClient 사용
    const queryClient = useQueryClient();

    useEffect(() => {
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
        const result = todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTodos(result);
    }, [searchQuery, todos]);

    const addTodoMutation = useMutation(
        async ({ title, content }) => {
            const newTodo = {
                id: todos.length + 1,
                title,
                content,
                checked: false,
            };
            return newTodo;
        },
        {
            onSuccess: (newTodo) => {
                setTodos((prevTodos) => [...prevTodos, newTodo]);
                queryClient.invalidateQueries(["todos"]);
            },
        }
    );

    const addTodo = (title, content) => {
        addTodoMutation.mutate({ title, content });
    };

    const updateTodoMutation = useMutation(
        async ({ id, title, content }) => {
            const updatedTodo = {
                id,
                title,
                content,
                checked: false,
            };
            return updatedTodo;
        },
        {
            onSuccess: (updatedTodo) => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === updatedTodo.id ? updatedTodo : todo
                    )
                );
                queryClient.invalidateQueries(["todos"]);
            },
        }
    );

    const updateTodo = (id, title, content) => {
        updateTodoMutation.mutate({ id, title, content });
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
