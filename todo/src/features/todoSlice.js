import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 액션 정의: fetchTodosAsync
export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos', // 액션 타입
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // API 호출
    return response.json(); // API 응답 데이터를 반환
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],  // 초기 상태에서 todos 배열을 명확히 설정
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload); // 새로운 할 일 추가
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading'; // 로딩 상태로 설정
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공 상태로 설정
        state.todos = action.payload; // 받은 todos 배열로 상태 업데이트
      })
      .addCase(fetchTodosAsync.rejected, (state) => {
        state.status = 'failed'; // 실패 상태로 설정
      });
  },
});

export const { addTodo } = todoSlice.actions; // 동기 액션 내보내기
export default todoSlice.reducer; // 리듀서 내보내기
