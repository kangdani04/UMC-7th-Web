// 'src/context/TodoContext.jsx'
import { createContext, useState } from 'react';

// 데이터를 담고 있음
export const TodoContext = createContext();

// 우산을 만듦
function TodoContextProvider({ children }) {
    const [todos, setTodos] = useState([
        { id: 1, task: '투두 만들어보기' },
        { id: 2, task: '깡별선채' },
    ]);

    const [text, setText] = useState('');
    console.log(text);

    const [editingID, setEditingID] = useState('');
    console.log(editingID);

    const [editText, setEditText] = useState('');
    console.log(editText);

    // 렌더링 방지
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // 1. 추가하기
    const addTodo = () => {
        setTodos((prev) => [
            ...prev, // 이전 값 복사
            { id: Math.floor(Math.random() * 100) + 2, task: text },
        ]);
        setText(''); // 입력한 후 창 초기화
    };

    // 2. 삭제하기
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
    }; // id를 배열에서 지워서 남은 id만 표시

    // 3. 수정하기
    const updateTodo = (id, text) => {
        setTodos((prev) =>
            prev.map((item) => (item.id === id ? { ...item, task: text } : item))
        );
        setEditingID('');
    };

    return (
        <TodoContext.Provider value={{
            todos, setTodos,
            text, setText,
            editingID, setEditingID,
            editText, setEditText,
            handleSubmit,
            addTodo, deleteTodo, updateTodo
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContextProvider };
