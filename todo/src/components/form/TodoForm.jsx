import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import './TodoForm.css'; // 스타일 파일 추가
const TodoForm = () => {
    const { addTodo } = useContext(TodoContext);
    const [text, setText] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 내용 상태
    const handleAddTodo = (e) => {
        e.preventDefault(); // 폼 제출 방지
        if (text.trim() && content.trim()) { // 제목과 내용이 비어 있지 않으면
            addTodo(text, content); // ToDo 추가
            setText(''); // 제목 필드 초기화
            setContent(''); // 내용 필드 초기화
        }
    };
    return (
        <div className="todo-form-container">
            <input
                type="text"
                className="todo-input"
                placeholder="제목을 입력하세요"
                value={text}
                onChange={(e) => setText(e.target.value)}  // 제목 상태 업데이트
            />
            <textarea
                className="todo-input"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}  // 내용 상태 업데이트
            />
            <button
                className={`todo-button ${!text || !content ? 'disabled' : ''}`}  // 조건에 따라 비활성화 클래스 추가
                onClick={handleAddTodo}
                disabled={!text || !content}  // 제목과 내용이 비어 있으면 버튼 비활성화
            >
                ToDo!
            </button>
        </div>
    );
};
export default TodoForm;