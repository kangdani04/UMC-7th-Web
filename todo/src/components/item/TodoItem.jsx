// src/components/item/TodoItem.jsx
import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Link } from 'react-router-dom';
import './TodoItem.css';
const TodoItem = ({ todo }) => {
    const { deleteTodo, updateTodo, toggleTodoChecked } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false); // 로컬 상태로 편집 여부 관리
    const [editText, setEditText] = useState(todo.title); // 로컬 편집 제목
    const [editContent, setEditContent] = useState(todo.content); // 로컬 편집 내용
    const handleSave = () => {
        updateTodo(todo.id, editText, editContent); // 수정된 내용 업데이트
        setIsEditing(false);
    };
    const handleDelete = () => {
        deleteTodo(todo.id); // 삭제 함수 호출
    };
    const handleCheckboxChange = () => {
        toggleTodoChecked(todo.id); // 완료 여부 토글
    };
    return (
        <div className="todo-item">
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)} // 로컬 제목 상태 업데이트
                    />
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)} // 로컬 내용 상태 업데이트
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSave}>저장</button>
                        <button onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                </div>
            ) : (
                <div className="view-mode">
                    <input
                        type="checkbox"
                        checked={todo.checked}
                        onChange={handleCheckboxChange} // 체크박스 상태 변경
                    />
                    <Link to={`/todo/${todo.id}`}>
                        <h3>{todo.title}</h3>
                    </Link>
                    <p>{todo.content}</p>
                    <div className="todo-status">
                        {todo.checked ? '완료' : '미완료'} {/* 완료 여부 표시 */}
                    </div>
                    <div className="view-buttons">
                        <button onClick={() => setIsEditing(true)}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TodoItem;