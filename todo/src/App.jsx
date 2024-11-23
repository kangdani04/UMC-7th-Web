import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { TodoContextProvider } from './context/TodoContext';  
import TodoHeader from './components/header/TodoHeader';  // 헤더 컴포넌트
import TodoList from './components/list/TodoList';  
import TodoItemDetail from './components/detail/TodoDetailPage';  
import './App.css';
const App = () => {
  return (
    <TodoContextProvider>
      <Router>
        <div className="app-container">
          <TodoHeader />  {/* 헤더 렌더링 */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 기본 Todo 목록 페이지 */}
            <Route path="/todo" element={<TodoList />} />
            {/* 특정 Todo 항목의 상세 페이지 */}
            <Route path="/todo/:id" element={<TodoItemDetail />} />
          </Routes>
        </div>
      </Router>
    </TodoContextProvider>
  );
};
export default App;