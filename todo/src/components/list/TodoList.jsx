import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAsync } from '../../features/todoSlice'; // 비동기 액션 임포트

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos = [], status } = useSelector(state => state.todo || {}); // 기본값 설정

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodosAsync());  // 초기 로딩 시 todos 데이터 fetch
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;  // 로딩 중 상태
  }

  if (status === 'failed') {
    return <div>Failed to load todos. Please try again.</div>;  // 실패 상태
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
