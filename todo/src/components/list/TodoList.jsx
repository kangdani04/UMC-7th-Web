// src/components/list/TodoList.jsx
import React, { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import TodoItem from "../item/TodoItem";
import "./TodoList.css";

const TodoList = () => {
    const { todos, setSearchQuery } = useContext(TodoContext);
    const [searchInput, setSearchInput] = useState("");

    // debounce 적용
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <div className="todo-list-container">
            {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
        </div>
    );
};

export default TodoList;
