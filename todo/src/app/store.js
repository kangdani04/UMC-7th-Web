import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todoSlice';  // todoSlice 리듀서 임포트

const store = configureStore({
  reducer: {
    todo: todoReducer,  // todoSlice의 리듀서를 'todo' 키에 연결
  },
});

export default store;
