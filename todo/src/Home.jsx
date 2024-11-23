import React, { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import TodoList from './components/list/TodoList'; // TodoList 컴포넌트 임포트
import TodoForm from './components/form/TodoForm';
const Home = () => {
    const { todos } = useContext(TodoContext);  // TodoContext에서 todos 가져오기
    return (
        <div classname='home-container'>
            <TodoForm />
            <TodoList todos={todos} />  {/* Home 컴포넌트 안에 TodoList 렌더링 */}
        </div>
    );
};
export default Home;