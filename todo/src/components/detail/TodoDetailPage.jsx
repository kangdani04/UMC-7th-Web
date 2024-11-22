// src/pages/TodoDetailPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TodoContext } from '../../context/TodoContext';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const TodoDetailPage = () => {
    const { id } = useParams();
    const { todos, updateTodo, deleteTodo } = useContext(TodoContext);
    const [todo, setTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const [editContent, setEditContent] = useState('');
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [hasError, setHasError] = useState(false); // 에러 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodo = async () => {
            setIsLoading(true);
            setHasError(false);

            // 최소 로딩 시간을 보장 (예: 1.5초)
            const MIN_LOADING_TIME = 1500;
            const startTime = Date.now();

            try {
                const currentTodo = todos?.find(todo => todo.id === parseInt(id));
                if (!currentTodo) {
                    throw new Error("Todo를 찾을 수 없습니다.");
                }
                setTodo(currentTodo);
                setEditText(currentTodo.title);
                setEditContent(currentTodo.content);
            } catch (error) {
                console.error("에러 발생:", error.message);
                setHasError(true);
            } finally {
                // 로딩 시간을 조정해 최소 시간 보장
                const elapsedTime = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - elapsedTime;

                setTimeout(() => {
                    setIsLoading(false);
                }, remainingTime > 0 ? remainingTime : 0);
            }
        };

        fetchTodo();
    }, [id, todos]);

    const handleSave = () => {
        if (todo) {
            updateTodo(todo.id, editText, editContent);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (todo) {
            try {
                deleteTodo(todo.id);
                navigate('/todo');
            } catch (error) {
                console.error("삭제 중 오류:", error.message);
                setHasError(true);
            }
        }
    };

    // 로딩 상태 표시
    if (isLoading) {
        return <Loading />;
    }

    // 에러 상태 표시
    if (hasError) {
        return <Error />;
    }

    // todo가 없는 경우
    if (!todo) {
        return <Error />;
    }

    return (
        <div className="todo-detail-container">
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSave}>저장</button>
                        <button onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                </div>
            ) : (
                <div className="view-mode">
                    <h2>{todo.title}</h2>
                    <p>{todo.content}</p>
                    <div className="status">
                        <span>상태: {todo.checked ? '완료' : '미완료'}</span>
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

export default TodoDetailPage;
