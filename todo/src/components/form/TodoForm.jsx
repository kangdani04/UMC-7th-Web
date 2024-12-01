import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../features/todoSlice';  // addTodo 액션만 사용
import './TodoForm.css';

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      const newTodo = { name: todoText, completed: false };  // 할 일 객체 생성
      dispatch(addTodo(newTodo));  // addTodo 액션 디스패치
      setTodoText('');  // 입력란 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
